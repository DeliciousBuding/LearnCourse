// Test fixLatex logic — the regex patterns
const LATEX_COMMANDS = ['alpha','beta','gamma','delta','epsilon','theta','lambda','mu','pi','sigma','tau','phi','omega','infty','forall','exists','approx','equiv','lfloor','rfloor','lceil','rceil','exp','log','ln','sum','int','prod','sqrt','frac','cdot','times','pm','le','ge','neq','rightarrow','leftarrow','Gamma','Delta','Theta','Lambda','Pi','Sigma','Omega','partial','nabla'];

function fixLatex(text) {
  if (!text) return text;
  for (const cmd of LATEX_COMMANDS) {
    const re = new RegExp(`(?<!\\\\)\\b${cmd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    text = text.replace(re, `\\${cmd}`);
  }
  return text;
}

// Tests
let pass = 0, fail = 0;
function test(name, input, expected) {
  const result = fixLatex(input);
  if (result === expected) { pass++; console.log(`PASS: ${name}`); }
  else { fail++; console.log(`FAIL: ${name}\n  expected: ${expected}\n  got:      ${result}`); }
}

// Should NOT touch correct LaTeX
test('correct alpha untouched', '\\alpha is Greek', '\\alpha is Greek');
test('correct beta untouched', '\\beta test', '\\beta test');
test('correct gamma untouched', '\\gamma ray', '\\gamma ray');
test('correct multiple untouched', '\\alpha+\\beta=\\gamma', '\\alpha+\\beta=\\gamma');

// Should fix corrupted (missing backslash)
test('fix corrupted alpha', 'alpha is missing', '\\alpha is missing');
test('fix corrupted beta', 'beta is missing', '\\beta is missing');
test('fix corrupted gamma', 'gamma is broken', '\\gamma is broken');
test('fix corrupted sigma', 'sigma bond', '\\sigma bond');

// Edge cases
test('empty string', '', '');
test('no LaTeX at all', 'hello world', 'hello world');
test('word containing cmd as substring', 'alphabet', 'alphabet'); // Should NOT fix — preceded by p
test('delta in sentence', 'the delta variant', 'the \\delta variant');

// Mixed
test('mixed correct and corrupted', '\\alpha and beta and \\gamma', '\\alpha and \\beta and \\gamma');

// Should not double-escape
test('no double escape alpha', '\\\\alpha', '\\\\alpha'); // Already double-escaped
test('no double escape beta', '\\\\beta', '\\\\beta');

console.log(`\n${pass} passed, ${fail} failed, ${pass+fail} total`);
process.exit(fail > 0 ? 1 : 0);
