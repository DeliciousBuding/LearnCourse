var e={meta:{id:`s4`,number:4,title:`对抗搜索`,icon:`Swords`,courseware:`05 对抗搜索.pptx`,examRefs:`2025 期中三(3), 2025 期末一(1)(2)`},calloutText:`这章解决什么问题？下棋时，你走一步我走一步——你不光要想自己最优，还得想对手会怎么堵你。这不再是"找路"，而是"在对手存在的情况下做最优决策"。`,sections:[{id:`s4-s2`,title:`4.1 先理解直觉`,content:[{type:`prose`,html:`<p>你和朋友下井字棋。轮到你下时，你在想什么？你在想："我下这里肯定赢。"但你马上又想："不对，如果下这里，他一定会堵那个位置。"</p>`},{type:`prose`,html:`<p><strong>这就是 Minimax 的直觉。</strong>你不只考虑"我现在最想走哪一步"，你还必须考虑对手的反应。你是 MAX，想让最终结果尽量大（赢）；对手是 MIN，想让最终结果尽量小（让你输）。</p>`},{type:`prose`,html:`<p>所以你作为 MAX，在每个分支岔路口选最大的；对手作为 MIN，在每个分支岔路口选最小的。两者交替，最后回到根节点时你就知道——<strong>在当前局面下，我最多能争取到什么结果</strong>。</p>`},{type:`prose`,html:`<p>这里面有一个关键假设：<strong>对手是理性的</strong>。他不会犯傻帮你。Minimax 不是"往好的想"，而是"在对手最聪明的情况下，我最多能拿多少"——这是一种稳健的保守策略。</p>`}]},{id:`s4-s3`,title:`4.2 Minimax 手算推演`,content:[{type:`prose`,html:`<p>给你一棵博弈树，叶子节点的值已知。怎么算每个节点的值？</p>`},{type:`mermaid`,id:`minimax-tree`,chart:`graph TD
    ROOT["[根] MAX<br/>max(A,B)=2"] -->|"左"| A["[A] MIN<br/>min(3,5,2)=2"]
    ROOT -->|"右"| B["[B] MIN<br/>min(4,7,1)=1"]
    A --> L1["3"]
    A --> L2["5"]
    A --> L3["2"]
    B --> L4["4"]
    B --> L5["7"]
    B --> L6["1"]`},{type:`prose`,html:`<p><strong>从叶子往上算：</strong></p>`},{type:`prose`,html:`<p><strong>从叶子往上算：</strong></p>
<p>$A$ 的下层是 MIN 节点 → MIN 想让我最小 → $A = min(3, 5, 2) = 2$</p>
<p>$B$ 的下层是 MIN 节点 → MIN 想让我最小 → $B = min(4, 7, 1) = 1$</p>
<p>根节点的下层是 MAX 节点 → MAX 想最大 → $根 = max(A, B) = max(2, 1) = 2$</p>
<p><strong>结论：</strong>如果双方都理性，最终结果值 = $2$。MAX 应该选择通往 $A$ 的分支。</p>`},{type:`prose`,html:`<p><strong>结论：</strong>如果双方都理性，最终结果值 = 2。MAX 应该选择通往 A 的分支。</p>`},{type:`callout`,variant:`danger`,text:`做题第一铁律：必须先标每层谁是 MAX、谁是 MIN。同一组叶子值，在不同层解释完全不同——关键取决于这层轮到谁行动。`}]},{id:`s4-s4`,title:`4.3 $\x07alpha$-$\b\beta$ 剪枝——为什么有些路不用走到底`,content:[{type:`prose`,html:`<p>假设你是 MAX，已经看了一条路线能保证拿至少 5 分（α = 5）。现在看另一条路线时，你发现对手（MIN）在某一层已经能把局面压到 2 分——这条路线你最多拿 2。但你已经有 5 了，你还会走这条路吗？不会。后面全不用看了。</p>`},{type:`prose`,html:`<p><strong>这就是剪枝的直觉。</strong></p>`},{type:`prose`,html:`<p>$\\aalpha$：MAX 当前<strong>已经能保证</strong>拿到的最低分数（下界）——"我不用考虑比这更差的结果了"</p>`},{type:`prose`,html:`<p>$\\b\beta$：MIN 当前<strong>已经能限制</strong>到的最高分数（上界）——"我不会让你拿得比这更多了"</p>`},{type:`table`,headers:[],rows:[[`节点类型`,`剪枝条件`,`直觉`],[`MIN 节点`,`如果 v ≤ α → 剪枝`,`"我（MIN）已经找到一条让你（MAX）最多拿 v 的路了，但你已经有 α 那么好的选择了——你不会再走我这边的，我不用继续算了"`],[`MAX 节点`,`如果 v ≥ β → 剪枝`,`"我（MAX）已经能拿到 v 了，但 MIN 在前面已经把你的上限压到了 β（比 v 小）——MIN 根本不会让你走到我这，我不用继续算了"`]]},{type:`prose`,html:`<p><strong>$\x07alpha$-$\b\beta$ 剪枝不改变最终结果。</strong>为什么？因为被剪掉的分支，本来就不可能成为最优动作——它们要么比已知的更差（对 MAX 而言），要么对手根本不会让你走到那里。所以删掉只是省了计算，不影响最终结论。</p>`}]},{id:`s4-s5`,title:`4.4 考试怎么考`,content:[{type:`prose`,html:`<h4>题型与分值</h4>`},{type:`table`,headers:[],rows:[[`题型`,`分值`,`考查内容`],[`Minimax 手算题`,`6~10 分`,`给一棵博弈树，从叶子节点往上逐层填 Minimax 值，指出最优行动`],[`$\x07lpha$-$\beta$ 剪枝题`,`4~6 分`,`在 Minimax 基础上标注哪些分支被剪掉，写剪枝条件`],[`概念判断题`,`2~4 分`,`Minimax 的基本假设、剪枝是否影响最终结果、节点类型判断`]]},{type:`prose`,html:`<h4>得分点</h4>`},{type:`prose`,html:`<ul>
<li><strong>Minimax 值计算（4分）：</strong>从叶子往上，每层正确标注 MAX/MIN 类型，正确取 max/min。一个节点算错，整条线上都错——连锁反应。</li>
<li><strong>最优行动（2分）：</strong>看根节点的子节点值，选最大（MAX）或最小（MIN）对应的分支。</li>
<li><strong>$\x07lpha$-$\beta$ 剪枝标注（4分）：</strong>标注哪些节点被剪，注明剪枝条件（$v \\le \x07lpha$ 或 $v \\ge \beta$）。只写"剪"不写条件，至少扣 2 分。</li>
<li><strong>概念回答（2分）：</strong>剪枝不改变最终 Minimax 值，以及为什么。</li>
</ul>`},{type:`prose`,html:`<h4>常见错误</h4>`},{type:`callout`,variant:`danger`,text:`致命错误1：不标每层的 MAX/MIN 角色就开始算。同一组叶子值，如果这层是 MAX，取 max；如果是 MIN，取 min。不标记角色，方向可能完全相反。`},{type:`callout`,variant:`warning`,text:`常见错误2：$\x07lpha$-$\beta$ 剪枝方向搞反。MIN 节点处剪枝条件是 $v \\le \x07lpha$（不是 $v \\ge \beta$）；MAX 节点处剪枝条件是 $v \\ge \beta$（不是 $v \\le \x07lpha$）。`},{type:`callout`,variant:`warning`,text:`常见错误3：以为剪枝会改变最终结果。$\x07lpha$-$\beta$ 剪枝砍掉的只是"不可能被选中的分支"，最终 Minimax 值不变——剪枝是性能优化，不改变答案。`},{type:`prose`,html:`<h4>答题模板</h4>`},{type:`code`,language:``,code:`【Minimax 手算题】
步骤1：标注每层角色（MAX/MIN，从叶子往上交替）
步骤2：叶子值已知，逐层往上算：
  - 如果上层是 MAX，取所有子节点的最大值
  - 如果上层是 MIN，取所有子节点的最小值
步骤3：根节点的值就是最终结果
步骤4：根节点选值最大的子节点对应的动作（MAX 时）

【α-β 剪枝题——在 Minimax 基础上】
初始化：α = -∞（MAX 的下界），β = +∞（MIN 的上界）
遍历时更新 α/β 并检查：
  - 在 MIN 节点：如果子节点值 v ≤ α → 剪枝（后面的兄弟不用看了）
  - 在 MAX 节点：如果子节点值 v ≥ β → 剪枝
最后纸上标注：哪条边被剪、剪枝条件是什么`}]},{id:`s4-s6`,title:`4.5 真题演练`,content:[{type:`examQuestions`,ids:[`eq-s4-6`,`eq-s4-7`]}]},{id:`s4-s7`,title:`4.6 小测验`,content:[{type:`quiz`,ids:[`q-s4-7`,`q-s4-8`]}]}]};export{e as default};