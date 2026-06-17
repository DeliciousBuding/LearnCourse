import type { ModuleContent } from "@learncourse/framework/types";

const content: ModuleContent = {
  meta: { id: "s2", number: 2, title: "信息的位与表示", icon: "Binary", courseware: "02 信息表示.pptx", examRefs: "简答题 ~5分" },
  calloutText: "这章解决什么问题？计算机只认识 0 和 1——理解比特、字节、十六进制，学会二进制/十进制/十六进制互转，是所有后续章节的地基。",
  sections: [
    {
      id: "s2-s1",
      title: "2.1 先理解直觉",
      content: [
        {
          type: "prose",
          html: "<p>你有个台灯，开关只有两档——开或关。如果你有 3 个台灯，排成一排，你可以用\"开开关\"表示\"110\"，用\"关开开\"表示\"011\"。</p>"
        },
        {
          type: "prose",
          html: "<p>计算机就是用这种方式存所有东西的：<strong>每个元器件只记两种状态——有电或没电</strong>。我们管一个状态叫一个 <strong>比特（bit）</strong>，写成 0 或 1。所有数据——整数、小数、文字、图片、视频——最终都是一长串 0 和 1。</p>"
        },
        {
          type: "prose",
          html: "<p>这里有一个非常重要的观念：<strong>同一串 0 和 1，在不同规则下解读，含义完全不同。</strong>比如 <code>01000001</code> 这串比特——按无符号整数读是 65，按 ASCII 字符读是字母 'A'，按指令编码读可能是\"把某寄存器的值加 1\"。意义来自<b>你用什么规则去解释它</b>。</p>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "核心思想：比特没有天然意义，编码规则（上下文）才赋予意义。这也是为什么 int 和 float 虽然都占 4 字节，但同样的 4 个字节可以是很不一样的数字——因为解释规则不同。"
        }
      ]
    },
    {
      id: "s2-s2",
      title: "2.2 核心概念：比特、字节与地址",
      content: [
        {
          type: "prose",
          html: "<h4>比特是什么？</h4>"
        },
        {
          type: "prose",
          html: "<p>比特（bit）是信息的最小单位，只能存 0 或 1。英文 bit 是 <strong>bi</strong>nary digi<strong>t</strong> 的缩写。</p>"
        },
        {
          type: "prose",
          html: "<h4>字节是什么？</h4>"
        },
        {
          type: "prose",
          html: "<p>字节（byte）通常是 <strong>8 个比特</strong>的一组。为什么是 8？历史惯例——8 比特正好够表示 256 种不同值（$2^8 = 256$），够覆盖英文字母、数字和常见符号。现代系统的内存地址<b>按字节编号</b>——地址 N 和地址 N+1 之间恰好差一个字节。</p>"
        },
        {
          type: "mermaid",
          id: "byte-diagram",
          chart: `graph LR
    subgraph "一个字节（1 Byte = 8 bits）"
        direction LR
        B7["b₇<br/>0/1<br/>最高位<br/>MSB"]
        B6["b₆<br/>0/1"]
        B5["b₅<br/>0/1"]
        B4["b₄<br/>0/1"]
        B3["b₃<br/>0/1"]
        B2["b₂<br/>0/1"]
        B1["b₁<br/>0/1"]
        B0["b₀<br/>0/1<br/>最低位<br/>LSB"]
    end
    B7 -->|"值 = 128"| B8["2⁷"]
    B6 -->|"值 = 64"| B9["2⁶"]
    B5 -->|"值 = 32"| B10["2⁵"]
    B4 -->|"值 = 16"| B11["2⁴"]
    B3 -->|"值 = 8"| B12["2³"]
    B2 -->|"值 = 4"| B13["2²"]
    B1 -->|"值 = 2"| B14["2¹"]
    B0 -->|"值 = 1"| B15["2⁰"]`
        },
        {
          type: "prose",
          html: "<p>上图是一个字节的 8 个比特。最左边叫<b>最高有效位（MSB）</b>，权值是 $2^7 = 128$；最右边叫<b>最低有效位（LSB）</b>，权值是 $2^0 = 1$。从左到右权值依次是 128、64、32、16、8、4、2、1。</p>"
        },
        {
          type: "card",
          title: "常用单位换算",
          body: `<div class="card">
<table>
<tbody><tr><th>单位</th><th>等于</th><th>备注</th></tr>
<tr><td>1 byte</td><td>8 bits</td><td>基本单位</td></tr>
<tr><td>1 KB (千字节)</td><td>$2^{10} = 1024$ bytes</td><td>不是 1000！</td></tr>
<tr><td>1 MB (兆字节)</td><td>$2^{20} = 1,048,576$ bytes</td><td>~$10^6$</td></tr>
<tr><td>1 GB (吉字节)</td><td>$2^{30}$ bytes</td><td>~$10^9$</td></tr>
<tr><td>1 TB (太字节)</td><td>$2^{40}$ bytes</td><td>~$10^{12}$</td></tr>
</tbody></table>
<p style="margin-top:8px;">注意：硬件厂商有时用 10 进制（1KB=1000），这是硬盘"买 1TB 只有 931GB"的原因。</p>
</div>`
        },
        {
          type: "prose",
          html: "<h4>地址按字节编号</h4>"
        },
        {
          type: "prose",
          html: "<p>内存中每个字节都有自己的\"门牌号\"——地址。地址 0 是第 1 个字节，地址 1 是第 2 个字节。如果一个 int 占 4 个字节地址 0~3，下一个数据的地址从 4 开始。</p>"
        }
      ]
    },
    {
      id: "s2-s3",
      title: "2.3 十六进制——二进制的\"缩写版\"",
      content: [
        {
          type: "prose",
          html: "<p>二进制写出来太长了：32 位地址要写 32 个 0 和 1，眼睛都花了。<strong>十六进制就是来救场的</strong>——<strong>1 个十六进制位正好对应 4 个二进制位</strong>。这是天作之合。</p>"
        },
        {
          type: "card",
          title: "十六进制数字对照表",
          body: `<div class="card">
<table>
<tbody><tr><th>十六进制</th><th>二进制</th><th>十进制</th><th>十六进制</th><th>二进制</th><th>十进制</th></tr>
<tr><td><strong>0</strong></td><td>0000</td><td>0</td><td><strong>8</strong></td><td>1000</td><td>8</td></tr>
<tr><td><strong>1</strong></td><td>0001</td><td>1</td><td><strong>9</strong></td><td>1001</td><td>9</td></tr>
<tr><td><strong>2</strong></td><td>0010</td><td>2</td><td><strong>A</strong></td><td>1010</td><td>10</td></tr>
<tr><td><strong>3</strong></td><td>0011</td><td>3</td><td><strong>B</strong></td><td>1011</td><td>11</td></tr>
<tr><td><strong>4</strong></td><td>0100</td><td>4</td><td><strong>C</strong></td><td>1100</td><td>12</td></tr>
<tr><td><strong>5</strong></td><td>0101</td><td>5</td><td><strong>D</strong></td><td>1101</td><td>13</td></tr>
<tr><td><strong>6</strong></td><td>0110</td><td>6</td><td><strong>E</strong></td><td>1110</td><td>14</td></tr>
<tr><td><strong>7</strong></td><td>0111</td><td>7</td><td><strong>F</strong></td><td>1111</td><td>15</td></tr>
</tbody></table>
<p style="margin-top:8px;">前缀 <code>0x</code> 表示十六进制（如 <code>0x3F</code>），<code>0b</code> 表示二进制（如 <code>0b00111111</code>）。无前缀的数字是十进制。</p>
</div>`
        },
        {
          type: "prose",
          html: "<h4>十六进制 ↔ 二进制：看一眼就能转</h4>"
        },
        {
          type: "prose",
          html: "<p>因为 1 个十六进制位 = 4 个二进制位，转换就是<b>四位一组</b>地拆分或合并。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>例 1：二进制 → 十六进制</strong><br/>把 <code>1101 0110</code> 转成十六进制：</p>"
        },
        {
          type: "prose",
          html: "<ol><li>从右向左，4 位一组：<code>1101</code> 和 <code>0110</code></li><li><code>1101</code> = D（查上表：8+4+0+1=13=D）</li><li><code>0110</code> = 6（查上表：0+4+2+0=6）</li><li>结果：<strong>0xD6</strong></li></ol>"
        },
        {
          type: "prose",
          html: "<p><strong>例 2：十六进制 → 二进制</strong><br/>把 <code>0x3A</code> 转成二进制：</p>"
        },
        {
          type: "prose",
          html: "<ol><li>3 → <code>0011</code>，A → <code>1010</code></li><li>合并：<strong><code>0011 1010</code></strong></li></ol>"
        },
        {
          type: "prose",
          html: "<p>注意：不够 4 位时左边补 0。比如 <code>0xA</code> = <code>1010</code>（不是 <code>101</code>）。</p>"
        }
      ]
    },
    {
      id: "s2-s4",
      title: "2.4 二进制 ↔ 十进制互转",
      content: [
        {
          type: "prose",
          html: "<h4>二进制 → 十进制：按权展开求和</h4>"
        },
        {
          type: "prose",
          html: "<p>每一位二进制数，从右向左，权值依次是 $2^0, 2^1, 2^2, ...$。把\"这一位是否为 1 × 这一位的权值\"加起来。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>例：</strong>$1011_2$ = ?</p>"
        },
        {
          type: "prose",
          html: "<table><tr><td>第 3 位：</td><td>$1 \\times 2^3$</td><td>= 8</td></tr><tr><td>第 2 位：</td><td>$0 \\times 2^2$</td><td>= 0</td></tr><tr><td>第 1 位：</td><td>$1 \\times 2^1$</td><td>= 2</td></tr><tr><td>第 0 位：</td><td>$1 \\times 2^0$</td><td>= 1</td></tr><tr><td colspan=\"2\"><strong>加起来：</strong></td><td><strong>8 + 0 + 2 + 1 = 11</strong></td></tr></table>"
        },
        {
          type: "prose",
          html: "<p>所以 $1011_2 = 11_{10}$。</p>"
        },
        {
          type: "prose",
          html: "<h4>十进制 → 二进制：除 2 取余法</h4>"
        },
        {
          type: "prose",
          html: "<p>不停地除以 2，记录每次的余数（0 或 1），直到商为 0。然后<b>从下往上</b>（从最后一个余数到第一个余数）读。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>例：</strong>$25_{10}$ = ?</p>"
        },
        {
          type: "prose",
          html: "<table><tr><td>25 ÷ 2 = 12</td><td>余 <strong>1</strong></td><td>← 最低位 (LSB)</td></tr><tr><td>12 ÷ 2 = 6</td><td>余 <strong>0</strong></td><td></td></tr><tr><td>6 ÷ 2 = 3</td><td>余 <strong>0</strong></td><td></td></tr><tr><td>3 ÷ 2 = 1</td><td>余 <strong>1</strong></td><td></td></tr><tr><td>1 ÷ 2 = 0</td><td>余 <strong>1</strong></td><td>← 最高位 (MSB)</td></tr></table>"
        },
        {
          type: "prose",
          html: "<p>从下往上读余数：<strong>11001</strong>。所以 $25_{10} = 11001_2$。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>验证：</strong>$1\\times 16 + 1\\times 8 + 0\\times 4 + 0\\times 2 + 1\\times 1 = 16+8+0+0+1 = 25$。正确！</p>"
        }
      ]
    },
    {
      id: "s2-s5",
      title: "2.5 十进制 ↔ 十六进制互转",
      content: [
        {
          type: "prose",
          html: "<h4>方法一：经过二进制中转（推荐！）</h4>"
        },
        {
          type: "prose",
          html: "<p>十进制 → 二进制（除 2 取余）→ 四位一组 → 十六进制。这个路径最不容易出错。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>例：</strong>$173_{10}$ = ?</p>"
        },
        {
          type: "prose",
          html: "<ol><li>$173_{10}$ → 二进制：$10101101_2$</li><li>四位一组：<code>1010 1101</code></li><li><code>1010</code> = A，<code>1101</code> = D</li><li>结果：<strong>0xAD</strong></li></ol>"
        },
        {
          type: "prose",
          html: "<h4>方法二：除 16 取余法</h4>"
        },
        {
          type: "prose",
          html: "<p>和二进制一样，只不过改为除以 16。余数 10~15 分别对应 A~F。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>例：</strong>$173_{10}$ = ?</p>"
        },
        {
          type: "prose",
          html: "<table><tr><td>173 ÷ 16 = 10</td><td>余 <strong>13 = D</strong></td><td>← 最低位</td></tr><tr><td>10 ÷ 16 = 0</td><td>余 <strong>10 = A</strong></td><td>← 最高位</td></tr></table>"
        },
        {
          type: "prose",
          html: "<p>从下往上：<strong>0xAD</strong>。两种方法结果一致。</p>"
        },
        {
          type: "prose",
          html: "<h4>十六进制 → 十进制</h4>"
        },
        {
          type: "prose",
          html: "<p>按权展开：每位乘以 $16^n$。例如 $0xAD = A \\times 16^1 + D \\times 16^0 = 10 \\times 16 + 13 \\times 1 = 160 + 13 = 173$。</p>"
        }
      ]
    },
    {
      id: "s2-s6",
      title: "2.6 大小端——多字节数据怎么排列？",
      content: [
        {
          type: "prose",
          html: "<p>一个 int 占 4 个字节。这 4 个字节在内存中是按\"低位字节在前\"还是\"高位字节在前\"排列？这就是大小端问题。</p>"
        },
        {
          type: "card",
          title: "大小端对比（以 0x12345678 为例）",
          body: `<div class="card">
<table>
<tbody><tr><th>存储方式</th><th>地址 0</th><th>地址 1</th><th>地址 2</th><th>地址 3</th><th>谁用</th></tr>
<tr><td><strong>小端 Little Endian</strong></td><td>0x78</td><td>0x56</td><td>0x34</td><td>0x12</td><td>x86（你的笔记本）、大多数 ARM</td></tr>
<tr><td><strong>大端 Big Endian</strong></td><td>0x12</td><td>0x34</td><td>0x56</td><td>0x78</td><td>网络字节序、部分嵌入式</td></tr>
</tbody></table>
<p style="margin-top:8px;">记忆技巧：<strong>小端 = 小头在前</strong>——最低有效字节（0x78）放在最低地址。大端 = 大头在前——最高有效字节（0x12）放在最低地址。</p>
</div>`
        },
        {
          type: "callout",
          variant: "warning",
          text: "易错：看内存 dump 时一定要确认大小端，否则会把 0x12345678 读成 0x78563412。同一台机器内部一致所以不影响程序运行，但网络传输和跨平台数据交换时要注意。"
        }
      ]
    },
    {
      id: "s2-s6b",
      title: "2.X 类型双关（Type Punning）",
      content: [
        {
          type: "prose",
          html: "<p>前面的核心观念说\"同一串 0 和 1，在不同规则下解读，含义完全不同\"——这一节用最尖锐的方式验证这个观念：<strong>把一种类型的二进制比特，用另一种类型的规则去解读</strong>。</p>"
        },
        {
          type: "prose",
          html: "<h3>reinterpret cast：同样的比特，不同的数字</h3>"
        },
        {
          type: "prose",
          html: "<p>C 语言中，如果你有一个 float 变量，你可以用指针强制转换，把它的 32 个比特原封不动地读成一个 int。这种操作叫<strong>类型双关（Type Punning）</strong>——同一块内存，换一双\"眼睛\"来看。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>核心语义：</strong>二进制比特完全不变，但解释规则变了。float 按 IEEE 754 规则解读（S+E+M），int 按补码规则解读（$B2T$ 权值法）。结果天差地别。</p>"
        },
        {
          type: "prose",
          html: "<h3>经典例子：float f = -1; 读成 int 是多少？</h3>"
        },
        {
          type: "code",
          language: "c",
          code: "float f = -1.0f;\nint *pi = (int *)&f;   // 把 f 的地址当成 int* 来看\nint  i = *pi;          // 读出那 4 个字节，按 int 规则解释\n\nprintf(\"f = %f\\n\", f);  // f = -1.000000\nprintf(\"i = %d\\n\", i);  // i = -1082130432  ← 完全不是 -1！"
        },
        {
          type: "prose",
          html: "<p><strong>手算过程：</strong></p>"
        },
        {
          type: "prose",
          html: "<p>-1.0 的 IEEE 754 单精度表示（前面 S5 的算法）：</p>"
        },
        {
          type: "math",
          formula: "-1.0 = (-1)^1 \\times 1.0 \\times 2^0",
          display: true
        },
        {
          type: "prose",
          html: "<p>S=1，指数=0 → E=0+127=127=$(01111111)_2$，尾数=1.0 → frac=全 0。拼起来：</p>"
        },
        {
          type: "math",
          formula: "1\\;01111111\\;00000000000000000000000_2 = 0xBF800000",
          display: true
        },
        {
          type: "prose",
          html: "<p>现在把 <code>0xBF800000</code> 按 int（补码）解读。最高位是 1 → 负数。用权值法：</p>"
        },
        {
          type: "math",
          formula: "B2T_{32}(0xBF800000) = -2^{31} + (2^{29} + 2^{28} + 2^{27} + 2^{26} + 2^{25} + 2^{24} + 2^{23}) = -2,147,483,648 + 1,065,353,216 = -1,082,130,432",
          display: true
        },
        {
          type: "prose",
          html: "<p>所以 $f = -1.0$，但 $i = -1082130432$。比特完全一样（都是 <code>0xBF800000</code>），只是解读方式不同。这就是类型双关的本质。</p>"
        },
        {
          type: "prose",
          html: "<h3>Union 方式实现类型双关</h3>"
        },
        {
          type: "prose",
          html: "<p>除了指针强转，C 语言还可以用 union 来实现类型双关——所有成员共享同一块内存。</p>"
        },
        {
          type: "code",
          language: "c",
          code: "union FloatInt {\n    float f;\n    int   i;\n};\n\nunion FloatInt u;\nu.f = -1.0f;\nprintf(\"u.f = %f\\n\", u.f);  // -1.000000\nprintf(\"u.i = %d\\n\", u.i);  // -1082130432（同上）\n// u.f 和 u.i 共享 4 个字节，写入 float 后用 int 读"
        },
        {
          type: "prose",
          html: "<p>Union 方式的优点是不需要指针转换，语义更清晰：\"这块内存有两种看法\"。考试可能出 union 代码让你分析输出。</p>"
        },
        {
          type: "callout",
          variant: "warning",
          text: "指针强转方式 <code>*(int*)&f</code> 在现代 C 标准中严格来说违反 strict aliasing 规则（可能引发未定义行为）。Union 方式是标准允许的。考试侧重概念理解——\"同样的比特不同的解释\"——不深究未定义行为细节。"
        },
        {
          type: "prose",
          html: "<h3>类型双关 vs 类型转换（cast）</h3>"
        },
        {
          type: "table",
          headers: ["对比", "类型双关 (type punning)", "类型转换 (type cast)"],
          rows: [
            ["<strong>操作</strong>", "把比特原样读出，换规则解释", "把值按新类型的规则重新计算"],
            ["<strong>比特变了吗</strong>", "<strong>不变</strong>", "<strong>变了！</strong>bit pattern 完全不同"],
            ["<strong>例子</strong>", "<code>*(int*)&f</code>", "<code>(int)f</code>"],
            ["<strong>float -1.0 的结果</strong>", "<code>-1082130432</code>（荒谬）", "<code>-1</code>（语义正确）"],
          ]
        },
        {
          type: "callout",
          variant: "tip",
          text: "记忆法：<strong>类型双关 = 戴不同的眼镜看同一张纸</strong>（纸上的字没变，但解读方式变了）；<strong>类型转换 = 把纸上的内容翻译成另一种语言</strong>（内容被重新表达了）。"
        },
        {
          type: "prose",
          html: "<h3>实战练习（仿 2025 真题格式）</h3>"
        },
        {
          type: "card",
          title: "类型双关分析题",
          body: `<div class="card">

<p><strong>题目：</strong>已知 IEEE 754 单精度浮点数 <code>0xBF800000</code> 存入内存。</p>

<p><strong>(1) (1.5分)</strong> 若按 float 解读，值是多少？写出 S、E、frac 各字段并代入公式。</p>

<p><strong>(2) (1.5分)</strong> 若按 int（32 位补码）解读，值是多少？写出计算过程。</p>

<p><strong>(3) (加分)</strong> 写一段 C 代码，用 union 验证上述两种解读，并解释为什么同一个 32 位模式能产生两个完全不同的值。</p>

</div>`
        },
        {
          type: "details",
          summary: "查看参考答案与评分标准",
          body: `<details><div class="details-body">

<p><strong>(1) 参考答案（1.5分）：</strong></p>
<p><code>0xBF800000 = 1 01111111 00000000000000000000000</code>（0.5分）</p>
<p>S=1（负），E=01111111=127，指数=127-127=0，frac=全0，尾数 M=1.0（隐含1）。（0.5分）</p>
<p>$V = (-1)^1 \\times 1.0 \\times 2^0 = -1.0$。（0.5分）</p>

<p><strong>(2) 参考答案（1.5分）：</strong></p>
<p>按补码 $B2T_{32}$，最高位 1 → 负数。（0.5分）</p>
<p>$\\text{值} = -2^{31} + (2^{29}+2^{28}+2^{27}+2^{26}+2^{25}+2^{24}+2^{23})$（0.5分）</p>
<p>$= -2147483648 + 1065353216 = -1082130432$。（0.5分）</p>

<p><strong>(3) 加分参考答案：</strong></p>
<pre><code>union FloatInt { float f; int i; } u;
u.f = -1.0f;  // 或直接 u.i = 0xBF800000;
printf("float: %f, int: %d\\n", u.f, u.i);</code></pre>
<p>解释：同一块 4 字节内存，比特模式固定为 0xBF800000。float 解读遵照 IEEE 754 公式得 -1.0，int 解读遵照补码权值法得 -1082130432。值不同是因为解释规则不同，而非比特不同——这是\"信息就是位+上下文\"的核心体现。</p>

</div></details>`
        }
      ]
    },
    {
      id: "s2-s7",
      title: "2.7 动手试试：手算转换练习",
      content: [
        {
          type: "prose",
          html: "<p>下面 6 道题，建议拿纸笔一步步算。不要跳步——你在建立\"机器的思维方式\"，这是后面所有章节的基础。</p>"
        },
        {
          type: "card",
          title: "练习 1：二进制 → 十进制",
          body: "<p>$10101100_2 = ?_{10}$</p>"
        },
        {
          type: "details",
          summary: "查看解答",
          body: "<details><div class=\"details-body\"><p>$1\\times 128 + 0\\times 64 + 1\\times 32 + 0\\times 16 + 1\\times 8 + 1\\times 4 + 0\\times 2 + 0\\times 1$</p><p>$= 128 + 0 + 32 + 0 + 8 + 4 + 0 + 0$</p><p>$= \\mathbf{172}$</p></div></details>"
        },
        {
          type: "card",
          title: "练习 2：十进制 → 二进制",
          body: "<p>$94_{10} = ?_2$</p>"
        },
        {
          type: "details",
          summary: "查看解答",
          body: "<details><div class=\"details-body\"><p>94÷2=47余0，47÷2=23余1，23÷2=11余1，11÷2=5余1，5÷2=2余1，2÷2=1余0，1÷2=0余1</p><p>从下往上：<strong>1011110</strong></p><p>验证：64+0+16+8+4+2+0 = 94 ✓</p></div></details>"
        },
        {
          type: "card",
          title: "练习 3：二进制 → 十六进制",
          body: "<p>$1110 0101_2 = 0x?$</p>"
        },
        {
          type: "details",
          summary: "查看解答",
          body: "<details><div class=\"details-body\"><p>1110 = 8+4+2+0 = 14 = <strong>E</strong></p><p>0101 = 0+4+0+1 = 5 = <strong>5</strong></p><p>结果：<strong>0xE5</strong></p></div></details>"
        },
        {
          type: "card",
          title: "练习 4：十六进制 → 二进制",
          body: "<p>$0x3C7 = ?_2$</p>"
        },
        {
          type: "details",
          summary: "查看解答",
          body: "<details><div class=\"details-body\"><p>3 → 0011，C → 1100，7 → 0111</p><p>合并：<strong>0011 1100 0111</strong>（即 1111000111）</p></div></details>"
        },
        {
          type: "card",
          title: "练习 5：十进制 → 十六进制",
          body: "<p>$255_{10} = 0x?$</p>"
        },
        {
          type: "details",
          summary: "查看解答",
          body: "<details><div class=\"details-body\"><p>255÷16=15余15，15÷16=0余15</p><p>从下往上：15=F，15=F → <strong>0xFF</strong></p><p>或走二进制：255=11111111=FF ✓</p></div></details>"
        },
        {
          type: "card",
          title: "练习 6：十六进制 → 十进制",
          body: "<p>$0x2F = ?_{10}$</p>"
        },
        {
          type: "details",
          summary: "查看解答",
          body: "<details><div class=\"details-body\"><p>$2 \\times 16^1 + F \\times 16^0 = 2 \\times 16 + 15 \\times 1 = 32 + 15 = \\mathbf{47}$</p></div></details>"
        }
      ]
    },
    {
      id: "s2-s8",
      title: "2.8 考试怎么考",
      content: [
        {
          type: "prose",
          html: "<h4>典型题型</h4>"
        },
        {
          type: "table",
          headers: [],
          rows: [
            ["题型", "分值", "考查内容"],
            ["进制转换填空", "2~4 分", "给一个数，转换成另外两种进制"],
            ["大小端判断", "1~2 分", "给定内存 dump，判断字节序"],
            ["概念简答", "2~3 分", "\"为什么十六进制在系统编程中常用？\""]
          ]
        },
        {
          type: "callout",
          variant: "warning",
          text: "易错：十六进制转换时忘记补前导 0。比如 0xA 转二进制是 1010，但如果在 8 位上下文中应该写成 0000 1010。"
        },
        {
          type: "callout",
          variant: "warning",
          text: "易错：字节和比特混淆。1 byte = 8 bits，$2^{10}$ bytes = 1 KB（不是 1000）。"
        },
        {
          type: "callout",
          variant: "tip",
          text: "考试时进制的计算如果在草稿纸上慢慢推，很容易出错。建议考前把 0~15 的二进制/十六进制/十进制对照表练到秒出。"
        }
      ]
    },
    {
      id: "s2-s9",
      title: "2.9 真题演练",
      content: [
        { type: "examQuestions", ids: ["eq-s2-1", "eq-s2-2"] }
      ]
    },
    {
      id: "s2-s10",
      title: "2.10 小测验",
      content: [
        { type: "quiz", ids: ["q-s2-1", "q-s2-2"] }
      ]
    }
  ]
};

export default content;
