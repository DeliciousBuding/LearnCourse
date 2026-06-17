import type { Quiz } from '@learncourse/framework/types';

export const QUIZZES: Quiz[] = [
  {
    id: "q-s1-1",
    moduleId: "s1",
    question: "PEAS 中，P 代表什么？",
    options: [
      {
        text: "Program——Agent 的程序代码",
        isCorrect: false
      },
      {
        text: "Performance——性能度量，即\"什么叫干得好\"",
        isCorrect: true
      },
      {
        text: "Perception——Agent 的感知能力",
        isCorrect: false
      },
      {
        text: "Planning——Agent 的规划能力",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！P = Performance（性能度量），回答\"用什么标准判断 Agent 干得好不好\"。比如自动驾驶的 P 是安全到达、时间短、舒适、油耗低。PEAS 四个字母中，P 是衡量\"好\"的维度——不同任务对\"好\"的定义不同：出租车的 P 是赚钱多，救护车的 P 是送达快。A 选项是常见错误——PEAS 里根本没有 Program 这个词。",
    feedbackWrong: "不对。P = Performance（性能度量），不是 Program。PEAS 里没有 Program 这个词。Performance 回答\"什么叫干得好\"——比如出租车的 P 是赚钱多，救护车的 P 是送达快。E（Environment）是环境，A（Actuators）是执行器，S（Sensors）是传感器。死记：PEAS = 性能/环境/执行器/传感器。"
  },
  {
    id: "q-s1-2",
    moduleId: "s1",
    question: "以下哪种 Agent 类型维护\"世界如何变化\"的内部模型？",
    options: [
      {
        text: "简单反射 Agent",
        isCorrect: false
      },
      {
        text: "基于模型的反射 Agent",
        isCorrect: true
      },
      {
        text: "基于目标的 Agent",
        isCorrect: false
      },
      {
        text: "基于效用的 Agent",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！基于模型的反射 Agent 维护一份内部\"世界模型\"，追踪\"我看不到的也在变\"。比如自动驾驶要追踪周围车辆的位置——即使摄像头暂时没看到某辆车，内部模型也记得它可能正在靠近。简单反射 Agent（A）只看当前感知做 if-then 反应，不维护任何模型。基于目标和基于效用的 Agent 虽然也维护模型，但\"维护世界模型\"这一特征最核心地属于第 2 种。",
    feedbackWrong: "不对。区分关键：简单反射 = 看到什么做什么（if-then 规则，没有记忆）；基于模型 = 知道世界会自己变化（有内部状态追踪）。基于目标和基于效用的 Agent 是在模型之上加了\"去哪儿\"和\"哪条路更好\"的能力——但题目问的是\"谁维护了世界模型\"，最准确的答案是第 2 种。"
  },
  {
    id: "q-s2-3",
    moduleId: "s2",
    question: "A* 搜索中，每次从 frontier 中挑选哪个节点扩展？",
    options: [
      {
        text: "挑 g(n) 最小的节点",
        isCorrect: false
      },
      {
        text: "挑 h(n) 最小的节点",
        isCorrect: false
      },
      {
        text: "挑 f(n) = g(n) + h(n) 最小的节点",
        isCorrect: true
      },
      {
        text: "挑最浅的节点（深度最小）",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！A* 挑 f(n) = g(n) + h(n) 最小的节点扩展。g 是已经走过的真实代价，h 是估计还要走的代价，f 是\"总成本当前最佳估计\"。A* 同时兼顾了\"不绕远路\"（g）和\"朝着目标走\"（h），这就是它既保证最优又通常高效的秘密。",
    feedbackWrong: "不对。A 选项（挑 g 最小）是 UCS 的规则，B 选项（挑 h 最小）是贪婪最佳优先的规则，D 选项（挑最浅节点）是 BFS 的规则。A* 把 g 和 h 加在一起，挑 f = g+h 最小的。这四者在考试中必须严格区分——写错规则整道题全丢。"
  },
  {
    id: "q-s2-4",
    moduleId: "s2",
    question: "关于 A* 保证最优解的条件，以下哪项正确？",
    options: [
      {
        text: "A* 总是保证最优解，不需要任何条件",
        isCorrect: false
      },
      {
        text: "只要每条边的代价都为正，A* 就保证最优解",
        isCorrect: false
      },
      {
        text: "只要启发式 h(n) 是可容许的（never overestimate），A*（树搜索）就保证最优解",
        isCorrect: true
      },
      {
        text: "A* 永远不保证最优解——只有 UCS 才保证",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！A* 树搜索保证最优解的充要条件是启发式 h(n) 是**可容许的**（admissible）——即 h(n) 永远不会高估从 n 到目标的真实代价。直线距离作为 h(n) 恒可容许（因为两点之间直线最短，真实路径代价不可能比直线更小）。h(n)=0 也恒可容许（此时 A* 退化为 UCS）。注意：A* 图搜索还需要 h 满足**一致性**（consistency），但这是进阶要求，考试通常只考树搜索+可容许性。",
    feedbackWrong: "不对。A 太绝对了——A* 需要可容许的 h 才保证最优。B 不够——边代价为正只是必要条件之一，还需要 h 可容许才行。D 错了——A* 在 h 可容许时也保证最优（UCS 是 A* 在 h=0 时的特例）。考试重点：可容许 = 不乐观估计，即 h(n) <= h*(n)（真实代价）。"
  },
  {
    id: "q-s3-5",
    moduleId: "s3",
    question: "爬山法最大的缺点是什么？",
    options: [
      {
        text: "计算量太大，需要遍历所有状态",
        isCorrect: false
      },
      {
        text: "容易卡在局部最优，无法到达全局最优",
        isCorrect: true
      },
      {
        text: "只能处理连续问题，不能处理离散问题",
        isCorrect: false
      },
      {
        text: "需要维护整个种群，内存开销大",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！爬山法拒绝一切下坡——每次只选比当前更优的邻居。一旦到达一个局部最优（四周邻居都比它差），算法就停止。即使远处有更高的全局最优也无法到达，因为需要先下坡再上坡，而爬山法拒绝下坡。此外平台（四周一样高，不知道往哪走）和山脊（两侧都是下坡）也是爬山法的死穴。模拟退火通过以概率接受更差解来解决这个问题。",
    feedbackWrong: "不对。A 错了——爬山法正是因为计算量小（只看邻居）才被广泛使用。C 错了——爬山法完全可用于离散问题（如 N 皇后）。D 描述的是遗传算法（群体搜索），不是爬山法（单点搜索）。爬山法的核心问题是\"贪心短视\"：只看一步之内的邻居，拒绝任何暂时的退步，导致困在局部最优。"
  },
  {
    id: "q-s3-6",
    moduleId: "s3",
    question: "模拟退火中，温度 T 很高时会发生什么？",
    options: [
      {
        text: "算法几乎只接受更优解，行为接近爬山法",
        isCorrect: false
      },
      {
        text: "算法有很大概率接受更差解，探索更多可能性",
        isCorrect: true
      },
      {
        text: "算法停止接受任何新解",
        isCorrect: false
      },
      {
        text: "温度与接受概率无关",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！根据接受概率公式 $p = \exp(-\Delta E / T)$，T 越大 → p 越大 → 更容易接受差解。高温阶段算法像\"无序探索\"——什么方向都敢试，这样才有机会跳出局部最优的陷阱。温度逐渐降低后，接受差解的概率越来越小，算法变得越来越\"挑剔\"，精细搜索最优解。这模拟了金属退火的过程：高温时原子剧烈运动，冷却后逐渐稳定到最低能量态。",
    feedbackWrong: "不对。根据公式 $p = \exp(-\Delta E / T)$，T 在分母上——T 越大，$-\Delta E/T$ 的绝对值越小，$\exp$ 的值越接近 1，即接受差解的概率越大。A 描述的是低温阶段的行为（T 很小时接近爬山法）。C 和 D 都不对——温度直接影响接受概率，且算法不会\"停止接受所有新解\"。"
  },
  {
    id: "q-s4-7",
    moduleId: "s4",
    question: "在 Minimax 算法中，MIN 节点做什么选择？",
    options: [
      {
        text: "选择所有子节点中值最大的",
        isCorrect: false
      },
      {
        text: "选择所有子节点中值最小的",
        isCorrect: true
      },
      {
        text: "随机选择一个子节点",
        isCorrect: false
      },
      {
        text: "选择第一个遍历到的子节点",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！MIN 节点代表对手——对手想让你的最终结果尽量小，所以 MIN 取子节点的最小值。MAX 节点（你自己）取最大值。两者的交替就是 Minimax 的核心：你选最大（MAX），对手选最小（MIN），层层交替，最终回到根节点就得到\"在对手最聪明的情况下你最多能拿多少\"。",
    feedbackWrong: "不对。A 描述的是 MAX 节点的行为（\"我选对我最有利的\"）。C 和 D 都不是 Minimax 的策略——Minimax 假设对手是**理性的**，总是选择最不利于你的那一步（取最小），绝不会随机走。如果你的对手不理性（会犯错），那你可能比 Minimax 值拿到更多——但 Minimax 是最保守（最稳健）的策略。"
  },
  {
    id: "q-s4-8",
    moduleId: "s4",
    question: "关于 α-β 剪枝，以下哪个说法正确？",
    options: [
      {
        text: "剪枝后 Minimax 的最终值会变小",
        isCorrect: false
      },
      {
        text: "剪枝只删除不可能被选中的分支，最终 Minimax 值不变",
        isCorrect: true
      },
      {
        text: "在 MAX 节点，当 v ≤ α 时触发剪枝",
        isCorrect: false
      },
      {
        text: "剪枝只能在 MIN 节点处触发",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！α-β 剪枝只删除\"不可能被选为最优动作\"的分支——这些分支要么比已知的更差（对 MAX 而言），要么对手根本不会让你走到那里。因此剪枝是**安全的性能优化**：不改变最终 Minimax 值，只省了计算量。最理想情况下（节点按最优顺序排列），时间复杂度从 O(b^d) 降到 O(b^{d/2})。",
    feedbackWrong: "不对。A 错了——剪枝不改变最终结果，只跳过不必要的计算。C 错了——MAX 节点的剪枝条件是 v ≥ β（不是 v ≤ α）；反过来 MIN 节点的剪枝条件是 v ≤ α。D 错了——MIN 和 MAX 节点都可以触发剪枝，条件不同而已。记住：α 是 MAX 的下界，β 是 MIN 的上界，当某个分支不可能改变这两个界时，就可以剪掉。"
  },
  {
    moduleId: "s5",
    question: "一个 CSP 由哪三个核心部分组成？",
    options: [
      {
        text: "初始状态、动作集合、目标测试",
        isCorrect: false
      },
      {
        text: "变量、值域、约束",
        isCorrect: true
      },
      {
        text: "节点、边、权重",
        isCorrect: false
      },
      {
        text: "状态、转移函数、效用值",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！CSP 三要素：Variables（给谁赋值）、Domains（可以取哪些值）、Constraints（什么组合不行）。这三点是建模题的骨架——考试中不管出什么场景，死守这三条就能写出来。",
    feedbackWrong: "❌ 不对哦。那四个选项是搜索问题的形式化（初始状态、动作、转移模型、目标测试、路径代价），不是 CSP。CSP 关心的是\"给变量赋值并满足约束\"。"
  },
  {
    id: "q-s5-9",
    moduleId: "s5",
    question: "关于提高回溯效率的方法，以下配对正确的是？",
    options: [
      {
        text: "MRV —— 给变量选值时选对其他变量限制最少的值",
        isCorrect: false
      },
      {
        text: "MRV —— 优先选择剩余可选值最少的变量",
        isCorrect: true
      },
      {
        text: "LCV —— 优先选择约束最多的变量",
        isCorrect: false
      },
      {
        text: "Forward checking —— 在搜索过程中维持弧相容",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！MRV 是选变量的策略：谁剩下的合法值最少（最\"危险\"），就先处理谁。像收拾行李箱——最小的空间先给最难放的东西。",
    feedbackWrong: "❌ 再想想！MRV（选最危险的变量）vs LCV（选最友好的值）vs Degree heuristic（选约束最多的变量）——这三个经常被混在一起考。记住：MRV 管\"先填哪格\"，LCV 管\"填什么\"。"
  },
  {
    id: "q-s6-10",
    moduleId: "s6",
    question: "\"每个学生都尊敬某些老师\"的正确 FOL 翻译是？",
    options: [
      {
        text: "∀x (Student(x) → ∃y (Teacher(y) ∧ Respect(x,y)))",
        isCorrect: true
      },
      {
        text: "∀x ∃y (Student(x) ∧ Teacher(y) → Respect(x,y))",
        isCorrect: false
      },
      {
        text: "∃y ∀x (Student(x) → Teacher(y) ∧ Respect(x,y))",
        isCorrect: false
      },
      {
        text: "∀x (Student(x) ∧ ∃y (Teacher(y) → Respect(x,y)))",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！关键规则：∀ 后面跟 →（蕴涵），∃ 后面跟 ∧（合取）。第2个不是标准翻译模式；第3个意思是\"存在一个老师被所有学生尊敬\"（意思更强）；第4个用 ∃y (T→R) 太弱了——只要存在一个不是老师的人蕴涵就自动真，这是最经典的翻译错误。",
    feedbackWrong: "❌ 正确答案是第1个。翻译核心套路：∀ 配 →（\"凡是P必是Q\"），∃ 配 ∧（\"存在既是P又是Q的东西\"）。"
  },
  {
    id: "q-s6-11",
    moduleId: "s6",
    question: "归结证明中，出现空子句 □ 意味着什么？",
    options: [
      {
        text: "目标公式为假",
        isCorrect: false
      },
      {
        text: "假设目标公式的否定导致矛盾，因此目标公式为真",
        isCorrect: true
      },
      {
        text: "前提集本身不一致",
        isCorrect: false
      },
      {
        text: "无法得出结论",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！归结是反证法：假设目标为假（¬Goal），加入前提集。如果推出空子句 □（矛盾），说明 ¬Goal 与前提冲突，因此 Goal 必然为真。",
    feedbackWrong: "❌ 归结是反证法：加入目标的否定 ¬Goal 到前提集，推到空子句 □ = 矛盾 → ¬Goal 不成立 → Goal 成立。"
  },
  {
    id: "q-s7-12",
    moduleId: "s7",
    question: "C → S, C → R 结构中，已知 C 后 S 和 R 的关系是？",
    options: [
      {
        text: "条件独立——给定 C 后 S 和 R 相互独立",
        isCorrect: true
      },
      {
        text: "仍然相关",
        isCorrect: false
      },
      {
        text: "S 导致 R",
        isCorrect: false
      },
      {
        text: "R 导致 S",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 这是 common cause 结构：给定共同原因 C，两个结果 S 和 R 之间的信息通路被\"阻塞\"。已知阴天，喷水状态不会告诉我们任何关于下雨的额外信息。",
    feedbackWrong: "❌ 正确答案：条件独立。这是 common cause 结构（C 是 S 和 R 的共同原因）。贝叶斯网络的 D-separation 规则：给定父节点 C，它的两个子节点之间的路径被阻塞。"
  },
  {
    id: "q-s7-13",
    moduleId: "s7",
    question: "疾病发病率 0.1%，检测准确率 99%（有病测出阳性），假阳性率 2%。测出阳性，真有病的概率约？",
    options: [
      {
        text: "99%",
        isCorrect: false
      },
      {
        text: "50%",
        isCorrect: false
      },
      {
        text: "约 4.7%",
        isCorrect: true
      },
      {
        text: "约 0.1%",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ P(D|+) = 0.99×0.001 / (0.99×0.001 + 0.02×0.999) ≈ 4.7%。尽管检测很准，但疾病太罕见，假阳性淹没了真阳性。这就是基础率谬误。",
    feedbackWrong: "❌ 约 4.7%。用贝叶斯公式：假阳性人数（2%×99.9%）远多于真阳性（99%×0.1%）。罕见病不做普筛就是这个原因。"
  },
  {
    id: "q-s8-14",
    moduleId: "s8",
    question: "HMM 的 Markov 假设指的是什么？",
    options: [
      {
        text: "当前状态只依赖于上一个状态：P(X_t | X_{1:t-1}) = P(X_t | X_{t-1})",
        isCorrect: true
      },
      {
        text: "观测之间相互独立",
        isCorrect: false
      },
      {
        text: "状态和观测总是相同的",
        isCorrect: false
      },
      {
        text: "所有状态的概率都相等",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 一阶 Markov 假设：未来只取决于现在，与过去无关。这让计算变得可行——只需存储一个状态分布，不需要整个历史。",
    feedbackWrong: "❌ Markov 假设 = P(X_t | X_1,...,X_{t-1}) = P(X_t | X_{t-1})。当前状态只依赖于上一个状态。\"观测之间相互独立\"是另一个假设（给定状态后观测独立于历史观测）。"
  },
  {
    id: "q-s8-15",
    moduleId: "s8",
    question: "HMM 滤波中每一步的两个子步骤依次是？",
    options: [
      {
        text: "先更新再预测",
        isCorrect: false
      },
      {
        text: "先预测再更新",
        isCorrect: true
      },
      {
        text: "只预测不更新",
        isCorrect: false
      },
      {
        text: "只更新不预测",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！滤波 = 预测（用转移矩阵从上一个后验推到当前先验）+ 更新（用当前观测校正，得到当前后验）。节奏是：昨天后验 → 今天先验（预测）→ 今天后验（更新）。每轮都是\"先往前推，再回头看观测修正\"。",
    feedbackWrong: "❌ 滤波的顺序是\"先预测再更新\"。预测阶段用转移矩阵把昨天的后验推到今天（P(X₂|e₁) = Σ P(X₂|x₁)P(x₁|e₁)），然后更新阶段用今天的观测校正（乘发射概率再归一化）。如果只预测不更新，等于放弃了观测提供的信息。"
  },
  {
    id: "q-s9-15",
    moduleId: "s9",
    question: "一个数据集有 8 个样本（5 正 3 负），总熵 H(D) 是多少？（log₂5≈2.3219, log₂3≈1.5850）",
    options: [
      {
        text: "A. 0.5",
        isCorrect: false
      },
      {
        text: "B. 1.0",
        isCorrect: false
      },
      {
        text: "C. 0.9544",
        isCorrect: true
      },
      {
        text: "D. 0.9400",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！H = —(5/8·log₂(5/8) + 3/8·log₂(3/8)) = —(0.625×log₂0.625 + 0.375×log₂0.375) = —(0.625×(—0.6781) + 0.375×(—1.4150)) = —(—0.4238 — 0.5306) = 0.9544。注意别和 14 样本（9正5负）的 0.940 搞混。",
    feedbackWrong: "❌ 再想想。H = —(5/8·log₂(5/8) + 3/8·log₂(3/8)) = 0.9544。容易错选 D（0.9400）——那是 14 样本（9正5负）的结果，不是 8 样本。"
  },
  {
    id: "q-s9-16",
    moduleId: "s9",
    question: "朴素贝叶斯：已知 P(A|+) = 0.8, P(B|+) = 0.3, P(+) = 0.5；P(A|—) = 0.2, P(B|—) = 0.6, P(—) = 0.5。样本有特征 A 和 B，应分为哪类？",
    options: [
      {
        text: "A. 正类 (+)",
        isCorrect: true
      },
      {
        text: "B. 负类 (—)",
        isCorrect: false
      },
      {
        text: "C. 无法判断",
        isCorrect: false
      },
      {
        text: "D. 概率相等",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！P(+|A,B) ∝ 0.8×0.3×0.5 = 0.12；P(—|A,B) ∝ 0.2×0.6×0.5 = 0.06。0.12 > 0.06，选正类。朴素贝叶斯不用归一化——只比大小。",
    feedbackWrong: "❌ 不对。算一下：P(+|A,B) ∝ 0.8 × 0.3 × 0.5 = 0.12，P(—|A,B) ∝ 0.2 × 0.6 × 0.5 = 0.06。0.12 > 0.06，所以分到正类。"
  },
  {
    id: "q-s10-17",
    moduleId: "s10",
    question: "MDP 五元组不包括以下哪个？",
    options: [
      {
        text: "A. 状态集合 S",
        isCorrect: false
      },
      {
        text: "B. 策略 π",
        isCorrect: true
      },
      {
        text: "C. 奖励函数 R",
        isCorrect: false
      },
      {
        text: "D. 折扣因子 γ",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！MDP 五元组是 (S, A, P, R, γ)。策略 π 是解MDP 得到的东西，不是 MDP 本身的组成元素。MDP 定义问题，策略是解决问题的方法。",
    feedbackWrong: "❌ 错了。策略 π 是解 MDP 后得到的\"该怎么做\"——它不属于 MDP 定义本身。MDP 五元组是 S, A, P, R, γ。"
  },
  {
    id: "q-s10-18",
    moduleId: "s10",
    question: "γ=0.95，奖励序列在 t=3 时得到 +10。该奖励折现到当前值是多少？",
    options: [
      {
        text: "A. 10",
        isCorrect: false
      },
      {
        text: "B. 9.5",
        isCorrect: false
      },
      {
        text: "C. 9.025",
        isCorrect: true
      },
      {
        text: "D. 8.574",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！t=3 是第 3 步，折现到当前要乘 γ²（第 1 步乘 γ⁰，第 2 步乘 γ¹，第 3 步乘 γ²）。所以 10 × 0.95² = 10 × 0.9025 = 9.025。注意指数是 t—1。",
    feedbackWrong: "❌ 再算一下。t=3 是第 3 步，乘的是 γ² = 0.95² = 0.9025。10 × 0.9025 = 9.025。容易搞错指数——第 1 步乘 γ⁰，第 n 步乘 γⁿ⁻¹。"
  },
  {
    id: "q-s11-19",
    moduleId: "s11",
    question: "输入 6×6 矩阵，卷积核 3×3，步长 1，卷积输出尺寸是多少？",
    options: [
      {
        text: "A. 3×3",
        isCorrect: false
      },
      {
        text: "B. 4×4",
        isCorrect: true
      },
      {
        text: "C. 5×5",
        isCorrect: false
      },
      {
        text: "D. 2×2",
        isCorrect: false
      }
    ],
    feedbackCorrect: "✅ 正确！输出 = (6 — 3) / 1 + 1 = 4。这 3×3 的卷积核在 6×6 的图上可以在 4×4 = 16 个不同位置停留。",
    feedbackWrong: "❌ 再算。公式：(N — F) / stride + 1 = (6 — 3) / 1 + 1 = 4。注意是 4×4，不是 3×3。"
  },
  {
    id: "q-s11-20",
    moduleId: "s11",
    question: "以下哪个是最大池化（Max Pooling）的主要作用？",
    options: [
      {
        text: "A. 增加图像分辨率",
        isCorrect: false
      },
      {
        text: "B. 检测图像中的边缘",
        isCorrect: false
      },
      {
        text: "C. 降维并保留主要特征",
        isCorrect: true
      },
      {
        text: "D. 给图像添加噪声",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！池化的核心目的是降维（减少数据量）同时保留每个区域最重要的特征（取最大值 = 最强的激活信号留下来）。边缘检测是卷积的事，不是池化的事。",
    feedbackWrong: "再想一下。边缘检测是卷积的活。池化做的是缩小特征图、保留最强信号——窗口里取最大，扔掉次要信息，减少计算量。"
  },
  {
    id: "q-s9-21",
    moduleId: "s9",
    question: "对二分类问题（正/负样本），信息熵 $H$ 的取值范围是？",
    options: [
      {
        text: "A. $[-1, 1]$",
        isCorrect: false
      },
      {
        text: "B. $[0, 1]$",
        isCorrect: true
      },
      {
        text: "C. $[0, \\infty)$",
        isCorrect: false
      },
      {
        text: "D. $[-\\infty, +\\infty]$",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！二分类问题信息熵范围是 $[0, 1]$。全纯（全正或全负）时 $H=0$；各一半时 $H=1$（最大）。熵永远非负，因为 $p_k \\in [0,1]$ 且 $\\log_2 p_k \\leq 0$，前面有负号。",
    feedbackWrong: "不对。信息熵衡量\"混乱程度\"——最纯（全是一类）时最不混乱，$H=0$；最乱（各一半）时最混乱，$H=1$。熵的范围不会超出 $[0,1]$，且永远非负。"
  },
  {
    id: "q-s9-22",
    moduleId: "s9",
    question: "关于朴素贝叶斯的\"朴素\"假设，以下哪个说法正确？",
    options: [
      {
        text: "A. 朴素贝叶斯假设所有类别的先验概率相等",
        isCorrect: false
      },
      {
        text: "B. 朴素贝叶斯假设在给定类别后，各特征之间相互独立",
        isCorrect: true
      },
      {
        text: "C. 朴素贝叶斯假设数据集没有噪声",
        isCorrect: false
      },
      {
        text: "D. 朴素贝叶斯假设决策边界是直线",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！\"朴素\"指的是条件独立假设：$P(x_1, x_2|C) = P(x_1|C) \\times P(x_2|C)$。即给定类别后，特征之间互不影响。现实中这假设常不成立（如垃圾邮件中\"含免费\"和\"含链接\"其实相关），但朴素贝叶斯在实践中效果出乎意料地好，且计算极快。",
    feedbackWrong: "不对。\"朴素\"不是指先验相等、数据干净或边界形状——而是条件独立假设。给定类别 $C$ 后，$x_1$ 和 $x_2$ 被假设互不影响：$P(x_1,x_2|C)=P(x_1|C)P(x_2|C)$。各选项：A 描述的是\"均匀先验\"而非\"朴素\"；C 是任何 ML 模型都面临的问题；D 描述的是线性分类器。"
  },
  {
    id: "q-s10-23",
    moduleId: "s10",
    question: "关于 MDP 的马尔可夫性质，以下哪个说法正确？",
    options: [
      {
        text: "A. 当前状态和奖励只依赖于上一个状态和动作",
        isCorrect: true
      },
      {
        text: "B. 当前状态依赖于所有历史状态",
        isCorrect: false
      },
      {
        text: "C. 未来奖励不受当前动作影响",
        isCorrect: false
      },
      {
        text: "D. 状态转移概率随时间改变",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！马尔可夫性质：$P(s_{t+1}|s_t, a_t, s_{t-1}, a_{t-1}, \\ldots) = P(s_{t+1}|s_t, a_t)$。未来只取决于现在，与过去无关。就像下棋——你只需要知道当前棋盘，不需要记住每一步走法。B 恰恰违背了这一点；C 否定了 RL 的根本前提（动作能改变未来）；D 描述的是非平稳动态。",
    feedbackWrong: "不对。马尔可夫性质的核心是\"未来只取决于现在\"——$P(s_{t+1}|s_t,a_t,\\text{历史})=P(s_{t+1}|s_t,a_t)$。选项 B 说依赖所有历史，刚好相反。选项 C 说动作不影响未来奖励——那强化学习就没意义了。选项 D 描述的是非平稳 MDP，不是标准 MDP。"
  },
  {
    id: "q-s10-24",
    moduleId: "s10",
    question: "强化学习中\"探索 Exploration\"和\"利用 Exploitation\"的矛盾是什么？",
    options: [
      {
        text: "A. 探索需要计算资源，利用不需要",
        isCorrect: false
      },
      {
        text: "B. 探索可能错过已知的好选择，利用可能错过未知的更好选择",
        isCorrect: true
      },
      {
        text: "C. 探索只能在训练时做，利用只能在测试时做",
        isCorrect: false
      },
      {
        text: "D. 两者没有矛盾，可以同时最大化",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！这是 RL 最经典的两难：\"利用\"选已知最好的动作稳稳拿分，但可能永远发现不了更优策略；\"探索\"尝试未知动作以期找到更优解，但短期可能亏分。经典例子：你总去同一家餐厅（利用），不去尝试隔壁新开的，就永远不知道隔壁更好吃（探索不足）。",
    feedbackWrong: "不对。探索和利用是 RL 的根本矛盾——它们共享同一个时间/资源池。C 错在 online RL 中测试也在与环境交互，也需要 exploration。D 更不对——两者需要权衡，不存在同时最大化。A 太表面——矛盾的核心是\"信息收集 vs 即时回报\"的取舍，而非计算资源。"
  },
  {
    id: "q-s11-25",
    moduleId: "s11",
    question: "输入 $7 \\times 7$ 矩阵，卷积核 $3 \\times 3$，步长 $S=2$，padding $P=0$。卷积输出尺寸是？",
    options: [
      {
        text: "A. $2 \\times 2$",
        isCorrect: false
      },
      {
        text: "B. $3 \\times 3$",
        isCorrect: true
      },
      {
        text: "C. $4 \\times 4$",
        isCorrect: false
      },
      {
        text: "D. $5 \\times 5$",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！$W_{out} = \\lfloor \\frac{7 + 0 - 3}{2} \\rfloor + 1 = \\lfloor 2 \\rfloor + 1 = 3$。步长 2 时卷积核滑动位置为 $(0,0), (0,2), (0,4)$，共 3 行 3 列 → 输出 $3 \\times 3$。A 是忘记 +1 的结果；C 是步长当 1 算的。",
    feedbackWrong: "再算。公式：$N_{out} = \\lfloor \\frac{N_{in} + 2P - F}{S} \\rfloor + 1 = \\lfloor \\frac{7-3}{2} \\rfloor + 1 = 2 + 1 = 3$。容易错的地方：分子是 $N-F$ 不是 $F-N$；算出 $\\lfloor 2 \\rfloor$ 后必须 $+1$。"
  },
  {
    id: "q-s11-26",
    moduleId: "s11",
    question: "一个 $4 \\times 4$ 特征图经过 $2 \\times 2$ 最大池化（步长 2），输出尺寸为？如果是平均池化呢？",
    options: [
      {
        text: "A. 最大池化 $2 \\times 2$，平均池化 $4 \\times 4$",
        isCorrect: false
      },
      {
        text: "B. 最大池化 $3 \\times 3$，平均池化 $3 \\times 3$",
        isCorrect: false
      },
      {
        text: "C. 都是 $2 \\times 2$",
        isCorrect: true
      },
      {
        text: "D. 都是 $3 \\times 3$",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！池化输出尺寸公式和卷积相同：$(4-2)/2 + 1 = 2$。池化类型（最大/平均）只影响取什么值（max vs mean），不影响输出尺寸。步长 2 意味着 4 个不重叠的 $2 \\times 2$ 窗口：左上、右上、左下、右下 → $2 \\times 2$ 输出。",
    feedbackWrong: "再想一下。池化输出尺寸公式和卷积一样，与池化类型无关。最大池化和平均池化的区别在于\"取最大值\"还是\"取平均值\"——窗口大小相同，输出尺寸也相同。$(4-2)/2+1=2$，都是 $2 \\times 2$。A 的错误在于把平均池化想成不降维了。"
  }
];