import type { Quiz } from '@learncourse/framework/types';

export const S2_QUIZZES: Quiz[] = [
  {
    id: "q-s2-7",
    moduleId: "s2",
    question: "在搜索问题的形式化（problem formulation）中，一个良定义的搜索问题必须包含五个要素。以下哪个**不属于**搜索问题五元组？",
    options: [
      {
        text: "初始状态（Initial State）和动作集合（Actions）——定义 agent 的起点和在每个状态下可执行的操作",
        isCorrect: false
      },
      {
        text: "转移模型（Transition Model）——描述执行某个动作后状态如何改变，即 Result(s, a) 函数",
        isCorrect: false
      },
      {
        text: "启发式函数（Heuristic Function）h(n)——从节点 n 到最近目标节点的估计代价",
        isCorrect: true
      },
      {
        text: "目标测试（Goal Test）和路径代价函数（Path Cost Function）——判断是否到达目标以及为路径分配数值代价",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！启发式函数 h(n) 不属于搜索问题形式化的五元组——它属于「有信息搜索」（informed search）的附加工具。搜索问题五元组是：(1) 初始状态 Initial State, (2) 动作集合 Actions, (3) 转移模型 Transition Model / Successor Function, (4) 目标测试 Goal Test, (5) 路径代价 Path Cost。五元组定义的是「问题本身是什么样的」——即使没有任何启发式信息，搜索问题也已经完整定义。启发式函数是「额外的领域知识」，用来加速搜索，但不是问题定义的必要部分。",
    feedbackWrong: "不对。启发式函数 h(n) 不属于搜索问题五元组。五元组定义的是问题本身的结构——初始状态、动作、转移模型、目标测试、路径代价——这五个要素确定后，搜索问题就完整了。启发式函数是有信息搜索（如 Greedy BFS、A*）引入的额外领域知识（domain knowledge），不是问题形式化的必要组成部分。类比：五元组就像棋盘和规则，启发式就像棋谱——没有棋谱照样能下棋，但没有棋盘和规则就不行。",
    type: "single"
  },
  {
    id: "q-s2-8",
    moduleId: "s2",
    question: "当搜索图中所有边的代价都等于 1 时，以下关于搜索算法的说法哪个是正确的？",
    options: [
      {
        text: "一致代价搜索（UCS）和广度优先搜索（BFS）的节点展开顺序完全相同——因为 g(n) = depth(n)，UCS 按 g 升序展开等价于 BFS 逐层展开",
        isCorrect: true
      },
      {
        text: "深度优先搜索（DFS）找到的第一个解一定是最优解——因为所有边代价相同，路径长度等于代价",
        isCorrect: false
      },
      {
        text: "A* 搜索（h=0）退化为贪心最佳优先搜索（Greedy BFS）——两者都只考虑启发式值",
        isCorrect: false
      },
      {
        text: "迭代加深 DFS（IDS）的时间复杂度比 BFS 高出一个指数级——因为每一层都从头搜索",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！当所有边代价 = 1 时，路径代价 g(n) 恰好等于节点深度 depth(n)。UCS 的优先队列按 g(n) 升序弹出节点，BFS 的 FIFO 队列按深度逐层展开——两者效果一致。事实上，UCS 可以看作 BFS 在变长代价图上的推广（generalization）。另一个等价视角：A* 当 h(n)=0 时退化为 UCS（f=g+0=g），不是退化为 Greedy BFS。所以 h=0 的 A* = UCS = 边代价全 1 时的 BFS。",
    feedbackWrong: "不对。B 错误——DFS 找到的第一个解可能非常深（沿某个分支一路扎到底），即使所有边代价 = 1，DFS 也不保证找到最浅（最优）的解。C 错误——A* 当 h=0 时 f=g，退化为 UCS，不是 Greedy BFS（Greedy BFS 按 h 排序，h=0 时所有节点等价，退化为随机顺序）。D 错误——IDS 重复搜索浅层节点只增加约 b/(b-1) 倍的常数开销，最深层的节点数主导了总复杂度。",
    type: "single"
  },
  {
    id: "q-s2-9",
    moduleId: "s2",
    question: "迭代加深的深度优先搜索（Iterative Deepening DFS, IDS）看似「浪费」——每次加深深度限制时都要从根节点重新搜索浅层。为什么 IDS 的实际时间复杂度仅比 BFS 多一个常数因子？",
    options: [
      {
        text: "因为 IDS 在底层维护了一个全局缓存（cache），浅层节点被访问一次后就不再重复搜索",
        isCorrect: false
      },
      {
        text: "因为树中绝大多数节点都在最深层——对于分支因子 b，深度 d 层的节点数 b^d 远超之前所有层节点之和，重复搜索浅层的开销被最深层的节点数主导",
        isCorrect: true
      },
      {
        text: "因为每次加深深度限制后，IDS 会使用启发式函数跳过已被证明不包含解的子树",
        isCorrect: false
      },
      {
        text: "因为 IDS 的分支因子随深度增加而减小，深层搜索的节点数并不呈指数增长",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！这是 IDS 的经典分析。对于分支因子为 b 的均匀树：最深层（深度 d）有 b^d 个节点，而深度 0 到 d-1 的所有节点之和约为 b^d/(b-1)。IDS 每次迭代从根重新搜索，所以总访问节点数约为 b^d + b^{d-1} + ... + 1 ≈ b^d · b/(b-1)。BFS 访问所有层各一次，约为 b^d · b/(b-1)（同样数量级）。两者的比值约为 b/(b-1)——当 b=2 时约 2 倍，b=3 时约 1.5 倍。关键洞察：最深层节点数指数级地压倒浅层，浅层的重复搜索「被稀释」了。",
    feedbackWrong: "不对。B 是正确答案——最深层的节点数指数级地压倒浅层节点总数。A 错误——IDS 不维护任何缓存，这正是它内存效率高的原因（只需 O(bd) 空间，不像 BFS 需要 O(b^d)）。C 混淆了 IDS（无信息搜索）和有信息搜索——IDS 不使用启发式函数。D 错误——分支因子不由深度决定，深层搜索的节点数同样指数增长。一句话总结 IDS：用时间换空间——重复搜索浅层（时间开销可控）换取 DFS 级的线性内存。",
    type: "single"
  },
  {
    id: "q-s2-10",
    moduleId: "s2",
    question: "启发式函数 h(n) 被称为可采纳的（admissible），如果对任意节点 n 有 0 ≤ h(n) ≤ h*(n)，其中 h*(n) 是从 n 到最近目标的真实最小代价。关于可采纳性和一致性（consistent / monotonic），以下哪个说法是**错误**的？",
    options: [
      {
        text: "h(n) = 0 对任意 n 都是可采纳的（trivially admissible）且一致的，此时 A* 退化为一致代价搜索（UCS）",
        isCorrect: false
      },
      {
        text: "任何一个一致（consistent）的启发式函数必然也是可采纳的（admissible），但反过来不成立——可采纳的启发式不一定一致",
        isCorrect: false
      },
      {
        text: "一个可采纳的启发式函数必然也是一致的——两者等价，只是历史名称不同",
        isCorrect: true
      },
      {
        text: "在 A* 树搜索（Tree Search）中，只要 h(n) 可采纳，A* 就保证找到最优解；但在 A* 图搜索（Graph Search）中，还需要 h(n) 满足一致性才能保证最优",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！这个说法是错误的——可采纳性（admissible）和一致性（consistent）不等价。一致性是更强的条件：h(n) ≤ c(n,a,n') + h(n') 对所有 n 和 n' 成立。可采纳性只要求 h(n) ≤ h*(n)。结论：一致 → 可采纳，但可采纳 ⇏ 一致。反例：考虑一个三个节点的图 S→A→G，边代价均为1。定义 h(S)=2, h(A)=1, h(G)=0。检查可采纳性：h(S)=2 ≤ 2=h*(S) ✓，h(A)=1 ≤ 1=h*(A) ✓ → 可采纳。检查一致性：h(S)=2 ≤ c(S,A)+h(A)=1+1=2 ✓。反过来：考虑定义 h(S)=3, h(A)=1.5, h(G)=0。h(S)=3 > h*(S)=2 → 不可采纳，也就不一致。所以关键是找出可采纳但不一致的例子。",
    feedbackWrong: "不对。C 是错误说法——可采纳性（admissible）和一致性（consistent）不等价。一致性更强：如果 h 一致，则 h 一定可采纳；但可采纳的启发式不一定一致。一致性要求三角不等式 h(n) ≤ c(n,a,n') + h(n')，确保 f(n) 沿路径非递减（non-decreasing）。A 正确——h=0 是最平凡的启发式，既一致又可采纳。B 正确——总结了两者关系。D 正确——树搜索不需要一致性（因为不会重复访问节点），图搜索需要一致性来保证第一次展开节点时已找到到达该节点的最优路径。",
    type: "single"
  },
  {
    id: "q-s2-11",
    moduleId: "s2",
    question: "贪心最佳优先搜索（Greedy Best-First Search）和 A* 搜索的核心区别在于节点评估函数。以下哪种场景最能暴露贪心 BFS 相对于 A* 的致命弱点？",
    options: [
      {
        text: "图中存在一条「启发式值 h 很低，但实际路径代价 g 极高」的路径——贪心被低 h 值吸引走上代价高昂的路径，而 A* 通过 f=g+h 同时考虑已付出代价和预估剩余代价，避免被误导",
        isCorrect: true
      },
      {
        text: "所有节点的启发式值都相等——此时贪心 BFS 和 A* 的展开顺序完全一致",
        isCorrect: false
      },
      {
        text: "启发式函数恰好是完美的，即 h(n)=h*(n) 对所有 n 成立——此时贪心 BFS 保证找到最优解",
        isCorrect: false
      },
      {
        text: "搜索图为树结构（无环）——贪心 BFS 在树上的行为等价于 A*",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！这精准刻画了贪心 BFS 的局限性。贪心 BFS 只看 h(n)——「离目标看起来还有多远」——而完全忽略 g(n)（«已经走了多远»）。一个典型的陷阱场景：起始节点 S 有两条出路——A 代价小但 h 大（h 说«还有很远»），B 代价大但 h 小（h 说«快到了»）。贪心会被 B 的低 h 吸引，走上 S→B→…→G 的昂贵路径；A* 计算 f=g+h 时会发现：虽然 B 的 h 小，但加上已经付出的 g 后，f(B) 可能比 f(A) 大，于是选 A。这就是 f=g+h 的精髓——h 告诉你«剩余多远»，g 告诉你«已经走了多远»，两者相加才能判断«整条路到底值不值»。",
    feedbackWrong: "不对。A 准确描述了贪心 BFS 的核心缺陷——忽略已付出代价 g(n)。B 错误——所有 h 相等时，贪心在 frontier 中随机选（因为没有偏好），而 A* 按 f=g+h 排序等价于按 g 排序（因为 h 相同），退化为 UCS，两者行为完全不同。C 错误——即使 h=h* 是完美启发式，贪心 BFS 仍然不保证最优（反例：S 到 G 有两条路径，一条代价 1+100=101 但 h*(第二步节点)=1，另一条代价 50+1=51 但 h*=51——贪心选第一条，得到次优解）。D 错误——树结构不影响贪心是否最优，核心在于它不看 g(n)。",
    type: "single"
  }
];