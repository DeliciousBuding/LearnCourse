import type { ModuleContent } from "@learncourse/framework/types";

const content: ModuleContent = {
  "meta": {
    "id": "s2",
    "number": 2,
    "title": "搜索算法",
    "icon": "Search",
    "courseware": "02 搜索.pptx",
    "examRefs": "2025 期中二, 2025 期末一(3)"
  },
  "calloutText": "这章解决什么问题？在可能性空间里高效找到目标——从盲目搜索到有信息搜索，掌握 frontier 和启发式函数是关键。",
  "sections": [
    {
      "id": "s2-s1",
      "title": "2.1 先理解直觉",
      "content": [
        {
          "type": "prose",
          "html": "<p>你在迷宫里，怎么找到出口？你可能会说「每个岔路口都试试」。但试完之后发现走不通，你退回来再试另一条路——<strong>这就是搜索</strong>。AI 面对的问题通常不是「直接算出来的」，而是「在可能性空间里找出来的」。</p>"
        },
        {
          "type": "prose",
          "html": "<p>比如你想从长沙开车去北京。BFS 就是「先扫描所有距离 500 公里的城市，再扫描 1000 公里的」；DFS 就是「一直往北开，开不动了再换条路」。BFS 能找到最短路径，DFS 省内存，但可能一头扎进死胡同。</p>"
        },
        {
          "type": "prose",
          "html": "<p>如果你有地图上每座城市到北京的<strong>直线距离</strong>（启发式信息 (n)$），就可以「朝着北京的方向走」——这就是贪婪搜索。但只看方向不看已经走过的路，可能会绕远。把已走路程 (n)$ 和估计剩余 (n)$ 加起来——这就是 <strong>A* 搜索</strong>。</p>"
        }
      ]
    },
    {
      "id": "s2-s2",
      "title": "2.2 核心概念",
      "content": [
        {
          "type": "table",
          "headers": [
            "符号",
            "含义",
            "一句话",
            "谁用"
          ],
          "rows": [
            [
              "(n)$",
              "真实代价 / 已花代价",
              "从起点走到 n 已经花了多少",
              "UCS、A*"
            ],
            [
              "(n)$",
              "启发式代价 / 估计代价",
              "从 n 到目标还要花多少",
              "贪婪、A*"
            ],
            [
              "(n)$",
              "综合代价",
              " = g + h$（已花 + 预计还要的）",
              "A*"
            ]
          ]
        },
        {
          "type": "table",
          "headers": [
            "算法",
            "挑谁",
            "完备？",
            "最优？",
            "时间复杂度",
            "空间复杂度"
          ],
          "rows": [
            [
              "BFS",
              "最浅的",
              "✅",
              "仅等代价",
              "(b^d)$",
              "(b^d)$"
            ],
            [
              "DFS",
              "最深的",
              "❌（可能无限深）",
              "❌",
              "(b^m)$",
              "(bm)$"
            ],
            [
              "UCS",
              "(n)$ 最小的",
              "✅（有限正代价）",
              "✅",
              "(b^{1+C^*/\\epsilon})$",
              "(b^{1+C^*/\\epsilon})$"
            ],
            [
              "贪婪",
              "(n)$ 最小的",
              "❌",
              "❌",
              "(b^m)$",
              "(b^m)$"
            ],
            [
              "A*",
              "(n)=g(n)+h(n)$ 最小的",
              "✅（有限图）",
              "✅（$ 可容许）",
              "指数",
              "指数"
            ]
          ]
        },
        {
          "type": "callout",
          "variant": "danger",
          "text": "A* 保证最优解的充要条件：(n)$ 是可容许的——即 (n)$ 永远不会高估从 n 到目标的真实代价。=0$ 恒可容许（退化为 UCS），=$ 直线距离也恒可容许。"
        },
        {
          "type": "prose",
          "html": "<p>(n)$ 是一个确定的数——你已经走过的路，里程表上写的数字。(n)$ 是一个估计数——你猜还要多远，可能不准。(n)$ 把两者加起来，是「总成本的最佳估计」。</p>"
        }
      ]
    },
    {
      "id": "s2-s3",
      "title": "2.3 动手试试——UCS、贪婪、A* 逐步推演",
      "content": [
        {
          "type": "mermaid",
          "id": "search-tree-2025-final",
          "chart": "graph TD\n    A[\"A<br/>g=0 h=100 f=100\"] -->|\"80\"| B[\"B<br/>g=80 h=30 f=110\"]\n    A -->|\"25\"| C[\"C<br/>g=25 h=55 f=80\"]\n    B -->|\"5\"| D[\"D<br/>g=85 h=35 f=120\"]\n    B -->|\"10\"| E[\"E<br/>g=90 h=20 f=110\"]\n    C -->|\"5\"| F[\"F<br/>g=30 h=80 f=110\"]\n    C -->|\"45\"| G[\"G<br/>g=70 h=0 f=70 ✅目标\"]"
        },
        {
          "type": "callout",
          "variant": "info",
          "text": "看懂这张图：A 是起点，G 是终点。边上数字是实际代价。节点旁标注 g（累计代价）、h（估计到 G 还要多少）、f（g+h）。考试时只给 g 和 h，f 需要你自己加。"
        },
        {
          "type": "table",
          "headers": [
            "步骤",
            "frontier（按相应规则排序）",
            "挑谁？"
          ],
          "rows": [
            [
              "UCS-开局",
              "A(g=0)",
              "唯一选项，扩展 A"
            ],
            [
              "UCS-A后",
              "B(g=80), C(g=25)",
              "g=25 最小 → 扩展 C"
            ],
            [
              "UCS-C后",
              "B(g=80), F(g=30), G(g=70)",
              "g=30 最小 → 扩展 F"
            ],
            [
              "UCS-F后",
              "B(g=80), G(g=70)",
              "g=70 最小 → 扩展 G ✓"
            ],
            [
              "A*-开局",
              "A(f=100)",
              "扩展 A"
            ],
            [
              "A*-A后",
              "B(f=110), C(f=80)",
              "f=80 最小 → C"
            ],
            [
              "A*-C后",
              "B(110), F(110), G(70)",
              "f=70 最小 → G ✓"
            ]
          ]
        },
        {
          "type": "prose",
          "html": "<p>UCS 访问顺序：<strong>A → C → F → G</strong>（四次）。A* 访问顺序：<strong>A → C → G</strong>（三次，精准命中）。虽然 A→B 边代价 80 看起来大，但 UCS 仍把 B 留在 frontier 里存着——UCS 的诚实之处就在于从不跳过更便宜的路径。</p>"
        }
      ]
    },
    {
      "id": "s2-s4",
      "title": "2.4 考试怎么考",
      "content": [
        {
          "type": "card",
          "title": "搜索大题（20 分）答题模板",
          "body": "<p><strong>五步法</strong>：① 画 frontier 表 → ② 写出每轮 frontier 中所有节点的评价值（g/h/f）→ ③ 标出选中的节点 → ④ 展开它，加入子节点 → ⑤ 碰到目标就停。千万别跳步，老师就是看你每一步 frontier 怎么变的。</p>"
        },
        {
          "type": "callout",
          "variant": "warning",
          "text": "常见错误：把 f 写成只有 h（忘记加 g）、frontier 排序不完整只写最小的一个、IDS 每次都从头开始（应该每层都是新的 DFS）、A* 不用 f 而只用 h。"
        }
      ]
    },
    {
      "id": "s2-s5",
      "title": "真题演练",
      "content": [
        {
          "type": "examQuestions",
          "ids": [
            "eq-s2-3"
          ]
        }
      ]
    },
    {
      "id": "s2-s6",
      "title": "小测验",
      "content": [
        {
          "type": "quiz",
          "ids": [
            "q-s2-3",
            "q-s2-4"
          ]
        }
      ]
    }
  ]
};

export default content;
