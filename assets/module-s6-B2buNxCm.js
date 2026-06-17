var e={meta:{id:`s6`,number:6,title:`命题逻辑与一阶逻辑`,icon:`Sigma`,courseware:`08 逻辑 Agent.pptx, 09 一阶逻辑.pptx`,examRefs:`2025 期中一(4)(5), 2025 期末一(6), 2025 期末二(2)`},calloutText:`🎯 这章解决什么问题？用数学语言精确描述"所有 P 都是 Q"这种句子——为什么命题逻辑做不到，一阶逻辑可以。`,sections:[{id:`s6-s2`,title:`6.1 先理解直觉`,content:[{type:`prose`,html:`<p>想象你在写一个"自动判案"程序。输入是："所有杀人犯都应受惩罚"、"张三杀了人"。你希望程序输出："张三应受惩罚"。</p>`},{type:`prose`,html:`<p>你的第一反应可能是用<strong>命题逻辑</strong>：给每个句子一个字母——<em>P</em> = "所有杀人犯都应受惩罚"，<em>Q</em> = "张三杀了人"，<em>R</em> = "张三应受惩罚"。然后希望 P ∧ Q → R。</p>`},{type:`prose`,html:`<p><strong>但这不行。</strong>命题逻辑把"所有杀人犯"和"张三"看作完全独立的东西——它不知道"张三"是"杀人犯"的一个实例。命题逻辑<strong>不能处理"所有"（$\\forall$）和"存在"（$\\exists$）</strong>。</p>`},{type:`prose`,html:`<p><strong>一阶逻辑（FOL）</strong>解决了这个问题：让你说 ∀x (杀人犯(x) → 应受惩罚(x))，然后用"张三"代入 x，得到应受惩罚(张三)。这就是<strong>"量化"</strong>的力量。</p>`}]},{id:`s6-s3`,title:`6.2 核心概念`,content:[{type:`prose`,html:`<div class="grid-2">
<div>
<h4>命题逻辑</h4>
<table>
<tbody><tr><th>要素</th><th>说明</th><th>例子</th></tr>
<tr><td>原子命题</td><td>不可再分的真假陈述</td><td>P = "下雨"</td></tr>
<tr><td>联结词</td><td>$\\land \\lor \\to \\leftrightarrow \\lnot$</td><td>P → Q</td></tr>
<tr><td>真值表</td><td>穷举所有组合判断真假</td><td>见下</td></tr>
<tr><td>归结</td><td>机械证明方法</td><td>¬P∨Q, P ⊢ Q</td></tr>
</tbody></table>
</div>
<div>
<h4>一阶逻辑</h4>
<table>
<tbody><tr><th>要素</th><th>说明</th><th>例子</th></tr>
<tr><td>常量</td><td>具体对象</td><td>苏格拉底, 张三</td></tr>
<tr><td>谓词</td><td>对象的属性/关系</td><td>Mortal(x), Kill(x,y)</td></tr>
<tr><td>量词</td><td>∀(全称) ∃(存在)</td><td>∀x Mortal(x)</td></tr>
<tr><td>函数</td><td>对象到对象的映射</td><td>father(x)</td></tr>
</tbody></table>
</div>
</div>`},{type:`prose`,html:`<h4>关键联结词真值表</h4>`},{type:`table`,headers:[],rows:[[`P`,`Q`,`¬P`,`P∧Q`,`P∨Q`,`P→Q`,`P↔Q`],[`T`,`T`,`F`,`T`,`T`,`T`,`T`],[`T`,`F`,`F`,`F`,`T`,`F`,`F`],[`F`,`T`,`T`,`F`,`T`,`T`,`F`],[`F`,`F`,`T`,`F`,`F`,`T`,`T`]]},{type:`prose`,html:`<p><strong>记忆技巧：</strong>P→Q 只在"前真后假"时为假（承诺没兑现）。P↔Q 在两者相同时为真。</p>`},{type:`prose`,html:`<h4>自然语言 → FOL 翻译模板（重中之重！考试必考）</h4>`},{type:`table`,headers:[],rows:[[`中文模式`,`FOL 公式`,`为什么`,`常见错误`],[`"所有 P 都是 Q"`,`∀x (P(x) → Q(x))`,`对每个 x：如果它是 P，那么它必须是 Q。→ 恰好表达"凡是P必是Q"`,`∀x (P(x) ∧ Q(x)) 意思是"宇宙中每个东西既是P又是Q"，太强了`],[`"有些 P 是 Q"`,`∃x (P(x) ∧ Q(x))`,`存在至少一个 x：它既是 P 又是 Q。∧ 表达"同时满足"`,`∃x (P(x) → Q(x)) 太弱了——只要存在一个不是P的东西，蕴涵就自动真`],[`"没有 P 是 Q"`,`∀x (P(x) → ¬Q(x)) 或 ¬∃x (P(x) ∧ Q(x))`,`两种等价写法：要么"所有P都不是Q"，要么"不存在既是P又是Q的东西"`,`—`],[`"只有 P 才是 Q"`,`∀x (Q(x) → P(x))`,`"只有P才是Q" = 如果某物是Q，则它必须是P。注意方向反了！`,`∀x (P(x) → Q(x)) 这是"所有P都是Q"，箭头方向反了`]]},{type:`callout`,variant:`warning`,text:`⚠ 量词顺序陷阱："每个学生都有一本教材" → ∀s ∃b Textbook(b) ∧ Has(s,b)（每人有自己的教材，可以不同）。而 ∃b ∀s Textbook(b) ∧ Has(s,b) 意思是"存在一本教材，所有学生都用它"——意思完全不同！`}]},{id:`s6-s4`,title:`6.3 动手试试：CNF 转换`,content:[{type:`prose`,html:`<p><strong>为什么需要 CNF？</strong>归结证明要求所有公式都是"子句的合取"形式（即 CNF）。考试中必须先转换再归结。</p>`},{type:`card`,title:`将 (P → Q) → (¬R → ¬P) 转换为 CNF`,body:`<div class="card">

<ol>
<li><strong>消除 →：</strong>A → B 变成 ¬A ∨ B<br>外层：¬(P → Q) ∨ (¬R → ¬P)<br>内层展开：¬(¬P ∨ Q) ∨ (¬¬R ∨ ¬P)</li>
<li><strong>¬ 向内推（De Morgan）：</strong><br>¬(¬P ∨ Q) = (¬¬P ∧ ¬Q) = (P ∧ ¬Q)<br>所以：(P ∧ ¬Q) ∨ (R ∨ ¬P)（¬¬R = R）</li>
<li><strong>分配律（∨ 对 ∧ 分配）：</strong><br>(P ∧ ¬Q) ∨ (R ∨ ¬P) = (P ∨ R ∨ ¬P) ∧ (¬Q ∨ R ∨ ¬P)</li>
<li><strong>化简：</strong>P ∨ ¬P 恒真，第一项可消去<br>最终 CNF：<strong>¬P ∨ R ∨ ¬Q</strong></li>
</ol>
</div>`}]},{id:`s6-s5`,title:`6.4 考试怎么考`,content:[{type:`prose`,html:`<h4>推理规则速查表（考试在每一步旁注明用的是什么规则）</h4>`},{type:`table`,headers:[],rows:[[`规则名`,`英文`,`形式`,`一句话`],[`假言推理`,`Modus Ponens`,`P, P→Q ⊢ Q`,`下雨则地湿，下雨了，所以地湿`],[`拒取式`,`Modus Tollens`,`P→Q, ¬Q ⊢ ¬P`,`下雨则地湿，地没湿，所以没下雨`],[`假言三段论`,`Hypothetical Syllogism`,`P→Q, Q→R ⊢ P→R`,`传递性`],[`析取三段论`,`Disjunctive Syllogism`,`P∨Q, ¬P ⊢ Q`,`两者至少一真，P假所以Q真`],[`∧-消去`,`Simplification`,`P∧Q ⊢ P`,`拆开"且"取左边`],[`∧-引入`,`Conjunction`,`P, Q ⊢ P∧Q`,`拼成"且"`],[`∨-引入`,`Addition`,`P ⊢ P∨Q`,`已有P，加个Q用"或"连接也是真`],[`归结`,`Resolution`,`P∨Q, ¬P∨R ⊢ Q∨R`,`互补文字消去，机器证明核心`]]}]},{id:`s6-s6`,title:`6.5 真题演练`,content:[{type:`examQuestions`,ids:[`eq-s6-8`,`eq-s6-9`]}]},{id:`s6-s7`,title:`6.6 小测验`,content:[{type:`quiz`,ids:[`q-s6-10`,`q-s6-11`]}]}]};export{e as default};