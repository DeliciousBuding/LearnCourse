import type { ModuleContent } from "@learncourse/framework/types";

const meta = {"id":"s1","number":1,"title":"基本概念与 Agent","icon":"Bot","courseware":"01 智能 Agent.pptx","examRefs":"2025 期中一(1), 2025 期中三(1)"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？怎么让机器自己干活？",
  sections: [
  {
    "id": "s1-s1",
    "title": "核心内容",
    "content": [
      {
        "type": "prose",
        "html": "<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\">课件：01智能AGENT.pptx · 2025期中考 Agent 定义/组成/类型 10分 · 2025期末考机械臂搜索问题定义 5分</p>"
      }
    ]
  },
  {
    "id": "s1-s2",
    "title": "1.1 先理解直觉",
    "content": [
      {
        "type": "prose",
        "html": "<p>想象你是一个机器人，你需要整理一间乱糟糟的房间。你一睁眼，看到的是一堆散落的书、歪倒的椅子和满地的衣服。你该怎么办？</p>"
      },
      {
        "type": "prose",
        "html": "<p>你首先得<strong>看到</strong>这些东西（感知），然后<strong>想一想</strong>\"先把书放回书架好，还是先把椅子扶正？\"（思考），最后<strong>伸出手</strong>去搬书、挪椅子（行动）。这其实就是所有智能系统共有的循环：<strong>感知 → 思考 → 行动</strong>。每次行动之后，房间变了一点点，你再重新感知，再思考下一步。循环往复，直到屋子干净。</p>"
      },
      {
        "type": "prose",
        "html": "<p>AI 里管这个循环叫 Agent 的基本干活方式。Agent 就是\"能在环境里替你做事的程序/机器人\"。它不一定是铁皮机器人——微信里的聊天助手、自动驾驶的汽车、刷脸支付时判断\"这是不是本人\"的那段代码，全都叫 Agent。它们的共同点是：<strong>通过传感器感知世界，通过执行器改变世界</strong>。</p>"
      },
      {
        "type": "prose",
        "html": "<p>理解了 Agent 这个概念，后面学的一切——搜索、逻辑、概率、机器学习——其实都是在回答同一个问题：<strong>\"在感知到当前局面之后，Agent 怎么决定下一步该做什么？\"</strong>不同的答案就是不同的章节。</p>"
      }
    ]
  },
  {
    "id": "s1-s3",
    "title": "1.2 核心概念",
    "content": [
      {
        "type": "card",
        "title": "Agent 四大组成",
        "body": "<div class=\"card\">\n\n<table>\n<tbody><tr><th>组成</th><th>一句话解释</th><th>扫地机器人例子</th></tr>\n<tr><td><strong>传感器 Sensors</strong></td><td>Agent 的\"眼睛和耳朵\"</td><td>红外传感器探测障碍物、灰尘传感器检测地面</td></tr>\n<tr><td><strong>执行器 Actuators</strong></td><td>Agent 的\"手和脚\"</td><td>轮子马达前进转弯、吸尘马达开启关闭</td></tr>\n<tr><td><strong>Agent 程序</strong></td><td>Agent 的\"大脑\"</td><td>代码逻辑：如果探测到灰，就吸；如果探测到墙，就转弯</td></tr>\n<tr><td><strong>环境 Environment</strong></td><td>Agent 身处的\"世界\"</td><td>房间的地面、家具、墙壁</td></tr>\n</tbody></table>\n</div>"
      },
      {
        "type": "card",
        "title": "PEAS 任务环境描述框架",
        "body": "<div class=\"card\">\n\n<p>当你要描述\"某个 Agent 被派去干什么活\"，用 PEAS 四个词就能把任务讲清楚。这是考简答的标准模板。</p>\n<table>\n<tbody><tr><th>字母</th><th>含义</th><th>问题指向</th><th>自动驾驶例子</th></tr>\n<tr><td><strong>P</strong></td><td>Performance 性能度量</td><td>什么叫\"干得好\"？</td><td>安全到达、行车时间短、乘客舒适、油耗低</td></tr>\n<tr><td><strong>E</strong></td><td>Environment 环境</td><td>在哪里干？</td><td>高速公路、城市道路、红绿灯、行人、其他车辆</td></tr>\n<tr><td><strong>A</strong></td><td>Actuators 执行器</td><td>用什么干活？</td><td>方向盘、刹车踏板、油门踏板、转向灯</td></tr>\n<tr><td><strong>S</strong></td><td>Sensors 传感器</td><td>靠什么感知？</td><td>摄像头、激光雷达（LiDAR）、GPS、速度计</td></tr>\n</tbody></table>\n</div>"
      },
      {
        "type": "prose",
        "html": "<p>常考对比：同样是一辆车，P 不同任务就不同。出租车的 P 是\"赚更多钱\"，救护车的 P 是\"最快送达\"，赛车的 P 是\"最快圈速\"。<strong>PEAS 不是唯一的——各人根据自己的任务来定义。</strong></p>"
      },
      {
        "type": "card",
        "title": "Agent 五种类型——从\"傻\"到\"聪明\"的进化故事",
        "body": "<div class=\"card\">\n\n<p>这五种类型不是五个孤立的抽屉，而是 Agent 越来越聪明的进化之路。每一种都是为了解决前一种的缺陷诞生的。</p>\n\n<table>\n<tbody><tr><th>类型</th><th>聪明程度</th><th>怎么决策</th><th>为什么需要它</th></tr>\n<tr>\n<td><strong>1. 简单反射 Agent</strong></td>\n<td>最基础</td>\n<td>看到什么就做什么（if-then 规则）</td>\n<td>最简单的场景：恒温器看到温度太低就加热，不需要回忆过去也不需要考虑未来。</td>\n</tr>\n<tr>\n<td><strong>2. 基于模型的反射 Agent</strong></td>\n<td>有点记忆</td>\n<td>维护一份内部\"世界模型\"，追踪\"我看不到的也在变\"</td>\n<td>第 1 种不知道世界会自己变化。比如开车，你看不到车后的情况，但你知道后面的车可能正在靠近——这就是内部模型。</td>\n</tr>\n<tr>\n<td><strong>3. 基于目标的 Agent</strong></td>\n<td>有方向</td>\n<td>不只反应，还问\"这么做能到达我的目标吗？\"</td>\n<td>第 2 种能追踪世界，但不知道往哪走。导航软件 GPS 不是\"随便开\"，而是\"朝目的地开\"——这就是目标。</td>\n</tr>\n<tr>\n<td><strong>4. 基于效用的 Agent</strong></td>\n<td>能比较</td>\n<td>目标可能有很多条路，用效用函数算哪条\"最好\"</td>\n<td>第 3 种只管是否到达目标，不管好坏。但去机场可以走高速（收费但快）或走国道（免费但慢），你得能比——这就是效用。</td>\n</tr>\n<tr>\n<td><strong>5. 学习型 Agent</strong></td>\n<td>会进步</td>\n<td>从经验中改进自己的行为，越做越好</td>\n<td>前四种全靠人手写规则。但如果扫地机器人每次撞墙不记住，永远学不会更好的路线。学习补上了这个缺口。</td>\n</tr>\n</tbody></table>\n</div>"
      }
    ]
  },
  {
    "id": "s1-s4",
    "title": "1.3 动手试试",
    "content": [
      {
        "type": "prose",
        "html": "<p><strong>场景：</strong>给你一个自动咖啡机，试着用 PEAS 描述它。</p>"
      },
      {
        "type": "details",
        "summary": "点击查看答案思路",
        "body": "<d\betails>\n\n<div class=\"d\betails-body\">\n<table>\n<tbody><tr><th>P（性能）</th><td>做出好喝的咖啡、速度快、不要溢出</td></tr>\n<tr><th>E（环境）</th><td>咖啡豆、水、杯子、厨房台面</td></tr>\n<tr><th>A（执行器）</th><td>磨豆机马达、水泵、加热器、出液口</td></tr>\n<tr><th>S（传感器）</th><td>水位传感器、温度传感器、杯子检测传感器</td></tr>\n</tbody></table>\n<p>别背答案，理解四个字母指什么就行。任何机器人都能套。</p>\n</div>\n</d\betails>"
      },
      {
        "type": "prose",
        "html": "<p><strong>再试一个，</strong>判断它是哪种 Agent：一个下围棋的 AI，它看到当前棋盘局面（传感器是棋盘状态输入），它不仅要赢（目标），还要赢得漂亮、半目也是赢但尽量赢更多（效用），它下过几百万盘棋来训练自己（学习）。这是什么类型？</p>"
      },
      {
        "type": "details",
        "summary": "点击查看答案",
        "body": "<d\betails>\n\n<div class=\"d\betails-body\">\n<p><strong>学习型 + 基于效用 + 基于目标。</strong>它是一个复合体——真实系统通常混合多种类型。考前只需要能区分五种类型的定义即可。</p>\n</div>\n</d\betails>"
      }
    ]
  },
  {
    "id": "s1-s5",
    "title": "1.4 考试怎么考",
    "content": [
      {
        "type": "prose",
        "html": "<h4>题型与分值</h4>"
      },
      {
        "type": "table",
        "headers": [],
        "rows": [
          [
            "题型",
            "分值",
            "出现位置",
            "考查内容"
          ],
          [
            "简答题",
            "5~10 分",
            "2025 期中 Agent 定义/组成/类型 10分；2025 期末 机械臂搜索问题定义 5分",
            "Agent 四大组成、PEAS 描述、五种类型区分"
          ],
          [
            "概念题",
            "2~4 分",
            "选择题或判断题",
            "PEAS 四个字母的含义、Agent 类型判断"
          ]
        ]
      },
      {
        "type": "prose",
        "html": "<h4>得分点</h4>"
      },
      {
        "type": "prose",
        "html": "<ul>\n<li><strong>PEAS 描述题：</strong>四个字母各 1 分，每个字母的解释要具体到题目场景，不能光背定义。</li>\n<li><strong>Agent 类型判断：</strong>写出类型名称（1分） + 一句话理由（1分）。只写名字不写理由，多半只给一半分。</li>\n<li><strong>Agent 四大组成：</strong>传感器、执行器、Agent 程序、环境——四个缺一扣分。</li>\n</ul>"
      },
      {
        "type": "prose",
        "html": "<h4>常见错误</h4>"
      },
      {
        "type": "callout",
        "variant": "warning",
        "text": "错误1：把 PEAS 的 P（Performance）写成\"程序 Program\"。P 是性能度量——\"什么叫干得好\"，不是\"Agent 的程序代码\"。"
      },
      {
        "type": "callout",
        "variant": "warning",
        "text": "错误2：PEAS 描述太抽象。一定要写出和题目场景相关的具体内容——比如\"自动驾驶的 P：安全到达、时间短、舒适\"，不要只写\"性能\"两个字。"
      },
      {
        "type": "callout",
        "variant": "warning",
        "text": "错误3：把五种 Agent 类型当成互斥的分类来答。真实系统通常是混合的——比如 AlphaGo 既是目标型又是效用型又是学习型。考试问\"是什么类型\"时，选最突出的那一种即可，但可以注明\"复合了XX和YY\"。"
      },
      {
        "type": "prose",
        "html": "<h4>答题模板</h4>"
      },
      {
        "type": "code",
        "language": "",
        "code": "【PEAS 描述题】\nP（性能度量）：[题目场景中]什么叫\"干得好\"？具体写出 2-3 条\nE（环境）：[题目场景中]Agent 处在什么环境里？\nA（执行器）：[题目场景中]Agent 用什么改变环境？\nS（传感器）：[题目场景中]Agent 用什么感知环境？\n\n【Agent 类型判断题】\n该 Agent 属于 [类型名称] 。\n理由：[用题目中的信息对应类型定义，1-2句话]。"
      }
    ]
  },
  {
    "id": "s1-s6",
    "title": "1.5 真题演练",
    "content": [
      {
        "type": "examQuestions",
        "ids": ["eq-s1-1", "eq-s1-2"]
      }
    ]
  },
  {
    "id": "s1-s7",
    "title": "1.6 小测验",
    "content": [
      {
        "type": "quiz",
        "ids": ["q-s1-1", "q-s1-2"]
      }
    ]
  }
],
};

export default content;
