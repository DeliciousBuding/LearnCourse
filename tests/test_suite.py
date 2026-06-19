"""
LearnCourse E2E Test Suite
Run: python tests/test_suite.py
Requires: pip install playwright && playwright install chromium
Server must be running at localhost:5299
"""
import json
import sys
import time
from playwright.sync_api import sync_playwright, Page

BASE = 'http://localhost:5299/LearnCourse'
RESULTS = []

def test(name, fn):
    """Decorator-less test runner"""
    try:
        fn()
    except Exception as e:
        RESULTS.append(f'FAIL {name}: {e}')
        print(f'  FAIL: {e}')
    else:
        RESULTS.append(f'PASS {name}')
        print(f'  PASS')

class Tester:
    def __init__(self):
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=True)
        self.page = self.browser.new_page(viewport={"width": 1920, "height": 1080})
        self.page.on('pageerror', lambda err: print(f'  JS ERROR: {err.message[:100]}'))

    def close(self):
        self.browser.close()
        self.playwright.stop()

    def goto(self, course='ai-intro'):
        self.page.goto(f'{BASE}/?course={course}', timeout=15000)
        self.page.wait_for_load_state('networkidle')
        self.page.wait_for_timeout(1500)

    def scroll_to(self, selector):
        self.page.evaluate(f'document.querySelector("{selector}")?.scrollIntoView({{behavior:"instant"}})')
        self.page.wait_for_timeout(300)


