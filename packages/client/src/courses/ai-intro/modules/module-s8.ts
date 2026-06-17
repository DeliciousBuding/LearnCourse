import type { ModuleContent } from "learncourse/types";

const meta = {"id":"s8","number":8,"title":"时间上的概率推理 (HMM)","icon":"Timeline","courseware":"12 时间上的概率推理.pptx","examRefs":"2025 期末计算题"};

const content: ModuleContent = {
  meta,
  calloutText: "🎯 这章解决什么问题？你只能看到表面现象，但真实状态隐藏在后面。HMM 让你从\"看得见的序列\"反推\"看不见的状态序列\"。",
  sections: [
  {
    "id": "s8-s2",
    "title": "8.1 先理解直觉",
    "content": [
      {
        "type": "prose",
        "html": "<p>你的朋友被困在没有窗户的房间，每天只能看地板干湿来猜外面天气——他看不到天，只能看到\"地板湿了\"这个证据。</p>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li><strong>隐藏状态：</strong>晴、雨（看不到的真相）</li>\n<li><strong>观测：</strong>地板干、地板湿（能看到的线索）</li>\n<li><strong>转移：</strong>今天晴→明天继续晴的概率？变为雨的概率？</li>\n<li><strong>传感：</strong>晴天时地板湿的概率（可能有人撒水）；雨天时地板湿的概率</li>\n</ul>"
      }
    ]
  },
  {
    "id": "s8-s3",
    "title": "8.2 核心概念",
    "content": [
      {
        "type": "prose",
        "html": "<div class=\"grid-2\">\n<div>\n<h4>马尔可夫假设</h4>\n<p><strong>当前状态只依赖于上一个状态。</strong></p>\n<p>$P(X_t | X_1, \\ldots, X_{t-1}) = P(X_t | X_{t-1})$</p>\n<p>就像天气：明天什么天气主要看今天，和上周三关系不大。</p>\n</div>\n<div>\n<h4>观测独立假设</h4>\n<p><strong>当前观测只依赖于当前状态。</strong></p>\n<p>$P(E_t | X_{1:t}, E_{1:t-1}) = P(E_t | X_t)$</p>\n<p>地板今天湿不湿只取决于今天下雨没，和昨天无关。</p>\n</div>\n</div>"
      },
      {
        "type": "prose",
        "html": "<h4>HMM 三个组成部分</h4>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "组件",
            "符号",
            "含义",
            "天气例子"
          ],
          [
            "初始分布",
            "π = P(X₁)",
            "第1天天气的概率（还没任何观测）",
            "P(晴)=0.6, P(雨)=0.4"
          ],
          [
            "转移模型",
            "A = P(Xt|Xt-1)",
            "状态之间怎么跳转",
            "晴→晴 0.7, 晴→雨 0.3; 雨→晴 0.4, 雨→雨 0.6"
          ],
          [
            "传感模型",
            "B = P(Et|Xt)",
            "每个状态下各种观测的概率",
            "晴天：干 0.9, 湿 0.1; 雨天：干 0.2, 湿 0.8"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<h4>转移矩阵 &amp; 发射矩阵示例</h4>"
      },
      {
        "type": "prose",
        "html": "<div class=\"grid-2\">\n<div>\n<table>\n<tbody><tr><th></th><th>→明天晴</th><th>→明天雨</th></tr>\n<tr><td><strong>今天晴</strong></td><td>0.7</td><td>0.3</td></tr>\n<tr><td><strong>今天雨</strong></td><td>0.4</td><td>0.6</td></tr>\n</tbody></table>\n<p style=\"font-size:var(--text-xs);color:var(--color-text-secondary)\">每行之和 = 1.0</p>\n</div>\n<div>\n<table>\n<tbody><tr><th></th><th>观测干</th><th>观测湿</th></tr>\n<tr><td><strong>晴</strong></td><td>0.9</td><td>0.1</td></tr>\n<tr><td><strong>雨</strong></td><td>0.2</td><td>0.8</td></tr>\n</tbody></table>\n</div>\n</div>"
      }
    ]
  },
  {
    "id": "s8-s4",
    "title": "8.3 动手试试：滤波计算",
    "content": [
      {
        "type": "card",
        "title": "已知先验 P(晴)=0.5，观测序列：干→湿。求 P(X₂=雨 | 干, 湿)",
        "body": "<div class=\"card\">\n\n\n<p><strong>第1天更新（加入 E₁=干）：</strong></p>\n<pre>P(X₁=晴|干) ∝ P(干|晴)×P(晴) = 0.9×0.5 = 0.45\nP(X₁=雨|干) ∝ P(干|雨)×P(雨) = 0.2×0.5 = 0.10\n归一化：P(晴|干)=0.818, P(雨|干)=0.182</pre>\n\n<p><strong>第2天预测（转移向前推）：</strong></p>\n<pre>P(X₂=雨|干) = 0.3×0.818 + 0.6×0.182 = 0.3546\nP(X₂=晴|干) = 0.7×0.818 + 0.4×0.182 = 0.6454</pre>\n\n<p><strong>第2天更新（加入 E₂=湿）：</strong></p>\n<div class=\"code-block\">P(X₂=雨|干,湿) ∝ P(湿|雨)×0.3546 = 0.8×0.3546 = 0.28368\nP(X₂=晴|干,湿) ∝ P(湿|晴)×0.6454 = 0.1×0.6454 = 0.06454\n归一化：P(X₂=雨|干,湿) = 0.28368/0.34822 ≈ <strong>0.815</strong></div>\n\n<div class=\"callout callout--tip\">\n<strong>滤波节奏：</strong>预测（转移矩阵向前推）→ 更新（新观测校正）。每轮：昨天后验 → 今天先验（预测）→ 今天后验（更新）。这就是贝叶斯滤波的在线递推。\n</div>\n</div>"
      }
    ]
  },
  {
    "id": "s8-s5",
    "title": "8.4 考试怎么考",
    "content": [
      {
        "type": "prose",
        "html": "<h4>题型与分值分布</h4>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "题型",
            "分值",
            "典型考法",
            "难度"
          ],
          [
            "选择题/填空",
            "2-4 分",
            "HMM 三个组件的名称和符号；马尔可夫假设的表述",
            "低"
          ],
          [
            "简答题",
            "5-8 分",
            "\"HMM 的两个核心假设是什么？各用公式写出\"；\"滤波和平滑的区别\"",
            "中"
          ],
          [
            "计算题",
            "8-12 分",
            "给定转移矩阵、发射矩阵、先验和观测序列，手算一步或两步滤波（预测+更新）",
            "中-高"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<h4>得分点</h4><ul><li><strong>两个假设：</strong>能写出马尔可夫假设 $P(X_t \\\\mid X_{1:t-1}) = P(X_t \\\\mid X_{t-1})$ 和观测独立假设 $P(E_t \\\\mid X_{1:t}, E_{1:t-1}) = P(E_t \\\\mid X_t)$</li><li><strong>滤波计算步骤：</strong>预测（用转移矩阵）→ 更新（用新观测加权）→ 归一化。三步缺一不可</li><li><strong>转移矩阵约束：</strong>每行之和 = 1</li><li><strong>三个任务区分：</strong>滤波 $P(X_t \\\\mid e_{1:t})$、预测 $P(X_{t+k} \\\\mid e_{1:t})$、平滑 $P(X_k \\\\mid e_{1:t})$ 其中 $k < t$</li></ul>"
      },
      {
        "type": "prose",
        "html": "<h4>常见错误</h4><ul><li><strong>只预测不更新：</strong>算完转移后直接把预测值当最终答案——忘了还要用观测 $E_t$ 校正（乘以 $P(E_t | X_t)$ 再归一化）</li><li><strong>忘记归一化：</strong>滤波每一步最后都要归一化使概率之和=1</li><li><strong>转移矩阵方向搞反：</strong>$P(X_t | X_{t-1})$ 是从 t-1 到 t，写成矩阵时行是\"从\"（t-1），列是\"到\"（t）</li><li><strong>HMM 与贝叶斯网络混淆：</strong>HMM 是一种特殊的动态贝叶斯网络（有马尔可夫性质），但 HMM 的变量随时间展开，不是静态图</li></ul>"
      },
      {
        "type": "prose",
        "html": "<h4>答题模板 —— HMM 滤波计算题</h4>"
      },
      {
        "type": "code",
        "language": "",
        "code": "步骤1: 写已知 → π(初始分布), A(转移矩阵), B(发射矩阵), 观测序列 e1, e2, ...\n步骤2: t=1 更新 → P(X1|e1) ∝ P(e1|X1) × P(X1)，然后归一化\n步骤3: t=2 预测 → P(X2|e1) = ∑_{x1} P(X2|x1) × P(x1|e1)\n步骤4: t=2 更新 → P(X2|e1,e2) ∝ P(e2|X2) × P(X2|e1)，然后归一化\n步骤5: 重复预测→更新循环直到最后一个观测\n\n⚠ 每步归一化：除以上一步算出的所有权重之和\n⚠ 预测是对上一时间步的后验加权求和（不是对先验）"
      }
    ]
  },
  {
    "id": "s8-s6",
    "title": "8.5 真题演练",
    "content": [
      {
        "type": "examQuestions",
        "ids": ["eq-s8-17", "eq-s8-18"]
      }
    ]
  },
  {
    "id": "s8-s7",
    "title": "8.6 小测验",
    "content": [
      {
        "type": "quiz",
        "ids": ["q-s8-14", "q-s8-15"]
      }
    ]
  }
],
};

export default content;
