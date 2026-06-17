import type { ModuleContent } from "learncourse/types";

const meta = {"id":"s7","number":7,"title":"链接","icon":"Link2","courseware":"07 链接.pptx","examRefs":"分析题 ~10分"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？一堆 .o 文件怎么变成一个能跑的 exe？",
  sections: [
    {
      id: "s7-s1",
      title: "先理解直觉",
      content: [
        {
          type: "prose",
          html: "<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\">课件：第15-18讲 链接 · 分析题 ~10分 · 涵盖 ELF 结构、符号解析（强弱符号）、静态/动态链接</p>"
        },
        {
          type: "prose",
          html: "<p>你现在已经学完了编译器怎么把 C 变成汇编，汇编器怎么把汇编变成 .o 目标文件。但 .o 文件自己还不能跑——为什么？</p>"
        },
        {
          type: "prose",
          html: "<p>想象你在写一个多文件的 C 项目：<code>main.c</code> 里调了 <code>foo()</code> 函数，但 <code>foo()</code> 的定义在 <code>lib.c</code> 里。编译的时候，main.c 被单独编译成 main.o——它只知道\"有个函数叫 foo\"，<strong>但不知道 foo 的实际地址在哪</strong>。链接器（Linker/LD）的任务就是：把所有这些零散的 .o 文件拼起来，把\"名字\"变成\"地址\"。</p>"
        },
        {
          type: "prose",
          html: "<p>打个比方：你是建筑工头，手里一堆设计图纸（.o 文件）。每张图纸上写了\"此处连接管道A\"，但管道A的实际位置在另一张图纸上。你得把所有图纸摊开、对齐、然后在连接处写下准确的坐标——这就是链接。</p>"
        },
        {
          type: "callout",
          variant: "info",
          text: "本章概念为主，计算极少。重点是理解链接器做两件事：① 符号解析——\"这个函数/变量到底在哪\"；② 重定位——\"把地址写对\"。以及强弱符号的冲突规则——这是考试最喜欢挖坑的地方。"
        }
      ]
    },
    {
      id: "s7-s2",
      title: "核心概念：ELF 文件结构",
      content: [
        {
          type: "prose",
          html: "<h3>ELF = Executable and Linkable Format</h3>"
        },
        {
          type: "prose",
          html: "<p>Linux 下目标文件、可执行文件、共享库都用 ELF 格式。它不是\"一种文件\"而是\"一个格式标准\"，三种文件都是 ELF，只是内部结构略有不同。</p>"
        },
        {
          type: "mermaid",
          id: "elf-structure",
          chart: `graph TD
    ELF["ELF Header<br/>描述文件整体信息<br/>（魔数、类型、入口、段表位置）"]
    ELF --> TEXT[".text<br/>代码段（只读）<br/>编译后的机器指令"]
    ELF --> RODATA[".rodata<br/>只读数据<br/>如字符串字面量"]
    ELF --> DATA[".data<br/>已初始化的全局/静态变量<br/>int x = 5; 的 5 就在这里"]
    ELF --> BSS[".bss<br/>未初始化的全局/静态变量<br/>int y; 只记大小，不占磁盘空间"]
    ELF --> SYMTAB[".symtab<br/>符号表<br/>记录所有函数和变量的名字与地址"]
    ELF --> RELTEXT[".rel.text<br/>代码重定位表<br/>记录哪些指令的地址需要修正"]
    ELF --> RELDATA[".rel.data<br/>数据重定位表<br/>记录哪些数据引用的地址需要修正"]
    ELF --> DEBUG[".debug<br/>调试信息<br/>（可选）"]

    style ELF fill:#0f3460,stroke:#0f3460,color:#fff
    style TEXT fill:#fee2e2,stroke:#dc2626
    style DATA fill:#dbeafe,stroke:#2563eb
    style BSS fill:#fef3c7,stroke:#d97706
    style SYMTAB fill:#d1fae5,stroke:#059669`
        },
        {
          type: "prose",
          html: "<h3>各段的要点</h3>"
        },
        {
          type: "table",
          headers: ["段名", "存什么", "考试要点"],
          rows: [
            [".text", "机器码指令", "只读！试图写 .text 会段违例"],
            [".rodata", "只读数据（常量字符串等）", "printf(\"hello\") 的 \"hello\" 在这里"],
            [".data", "已初始化的全局变量", "int x = 42 占用磁盘空间存 42"],
            [".bss", "未初始化的全局变量", "int y; 不占磁盘空间！加载时清零"],
            [".symtab", "符号表", "记录函数名/变量名对应的地址"],
            [".rel.text/.rel.data", "重定位信息", "告诉链接器哪些位置需要修地址"],
          ]
        },
        {
          type: "callout",
          variant: "tip",
          text: ".bss 不占磁盘空间是经典考点。因为未初始化的变量不需要存初始值——加载时直接映射一块全 0 的物理页即可。所以 int arr[1000000] 在 .bss 里只占一条\"大小=4MB\"的记录，不占磁盘空间。但 int arr[1000000] = {1} 因为初始化了，会被放进 .data，实实在在占磁盘空间。"
        },
        {
          type: "prose",
          html: "<h3>三种 ELF 文件类型</h3>"
        },
        {
          type: "table",
          headers: ["类型", "后缀", "可否直接执行", "还需要链接吗"],
          rows: [
            ["<strong>可重定位目标文件</strong>", ".o", "否", "需要——地址还没绑定"],
            ["<strong>可执行文件</strong>", "无后缀 / .exe", "是", "不需要——地址已全部绑定"],
            ["<strong>共享目标文件</strong>", ".so", "否", "动态链接时加载"],
          ]
        }
      ]
    },
    {
      id: "s7-s3",
      title: "★ 链接三阶段——链接器到底干了什么",
      content: [
        {
          type: "prose",
          html: "<h3>阶段 1：符号解析（Symbol Resolution）</h3>"
        },
        {
          type: "prose",
          html: "<p>目标文件 .o 中有两种符号：</p><ul><li><strong>定义（Definition）：</strong>\"这个函数/变量我这里实现了\"——比如你在 foo.c 里写的 <code>int bar() { return 42; }</code></li><li><strong>引用（Reference）：</strong>\"这个函数/变量我用了，但不知道它在哪\"——比如你在 main.c 里写的 <code>extern int g;</code></li></ul>"
        },
        {
          type: "prose",
          html: "<p>链接器扫描所有 .o 文件中的符号表，把每一个引用跟一个定义匹配起来。如果找不到定义，报 <code>undefined reference to 'xxx'</code> ——这就是你熟悉的链接错误。</p>"
        },
        {
          type: "prose",
          html: "<h3>★ 强符号 vs 弱符号 —— 考试深坑</h3>"
        },
        {
          type: "prose",
          html: "<p>C 语言中全局符号分为两种：</p>"
        },
        {
          type: "table",
          headers: ["类型", "条件", "示例"],
          rows: [
            ["<strong>强符号 Strong</strong>", "已初始化的全局变量 + 函数定义", "int x = 5; — 强符号<br/>int func() { ... } — 强符号"],
            ["<strong>弱符号 Weak</strong>", "未初始化的全局变量（不包含函数！）", "int y; — 弱符号<br/>extern int z; — 不是定义，只是引用"],
          ]
        },
        {
          type: "prose",
          html: "<h3>强弱符号冲突的三条规则（背下来！）</h3>"
        },
        {
          type: "card",
          title: "规则 1：多个强符号同名 → 链接错误",
          body: "<div class=\"card\">\n\n<pre><code>// a.c\nint x = 1;    // 强符号\n\n// b.c\nint x = 2;    // 强符号\n\n// 链接报错：multiple definition of 'x'</code></pre>\n<p>两个 .c 文件都有初始化的全局变量 x，编译器不知道选哪个——直接报错。</p>\n</div>"
        },
        {
          type: "card",
          title: "规则 2：一个强 + 多个弱 → 选强的",
          body: "<div class=\"card\">\n\n<pre><code>// a.c\nint x;        // 弱符号（未初始化）\n\n// b.c\nint x = 42;   // 强符号\n\n// 链接后：x = 42（选强的那个）</code></pre>\n<p>弱符号被强的\"覆盖\"了。注意：a.c 中对 x 的引用会指向 b.c 中那个 x=42。</p>\n</div>"
        },
        {
          type: "card",
          title: "规则 3：多个弱符号同名 → 任选一个（不确定！）",
          body: "<div class=\"card\">\n\n<pre><code>// a.c\nint x;        // 弱符号\n\n// b.c\nint x;        // 弱符号\n\n// 链接通过，但选哪个？取决于链接器的实现！</code></pre>\n<p>这是一颗\"定时炸弹\"——两个文件都以为 x 是自己的局部副本，但实际上共享了某个不可预知的选择。行为不确定，极难调试。</p>\n</div>"
        },
        {
          type: "callout",
          variant: "danger",
          text: "考试陷阱：全局变量初始化 vs 未初始化的问题。int x = 0 看起来像\"初始化为 0\"——它是强符号！因为显式写了 = 0。int x; 才是弱符号。区别在于有没有那个等号，不在于值是不是 0。"
        },
        {
          type: "prose",
          html: "<h3>阶段 2：重定位（Relocation）</h3>"
        },
        {
          type: "prose",
          html: "<p>符号解析完毕，链接器知道了每个符号的最终地址。现在要把这些地址\"写进\"代码和数据里。具体来说：</p>"
        },
        {
          type: "prose",
          html: "<ol><li><strong>合并段：</strong>把所有 .o 的 .text 拼成一大块 .text，把所有 .data 拼成一大块 .data。</li><li><strong>分配地址：</strong>给合并后的每个段分配运行时地址（在虚拟地址空间中的位置）。</li><li><strong>修正引用：</strong>遍历 .rel.text 和 .rel.data 重定位表，把每一条\"这里需要填地址\"的记录改成正确的地址值。</li></ol>"
        },
        {
          type: "prose",
          html: "<p>比如在 main.o 中有一条 <code>call foo</code>，编译时不知道 foo 的地址，暂时填了 0。重定位时，链接器知道 foo 在合并后的 .text 段偏移 0x100 处，就把这个 0 改成正确的偏移量。</p>"
        },
        {
          type: "prose",
          html: "<h3>阶段 3：生成可执行文件</h3>"
        },
        {
          type: "prose",
          html: "<p>地址全部修正后，链接器把所有内容按 ELF 可执行文件的格式写出来，设置好入口点（_start 或 main 的地址）。这个文件就可以被加载器（loader）加载运行了。</p>"
        }
      ]
    },
    {
      id: "s7-s3b",
      title: "★ 两种重定位类型：R_386_PC32 vs R_386_32",
      content: [
        {
          type: "prose",
          html: "<p>重定位不是\"把地址填进去\"就完了——<strong>怎么填</strong>取决于引用方式。IA-32（x86 32位）有两种核心重定位类型，考试必考。</p>"
        },
        {
          type: "prose",
          html: "<h3>R_386_PC32：PC 相对寻址</h3>"
        },
        {
          type: "prose",
          html: "<p>用于 <code>call</code>、<code>jmp</code>、<code>jcc</code> 等指令。指令中存的是<strong>偏移量</strong>，不是绝对地址。CPU 执行时：目标地址 = 下条指令地址 + 偏移量。因此链接器填的不是目标地址，而是 <strong>(目标地址 - 下条指令地址)</strong>。</p>"
        },
        {
          type: "math",
          formula: "\\text{重定位值} = S - P + A",
          display: true
        },
        {
          type: "prose",
          html: "<p>其中 <strong>S</strong> = 符号的最终运行时地址（链接后确定的绝对地址），<strong>P</strong> = 重定位位置（被修正的指令/数据所在的地址），<strong>A</strong> = 加数（addend，目标文件中预先填的偏移量，通常是 -4 因为下条指令 = 当前指令地址 + 4）。</p>"
        },
        {
          type: "prose",
          html: "<h4>手算示例</h4>"
        },
        {
          type: "prose",
          html: "<p>假设 main.o 中有一条 <code>call foo</code> 指令，地址在 <code>0x100</code>。编译时不知道 foo 的地址，目标文件中 call 指令的操作数（偏移量）暂填 <code>-4</code>（即 A = -4）。链接后，foo 被分配到 <code>0x500</code>。</p>"
        },
        {
          type: "table",
          headers: ["参数", "值", "说明"],
          rows: [
            ["S", "0x500", "foo 的最终地址"],
            ["P", "0x100", "call 指令所在地址"],
            ["A", "-4", "目标文件中的 addend"],
            ["重定位值", "$0x500 - 0x100 + (-4) = 0x3FC$", "填入 call 指令的偏移量"],
            ["CPU 执行时", "$0x104 + 0x3FC = 0x500$", "下条(0x104) + 偏移(0x3FC) = 目标(0x500) ✓"],
          ]
        },
        {
          type: "callout",
          variant: "tip",
          text: "P 是重定位位置，不是下条指令地址。A（加数）承担了\"从 P 到下条指令\"的调整。在 x86 call 指令中，偏移量是相对于下条指令（call 指令占 5 字节，下条 = P+5），所以 A 通常 = -5 或由目标文件已预填好。考试中 A 的值一般会直接给出。"
        },
        {
          type: "prose",
          html: "<h3>R_386_32：绝对寻址</h3>"
        },
        {
          type: "prose",
          html: "<p>用于数据引用（如全局变量 <code>mov eax, [g]</code> 中的地址 <code>g</code>）。指令/数据中<strong>直接存目标的绝对地址</strong>，不是偏移量。</p>"
        },
        {
          type: "math",
          formula: "\\text{重定位值} = S + A",
          display: true
        },
        {
          type: "prose",
          html: "<p><strong>S</strong> = 符号最终地址，<strong>A</strong> = 加数（目标文件原有的值，通常是 0）。没有 P 参与——因为填的是绝对地址，不需要知道\"谁在引用它\"。</p>"
        },
        {
          type: "prose",
          html: "<h4>手算示例</h4>"
        },
        {
          type: "prose",
          html: "<p>假设指令 <code>mov eax, [g]</code> 要引用全局变量 g，链接后 g 的地址是 <code>0x2000</code>，A=0。则重定位值 = 0x2000 + 0 = <strong>0x2000</strong>，直接填入指令。</p>"
        },
        {
          type: "prose",
          html: "<h3>两种类型对比</h3>"
        },
        {
          type: "table",
          headers: ["对比维度", "R_386_PC32", "R_386_32"],
          rows: [
            ["<strong>全称</strong>", "PC-relative（程序计数器相对）", "Absolute（绝对）"],
            ["<strong>使用场景</strong>", "call/jmp/jcc 等控制转移指令", "数据引用、函数指针赋值"],
            ["<strong>填入的值</strong>", "偏移量 = 目标 - 下条指令", "目标的绝对地址"],
            ["<strong>公式</strong>", "$S - P + A$", "$S + A$"],
            ["<strong>依赖 P（引用位置）</strong>", "是，不同位置偏移不同", "否，与引用位置无关"],
            ["<strong>位置无关代码 (PIC)</strong>", "天然支持（偏移不依赖绝对地址）", "需要额外处理（GOT 表等）"],
          ]
        },
        {
          type: "prose",
          html: "<h3>重定位流程图</h3>"
        },
        {
          type: "mermaid",
          id: "relocation-flow",
          chart: `flowchart TD
    START["链接器扫描 .rel.text / .rel.data"]
    START --> TYPE{"重定位类型"}
    TYPE -->|"R_386_PC32<br/>(call/jmp)"| PC["计算偏移量<br/>offset = S - P + A"]
    TYPE -->|"R_386_32<br/>(数据引用)"| ABS["计算绝对地址<br/>addr = S + A"]
    PC --> WRITE1["写入指令的操作数字段"]
    ABS --> WRITE2["写入数据的地址字段"]
    WRITE1 --> DONE["重定位完成"]
    WRITE2 --> DONE

    style START fill:#0f3460,color:#fff
    style PC fill:#dbeafe,stroke:#2563eb
    style ABS fill:#fef3c7,stroke:#d97706
    style DONE fill:#d1fae5,stroke:#059669`
        },
        {
          type: "prose",
          html: "<h3>实战练习（仿 2025 真题格式）</h3>"
        },
        {
          type: "card",
          title: "重定位计算题",
          body: `<div class="card">

<p><strong>题目：</strong>已知两个源文件通过 gcc 编译链接，链接后各符号地址如下：</p>

<table>
<tbody><tr><th>符号</th><th>地址</th><th>说明</th></tr>
<tr><td>main</td><td>0x08048300</td><td>main 函数入口</td></tr>
<tr><td>foo</td><td>0x08048400</td><td>被调用的函数</td></tr>
<tr><td>g</td><td>0x08049600</td><td>全局变量</td></tr>
</tbody></table>

<p>main.o 中有一条 call foo 指令位于 0x08048350，A = -4。</p>
<p>main.o 中有一条 mov eax, [g] 指令引用 g，A = 0。</p>

<p><strong>(1) (2分)</strong> call foo 指令属于哪种重定位类型？写出重定位后的填入值和 CPU 执行时如何得到 foo 的地址。</p>

<p><strong>(2) (2分)</strong> mov eax, [g] 指令重定位后的填入值是多少？说明计算过程。</p>

<p><strong>预测：</strong>执行 <code>gcc -o prog main.o foo.o</code> 后，程序输出是什么（假设代码逻辑为调用 foo 并打印 g 的值）？</p>

</div>`
        },
        {
          type: "details",
          summary: "查看参考答案与评分标准",
          body: `<details><div class="details-body">

<p><strong>(1) 参考答案（2分）：</strong></p>
<p>call 指令属于 <strong>R_386_PC32</strong>（PC 相对寻址）。（0.5分）</p>
<p>$S = 0x08048400,\\; P = 0x08048350,\\; A = -4$（0.5分）</p>
<p>重定位值 $= S - P + A = 0x08048400 - 0x08048350 + (-4) = 0xB0 - 4 = 0xAC$（0.5分）</p>
<p>CPU 执行：下条指令地址 = P + 指令长度，偏移量 = 0xAC，目标 = 下条 + 偏移 → foo 地址。（0.5分）</p>
<p>（注：x86 call 占 5 字节，下条 = 0x08048355，0x08048355 + 0xAC = 0x08048401——但考试中如果 A = -4 已由编译器预填，则 P 视为引用位置，直接套公式即可，不必纠结指令长度。关键是理解 S-P+A 的含义。）</p>

<p><strong>(2) 参考答案（2分）：</strong></p>
<p>数据引用属于 <strong>R_386_32</strong>（绝对寻址）。（0.5分）</p>
<p>$S = 0x08049600,\\; A = 0$（0.5分）</p>
<p>重定位值 $= S + A = 0x08049600$。（0.5分）</p>
<p>填入指令的地址字段，CPU 直接使用此绝对地址访问 g。（0.5分）</p>

<p><strong>gcc 链接命令：</strong><code>gcc -m32 -o prog main.o foo.o</code>（-m32 指定 32 位模式）（0.5分加分项）</p>
<p>预测输出：取决于代码逻辑，链接器只是把地址绑定正确，不改变程序语义。（0.5分加分项）</p>

</div></details>`
        }
      ]
    },
    {
      id: "s7-s4",
      title: "静态链接 vs 动态链接",
      content: [
        {
          type: "table",
          headers: ["对比维度", "静态链接", "动态链接"],
          rows: [
            ["<strong>链接时机</strong>", "编译时（生成 exe 时就绑定了）", "加载时或运行时"],
            ["<strong>库文件的命运</strong>", "库代码被复制进 exe", "exe 中只留引用，运行时才加载库"],
            ["<strong>exe 大小</strong>", "大（包含了库的全部代码）", "小（库代码不在 exe 里）"],
            ["<strong>库更新后</strong>", "必须重新编译链接整个程序", "替换 .so 文件即可，无需重编译"],
            ["<strong>内存共享</strong>", "每个进程各自一份代码", "多进程可共享同一份 .so 物理页"],
            ["<strong>可移植性</strong>", "exe 是自包含的，拷到哪都能跑", "依赖目标系统有相同版本的 .so"],
            ["<strong>启动速度</strong>", "快（不需要运行时加载库）", "慢一点点（要加载动态库）"],
          ]
        },
        {
          type: "prose",
          html: "<h3>动态链接的工作方式</h3>"
        },
        {
          type: "prose",
          html: "<p>可执行文件里有一个 .interp 段，存了动态链接器（如 /lib/ld-linux.so）的路径。加载 exe 时，内核先加载动态链接器，动态链接器再把需要的 .so 映射到进程的地址空间，然后修正 PLT/GOT 表（程序链接表/全局偏移表）来完成符号绑定。</p>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "考试如果问\"静态和动态链接的优缺点\"，核心一句话：静态链接 = 打包带走（大但独立），动态链接 = 到场再借（小但依赖环境）。举一个生活例子：静态链接是你把工具全装自己包里，动态链接是到一个共享工具箱去取。"
        }
      ]
    },
    {
      id: "s7-s5",
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
            ["简答题 / 分析题", "5~10 分", "ELF 段说明、强弱符号冲突判断、静态/动态链接区别"],
            ["综合题", "10~15 分（2025卷第五大题）", "链接 + 信号 + 优化的综合分析"],
          ]
        },
        {
          type: "prose",
          html: "<h4>高频考题类型</h4>"
        },
        {
          type: "prose",
          html: "<p><strong>类型 1：判断哪个符号胜出</strong></p>"
        },
        {
          type: "code",
          language: "",
          code: "// a.c:  int x = 10;  double y;\n// b.c:  int x;       double y = 3.14;\n// 问：链接后 x 和 y 的值分别是多少？\n\n// 答：x：a.c 强符号(10) vs b.c 弱符号 → 选 a.c 的 → x=10\n//    y：a.c 弱符号 vs b.c 强符号(3.14 double) → 选 b.c 的 → y=3.14"
        },
        {
          type: "prose",
          html: "<p><strong>类型 2：判断是否会出链接错误</strong></p>"
        },
        {
          type: "code",
          language: "",
          code: "// a.c:  int x = 5;  int z = 10;\n// b.c:  int x = 8;  int z;\n// 链接？\n\n// 答：x 有两个强符号（5 和 8）→ 链接错误！multiple definition of 'x'\n//    z 有一个强符号(10) + 一个弱符号 → 选强的 → z=10\n//    但因为 x 导致链接失败，整个程序链不上。"
        },
        {
          type: "prose",
          html: "<p><strong>类型 3：哪些变量在哪个段</strong></p>"
        },
        {
          type: "code",
          language: "c",
          code: "int g1;              // .bss（未初始化）\nint g2 = 0;           // .data（显式初始化为0 = 初始化 = 强符号！）\nint g3 = 42;          // .data\nstatic int s1;        // .bss（static 只是改了作用域，不影响段归属）\nstatic int s2 = 100;  // .data\n\nvoid func() {\n    int local = 1;    // 栈上！不属于任何段\n    static int s3;    // .bss（static局部变量放在全局存储区）\n}"
        },
        {
          type: "callout",
          variant: "warning",
          text: "最容易掉坑：static 局部变量虽然只能在一个函数里访问，但它存在 .data 或 .bss 段（不是栈上！）。注意区分\"变量存在哪里\"和\"变量能被谁访问\"——这是两件事。"
        },
        {
          type: "prose",
          html: "<h4>常见错误</h4>"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误1：int x = 0 当成弱符号。规则是：看有没有等号。int x; 是弱，int x = 0; 和 int x = 5; 一样是强——因为编译器不知道你的 0 是不是\"有意义的初始值\"。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误2：认为链接就是简单地拼接文件。链接的核心是把名字变地址——\"符号解析\"和\"重定位\"必须分别说清楚。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误3：混淆 .bss（不占磁盘空间）和 .data（占磁盘空间）。判断标准：有没有显式初始值。有初始值→.data；无初始值→.bss。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误4：以为静态链接就是\"静态局部变量那种static\"。两个 static 完全无关——static 关键字在 C 里有多种含义，不要跟链接方式混为一谈。"
        }
      ]
    },
    {
      id: "s7-s6",
      title: "真题演练",
      content: [
        { type: "examQuestions", ids: ["eq-s7-1", "eq-s7-2"] }
      ]
    },
    {
      id: "s7-s7",
      title: "小测验",
      content: [
        {
          type: "quiz",
          ids: ["q-s7-1", "q-s7-2"]
        }
      ]
    }
  ]
};

export default content;
