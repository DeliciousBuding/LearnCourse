import type { ModuleContent } from "learncourse/types";

const meta = {"id":"s10","number":10,"title":"强化学习","icon":"RefreshCw","courseware":"课程补充","examRefs":"概念题为主"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？一个智能体在环境里通过\"试错\"来学习——做对了给奖励，做错了给惩罚。就像训练狗做动作：坐下就给零食，乱跑就啥也没有。",
  sections: [
  {
    "id": "s10-s2",
    "title": "10.1 先理解直觉",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>训练狗的类比：</strong></p>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li>你想让狗学会\"坐下\"。狗狗尝试各种动作——趴下、转圈、坐下。</li>\n<li>一旦它坐下，你立刻给一块零食（<strong>奖励信号</strong>）。</li>\n<li>下次它就更可能坐下。如果趴下没零食，它就减少趴下。</li>\n<li>这就是<strong>试错学习（trial-and-error）</strong>——强化学习的核心思想。</li>\n</ul>"
      },
      {
        "type": "prose",
        "html": "<p>关键区别：强化学习不像监督学习那样有人告诉你\"这个动作对不对\"——你只能从环境给的<strong>奖励分数</strong>里自己判断。而且奖励常常是<strong>延迟的</strong>：你下了 50 步棋才赢，每一步本身没有奖励，但整条路径最终导致胜利。</p>"
      }
    ]
  },
  {
    "id": "s10-s3",
    "title": "10.2 核心概念",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>强化学习的 5 个特点（2023 期末简答 9 分，直接考这 5 条）</strong></p>"
      },
      {
        "type": "prose",
        "html": "<ol>\n<li><strong>试错学习</strong>：智能体通过不断尝试和接收环境反馈来学习</li>\n<li><strong>奖励信号</strong>：环境给出数值奖励，智能体的目标是最大化累计奖励</li>\n<li><strong>延迟奖励</strong>：当前动作可能不影响即时奖励，但影响未来长期回报</li>\n<li><strong>探索与利用平衡</strong>：是选已知能赚钱的动作（利用），还是试试看有没有更赚钱的（探索）？</li>\n<li><strong>序贯决策</strong>：当前决策影响未来状态和未来奖励，前后关联</li>\n</ol>"
      },
      {
        "type": "prose",
        "html": "<p><strong>MDP（马尔可夫决策过程）—— 强化学习的数学框架</strong></p>"
      },
      {
        "type": "prose",
        "html": "<p>MDP 就是用一个标准的\"五元组\"来描述一个强化学习问题。就像用经纬度定位一个地点一样，MDP 给你一套标准语言。</p>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "要素",
            "符号",
            "含义",
            "2×2 网格例子"
          ],
          [
            "状态集合",
            "S",
            "所有可能的状态",
            "S = {s1, s2, s3, s4, s_d}（s1 初始，s4 目标，s_d 越界损坏）"
          ],
          [
            "动作集合",
            "A",
            "所有可执行的动作",
            "A = {上, 右}（只能向上或向右走）"
          ],
          [
            "状态转移概率",
            "P(s'|s,a)",
            "在状态 s 做动作 a，会到 s' 的概率",
            "在 s1 执行\"上\"：100% 到达 s2"
          ],
          [
            "奖励函数",
            "R(s,a,s')",
            "到达某个状态获得多少分",
            "到 s4 = +1，到 s_d = -1，其他 = 0"
          ],
          [
            "折扣因子",
            "γ",
            "未来奖励的打折率（0~1）",
            "γ = 0.99"
          ]
        ]
      },
      {
        "type": "callout",
        "variant": "tip",
        "text": "考试必考：给你一段问题描述，让你写出 MDP 五元组。别只背名字——要学会从文字里提取：状态有哪些？动作有哪些？奖励怎么给？2025 期末就是这么考的。"
      }
    ]
  },
  {
    "id": "s10-s4",
    "title": "10.3 动手试试 —— 如何从文字描述定义 MDP",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>题目：</strong>一个机器人在 2×2 网格中。初始在左上角（s1），目标右下角（s4）。机器人只能向上或向右移动。如果走出网格边界，到达损坏状态 s_d 并受罚 -1。到达 s4 获得奖励 +1。其他移动奖励为 0。</p>"
      },
      {
        "type": "prose",
        "html": "<p><strong>逐项提取：</strong></p>"
      },
      {
        "type": "code",
        "language": "",
        "code": "状态 S = {s1, s2, s3, s4, s_d}\n  — s1(0,0), s2(0,1), s3(1,0), s4(1,1) 四格 + s_d 越界\n\n动作 A = {↑上, →右}\n  — 题目说\"只能向上或向右\"\n\n转移 P：\n  P(s2 | s1, 上) = 1.0    从 s1 向上到 s2\n  P(s3 | s1, 右) = 1.0    从 s1 向右到 s3\n  P(s_d | s1, 左) = 1.0   向左就出界 → s_d\n  P(s_d | s1, 下) = 1.0   向下也出界 → s_d\n  以此类推...\n\n奖励 R：\n  R(s1→↑→s2) = 0    中间步无奖励\n  R(s2→→→s4) = +1   到达目的地！\n  R(s1→←→s_d) = -1   越界惩罚\n  R(s3→→→s_d) = -1   （从 s3 向右也出界）\n\n折扣因子 $\\gamma$ = 0.99"
      },
      {
        "type": "callout",
        "variant": "warning",
        "text": "重点：MDP 不是\"写一个策略\"——它是描述问题本身。策略是\"该怎么做\"，MDP 是\"问题是什么样子\"。考试中先明确定义 MDP，再讨论怎么找最优策略。"
      },
      {
        "type": "prose",
        "html": "<p><strong>折扣因子 $\\gamma$ —— 为什么要打折？</strong></p>"
      },
      {
        "type": "prose",
        "html": "<p>两个直观理由：</p>"
      },
      {
        "type": "prose",
        "html": "<ol>\n<li><strong>今天 100 块比明天 100 块值钱</strong>——你可以今天投资赚利息。同样，现在拿奖励比以后拿奖励好。</li>\n<li><strong>未来不确定</strong>——说好 3 步后给你 +1，但谁知道中间会不会出意外？越远的奖励越\"虚\"。</li>\n</ol>"
      },
      {
        "type": "prose",
        "html": "<p>γ 越接近 0：只看眼前，极度短视。<br>γ 越接近 1：长远考虑，几乎不打折。</p>"
      }
    ]
  },
  {
    "id": "s10-s5",
    "title": "10.4 动手试试 —— 折扣回报计算",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>折扣回报公式：</strong></p>"
      },
      {
        "type": "code",
        "language": "",
        "code": "G = R₁ + γ·R₂ + γ²·R₃ + γ³·R₄ + ..."
      },
      {
        "type": "prose",
        "html": "<p><strong>例题：γ = 0.99，比较两条路径的总回报</strong></p>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "步骤",
            "序列 A：先拿分",
            "序列 B：后拿分"
          ],
          [
            "第 1 步奖励 R₁",
            "1",
            "0"
          ],
          [
            "第 2 步奖励 R₂",
            "1",
            "0"
          ],
          [
            "第 3 步奖励 R₃",
            "0",
            "1"
          ],
          [
            "第 4 步奖励 R₄",
            "0",
            "1"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<p><strong>序列 A：(1, 1, 0, 0) —— 尽早拿分</strong></p>"
      },
      {
        "type": "code",
        "language": "",
        "code": "Gₐ = 1 + 0.99×1 + 0.99²×0 + 0.99³×0\n   = 1 + 0.99 + 0 + 0\n   = 1.99"
      },
      {
        "type": "prose",
        "html": "<p><strong>序列 B：(0, 0, 1, 1) —— 延迟拿分</strong></p>"
      },
      {
        "type": "code",
        "language": "",
        "code": "G_b = 0 + 0.99×0 + 0.99²×1 + 0.99³×1\n    = 0 + 0 + 0.9801 + 0.9703\n    = 1.9504"
      },
      {
        "type": "prose",
        "html": "<p><strong>结论：</strong>1.99 &gt; 1.9504，序列 A 回报更高！<strong>同样的分数，越早拿到越值钱</strong>——这就是折扣因子的直观含义。</p>"
      }
    ]
  },
  {
    "id": "s10-s6",
    "title": "10.5 考试怎么考",
    "content": [
      {
        "type": "prose",
        "html": "<h4>考试题型与分值</h4>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "题型",
            "分值",
            "考察点"
          ],
          [
            "MDP 五元组定义",
            "5-8 分（简答/大题）",
            "给场景描述，写出 S、A、P、R、γ 五个要素"
          ],
          [
            "折扣回报计算",
            "5-8 分（计算题）",
            "给奖励序列和 γ，算累计折扣回报 $G_t$"
          ],
          [
            "强化学习特点和定义",
            "3-5 分（简答）",
            "5 个特点：试错学习、奖励信号、延迟奖励、探索利用、序贯决策"
          ],
          [
            "探索 vs 利用",
            "2-4 分（概念题）",
            "解释含义，举例说明为什么需要平衡"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<h4>得分点</h4>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li>MDP 五元组：<strong>五个要素一个都不能少</strong>，每个要写对符号和具体内容。状态用集合、转移用概率表达式</li>\n<li>折扣回报公式 $G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$ 写对，指数别写错（第 k 步的系数是 $\\gamma^{k-1}$）</li>\n<li>RL 五个特点：简答时每条写一句解释加一个例子，不要只列关键词</li>\n<li>探索 vs 利用：能解释\"全是利用会错过更优策略，全是探索永远赚不到分\"</li>\n</ul>"
      },
      {
        "type": "prose",
        "html": "<h4>常见错误</h4>"
      },
      {
        "type": "callout",
        "variant": "danger",
        "text": "MDP 五元组漏写折扣因子 γ — 很多人写到奖励函数就停了，忘了 γ 也是五元组之一。五个要素：S, A, P, R, γ，缺一不可。"
      },
      {
        "type": "callout",
        "variant": "danger",
        "text": "折扣回报公式指数写反：$R_3$ 的系数是 $\\gamma^2$ 不是 $\\gamma^3$。因为 $G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3}$，指数从 0 开始。"
      },
      {
        "type": "callout",
        "variant": "danger",
        "text": "把策略 (policy) 和 MDP 混淆 — MDP 描述\"问题是什么\"，策略描述\"怎么做\"。考试让写 MDP 时不要写策略内容。"
      },
      {
        "type": "prose",
        "html": "<h4>答题模板</h4>"
      },
      {
        "type": "card",
        "title": "MDP 五元组 答题格式",
        "body": "<div class=\"card\">\n\n<p><strong>$S$（状态集合）：</strong>$S = \\{s_1, s_2, \\ldots\\}$，列出所有可能状态。如果是网格题，用坐标表示：$S = \\{(1,1), (1,2), \\ldots\\}$</p>\n<p><strong>$A$（动作集合）：</strong>$A = \\{\\text{上}, \\text{下}, \\text{左}, \\text{右}\\}$（或题目指定的动作）</p>\n<p><strong>$P(s'|s,a)$（转移概率）：</strong>从每个状态-动作对出发，列出到达各状态的概率。确定性环境写 1.0，随机环境写概率值</p>\n<p><strong>$R(s,a,s')$（奖励函数）：</strong>目标状态 +1、陷阱 -1、其他 0 等</p>\n<p><strong>$\\gamma$（折扣因子）：</strong>$\\gamma = 0.99$（或题目给定值）</p>\n</div>"
      },
      {
        "type": "card",
        "title": "折扣回报 答题格式",
        "body": "<div class=\"card\">\n\n<p><strong>公式：</strong>$G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\gamma^3 R_{t+4} + \\cdots$</p>\n<p><strong>代入：</strong>把每一帧的奖励和 γ 代入，逐项写出</p>\n<p><strong>计算：</strong>每项保留 3-4 位小数，最后四舍五入</p>\n<p><strong>结论：</strong>如果有多个序列，比较 G 值大小并解释原因</p>\n</div>"
      }
    ]
  },
  {
    "id": "s10-s7",
    "title": "10.6 真题演练",
    "content": [
      {
        "type": "examQuestions",
        "ids": ["eq-s10-27", "eq-s10-28"]
      }
    ]
  },
  {
    "id": "s10-s8",
    "title": "10.7 小测验",
    "content": [
      {
        "type": "quiz",
        "ids": ["q-s10-23", "q-s10-24"]
      }
    ]
  }
],
};

export default content;
