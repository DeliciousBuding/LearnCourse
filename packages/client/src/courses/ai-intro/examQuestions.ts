import type { ExamQuestion } from '@learncourse/framework/types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: "eq-s1-1",
    moduleId: "s1",
    year: "2025 期中",
    position: "一(1)",
    points: 6,
    questionText: "<p><strong>题目：</strong>一个智能快递分拣机器人，它通过摄像头扫描包裹上的条形码，用机械臂将包裹抓起并放入对应区域的分拣箱。分拣正确率高、速度快、不损坏包裹才算干得好。请用 PEAS 描述该任务。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><table><tbody><tr><th>P（性能）</th><td>分拣正确率高、包裹不损坏、分拣速度快、出错率低（2分：写出2条以上具体度量）</td></tr><tr><th>E（环境）</th><td>传送带、包裹、分拣箱、仓库车间（1分）</td></tr><tr><th>A（执行器）</th><td>机械臂马达、夹爪、传送带电机（1分）</td></tr><tr><th>S（传感器）</th><td>摄像头（条形码识别）、压力传感器（夹持力度）（2分：写出2个以上）</td></tr></tbody></table><p><strong>评分要点：</strong></p><ul><li>P 必须体现与快递场景相关的度量——\"正确率\"\"不损坏\"\"速度快\"，不能只写\"好\"</li><li>A 是\"动作\"类东西——马达、夹爪、电机</li><li>S 是\"感知\"类东西——摄像头、传感器</li><li>最常见的扣分：把\"条形码\"写成 A（它是被感知的对象，不是执行器），把\"摄像头\"写成 A（它是传感器不是执行器）</li><li>PEAS 描述的核心：每个字母都要写出与题目场景相关的具体内容，不能只写抽象定义</li></ul>"
  },
  {
    id: "eq-s1-2",
    moduleId: "s1",
    year: "2025 期中",
    position: "一(2)",
    points: 4,
    questionText: "<p><strong>题目：</strong>一个智能空调系统：它通过温度传感器探测室温（传感器），根据设定目标温度来决定制冷或制热（目标），在达到目标温度的多条路径中——可以大风速快速降温但噪音大，也可以小风速安静但慢——它根据用户偏好\"安静优先\"来选择（效用）。此外，它记录每次用户手动调节的数据，逐步优化自己的温控策略（学习）。请判断这个智能空调最突出的 Agent 类型，并说明理由。</p>",
    answerHtml: "<p><strong>参考答案：学习型 Agent（2分）</strong></p><p><strong>理由（2分）：</strong>该空调具备从用户手动调节的历史数据中改进自身策略的能力——\"记录每次用户手动调节的数据，逐步优化自己的温控策略\"，这正是学习型 Agent 的核心特征：从经验中改进行为。</p><p><strong>补充说明：</strong>该空调同时也具备基于目标和基于效用的特征——目标温度驱动决策、安静优先体现了效用比较——但最突出的特征是\"会从数据中越变越好\"，即学习。</p><p><strong>评分要点：</strong></p><ul><li>写\"学习型\"得 2 分，写其他类型但理由合理最多得 1 分</li><li>理由必须引用题目中的原话——\"记录数据、优化策略\"</li><li>Agent 类型判断题的通用模式：类型名称（1分）+ 一句话理由引用题中信息（1分）</li></ul>"
  },
  {
    id: "eq-s2-3",
    moduleId: "s2",
    year: "2025 期末",
    position: "二",
    points: 20,
    questionText: "<p><strong>题目：</strong>如图所示搜索树，A 是起始结点，G 是目标结点。给出下列搜索算法的结点访问顺序：（1）一致代价搜索（5分）；（2）迭代加深的深度优先搜索（5分）；（3）贪婪最佳优先搜索（5分）；（4）A* 树搜索（5分）。</p>",
    answerHtml: "<p><strong>答案速查：</strong></p><table><tbody><tr><th>算法</th><th>访问顺序</th><th>挑选规则</th></tr><tr><td>一致代价搜索 UCS</td><td><strong>A → C → F → G</strong></td><td>每次扩展 g(n) 最小</td></tr><tr><td>迭代加深 DFS</td><td>深0: A；深1: A,B,C；深2: A,B,D,E,C,F,<strong>G</strong></td><td>DFS + 逐层加深限制</td></tr><tr><td>贪婪最佳优先</td><td><strong>A → B → E → D → C → G</strong></td><td>每次扩展 h(n) 最小</td></tr><tr><td>A* 树搜索</td><td><strong>A → C → G</strong></td><td>每次扩展 f(n)=g(n)+h(n) 最小</td></tr></tbody></table><div><strong>做题五步法：</strong>①画 frontier 表 → ②写出每轮 frontier 中所有节点的评价值（g/h/f） → ③标出选中的节点 → ④展开它，把子节点加入 frontier → ⑤碰到目标就停。千万别跳步，老师就是看你每一步 frontier 怎么变的。</div><p><strong>关于 UCS 扩展顺序的补充：</strong>此题中，C(g=25) pop 后生成了 F(g=30) 和 G(g=70)。frontier 中有 B(g=80)、F(g=30)、G(g=70)。F 的 g 最小（30），被优先 pop——虽然 F 不在去 G 的路上。这就是 UCS 的诚实之处：它不预测，只看 g 的数字。</p>"
  },
  {
    id: "eq-s3-4",
    moduleId: "s3",
    year: "2025 期末",
    position: "",
    points: 6,
    questionText: "<p><strong>题目：</strong>一个遗传算法种群有 5 个个体，适应度分别为：12、6、9、3、10。请用轮盘赌选择方法，计算每个个体的选择概率和累积概率区间。如果随机数 rand=0.62，选中哪个个体？</p>",
    answerHtml: "<p><strong>第 1 步：算总适应度</strong></p><pre>总适应度 = 12 + 6 + 9 + 3 + 10 = 40</pre><p><strong>第 2 步：算选择概率</strong></p><pre>p1 = 12/40 = 0.30\np2 =  6/40 = 0.15\np3 =  9/40 = 0.225\np4 =  3/40 = 0.075\np5 = 10/40 = 0.25</pre><p><strong>第 3 步：写累积概率区间</strong></p><pre>个体1: [0.000, 0.300)\n个体2: [0.300, 0.450)\n个体3: [0.450, 0.675)\n个体4: [0.675, 0.750)\n个体5: [0.750, 1.000]</pre><p><strong>rand = 0.62</strong> 落在 [0.450, 0.675) → 选中 <strong>个体 3</strong>。</p><p><strong>自检：</strong>所有概率加起来应该等于 1.0：0.30+0.15+0.225+0.075+0.25 = 1.000 ✓</p>"
  },
  {
    id: "eq-s4-6",
    moduleId: "s4",
    year: "2025 期中",
    position: "",
    points: 8,
    questionText: "<p><strong>题目：</strong>以下是一棵博弈树，MAX 先行动。叶子节点值已知（最底层数字）。请从叶子往上逐层计算每个节点的 Minimax 值，并在根节点标注最优行动方向。</p><pre>                [根:MAX]\n               /    |    \\\n           [A:MIN] [B:MIN] [C:MIN]\n          /  \\     /  \\     /  \\\n        [D]  [E] [F]  [G] [H]  [I]\n        /\\   /\\   /\\   /\\   /\\   /\\\n       3 5  2 7  4 1  6 8  2 9  0 3</pre>",
    answerHtml: "<p><strong>第 1 层（叶子→中间节点 D~I）：</strong></p><pre>D 的下层是 MAX → D = max(3, 5) = 5\nE 的下层是 MAX → E = max(2, 7) = 7\nF 的下层是 MAX → F = max(4, 1) = 4\nG 的下层是 MAX → G = max(6, 8) = 8\nH 的下层是 MAX → H = max(2, 9) = 9\nI 的下层是 MAX → I = max(0, 3) = 3</pre><p><strong>第 2 层（D~I → A~C）：</strong>A、B、C 都是 MIN 节点</p><pre>A = min(D, E) = min(5, 7) = 5\nB = min(F, G) = min(4, 8) = 4\nC = min(H, I) = min(9, 3) = 3</pre><p><strong>第 3 层（A~C → 根）：</strong>根是 MAX 节点</p><pre>根 = max(A, B, C) = max(5, 4, 3) = 5</pre><p><strong>最终 Minimax 值 = 5。MAX 应选择通往 A 的分支。</strong></p><p><strong>评分要点：</strong></p><ul><li>每层角色标注正确（2分）——必须从叶子往上判断层次</li><li>中间节点值计算正确（3分）——D~I 的值、A~C 的值</li><li>根节点值和最优动作正确（3分）——值=5，选A分支</li></ul>"
  },
  {
    id: "eq-s4-7",
    moduleId: "s4",
    year: "2025 期中",
    position: "",
    points: 6,
    questionText: "<p><strong>题目：</strong>在以下三层的博弈树上执行 α-β 剪枝（MAX 先动，自左向右遍历，初始 α=-∞, β=+∞）。请标注哪些分支被剪掉，并写明每一步的剪枝条件。</p><pre>           [根:MAX α=-∞ β=+∞]\n           /            \\\n      [A:MIN]          [B:MIN]\n     /    |    \\        /      \\\n  [D]   [E]   [F]    [G]     [H]\n  /\\    /\\    /\\      /\\       /\\\n 2 4   1 6   5 3     7 2      0 1</pre>",
    answerHtml: "<p><strong>初始化：</strong>α = -∞, β = +∞</p><p><strong>遍历 A 分支（D→E→F）：</strong></p><pre>D(MAX): 看 2→4 → D=4\nA(MIN): 收到 D=4 → β_A = min(+∞, 4) = 4\n\nE(MAX): 看 1→6 → E=6\n但是！对于 A(MIN)，v=6 ≥ β_A=4 → 剪枝！\nE 后面的兄弟 F 不用看了。</pre><p><strong>遍历 B 分支（G→H），α 已更新为 4：</strong></p><pre>根(MAX) 从 A=4 更新 α = max(-∞, 4) = 4\n\nG(MAX): 看 7→2 → G=7\nB(MIN): 收到 G=7 → β_B = min(+∞, 7) = 7\n\nH(MAX): 看 0→1 → H=1\nB(MIN): 收到 H=1 → β_B = min(7, 1) = 1\n\nB=1\n根(MAX): max(4, 1) = 4 → 最终值 4，选 A 分支。</pre><p><strong>被剪节点：F（以及它的所有子节点）。</strong></p><p><strong>剪枝条件：</strong>在 MIN 节点 A，当子节点 E 的值 6 ≥ β=4 时触发剪枝。</p><p><strong>最终值仍为 4</strong>（与全计算的结果相同）。</p>"
  },
  {
    id: "eq-s5-7",
    moduleId: "s5",
    year: "2025 期中",
    position: "",
    points: 0,
    questionText: "<p><strong>题目背景：</strong>某大学开设新学位课程，涉及 CS-5211、CS-5212、CS-5381、CS-5681 等课程，有先修关系和课时安排约束。要求：(1) 建 CSP 模型（变量/值域/约束）(2) 用回溯法求一个可行排课方案 (3) 提出三种提高效率的方法。</p>",
    answerHtml: "<p><strong>CSP 建模模板（考试通用）：</strong></p><ol>\n<li><strong>列变量：</strong>把每个需要决策的对象写成变量名（如 X1=CS-5211的时间，X2=CS-5212的时间……）</li>\n<li><strong>列值域：</strong>每个变量可以取哪些值（如 {周一08:00, 周一10:00, ...}）</li>\n<li><strong>列约束：</strong>哪些值组合不行（如 X1 ≠ X2；X3 不能在 X1 之前）</li>\n</ol><p><strong>三种提效方法（如果题目只要求写三种，最稳的写法）：</strong></p><p>(1) <strong>MRV</strong> ——优先选剩余可选值最少的变量，因为最容易先暴露冲突；(2) <strong>LCV</strong> ——为变量选值时优先选限制其他变量最少的值，给后续变量留更多空间；(3) <strong>Forward checking</strong> ——每次赋值后立刻从相邻变量的值域中删除不兼容的值，提前发现无解。</p>"
  },
  {
    id: "eq-s6-8",
    moduleId: "s6",
    year: "2025 期末 A 卷",
    position: "三",
    points: 15,
    questionText: "<h4>（a）翻译题（6分）</h4>",
    answerHtml: "<ol>\n<li>\"不是所有的篮球运动员的身高都超过 1 米 8\" → $\\lnot\\forall x\\,(\\text{BasketballPlayer}(x) \\to \\text{HigherThan}(x))$</li>\n<li>\"所有实数的平方都大于等于零\" → $\\forall x\\,(\\text{Real}(x) \\to x^2 \\ge 0)$</li>\n</ol><h4>（b）证明题（9分）—— 完整 13 步自然演绎</h4><p><strong>已知：</strong>∀x(F(x) → (G(x) ∨ H(x))) 和 ¬∀x(F(x) → G(x))，证明 ∃x(F(x) ∧ H(x))。</p><table>\n<tbody><tr><th>步骤</th><th>公式</th><th>推理规则</th></tr>\n<tr><td>1</td><td>¬∀x (F(x) → G(x))</td><td>前提 2</td></tr>\n<tr><td>2</td><td>∃x ¬(F(x) → G(x))</td><td>量词否定：¬∀x P ≡ ∃x ¬P</td></tr>\n<tr><td>3</td><td>∃x ¬(¬F(x) ∨ G(x))</td><td>蕴含改写：P→Q ≡ ¬P∨Q</td></tr>\n<tr><td>4</td><td>∃x (F(x) ∧ ¬G(x))</td><td>德摩根：¬(¬P∨Q) ≡ P∧¬Q</td></tr>\n<tr><td>5</td><td>F(a) ∧ ¬G(a)</td><td>∃-elim：引入 Skolem 常数 a</td></tr>\n<tr><td>6</td><td>F(a)</td><td>∧-elim：合取消去</td></tr>\n<tr><td>7</td><td>¬G(a)</td><td>∧-elim：合取消去</td></tr>\n<tr><td>8</td><td>∀x (F(x) → (G(x) ∨ H(x)))</td><td>前提 1</td></tr>\n<tr><td>9</td><td>F(a) → (G(a) ∨ H(a))</td><td>∀-elim：全称量词消去，代入 a</td></tr>\n<tr><td>10</td><td>G(a) ∨ H(a)</td><td>→-elim (MP)：步骤 6+9 假言推理</td></tr>\n<tr><td>11</td><td>H(a)</td><td>∨-elim：步骤 7+10 析取消去（¬G 所以只能是 H）</td></tr>\n<tr><td>12</td><td>F(a) ∧ H(a)</td><td>∧-intro：步骤 6+11 合取引入</td></tr>\n<tr><td>13</td><td>∃x (F(x) ∧ H(x))</td><td>∃-intro：存在量词引入 ∎</td></tr>\n</tbody></table>"
  },
  {
    id: "eq-s6-9",
    moduleId: "s6",
    year: "2023 期末 A 卷",
    position: "二",
    points: 15,
    questionText: "<h4>归结证明：三人录取问题</h4>",
    answerHtml: "<p><strong>问题：</strong>A、B、C 三人应聘，已知：(1) 至少录取一人 A∨B∨C；(2) 如果录取A而不录取B，则录取C，即 (A∧¬B)→C；(3) 如果录取B，则录取C，即 B→C。<strong>证明一定录取 C。</strong></p><p><strong>第1步：转换为 CNF 子句</strong></p><table>\n<tbody><tr><th>前提</th><th>原始</th><th>CNF 转换</th><th>子句</th></tr>\n<tr><td>1</td><td>A∨B∨C</td><td>已是 CNF</td><td>{A, B, C}</td></tr>\n<tr><td>2</td><td>(A∧¬B)→C</td><td>¬(A∧¬B)∨C = (¬A∨B)∨C = ¬A∨B∨C</td><td>{¬A, B, C}</td></tr>\n<tr><td>3</td><td>B→C</td><td>¬B∨C</td><td>{¬B, C}</td></tr>\n</tbody></table><p><strong>第2步：加入目标否定 ¬C，归结</strong></p><pre>子句集：{A,B,C}, {¬A,B,C}, {¬B,C}, {¬C}\n\n步骤 5：{¬B,C} 与 {¬C} 归结 → {¬B}    （C 与 ¬C 消去）\n步骤 6：{A,B,C} 与 {¬B} 归结 → {A,C}   （B 与 ¬B 消去）\n步骤 7：{¬A,B,C} 与 {¬A} 无法直接得 □...\n\n换一条路：\n步骤 5'：{A,B,C} 与 {¬A,B,C} 归结 → {B,C}  （A 与 ¬A 消去）\n步骤 6'：{B,C} 与 {¬B,C} 归结 → {C}        （B 与 ¬B 消去）\n步骤 7'：{C} 与 {¬C} 归结 → □              （矛盾！）</pre><div class=\"callout callout--tip\">\n<strong>□（空子句）= 矛盾。</strong>假设 ¬C 导致矛盾 → ¬C 不成立 → C 一定成立。这就是<strong>归结反驳</strong>（Resolution Refutation）的核心：否定目标 → 推出矛盾 → 目标得证。\n</div>"
  },
  {
    id: "eq-s7-15",
    moduleId: "s7",
    year: "2025 期末",
    position: "一(7)",
    points: 8,
    questionText: "<p><strong>题目：</strong>某癌症在人群中的发病率为 0.8%。检测方法对癌症患者的阳性率为 98%（灵敏度），对健康人的假阳性率为 3%。王先生体检结果为阳性，问他真正患癌的概率是多少？</p>",
    answerHtml: "<p><strong>解答：</strong></p><p>先验：$P(D)=0.008$，$P(\\neg D)=0.992$</p><p>$P(+|D)=0.98$（灵敏度），$P(+|\\neg D)=0.03$（假阳性率）</p><p>$P(+) = P(+|D)P(D) + P(+|\\neg D)P(\\neg D) = 0.98 \\times 0.008 + 0.03 \\times 0.992 = 0.00784 + 0.02976 = 0.0376$</p><p>$P(D|+) = \\frac{P(+|D) \\cdot P(D)}{P(+)} = \\frac{0.98 \\times 0.008}{0.0376} = \\frac{0.00784}{0.0376} \\approx \\mathbf{0.209}$</p><p><strong>仅约 20.9%！</strong>大多数人直觉回答 95%，但正确答案是约 21%。因为疾病太罕见（0.8%），假阳性人群数量（3% × 99.2% 健康人）远多于真阳性人群（98% × 0.8% 病人）。这就是著名的<strong>基础率谬误</strong>。</p><hr /><p><strong>评分标准：</strong></p><ul><li>正确写出贝叶斯公式：$P(D|+)=\\frac{P(+|D)P(D)}{P(+)}$（2 分）</li><li>正确计算全概率分母 $P(+)$（3 分）</li><li>正确代入并算出约 0.209 或 20.9%（2 分）</li><li>指出\"远低于直觉的 95%\"并解释原因（1 分）</li></ul>"
  },
  {
    id: "eq-s7-16",
    moduleId: "s7",
    year: "2025 期末",
    position: "一(8)",
    points: 12,
    questionText: "<p><strong>题目：</strong>经典洒水器网络：Cloudy(C) $\\to$ Sprinkler(S), Rain(R); S+R $\\to$ WetGrass(W)。CPT：$P(C)=0.5$, $P(S|C)=0.1$, $P(S|\\neg C)=0.5$, $P(R|C)=0.8$, $P(R|\\neg C)=0.2$, $P(W|S,R)=0.99$（至少一个为真），$P(W|\\neg S,\\neg R)=0.0$。求 $P(R | W)$（看到草地湿，下雨的概率）。</p>",
    answerHtml: "<p><strong>解答：</strong></p><p><strong>步骤 1：联合分解。</strong>$P(C,S,R,W) = P(C) \\cdot P(S|C) \\cdot P(R|C) \\cdot P(W|S,R)$</p><p><strong>步骤 2：分子 $P(R, W)$。</strong>固定 R=yes，对 C 和 S 所有组合求和（边缘化）：</p><table><tbody><tr><th>C</th><th>S</th><th>P(C)</th><th>P(S|C)</th><th>P(R|C)</th><th>P(W|S,R)</th><th>乘积</th></tr><tr><td>T</td><td>T</td><td>0.5</td><td>0.1</td><td>0.8</td><td>0.99</td><td>0.0396</td></tr><tr><td>T</td><td>F</td><td>0.5</td><td>0.9</td><td>0.8</td><td>0.99</td><td>0.3564</td></tr><tr><td>F</td><td>T</td><td>0.5</td><td>0.5</td><td>0.2</td><td>0.99</td><td>0.0495</td></tr><tr><td>F</td><td>F</td><td>0.5</td><td>0.5</td><td>0.2</td><td>0.0</td><td>0.0</td></tr></tbody></table><p>$P(R,W) = 0.4455$</p><p><strong>步骤 3：同理求 $P(\\neg R, W)$。</strong>R=F 时四种组合，$P(\\neg R,W) \\approx 0.2016$</p><p>$P(W) = P(R,W) + P(\\neg R,W) = 0.4455 + 0.2016 = 0.6471$</p><p><strong>步骤 4：$P(R|W) = \\frac{0.4455}{0.6471} \\approx \\mathbf{0.688}$</strong></p><hr /><p><strong>评分标准：</strong></p><ul><li>正确写出联合分解公式（2 分）</li><li>正确枚举隐藏变量（C, S）的所有组合并代入 CPT（4 分）</li><li>正确边缘化计算分子 $P(R,W)$ 和分母 $P(W)$（4 分）</li><li>得出约 0.688 的正确结果（2 分）</li></ul>"
  },
  {
    id: "eq-s8-17",
    moduleId: "s8",
    year: "2025 期末",
    position: "计算题",
    points: 12,
    questionText: "<p><strong>题目：</strong>一个 HMM 有两个隐藏状态 $\\{S_1, S_2\\}$ 和两个观测 $\\{A, B\\}$。已知：</p><ul><li>先验：$P(X_1=S_1)=0.6$, $P(X_1=S_2)=0.4$</li><li>转移：$P(S_1|S_1)=0.7$, $P(S_2|S_1)=0.3$; $P(S_1|S_2)=0.4$, $P(S_2|S_2)=0.6$</li><li>发射：$P(A|S_1)=0.9$, $P(B|S_1)=0.1$; $P(A|S_2)=0.2$, $P(B|S_2)=0.8$</li></ul><p>观测序列：$e_1 = A$, $e_2 = B$。求滤波分布 $P(X_2 | A, B)$。</p>",
    answerHtml: "<p><strong>解答：</strong></p><p><strong>t=1 更新（加入观测 A）：</strong></p><pre>P(X₁=S₁|A) ∝ P(A|S₁) × P(S₁) = 0.9 × 0.6 = 0.54\nP(X₁=S₂|A) ∝ P(A|S₂) × P(S₂) = 0.2 × 0.4 = 0.08\n归一化：P(S₁|A) = 0.54 / 0.62 = 0.871, P(S₂|A) = 0.08 / 0.62 = 0.129</pre>\n<p><strong>t=2 预测（转移向前推）：</strong></p>\n<pre>P(X₂=S₁|A) = P(S₁|S₁)×0.871 + P(S₁|S₂)×0.129\n             = 0.7×0.871 + 0.4×0.129 = 0.6097 + 0.0516 = 0.6613\nP(X₂=S₂|A) = P(S₂|S₁)×0.871 + P(S₂|S₂)×0.129\n             = 0.3×0.871 + 0.6×0.129 = 0.2613 + 0.0774 = 0.3387</pre>\n<p><strong>t=2 更新（加入观测 B）：</strong></p>\n<pre>P(X₂=S₁|A,B) ∝ P(B|S₁) × 0.6613 = 0.1 × 0.6613 = 0.06613\nP(X₂=S₂|A,B) ∝ P(B|S₂) × 0.3387 = 0.8 × 0.3387 = 0.27096\n归一化：P(S₁|A,B) = 0.06613 / 0.33709 = 0.196\n         P(S₂|A,B) = 0.27096 / 0.33709 = 0.804</pre>\n<p><strong>最终：$P(X_2=S_1 | A, B) \\approx 0.20$，$P(X_2=S_2 | A, B) \\approx 0.80$</strong>。即在观察到 A 然后 B 后，第 2 天有约 80% 概率处于 S₂ 状态。</p><hr /><p><strong>评分标准：</strong></p><ul><li>t=1 正确使用先验和发射模型做更新+归一化（3 分）</li><li>t=2 正确使用转移矩阵做预测（3 分）</li><li>t=2 正确使用发射模型做更新+归一化（3 分）</li><li>每步归一化不遗漏（2 分）</li><li>保留合理小数位数（1 分）</li></ul>"
  },
  {
    id: "eq-s8-18",
    moduleId: "s8",
    year: "2025 期末",
    position: "简答题",
    points: 8,
    questionText: "<p><strong>题目：</strong>一个股票预测 HMM，隐藏状态为市场趋势（牛市/熊市），观测为每日涨跌。已知前 30 天的观测数据，请定义以下三个任务并说明各自的计算目标：</p><p>(1) 滤波 (Filtering)<br>(2) 预测 (Prediction)<br>(3) 平滑 (Smoothing)</p>",
    answerHtml: "<p><strong>解答：</strong></p><table><tbody><tr><th>任务</th><th>公式</th><th>使用了多少证据</th><th>直观理解</th></tr><tr><td>滤波</td><td>$P(X_{30} \\mid e_{1:30})$</td><td>到当前时刻的所有观测</td><td>给定迄今为止看到的，<strong>现在</strong>是什么状态？在线（实时）推理</td></tr><tr><td>预测</td><td>$P(X_{35} \\mid e_{1:30})$</td><td>只有 30 天的观测，第 35 天没观测</td><td><strong>未来</strong>会是什么状态？纯转移推算，没有新观测校正</td></tr><tr><td>平滑</td><td>$P(X_{15} \\mid e_{1:30})$</td><td>全部 30 天观测，包括第 15 天之后的</td><td>事后回头看，<strong>过去</strong>的第 15 天真是什么状态？用了\"未来\"的信息</td></tr></tbody></table><p><strong>核心区分要点：</strong></p><ul><li><strong>滤波看\"现在\"</strong>——用到目前为止的所有证据（$e_{1:t}$），是递推在线计算</li><li><strong>预测看\"未来\"</strong>——只用过去的证据推未来的状态（$e_{1:t}$ 推 $X_{t+k}$），没有新观测校正</li><li><strong>平滑看\"过去\"</strong>——用全部证据（$e_{1:T}$，含未来）重新估计过去某时刻的状态，比滤波更准</li></ul><hr /><p><strong>评分标准：</strong></p><ul><li>三个任务各给出正确的公式表达（各 1 分，共 3 分）</li><li>正确说明每个任务使用的证据范围（各 1 分，共 3 分）</li><li>用\"现在/未来/过去\"简洁区分三个任务（2 分）</li></ul>"
  },
  {
    id: "eq-s9-11",
    moduleId: "s9",
    year: "2025 期末 A 卷",
    position: "四",
    points: 20,
    questionText: "<p><strong>题目：</strong>14 个贷款审批样本（9 个批准 ✓，5 个拒绝 ✗）。已知属性：年龄、银行流水、是否结婚、是否拥有房产。</p>",
    answerHtml: "<p>(1) 计算总熵 H(D) = 0.940</p><p>(2) 完整计算四个属性的 Gain：银行流水 0.397，年龄 0.308，房产 0.045，结婚 0.001</p><p>(3) 选银行流水为根节点（Gain 最大）；下一层：中流水 → 年龄；低流水 → 继续往下分</p><p>(4) 画出完整决策树</p><div class=\"callout callout--warn\"><strong>评分要点：</strong>Gain 计算错误扣分最狠。log₂ 值给到小数点后 3-4 位即可，不要无限精度。公式写对也是得分点。</div>"
  },
  {
    id: "eq-s9-12",
    moduleId: "s9",
    year: "2023 期末 A 卷",
    position: "四(2)",
    points: 8,
    questionText: "<p><strong>真题要点：</strong>给一张数据表（类似上面的动物表），要求：</p>",
    answerHtml: "<ol>\n<li>从表中数出 P(Land | +)、P(Yes | +)、P(Land | —)、P(Yes | —)</li>\n<li>计算未归一化的 P(+ | Land, Yes) 和 P(— | Land, Yes)</li>\n<li>比较大小，判定类别</li>\n</ol>"
  },
  {
    id: "eq-s10-13",
    moduleId: "s10",
    year: "2025 期末 A 卷",
    position: "五",
    points: 20,
    questionText: "<p><strong>题目：</strong>2×2 网格机器人，初始 s1，目标 s4，越界 s_d。动作：上、右。</p>",
    answerHtml: "<p><strong>(a) 定义 MDP 五元组：</strong>写出 S, A, P, R, $\\gamma$ 的具体定义（见 10.3 节的推演）</p><p><strong>(b) 计算折扣回报：</strong>已知 $\\gamma=0.99$，比较两条奖励序列 (1,1,0,0) 和 (0,0,1,1) 的回报大小</p><p><strong>(c) 解释为什么越早的奖励价值更高：</strong>答：因为折扣因子 γ&lt;1，越晚的奖励被 $\\gamma$ 的幂次乘得越多，折现越厉害；且未来存在不确定性</p>"
  },
  {
    id: "eq-s11-14",
    moduleId: "s11",
    year: "2023 期末 A 卷",
    position: "六",
    points: 20,
    questionText: "<p><strong>题目要点：</strong></p>",
    answerHtml: "<ol>\n<li><strong>卷积核：</strong>5×5×3（3 通道 RGB），共 6 个卷积核，步长 = 1</li>\n<li><strong>计算卷积输出尺寸：</strong>如果输入 32×32，输出 = (32—5)/1 + 1 = <strong>28×28×6</strong>（6 个卷积核产生 6 个通道）</li>\n<li><strong>最大池化：</strong>窗口 2×2，步长 2，28×28 → (28—2)/2+1 = <strong>14×14</strong></li>\n<li><strong>简答：</strong>卷积的目的 = 提取局部特征（边缘、纹理、角点等）；池化的目的 = 降维、减少计算量、保留主要特征、防止过拟合</li>\n</ol><div class=\"callout callout--warn\"><strong>公式别记反：</strong>卷积输出 = (N — F) / stride + 1，其中 N 是输入尺寸，F 是卷积核尺寸。分子是 N—F，不是 F—N。</div>"
  },
  {
    id: "eq-s9-25",
    moduleId: "s9",
    year: "2025 期末",
    position: "四",
    points: 12,
    questionText: "<p><strong>题目：</strong>某公司想根据\"年龄\"和\"收入\"两个属性预测客户是否购买产品。数据集如下（10 个样本）：</p><table><tbody><tr><th>年龄</th><th>收入</th><th>购买？</th></tr><tr><td>青年</td><td>高</td><td>否</td></tr><tr><td>青年</td><td>高</td><td>是</td></tr><tr><td>中年</td><td>高</td><td>是</td></tr><tr><td>老年</td><td>中</td><td>是</td></tr><tr><td>老年</td><td>低</td><td>否</td></tr><tr><td>老年</td><td>低</td><td>是</td></tr><tr><td>中年</td><td>低</td><td>否</td></tr><tr><td>青年</td><td>中</td><td>否</td></tr><tr><td>青年</td><td>低</td><td>是</td></tr><tr><td>老年</td><td>中</td><td>是</td></tr></tbody></table><p>(1) 计算总熵 $H(D)$（3分）<br>(2) 分别按\"年龄\"和\"收入\"划分，计算信息增益（6分）<br>(3) 选根节点并画出决策树的第一层（3分）</p>",
    answerHtml: "<p><strong>(1) 总熵：</strong>10 个样本，5 个\"是\"、5 个\"否\"</p><p>$H(D) = -\\frac{5}{10}\\log_2\\frac{5}{10} - \\frac{5}{10}\\log_2\\frac{5}{10} = -0.5 \\times (-1) - 0.5 \\times (-1) = 1.0$</p><p><strong>(2) 按\"年龄\"划分：</strong></p><table><tbody><tr><th>分组</th><th>数量</th><th>是</th><th>否</th><th>熵</th></tr><tr><td>青年</td><td>4</td><td>2</td><td>2</td><td>$-(0.5\\log_2 0.5 + 0.5\\log_2 0.5) = 1.0$</td></tr><tr><td>中年</td><td>2</td><td>1</td><td>1</td><td>$1.0$</td></tr><tr><td>老年</td><td>4</td><td>3</td><td>1</td><td>$-(0.75\\log_2 0.75 + 0.25\\log_2 0.25) = 0.811$</td></tr></tbody></table><p>$H(D|\\text{年龄}) = \\frac{4}{10}\\times 1.0 + \\frac{2}{10}\\times 1.0 + \\frac{4}{10}\\times 0.811 = 0.4+0.2+0.3244 = 0.9244$</p><p>$\\text{Gain}(D, \\text{年龄}) = 1.0 - 0.9244 = 0.0756$</p><p><strong>按\"收入\"划分：</strong></p><table><tbody><tr><th>分组</th><th>数量</th><th>是</th><th>否</th><th>熵</th></tr><tr><td>高</td><td>3</td><td>2</td><td>1</td><td>$-(0.667\\log_2 0.667 + 0.333\\log_2 0.333) = 0.918$</td></tr><tr><td>中</td><td>3</td><td>2</td><td>1</td><td>$0.918$</td></tr><tr><td>低</td><td>4</td><td>2</td><td>2</td><td>$1.0$</td></tr></tbody></table><p>$H(D|\\text{收入}) = \\frac{3}{10}\\times 0.918 + \\frac{3}{10}\\times 0.918 + \\frac{4}{10}\\times 1.0 = 0.2754+0.2754+0.4 = 0.9508$</p><p>$\\text{Gain}(D, \\text{收入}) = 1.0 - 0.9508 = 0.0492$</p><p><strong>(3) 根节点：</strong>Gain(年龄) 0.0756 > Gain(收入) 0.0492 → 选\"年龄\"做根节点。第一层分三支（青年/中年/老年），各子集不纯，需继续划分。</p>"
  },
  {
    id: "eq-s9-26",
    moduleId: "s9",
    year: "2023 期末",
    position: "四(2)",
    points: 8,
    questionText: "<p><strong>题目：</strong>根据以下邮件数据，用朴素贝叶斯判断新邮件\"包含'免费'、不包含'链接'\"是否为垃圾邮件。</p><table><tbody><tr><th>邮件</th><th>含\"免费\"</th><th>含\"链接\"</th><th>垃圾邮件？</th></tr><tr><td>1</td><td>是</td><td>是</td><td>是</td></tr><tr><td>2</td><td>是</td><td>否</td><td>是</td></tr><tr><td>3</td><td>否</td><td>是</td><td>是</td></tr><tr><td>4</td><td>否</td><td>否</td><td>否</td></tr><tr><td>5</td><td>否</td><td>是</td><td>否</td></tr><tr><td>6</td><td>是</td><td>否</td><td>否</td></tr></tbody></table>",
    answerHtml: "<p><strong>Step 1 — 先验：</strong></p><p>$P(\\text{垃圾}) = 3/6 = 0.5$，$P(\\text{正常}) = 3/6 = 0.5$</p><p><strong>Step 2 — 条件概率（从表中数）：</strong></p><p>垃圾邮件中：$P(\\text{含免费}|\\text{垃圾}) = 2/3$（邮件1、2中\"免费\"为是），$P(\\text{不含链接}|\\text{垃圾}) = 1/3$（邮件2中\"链接\"为否）</p><p>正常邮件中：$P(\\text{含免费}|\\text{正常}) = 1/3$（邮件6中\"免费\"为是），$P(\\text{不含链接}|\\text{正常}) = 2/3$（邮件4、6中\"链接\"为否）</p><p><strong>Step 3 — 计算后验（未归一化）：</strong></p><p>$P(\\text{垃圾}|\\text{免费, 不链接}) \\propto 0.5 \\times \\frac{2}{3} \\times \\frac{1}{3} = 0.1111$</p><p>$P(\\text{正常}|\\text{免费, 不链接}) \\propto 0.5 \\times \\frac{1}{3} \\times \\frac{2}{3} = 0.1111$</p><p><strong>Step 4 — 结论：</strong>两者相等，各 50%。此时朴素贝叶斯无法区分——两个类别的后验乘积恰好相同。实际应用中通常选先验更高的类别或任选一个。考试中如实写出\"相等，概率各 50%\"即可。</p>"
  },
  {
    id: "eq-s10-27",
    moduleId: "s10",
    year: "2025 期末",
    position: "五(1)",
    points: 8,
    questionText: "<p><strong>题目：</strong>一个清洁机器人在 3 个房间 (Room1, Room2, Room3) 中移动。机器人可以执行\"左移\"和\"右移\"两个动作。在 Room1 左移会保持在 Room1，在 Room3 右移会保持在 Room3。Room2 是脏房间，到达 Room2 并清扫获得奖励 +10；其他移动奖励为 0。折扣因子 $\\gamma = 0.9$。请写出该问题的 MDP 五元组。</p>",
    answerHtml: "<p><strong>$S$（状态集合）：</strong>$S = \\{R_1, R_2, R_3\\}$（Room1, Room2, Room3）</p><p><strong>$A$（动作集合）：</strong>$A = \\{\\text{左}, \\text{右}\\}$</p><p><strong>$P(s'|s,a)$（转移概率 —— 确定性环境）：</strong></p><table><tbody><tr><th>当前状态</th><th>动作</th><th>下一状态</th><th>概率</th></tr><tr><td>$R_1$</td><td>左</td><td>$R_1$</td><td>1.0（撞墙保持）</td></tr><tr><td>$R_1$</td><td>右</td><td>$R_2$</td><td>1.0</td></tr><tr><td>$R_2$</td><td>左</td><td>$R_1$</td><td>1.0</td></tr><tr><td>$R_2$</td><td>右</td><td>$R_3$</td><td>1.0</td></tr><tr><td>$R_3$</td><td>左</td><td>$R_2$</td><td>1.0</td></tr><tr><td>$R_3$</td><td>右</td><td>$R_3$</td><td>1.0（撞墙保持）</td></tr></tbody></table><p><strong>$R(s,a,s')$（奖励函数）：</strong>$R(s, a, R_2) = +10$（到达 Room2 获得奖励），$R(s, a, s') = 0$（其他情况）</p><p><strong>$\\gamma$（折扣因子）：</strong>$\\gamma = 0.9$</p><p><strong>得分关键：</strong>把\"撞墙保持\"明确写出来——很多人忽略边界情况，Room1 左移不是消失而是保持在 Room1。这是易忽略的细节分。MDP 五元组 S, A, P, R, $\\gamma$ 一个都不能少。</p>"
  },
  {
    id: "eq-s10-28",
    moduleId: "s10",
    year: "2025 期末",
    position: "五(2)",
    points: 6,
    questionText: "<p><strong>题目：</strong>一个智能体执行了 4 步动作，获得的即时奖励序列为：$R_1 = -1, R_2 = 2, R_3 = 0, R_4 = 5$。用 $\\gamma = 0.5$ 和 $\\gamma = 0.9$ 分别计算从第 1 步开始的折扣回报 $G_1$，并解释为什么 $\\gamma=0.5$ 时 $G$ 更小。</p>",
    answerHtml: "<p><strong>$\\gamma = 0.5$ 时：</strong></p><p>$G_1 = (-1) + 0.5 \\times 2 + 0.5^2 \\times 0 + 0.5^3 \\times 5 = -1 + 1.0 + 0 + 0.625 = 0.625$</p><p><strong>$\\gamma = 0.9$ 时：</strong></p><p>$G_1 = (-1) + 0.9 \\times 2 + 0.9^2 \\times 0 + 0.9^3 \\times 5 = -1 + 1.8 + 0 + 3.645 = 4.445$</p><p><strong>解释：</strong>$\\gamma=0.5$ 时 $G$ 更小，因为 $\\gamma$ 越小，未来奖励被\"打折\"越厉害——第 4 步的奖励 +5 在 $\\gamma=0.5$ 时只值 $0.5^3 \\times 5 = 0.625$，在 $\\gamma=0.9$ 时值 $0.9^3 \\times 5 = 3.645$。$\\gamma$ 越小，智能体越\"短视\"，只看重眼前的奖励（$R_1=-1$ 无法被后续大额奖励弥补）。</p>"
  },
  {
    id: "eq-s11-29",
    moduleId: "s11",
    year: "2023 期末",
    position: "六(1)",
    points: 4,
    questionText: "<p><strong>题目：</strong>输入图像尺寸为 $32 \\times 32 \\times 3$（RGB 三通道），使用 16 个 $5 \\times 5$ 卷积核，步长 $S=1$，padding $P=2$。求输出特征图的尺寸（宽 $\\times$ 高 $\\times$ 通道数）。</p>",
    answerHtml: "<p>$W_{out} = \\lfloor \\frac{32 + 2 \\times 2 - 5}{1} \\rfloor + 1 = \\lfloor \\frac{32 + 4 - 5}{1} \\rfloor + 1 = \\lfloor 31 \\rfloor + 1 = 32$</p><p><strong>输出尺寸：$32 \\times 32 \\times 16$</strong></p><p>宽高不变（因为 $P=2$ 刚好补偿了 $F=5$ 的缩小：$32+4-5=31$，向下取整仍为 31，再加 1 回到 32），通道数 = 卷积核个数 = 16。验证：same padding 时，$P=(F-1)/2=(5-1)/2=2$，输出尺寸等于输入尺寸。</p>"
  },
  {
    id: "eq-s11-30",
    moduleId: "s11",
    year: "2023 期末",
    position: "六(2)",
    points: 6,
    questionText: "<p><strong>题目：</strong>输入 $3 \\times 3$ 矩阵 $I = \\begin{bmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 1 \\end{bmatrix}$ 和 $2 \\times 2$ 卷积核 $K = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$，步长 $S=1$，padding $P=0$。计算卷积输出矩阵。</p>",
    answerHtml: "<p><strong>输出尺寸：</strong>$W_{out} = \\lfloor \\frac{3 + 0 - 2}{1} \\rfloor + 1 = 1 + 1 = 2$，输出 $2 \\times 2$ 矩阵。</p><p><strong>位置 (0,0)：</strong>覆盖 $\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$，$1\\times 1 + 0\\times 0 + 0\\times 0 + 1\\times 1 = 2$</p><p><strong>位置 (0,1)：</strong>覆盖 $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$，$0\\times 1 + 1\\times 0 + 1\\times 0 + 0\\times 1 = 0$</p><p><strong>位置 (1,0)：</strong>覆盖 $\\begin{bmatrix}0&1\\\\1&0\\end{bmatrix}$，$0\\times 1 + 1\\times 0 + 1\\times 0 + 0\\times 1 = 0$</p><p><strong>位置 (1,1)：</strong>覆盖 $\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$，$1\\times 1 + 0\\times 0 + 0\\times 0 + 1\\times 1 = 2$</p><p><strong>输出矩阵：</strong>$O = \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$</p><p>这个卷积核 $\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$ 是\"恒等核\"——保留对角位置的值，对非对角位置不做贡献。输入矩阵为交错棋盘型（对角为1），输出对角位置为 2。</p>"
  }
];
