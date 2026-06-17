import type { Quiz } from '@learncourse/framework/types';

export const S5_QUIZZES: Quiz[] = [
  {
    id: "q-s5-11",
    moduleId: "s5",
    question: "以下关于约束满足问题（CSP）三要素的描述，哪个是正确的？",
    options: [
      {
        text: "变量（Variables）X = {X₁,...,Xₙ}是被赋值的对象（如地图着色的「区域」）；值域（Domains）D = {D₁,...,Dₙ}指定每个变量的可选值（如「颜色」）；约束（Constraints）C限制变量取值的合法组合——CSP的解是满足所有约束的一个完整赋值",
        isCorrect: true
      },
      {
        text: "值域D必须对每个变量都相同（如所有变量的值域都是{R,G,B}），不同值域的变量不能纳入同一个CSP",
        isCorrect: false
      },
      {
        text: "约束C定义了优化目标函数，CSP的目标是在满足约束的同时最大化目标函数",
        isCorrect: false
      },
      {
        text: "CSP三要素中「变量」指的是笛卡尔积D₁×...×Dₙ中的每个元组，「约束」是检查这些元组是否可行的过滤器",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！CSP三要素：X是变量集合（被决策的对象），D是值域集合（每个变量可取哪些值），C是约束集合（限定合法组合）。解 = 满足所有约束的一个完整赋值。常见混淆点：CSP没有目标函数（那是COP/约束优化问题，如背包问题）；值域不必完全相同（N皇后中不同行皇后因前序赋值其实际可选列集会缩小）；将「变量」曲解为「元组」是概念错误——变量是单个被赋值实体，元组是整个赋值向量。",
    feedbackWrong: "不对。B错误——CSP不要求所有变量值域相同。例如，在课程排课CSP中，「教室」的值域是教室列表，「时间段」的值域是时间槽列表，两者完全不同。C错误——CSP没有优化目标，约束是硬性（hard）条件，必须全部满足；有目标函数+约束的是约束优化问题COP（Constraint Optimization Problem）。D错误——「变量」是被赋值的单个实体（如X₁ = WA），不是笛卡尔积中的元组。元组（完整赋值向量）是候选解，变量是解向量的一个维度。",
    type: "single"
  },
  {
    id: "q-s5-12",
    moduleId: "s5",
    question: "CSP的回溯搜索（Backtracking Search）与普通图搜索在求解CSP时的关键区别是什么？",
    options: [
      {
        text: "回溯搜索等价于BFS在赋值空间中的逐层扩展，只是用栈代替了队列",
        isCorrect: false
      },
      {
        text: "回溯搜索是DFS的CSP特化——每次深一层代表给下一个变量赋一个值，发现约束违反立即回溯撤销当前赋值；与普通状态搜索的关键区别在于「一次只扩展一个变量」+「部分赋值即可检查约束」+「深度固定为变量数」",
        isCorrect: true
      },
      {
        text: "回溯搜索必须用递归实现；迭代实现无法正确完成变量赋值的撤销（因为缺少调用栈来记录赋值历史）",
        isCorrect: false
      },
      {
        text: "回溯搜索在搜索树的每一层为所有未赋值变量同时尝试赋值，然后统一检查所有约束是否满足",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！CSP回溯搜索的本质是「赋值空间中的深度优先搜索」：①每个搜索层对应一个变量（深度 = 已赋值变量数，最大深度 = 变量总数），②每次扩展 = 从未赋值变量中选一个 + 从该变量当前值域中选一个值，③约束检查是「局部的」——只需检查新赋值与已赋值变量之间是否违反约束（不需要等全部变量赋值完），④回溯时撤销当前变量的赋值并恢复受影响邻居的值域。与普通图搜索的关键对照：普通搜索的状态 = 完整世界快照（如棋盘上所有棋子的位置），CSP回溯的节点 = 部分赋值（partial assignment），信息是增量积累的。",
    feedbackWrong: "不对。A错误——回溯搜索是DFS变体而非BFS变体；而且CSP中BFS在赋值空间中是极其低效的（branching factor大、解都在最深层）。C错误——回溯搜索完全可以用迭代 + 显式栈实现（虽然递归写法更自然、更常见），不存在「必须递归」的限制。D描述的完全不是回溯搜索——那是「生成-测试」法（Generate-and-Test）：一次性生成完整赋值再检查。回溯搜索的关键优势恰恰是「逐步构建 + 早检查 + 早回溯」，不等完整赋值。",
    type: "single"
  },
  {
    id: "q-s5-13",
    moduleId: "s5",
    question: "MRV（Minimum Remaining Values，最少剩余值）是CSP回溯搜索中最常用的变量选择启发式。以下哪个场景最能体现MRV的优势？",
    options: [
      {
        text: "在N皇后问题中，优先选择当前剩余可选列最多的皇后先赋值——因为选项多的皇后灵活性大，可以「迁就」选项少的皇后",
        isCorrect: false
      },
      {
        text: "在地图着色中，某个区域的值域因邻居Forward Checking被缩减到只剩{Red}（仅1个值）。MRV会优先给该区域赋值——它已经「别无选择」，若推迟它而最终发现Red不可行，将造成大量回溯",
        isCorrect: true
      },
      {
        text: "MRV的主要优势在于减少每个变量的值域大小，从而降低内存开销，使算法能在内存受限设备上运行",
        isCorrect: false
      },
      {
        text: "MRV保证找到的解在所有可能解中代价最小（即最优解），因为它优先处理「瓶颈变量」",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！MRV的核心直觉：「最受限制的变量先做决定」（fail-first principle，失败优先原则）。值域只剩1个值的变量其实没有选择余地——如果现在不处理，等后续变量把它仅剩的值也「抢走」后，它的值域变空就必须回溯，而那时可能已经深入搜索很多层了，回溯代价巨大。提前处理它：如果可行→排除了一个定时炸弹；如果不可行→立刻回溯，避免了深层搜索的浪费。经典场景：地图着色中邻居已赋值最多的区域→其值域缩减最快→MRV优先指向它。",
    feedbackWrong: "不对。A恰与MRV相反——选择「剩余值最多」的变量不是标准启发式（虽然直觉上似乎合理）。MRV选「最少」，不是「最多」。C不是MRV的主要目的——MRV旨在提前检测死胡同以减少搜索节点数（时间效率），而非降低内存开销。D错误——标准CSP只有「满足/不满足」二元结果，不存在「最优解」的概念（除非扩展为COP/VCSP加权约束满足）。MRV不改变解的存在性，也不保证任何最优性。",
    type: "single"
  },
  {
    id: "q-s5-14",
    moduleId: "s5",
    question: "在回溯搜索中使用Forward Checking（FC）。地图着色问题，已赋值WA=Red、NT=Green。当前要给Q赋值Blue。FC在此步骤会执行什么操作？",
    options: [
      {
        text: "FC仅检查Q=Blue是否与WA=Red和NT=Green直接冲突；若不冲突则接受，然后继续给下一个变量SA赋值",
        isCorrect: false
      },
      {
        text: "FC在Q=Blue赋值后，立即检查所有与Q相邻的未赋值变量（SA和NSW），从它们的值域中删除Blue；若某个邻居值域变为空集则立即回溯。注意FC不进一步传播到邻居的邻居",
        isCorrect: true
      },
      {
        text: "FC等全部变量赋值完成后，一次性检查所有二元约束是否满足——相当于一个高效的后置验证器",
        isCorrect: false
      },
      {
        text: "FC不仅检查Q的直接邻居，还迭代传播：SA值域缩小后→再检查SA的邻居→再检查邻居的邻居，直到不再有值域变化为止",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！Forward Checking的精确三步机制：①当前变量Xᵢ赋值为v → ②对每个未赋值的邻居Xⱼ（仅与Xᵢ有直接约束关系的变量），从Dⱼ中删除所有与v冲突的值 → ③若任何Dⱼ变空→立即回溯。关键限定词「仅一步」：FC只检查当前变量与直接邻居之间的约束，删除邻居值域中冲突的值。它不把邻居值域的变化进一步传播到「邻居的邻居」。本题场景：Q=Blue后→SA值域删Blue（剩{G?}，取决于NT=Green的传播），NSW值域删Blue。如果SA值域变空→回溯。这就检查完了——SA的值域变化不会再触发对V或NSW的二次传播。这正是FC和MAC的根本区别所在。",
    feedbackWrong: "不对。A描述的是简单回溯（朴素Backtracking）而非FC——FC比简单回溯多了一步「预判性值域缩减」：不等给SA赋值再发现冲突，而是提前从SA的值域中删掉不可行的选项。C描述的是生成-测试法（Generate-and-Test），完全不是FC——FC不等全部赋值完成，在搜索过程中就持续传播。D描述的是MAC（Maintaining Arc Consistency）——MAC在每次赋值后维护全网的弧相容，传播会迭代进行直到不动点。FC只看「一步邻居」，MAC看「整张图」。这一区别是本章最重要的辨析考点之一。",
    type: "single"
  },
  {
    id: "q-s5-15",
    moduleId: "s5",
    question: "LCV（Least Constraining Value，最少约束值）与MRV是最常用的变量/值排序启发式组合。关于两者的配合使用，以下哪个说法是正确的？",
    options: [
      {
        text: "MRV选「剩余值最少的变量」+ LCV给该变量选「对邻居限制最少的值」——先啃最难骨头但用最温柔的啃法，为后续变量保留最大限度灵活性。两者目标互补：MRV加速失败检测，LCV加速首个解发现",
        isCorrect: true
      },
      {
        text: "MRV选「剩余值最多的变量」+ LCV选「限制最多的值」——先解决最容易的问题用最强硬手段",
        isCorrect: false
      },
      {
        text: "MRV和LCV不能同时使用，因为MRV要求「选限制最多的变量」而LCV要求「选限制最少的值」，逻辑上矛盾",
        isCorrect: false
      },
      {
        text: "LCV负责选下一个要赋值的变量（variable ordering），MRV负责为该变量选具体值（value ordering）",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！MRV（变量排序）和LCV（值排序）是黄金组合：MRV定位「瓶颈变量」——那些最容易导致死胡同的受限变量，优先解决它们可以尽早发现不可行分支（fail-first）；LCV则在这个瓶颈变量上选「最宽容的值」——该值从邻居值域中删除的选项最少，为后续变量保留最多灵活性（fail-last）。两者的方向看起来相反——一个找最难变量，一个选最宽容值——但目标互补：都是为了提高「第一个解」被找到的速度。注意：LCV对「找所有解」帮助不大（因为所有值最终都要试），但对「找第一个解」场景（占比绝大多数实际应用）效果显著。",
    feedbackWrong: "不对。B把MRV和LCV的策略都搞反了——MRV选「最少」而非「最多」，LCV选「限制最少」而非「最多」。C错误——MRV和LCV完全兼容且经典配合。MRV选变量（解决的是「接下来给谁赋值」），LCV选值（解决的是「给这个变量赋哪个值」），两者在不同的决策层面运作，不存在矛盾。D把两者的分工搞反了——MRV负责variable ordering（选变量），LCV负责value ordering（选值），恰好与选项描述相反。口诀：「MRV选谁，LCV选啥」——MRV回答「Who's next?」，LCV回答「Which value?」。",
    type: "single"
  }
];

export const S5_SIM_QUESTIONS: ExamQuestion[] = [
  {
    id: "sim-s5-1",
    moduleId: "s5",
    year: "模拟题",
    position: "自编",
    points: 12,
    questionText: "<p><strong>题目：4皇后问题的CSP建模与回溯搜索</strong></p><p>在4×4棋盘上放置4个皇后，要求任意两个皇后不能在同一列或同一对角线上攻击对方。约定每行恰好放一个皇后（行号1~4对应变量X₁~X₄）。</p><p>(1) <strong>CSP三要素建模（4分）：</strong>写出变量集合X、每个变量的值域Dᵢ、约束集合C（用数学形式表达，含列约束和对角线约束）。</p><p>(2) <strong>回溯搜索过程（8分）：</strong>按变量顺序X₁→X₂→X₃→X₄，值顺序从左到右（列1→4），写出朴素回溯搜索的完整过程。每步标注：当前变量、尝试的列值、冲突检查（与哪些已赋值变量冲突）、操作（赋值/回溯并重试）。给出最终找到的第一个解。</p>",
    answerHtml: "<h4>(1) CSP三要素建模（4分）</h4><p><strong>变量集合X：</strong>$X = \\{X_1, X_2, X_3, X_4\\}$，$X_i$ 表示第 i 行皇后所在的列号。</p><p><strong>值域D：</strong>$D_i = \\{1, 2, 3, 4\\}$，$i = 1,2,3,4$（每行皇后可以放在第1~4列）。</p><p><strong>约束集合C：</strong>任意两个皇后 $X_i$ 和 $X_j$（$i \\neq j$）必须满足：</p><p>① <strong>列约束：</strong>$X_i \\neq X_j$（不能同列）</p><p>② <strong>对角线约束：</strong>$|X_i - X_j| \\neq |i - j|$（不能在���一对角线上——两个皇后列号之差不能等于行号之差）</p><p>即 $C = \\{(X_i, X_j) \\mid i \\lt j,\\; X_i \\neq X_j \\land |X_i - X_j| \\neq j - i\\}$</p><p>共 $\\binom{4}{2}=6$ 对二元约束，每对约束包含两个条件。</p><p><strong>建模评分要点：</strong>变量是「列号」不是「皇后」；对角线约束必须用绝对值的精确形式 $|X_i - X_j| \\neq |i - j|$；约束要写成对所有变量对的全称形式。</p><h4>(2) 回溯搜索过程（8分）</h4><p><strong>搜索树（DFS，列1→4顺序尝试）：</strong></p><table><tbody><tr><th>步骤</th><th>变量</th><th>尝试列</th><th>冲突检查</th><th>结果</th></tr><tr><td>1</td><td>X₁</td><td>1</td><td>无已赋值变量</td><td>✓ X₁=1，前进</td></tr><tr><td>2</td><td>X₂</td><td>1</td><td>与X₁同列（1=1）</td><td>✗ 冲突，试下一个</td></tr><tr><td>3</td><td>X₂</td><td>2</td><td>与X₁对角：|2-1|=|2-1|=1</td><td>✗ 冲突，试下一个</td></tr><tr><td>4</td><td>X₂</td><td>3</td><td>列≠1 ✓；对角|3-1|=2≠1 ✓</td><td>✓ X₂=3，前进</td></tr><tr><td>5</td><td>X₃</td><td>1</td><td>列≠1且≠3✓；对角：|1-1|=0≠2✓，|1-3|=2≠1✓</td><td>✓ X₃=1，前进？等等——|X₃-X₂|=|1-3|=2，|3-2|=1，2≠1 ✓</td></tr></tbody></table><p>让我重新仔细追踪X₃=1时：X₁=1, X₂=3。对角X₃与X₁: |1-1|=0≠(3-1)=2 ✓；对角X₃与X₂: |1-3|=2≠(3-2)=1 ✓。列不同✓。→ X₃=1可行。</p><table><tbody><tr><td>步骤</td><td>变量</td><td>尝试列</td><td>冲突检查</td><td>结果</td></tr><tr><td>5</td><td>X₃</td><td>1</td><td>列≠1,3 ✓；对X₁: |1-1|=0≠2 ✓；对X₂: |1-3|=2≠1 ✓</td><td>✓ X₃=1</td></tr><tr><td>6</td><td>X₄</td><td>1</td><td>列=1 冲突（X₁,X₃均=1）</td><td>✗</td></tr><tr><td>7</td><td>X₄</td><td>2</td><td>列≠1,3,1 ✓；对角：|2-1|=1≠3 ✗（|2-1|=1 = |4-1|=3? No: 1=3 false ✓）</td><td>等一下，仔细检查：X₁=1, X₂=3, X₃=1, 试X₄=2。对角X₄-X₁: |2-1|=1, |4-1|=3, 1≠3 ✓。对角X₄-X₂: |2-3|=1, |4-2|=2, 1≠2 ✓。对角X₄-X₃: |2-1|=1, |4-3|=1, 1=1 ✗！冲突！X₄=2与X₃=1在同一对角线上。</td></tr></tbody></table><p>继续追踪：</p><table><tbody><tr><th>步骤</th><th>变量</th><th>尝试列</th><th>冲突检查</th><th>结果</th></tr><tr><td>8</td><td>X₄</td><td>3</td><td>X₄=3与X₂=3同列</td><td>✗</td></tr><tr><td>9</td><td>X₄</td><td>4</td><td>列≠1,3,1,3 ✓；对角：|4-1|=3≠3 ✓(3≠3 false! 3=3 → 冲突!)</td><td>✗ X₄=4与X₁=1对角冲突: |4-1|=|4-1|=3</td></tr><tr><td>10</td><td>X₄</td><td>—</td><td>值域耗尽，回溯到X₃</td><td>回溯</td></tr><tr><td>11</td><td>X₃</td><td>2</td><td>X₁=1,X₂=3。列≠1,3 ✓；对角X₃-X₁:|2-1|=1≠2 ✓；对角X₃-X₂:|2-3|=1≠1 ✗!</td><td>✗ X₃=2与X₂=3对角冲突</td></tr><tr><td>12</td><td>X₃</td><td>3</td><td>与X₂=3同列</td><td>✗</td></tr><tr><td>13</td><td>X₃</td><td>4</td><td>列≠1,3,3 ✓；对角：|4-1|=3≠2 ✓；|4-3|=1≠1 ✗!</td><td>✗ X₃=4与X₂=3对角冲突</td></tr><tr><td>14</td><td>X₃</td><td>—</td><td>值域耗尽，回溯到X₂</td><td>回溯（X₁=1, X₂=3路径全死）</td></tr><tr><td>15</td><td>X₂</td><td>4</td><td>X₁=1。列≠1 ✓；对角|4-1|=3≠1 ✓</td><td>✓ X₂=4</td></tr><tr><td>16</td><td>X₃</td><td>1</td><td>X₁=1,X₂=4。列=1与X₁冲突</td><td>✗</td></tr><tr><td>17</td><td>X₃</td><td>2</td><td>列≠1,4 ✓；对角X₃-X₁:|2-1|=1≠2 ✓；对角X₃-X₂:|2-4|=2≠1 ✓</td><td>✓ X₃=2</td></tr><tr><td>18</td><td>X₄</td><td>1</td><td>列=1冲突X₁</td><td>✗</td></tr><tr><td>19</td><td>X₄</td><td>2</td><td>列=2冲突X₃</td><td>✗</td></tr><tr><td>20</td><td>X₄</td><td>3</td><td>列≠1,4,2,3 ✓；对角：|3-1|=2≠3 ✓；|3-4|=1≠2 ✓；|3-2|=1≠1 ✗!</td><td>✗</td></tr><tr><td>21</td><td>X₄</td><td>4</td><td>列=4冲突X₂</td><td>✗</td></tr><tr><td>22</td><td>X₄</td><td>—</td><td>值域耗尽，回溯到X₃</td><td>回溯</td></tr><tr><td>23</td><td>X₃</td><td>3</td><td>列≠1,4 ✓；对角：|3-1|=2≠2 ✗!</td><td>✗ 与X₁对角冲突</td></tr><tr><td>24</td><td>X₃</td><td>4</td><td>列=4冲突X₂</td><td>✗</td></tr><tr><td>25</td><td>X₃</td><td>—</td><td>回溯到X₂</td><td>回溯（X₁=1, X₂=4路径全死）</td></tr><tr><td>26</td><td>X₂</td><td>—</td><td>值域{2,3,4}已试完3和4，还剩2未试吗？前面X₂=1冲突，X₂=2冲突对角线，X₂=3走了很深，X₂=4也走了很深。X₂值域试完？值域{1,2,3,4} → 1冲突列, 2冲突对角, 3全死, 4全死</td><td>X₂值域耗尽，回溯到X₁</td></tr><tr><td>27</td><td>X₁</td><td>2</td><td>无已赋值变量</td><td>✓ X₁=2，重新开始</td></tr><tr><td>28</td><td>X₂</td><td>1</td><td>列≠2 ✓；对角|1-2|=1≠1 ✗!</td><td>✗</td></tr><tr><td>29</td><td>X₂</td><td>2</td><td>列=2冲突</td><td>✗</td></tr><tr><td>30</td><td>X₂</td><td>3</td><td>列≠2 ✓；对角|3-2|=1≠1 ✗!</td><td>✗</td></tr><tr><td>31</td><td>X₂</td><td>4</td><td>列≠2 ✓；对角|4-2|=2≠1 ✓</td><td>✓ X₂=4</td></tr><tr><td>32</td><td>X₃</td><td>1</td><td>列≠2,4 ✓；对角：|1-2|=1≠2 ✓；|1-4|=3≠1 ✓</td><td>✓ X₃=1</td></tr><tr><td>33</td><td>X₄</td><td>1</td><td>列=1冲突X₃</td><td>✗</td></tr><tr><td>34</td><td>X₄</td><td>2</td><td>列=2冲突X₁</td><td>✗</td></tr><tr><td>35</td><td>X₄</td><td>3</td><td>列≠2,4,1,3 ✓；对角：|3-2|=1≠3 ✓；|3-4|=1≠2 ✓；|3-1|=2≠1 ✓</td><td>✓ X₄=3 —— 找到解！</td></tr></tbody></table><p><strong>第一个找到的解：</strong>X₁=2, X₂=4, X₃=1, X₄=3，即皇后位置在第1行第2列、第2行第4列、第3行第1列、第4行第3列。</p><p><strong>棋盘表示：</strong></p><pre>  . Q . .\n  . . . Q\n  Q . . .\n  . . Q .</pre><p><strong>回溯搜索关键理解：</strong>X₁=1的分支是一个「几乎成功」的陷阱——走到X₃=1时一切顺利，但到X₄时发现所有列都不行。4皇后的两个解恰好是镜像对称的：(2,4,1,3)和(3,1,4,2)。朴素回溯不做任何启发式优化，也不记录失败原因，因此每次回溯后重新从值域开头尝试。</p><hr /><p><strong>评分标准（12分）：</strong></p><ul><li>(1) CSP建模：变量定义正确（1分）；值域完整（1分）；列约束+对角线约束精确数学表达（2分，缺绝对值或不等式不精确扣1分）</li><li>(2) 回溯过程：完整覆盖到第一个解（4分——步数可以概括但关键回溯点必须标注）；每步三要素（变量-尝试值-冲突结果）齐全（2分）；回溯发生时清楚标注回溯目标和原因（1分）；最终解正确（1分）</li><li>本题不要求每一步都写出来——关键步骤（赋值成功、回溯发生、找到解）必须写出，中间可以用「...」省略但需说明省略的步骤数和原因</li></ul>",
  },
  {
    id: "sim-s5-2",
    moduleId: "s5",
    year: "模拟题",
    position: "自编",
    points: 15,
    questionText: "<p><strong>题目：地图着色——MRV + LCV + Forward Checking 综合应用</strong></p><p>给定简化地图着色问题，用红(R)、绿(G)、蓝(B)三种颜色为区域A、B、C、D着色，相邻区域不能同色。约束图：A—B、A—C、B—C、B—D、C—D（即A-B-C构成三角形，B-C-D构成三角形，D与A不相邻）。所有变量初始值域均为{R, G, B}。</p><p>采用回溯搜索 + MRV（选变量）+ LCV（选值）+ Forward Checking（约束传播）的组合策略求解。</p><p>(1) <strong>A赋值+FC+MRV（5分）：</strong>首先给A赋值Red（固定）。执行Forward Checking更新各变量值域。用MRV原则选出下一个要赋值的变量，并说明理由。</p><p>(2) <strong>LCV选值+FC传播（5分）：</strong>对上一步MRV选出的变量，用LCV原则选出最优值（比较每个候选值对被删除的邻居值域选项数）。对选中的值执行赋值和FC。</p><p>(3) <strong>完成求解（5分）：</strong>继续搜索至找到完整解或证明无解。写出每步的关键决策依据（MRV选谁、LCV选啥、FC传播结果）。</p>",
    answerHtml: "<h4>(1) A=Red → FC → MRV 选择下一个变量（5分）</h4><p><strong>赋值：</strong>A = Red</p><p><strong>Forward Checking（A=Red后）：</strong></p><ul><li>A的邻居：B和C（A与D不相邻，不受影响）。</li><li>从D_B中删Red → D_B = {G, B}（2个值）</li><li>从D_C中删Red → D_C = {G, B}（2个值）</li><li>D_D不变 → D_D = {R, G, B}（3个值）</li></ul><p><strong>FC后各变量值域：</strong>D_A={R}(已赋值)，D_B={G,B}，D_C={G,B}，D_D={R,G,B}</p><p><strong>MRV选择：</strong>比较未赋值变量的剩余值数量——</p><ul><li>B：2个值</li><li>C：2个值</li><li>D：3个值</li></ul><p>B和C并列最少（各2个值），两者都是合适的选择。但还需考虑度启发式（Degree Heuristic）作为tie-breaker：B的未赋值邻居数 = C和D（2个），C的未赋值邻居数 = B和D（2个），二者度相同。此时任选其一即可——选择<strong>B</strong>（按字母序）。</p><p><strong>结论：MRV选择变量B。</strong></p><h4>(2) LCV为B选值 + FC传播（5分）</h4><p><strong>LCV评估B的候选值（G和B）：</strong>对每个候选值，计算「若B取该值，会从各未赋值邻居值域中删除多少个选项」。</p><p><strong>候选B=G：</strong></p><ul><li>邻居C：D_C={G,B}，删G后剩{B}——删除1个选项</li><li>邻居D：D_D={R,G,B}，删G后剩{R,B}——删除1个选项</li><li><strong>总删除数 = 2</strong></li></ul><p><strong>候选B=B（Blue，即颜色蓝）：</strong></p><ul><li>邻居C：D_C={G,B}，删B后剩{G}——删除1个选项</li><li>邻居D：D_D={R,G,B}，删B后剩{R,G}——删除1个选项</li><li><strong>总删除数 = 2</strong></li></ul><p><strong>LCV结论：</strong>两个候选值删除数相同（均为2），LCV平局。任选其一——选<strong>B=Green</strong>（按字母序）。</p><p><strong>赋值B=G + FC传播：</strong></p><ul><li>D_C删G → D_C = {B}（只剩1个值！）</li><li>D_D删G → D_D = {R, B}（2个值）</li><li>无值域变空 ✓</li></ul><p><strong>更新后的状态：</strong>A=R(已赋值)，B=G(已赋值)，D_C={B}，D_D={R,B}。</p><h4>(3) 完成求解（5分）</h4><p><strong>MRV选下一个变量：</strong>未赋值变量C剩1个值，D剩2个值 → MRV指向C（「别无选择」的最紧急变量）。</p><p><strong>C唯一可选值为Blue → 直接赋值C=B + FC：</strong></p><ul><li>C的邻居D：D_D={R,B}，删B → D_D = {R}</li><li>D值域未变空 ✓</li></ul><p><strong>更新状态：</strong>A=R, B=G, C=B, D_D={R}</p><p><strong>最后一个变量D：</strong>仅剩值Red。检查D=Red是否与邻居冲突——</p><ul><li>D的邻居：B(=G)≠R ✓，C(=B)≠R ✓</li><li>A不是D的邻居，无约束 ✓</li></ul><p><strong>完整解：A=Red, B=Green, C=Blue, D=Red。</strong></p><p><strong>验证所有约束：</strong>A—B: R≠G ✓ | A—C: R≠B ✓ | B—C: G≠B ✓ | B—D: G≠R ✓ | C—D: B≠R ✓。全部满足！</p><p><strong>总结——各步骤策略体现：</strong></p><table><tbody><tr><th>步骤</th><th>策略</th><th>决策</th><th>依据</th></tr><tr><td>A赋值后</td><td>MRV</td><td>选B（2个值）</td><td>B和C并列最少，度启发式平局后按字母序</td></tr><tr><td>B选值</td><td>LCV</td><td>选Green</td><td>G和B删除数相同，平局按字母序</td></tr><tr><td>B=G后</td><td>MRV</td><td>选C（仅1值）</td><td>C的值域被FC压缩到只剩Blue，必须立即处理</td></tr><tr><td>C赋值</td><td>—</td><td>C=Blue</td><td>唯一可选，无需LCV</td></tr><tr><td>D赋值</td><td>—</td><td>D=Red</td><td>唯一可选</td></tr></tbody></table><div class=\"callout callout--tip\"><strong>本题设计意图：</strong>展示了MRV + LCV + FC 三种技术的协同运作。核心观察：①FC在A=Red后将B和C的值域各减1，立即缩小了MRV的选择范围；②B=G后FC将C的值域压缩到单一值，使C成为下一个必须处理的「紧急变量」；③LCV在本题中因对称性出现平局——这是地图着色对称性的自然结果，实际考试中平局时说明理由并任意选择即可。要区分：MRV用的是FC传播「后」的值域大小，而非初始值域。</div><hr /><p><strong>评分标准（15分）：</strong></p><ul><li>(1) A赋值+FC：FC正确更新B和C的值域（2分——D不受影响必须明确标注）；MRV正确选出B或C并说明理由（2分——必须引用具体值域大小作依据）；度启发式tie-breaker正确（1分）</li><li>(2) LCV+FC：正确计算每个候选值的删除数（2分）；LCV选择正确+FC传播正确（2分——C值域变为单值{Blue}是给分点）；解释LCV在平局时的处理（1分）</li><li>(3) 完成求解：后续MRV选择正确（指向C，1分）；赋值+FC步骤完整（2分）；最终解正确且全部约束验证通过（1分）；整体策略梳理表（1分）</li><li><strong>核心区分度：</strong>是否理解「MRV使用的是FC传播后的动态值域而非初始值域」——这是本���区分「真懂」和「背结论」的关键点</li></ul>",
  },
  {
    id: "sim-s5-3",
    moduleId: "s5",
    year: "模拟题",
    position: "自编",
    points: 10,
    questionText: "<p><strong>题目：AC-3弧相容算法</strong></p><p>给定二元CSP：变量 X = {A, B, C}，初始值域 D_A = D_B = D_C = {1, 2}。约束条件：A > B（A必须大于B），A ≠ C（A与C取值不同）。B和C之间无约束。</p><p>(1) <strong>弧的构造（3分）：</strong>将每个约束转化为有向弧（arc）的集合，写出初始弧队列 Q。每条弧 (X_i, X_j) 表示「检查X_i的值域中每个值是否在X_j的值域中有满足二元约束的支持」。</p><p>(2) <strong>AC-3算法执行过程（5分）：</strong>从初始队列Q开始，逐步执行AC-3算法。每一步写出：从Q中弹出哪条弧、(X_i, X_j)上REVISE的结果（哪些值被删除）、值域变化后哪些弧被重新加入Q。直到Q为空时停止。</p><p>(3) <strong>结果分析（2分）：</strong>该CSP在AC-3处理后是否弧相容？如果是，写出缩减后的值域并列出所有满足弧相容的完整赋值；如果值域出现空集，说明CSP无解。</p>",
    answerHtml: "<h4>(1) 弧的构造（3分）</h4><p>每个二元约束产生两条有向弧（两个方向都要检查）：</p><ul><li>约束 A > B → 弧 (A,B) 和 (B,A)</li><li>约束 A ≠ C → 弧 (A,C) 和 (C,A)</li><li>B和C之间无约束，不产生弧</li></ul><p><strong>初始弧队列Q（按字母序排列，实际顺序不影响最终结果）：</strong></p><p>$Q = [(A,B), (B,A), (A,C), (C,A)]$</p><p>共4条弧。注意：每条弧的含义——(A,B)检查「A的每个值a，是否存在b\in D_B满足a>b」。方向很重要，因为A>B不是对称关系。</p><h4>(2) AC-3算法执行过程（5分）</h4><table><tbody><tr><th>迭代</th><th>弹出弧</th><th>REVISE操作</th><th>值域变化</th><th>新增弧入Q</th></tr><tr><td>1</td><td>(A,B)</td><td>约束A>B：<br>• a=1：需要b<1，D_B={1,2}中无→<strong>删1</strong><br>• a=2：需要b<2，b=1满足→保留</td><td>D_A: {1,2}→<strong>{2}</strong></td><td>所有指向A的弧（除(A,B)自身）：<br><strong>(B,A), (C,A)</strong><br>Q现在：[(B,A),(A,C),(C,A),(B,A),(C,A)]</td></tr><tr><td>2</td><td>(B,A)</td><td>约束A>B的反向：B的每个值b，是否存在a\in D_A={2}满足a>b？<br>• b=1：a=2>1满足→保留<br>• b=2：需要a>2，D_A={2}中无→<strong>删2</strong></td><td>D_B: {1,2}→<strong>{1}</strong></td><td>所有指向B的弧（除(B,A)自身）：<br><strong>(A,B)</strong><br>Q现在：[(A,C),(C,A),(B,A),(C,A),(A,B)]</td></tr><tr><td>3</td><td>(A,C)</td><td>约束A≠C：A的每个值a，是否存在c\in D_C={1,2}满足a≠c？<br>• a=2：c=1满足2≠1→保留<br>D_A={2}，无变化</td><td>无变化</td><td>无（D_A未变）<br>Q：[(C,A),(B,A),(C,A),(A,B)]</td></tr><tr><td>4</td><td>(C,A)</td><td>约束A≠C的反向：C的每个值c，是否存在a\in D_A={2}满足a≠c？<br>• c=1：a=2满足2≠1→保留<br>• c=2：a=2, 2≠2不满足→<strong>删2</strong></td><td>D_C: {1,2}→<strong>{1}</strong></td><td>所有指向C的弧（除(C,A)自身）：<br><strong>(A,C)</strong><br>Q：[(B,A),(C,A),(A,B),(A,C)]</td></tr><tr><td>5</td><td>(B,A)</td><td>同迭代2逻辑，D_A={2}, D_B={1}<br>• b=1：a=2>1满足→保留</td><td>无变化</td><td>无<br>Q：[(C,A),(A,B),(A,C)]</td></tr><tr><td>6</td><td>(C,A)</td><td>同迭代4逻辑，D_C={1}, D_A={2}<br>• c=1：a=2, 2≠1满足→保留</td><td>无变化</td><td>无<br>Q：[(A,B),(A,C)]</td></tr><tr><td>7</td><td>(A,B)</td><td>同迭代1逻辑，D_A={2}, D_B={1}<br>• a=2：b=1, 2>1满足→保留</td><td>无变化</td><td>无<br>Q：[(A,C)]</td></tr><tr><td>8</td><td>(A,C)</td><td>同迭代3逻辑，D_A={2}, D_C={1}<br>• a=2：c=1, 2≠1满足→保留</td><td>无变化</td><td>无<br>Q：[]（空队列，算法终止）</td></tr></tbody></table><p><strong>AC-3算法结束。最终值域：D_A={2}，D_B={1}，D_C={1}。</strong></p><h4>(3) 结果分析（2分）</h4><p><strong>弧相容判断：</strong>该CSP经过AC-3处理后，所有值域非空且对所有弧均满足弧相容条件——<strong>是弧相容的</strong>。</p><p>注意：弧相容并不意味着CSP一定有解，它只是一个必要条件。但在本题中，由于值域都已缩减到单一值，我们可以直接验证：</p><ul><li>A=2, B=1, C=1</li><li>A>B：2>1 ✓</li><li>A≠C：2≠1 ✓</li><li>B和C无约束 ✓</li></ul><p><strong>唯一满足弧相容的完整赋值：(A=2, B=1, C=1)。</strong></p><p>该赋值也是CSP的一个解。在这个特例中，AC-3不仅检测了弧相容，还直接将值域缩减到了唯一解——展示了弧相容传播的威力。</p><div class=\"callout callout--info\"><strong>AC-3关键理解点：</strong><br>① 弧是有向的：(A,B)和(B,A)检查的是不同方向的约束满足性。对于A>B，(A,B)删除了A中「找不到更小B」的值；(B,A)删除了B中「找不到更大A」的值。<br>② REVISE的核心操作：对于弧(X_i, X_j)，对D_i中每个值v，检查D_j中是否存在至少一个值使得二元约束成立。如果不存在，v被删除。<br>③ 重新入队规则：只要D_i发生变化，所有指向X_i的弧（即形如(X_k, X_i), k≠i,j的弧）都需要重新检查——因为X_i的值域缩小可能使原来「有支持」的X_k值现在变成「无支持」。这是AC-3的最坏情况时间复杂度O(ed³)的来源（e=弧数，d=最大值域大小）。<br>④ AC-3是「弧相容」而非「路径相容」或「k-相容」——它只保证任意变量对的任意值都有邻居支持，不保证更高阶的相容性。</div><hr /><p><strong>评分标准（10分）：</strong></p><ul><li>(1) 弧构造：每个约束正确拆分为两条有向弧（2分——方向标注清晰）；初始队列完整（1分）</li><li>(2) AC-3执行：8步迭代的核心步骤正确（3分——不必全部写出每一步，但关键值域变化点（迭代1的D_A缩减、迭代2的D_B缩减、迭代4的D_C缩减）必须写出）；REVISE逻辑正确（1分——必须说明「检查D_j中是否存在支持值」）；重新入队规则正确（1分——值域无变化时不入队，有变化时所有指向该变量的弧入队）</li><li>(3) 结果分析：弧相容判断正确（1分）；验证唯一赋值满足所有约束（1分）</li><li><strong>常见扣分：</strong>①漏写弧的方向（如只写(A,B)不写(B,A)）；②REVISE时错误地检查了X_j对X_i的方向；③值域变化后不加弧入队或乱加（如把已弹出弧的自身也加回去——其实已在Q中或已处理过的弧也可能需要再次检查）</li></ul>",
  }
];