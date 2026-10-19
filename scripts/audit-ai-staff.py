"""Audit the prerendered main copy, including expandable FAQ answers.

Density = non-overlapping supplied keyword phrase occurrences / main-copy
word count * 100. Longer phrases take precedence over contained keywords.
Navigation outside main, metadata, JSON-LD and the footer are excluded.
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
KEYWORDS = ['ai development companies', 'artificial intelligence development companies',
            'ai developers', 'ai devs', 'artificial intelligence developer',
            'staff augmentation', 'contract staffing', 'hire ai engineers',
            'ml developer', 'machine learning in drug discovery',
            'ai product development', 'hire ai developers', 'staffing solution']

class MainCopy(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.parts, self.ids, self.links, self.headings = [], [], [], []
        self.sections = []
        self.section_stack = []
        self.jump_navigation = False
        self.hero_strip = False
        self.story_panels = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main':
            self.active = True
        if self.active:
            if tag == 'section':
                section = {'id': attrs.get('id', attrs.get('aria-labelledby', '')), 'heading_count': 0}
                self.sections.append(section)
                self.section_stack.append(section)
            if 'ais-hero-bottom' in attrs.get('class', '').split():
                self.hero_strip = True
            if attrs.get('role') == 'tabpanel':
                self.story_panels.append(attrs.get('id'))
            if 'ais-jump-nav' in attrs.get('class', '').split():
                self.jump_navigation = True
            if 'id' in attrs:
                self.ids.append(attrs['id'])
            if tag == 'a':
                self.links.append(attrs.get('href', ''))
            if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
                self.headings.append(tag)
                for section in self.section_stack:
                    section['heading_count'] += 1

    def handle_endtag(self, tag):
        if tag == 'section' and self.active and self.section_stack:
            self.section_stack.pop()
        if tag == 'main':
            self.active = False

    def handle_data(self, data):
        if self.active:
            self.parts.append(data)

source = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'dist/ai_staff_augmentation/index.html'
parser = MainCopy()
parser.feed(source.read_text(encoding='utf-8'))
text = re.sub(r'\s+', ' ', ' '.join(parser.parts)).strip()
words = re.findall(r"[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*", text)
pattern = r'\b(?:' + '|'.join(re.escape(k) for k in sorted(KEYWORDS, key=len, reverse=True)) + r')\b'
matches = re.findall(pattern, text, re.I)
counts = Counter(match.lower() for match in matches)
report = {
    'scope': 'Prerendered main copy, including all FAQs and all three panels of the demonstration AI story',
    'method': 'Longest-first, non-overlapping keyword phrase matches divided by word count',
    'words': len(words),
    'keyword_occurrences': len(matches),
    'combined_density_percent': round(len(matches) / len(words) * 100, 4),
    'keywords': {keyword: counts[keyword] for keyword in KEYWORDS},
    'h1_count': parser.headings.count('h1'),
    'sections': parser.sections,
    'one_heading_per_section': all(section['heading_count'] == 1 for section in parser.sections),
    'section_navigation_removed': not parser.jump_navigation,
    'hero_bottom_strip_removed': not parser.hero_strip,
    'prerendered_story_panels': parser.story_panels,
    'main_content_links_to_hire_ai_page': [href for href in parser.links if '/hire-ai-developers' in href],
    'em_dashes': text.count('\u2014'),
    'duplicate_ids': len(parser.ids) - len(set(parser.ids)),
    'broken_hash_links': [href for href in parser.links if href.startswith('#') and href[1:] not in parser.ids],
    'required_section_ids': {section: section in parser.ids for section in ['why-ething', 'expertise', 'industries', 'success-story', 'faqs', 'consultation', 'ais-clients-title', 'other-services']},
}
output = ROOT / 'artifacts/ai-staff'
output.mkdir(parents=True, exist_ok=True)
(output / 'keyword-audit.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
(output / 'main-copy.txt').write_text(text, encoding='utf-8')
print(json.dumps(report, indent=2))
assert report['h1_count'] == 1
assert report['one_heading_per_section']
assert report['section_navigation_removed']
assert report['hero_bottom_strip_removed']
assert len(parser.story_panels) == 3
assert not report['main_content_links_to_hire_ai_page']
assert report['em_dashes'] == 0
assert not report['duplicate_ids']
assert not report['broken_hash_links']
assert all(report['required_section_ids'].values())
assert all(counts[keyword] for keyword in KEYWORDS)
assert 1.95 <= report['combined_density_percent'] <= 2.05
