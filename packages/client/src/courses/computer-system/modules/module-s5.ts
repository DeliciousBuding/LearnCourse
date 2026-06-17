import type { ModuleContent } from "@learncourse/framework/types";

const meta = {"id":"s5","number":5,"title":"整数与浮点数","icon":"Hash","courseware":"05 整数+浮点.pptx","examRefs":"简答题 ~10分"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？计算机怎么存数字，为什么 0.1+0.2 不等于 0.3？",
  sections: [
    {
      id: "s5-s1",
      title: "先理解直觉",
      content: [
        {
          type: "prose",
          html: "<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\">课件：整数表示 + IEEE 754 浮点数 · 简答题常客 ~10分 · 涉及补码转换、溢出判断、IEEE 754 字段计算</p>"
        },
        {
          type: "prose",
          html: "<p>先问你一个问题：计算机只有 0 和 1，那它怎么表示负数？答案不是\"前面加个负号\"——因为计算机不认识负号，它只认识 0 和 1。</p>"
        },
        {
          type: "prose",
          html: "<p>最简单的想法——最高位当符号位（原码）——有硬伤：0 有两个表示（+0/-0），而且正负数要两套加法电路。所以改用<strong>补码</strong>，核心直觉是<strong>让负数\"绕一圈\"从 0 往下数</strong>。想象一个钟表，12 点是 0，往前拨是正数，往后拨 1 格到 11——钟表上的 11 就是 -1。固定位宽的环上，减法等价于沿环往前绕，一套电路通吃加减。</p>"
        },
        {
          type: "prose",
          html: "<p>浮点数呢？小数点不能直接存，所以用<strong>科学计数法</strong>来实现。你写 1.23 × 10^4 的时候存两样东西：有效数字（1.23）和指数（4）。IEEE 754 一样，只不过底数是 2 不是 10。sign（正负）、exponent（指数，放了多高）、mantissa（有效数字，精确到哪儿），三件套。</p>"
        }
      ]
    },
    {
      id: "s5-s2",
      title: "核心概念：补码——\"钟表算术\"",
      content: [
        {
          type: "prose",
          html: "<h3>补码的定义（一句话版）</h3>"
        },
        {
          type: "prose",
          html: "<p>在 w 位补码中，最高位（第 w-1 位）的权是 <strong>-2^(w-1)</strong>，其余位的权正常是正的 2 的幂。所以：</p>"
        },
        {
          type: "math",
          formula: "B2T_w(x) = -x_{w-1} \\cdot 2^{w-1} + \\sum_{i=0}^{w-2} x_i \\cdot 2^i",
          display: true
        },
        {
          type: "prose",
          html: "<p><strong>例子：</strong>8 位二进制 11111111。按补码：最高位权是 -128，后面 7 位全是 1 加起来是 127。(-128) + 127 = <strong>-1</strong>。这就是补码的权值法——一根筋算过去就行。</p>"
        },
        {
          type: "prose",
          html: "<h3>补码转换三步法</h3>"
        },
        {
          type: "card",
          title: "十进制 → 补码（以 -43 → 8位补码为例）",
          body: "<div class=\"card\">\n\n<p><strong>第1步：</strong>取绝对值，转成二进制。43 = 00101011₂</p>\n<p><strong>第2步：</strong>按位取反（0变1，1变0）。00101011 → 11010100</p>\n<p><strong>第3步：</strong>加 1。11010100 + 1 = <strong>11010101</strong></p>\n<p style=\"color:var(--color-accent);font-size:var(--text-sm)\">验证：权值法——最高位 -128，各正位 64+16+4+1=85。(-128)+85=-43 ✓</p>\n</div>"
        },
        {
          type: "prose",
          html: "<h3>为什么\"取反加一\"是对的？</h3>"
        },
        {
          type: "prose",
          html: "<p>因为 w 位补码的模是 2^w。要表示 -x，其实就是算 2^w - x。而 (2^w - 1) - x 就是 x 的按位取反（因为 2^w-1 全1，减去任何位就相当于翻转该位）。所以 -x = ~x + 1。不是死记硬背的规矩，是模运算的必然结论。</p>"
        },
        {
          type: "card",
          title: "无符号 vs 有符号 范围对比（8位为例）",
          body: "<div class=\"card\">\n\n<table>\n<tbody><tr><th>解释方式</th><th>最小值</th><th>最大值</th><th>编码数</th></tr>\n<tr><td><strong>无符号 Unsigned</strong></td><td>0</td><td>255 (2^8 - 1)</td><td>256</td></tr>\n<tr><td><strong>补码 Signed</strong></td><td>-128 (-2^7)</td><td>127 (2^7 - 1)</td><td>256</td></tr>\n</tbody></table>\n<p style=\"font-size:var(--text-sm);color:var(--color-text-secondary)\">注意：相同的 256 个编码，解释规则不同，数值完全不同。编码 11111111 在无符号是 255，在补码是 -1。</p>\n</div>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "记忆技巧：w 位补码的范围是 [-2^(w-1), 2^(w-1)-1]。负数比正数多一个最小值（如 8 位的 -128），因为 0 被划给了\"非负数\"那边，非负数少占一位。"
        },
        {
          type: "prose",
          html: "<h3>溢出判断——考试必考</h3>"
        },
        {
          type: "prose",
          html: "<p>溢出不是\"计算结果太大了\"，而是\"计算结果用当前位宽<strong>解释为正确含义时</strong>是错的\"。判断方法：</p>"
        },
        {
          type: "table",
          headers: ["判断场景", "规则", "例子"],
          rows: [
            ["无符号加法溢出", "最高位有进位（carry out = 1）", "255 + 1 = 256，但 8 位无符号只能到 255 → 溢出"],
            ["补码加法溢出（正溢出）", "两个正数相加得负数", "120 + 10 = -126（解释为补码）→ 正溢出"],
            ["补码加法溢出（负溢出）", "两个负数相加得正数", "(-120) + (-10) = 126（解释为补码）→ 负溢出"],
            ["补码加法不溢出", "正+负，或同号但结果符号不变", "120 + (-10) = 110 ✓"],
          ]
        },
        {
          type: "callout",
          variant: "danger",
          text: "最常见的错误：把无符号的进位（carry）当成溢出。无符号只看 carry bit，补码只看符号位关系——两者判断标准不同！考题里同时给你无符号和补码两种解释，你必须两种都判。"
        },
        {
          type: "prose",
          html: "<h3>符号扩展（Sign Extension）</h3>"
        },
        {
          type: "prose",
          html: "<p>把小位宽补码变成大位宽，怎么保持数值不变？<strong>复制符号位</strong>填满新增的高位。</p>"
        },
        {
          type: "code",
          language: "",
          code: "8位补码  10000011  = -125\n16位扩展 11111111 10000011  = -125  ← 前面填满1（符号位）\n如果错用零扩展：00000000 10000011 = 131 ✗ 完全错了！"
        },
        {
          type: "callout",
          variant: "warning",
          text: "无符号扩展填 0（零扩展），补码扩展填符号位（符号扩展）。考题常混在一起让你判断——先看清楚你处理的是无符号还是补码！"
        }
      ]
    },
    {
      id: "s5-s3",
      title: "核心概念：IEEE 754 浮点数",
      content: [
        {
          type: "prose",
          html: "<h3>三种精度速查</h3>"
        },
        {
          type: "table",
          headers: ["精度", "总位数", "符号 S", "阶码 E", "尾数 M", "偏置值 Bias"],
          rows: [
            ["单精度 float", "32 bit", "1 bit", "8 bit", "23 bit", "127"],
            ["双精度 double", "64 bit", "1 bit", "11 bit", "52 bit", "1023"],
            ["扩展精度 long double", "80 bit", "1 bit", "15 bit", "64 bit", "16383"],
          ]
        },
        {
          type: "prose",
          html: "<h3>IEEE 754 位布局图</h3>"
        },
        {
          type: "mermaid",
          id: "ieee754-layout",
          chart: `graph LR
    subgraph "单精度 32-bit"
        S["S<br/>1 bit<br/>符号"]
        E["E (exp)<br/>8 bits<br/>阶码"]
        M["M (frac)<br/>23 bits<br/>尾数"]
        S --- E --- M
    end
    subgraph "双精度 64-bit"
        S2["S<br/>1 bit"]
        E2["E (exp)<br/>11 bits<br/>阶码"]
        M2["M (frac)<br/>52 bits<br/>尾数"]
        S2 --- E2 --- M2
    end
    style S fill:#fbbf24,stroke:#d97706
    style S2 fill:#fbbf24,stroke:#d97706
    style E fill:#3b82f6,stroke:#1e40af
    style E2 fill:#3b82f6,stroke:#1e40af
    style M fill:#10b981,stroke:#059669
    style M2 fill:#10b981,stroke:#059669`
        },
        {
          type: "prose",
          html: "<h3>公式与三种数类型</h3>"
        },
        {
          type: "math",
          formula: "V = (-1)^S \\times M \\times 2^{E - Bias}",
          display: true
        },
        {
          type: "prose",
          html: "<p>其中 <strong>S</strong> 是符号位（0=正，1=负），<strong>E</strong> 是阶码字段的值（无符号整数），<strong>Bias</strong> 是偏置（单精度127，双精度1023），<strong>M</strong> 是尾数的值。</p>"
        },
        {
          type: "table",
          headers: ["类型", "阶码 E 的范围", "尾数 M 的值", "含义"],
          rows: [
            ["<strong>规格化数</strong>", "1 ~ 254（不全0也不全1）", "M = 1 + frac（隐含前导1）", "常规浮点数，绝大部分数"],
            ["<strong>非规格化数</strong>", "0（全0）", "M = frac（无隐含1）", "表示非常接近 0 的数，包括 0.0"],
            ["<strong>特殊值</strong>", "255（全1）", "frac=0 → ∞（无穷大）<br/>frac≠0 → NaN", "溢出/除零/invalid"],
          ]
        },
        {
          type: "callout",
          variant: "tip",
          text: "规格化数的隐藏位（前导1）是 IEEE 754 最巧妙的设计：既然二进制科学计数法中，非零数的小数点前一定是 1，那干脆不存这个 1，多腾出 1 位给精度。隐含前导 1 的意思是：存储的 23 位尾数实际上是 24 位有效精度。"
        },
        {
          type: "prose",
          html: "<h3>阶码偏置（Bias）是干什么的？</h3>"
        },
        {
          type: "prose",
          html: "<p>阶码 E 是作为无符号整数存储的，但实际指数可正可负。如果不加偏置，比较两个浮点数大小时要先看符号位再看阶码——太复杂了。加了偏置后，<strong>阶码越大数越大</strong>（同符号下），而且全 0 对应最小指数、全 1 对应最大指数，方便硬件做比较。</p>"
        }
      ]
    },
    {
      id: "s5-s4",
      title: "动手试试：-12.625 → IEEE 754 单精度",
      content: [
        {
          type: "prose",
          html: "<p>这是考试最常考的手算题。每一步都不能跳。</p>"
        },
        {
          type: "prose",
          html: "<h4>第1步：判符号位</h4>"
        },
        {
          type: "prose",
          html: "<p>-12.625 是负数 → <strong>S = 1</strong></p>"
        },
        {
          type: "prose",
          html: "<h4>第2步：把绝对值转成二进制</h4>"
        },
        {
          type: "prose",
          html: "<p><strong>整数部分 12：</strong></p>"
        },
        {
          type: "code",
          language: "",
          code: "12 ÷ 2 = 6 余 0\n 6 ÷ 2 = 3 余 0\n 3 ÷ 2 = 1 余 1\n 1 ÷ 2 = 0 余 1\n→ 从下往上读：1100₂"
        },
        {
          type: "prose",
          html: "<p><strong>小数部分 0.625：</strong></p>"
        },
        {
          type: "code",
          language: "",
          code: "0.625 × 2 = 1.25 → 取 1，剩下 0.25\n0.25  × 2 = 0.50 → 取 0，剩下 0.50\n0.50  × 2 = 1.00 → 取 1，剩下 0（终止）\n→ 从上往下读：.101₂"
        },
        {
          type: "prose",
          html: "<p>所以 12.625 = <strong>1100.101₂</strong></p>"
        },
        {
          type: "prose",
          html: "<h4>第3步：规格化</h4>"
        },
        {
          type: "prose",
          html: "<p>把小数点移到第一个 1 后面：</p>"
        },
        {
          type: "math",
          formula: "1100.101_2 = 1.100101_2 \\times 2^3",
          display: true
        },
        {
          type: "prose",
          html: "<p>指数是 <strong>3</strong>。</p>"
        },
        {
          type: "prose",
          html: "<h4>第4步：算阶码 E</h4>"
        },
        {
          type: "math",
          formula: "E = 3 + 127 = 130 = 10000010_2",
          display: true
        },
        {
          type: "prose",
          html: "<h4>第5步：取尾数（去掉隐藏的1）</h4>",
        },
        {
          type: "prose",
          html: "<p>1.100101 → 去掉前导 1 → frac = 10010100000000000000000（后面补 0 填满 23 位）</p>"
        },
        {
          type: "prose",
          html: "<h4>第6步：拼起来</h4>"
        },
        {
          type: "card",
          title: "最终结果",
          body: "<div class=\"card\">\n\n<table>\n<tbody><tr><td><strong>S (1 bit)</strong></td><td style=\"background:#fef3c7\">1</td></tr>\n<tr><td><strong>E (8 bits)</strong></td><td style=\"background:#dbeafe\">10000010</td></tr>\n<tr><td><strong>M (23 bits)</strong></td><td style=\"background:#d1fae5\">10010100000000000000000</td></tr>\n<tr><td><strong>完整 32 位</strong></td><td><code>11000001010010100000000000000000</code></td></tr>\n<tr><td><strong>十六进制</strong></td><td><code>0xC14A0000</code></td></tr>\n</tbody></table>\n</div>"
        },
        {
          type: "prose",
          html: "<h4>验证（自检）</h4>"
        },
        {
          type: "prose",
          html: "<p>阶码 E=130，减 bias=127 得指数=3。尾数=1+0.100101₂=1+0.578125=1.578125。值=(-1)^1 × 1.578125 × 2^3 = -12.625 ✓</p>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "考试建议流程：S (30秒) → 整数部分除2取余 (1分钟) → 小数部分乘2取整 (1分钟) → 规格化找指数 (30秒) → 加Bias得E (10秒) → 填尾数 (30秒) → 拼起来 (30秒)。熟手约 4 分钟完成一道题。"
        }
      ]
    },
    {
      id: "s5-s4b",
      title: "5.X 舍入模式与类型转换",
      content: [
        {
          type: "prose",
          html: "<p>你已经会算 IEEE 754 表示了，但一个问题来了：假定你算出来的尾数有 25 位，而 float 的 frac 字段只有 23 位——多出来的 2 位怎么办？答案是<strong>舍入</strong>。舍入不是随便砍掉多余的位，而是有一套严格的规则。</p>"
        },
        {
          type: "prose",
          html: "<h3>四种舍入模式</h3>"
        },
        {
          type: "table",
          headers: ["舍入模式", "规则", "例：$1.5 \\to$ 整数", "例：$2.5 \\to$ 整数", "例：$-1.5 \\to$ 整数"],
          rows: [
            ["<strong>向偶数舍入</strong><br/>(Round-to-Even)", "舍入到最近值；恰好在中间时选最低位为 0（偶数）", "$2$", "$2$", "$-2$"],
            ["<strong>向 $-\\infty$ 舍入</strong><br/>(Round-Down)", "往更小的方向取", "$1$", "$2$", "$-2$"],
            ["<strong>向 $+\\infty$ 舍入</strong><br/>(Round-Up)", "往更大的方向取", "$2$", "$3$", "$-1$"],
            ["<strong>向 0 截断</strong><br/>(Round-Toward-Zero)", "直接砍掉多余位", "$1$", "$2$", "$-1$"],
          ]
        },
        {
          type: "callout",
          variant: "info",
          text: "IEEE 754 默认舍入模式是向偶数舍入（Round-to-Even）。为什么选这个？在大量运算中统计偏差最小——向 +∞ 和向 -∞ 都有系统偏差，向偶数舍入在中间值时一半向上、一半向下，长期平均趋近于真实值。"
        },
        {
          type: "prose",
          html: "<h3>向偶数舍入的手算演示</h3>"
        },
        {
          type: "prose",
          html: "<p>核心：<strong>不是\"四舍五入\"！</strong>是\"四舍六入五成双\"。碰中间值（.5 / 二进制 .1），看保留的最低有效位——如果是 0（偶数），不变；如果是 1（奇数），向上进位使其变偶数。</p>"
        },
        {
          type: "prose",
          html: "<h4>用数字 225 解释（舍入到十位）</h4>"
        },
        {
          type: "table",
          headers: ["原始数", "十位", "个位", "中间值?", "舍入结果", "说明"],
          rows: [
            ["<strong>221</strong>", "2（偶）", "1（< 5）", "否，偏下", "<strong>220</strong>", "个位 1 < 5，向下到 220"],
            ["<strong>225</strong>", "2（偶）", "5（= 中间）", "是！", "<strong>220</strong>", "十位是偶数 → 保持偶数，选 220"],
            ["<strong>235</strong>", "3（奇）", "5（= 中间）", "是！", "<strong>240</strong>", "十位是奇数 → 进位使变偶数，选 240"],
            ["<strong>229</strong>", "2（偶）", "9（> 5）", "否，偏上", "<strong>230</strong>", "个位 9 > 5，向上到 230"],
          ]
        },
        {
          type: "prose",
          html: "<p><strong>关键：</strong>225 → 220（向下），235 → 240（向上）。两中间值一上一下，统计无偏。四舍五入遇 .5 永远向上 → 正向偏差。</p>"
        },
        {
          type: "prose",
          html: "<h4>二进制向偶数舍入</h4>"
        },
        {
          type: "prose",
          html: "<p>二进制\"中间值\"是保留位后第一位为 1、后面全 0。规则相同：看保留位的最低有效位——0 不变，1 向上（使末位变 0）。</p>"
        },
        {
          type: "math",
          formula: "\\text{例：} 1.00110_2 \\text{ 舍入到小数点后 3 位：}\\;1.001\\;\\text{余}\\;10_2 = 0.5_{10}\\;(\\text{中间}),\\;\\text{末位 }1\\;(\\text{奇数}) \\Rightarrow \\text{向上：} 1.010_2",
          display: true
        },
        {
          type: "callout",
          variant: "danger",
          text: "最常见错误：把\"向偶数舍入\"当成\"四舍五入\"。225 在四舍五入得 230，在向偶数舍入得 220！考试看清题目要求——默认是 IEEE 754 向偶数舍入。"
        },
        {
          type: "prose",
          html: "<h3>int → float 精度损失</h3>"
        },
        {
          type: "prose",
          html: "<p>int 和 float 都是 32 位。但 float 的 32 位中 8 位阶码 + 1 位符号，<strong>只有 23 位尾数</strong>（加隐含位 = 24 位有效精度）。$2^{24} \\approx 16,777,216$。</p>"
        },
        {
          type: "table",
          headers: ["int 绝对值", "转 float 后", "原因"],
          rows: [
            ["$|x| \\leq 2^{24}$（~1677 万）", "<strong>精确</strong>", "24 位有效精度全覆盖"],
            ["$2^{24} < |x| \\leq 2^{31}-1$", "<strong>精度损失！</strong>", "超过 24 位的低位被舍入"],
          ]
        },
        {
          type: "prose",
          html: "<p><strong>判断法：</strong>把 int 转二进制，看首尾 1 距离（有效位数）。$\\leq 24$ 无损，$> 24$ 低位被舍入。</p>"
        },
        {
          type: "code",
          language: "c",
          code: "// 精度损失演示\nint a = 16777216;      // 2^24，24 位有效 → 无损\nint b = 16777217;      // 2^24+1，25 位有效 → 有损！\n\nfloat fa = (float)a;   // 16777216.0  ← 精确\nfloat fb = (float)b;   // 16777216.0  ← 丢失了最低位！\n\nprintf(\"%d\\n\", (int)fa == a);  // 1 (true)\nprintf(\"%d\\n\", (int)fb == b);  // 0 (false)"
        },
        {
          type: "callout",
          variant: "warning",
          text: "常考点：int→float 可能丢精度，int→double（52+1=53 位有效）永不丢精度。反过来 float→int 也可能丢小数部分。考试出代码判断哪些转换丢精度。"
        },
        {
          type: "prose",
          html: "<h3>实战练习（仿 2025 真题格式）</h3>"
        },
        {
          type: "card",
          title: "综合题：舍入 + 类型转换",
          body: `<div class="card">

<p><strong>题目：</strong>阅读以下 C 代码并答题。</p>

<pre><code>#include &lt;stdio.h&gt;

int main() {
    int x = 225;
    int y = 16777217;    // = 2^24 + 1

    float fx = (float)x;
    float fy = (float)y;
    int   z  = (int)fy;

    printf("x=%d, fx=%.0f\\n", x, fx);
    printf("y=%d, fy=%.0f, z=%d\\n", y, fy, z);
    printf("y==z: %d\\n", y == z);
    return 0;
}</code></pre>

<p><strong>(1) (2分)</strong> 整数 225 转为 float 时，尾数需多少位？IEEE 754 默认舍入模式下是否精确？为什么？</p>

<p><strong>(2) (2分)</strong> 变量 y=16777217 转 float 后是否精确？写出 y 的二进制和转 float 后的实际值，指出精度损失发生在哪一位。</p>

</div>`
        },
        {
          type: "details",
          summary: "查看参考答案与评分标准",
          body: `<details><div class="details-body">

<p><strong>(1) 参考答案（2分）：</strong></p>
<p>225 = 128+64+32+1 = $11100001_2 = 1.1100001_2 \\times 2^7$，尾数 7 位，远小于 23 位字段。（0.5分）</p>
<p>因此 225→float <strong>完全精确、无需舍入</strong>。（0.5分）</p>
<p>原因：有效位数 $8 \\leq 24$，float 精度足够。（1分）</p>

<p><strong>(2) 参考答案（2分）：</strong></p>
<p>$y = 2^{24}+1$，二进制 $1\\ 0000\\ 0000\\ 0000\\ 0000\\ 0000\\ 0001_2$。（0.5分）</p>
<p>规格化 $1.00\\ldots 01_2 \\times 2^{24}$，尾数 <strong>25 位</strong>（1位前导1 + 24位小数）。（0.5分）</p>
<p>float 仅 24 位有效精度，最低位（第 25 位）是 1，向偶数舍入后末位为 0 → 截断 → 实际值 $2^{24} = 16777216$。（0.5分）</p>
<p><strong>精度损失发生在第 25 个有效位（原数 bit 0，最低位）。</strong>（0.5分）</p>

<p><strong>扣分点：</strong>未说明隐含前导 1 也算 1 位精度（-0.5）；混淆阶码位宽和尾数位宽（-0.5）；未说明舍入方向（-0.5）。</p>

</div></details>`
        }
      ]
    },
    {
      id: "s5-s5",
      title: "考试怎么考",
      content: [
        {
          type: "prose",
          html: "<h4>题型与分值</h4>"
        },
        {
          type: "table",
          headers: ["题型", "分值", "考查内容"],
          rows: [
            ["简答题 / 填空题", "5~10 分", "补码转换、IEEE 754 字段手算、溢出判断、特殊值含义"],
            ["概念题", "2~4 分", "浮点数为什么有误差、偏置的作用、规格化的目的"],
          ]
        },
        {
          type: "prose",
          html: "<h4>得分点</h4>"
        },
        {
          type: "prose",
          html: "<ul><li><strong>补码转换题：</strong>写清楚\"取反加一\"三步，写出每一步中间结果。跳步容易算错。</li><li><strong>IEEE 754 手算：</strong>S/E/M 三个字段分别列出，格式工整。阶码别忘了加 Bias（单精度 127）。</li><li><strong>溢出判断：</strong>同时给出无符号和补码两种判断，说明依据。</li></ul>"
        },
        {
          type: "prose",
          html: "<h4>5 个常见错误</h4>"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误1：补码求反加一时忘了加 1。取反只是 ~x，-x = ~x+1。只取反不加 1 会差 1。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误2：IEEE 754 计算阶码时忘了加 Bias。比如指数是 3，直接写 E=3（错！）。正确是 E=3+127=130。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误3：规格化后忘了去掉隐藏的前导 1。尾数字段存的是小数点后的部分，不包括那个隐含的 1。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误4：小数转二进制时，乘 2 取整的结果读反了——应该从上往下读（先取的是高位）。比如 0.625 乘 2 取整得到 1、0、1，正确是 .101，不要写成 .110。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误5：符号扩展时，补码不填符号位而填 0。8 位 10000011(-125) 扩展为 16 位，应该是 11111111 10000011，而非 00000000 10000011（后者变成 131）。"
        },
        {
          type: "prose",
          html: "<h4>额外练习：自己算这几个</h4>"
        },
        {
          type: "code",
          language: "",
          code: "（1）把 -58 转成 8 位补码    答案：11000110\n（2）把 0.75 转成 IEEE 754 单精度\n    答案：0x3F400000（S=0, E=01111110, M=100...0）\n（3）8 位补码 10001000 的真值是多少？  答案：-120\n（4）判断溢出：无符号 200+100（8位）？补码 100+50（8位）？\n    答案：无符号溢出（300>255）；补码不溢出（150<127→正溢出？再算：100+50=150，8位补码范围-128~127，150>127→正溢出！）"
        }
      ]
    },
    {
      id: "s5-s6",
      title: "真题演练",
      content: [
        { type: "examQuestions", ids: ["eq-s5-1", "eq-s5-2"] }
      ]
    },
    {
      id: "s5-s7",
      title: "小测验",
      content: [
        {
          type: "quiz",
          ids: ["q-s5-1", "q-s5-2"]
        }
      ]
    }
  ]
};

export default content;
