import type { ModuleContent } from "@learncourse/framework/types";

const meta = {"id":"s7","number":7,"title":"不确定性量化 & 贝叶斯网络","icon":"Dice5","courseware":"10 不确定性的量化.pdf, 11 贝叶斯网络.pptx","examRefs":"2025 期末一(7)(8), 2025 期末二(3)"};

const content: ModuleContent = {
  meta,
  calloutText: "🎯 这章解决什么问题？牙疼不一定是蛀牙——怎么根据\"牙疼\"这个症状，反向推算最可能的原因？贝叶斯网络就是做这件事的数学工具。",
  sections: [
  {
    "id": "s7-s2",
    "title": "7.1 先理解直觉",
    "content": [
      {
        "type": "prose",
        "html": "<p>假设你是医生。病人说\"我发烧了\"。你不会只考虑一种可能——你会给感冒、新冠、中暑各一个概率，然后结合其他症状（咳嗽吗？去过哪里？）来<strong>更新</strong>这些概率。</p>"
      },
      {
        "type": "prose",
        "html": "<p>这就是贝叶斯推理的本质：</p>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li>先有<strong>先验概率</strong>——\"在没任何信息时，感冒的概率多大\"（冬天30%）</li>\n<li>观察<strong>证据</strong>——\"病人咳嗽\"</li>\n<li>用<strong>贝叶斯公式</strong>更新——\"既然咳嗽了，感冒的概率从30%升到多少？\"</li>\n</ul>"
      },
      {
        "type": "prose",
        "html": "<p><strong>贝叶斯网络</strong> = 把这种推理扩展到多个变量：用图画出谁影响谁（DAG），用表数字化（CPT）。</p>"
      }
    ]
  },
  {
    "id": "s7-s3",
    "title": "7.2 核心概念",
    "content": [
      {
        "type": "prose",
        "html": "<h4>概率三兄弟</h4>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "类型",
            "记号",
            "含义",
            "掷骰子例子"
          ],
          [
            "联合概率",
            "P(A, B)",
            "A 和 B 同时发生",
            "P(偶数, 大于3) = 掷出4或6 = 2/6"
          ],
          [
            "边缘概率",
            "P(A)",
            "不管B，只看A",
            "P(偶数) = 1/2。把联合中所有B情况求和"
          ],
          [
            "条件概率",
            "P(A|B)",
            "已知B发生，A的概率",
            "P(偶数|大于3) = 在{4,5,6}中偶数的比例 = 2/3"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<h4>贝叶斯公式（最重要！）</h4>"
      },
      {
        "type": "card",
        "body": "<div class=\"card\" style=\"text-align:center\">\n<p style=\"font-size:1.2em\"><strong>$$P(H|E) = \\frac{P(E|H) \\cdot P(H)}{P(E)}$$</strong></p>\n<p style=\"color:var(--color-text-secondary)\">后验 = 似然 × 先验 / 证据概率</p>\n</div>"
      },
      {
        "type": "prose",
        "html": "<p><strong>医疗检测例子——理解\"基础率谬误\"：</strong></p>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li>某疾病发病率 1%（先验 P(D)=0.01）</li>\n<li>检测准确率 95%：有病的人 95% 测出阳性（P(+|D)=0.95），没病的人 5% 假阳性</li>\n<li>你测出阳性。<strong>你有多大可能有病？</strong></li>\n</ul>"
      },
      {
        "type": "callout",
        "variant": "warning",
        "text": "直觉陷阱：大多数人会说 \"95% 啊！\"——大错特错。"
      },
      {
        "type": "code",
        "language": "",
        "code": "P(+) = P(+|D)×P(D) + P(+|¬D)×P(¬D) = 0.95×0.01 + 0.05×0.99 = 0.059\nP(D|+) = 0.95 × 0.01 / 0.059 ≈ 0.161"
      },
      {
        "type": "prose",
        "html": "<p><strong>你只有约 16% 的概率真有病！</strong>因为疾病太罕见，假阳性人数（5% × 99%健康人）远多于真阳性人数（95% × 1%病人）。这就是为什么不对全民做罕见病筛查——阳性结果大多是虚惊。</p>"
      },
      {
        "type": "prose",
        "html": "<h4>贝叶斯网络 = DAG + CPT</h4>"
      },
      {
        "type": "prose",
        "html": "<div class=\"grid-2\">\n<div>\n<h4>DAG（有向无环图）</h4>\n<ul>\n<li><strong>节点</strong> = 随机变量（Cloud, Rain, Wet）</li>\n<li><strong>边</strong> = 直接影响（Cloud → Rain = 阴天影响下雨）</li>\n<li><strong>无环</strong> = 不能绕回来</li>\n<li>给定父节点后，节点与祖先<strong>条件独立</strong></li>\n</ul>\n</div>\n<div>\n<h4>CPT（条件概率表）</h4>\n<ul>\n<li>每个节点一张 CPT</li>\n<li>根节点（无父节点）：先验概率</li>\n<li>子节点：P(node | 父节点的每种组合)</li>\n<li>CPT 行数 = 2^(父节点个数)</li>\n</ul>\n</div>\n</div>"
      }
    ]
  },
  {
    "id": "s7-s4",
    "title": "7.3 动手试试：贝叶斯网络推断",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>2023 真题网络：</strong>C(Cloudy) → S(Sprinkler), C → R(Rain), S+R → W(WetGrass)</p>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "CPT",
            "条件",
            "概率"
          ],
          [
            "P(C=yes)",
            "—",
            "0.5"
          ],
          [
            "P(S=yes|C=yes)",
            "阴天",
            "0.1"
          ],
          [
            "P(S=yes|C=no)",
            "不阴天",
            "0.5"
          ],
          [
            "P(R=yes|C=yes)",
            "阴天",
            "0.8"
          ],
          [
            "P(R=yes|C=no)",
            "不阴天",
            "0.2"
          ],
          [
            "P(W=yes|S∨R)",
            "喷水或下雨",
            "0.99"
          ],
          [
            "P(W=yes|¬S∧¬R)",
            "都不",
            "0.01"
          ]
        ]
      },
      {
        "type": "details",
        "summary": "📝 完整计算：P(C=yes | W=yes)",
        "body": "<d\betails open=\"\">\n\n<div class=\"d\betails-body\">\n\n<p><strong>联合分解：</strong>P(C,S,R,W) = P(C) × P(S|C) × P(R|C) × P(W|S,R)</p>\n\n<p><strong>分子 P(C=yes, W=yes)：</strong>固定 C=yes，对 S,R 所有组合求和</p>\n<table>\n<tbody><tr><th>C</th><th>S</th><th>R</th><th>P(C)</th><th>P(S|C)</th><th>P(R|C)</th><th>P(W|S,R)</th><th>乘积</th></tr>\n<tr><td>yes</td><td>yes</td><td>yes</td><td>0.5</td><td>0.1</td><td>0.8</td><td>0.99</td><td>0.0396</td></tr>\n<tr><td>yes</td><td>yes</td><td>no</td><td>0.5</td><td>0.1</td><td>0.2</td><td>0.99</td><td>0.0099</td></tr>\n<tr><td>yes</td><td>no</td><td>yes</td><td>0.5</td><td>0.9</td><td>0.8</td><td>0.99</td><td>0.3564</td></tr>\n<tr><td>yes</td><td>no</td><td>no</td><td>0.5</td><td>0.9</td><td>0.2</td><td>0.01</td><td>0.0009</td></tr>\n</tbody></table>\n<p>P(C=yes, W=yes) = <strong>0.4068</strong></p>\n\n<p><strong>分母 P(W=yes)：</strong>C 也可以是 no，加上 C=no 的四种情况（略，类似展开）→ <strong>0.7058</strong></p>\n\n<p><strong>最终：</strong>P(C=yes | W=yes) = 0.4068 / 0.7058 ≈ <strong>0.5765</strong></p>\n\n<div class=\"callout callout--tip\">\n<strong>边缘化的核心：</strong>\"消去\"变量 = 对它的所有可能取值<strong>求和</strong>。就像把所有分岔路的概率汇总到主路上。\n</div>\n\n</div>\n</d\betails>"
      }
    ]
  },
  {
    "id": "s7-s5",
    "title": "7.4 考试怎么考",
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
            "3-5 分",
            "贝叶斯公式直接计算；辨识条件独立关系（D-分离）",
            "低-中"
          ],
          [
            "简答题",
            "5-8 分",
            "\"写出贝叶斯网络的联合概率分解\"；\"什么是条件独立？举例说明\"",
            "中"
          ],
          [
            "计算题",
            "10-15 分",
            "给定网络 + CPT，计算某个查询概率（含边缘化），类似课本洒水器/草地例子",
            "中-高"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<h4>得分点</h4><ul><li><strong>联合分解：</strong>给定网络拓扑，能写出 $P(X_1, \\\\dots, X_n) = \\\\prod_i P(X_i \\\\mid \\\\text{Parents}(X_i))$</li><li><strong>贝叶斯公式套用：</strong>$P(H|E) = \\\\frac{P(E|H) \\\\cdot P(H)}{P(E)}$，三个量——先验、似然、证据概率——都写出来</li><li><strong>边缘化：</strong>对隐藏变量\"求和消去\"——$P(A) = \\\\sum_{b} P(A, B=b)$</li><li><strong>条件独立：</strong>能指出网络中哪些节点条件独立于哪些节点（给定证据后）</li><li><strong>D-分离：</strong>能判断两个节点之间是否被 blocked（串行/分叉/汇聚三种结构）</li></ul>"
      },
      {
        "type": "prose",
        "html": "<h4>常见错误</h4><ul><li><strong>忘记分母 P(E)：</strong>直接用分子 $P(E|H)P(H)$ 当最终答案，不除以 $P(E)$。严重扣分</li><li><strong>边缘化漏项：</strong>求和时只加一项或漏掉某个组合——一定要把隐藏变量的所有可能取值枚举完整</li><li><strong>条件独立方向搞反：</strong>网络里 $A \\\\to B \\\\to C$ 意味着给定 B 时 A 和 C 独立，但反过来给定 A 时 B 和 C 并不独立</li><li><strong>CPT 行数算错：</strong>节点有 k 个父节点（每个二值）→ CPT 需要 $2^k$ 行（不是 k 行）</li><li><strong>基础率谬误：</strong>看到\"检测准确率 95%\"就以为阳性=95%有病——忽略疾病本身有多罕见</li></ul>"
      },
      {
        "type": "prose",
        "html": "<h4>答题模板 —— 贝叶斯网络推断题</h4>"
      },
      {
        "type": "code",
        "language": "",
        "code": "步骤1: 写出联合分解（按网络拓扑）→ P(X1,...,Xn) = ∏ P(Xi | Parents(Xi))\n步骤2: 写出查询表达式 → P(Query | Evidence) = P(Query, Evidence) / P(Evidence)\n步骤3: 对隐藏变量边缘化 → 枚举所有隐藏变量的取值组合，对每一项求和\n步骤4: 查 CPT 表代入数值 → 每个因子从对应 CPT 中取\n步骤5: 计算分子、分母 → 最后除一下得到最终概率\n\n⚠ 如果网络很小（2-3个节点），直接展开联合然后边缘化最快\n⚠ 每一步求和都要写清楚：对哪些变量求和，每个变量取哪几个值"
      }
    ]
  },
  {
    "id": "s7-s6",
    "title": "7.5 真题演练",
    "content": [
      {
        "type": "examQuestions",
        "ids": ["eq-s7-15", "eq-s7-16"]
      }
    ]
  },
  {
    "id": "s7-s7",
    "title": "7.6 小测验",
    "content": [
      {
        "type": "quiz",
        "ids": ["q-s7-12", "q-s7-13"]
      }
    ]
  }
],
};

export default content;
