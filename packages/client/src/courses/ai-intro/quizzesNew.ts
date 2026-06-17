export const NEW_AI_QUIZZES: Quiz[] = [
  // ============================================================
  // s1 - Agent（新增2道：Agent类型判断场景题 + 学习型Agent组件）
  // ============================================================
  {
    id: "q-s1-3",
    moduleId: "s1",
    question: "一个Roomba扫地机器人，碰到障碍物就随机转向，电量低时自动回充。它不记住已打扫过的区域，也不规划路径。根据其行为模式，它最接近哪种Agent类型？",
    options: [
      {
        text: "简单反射Agent（Simple Reflex Agent）——只看当前感知做if-then反应",
        isCorrect: true
      },
      {
        text: "基于模型的反射Agent（Model-Based Reflex Agent）——维护内部世界模型，追踪不可直接观察的状态变化",
        isCorrect: false
      },
      {
        text: "基于目标的Agent（Goal-Based Agent）——根据目标规划动作序列",
        isCorrect: false
      },
      {
        text: "学习型Agent（Learning Agent）——从经验中持续改进性能",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！这台扫地机器人是典型的简单反射Agent：它只根据当前感知（碰到障碍物→转向，电量低→回充）做出if-then反应，不维护任何内部地图（排除B），不规划路径（排除C），也不从过去的清扫经验中学习改进（排除D）。简单反射Agent的核心特征就是」condition-action规则 + 无记忆」——看到什么就做什么，做完就忘。",
    feedbackWrong: "不对。关键线索：题目明确说「不记住已打扫过的区域，也不规划路径」——这直接排除了基于模型（需要维护世界状态）和基于目标（需要规划）。它只做最简单的条件反射：碰到障碍→转，电量低→回充。这是简单反射Agent的标志性行为。判断Agent类型的口诀：有记忆→模型型，有目标→目标型，有偏好→效用型，会进步→学习型，啥都没有→简单反射。",
    type: "single"
  },
  {
    id: "q-s1-4",
    moduleId: "s1",
    question: "学习型Agent（Learning Agent）由四个核心组件构成。以下关于各组件的职责配对，哪个是正确的？",
    options: [
      {
        text: "Critic（批评者）——根据性能标准评判Agent做得好不好，向Learning element反馈",
        isCorrect: true
      },
      {
        text: "Learning element（学习元件）——负责选择并执行具体动作",
        isCorrect: false
      },
      {
        text: "Performance element（执行元件）——负责从Critic的反馈中学习和改进",
        isCorrect: false
      },
      {
        text: "Problem generator（问题生成器）——负责评估每次动作后的性能得分",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！四个组件的分工：Critic用性能标准评判「刚才做得好不好」→反馈给Learning element；Learning element根据反馈修改Performance element（让它下次做得更好）；Performance element负责实际选择和执行动作（它是被改进的对象）；Problem generator提出探索性动作建议，防止Agent永远只做已知的最优选择。",
    feedbackWrong: "不对。区分四个组件的关键：Learning element是「大脑的改进部」——它不执行动作，而是修改Performance element。Performance element才是执行动作的「手」。Critic是「评分员」，Problem generator是「探索提议者」。B把Learning element和Performance element搞反了；C同样搞反了；D把Problem generator和Critic搞混了。",
    type: "single"
  },

  // ============================================================
  // s2 - 搜索算法（新增2道：BFS/DFS数据结构与性质 + frontier vs explored）
  // ============================================================
  {
    id: "q-s2-5",
    moduleId: "s2",
    question: "关于无信息搜索中BFS和DFS的比较，以下哪个说法是正确的？",
    options: [
      {
        text: "BFS使用栈（Stack）实现，DFS使用队列（Queue）实现",
        isCorrect: false
      },
      {
        text: "BFS是完备的且当所有边代价相同时也是最优的；DFS在有限状态空间中是完备的，但不保证最优",
        isCorrect: true
      },
      {
        text: "DFS总是比BFS更快找到解",
        isCorrect: false
      },
      {
        text: "BFS和DFS都是完备且最优的，只是内存开销不同",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！BFS用队列（FIFO，先进先出）→逐层扩展→找到的第一个解一定是最浅的→边代价相同时即最优。DFS用栈（LIFO，后进先出）→一路扎到底→找到的解可能很深，不保证最优。完备性方面：BFS在有限分支因子时总是完备的；DFS在无限状态空间中可能沿一条无限路径永远下不去，但有限空间+避免重复状态时完备。关键记忆：队列=横着走（BFS），栈=竖着扎（DFS）。",
    feedbackWrong: "不对。A搞反了——BFS用队列（Queue/FIFO），DFS用栈（Stack/LIFO）。记法：「Breadth」→「Broad」→横向铺开→队列；「Depth」→纵深→栈。C太绝对——DFS可能运气好直接撞上解，也可能沿错误分支浪费大量时间。D明显错误——DFS不保证最优解（找到的解可能比最优深得多）。",
    type: "single"
  },
  {
    id: "q-s2-6",
    moduleId: "s2",
    question: "在图搜索（Graph Search）中，frontier（边界/开集）和explored（已探索/闭集）的作用分别是什么？",
    options: [
      {
        text: "frontier存储已扩展过的节点，explored存储尚未扩展的候选节点",
        isCorrect: false
      },
      {
        text: "frontier存储待扩展的候选节点（叶节点），explored存储已扩展过的节点，防止重复访问和循环",
        isCorrect: true
      },
      {
        text: "frontier和explored是同一个数据结构的不同叫法，本质没有区别",
        isCorrect: false
      },
      {
        text: "explored集合仅在A*算法中需要，frontier仅用于BFS",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！frontier（也叫open set/open list）存放「已生成但尚未扩展「的节点——算法每次从frontier中选一个节点来扩展。explored（也叫closed set/closed list）存放「已经扩展过「的节点——它的核心作用是防止重复访问：如果一个节点的所有后继都已被处理，再遇到它就可以跳过。没有explored集合，图搜索可能陷入循环（如A→B→A→B...）。树搜索（Tree Search）不维护explored，因此在有环的图中可能永远不终止。",
    feedbackWrong: "不对。A恰好把两者搞反了。frontier是「候选池」（还没处理），explored是「已完成」（处理过了）。C不对——两者职责完全不同：frontier是「待办列表」，explored是「已完成列表」，缺一不可（图搜索）。D不对——这两个概念适用于所有图搜索算法（BFS、DFS、UCS、A*等），不是某个算法的专属。",
    type: "single"
  },

  // ============================================================
  // s3 - 超越经典搜索（新增1道：遗传算法三步）
  // ============================================================
  {
    id: "q-s3-7",
    moduleId: "s3",
    question: "遗传算法（Genetic Algorithm）的一个完整迭代包含三个核心遗传算子。它们的标准执行顺序是？",
    options: [
      {
        text: "变异（Mutation）→ 交叉（Crossover）→ 选择（Selection）",
        isCorrect: false
      },
      {
        text: "选择（Selection）→ 交叉（Crossover）→ 变异（Mutation）",
        isCorrect: true
      },
      {
        text: "交叉（Crossover）→ 选择（Selection）→ 变异（Mutation）",
        isCorrect: false
      },
      {
        text: "选择（Selection）→ 变异（Mutation）→ 交叉（Crossover）",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！标准顺序是Selection → Crossover → Mutation。1) Selection（选择）：根据适应度函数（fitness function）选出一批父代个体——适应度越高，被选中的概率越大（「优胜」）。2) Crossover（交叉）：配对父代，交换部分基因片段，生成子代——这是遗传算法产生新个体的主要方式。3) Mutation（变异）：以很小的概率随机翻转子代的某些基因——保持种群多样性，防止过早收敛到局部最优。",
    feedbackWrong: "不对。正确顺序：先选（谁有资格繁殖）→再交叉（父母基因重组生孩子）→最后变异（孩子基因随机微调）。容易混淆的点：变异不是第一步——你得先有子代才能变异；变异也不是第二步——交叉产生子代后才有对象可变异。一句话记忆：「先挑好父母，再生娃，最后随机微调」。",
    type: "single"
  },

  // ============================================================
  // s4 - 对抗搜索（新增1道：α-β含义与剪枝条件）
  // ============================================================
  {
    id: "q-s4-9",
    moduleId: "s4",
    question: "在α-β剪枝中，α和β分别记录什么值？剪枝（pruning）在什么条件下触发？",
    options: [
      {
        text: "α = MIN节点目前找到的最好值（上界），β = MAX节点目前找到的最好值（下界）；当α ≤ β时剪枝",
        isCorrect: false
      },
      {
        text: "α = MAX节点目前找到的最好值（下界），β = MIN节点目前找到的最好值（上界）；当α ≥ β时剪枝",
        isCorrect: true
      },
      {
        text: "α = 当前搜索深度，β = 剩余可用时间；当时间耗尽时剪枝",
        isCorrect: false
      },
      {
        text: "α = MAX节点目前已探索的节点数，β = MIN节点目前已探索的节点数；当两者相等时剪枝",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！α是MAX的「保底线」（下界）——MAX知道至少能拿α这么多，只会接受≥α的值。β是MIN的「封顶线」（上界）——MIN知道至多会输β这么多，只会接受≤β的值。剪枝条件α ≥ β的直觉：当MAX的保底线已经大于等于MIN的封顶线时，说明继续搜索这个分支不可能改变最终结果——MIN绝不会让MAX拿到比β更大的值，而MAX已经有了至少α（≥β）的保证。记忆口诀：「α是MAX的底，β是MIN的顶，底≥顶就剪」。",
    feedbackWrong: "不对。A把α和β的归属搞反了——α跟MAX，β跟MIN。记住：α-β剪枝的名字本身就暗示了顺序——α（第一个字母）对应MAX（先手），β（第二个字母）对应MIN（后手）。C和D把α和β的含义完全理解错了——它们不是搜索进度或节点计数，而是博弈值（utility）的边界。",
    type: "single"
  },

  // ============================================================
  // s5 - CSP（新增1道：Forward Checking vs MAC）
  // ============================================================
  {
    id: "q-s5-10",
    moduleId: "s5",
    question: "关于约束传播（Constraint Propagation）中Forward Checking和MAC（Maintaining Arc Consistency）的区别，以下哪个说法正确？",
    options: [
      {
        text: "Forward Checking比MAC传播得更远，能检测更多冲突，因此MAC是Forward Checking的简化版",
        isCorrect: false
      },
      {
        text: "Forward Checking只检查当前变量与其未赋值邻居之间的一步约束；MAC在每次赋值后持续传播，维护整个网络的弧相容（Arc Consistency）",
        isCorrect: true
      },
      {
        text: "Forward Checking和MAC在算法层面完全相同，只是历史名称不同",
        isCorrect: false
      },
      {
        text: "MAC只在搜索开始前执行一次弧相容检查，Forward Checking在每次赋值后都检查",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！Forward Checking是「只看一步」：当前变量X赋值后，立即检查组内所有与X有约束关系的未赋值变量Y——如果Y的某个值v与X的当前赋值冲突，就把v从Y的值域中删掉。MAC在此基础上做得更深：赋值后不只检查一步邻居，而是维护整张约束图的弧相容——某个变量的值域缩小后，这个变化会传播到所有相关变量，可能引发连锁缩小。MAC比Forward Checking更强（能更早发现死胡同），但计算开销也更大。一个直观类比：Forward Checking像「只看隔壁邻居有没有冲突」，MAC像「通知全楼每家每户重新检查」。",
    feedbackWrong: "不对。B准确描述了核心区别：Forward Checking是「局部一步传播」，MAC是「全局弧相容维护」。A反了——MAC比Forward Checking更强，不是简化版。C明显错误——两者是不同的算法，MAC的剪枝能力更强。D搞反了——Forward Checking在每次赋值后都检查（不是只在开始前），MAC也一样在搜索过程中持续执行。考试重点：MAC > Forward Checking > 不回看（简单回溯）。",
    type: "single"
  },

  // ============================================================
  // s6 - 命题逻辑与一阶逻辑（新增2道：KB|=α含义 + 归结步骤）
  // ============================================================
  {
    id: "q-s6-12",
    moduleId: "s6",
    question: "KB |= α（KB semantically entails α / KB语义蕴涵α）的准确含义是什么？",
    options: [
      {
        text: "KB可以通过推理规则直接推导出α（即KB ⊢ α）",
        isCorrect: false
      },
      {
        text: "在所有使KB为真的可能世界（模型）中，α也都为真",
        isCorrect: true
      },
      {
        text: "α可以通过推理规则推导出KB",
        isCorrect: false
      },
      {
        text: "KB和α必须在所有可能世界中同时为真",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！KB |= α是语义概念：在所有满足KB的模型中（所有KB为真的可能世界），检查α是否也为真。如果是，则KB蕴涵α。与之对照，KB ⊢ α（语法推导/syntactic derivation）是通过推理规则从KB中机械地推导出α。在命题逻辑中，归结原理同时具有可靠性和完备性，所以|=和⊢等价——但考试中要能区分这两个符号：|=是「关于真值的声明」，⊢是「关于推导的声明」。",
    feedbackWrong: "不对。A描述的是KB ⊢ α（语法推导），不是KB |= α（语义蕴涵）。两者的区别是考试易考点：|=关心的是「在所有模型中α是否为真」（语义/模型论），⊢关心的是「能不能从KB用规则推出来」（语法/证明论）。C方向反了。D太强了——KB |= α只要求「在所有使KB为真的世界中α为真」，不要求α在所有可能世界（包括KB为假的世界）中为真。",
    type: "single"
  },
  {
    id: "q-s6-13",
    moduleId: "s6",
    question: "使用归结原理（Resolution）证明KB |= α时，正确的操作步骤是？",
    options: [
      {
        text: "直接将KB中的子句两两归结，直到不能再归结，若未推出空子句则α不成立",
        isCorrect: false
      },
      {
        text: "将α的否定¬α加入KB → 将KB ∪ {¬α}转化为CNF（合取范式）→ 反复应用归结规则 → 若推导出空子句□，则证明成功",
        isCorrect: true
      },
      {
        text: "先将KB转为CNF → 从中删除α → 检查剩余子句是否可满足",
        isCorrect: false
      },
      {
        text: "将α本身加入KB → 转CNF → 反复归结，直到推导出α自身",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！归结是反证法（refutation）：1) 假设目标为假，将¬α加入KB；2) 将KB ∪ {¬α}转为CNF（每个子句是文字的析取，整体是子句的合取）；3) 反复对互补文字（如P和¬P）进行归结，产生新子句；4) 若最终推导出空子句□（即同时推出P和¬P→矛盾），说明¬α与KB冲突→α必然为真。记忆链：反证→加¬α→转CNF→归结→出□→得证。",
    feedbackWrong: "不对。关键在于归结是反证法——必须加入目标的否定（¬α），而不是α本身（D的错误）。A缺少了加入¬α这一步——单纯归结KB只能判断KB自身是否包含矛盾，无法证明KB蕴涵α。C的操作（删除α）不是归结的标准步骤。一步总结：归结证明=把」KB且非α「搞出矛盾。",
    type: "single"
  },

  // ============================================================
  // s7 - 贝叶斯网络（新增1道：v-structure条件独立）
  // ============================================================
  {
    id: "q-s7-14",
    moduleId: "s7",
    question: "在贝叶斯网络结构 X → Z ← Y（v-structure / collider / 对撞结构）中，关于X和Y的关系，以下哪个说法正确？",
    options: [
      {
        text: "在任何情况下，X和Y都相互独立",
        isCorrect: false
      },
      {
        text: "在不知道Z的任何信息时（Z未被观测），X和Y相互独立；一旦给定Z（或Z的任何后代），X和Y变得相关",
        isCorrect: true
      },
      {
        text: "在给定Z时，X和Y条件独立；不给定Z时，X和Y相关",
        isCorrect: false
      },
      {
        text: "X和Y在任何情况下都相关，不存在独立性",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！v-structure（X → Z ← Y）的独立性特征与其他两种结构相反。在chain（X→Z→Y）和common cause（X←Z→Y）中，给定中间节点Z会阻塞路径，使得两端条件独立。但在v-structure中：Z是两个独立原因的共同「结果」——如果不知道Z，两个独立原因之间没有关联（你咳嗽和我感冒无关）；但一旦知道Z（比如知道「教室里有人晕倒了」），X和Y（两个可能的原因：天太热/他没吃早饭）就变得相关——知道天不热就提高了「没吃早饭「的可能性。这就是explaining away效应。记忆：v-structure像漏斗——两个独立来源汇到一点，给定汇合点后来源之间反而产生信息关联。",
    feedbackWrong: "不对。v-structure的独立性规则是D-separation中的经典易错点。C描述的是chain和common cause的行为——适用于X→Z→Y和X←Z→Y，不适用于v-structure。A和D都太绝对。考试记忆法：v-structure中，「给定结果，原因之间就产生关联」（如已知地湿了→下雨和洒水车变得相关），而「不给定结果时，两个独立原因互不相关」。",
    type: "single"
  },

  // ============================================================
  // s8 - HMM（新增2道：Forward vs Viterbi + HMM五要素）
  // ============================================================
  {
    id: "q-s8-16",
    moduleId: "s8",
    question: "HMM的三个基本问题中，前向算法（Forward Algorithm）和维特比算法（Viterbi Algorithm）分别解决什么问题？",
    options: [
      {
        text: "Forward求最可能的隐藏状态序列，Viterbi求观测序列的概率P(E₁:ₜ)",
        isCorrect: false
      },
      {
        text: "Forward求观测序列的概率P(E₁:ₜ)（评估问题），Viterbi求最可能的隐藏状态序列（解码问题）",
        isCorrect: true
      },
      {
        text: "两者都求观测序列的概率，Forward是精确算法，Viterbi是近似算法",
        isCorrect: false
      },
      {
        text: "Forward用于滤波（Filtering），Viterbi用于预测（Prediction）",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！HMM三个基本问题及对应算法：1) 评估问题（Evaluation/Likelihood）：给定模型λ和观测序列E₁:ₜ，求P(E₁:ₜ|λ)——用Forward算法（或Backward算法）；2) 解码问题（Decoding）：给定模型λ和观测序列E₁:ₜ，求最可能的隐藏状态序列——用Viterbi算法；3) 学习问题（Learning）：给定观测序列，估计模型参数λ=(A,B,π)——用Baum-Welch算法（EM）。Forward求和（把所有可能路径的概率加起来），Viterbi求最大值（找概率最大的那条路径）。",
    feedbackWrong: "不对。A把Forward和Viterbi的职责搞反了——Forward算概率（评估），Viterbi找序列（解码）。C错误——两者解决的问题不同，不是精确vs近似的关系。D描述了滤波和预测的区分，但这不是Forward和Viterbi的区别——滤波和预测都可以用Forward算法实现（滤波=Forward+更新，预测=只Forward不更新）。考试记忆：Forward=「算总账」（所有路径概率求和），Viterbi=「找最佳路径」（最大化）。",
    type: "single"
  },
  {
    id: "q-s8-17",
    moduleId: "s8",
    question: "一个完整的HMM由五个要素定义。以下哪个**不属于**HMM的五要素？",
    options: [
      {
        text: "隐藏状态集合S（如{晴天, 雨天}）和观测集合V（如{带伞, 没带伞}）",
        isCorrect: false
      },
      {
        text: "状态转移概率矩阵A（如P(今天雨|昨天晴)=0.2）和发射概率矩阵B（如P(带伞|雨天)=0.9）",
        isCorrect: false
      },
      {
        text: "初始状态分布π（如P(第1天是晴天)=0.6）",
        isCorrect: false
      },
      {
        text: "奖励函数R(s)（如在状态s下的即时奖励值）",
        isCorrect: true
      }
    ],
    feedbackCorrect: "正确！HMM五要素：(S, V, A, B, π)。S=隐藏状态集合（不可直接观测），V=观测值集合（可直接观测），A=状态转移概率矩阵（P(Xₜ|Xₜ₋₁)），B=发射概率矩阵（也叫观测概率，P(Eₜ|Xₜ)），π=初始状态分布（P(X₁)）。奖励函数R是MDP的要素，不是HMM的。HMM和MDP的本质区别：HMM中状态是隐藏的、没有动作和奖励——模型只描述「世界怎么变「和「怎么观测世界」；MDP则包含动作（Agent可以干预）和奖励（衡量好坏），用来做决策。",
    feedbackWrong: "不对。奖励函数R是MDP（马尔可夫决策过程）和强化学习的核心要素，而不是HMM（隐马尔可夫模型）的组成部分。HMM没有动作和奖励——它只建模「隐藏状态如何转移「和「从状态如何产生观测」。HMM五要素记忆：S(状态)、V(观测)、A(转移)、B(发射)、π(初始)——五个字母刚好对应用来完整定义一个HMM所需的所有参数。",
    type: "single"
  }
];