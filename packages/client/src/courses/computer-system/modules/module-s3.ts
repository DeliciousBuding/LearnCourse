import type { ModuleContent } from "@learncourse/framework/types";

const content: ModuleContent = {
  meta: { id: "s3", number: 3, title: "编译工具链与Hello World", icon: "Terminal", courseware: "03 编译工具链.pptx", examRefs: "概念题" },
  calloutText: "这章解决什么问题？你写下的 .c 文件是怎么一步步变成可以双击运行的 .exe 的？理解预处理→编译→汇编→链接四阶段。",
  sections: [
    {
      id: "s3-s1",
      title: "3.1 先理解直觉",
      content: [
        {
          type: "prose",
          html: "<p>你写完一篇英文作文，要把它翻译成中文。你不会直接交给一个只会翻译英文的人然后印成书——你需要好几个步骤。</p>"
        },
        {
          type: "prose",
          html: "<p>首先，把\"引用别人的话\"替换成原文（把 <code>#include</code> 的内容粘过来）。然后，把整篇文章翻译成中文（C 翻译成汇编）。接着，把翻译稿排好版准备印刷（汇编翻译成机器码）。最后，如果文章末尾引用了\"见附录 B\"，你得把附录 B 也印在这本书的最后，并且在文末标明\"附录 B 在第 200 页\"——这就是链接。</p>"
        },
        {
          type: "prose",
          html: "<p>这四个步骤就是编译工具链的全部工作：<strong>预处理 → 编译 → 汇编 → 链接</strong>。每一步都有专门的工具、产生不同的输出文件、丢掉或增加不同的信息。</p>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "学习本章最重要的是记住\"每一步在干什么\"和\"这一步步失了什么抽象，增加了什么信息\"。后面学链接时能不能看懂，全靠这章的地基。"
        }
      ]
    },
    {
      id: "s3-s2",
      title: "3.2 四阶段全流程图",
      content: [
        {
          type: "mermaid",
          id: "compile-flow",
          chart: `flowchart LR
    A["hello.c<br/>C 源文件<br/>（文本）"] -->|"cpp<br/>预处理器"| B["hello.i<br/>预处理后的 C<br/>（文本）"]
    B -->|"cc1<br/>C 编译器"| C["hello.s<br/>汇编代码<br/>（文本）"]
    C -->|"as<br/>汇编器"| D["hello.o<br/>可重定位目标文件<br/>（二进制）"]
    D -->|"ld<br/>链接器<br/>+ libc.a 等库"| E["hello<br/>可执行文件<br/>（二进制）"]
    A -.->|"gcc 一键完成"| E
    A2["#include <stdio.h><br/>宏定义<br/>条件编译"] -.->|"展开"| A
    D2["printf.o<br/>其他 .o 文件<br/>libc.a 库"] -.->|"参与"| D`
        },
        {
          type: "prose",
          html: "<p>注意：gcc 可以一口气完成四步（<code>gcc hello.c -o hello</code>）。但每一步都可以单独运行，分别看到中间产物。下面我们一步步拆开看。</p>"
        }
      ]
    },
    {
      id: "s3-s3",
      title: "3.3 第一步：预处理（Preprocessing）—— 展开所有\"宏\"",
      content: [
        {
          type: "prose",
          html: "<p>预处理器的工作很简单：<strong>把源文件里的\"缩写\"全部展开</strong>。具体做三件事：</p>"
        },
        {
          type: "prose",
          html: "<ol><li><strong>头文件展开</strong>——把 <code>#include</code> 的内容直接\"粘贴\"进来。比如 <code>#include &lt;stdio.h&gt;</code> 会把 stdio.h 的全部内容（几百行）复制到你的文件里。</li><li><strong>宏展开</strong>——把 <code>#define MAX 100</code> 里的 <code>MAX</code> 全部替换成 <code>100</code>。</li><li><strong>条件编译</strong>——根据 <code>#ifdef</code> / <code>#ifndef</code> 决定哪些代码保留、哪些删掉。</li></ol>"
        },
        {
          type: "prose",
          html: "<p><strong>输入/输出：</strong>都是文本文件。.c → .i。.i 仍然是纯 C 代码，只是把所有\"快捷方式\"都展开了。</p>"
        },
        {
          type: "code",
          language: "bash",
          code: `# 只做预处理，查看展开后的代码
gcc -E hello.c -o hello.i
# 或者直接在终端看
gcc -E hello.c | less`
        },
        {
          type: "prose",
          html: "<p>打开 hello.i 你会看到——你写的 5 行代码变成了几百行。因为 stdio.h 里面所有东西都被展开进来了。</p>"
        },
        {
          type: "callout",
          variant: "info",
          text: "预处理器不理解 C 语法！它只是\"文本替换\"。如果你写 #define BEGIN { ，预处理器会忠实地把所有 BEGIN 替换成 {，哪怕这会让代码语法错误。它不会检查。"
        }
      ]
    },
    {
      id: "s3-s4",
      title: "3.4 第二步：编译（Compilation）—— C 翻译成汇编",
      content: [
        {
          type: "prose",
          html: "<p>编译器是工具链里\"最聪明\"的一步。它把 C 语言的<b>高级语义</b>翻译成<b>汇编语言的低级语义</b>。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>这一步做了什么？</strong></p>"
        },
        {
          type: "prose",
          html: "<ul><li>语法分析：检查代码合不合 C 的语法规则</li><li>语义分析：变量的类型对不对？函数调用参数匹不匹配？</li><li>优化：把能省的计算省掉、把不必要的重复去掉</li><li>代码生成：把 C 的每一行翻译成对应的汇编指令</li></ul>"
        },
        {
          type: "prose",
          html: "<p><strong>输入/输出：</strong>文本（预处理后的 C）→ 文本（汇编代码）。.i → .s。</p>"
        },
        {
          type: "code",
          language: "bash",
          code: `# 只做编译，生成汇编代码
gcc -S hello.i -o hello.s
# 或者从 .c 直接生成
gcc -S hello.c -o hello.s`
        },
        {
          type: "prose",
          html: "<p>打开 hello.s，你会看到类似这样的东西：</p>"
        },
        {
          type: "code",
          language: "asm",
          code: `; hello.s 示例（AT&T 语法，x86-64）
        .section    __TEXT,__text
        .globl      _main
_main:
        pushq   %rbp
        movq    %rsp, %rbp
        leaq    L_.str(%rip), %rdi
        callq   _printf
        movl    $0, %eax
        popq    %rbp
        retq`
        },
        {
          type: "prose",
          html: "<p>如果你现在还看不懂这些汇编，没关系！第 4 章会详细讲。现在你只需要知道：<strong>C 代码已经被翻译成\"机器能差不多看懂\"的语言了</strong>。</p>"
        },
        {
          type: "callout",
          variant: "warning",
          text: "编译和汇编是两回事！编译是\"C→汇编\"（翻译语义），汇编是\"汇编→机器码\"（编码成二进制）。很多人把两者混在一起叫\"编译\"，但在系统课里必须分清。"
        }
      ]
    },
    {
      id: "s3-s5",
      title: "3.5 第三步：汇编（Assembly）—— 汇编文本变成机器码",
      content: [
        {
          type: "prose",
          html: "<p>汇编器做的事情很\"机械\"——它把汇编文本里每一条指令，按照 CPU 的编码规则，翻译成对应的二进制机器码。这一步<b>基本不改变语义</b>，只是换了一种表示方式。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>输入/输出：</strong>文本（汇编代码）→ 二进制（可重定位目标文件）。.s → .o。</p>"
        },
        {
          type: "code",
          language: "bash",
          code: `# 汇编，生成目标文件
gcc -c hello.s -o hello.o
# 或从 .c 直接到 .o
gcc -c hello.c -o hello.o`
        },
        {
          type: "prose",
          html: "<p>此时 hello.o 已经是二进制文件了——你用文本编辑器打开会看到乱码。但它<b>还不能直接运行</b>。为什么？因为它里面调用了 printf，但 printf 的代码不在 hello.o 里——它需要和 C 标准库\"拼\"起来。</p>"
        },
        {
          type: "card",
          title: ".o 文件（可重定位目标文件）包含什么？",
          body: `<div class="card">
<table>
<tbody><tr><th>内容</th><th>说明</th></tr>
<tr><td><strong>机器指令</strong></td><td>你的 C 代码编译后的二进制机器码</td></tr>
<tr><td><strong>数据</strong></td><td>全局变量、静态变量的初始值</td></tr>
<tr><td><strong>符号表</strong></td><td>\"我定义了哪些函数/变量\"、\"我需要哪些外部函数/变量\"</td></tr>
<tr><td><strong>重定位信息</strong></td><td>\"哪些地址现在还是空的，等链接时再填\"</td></tr>
</tbody></table>
</div>`
        },
        {
          type: "callout",
          variant: "danger",
          text: "常见错误：以为 .o 文件已经可以执行了。不可以！它缺少地址绑定（重定位）和符号解析（printf 的代码还没链进来）。"
        }
      ]
    },
    {
      id: "s3-s6",
      title: "3.6 第四步：链接（Linking）—— 把所有零件拼成一个完整程序",
      content: [
        {
          type: "prose",
          html: "<p>链接器做两件事：</p>"
        },
        {
          type: "prose",
          html: "<ol><li><strong>符号解析</strong>——你的 hello.o 里调用了 <code>printf</code>，链接器就去找 printf 的代码（在 libc.a 或 libc.so 里），把它\"链\"进来。如果找不到，就报 <code>undefined reference</code> 错误。</li><li><strong>重定位</strong>——每个 .o 文件都是独立编译的，它们不知道自己最终会在内存的哪个位置。链接器把所有 .o 拼起来后，统一\"填\"上正确的地址。</li></ol>"
        },
        {
          type: "code",
          language: "bash",
          code: `# 链接，生成最终可执行文件
gcc hello.o -o hello
# 等价于调用链接器 ld，自动链接 libc`
        },
        {
          type: "mermaid",
          id: "linking-flow",
          chart: `flowchart TD
    subgraph 目标文件
        M["hello.o<br/>main → 调用 printf<br/>printf 地址 = ???"]
        P["printf.o（来自 libc）<br/>定义了 printf 的代码"]
    end
    OUT["hello（可执行文件）<br/>main 里 printf 的地址 → 已填入"]
    M -->|"符号解析：找到 printf"| OUT
    P -->|"重定位：填入正确地址"| OUT`
        },
        {
          type: "prose",
          html: "<p>链接完成后，hello 就是一个完整的可执行程序了。你可以 <code>./hello</code> 运行它。</p>"
        }
      ]
    },
    {
      id: "s3-s7",
      title: "3.7 关于 VSPM / miniCC",
      content: [
        {
          type: "prose",
          html: "<p>课程实验用到的两个工具，简单了解即可：</p>"
        },
        {
          type: "card",
          title: "VSPM（原型机模拟器）",
          body: "<p>一个简化的教学用 CPU 模拟器。和真实 x86 CPU 不完全一样，但它让你<b>手动输入指令、观察寄存器和内存的变化</b>。Lab1 用这个工具帮你建立\"指令到底怎么执行\"的直觉。</p>"
        },
        {
          type: "card",
          title: "miniCC（简易 C 编译器）",
          body: "<p>课程演示用的简化版 C 编译器。功能比 gcc 少很多，但足够展示编译器的核心工作原理。你不需要会写编译器，只需理解它体现了\"C→汇编\"的映射关系。</p>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "考试不要求记 VSPM 的指令格式或 miniCC 的具体实现。理解它们在工具链中的位置即可。"
        }
      ]
    },
    {
      id: "s3-s8",
      title: "3.8 四阶段速查表",
      content: [
        {
          type: "table",
          headers: ["阶段", "工具", "输入", "输出", "做什么", "语义变化"],
          rows: [
            ["预处理", "cpp", "hello.c（文本）", "hello.i（文本）", "展开 #include、宏、条件编译", "无——只是文本替换"],
            ["编译", "cc1", "hello.i（文本）", "hello.s（文本）", "C 语义翻译为汇编语义", "有——高级→低级"],
            ["汇编", "as", "hello.s（文本）", "hello.o（二进制）", "汇编指令编码为机器码", "基本无——只换编码"],
            ["链接", "ld", "hello.o + 库（二进制）", "hello（二进制）", "符号解析 + 重定位，拼成完整程序", "有——从零件到整体"]
          ]
        },
        {
          type: "prose",
          html: "<h4>一句话记忆</h4>"
        },
        {
          type: "prose",
          html: "<ul><li><strong>预处理：</strong>把\"缩写\"展开（文本→文本）</li><li><strong>编译：</strong>把 C 翻译成汇编（文本→文本）</li><li><strong>汇编：</strong>把汇编编码成机器码（文本→二进制）</li><li><strong>链接：</strong>把零件拼成完整程序（二进制→二进制）</li></ul>"
        }
      ]
    },
    {
      id: "s3-s9",
      title: "3.9 考试怎么考",
      content: [
        {
          type: "prose",
          html: "<h4>常见题型</h4>"
        },
        {
          type: "table",
          headers: [],
          rows: [
            ["题型", "分值", "考查内容"],
            ["概念简答", "3~5 分", "请简述编译工具链的四阶段及其输入输出"],
            ["判断/选择", "1~2 分", ".o 文件是否可以直接运行？.i 文件是文本还是二进制？"],
            ["分析题", "与链接合并", "给定一段 C 代码的中间文件，分析其中的符号引用"]
          ]
        },
        {
          type: "callout",
          variant: "warning",
          text: "高频易错：说\"编译就是 gcc\"——不准确。gcc 是\"编译器驱动程序\"，它自动调用了预处理器、编译器、汇编器和链接器。真正的\"编译\"只是 C→汇编那一步。"
        },
        {
          type: "callout",
          variant: "warning",
          text: "高频易错：问\".i 是文本文件吗？\"——是！预处理只做文本替换，输出仍是可读的纯 C 代码。.s 也是文本（汇编代码）。只有 .o 开始才是二进制。"
        }
      ]
    },
    {
      id: "s3-s10",
      title: "3.10 真题演练",
      content: [
        { type: "examQuestions", ids: ["eq-s3-1", "eq-s3-2"] }
      ]
    },
    {
      id: "s3-s11",
      title: "3.11 小测验",
      content: [
        { type: "quiz", ids: ["q-s3-1", "q-s3-2"] }
      ]
    }
  ]
};

export default content;
