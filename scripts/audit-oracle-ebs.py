"""Audit the delivered Oracle EBS HTML, editorial keywords and local assets."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
from collections import Counter
import gzip
import json
import re
import sys

root = Path(__file__).resolve().parents[1]
file = Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'dist/oracle-ebs/index.html'
html = file.read_text(encoding='utf-8')
void = {'img','input','meta','link','br','hr','source','area','base','col','embed','param','track','wbr'}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack=[]; self.editorial=[]; self.ids=[]; self.refs=[]; self.headings=[]; self.heading=None; self.images=[]; self.css=[]; self.scripts=[]
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        classes = a.get('class','').split()
        if a.get('id'): self.ids.append(a['id'])
        if tag in {'a','img','script','link'}:
            value = a.get('href') if tag in {'a','link'} else a.get('src')
            if value: self.refs.append(value)
        if tag == 'img': self.images.append(a)
        if tag == 'link' and a.get('rel') == 'stylesheet': self.css.append(a['href'])
        if tag == 'script' and a.get('src'): self.scripts.append(a['src'])
        blocked = tag in {'script','style','svg','form','select','option','aside'} or 'hidden' in a or any(c in classes for c in ['erp-service-kicker','ebs-talent-map','eyebrow'])
        parent = self.stack[-1] if self.stack else ('',False,False)
        if tag not in void: self.stack.append((tag, blocked or parent[1], tag=='main' or parent[2]))
        if tag in {'h1','h2','h3'}: self.heading=[tag,[]]
    def handle_endtag(self, tag):
        if self.heading and tag == self.heading[0]:
            self.headings.append({'tag':tag,'text':' '.join(' '.join(self.heading[1]).split())}); self.heading=None
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0] == tag: self.stack=self.stack[:i]; break
    def handle_data(self, data):
        if self.stack and self.stack[-1][2] and not self.stack[-1][1]: self.editorial.append(data)
        if self.heading: self.heading[1].append(data)

p = Page(); p.feed(html)
copy = ' '.join(' '.join(p.editorial).split())
words = re.findall(r"[A-Za-z0-9]+(?:[’'/-][A-Za-z0-9]+)*",copy)
keywords = {phrase:len(re.findall(re.escape(phrase),copy,re.I)) for phrase in ['Oracle EBS','Oracle E-Business Suite']}
hits = sum(keywords.values())
density = 100*hits/len(words)
assert Counter(h['tag'] for h in p.headings)['h1'] == 1
assert len(p.ids) == len(set(p.ids)), 'Duplicate IDs'
assert 'data:image/' not in html and '<video' not in html
assert html.count('rel="canonical"') == 1
assert 'href="https://www.ethingsolutions.com/oracle-ebs"' in html
assert 'content="noindex' not in html
assert 'Oracle EBS Staffing' in re.search(r'<header\b.*?</header>',html,re.S).group()
assert all('alt' in image and 'width' in image and 'height' in image for image in p.images)
assert all(image.get('loading') == 'lazy' for image in p.images[2:])
public = root / ('dist' if 'dist' in file.parts else 'public')
missing = []
for ref in p.refs:
    if ref.startswith('#'):
        if ref[1:] and ref[1:] not in p.ids: missing.append(ref)
    elif ref.startswith('/') and not (public / urlsplit(ref).path.lstrip('/')).exists(): missing.append(ref)
assert not missing, missing
assets = root / 'public/oracle-ebs/assets'
asset_sizes = {f.name:f.stat().st_size for f in assets.iterdir() if f.is_file() and f.suffix != '.txt'}
report = {
    'route':'/oracle-ebs','canonical':'https://www.ethingsolutions.com/oracle-ebs',
    'keywordMethod':'Non-overlapping exact phrase occurrences divided by editorial word count, multiplied by 100. Counts Oracle EBS and Oracle E-Business Suite as one topic family. Excludes navigation, footer, forms, SVG labels, eyebrow captions, hidden elements, script and style; includes all FAQ answers.',
    'editorialWords':len(words),'keywords':keywords,'keywordOccurrences':hits,'keywordDensityPercent':round(density,4),'keywordDensityDisplay':f'{density:.2f}%',
    'headings':p.headings,'htmlBytes':len(html.encode()),'htmlGzipBytes':len(gzip.compress(html.encode())),
    'allFirstPartyAssetsBytes':sum(asset_sizes.values()),'assets':asset_sizes,
    'videoCount':0,'inlineImageCount':0,'brokenLocalLinks':missing,
    'imageCount':len(p.images),'lazyImageCount':sum(image.get('loading')=='lazy' for image in p.images),
    'scriptFiles':p.scripts,'stylesheetFiles':p.css,
    'note':'Asset totals include every responsive image candidate; browsers select one cover image and defer below-fold photos. Google tag traffic is additional. Gzip size is an estimate, not a measured Core Web Vitals score.'
}
report_dir = root / 'docs/verification/oracle-ebs'
report_dir.mkdir(parents=True,exist_ok=True)
(report_dir/'page-audit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
(report_dir/'editorial-copy.txt').write_text(copy+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in {'headings','assets','keywordMethod','note'}},indent=2))
assert f'{density:.2f}' == '2.00', f'Keyword density is {density:.4f}%, not 2.00%'