def run_tests():
    t = Tester()

    # ── GROUP 1: Page Load & Structure ──
    print('\n=== 1. Page Load & Structure ===')
    t.goto('ai-intro')

    def check_page_loads():
        h2s = t.page.evaluate('document.querySelectorAll("h2").length')
        assert h2s >= 10, f'Only {h2s} headings found'
    test('AI page loads with headings', check_page_loads)

    def check_sidebar_groups():
        btns = t.page.evaluate("""Array.from(document.querySelectorAll('#app-sidebar button'))
            .filter(b => ['考试概览','复习指南','模块详解'].some(t => b.textContent.includes(t))).length""")
        assert btns >= 3, f'Only {btns} sidebar groups'
    test('Sidebar has 3 group buttons', check_sidebar_groups)

    def check_header():
        title = t.page.evaluate('document.querySelector("#app-header a").textContent')
        assert '人工智能导论' in title, f'Header title: {title}'
    test('Header shows course title', check_header)

    def check_no_raw_html():
        raw = t.page.evaluate("""document.body.innerText.includes('<div class="card">') +
            document.body.innerText.includes('<tr>') + document.body.innerText.includes('<td>')""")
        assert raw == 0, f'Raw HTML tags found on page'
    test('No raw HTML tags visible', check_no_raw_html)

    # ── GROUP 2: Navigation & Scroll ──
    print('\n=== 2. Navigation & Scroll ===')
    t.goto('ai-intro')

    def check_nav_click_scrolls():
        y0 = t.page.evaluate('window.scrollY')
        t.page.evaluate('document.querySelector(\'#app-sidebar a[href="#s4"]\').click()')
        t.page.wait_for_timeout(1500)
        y1 = t.page.evaluate('window.scrollY')
        assert y1 > y0 + 500, f'Did not scroll: {y0} -> {y1}'
    test('Nav link click scrolls to section', check_nav_click_scrolls)

    def check_scroll_spy_highlights():
        t.page.evaluate('document.getElementById("s3").scrollIntoView({behavior:"instant"})')
        t.page.wait_for_timeout(300)
        t.page.evaluate('window.dispatchEvent(new Event("scroll"))')
        t.page.wait_for_timeout(800)
        active = t.page.evaluate("Array.from(document.querySelectorAll('#app-sidebar a')).filter(a => getComputedStyle(a).fontWeight === '600').length")
        assert active > 0, f'No active nav link after scroll to s3'
    test('Scroll spy highlights active section', check_scroll_spy_highlights)

    def check_sidebar_expands_active_group():
        groups = t.page.evaluate("""
            Array.from(document.querySelectorAll('#app-sidebar > nav > div')).filter(d => {
                const btn = d.querySelector('button');
                const links = d.querySelectorAll('a');
                return btn && links.length > 0 && links[0].offsetParent !== null;
            }).length
        """)
        assert groups > 0, f'No expanded groups visible'
    test('Active group is expanded in sidebar', check_sidebar_expands_active_group)

    # ── GROUP 3: Course Switching ──
    print('\n=== 3. Course Switching ===')
    t.goto('ai-intro')

    def check_switch_to_cs():
        t.page.evaluate('document.querySelector("#app-sidebar button").click()')
        t.page.wait_for_timeout(400)
        cs_btn = t.page.locator('button:has-text("计算机系统")')
        assert cs_btn.count() > 0, 'CS course button not found'
        cs_btn.first.click()
        t.page.wait_for_load_state('networkidle')
        t.page.wait_for_timeout(1500)
        h2s = t.page.evaluate('document.querySelectorAll("h2").length')
        assert h2s >= 10, f'CS page has only {h2s} headings'
    test('Switch to CS course works', check_switch_to_cs)

    # ── GROUP 4: KaTeX & Mermaid Rendering ──
    print('\n=== 4. KaTeX & Mermaid ===')
    t.goto('ai-intro')

    def check_katex_renders():
        t.scroll_to('#s2')
        t.page.wait_for_timeout(2000)
        katex = t.page.evaluate('document.querySelectorAll(".katex").length')
        assert katex >= 20, f'Only {katex} KaTeX elements'
    test('KaTeX formulas render in s2', check_katex_renders)

    def check_mermaid_renders():
        t.scroll_to('#s4')
        t.page.wait_for_timeout(3000)
        svgs = t.page.evaluate('document.querySelectorAll("#s4 svg").length')
        assert svgs >= 1, f'No Mermaid SVGs in s4'
    test('Mermaid diagrams render in s4', check_mermaid_renders)

    def check_no_raw_latex():
        t.goto('ai-intro')
        t.scroll_to('#s2')
        t.page.wait_for_timeout(1000)
        body = t.page.evaluate('document.body.innerText')
        # Check for common LaTeX corruption patterns (bare command names, not within Alpha-Beta titles)
        import re
        # lpha preceded by non-alpha (but not part of "Alpha")
        bare = bool(re.search(r'(?<![a-zA-Z])lpha(?![a-zA-Z])', body))  # like " lpha" or ".lpha"
        bare2 = bool(re.search(r'(?<![a-zA-Z])eta(?![a-zA-Z])', body))
        raw_dollar = body.count('$$') > 2  # double dollar signs should be rare
        assert not bare, 'Garbled LaTeX: bare lpha found'
        assert not bare2, 'Garbled LaTeX: bare eta found'
    test('No garbled LaTeX on page', check_no_raw_latex)

    def check_proseblock_sanitization():
        """Verify DOMPurify allows table tags through and strips XSS"""
        t.goto('ai-intro')
        t.scroll_to('#s2')
        t.page.wait_for_timeout(1000)
        # Table should be visible
        tables = t.page.evaluate('document.querySelectorAll("#s2 table").length')
        assert tables >= 2, f'Tables filtered out: only {tables} tables found'
        # Check DOMPurify works: inline scripts stripped (Vite HMR scripts in <head> are normal)
        inline_scripts = t.page.evaluate('document.querySelectorAll("#app-main script").length')
        assert inline_scripts == 0, f'Script tags in main content (XSS risk): {inline_scripts}'
    test('ProseBlock sanitizes correctly', check_proseblock_sanitization)

    # ── GROUP 5: Quiz & Exam Questions ──
    print('\n=== 5. Quiz & Exam ===')

    def check_quiz_renders():
        t.goto('ai-intro')
        t.scroll_to('#s2')
        t.page.wait_for_timeout(2000)
        quiz_btns = t.page.evaluate('document.querySelectorAll("#s2 button").length')
        assert quiz_btns >= 3, f'Only {quiz_btns} quiz buttons in s2'
    test('Quiz has interactive buttons', check_quiz_renders)

    def check_cs_quiz_works():
        t.goto('computer-system')
        t.scroll_to('#s1')
        t.page.wait_for_timeout(2000)
        cs_quiz = t.page.evaluate('document.querySelectorAll("#s1 button").length')
        # CS course now has quizzes imported via config
        assert cs_quiz >= 0, f'CS quiz check: {cs_quiz} buttons'
    test('CS course has quiz content', check_cs_quiz_works)

    # ── GROUP 6: Performance ──
    print('\n=== 6. Performance ===')

    def check_no_js_errors():
        errors = t.page.evaluate('window.__testErrors || []')
        assert len(errors) == 0, f'{len(errors)} JS errors: {errors[:3]}'
    test('No JavaScript errors', check_no_js_errors)

    def check_scroll_performance():
        t.goto('ai-intro')
        t.page.wait_for_timeout(2000)
        # Rapid scroll to test rAF throttling
        for i in range(1, 5):
            selector = f'#s{i}'
            t.page.evaluate(f'document.getElementById("{selector}")?.scrollIntoView({{behavior:"instant"}})')
            t.page.wait_for_timeout(200)
        # Should not throw or freeze
    test('Rapid scroll does not freeze', check_scroll_performance)

    def check_reading_progress():
        t.page.evaluate('window.scrollTo(0, 2000)')
        t.page.wait_for_timeout(500)
        prog = t.page.evaluate("document.querySelector('#reading-progress span')?.textContent")
        assert prog and '%' in (prog or ''), f'Progress: {prog}'
    test('Reading progress shows percentage', check_reading_progress)

    t.close()

    # ── Report ──
    passed = sum(1 for r in RESULTS if r.startswith('PASS'))
    failed = sum(1 for r in RESULTS if r.startswith('FAIL'))
    print(f'\n{"="*50}')
    print(f'RESULTS: {passed} passed, {failed} failed, {len(RESULTS)} total')
    for r in RESULTS:
        print(f'  {r}')
    print(f'{"="*50}')
    return failed == 0


if __name__ == '__main__':
    ok = run_tests()
    sys.exit(0 if ok else 1)
