"""Audit the prerendered service page without running browser JavaScript."""
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import argparse
import json
import re

KEYWORDS = [
    'website developer', 'website development company', 'website development services',
    'web developer', 'web application development', 'web development companies near me',
    'website development near me', 'website and app development',
    'website development company near me', 'best website development company',
    'web dev company', 'website dev', 'top website development companies',
    'web and app development services', 'web3 development company',
    'web app development services', 'web designing company',
    'website redesign services', 'web app development agency',
]

class PageText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.main = False
        self.skip = 0
        self.parts = []
        self.headings = []
        self.heading = None
        self.panels = self.faqs = 0

    def handle_starttag(self, tag, attrs):
        if tag == 'main': self.main = True
        if tag in ('script', 'style', 'noscript'): self.skip += 1
        if self.main and not self.skip:
            if re.fullmatch('h[1-6]', tag): self.heading = {'tag': tag, 'parts': []}
            if dict(attrs).get('role') == 'tabpanel': self.panels += 1
            if tag == 'details': self.faqs += 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'noscript'): self.skip = max(0, self.skip - 1)
        if self.heading and tag == self.heading['tag']:
            self.headings.append({'tag': tag, 'text': ' '.join(self.heading['parts'])})
            self.heading = None
        if tag == 'main': self.main = False

    def handle_data(self, value):
        if self.main and not self.skip:
            self.parts.append(value)
            if self.heading: self.heading['parts'].append(value)

arguments = argparse.ArgumentParser()
arguments.add_argument('--html', type=Path, default=Path('dist/website-development/index.html'))
arguments.add_argument('--report', type=Path)
args = arguments.parse_args()
html = args.html.read_text(encoding='utf-8')
parser = PageText()
parser.feed(html)
text = re.sub(r'\s+', ' ', ' '.join(parser.parts)).strip()
words = len(re.findall(r'\b[\w’-]+\b', text))
matches = list(re.finditer(r'(?<!\w)(?:' + '|'.join(re.escape(k) for k in sorted(KEYWORDS, key=len, reverse=True)) + r')(?!\w)', text, flags=re.I))
counts = Counter(h['tag'] for h in parser.headings)
skips = [h for prev, h in zip(parser.headings, parser.headings[1:]) if int(h['tag'][1]) > int(prev['tag'][1]) + 1]
canonical = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', html).group(1)
report = {
    'canonical': canonical, 'mainWordCount': words, 'combinedPhraseMentions': len(matches),
    'combinedDensityPercent': round(len(matches) / words * 100, 4),
    'formula': 'Longest non-overlapping exact phrase mentions / main-content words × 100.',
    'scope': 'All 19 requested phrases; prerendered main content including selectable panels and FAQ answers, excluding shared header/footer, scripts, styles and duplicate noscript content.',
    'intentionalAbsences': 'App-development phrases and removed local-search variants remain absent, following the owner\'s later website-only and repetition-removal instructions.',
    'keywords': [{'phrase': k, 'occurrences': len(re.findall(r'(?<!\w)' + re.escape(k) + r'(?!\w)', text, flags=re.I))} for k in KEYWORDS],
    'headingCounts': dict(counts), 'headingLevelSkips': skips, 'headingOutline': parser.headings,
    'servicePanelsInHtml': parser.panels, 'faqAnswersInHtml': parser.faqs,
}
assert canonical == 'https://www.ethingsolutions.com/website-development'
assert counts['h1'] == 1 and not skips
assert parser.panels == 8 and parser.faqs == 16
assert round(report['combinedDensityPercent'], 2) == 2.00, report['combinedDensityPercent']
assert not re.search(r'\b(?:mobile app|app development|web application development)\b', text, flags=re.I)
if args.report:
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps({k: report[k] for k in ['canonical', 'mainWordCount', 'combinedPhraseMentions', 'combinedDensityPercent', 'headingCounts', 'headingLevelSkips', 'servicePanelsInHtml', 'faqAnswersInHtml']}))
