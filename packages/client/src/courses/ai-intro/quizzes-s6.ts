import type { Quiz } from '@learncourse/framework/types';

export const S6_QUIZZES: Quiz[] = [
  {
    id: "q-s6-14",
    moduleId: "s6",
    question: "将公式 (P ∨ Q) → R 转换为合取范式（CNF），正确的结果是？",
    options: [
      {
        text: "(¬P ∨ R) ∧ (¬Q ∨ R)",
        isCorrect: true
      },
      {
        text: "¬P ∧ (¬Q ∨ R)",
        isCorrect: false
      },
      {
        text: "¬P ∨ ¬Q ∨ R",
        isCorrect: false
      },
      {
        text: "(P ∨ Q) ∧ ¬R",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！(P∨Q)→R = ¬(P∨Q)∨R = (¬P∧¬Q)∨R = (¬P∨R)∧(¬Q∨R)。关键在第三步分配律（∨ 对 ∧ 分配）——这是 CNF 转换中最容易漏的一步。很多同学做到 (¬P∧¬Q)∨R 就停了，但这时还不是 CNF：CNF 要求整个公式是子句的合取，每个子句是文字的析取。∧ 在 ∨ 的外面才算 CNF。",
    feedbackWrong: "不对。正确结果是 (¬P∨R)∧(¬Q∨R)。易错点分析：选 B 的同学做了 De Morgan 后 (¬P∧¬Q)∨R 就停了，忘记用分配律把 ∨ 推进去——此时 ∧ 还在 ∨ 里面，不是 CNF。选 C 的同学把 De Morgan 后的 ∧ 误写成了 ∨。选 D 的同学方向完全反了——那是把 → 的否定当成合取。CNF 三步走：消 →、¬ 内推（De Morgan）、分配律——缺一不可。",
    type: "single"
  },
  {
    id: "q-s6-15",
    moduleId: "s6",
    question: "令论域为所有人，Loves(x,y) 表示「x 爱 y」。∀x ∃y Loves(x,y) 与 ∃y ∀x Loves(x,y) 的含义分别是？",
    options: [
      {
        text: "∀x ∃y 表示「存在一个人被所有人爱」；∃y ∀x 表示「每个人都有一个爱的人」",
        isCorrect: false
      },
      {
        text: "∀x ∃y 表示「每个人都有一个爱的人（可以各不相同）」；∃y ∀x 表示「存在一个人被所有人爱」",
        isCorrect: true
      },
      {
        text: "两者语义完全相同，只是书写方式不同",
        isCorrect: false
      },
      {
        text: "∀x ∃y 表示「所有人爱所有人」；∃y ∀x 表示「有人爱所有人」",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！量词顺序改变语义——这是 FOL 的核心考点。∀x ∃y：对每个 x，都能找到某个 y（取决于 x），所以每个人爱的人可以不同——张三爱李四，王五爱赵六。∃y ∀x：存在同一个 y，被所有 x 爱——有一个「万人迷」。直观记忆：从左往右读——谁先出现谁就「独立」于后出现的量词。∀ 在前 → y 可以依赖 x；∃ 在前 → 同一个 y 为所有 x 服务。",
    feedbackWrong: "不对。∀x ∃y：从左边开始读——对每一个 x，都存在一个 y。y 的选择可以依赖于 x，所以不同的人可以爱不同的人。∃y ∀x：先固定一个 y，然后对所有 x 成立——必须存在同一个 y 被所有人爱。A 把两者含义搞反了。C 是严重错误——顺序改变语义完全不同（类比：「每个人有一本书」vs「有一本书被所有人拥有」）。D 中「所有人爱所有人」是 ∀x ∀y Loves(x,y)，不是 ∀x ∃y。",
    type: "single"
  },
  {
    id: "q-s6-16",
    moduleId: "s6",
    question: "在将 FOL 公式转为 CNF 以进行归结时，需要对存在量词进行 Skolem 化。以下关于 Skolem 化的说法，哪个是正确的？",
    options: [
      {
        text: "∀x ∃y Knows(x, y) 的 Skolem 化结果为 ∀x Knows(x, C)，其中 C 是一个 Skolem 常量",
        isCorrect: false
      },
      {
        text: "∀x ∃y Knows(x, y) 的 Skolem 化结果为 ∀x Knows(x, f(x))，其中 f 是一个 Skolem 函数",
        isCorrect: true
      },
      {
        text: "∃x ∀y Knows(x, y) 的 Skolem 化结果为 ∀y Knows(f(y), y)，其中 f 是一个 Skolem 函数",
        isCorrect: false
      },
      {
        text: "Skolem 化不改变原公式的逻辑语义（即两者逻辑等价）",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！∀x ∃y：∃y 在 ∀x 的辖域内 → y 的取值依赖于 x → 需要 Skolem 函数 f(x)。判断法则：存在量词在全称量词的「里面」→ 用函数（因为存在的东西依赖于全称变量）；存在量词在全称量词的「外面」或没有外围全称量词 → 用常量。所以 ∀x ∃y → f(x)，而 ∃x ∀y → 常量 C（因为 ∃x 在最外层，不依赖任何全称变量）。",
    feedbackWrong: "不对。B 正确——∃y 在 ∀x 的辖域内，y 依赖于 x，必须用 Skolem 函数 f(x)。A 错在用了常量：如果用常量 C，意思变成「所有人认识同一个人 C」——改变了原公式「每人认识的人可以不同」的含义。C 错在方向反了——∃x ∀y 中 ∃x 在外层（不依赖任何量词），应该用 Skolem 常量而非函数。D 错在「语义等价」——Skolem 化只保可满足性（satisfiability），不保逻辑等价。原公式 ∃x P(x) 与 Skolem 化后的 P(C) 不等价（C 是新增符号），但两者同可满足。",
    type: "single"
  },
  {
    id: "q-s6-17",
    moduleId: "s6",
    question: "在 Wumpus 世界中，智能体在 [1,1] 未感知到任何微风（Breeze）或恶臭（Stench）。已知知识库包含 B_11 ↔ (P_12 ∨ P_21) 和 S_11 ↔ (W_12 ∨ W_21)，且已知 ¬P_11 和 ¬W_11。以下哪个推理结论是正确的？",
    options: [
      {
        text: "无法推断 [1,2] 或 [2,1] 是否安全——因为「没有感知到」不等于「不存在」",
        isCorrect: false
      },
      {
        text: "[1,2] 和 [2,1] 均无陷阱也无 Wumpus——即两个相邻格子都是安全的",
        isCorrect: true
      },
      {
        text: "[1,2] 和 [2,1] 中必有一个存在陷阱——因为微风和陷阱的对应关系",
        isCorrect: false
      },
      {
        text: "只有在智能体亲自进入 [1,2] 后才能知道那里是否有陷阱",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！这是 Wumpus 世界推理中「无感知也是信息」的经典案例。B_11 ↔ (P_12 ∨ P_21) 是一个双向蕴涵（当且仅当），利用 ↔-消去得到 (B_11 → P_12 ∨ P_21) ∧ ((P_12 ∨ P_21) → B_11)。从第二个方向用 Modus Tollens：¬B_11 → ¬(P_12 ∨ P_21) = ¬P_12 ∧ ¬P_21。同理从 S_11 ↔ 推出 ¬W_12 ∧ ¬W_21。所以 [1,2] 和 [2,1] 都安全。关键洞见：在 Wumpus 世界的定义中，「没有微风」蕴涵「所有邻居都没有陷阱」——这是因为知识库用 ↔（当且仅当）定义，使感知到的 absence 成为推理 evidence of absence 的合法依据。",
    feedbackWrong: "不对。A 的直觉在一般生活中可能成立（「没看到不等于不存在」），但在 Wumpus 世界的逻辑框架中不成立——因为知识库用的是 ↔（当且仅当），而不是 →（单向蕴涵）。如果是 B_11 ← (P_12 ∨ P_21)（有陷阱必有微风），那确实不能从「没风」推出「没陷阱」。但 ↔ 是双向的，¬B_11 通过 Modus Tollens 可以严格推出 ¬(P_12 ∨ P_21)。C 方向反了——无微风恰恰说明没有陷阱。D 是经验主义错误——逻辑推理可以提前得出结论，不需要亲自去看。",
    type: "single"
  },
  {
    id: "q-s6-18",
    moduleId: "s6",
    question: "关于归结原理（Resolution）的可靠性（Soundness）和完备性（Completeness），以下哪个说法是正确的？",
    options: [
      {
        text: "归结在命题逻辑中可靠且完备，但在一阶逻辑（FOL）中不完备——因为 FOL 是不可判定的",
        isCorrect: false
      },
      {
        text: "归结既是可靠的（Sound）又是反驳完备的（Refutation-Complete）：对命题逻辑和 FOL 均成立——如果 KB |= α，归结必能从 KB ∪ {¬α} 推出空子句 □",
        isCorrect: true
      },
      {
        text: "归结是完备的但不可靠——有时推出口而实际上 KB ∪ {¬α} 是可满足的",
        isCorrect: false
      },
      {
        text: "归结在命题逻辑中可靠且完备，在 FOL 中仍然完备但不再可靠——因为 Skolem 化可能引入矛盾",
        isCorrect: false
      }
    ],
    feedbackCorrect: "正确！归结同时满足：(1) Soundness（可靠性）——如果归结从 KB ∪ {¬α} 推出 □，那么一定有 KB |= α。不会「冤枉好人」。(2) Refutation-Completeness（反驳完备性）——如果 KB |= α，那么从 KB ∪ {¬α} 出发，归结一定能推出 □。不会「漏掉真命题」。这两个性质对命题逻辑和一阶逻辑都成立。注意：FOL 确实是「不可判定的」（undecidable）——如果 KB 不蕴涵 α，归结可能永远运行而不终止。但这不等于「不完备」——完备性说的是「如果蕴涵，一定能找到证明」；不可判定性说的是「如果不蕴涵，不一定能知道」。两者不矛盾。",
    feedbackWrong: "不对。A 混淆了「不可判定性」和「不完备性」——FOL 不可判定（如果 KB 不蕴涵 α，归结可能不停），但 FOL 的归结仍然是反驳完备的（如果 KB 蕴涵 α，归结一定能找到证明）。C 的方向反了——归结是可靠的，不会推出错误的 □。D 也不对——Skolem 化保可满足性，不会引入矛盾而导致不可靠。记忆口诀：归结 = 可靠（不冤枉）+ 完备（不遗漏），命题 FOL 都成立。不可判定 ≠ 不完备。",
    type: "single"
  }
];