import type { ModuleContent } from "learncourse/types";

const meta = {"id":"s11","number":11,"title":"深度学习 & CNN","icon":"Layers","courseware":"14 计算机视觉.pptx","examRefs":"概念题为主"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？计算机怎么\"看\"懂一张照片？——你要告诉它猫长什么样，不能靠规则（\"猫有尖耳朵、胡须、四条腿\"太难写），而是让它自己从几万张猫图里学。CNN（卷积神经网络）就是专门为图像设计的\"眼睛\"。",
  sections: [
  {
    "id": "s11-s2",
    "title": "11.1 先理解直觉",
    "content": [
      {
        "type": "prose",
        "html": "<p>你看一张猫的照片，不会从像素 0 开始逐个检查——你的大脑会自动识别\"这里有毛的纹理\"\"那里有耳朵的形状\"\"那边是眼睛\"。CNN 做的就是类似的事：</p>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li><strong>卷积</strong>就像拿一个小放大镜在图片上滑动，每次只看一小块，找\"有没有边缘？有没有角？有没有某种纹理？\"</li>\n<li><strong>池化</strong>就是把图片缩小——原来需要 100 个神经元处理的东西，缩小后 25 个就够了，而且主要特征还在。</li>\n<li>滑动、检测、缩小——重复几层——最后全连接层做分类：\"这整张图是猫，概率 92%\"。你没法用 if-else 写出\"猫\"的规则，CNN 自己从数据里学到了。</li>\n</ul>"
      }
    ]
  },
  {
    "id": "s11-s3",
    "title": "11.2 核心概念",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>感知器 —— 神经网络的最小单元</strong></p>"
      },
      {
        "type": "prose",
        "html": "<p>一个感知器就像一个投票机：每个输入乘以权重，加总后过一道\"门槛\"（激活函数），输出最终决定。</p>"
      },
      {
        "type": "mermaid",
        "id": "m-3h4ny2",
        "chart": "flowchart LR\n    X1[\"x1\"] -->|\"x w1\"| SUM[\"加权求和\"]\n    X2[\"x2\"] -->|\"x w2\"| SUM\n    X3[\"x3\"] -->|\"x w3\"| SUM\n    B[\"偏置 b\"] --> SUM\n    SUM -->|\"加权和\"| F[\"激活函数 f\"]\n    F -->|\"输出\"| Y[\"y\"]"
      },
      {
        "type": "prose",
        "html": "<p style=\"text-align:center\">$$y = f(w_1 x_1 + w_2 x_2 + w_3 x_3 + b)$$</p>"
      },
      {
        "type": "prose",
        "html": "<p><strong>具体例子：判断今天要不要出门</strong></p>"
      },
      {
        "type": "code",
        "language": "",
        "code": "输入 x₁ = 1（今天下雨），权重 w₁ = —3（下雨很减分）\n输入 x₂ = 1（有重要约会），权重 w₂ = +5（约会很加分）\n偏置 b = —1\n\n加权和 = (—3)×1 + 5×1 + (—1) = 1\n激活函数（阶跃）：1 > 0 → 输出 1 → \"出门！\"\n                                  → 输出 0 → \"不出门\""
      },
      {
        "type": "prose",
        "html": "<p><strong>为什么需要激活函数（非线性）？</strong></p>"
      },
      {
        "type": "prose",
        "html": "<p>直觉：XOR 问题。如果只用线性（没有激活函数），你画一条直线永远分不开 XOR 的两类点。加了非线性激活函数（如 ReLU、Sigmoid），网络就能\"弯折\"决策边界，像用橡皮泥捏出复杂形状。</p>"
      },
      {
        "type": "callout",
        "variant": "tip",
        "text": "一句话记住：没有激活函数，100 层线性层等价于 1 层——没有非线性，深度网络就废了。"
      },
      {
        "type": "prose",
        "html": "<p><strong>CNN 的核心操作</strong></p>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "操作",
            "作用",
            "生活类比"
          ],
          [
            "卷积",
            "用小窗口（卷积核）滑过图片，提取局部特征",
            "拿放大镜检查图片每一小块有没有边缘"
          ],
          [
            "池化",
            "缩小特征图，降维 + 保留主要信息",
            "把 4K 照片压成 1080p——主要内容还在"
          ],
          [
            "全连接",
            "把所有特征组合起来做分类",
            "看了耳朵、眼睛、胡须 → 综合判断是猫"
          ],
          [
            "Softmax",
            "把输出变成概率（所有概率加起来 = 1）",
            "\"70% 是猫，20% 是狗，10% 是兔子\""
          ]
        ]
      }
    ]
  },
  {
    "id": "s11-s4",
    "title": "11.3 动手试试 —— 卷积计算逐步推演",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>这是 2023 期末的考点！必须会逐元素算卷积。</strong></p>"
      },
      {
        "type": "prose",
        "html": "<p><strong>给定：4×4 输入矩阵，2×2 卷积核，步长 = 1</strong></p>"
      },
      {
        "type": "prose",
        "html": "<div class=\"grid-2\">\n<div>\n<table>\n<tbody><tr><th colspan=\"4\">输入矩阵 4×4</th></tr>\n<tr><td>1</td><td>2</td><td>3</td><td>0</td></tr>\n<tr><td>0</td><td>1</td><td>2</td><td>3</td></tr>\n<tr><td>3</td><td>0</td><td>1</td><td>2</td></tr>\n<tr><td>2</td><td>3</td><td>0</td><td>1</td></tr>\n</tbody></table>\n</div>\n<div>\n<table>\n<tbody><tr><th colspan=\"2\">卷积核 2×2</th></tr>\n<tr><td>1</td><td>0</td></tr>\n<tr><td>0</td><td>-1</td></tr>\n</tbody></table>\n</div>\n</div>"
      },
      {
        "type": "prose",
        "html": "<p><strong>卷积过程：卷积核在输入上滑动，每次做\"对应位置相乘再求和\"。</strong></p>"
      },
      {
        "type": "details",
        "summary": "位置 (0,0)：卷积核覆盖左上角 2×2",
        "body": "<d\betails>\n\n<div class=\"d\betails-body\">\n<table>\n<tbody><tr><th>覆盖区域</th><th>逐元素乘积</th></tr>\n<tr>\n<td><table><tbody><tr><td>1</td><td>2</td></tr><tr><td>0</td><td>1</td></tr></tbody></table></td>\n<td><table><tbody><tr><td>1×1</td><td>2×0</td></tr><tr><td>0×0</td><td>1×(-1)</td></tr></tbody></table></td>\n</tr>\n</tbody></table>\n<p>求和 = 1×1 + 2×0 + 0×0 + 1×(-1) = 1 + 0 + 0 - 1 = <strong>0</strong> → 输出矩阵 [0,0] = 0</p>\n</div>\n</d\betails>"
      },
      {
        "type": "details",
        "summary": "位置 (0,1)：卷积核右移一步",
        "body": "<d\betails>\n\n<div class=\"d\betails-body\">\n<table>\n<tbody><tr><th>覆盖区域</th><th>逐元素乘积</th></tr>\n<tr>\n<td><table><tbody><tr><td>2</td><td>3</td></tr><tr><td>1</td><td>2</td></tr></tbody></table></td>\n<td><table><tbody><tr><td>2×1</td><td>3×0</td></tr><tr><td>1×0</td><td>2×(-1)</td></tr></tbody></table></td>\n</tr>\n</tbody></table>\n<p>求和 = 2×1 + 3×0 + 1×0 + 2×(-1) = 2 + 0 + 0 - 2 = <strong>0</strong> → 输出矩阵 [0,1] = 0</p>\n</div>\n</d\betails>"
      },
      {
        "type": "details",
        "summary": "位置 (0,2)：再右移一步",
        "body": "<d\betails>\n\n<div class=\"d\betails-body\">\n<table>\n<tbody><tr><th>覆盖区域</th><th>逐元素乘积</th></tr>\n<tr>\n<td><table><tbody><tr><td>3</td><td>0</td></tr><tr><td>2</td><td>3</td></tr></tbody></table></td>\n<td><table><tbody><tr><td>3×1</td><td>0×0</td></tr><tr><td>2×0</td><td>3×(-1)</td></tr></tbody></table></td>\n</tr>\n</tbody></table>\n<p>求和 = 3×1 + 0×0 + 2×0 + 3×(-1) = 3 + 0 + 0 - 3 = <strong>0</strong> → 输出矩阵 [0,2] = 0</p>\n</div>\n</d\betails>"
      },
      {
        "type": "details",
        "summary": "位置 (1,0)：卷积核下移一步，回到最左",
        "body": "<d\betails>\n\n<div class=\"d\betails-body\">\n<table>\n<tbody><tr><th>覆盖区域</th><th>逐元素乘积</th></tr>\n<tr>\n<td><table><tbody><tr><td>0</td><td>1</td></tr><tr><td>3</td><td>0</td></tr></tbody></table></td>\n<td><table><tbody><tr><td>0×1</td><td>1×0</td></tr><tr><td>3×0</td><td>0×(-1)</td></tr></tbody></table></td>\n</tr>\n</tbody></table>\n<p>求和 = 0×1 + 1×0 + 3×0 + 0×(-1) = <strong>0</strong> → 输出矩阵 [1,0] = 0</p>\n</div>\n</d\betails>"
      },
      {
        "type": "prose",
        "html": "<p><strong>继续算完所有 9 个位置（3×3 输出矩阵）：</strong></p>"
      },
      {
        "type": "code",
        "language": "",
        "code": "位置 (1,1)：覆盖 {1,2 / 0,1} → 1×1 + 2×0 + 0×0 + 1×(—1) = 1—1 = 0\n位置 (1,2)：覆盖 {2,3 / 1,2} → 2×1 + 3×0 + 1×0 + 2×(—1) = 2—2 = 0\n位置 (2,0)：覆盖 {3,0 / 2,3} → 3×1 + 0×0 + 2×0 + 3×(—1) = 3—3 = 0\n位置 (2,1)：覆盖 {0,1 / 3,0} → 0×1 + 1×0 + 3×0 + 0×(—1) = 0\n位置 (2,2)：覆盖 {1,2 / 0,1} → 1×1 + 2×0 + 0×0 + 1×(—1) = 1—1 = 0"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "卷积输出 3×3"
          ],
          [
            "0",
            "0",
            "0"
          ],
          [
            "0",
            "0",
            "0"
          ],
          [
            "0",
            "0",
            "0"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<p style=\"font-size:var(--text-xs);color:var(--color-text-secondary)\">这个特定核是边缘检测器——平坦区域输出 0</p>"
      },
      {
        "type": "callout",
        "variant": "tip",
        "text": "考试技巧：实际考试会给更简单的数字，不用慌。关键是记住：滑动窗口 → 对应位置相乘 → 求和 → 移一位再来。步长 1 时输出尺寸 = (输入尺寸 — 卷积核尺寸) + 1。"
      }
    ]
  },
  {
    "id": "s11-s5",
    "title": "11.4 动手试试 —— 最大池化（Max Pooling）",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>2023 期末真题矩阵：池化窗口 2×2，步长 2</strong></p>"
      },
      {
        "type": "prose",
        "html": "<div class=\"grid-2\">\n<div>\n<table>\n<tbody><tr><th colspan=\"4\">输入特征矩阵 4×4</th></tr>\n<tr><td>1</td><td>3</td><td>2</td><td>1</td></tr>\n<tr><td>2</td><td>9</td><td>1</td><td>1</td></tr>\n<tr><td>1</td><td>4</td><td>2</td><td>3</td></tr>\n<tr><td>5</td><td>6</td><td>1</td><td>2</td></tr>\n</tbody></table>\n</div>\n<div>\n<table>\n<tbody><tr><th colspan=\"2\">最大池化输出 2×2</th></tr>\n<tr><td style=\"background:var(--color-accent-soft);font-weight:700\">9</td><td style=\"background:var(--color-accent-soft);font-weight:700\">2</td></tr>\n<tr><td style=\"background:var(--color-accent-soft);font-weight:700\">6</td><td style=\"background:var(--color-accent-soft);font-weight:700\">3</td></tr>\n</tbody></table>\n<p style=\"font-size:var(--text-xs);color:var(--color-text-secondary);margin-top:var(--space-2)\">\n窗口1: max(1,3,2,9)=<strong>9</strong>&nbsp;&nbsp;|&nbsp;&nbsp;窗口2: max(2,1,1,1)=<strong>2</strong><br>\n窗口3: max(1,4,5,6)=<strong>6</strong>&nbsp;&nbsp;|&nbsp;&nbsp;窗口4: max(2,3,1,2)=<strong>3</strong>\n</p>\n</div>\n</div>"
      },
      {
        "type": "prose",
        "html": "<p><strong>池化输出尺寸公式：</strong></p>"
      },
      {
        "type": "code",
        "language": "",
        "code": "输出 = (输入 — 池化窗口) / 步长 + 1\n     = (4 — 2) / 2 + 1\n     = 2/2 + 1\n     = 1 + 1\n     = 2  → 4×4 变成 2×2，正好！"
      }
    ]
  },
  {
    "id": "s11-s7",
    "title": "11.5 复习策略",
    "content": [
      {
        "type": "prose",
        "html": "<h2 id=\"s-priority\">十四、最终复习优先级</h2>"
      },
      {
        "type": "card",
        "title": "大题 25-40分 第一优先级：必须会做大题",
        "body": "<div class=\"card tier-card tier-1\">\n\n<ol>\n<li>搜索访问顺序：UCS、迭代加深、贪婪、A*</li>\n<li>一阶逻辑翻译与证明</li>\n<li>信息熵、信息增益、决策树</li>\n<li>贝叶斯网络画图、CPT、后验概率</li>\n<li>强化学习 MDP 与折扣回报</li>\n</ol>\n</div>"
      },
      {
        "type": "card",
        "title": "简答 15-25分 第二优先级：必须会标准简答",
        "body": "<div class=\"card tier-card tier-2\">\n\n<ol>\n<li>Agent 定义、组成、类型</li>\n<li>PEAS</li>\n<li>遗传算法定义、选择/交叉/变异、轮盘赌</li>\n<li>模拟退火相比爬山法的改进</li>\n<li>贝叶斯网络定义和组成</li>\n<li>机器学习分类</li>\n<li>强化学习定义和特点</li>\n<li>CNN 中卷积和池化的作用</li>\n</ol>\n</div>"
      },
      {
        "type": "card",
        "title": "概念 10-15分 第三优先级：范围内保底",
        "body": "<div class=\"card tier-card tier-3\">\n\n<ol>\n<li>CSP 建模和回溯优化方法</li>\n<li>Minimax 和 $alpha$-$\b\beta$ 剪枝</li>\n<li>命题逻辑模型检查和归结</li>\n<li>HMM 基本结构</li>\n<li>感知器算法</li>\n<li>线性回归、线性分类</li>\n<li>NLP/LLM/计算机视觉概念题</li>\n</ol>\n</div>"
      },
      {
        "type": "prose",
        "html": "<h2 id=\"s-rounds\">十五、四轮复习顺序</h2>"
      },
      {
        "type": "card",
        "title": "🔵 第 1 轮：建立主线",
        "body": "<div class=\"card\" style=\"border-left:4px solid var(--color-accent)\">\n\n<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\"><strong>目标：</strong>知道每章在解决什么问题，不追求会算。</p>\n<p style=\"font-size:var(--text-sm)\">Agent → 搜索 → 对抗搜索/CSP → 逻辑 → 概率 → 机器学习 → 强化学习 → 深度学习</p>\n<p style=\"font-size:var(--text-xs);color:var(--color-text-secondary)\">⏱ 建议用时：2-3 小时。只看每章的\"先理解直觉\"和 callout，跳过计算。</p>\n</div>"
      },
      {
        "type": "card",
        "title": "🔴 第 2 轮：攻计算题",
        "body": "<div class=\"card\" style=\"border-left:4px solid var(--color-danger)\">\n\n<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\"><strong>目标：</strong>独立完成所有计算类大题。</p>\n<p style=\"font-size:var(--text-sm)\">搜索 frontier 表 → 信息增益 → 贝叶斯后验 → RL 回报 → CNN 卷积池化</p>\n<p style=\"font-size:var(--text-xs);color:var(--color-text-secondary)\">⏱ 建议用时：4-6 小时。每类题至少做 2 遍，换数字还会做才算过关。</p>\n</div>"
      },
      {
        "type": "card",
        "title": "🟡 第 3 轮：攻证明题",
        "body": "<div class=\"card\" style=\"border-left:4px solid var(--color-warning)\">\n\n<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\"><strong>目标：</strong>掌握逻辑证明的固定模板，不靠灵感。</p>\n<p style=\"font-size:var(--text-sm)\">自然语言→FOL 翻译 → CNF 转换 → 归结/自然演绎 → 得证</p>\n<p style=\"font-size:var(--text-xs);color:var(--color-text-secondary)\">⏱ 建议用时：2-3 小时。背熟推理规则速查表，练 3 道真题。</p>\n</div>"
      },
      {
        "type": "card",
        "title": "🟢 第 4 轮：背简答题模板",
        "body": "<div class=\"card\" style=\"border-left:4px solid var(--color-success)\">\n\n<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\"><strong>目标：</strong>简答题不丢分。每个概念准备 4-6 行标准答案。</p>\n<p style=\"font-size:var(--text-sm)\">Agent · 遗传算法 · 模拟退火 · 贝叶斯网络 · ML分类 · 强化学习 · CSP · CNN</p>\n<p style=\"font-size:var(--text-xs);color:var(--color-text-secondary)\">⏱ 建议用时：1-2 小时。对着自检清单逐条过，说不出来的标记重学。</p>\n</div>"
      },
      {
        "type": "prose",
        "html": "<h2 id=\"s-checklist\">十六、考前自检清单</h2>"
      },
      {
        "type": "prose",
        "html": "<p class=\"checklist-counter\">已完成 <strong id=\"checkCount\">0</strong> / 14 项</p>"
      },
      {
        "type": "prose",
        "html": "<ul class=\"checklist\" id=\"checklist\">\n<li data-id=\"1\"><span class=\"check-box\"></span><span class=\"check-label\">给一个机器人任务，写<strong>搜索问题五元组</strong></span></li>\n<li data-id=\"2\"><span class=\"check-box\"></span><span class=\"check-label\">给搜索树，写 <strong>UCS / IDS / 贪婪 / A*</strong> 访问顺序</span></li>\n<li data-id=\"3\"><span class=\"check-box\"></span><span class=\"check-label\">给遗传算法适应度，算<strong>轮盘赌概率</strong></span></li>\n<li data-id=\"4\"><span class=\"check-box\"></span><span class=\"check-label\">解释<strong>模拟退火</strong>为什么能跳出局部最优</span></li>\n<li data-id=\"5\"><span class=\"check-box\"></span><span class=\"check-label\">给博弈树，填 <strong>Minimax</strong> 值并判断 <strong>$alpha$-$\b\beta$ 剪枝</strong></span></li>\n<li data-id=\"6\"><span class=\"check-box\"></span><span class=\"check-label\">给课程安排问题，写 <strong>CSP 变量、值域、约束</strong></span></li>\n<li data-id=\"7\"><span class=\"check-box\"></span><span class=\"check-label\">把\"所有/存在/不是所有\"翻译成<strong>一阶逻辑</strong></span></li>\n<li data-id=\"8\"><span class=\"check-box\"></span><span class=\"check-label\">用<strong>归结法</strong>证明一个简单结论</span></li>\n<li data-id=\"9\"><span class=\"check-box\"></span><span class=\"check-label\">给贝叶斯网络描述，<strong>画图、写 CPT、算后验概率</strong></span></li>\n<li data-id=\"10\"><span class=\"check-box\"></span><span class=\"check-label\">给数据表，算<strong>熵、信息增益、画决策树</strong></span></li>\n<li data-id=\"11\"><span class=\"check-box\"></span><span class=\"check-label\">给朴素贝叶斯样本表，<strong>算类别</strong></span></li>\n<li data-id=\"12\"><span class=\"check-box\"></span><span class=\"check-label\">给 MDP 网格题，写<strong>状态、动作、奖励、折扣因子</strong></span></li>\n<li data-id=\"13\"><span class=\"check-box\"></span><span class=\"check-label\">给奖励序列，算<strong>折扣回报</strong></span></li>\n<li data-id=\"14\"><span class=\"check-box\"></span><span class=\"check-label\">给 CNN 图，判断<strong>卷积核、步长、池化输出</strong></span></li>\n</ul>"
      },
      {
        "type": "prose",
        "html": "<blockquote style=\"font-size:var(--text-lg);padding:var(--space-5);\">\n<strong>一句话总纲：</strong>这门期末最核心的不是\"把所有 PPT 背完\"，而是掌握五类能力——<br>\n把现实任务<strong>形式化</strong>为搜索/CSP/MDP；<br>\n按规则<strong>推演</strong>搜索算法；<br>\n用逻辑公式<strong>表示并证明</strong>；<br>\n用概率和贝叶斯网络<strong>处理不确定性</strong>；<br>\n用机器学习方法完成<strong>分类和决策</strong>。\n</blockquote>"
      },
      {
        "type": "prose",
        "html": "<h2 id=\"s-index\">附：历年真题 &amp; 课件索引</h2>"
      }
    ]
  },
  {
    "id": "s11-s8",
    "title": "11.6 考试怎么考",
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
            "卷积输出尺寸计算",
            "3-5 分（计算）",
            "给输入尺寸、卷积核尺寸、步长、padding，算输出尺寸"
          ],
          [
            "卷积逐元素计算",
            "5-8 分（大题）",
            "给 4×4 或 3×3 矩阵 + 2×2 卷积核，步长=1，手动算每个输出值"
          ],
          [
            "最大池化计算",
            "3-5 分（计算）",
            "给特征矩阵，池化窗口 2×2 步长 2，算池化输出"
          ],
          [
            "CNN 组件作用",
            "3-5 分（简答）",
            "卷积/池化/全连接/Softmax 各自的作用"
          ],
          [
            "激活函数作用",
            "2-3 分（简答）",
            "为什么需要非线性激活函数"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<h4>得分点</h4>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li>输出尺寸公式：$N_{out} = \\lfloor \\frac{N_{in} + 2P - F}{S} \\rfloor + 1$，其中 F=卷积核大小，S=步长，P=padding。每个参数代对位置</li>\n<li>卷积计算：对应位置相乘再求和，每一步都要写出覆盖区域和乘积，步骤清晰</li>\n<li>池化：在窗口内取最大值，窗口不重叠时步长=窗口大小</li>\n<li>简答：卷积=提取局部特征（边缘/纹理），池化=降维+保留主要信息，全连接=综合特征分类，Softmax=输出概率分布</li>\n<li>激活函数：没有非线性 → 多层等价于单层线性 → 深度网络无意义</li>\n</ul>"
      },
      {
        "type": "prose",
        "html": "<h4>常见错误</h4>"
      },
      {
        "type": "callout",
        "variant": "danger",
        "text": "卷积输出尺寸忘记 +1：公式最后有 +1，很多人都漏掉。例如 4-2+1=3（不是 2）。验证：4×4 用 2×2 核步长 1，卷积核从位置 0 滑到位置 2，共 3 个位置 → 输出 3×3。"
      },
      {
        "type": "callout",
        "variant": "danger",
        "text": "卷积和池化混用：卷积是\"相乘再求和\"（加权组合），池化是\"取最大值\"（选择操作）。前者产生新特征，后者只是压缩。"
      },
      {
        "type": "callout",
        "variant": "danger",
        "text": "忘记标注步长：输出尺寸取决于步长。同样 4×4 输入 + 2×2 核，步长 1→3×3，步长 2→2×2。考试先看清步长再算。"
      },
      {
        "type": "prose",
        "html": "<h4>答题模板</h4>"
      },
      {
        "type": "card",
        "title": "卷积计算 答题格式",
        "body": "<div class=\"card\">\n\n<p><strong>已知：</strong>输入矩阵 $I$ ($W \\times H$)，卷积核 $K$ ($F \\times F$)，步长 $S$，padding $P$</p>\n<p><strong>Step 1 — 输出尺寸：</strong>$W_{out} = \\lfloor \\frac{W + 2P - F}{S} \\rfloor + 1$</p>\n<p><strong>Step 2 — 逐位置计算：</strong>对每个输出位置 $(i,j)$，写出覆盖区域和逐元素乘积</p>\n<p>$O_{i,j} = \\sum_{m=0}^{F-1}\\sum_{n=0}^{F-1} I_{iS+m, jS+n} \\times K_{m,n}$</p>\n<p><strong>Step 3 — 填写输出矩阵：</strong>把所有 $O_{i,j}$ 填入 $W_{out} \\times H_{out}$ 矩阵</p>\n</div>"
      }
    ]
  },
  {
    "id": "s11-s9",
    "title": "11.7 真题演练",
    "content": [
      {
        "type": "examQuestions",
        "ids": ["eq-s11-29", "eq-s11-30"]
      }
    ]
  },
  {
    "id": "s11-s10",
    "title": "11.8 小测验",
    "content": [
      {
        "type": "quiz",
        "ids": ["q-s11-25", "q-s11-26"]
      }
    ]
  }
],
};

export default content;
