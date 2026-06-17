import type { Quiz } from '@learncourse/framework/types';

export const S7_QUIZZES: Quiz[] = [
  {
    id: "q-s7-14",
    moduleId: "s7",
    question: "在贝叶斯公式 $P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}$ 中，$P(E|H)$ 的术语名称是什么？",
    options: [
      {
        text: "A. 先验概率（Prior）",
        isCorrect: false
      },
      {
        text: "B. 似然（Likelihood）",
        isCorrect: true
      },
      {
        text: "C. 后验概率（Posterior）",
        isCorrect: false
      },
      {
        text: "D. 边缘概率/证据（Marginal Likelihood / Evidence）",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！$P(E|H)$ 是「似然」（Likelihood）——在假设 H 成立的条件下观察到证据 E 的概率。贝叶斯公式四个量的术语必须区分清楚：$P(H)$ = 先验（没看到证据前的信念），$P(E|H)$ = 似然（H 解释 E 的能力），$P(E)$ = 边缘似然/证据（所有假设下观察到 E 的总概率），$P(H|E)$ = 后验（看到证据后更新的信念）。考试中「写出贝叶斯公式并标注各术语名称」是常考题型。",
    feedbackWrong: "不对。$P(E|H)$ 是似然（Likelihood），回答「假设 H 为真时，证据 E 出现的概率有多大」。A 选项 $P(H)$ 才是先验；C 选项 $P(H|E)$ 是后验；D 选项 $P(E)$ 是边缘似然/证据。四者经常在术语配对题中混在一起考，必须死记：$P(H)$ = Prior，$P(E|H)$ = Likelihood，$P(E)$ = Evidence，$P(H|E)$ = Posterior。"
  },
  {
    id: "q-s7-15",
    moduleId: "s7",
    question: "贝叶斯网络中，一个节点有 $k$ 个二值（True/False）父节点。该节点的 CPT（条件概率表）需要多少行？",
    options: [
      {
        text: "A. $k$ 行",
        isCorrect: false
      },
      {
        text: "B. $2k$ 行",
        isCorrect: false
      },
      {
        text: "C. $2^k$ 行",
        isCorrect: true
      },
      {
        text: "D. $k^2$ 行",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！每个父节点有 2 种取值，$k$ 个父节点的取值组合数为 $2 \\times 2 \\times \\cdots \\times 2 = 2^k$。CPT 的每一行对应父节点的一种取值组合，给出该组合下子节点各取值的条件概率。例如洒水器网络中的 WetGrass 节点有 2 个父节点（Sprinkler 和 Rain），CPT 需要 $2^2 = 4$ 行。这是考试中的常见挖坑点——很多人以为 CPT 行数等于父节点个数 $k$，但实际上 CPT 的大小随父节点数指数增长，这也是贝叶斯网络在大规模应用中的主要瓶颈之一。",
    feedbackWrong: "不对。CPT 行数 = $2^k$（$k$ 个二值父节点的取值组合数），不是 $k$ 也不是 $2k$。记忆方法：每个父节点像一个二进制位，$k$ 个二进制位可以表示 $2^k$ 种组合。A（$k$ 行）是最常见的错误——把「父节点个数」当成了「CPT 行数」，实际上 CPT 要对父节点的每种取值组合各写一行。洒水器网络中 WetGrass 有 2 个父节点 → $2^2 = 4$ 行，就是最好的例子。"
  },
  {
    id: "q-s7-16",
    moduleId: "s7",
    question: "已知贝叶斯网络结构为 $A \\rightarrow B \\rightarrow C$（链式结构 / serial connection）。以下关于条件独立的说法正确的是？",
    options: [
      {
        text: "A. 给定 A 后，B 和 C 条件独立",
        isCorrect: false
      },
      {
        text: "B. 给定 B 后，A 和 C 条件独立",
        isCorrect: true
      },
      {
        text: "C. A 和 C 在任何情况下都相互独立",
        isCorrect: false
      },
      {
        text: "D. 给定 C 后，A 和 B 条件独立",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！链式结构 $A \\rightarrow B \\rightarrow C$ 中，B 是中间节点。D-separation 规则：给定中间节点 B 后，路径被「阻塞」，A 和 C 条件独立。直观理解：A 影响 B，B 影响 C。一旦知道了 B 的取值，A 的值不会提供关于 C 的额外信息——信息传递在 B 处被截断。例如：教育程度(A) → 职业(B) → 收入(C)。知道了某人的职业后，其教育程度不再提供关于收入的额外信息。",
    feedbackWrong: "不对。链式结构中，关键规则是：给定中间节点后两端独立。A 选项错误——给定 A（父节点），B 和 C 之间仍有直接边 B→C，信息仍然流通。C 选项错误——不给任何证据时，A 的信息可以沿 A→B→C 传递到 C，因此 A 和 C 是相关的。D 选项错误——给定子孙节点 C 不会阻塞 A→B 的直接边。区分三种 D-separation 结构的方法：串行(A→B→C)→给中间就堵；分叉(A←B→C)→给中间就堵；汇聚(A→B←C)→给中间反而通！"
  },
  {
    id: "q-s7-17",
    moduleId: "s7",
    question: "在贝叶斯网络中，$X \\rightarrow Z \\leftarrow Y$ 构成 v-structure（对撞结构 / collider）。关于 X 和 Y 的关系，以下哪个说法正确？",
    options: [
      {
        text: "A. X 和 Y 始终相互独立，不论是否观察 Z",
        isCorrect: false
      },
      {
        text: "B. 未观察 Z 时 X 和 Y 边缘独立；观察 Z 后 X 和 Y 变得条件相关",
        isCorrect: true
      },
      {
        text: "C. 观察 Z 后 X 和 Y 变得条件独立",
        isCorrect: false
      },
      {
        text: "D. X 和 Y 始终相关，不论是否观察 Z",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！v-structure 是 D-separation 中最特殊的一种：两个独立的原因 X 和 Y 共同导致结果 Z。在不知道 Z 的情况下，X 和 Y 相互独立（两个独立原因自然不相关）。但一旦观察到 Z（或 Z 的任何子孙），X 和 Y 变得条件相关——这就是「explaining away」效应。经典例子：地震(X)和 burglary(Y)都可能导致警报响(Z)。平时地震和 burglary 无关。但如果警报响了，你发现地震了，就会降低 burglary 的概率（地震「解释掉了」警报，burglary 就不太可能是原因了）。v-structure 与其他结构的规则恰好相反——给定中间节点后路径反而激活！",
    feedbackWrong: "不对。v-structure 的规则与直觉相反：不观察 Z 时 X 和 Y 独立（信息不通），观察 Z 后反而激活了它们之间的依赖关系。A 忽略了「观察 Z 后激活」这一特性。C 恰好说反了——观察 Z 后是激活而非阻塞。D 忽略了「不观察 Z 时独立」这一特性。考试高频考点：v-structure 与其他两种 D-separation 结构（串行、分叉）的核心区别——串行和分叉是「给中间就堵」，而 v-structure 是「给中间反而通」。这也是 explaining away 现象的图结构基础。"
  },
  {
    id: "q-s7-18",
    moduleId: "s7",
    question: "某罕见病在人群中的先验概率 $P(D) = 0.1\\%$。经检测阳性后，后验概率 $P(D|+) \\approx 4.7\\%$。以下对该结果的解读最准确的是？",
    options: [
      {
        text: "A. 检测毫无价值，因为后验概率仍然低于 50%，无法确诊",
        isCorrect: false
      },
      {
        text: "B. 后验概率是先验概率的约 47 倍，说明检测提供了大量信息；但疾病仍然不太可能，因为基础率极低",
        isCorrect: true
      },
      {
        text: "C. 先验概率和后验概率相差仅约 4.6 个百分点，检测的区分能力很弱",
        isCorrect: false
      },
      {
        text: "D. 后验概率 4.7% 意味着患者有 95.3% 的概率健康，因此无需做任何进一步检查",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！这道题考察对「先验 vs 后验」以及「基础率」的深层理解。关键洞察：(1) 相对增益：$4.7\\% / 0.1\\% = 47$ 倍——检测将概率提升了近 50 倍，提供了大量信息；(2) 绝对水平：4.7% 仍然很低——因为疾病本身极其罕见（0.1%），即使 47 倍提升后，绝对概率仍然不大。这完美体现了贝叶斯推理的精髓：后验 = 先验 + 证据，两者都需要考虑。A 错误——不能因为后验低于 50% 就否定检测价值（检测大幅缩小了不确定性）。C 错误——不应只看绝对差值而忽略相对增益。D 错误——临床决策不只看概率，还看漏诊代价（罕见病可能是致命的，漏诊后果严重）。",
    feedbackWrong: "不对。正确答案是 B。核心要点是区分「相对增益」和「绝对水平」：后验 ÷ 先验 = 47 倍（检测很有用，提供了大量信息）；但绝对概率 4.7% 仍然很低（疾病太罕见，即使大幅更新后仍不常见）。A 错在把 50% 当作评判检测价值的唯一标准——实际上任何将概率从 0.1% 推到 4.7% 的证据都有价值。C 错在只看绝对差值而忽略相对变化——从 0.1% 到 4.7% 的相对变化是巨大的。D 错在混淆「概率低」和「不需要行动」——临床决策还取决于漏诊代价。这也是「基础率谬误」的延伸思考。"
  }
];

export const S7_SIM_QUESTIONS: ExamQuestion[] = [
  {
    id: "sim-s7-1",
    moduleId: "s7",
    year: "模拟题",
    position: "自编",
    points: 10,
    questionText: "<p><strong>题目：重复检测与贝叶斯更新</strong></p><p>某疾病在人群中的先验发病率为 0.5%（$P(D)=0.005$）。一种检测方法的灵敏度为 98%（$P(+|D)=0.98$），特异度为 97%（$P(-|\\neg D)=0.97$，即假阳性率为 3%）。</p><p>(1)（4分）王先生做了一次检测，结果为阳性。请用贝叶斯公式计算他真正患病的后验概率 $P(D|+)$。</p><p>(2)（4分）王先生不放心，又做了一次同样的检测（假设两次检测在给定疾病状态下条件独立），结果仍为阳性。以第一次的后验概率作为新的先验，计算第二次阳性后的后验概率。</p><p>(3)（2分）对比两次计算结果，解释为什么第二次阳性大幅提升了确信度。这与基础率谬误有何关系？</p>",
    answerHtml: "<p><strong>(1) 第一次阳性后的后验概率（4分）</strong></p>\n<p><strong>Step 1 — 写贝叶斯公式：</strong>$P(D|+) = \\frac{P(+|D) \\cdot P(D)}{P(+)}$</p>\n<p><strong>Step 2 — 计算全概率分母 $P(+)$：</strong></p>\n<p>$P(+) = P(+|D)P(D) + P(+|\\neg D)P(\\neg D) = 0.98 \\times 0.005 + 0.03 \\times 0.995$</p>\n<p>$= 0.0049 + 0.02985 = 0.03475$</p>\n<p><strong>Step 3 — 代入贝叶斯公式：</strong></p>\n<p>$P(D|+) = \\frac{0.98 \\times 0.005}{0.03475} = \\frac{0.0049}{0.03475} \\approx 0.1410 \\approx \\mathbf{14.1\\%}$</p>\n<p>虽然检测很准（灵敏度 98%），但阳性结果只意味着约 14% 的患病概率——因为疾病极其罕见，假阳性人数（3% × 99.5% 健康人）远多于真阳性人数。</p>\n<p><strong>(2) 第二次阳性后的后验概率（4分）</strong></p>\n<p>以 $P(D|+_1) = 0.141$ 作为新先验：$P'(D) = 0.141$，$P'(\\neg D) = 0.859$</p>\n<p>$P'(+) = 0.98 \\times 0.141 + 0.03 \\times 0.859 = 0.13818 + 0.02577 = 0.16395$</p>\n<p>$P'(D|+) = \\frac{0.98 \\times 0.141}{0.16395} = \\frac{0.13818}{0.16395} \\approx \\mathbf{0.843} = \\mathbf{84.3\\%}$</p>\n<p><strong>(3) 分析与解释（2分）</strong></p>\n<p>第一次阳性：后验 14.1%，先验仅 0.5% → 概率提升了约 28 倍，但绝对水平仍不高。这是基础率谬误的体现：罕见病普筛时大多数阳性是假阳性。</p>\n<p>第二次阳性：后验跃升至 84.3%。因为第一次阳性「过滤」了大部分健康人——第一次后验意味着一百个阳性者中约 14 人真有病；以此为起点，第二次阳性将概率推到约 84%。两次独立阳性相互印证，极大降低了「两次都是假阳性」的可能性（$0.03 \\times 0.03 = 0.0009$）。</p>\n<p><strong>核心启示：</strong>贝叶斯更新是序贯的——每条新证据都在已有信念的基础上更新，而非从零开始。这正是贝叶斯推理区别于频率学派的核心特征。</p>"
  },
  {
    id: "sim-s7-2",
    moduleId: "s7",
    year: "模拟题",
    position: "自编",
    points: 12,
    questionText: "<p><strong>题目：学生能力贝叶斯网络推断</strong></p><p>考虑以下贝叶斯网络，用于建模学生成绩：</p><pre>Difficulty(D) ──→ Grade(G) ←── Intelligence(I)\n                              │\n                              └──→ SAT(S)</pre><p>各变量均为二值：D = {high, low}，I = {high, low}，G = {good, bad}，S = {high, low}。</p><p><strong>CPT 如下：</strong></p><table><tbody><tr><th>P(D=high)</th><td>0.3</td></tr><tr><th>P(I=high)</th><td>0.2</td></tr></tbody></table><table><tbody><tr><th>D</th><th>I</th><th>P(G=good | D, I)</th></tr><tr><td>high</td><td>high</td><td>0.9</td></tr><tr><td>high</td><td>low</td><td>0.5</td></tr><tr><td>low</td><td>high</td><td>0.7</td></tr><tr><td>low</td><td>low</td><td>0.1</td></tr></tbody></table><table><tbody><tr><th>I</th><th>P(S=high | I)</th></tr><tr><td>high</td><td>0.8</td></tr><tr><td>low</td><td>0.1</td></tr></tbody></table><p>求 $P(I = high \\mid G = good)$，即已知学生成绩为好，该学生具有高智力的概率。</p>",
    answerHtml: "<p><strong>Step 1 — 写出联合分解（2分）：</strong></p>\n<p>根据网络拓扑，联合概率分解为：</p>\n<p>$P(D, I, G, S) = P(D) \\cdot P(I) \\cdot P(G \\mid D, I) \\cdot P(S \\mid I)$</p>\n<p><strong>Step 2 — 确定查询涉及的变量（1分）：</strong></p>\n<p>$P(I = high \\mid G = good) = \\frac{P(I = high, G = good)}{P(G = good)}$</p>\n<p>SAT 不在查询中 → 边缘化消去 S（$\\sum_S P(S \\mid I) = 1$，可直接消去）。难度 D 不在查询中也需边缘化。</p>\n<p><strong>Step 3 — 计算分子 $P(I = high, G = good)$（3分）：</strong></p>\n<p>固定 I=high，对 D 求和：</p>\n<table><tbody><tr><th>D</th><th>P(D)</th><th>P(I=high)</th><th>P(G=good|D, I=high)</th><th>乘积</th></tr><tr><td>high</td><td>0.3</td><td>0.2</td><td>0.9</td><td>0.054</td></tr><tr><td>low</td><td>0.7</td><td>0.2</td><td>0.7</td><td>0.098</td></tr></tbody></table>\n<p>$P(I = high, G = good) = 0.054 + 0.098 = \\mathbf{0.152}$</p>\n<p><strong>Step 4 — 计算分母 $P(G = good)$（4分）：</strong></p>\n<p>对所有 D, I 组合求和（4 种组合）：</p>\n<table><tbody><tr><th>D</th><th>I</th><th>P(D)</th><th>P(I)</th><th>P(G=good|D,I)</th><th>乘积</th></tr><tr><td>high</td><td>high</td><td>0.3</td><td>0.2</td><td>0.9</td><td>0.054</td></tr><tr><td>high</td><td>low</td><td>0.3</td><td>0.8</td><td>0.5</td><td>0.120</td></tr><tr><td>low</td><td>high</td><td>0.7</td><td>0.2</td><td>0.7</td><td>0.098</td></tr><tr><td>low</td><td>low</td><td>0.7</td><td>0.8</td><td>0.1</td><td>0.056</td></tr></tbody></table>\n<p>$P(G = good) = 0.054 + 0.120 + 0.098 + 0.056 = \\mathbf{0.328}$</p>\n<p><strong>Step 5 — 计算最终后验（1分）：</strong></p>\n<p>$P(I = high \\mid G = good) = \\frac{0.152}{0.328} \\approx \\mathbf{0.4634} \\approx \\mathbf{46.3\\%}$</p>\n<p><strong>Step 6 — 解读（1分）：</strong></p>\n<p>先验 $P(I=high) = 20\\%$，看到好成绩后更新为约 46.3%——提升了超过一倍，但仍有超过一半的概率智力不高。因为低智力学生在简单考试（D=low）中也有 70% 概率得好成绩，这部分解释了为什么好成绩不完全等于高智力。这体现了贝叶斯网络区分「相关」和「因果」的能力。</p>\n<p><strong>评分标准：</strong>联合分解 2 分 + 分子计算 3 分 + 分母边缘化 4 分 + 最终结果 1 分 + 解读 2 分（含指出 D 和 I 通过 G 的 v-structure 关系）= 12 分。</p>"
  },
  {
    id: "sim-s7-3",
    moduleId: "s7",
    year: "模拟题",
    position: "自编",
    points: 10,
    questionText: "<p><strong>题目：D-Separation 条件独立判断</strong></p><p>考虑以下贝叶斯网络（有向边表示直接影响）：</p><pre>阴天(C) ──→ 洒水(S)\n  │\n  └──→ 下雨(R) ──→ 交通堵塞(T) ←── 球赛(G)</pre><p>即：$C \\rightarrow S$，$C \\rightarrow R$，$R \\rightarrow T$，$G \\rightarrow T$。T 是一个 v-structure 节点（R 和 G 汇聚到 T）。</p><p>判断以下各对变量在给定条件下是否 d-分离（即条件独立）。每小问需说明判断理由（引用的规则和路径分析）。</p><p>(a)（2分）$S \\perp\\!\\!\\!\\perp R \\mid C$？即给定阴天，洒水和下雨是否条件独立？</p><p>(b)（2分）$S \\perp\\!\\!\\!\\perp T \\mid \\emptyset$？即不给定任何证据，洒水和交通堵塞是否边缘独立？</p><p>(c)（2分）$S \\perp\\!\\!\\!\\perp T \\mid C, R$？即同时给定阴天和下雨，洒水和交通堵塞是否条件独立？</p><p>(d)（2分）$R \\perp\\!\\!\\!\\perp G \\mid \\emptyset$？即不给定任何证据，下雨和球赛是否边缘独立？</p><p>(e)（2分）$R \\perp\\!\\!\\!\\perp G \\mid T$？即给定交通堵塞，下雨和球赛是否条件独立？</p>",
    answerHtml: "<p><strong>(a) $S \\perp\\!\\!\\!\\perp R \\mid C$？YES — 条件独立（2分）</strong></p>\n<p>路径分析：S 和 R 之间只有一条路径 $S \\leftarrow C \\rightarrow R$（分叉结构 / common cause）。C 是这条路径上的分叉节点。D-separation 规则：给定分叉节点（common cause）后，路径被阻塞。因此给定 C 后，S 和 R 条件独立。</p>\n<p>直观理解：阴天是洒水和下雨的共同原因。一旦知道是不是阴天，洒水状态不会告诉我们任何关于下雨的额外信息，反之亦然。</p>\n<p><strong>(b) $S \\perp\\!\\!\\!\\perp T \\mid \\emptyset$？NO — 不独立（2分）</strong></p>\n<p>路径分析：S 到 T 的唯一路径为 $S \\leftarrow C \\rightarrow R \\rightarrow T$。该路径上有三个节点：C（分叉节点，未观察 → 不阻塞）、R（串行节点，未观察 → 不阻塞）。整条路径上没有节点被观察，因此路径是活跃的（active），S 和 T 是 d-连接的。</p>\n<p>直观理解：S 的信息可以反向传递到 C（洒水状态暗示阴天概率），C 影响 R（阴天影响下雨），R 又影响 T（下雨影响交通）。虽然 S 不直接导致 T，但通过 C 和 R 间接关联。</p>\n<p><strong>(c) $S \\perp\\!\\!\\!\\perp T \\mid C, R$？YES — 条件独立（2分）</strong></p>\n<p>同一条路径 $S \\leftarrow C \\rightarrow R \\rightarrow T$。给定 C（分叉节点被观察）→ C 处阻塞。同时给定 R（串行节点被观察）→ R 处也阻塞。整条路径在两个位置被阻塞，S 和 T 条件独立。实际上只需要 C 或 R 任意一个被观察就足以阻塞该路径，两个都给定更确定。</p>\n<p>直观理解：知道阴天+下雨后，洒水与交通堵塞之间再无信息通路。</p>\n<p><strong>(d) $R \\perp\\!\\!\\!\\perp G \\mid \\emptyset$？YES — 边缘独立（2分）</strong></p>\n<p>路径分析：R 和 G 之间只有一条路径 $R \\rightarrow T \\leftarrow G$（v-structure / 对撞结构）。T 是碰撞节点（collider）。D-separation 规则：v-structure 中，若碰撞节点及其任何子孙均未被观察，路径被阻塞。此处未观察 T，因此路径阻塞，R 和 G 边缘独立。</p>\n<p>直观理解：下雨和球赛是两个完全不相关的原因——一个来自天气，一个来自人类安排。在没有交通堵塞信息时，两者毫无关联。这是 v-structure 与其他结构的最大区别。</p>\n<p><strong>(e) $R \\perp\\!\\!\\!\\perp G \\mid T$？NO — 不独立，反而变得相关！（2分）</strong></p>\n<p>同一条路径 $R \\rightarrow T \\leftarrow G$。现在 T 被观察（碰撞节点被给定）。D-separation 规则：v-structure 中，给定碰撞节点或其子孙后，路径被激活。因此 R 和 G 在给定 T 后变得 d-连接（条件相关）。</p>\n<p>直观理解（explaining away）：交通堵塞了(T=true)。如果你得知「下雨了」(R=true)，下雨本身可以解释交通堵塞，于是你会降低球赛导致堵塞的概率——「下雨解释掉了堵塞」。反过来，如果你得知「有大型球赛」(G=true)，你就会觉得下雨不太可能是堵塞的原因。这就是 explaining away 效应：两个独立原因在观察到共同效果后变得竞争性相关。</p>\n<p><strong>总结 — D-separation 三大结构速记：</strong></p>\n<table><tbody><tr><th>结构</th><th>图模式</th><th>给中间节点？</th><th>结果</th></tr><tr><td>串行 (serial)</td><td>$A \\rightarrow B \\rightarrow C$</td><td>给 B</td><td>路径阻塞 ✓</td></tr><tr><td>分叉 (diverging)</td><td>$A \\leftarrow B \\rightarrow C$</td><td>给 B</td><td>路径阻塞 ✓</td></tr><tr><td>汇聚 (v-structure)</td><td>$A \\rightarrow B \\leftarrow C$</td><td>给 B</td><td>路径激活！✗</td></tr></tbody></table><p><strong>评分标准：</strong>每小问 2 分（正确判断 1 分 + 路径分析与规则引用 1 分）= 10 分。</p>"
  }
];