var e={meta:{id:`s2`,number:2,title:`搜索算法`,icon:`Search`,courseware:`02 搜索.pptx`,examRefs:`2025 期中二, 2025 期末一(3)`},calloutText:`这章解决什么问题？在可能性空间里高效找到目标——从盲目搜索到有信息搜索，掌握 frontier 和启发式函数是关键。`,sections:[{id:`s2-s1`,title:`2.1 先理解直觉`,content:[{type:`prose`,html:`<p>你在迷宫里，怎么找到出口？你可能会说「每个岔路口都试试」。但试完之后发现走不通，你退回来再试另一条路——<strong>这就是搜索</strong>。AI 面对的问题通常不是「直接算出来的」，而是「在可能性空间里找出来的」。</p>`},{type:`prose`,html:`<p>比如你想从长沙开车去北京。BFS 就是「先扫描所有距离 500 公里的城市，再扫描 1000 公里的」；DFS 就是「一直往北开，开不动了再换条路」。BFS 能找到最短路径，DFS 省内存，但可能一头扎进死胡同。</p>`},{type:`prose`,html:`<p>如果你有地图上每座城市到北京的<strong>直线距离</strong>（启发式信息 (n)$），就可以「朝着北京的方向走」——这就是贪婪搜索。但只看方向不看已经走过的路，可能会绕远。把已走路程 (n)$ 和估计剩余 (n)$ 加起来——这就是 <strong>A* 搜索</strong>。</p>`}]},{id:`s2-s2`,title:`2.2 核心概念`,content:[{type:`table`,headers:[`符号`,`含义`,`一句话`,`谁用`],rows:[[`(n)$`,`真实代价 / 已花代价`,`从起点走到 n 已经花了多少`,`UCS、A*`],[`(n)$`,`启发式代价 / 估计代价`,`从 n 到目标还要花多少`,`贪婪、A*`],[`(n)$`,`综合代价`,` = g + h$（已花 + 预计还要的）`,`A*`]]},{type:`table`,headers:[`算法`,`挑谁`,`完备？`,`最优？`,`时间复杂度`,`空间复杂度`],rows:[[`BFS`,`最浅的`,`✅`,`仅等代价`,`(b^d)$`,`(b^d)$`],[`DFS`,`最深的`,`❌（可能无限深）`,`❌`,`(b^m)$`,`(bm)$`],[`UCS`,`(n)$ 最小的`,`✅（有限正代价）`,`✅`,`(b^{1+C^*/\\epsilon})$`,`(b^{1+C^*/\\epsilon})$`],[`贪婪`,`(n)$ 最小的`,`❌`,`❌`,`(b^m)$`,`(b^m)$`],[`A*`,`(n)=g(n)+h(n)$ 最小的`,`✅（有限图）`,`✅（$ 可容许）`,`指数`,`指数`]]},{type:`callout`,variant:`danger`,text:`A* 保证最优解的充要条件：(n)$ 是可容许的——即 (n)$ 永远不会高估从 n 到目标的真实代价。=0$ 恒可容许（退化为 UCS），=$ 直线距离也恒可容许。`},{type:`prose`,html:`<p>(n)$ 是一个确定的数——你已经走过的路，里程表上写的数字。(n)$ 是一个估计数——你猜还要多远，可能不准。(n)$ 把两者加起来，是「总成本的最佳估计」。</p>`}]},{id:`s2-s3`,title:`2.3 动手试试——UCS、贪婪、A* 逐步推演`,content:[{type:`mermaid`,id:`search-tree-2025-final`,chart:`graph TD
    A["A<br/>g=0 h=100 f=100"] -->|"80"| B["B<br/>g=80 h=30 f=110"]
    A -->|"25"| C["C<br/>g=25 h=55 f=80"]
    B -->|"5"| D["D<br/>g=85 h=35 f=120"]
    B -->|"10"| E["E<br/>g=90 h=20 f=110"]
    C -->|"5"| F["F<br/>g=30 h=80 f=110"]
    C -->|"45"| G["G<br/>g=70 h=0 f=70 ✅目标"]`},{type:`callout`,variant:`info`,text:`看懂这张图：A 是起点，G 是终点。边上数字是实际代价。节点旁标注 g（累计代价）、h（估计到 G 还要多少）、f（g+h）。考试时只给 g 和 h，f 需要你自己加。`},{type:`table`,headers:[`步骤`,`frontier（按相应规则排序）`,`挑谁？`],rows:[[`UCS-开局`,`A(g=0)`,`唯一选项，扩展 A`],[`UCS-A后`,`B(g=80), C(g=25)`,`g=25 最小 → 扩展 C`],[`UCS-C后`,`B(g=80), F(g=30), G(g=70)`,`g=30 最小 → 扩展 F`],[`UCS-F后`,`B(g=80), G(g=70)`,`g=70 最小 → 扩展 G ✓`],[`A*-开局`,`A(f=100)`,`扩展 A`],[`A*-A后`,`B(f=110), C(f=80)`,`f=80 最小 → C`],[`A*-C后`,`B(110), F(110), G(70)`,`f=70 最小 → G ✓`]]},{type:`prose`,html:`<p>UCS 访问顺序：<strong>A → C → F → G</strong>（四次）。A* 访问顺序：<strong>A → C → G</strong>（三次，精准命中）。虽然 A→B 边代价 80 看起来大，但 UCS 仍把 B 留在 frontier 里存着——UCS 的诚实之处就在于从不跳过更便宜的路径。</p>`}]},{id:`s2-s4`,title:`2.4 考试怎么考`,content:[{type:`card`,title:`搜索大题（20 分）答题模板`,body:`<p><strong>五步法</strong>：① 画 frontier 表 → ② 写出每轮 frontier 中所有节点的评价值（g/h/f）→ ③ 标出选中的节点 → ④ 展开它，加入子节点 → ⑤ 碰到目标就停。千万别跳步，老师就是看你每一步 frontier 怎么变的。</p>`},{type:`callout`,variant:`warning`,text:`常见错误：把 f 写成只有 h（忘记加 g）、frontier 排序不完整只写最小的一个、IDS 每次都从头开始（应该每层都是新的 DFS）、A* 不用 f 而只用 h。`}]},{id:`s2-s5`,title:`真题演练`,content:[{type:`examQuestions`,ids:[`eq-s2-3`]}]},{id:`s2-s6`,title:`小测验`,content:[{type:`quiz`,ids:[`q-s2-3`,`q-s2-4`]}]},{id:`s2-s7`,title:`2.5 搜索算法实战——四步走通所有搜索`,content:[{type:`prose`,html:`<p>搜索算法就像你在一座陌生城市找一家奶茶店。你可以一条街一条街地找（<strong>BFS</strong>），可以沿着一条路走到黑再回头（<strong>DFS</strong>），也可以打开手机地图看哪条路最近（<strong>Greedy</strong>），还可以把「已经走的路」和「剩下估计的路」加起来综合考虑（<strong>A*</strong>）。四种策略，同一个迷宫，结果完全不同。</p>`},{type:`prose`,html:`<p><strong>四步走通法：</strong>① 选策略定评估函数 → ② 初始化 frontier，放入起点 → ③ 循环：选节点 → 验目标 → 扩展子节点 → 更新 frontier → ④ 命中目标，回溯路径。无论考哪种算法，这四步都通用。</p>`},{type:`card`,title:`六种搜索算法一张表对比`,body:`<table><thead><tr><th>算法</th><th>用什么选节点</th><th>完备?</th><th>最优?</th><th>时间复杂度</th><th>空间复杂度</th></tr></thead><tbody><tr><td>BFS</td><td>先入先出（队列）</td><td>✅</td><td>仅等代价</td><td>O(b^d)</td><td>O(b^d)</td></tr><tr><td>UCS</td><td>(n)$ 最小</td><td>✅（有限正代价）</td><td>✅</td><td>O(b^(1+⌊C*/ε⌋))</td><td>同上</td></tr><tr><td>DFS</td><td>后入先出（栈）</td><td>❌（无限深时）</td><td>❌</td><td>O(b^m)</td><td>O(bm)</td></tr><tr><td>迭代加深</td><td>DFS 逐层加深</td><td>✅</td><td>仅等代价</td><td>O(b^d)</td><td>O(bd)</td></tr><tr><td>Greedy</td><td>(n)$ 最小</td><td>❌</td><td>❌</td><td>O(b^m)</td><td>O(b^m)</td></tr><tr><td>A*</td><td>(n)=g(n)+h(n)$ 最小</td><td>✅（可采纳时）</td><td>✅（可采纳时）</td><td>指数</td><td>指数</td></tr></tbody></table><p style="font-size:var(--text-xs);color:var(--color-text-secondary);margin-top:0.5rem;"><strong>记忆口诀：</strong>BFS 队列一层层扫，DFS 栈一条路走到黑，UCS 只看已花代价(g)，Greedy 只看估计剩余(h)，A* 两者相加(f=g+h)。迭代加深 = DFS + 逐层加深，省内存又能保证完备。</p>`},{type:`card`,title:`可采纳性与一致性（人话版）`,body:`<p><strong>可采纳启发式（admissible）：乐观估计，永远不会高估实际代价。</strong>比如地图上算直线距离——实际路肯定不比直线短，所以 h(n) ≤ 真实代价。只要 h 可采纳，A* 保证找到最优解。</p><hr style="margin:0.75rem 0;border-color:var(--color-border)"><p><strong>一致性（consistent）：三角不等式。</strong>h(n) ≤ c(n, a, n') + h(n')。从 n 到目标的估计代价，不会比「先走一步到 n'，再从 n' 到目标」的代价更大。一致性是可采纳性的加强版——一致的启发式一定可采纳，反之不一定。</p><hr style="margin:0.75rem 0;border-color:var(--color-border)"><p><strong>考试判据速查：</strong></p><ul><li>可采纳：逐个检查 h(n) ≤ h*(n)（真实最优代价）。有一个超了就不可采纳。</li><li>一致性：逐个检查每条边 n→n'，验证 h(n) ≤ c(n,n') + h(n')。有一条不满足就不一致。</li><li>h=0 恒可采纳且一致（此时 A* 退化为 UCS）。直线距离恒可采纳（但不一定一致，视障碍物而定）。</li></ul>`},{type:`mermaid`,id:`search-practice-graph`,chart:`graph LR
    S["S (起点)<br/>h=3"] -->|"1"| A["A<br/>h=3"]
    S -->|"4"| B["B<br/>h=2"]
    A -->|"2"| C["C<br/>h=1"]
    A -->|"5"| G["G (目标)<br/>h=0"]
    B -->|"1"| C
    C -->|"2"| G`},{type:`details`,summary:`练习1：手工推进 A* —— 用上面的图，写出每一步的 frontier`,body:`<details>

<div class="details-body">
<p><strong>题目：</strong>上图有 5 个节点（S 起点，G 目标）。边上数字是实际代价，节点旁标注了 h 值。请用 A* 算法（f = g + h）从 S 搜索到 G，写出每一步的 frontier 集合、选中节点、以及每个候选节点的 g / h / f 值。</p>

<p><strong>答案——Step-by-step：</strong></p>

<table>
<thead><tr><th>步骤</th><th>frontier（节点: g, h, f）</th><th>f 最小</th><th>动作</th></tr></thead>
<tbody>
<tr><td>1</td><td>S: g=0, h=3, <strong>f=3</strong></td><td>S (f=3)</td><td>扩展 S，生成 A、B</td></tr>
<tr><td>2</td><td>A: g=1, h=3, <strong>f=4</strong> | B: g=4, h=2, f=6</td><td>A (f=4)</td><td>扩展 A，生成 C、G</td></tr>
<tr><td>3</td><td>C: g=3, h=1, <strong>f=4</strong> | G(经A): g=6, h=0, f=6 | B: f=6</td><td>C (f=4)</td><td>扩展 C，生成 G</td></tr>
<tr><td>4</td><td>G(经C): g=5, h=0, <strong>f=5</strong> | G(经A): f=6 | B: f=6</td><td>G (f=5) ✅</td><td>到达目标！停止</td></tr>
</tbody>
</table>

<p><strong>最优路径：S → A → C → G，总代价 = 1 + 2 + 2 = 5。</strong></p>

<hr style="margin:0.75rem 0;border-color:var(--color-border)">

<p><strong>对比——如果用的是 Greedy（只看 h）：</strong></p>
<table>
<thead><tr><th>步骤</th><th>frontier（h 值）</th><th>h 最小</th></tr></thead>
<tbody>
<tr><td>1</td><td>S(h=3)</td><td>S</td></tr>
<tr><td>2</td><td>A(h=3), B(h=2)</td><td>B (h=2) ← 被 h 误导！</td></tr>
<tr><td>3</td><td>A(h=3), C(h=1)</td><td>C (h=1)</td></tr>
<tr><td>4</td><td>A(h=3), G(h=0)</td><td>G ✅</td></tr>
</tbody>
</table>
<p>Greedy 路径：S → B → C → G，总代价 = 4 + 1 + 2 = <strong>7</strong>（比最优的 5 多了 40%）。这就是只看 h 不看 g 的代价——走了 S→B 这条贵路。</p>

<p><strong>对比——UCS（只看 g，h=0）：</strong></p>
<table>
<thead><tr><th>步骤</th><th>frontier（g 值）</th><th>g 最小</th></tr></thead>
<tbody>
<tr><td>1</td><td>S(g=0)</td><td>S</td></tr>
<tr><td>2</td><td>A(g=1), B(g=4)</td><td>A</td></tr>
<tr><td>3</td><td>C(g=3), B(g=4), G(g=6)</td><td>C</td></tr>
<tr><td>4</td><td>B(g=4), G(g=5), G(g=6)</td><td>B</td></tr>
<tr><td>5</td><td>G(g=5), G(g=6), C(g=5)</td><td>G ✅</td></tr>
</tbody>
</table>
<p>UCS 路径也是 S→A→C→G（5），但比 A* 多扩展了一个节点（B）。A* 因为有了启发式指引，更精准。</p>
</div>
</details>`},{type:`details`,summary:`练习2：判断可采纳性与一致性——三组启发式，哪个能用？`,body:`<details>

<div class="details-body">
<p><strong>题目：</strong>仍用上方的图。各节点到 G 的真实最优代价 h* 为：</p>
<table>
<thead><tr><th>节点</th><th>S</th><th>A</th><th>B</th><th>C</th><th>G</th></tr></thead>
<tbody><tr><td>真实最优 h*</td><td>5</td><td>4</td><td>3</td><td>2</td><td>0</td></tr></tbody>
</table>

<p>现有三组启发式函数 h₁、h₂、h₃：</p>
<table>
<thead><tr><th>节点</th><th>S</th><th>A</th><th>B</th><th>C</th><th>G</th></tr></thead>
<tbody>
<tr><td>h₁</td><td>6</td><td>2</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>h₂</td><td>3</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
<tr><td>h₃</td><td>4</td><td>4</td><td>2</td><td>0</td><td>0</td></tr>
</tbody>
</table>

<p>请判断：每组 h 是否可采纳？是否一致？</p>

<hr style="margin:0.75rem 0;border-color:var(--color-border)">

<p><strong>答案：</strong></p>

<p><strong>h₁ —— ❌ 不可采纳，因此也不必检查一致性。</strong></p>
<ul>
<li>验证可采纳性：h₁(S)=6，但 h*(S)=5。6 > 5，<strong>高估了</strong>。</li>
<li>只要有一个节点高估，整个 h 就不可采纳。A* 用它不能保证最优解。</li>
</ul>

<p><strong>h₂ —— ✅ 可采纳，✅ 一致。</strong></p>
<ul>
<li><strong>可采纳性：</strong>逐个对比 h₂ 与 h*：3≤5 ✓、3≤4 ✓、2≤3 ✓、1≤2 ✓、0≤0 ✓。全部不超，可采纳。</li>
<li><strong>一致性：</strong>逐边验证三角不等式 h(n) ≤ c(n,n') + h(n')：
  <ul>
    <li>S→A: 3 ≤ 1 + 3 = 4 ✓</li>
    <li>S→B: 3 ≤ 4 + 2 = 6 ✓</li>
    <li>A→C: 3 ≤ 2 + 1 = 3 ✓（恰好相等）</li>
    <li>A→G: 3 ≤ 5 + 0 = 5 ✓</li>
    <li>B→C: 2 ≤ 1 + 1 = 2 ✓（恰好相等）</li>
    <li>C→G: 1 ≤ 2 + 0 = 2 ✓</li>
  </ul>
  全部满足，一致。</li>
</ul>

<p><strong>h₃ —— ✅ 可采纳，❌ 不一致。</strong></p>
<ul>
<li><strong>可采纳性：</strong>4≤5 ✓、4≤4 ✓、2≤3 ✓、0≤2 ✓、0≤0 ✓。全部不超，可采纳。</li>
<li><strong>一致性：</strong>但看 A→C 这条边——h₃(A)=4，c(A,C)+h₃(C)=2+0=2。<strong>4 ≤ 2？不成立！</strong>再看 B→C——h₃(B)=2，c(B,C)+h₃(C)=1+0=1。<strong>2 ≤ 1？也不成立！</strong>h₃(C)=0 太「乐观」了，导致从 A 或 B 到 C 时违反了三角不等式。</li>
</ul>

<p><strong>核心结论：可采纳 ≠ 一致。一致是可采纳的充分不必要条件——一致的 h 一定可采纳，但可采纳的 h 不一定一致。</strong>考试如果只要求证明「A* 最优」，可采纳就够了；但如果考到「图搜索不会重复展开节点」，那就需要一致性。</p>
</div>
</details>`},{type:`callout`,variant:`warning`,text:`经典混淆点：① Greedy 只看 h 不看 g——只看「离目标还有多远」，不看「已经走了多远」，所以可能绕远路（练习1中 Greedy 走出 7，最优是 5）。② A* 的 f = g + h：已经付出的 + 估计还要付出的 = 估计总成本。只要 h 可采纳，A* 保证找到最优解。③ UCS 是 A* 的特例——当 h ≡ 0 时，f = g + 0 = g，退化为纯 UCS。④ 迭代加深 = DFS 套一层「深度限制」的壳，逐层加深直到找到解——兼具 DFS 的省内存和 BFS 的完备性。`}]}]};export{e as default};