import type { ModuleContent } from "learncourse/types";

const content: ModuleContent = {
  meta: { id: "s1", number: 1, title: "计算机系统概论", icon: "Monitor", courseware: "01 概论.pptx", examRefs: "概念题" },
  calloutText: "这章解决什么问题？建立整门课的\"地图\"——理解计算机系统到底是什么、冯诺依曼架构长什么样、这门课在学什么。",
  sections: [
    {
      id: "s1-s1",
      title: "1.1 先理解直觉",
      content: [
        {
          type: "prose",
          html: "<p>你每天用电脑写代码、打游戏、看视频。但你有没想过：你写下的那行 <code>print(\"hello\")</code>，到底是怎么变成屏幕上那几个字的？</p>"
        },
        {
          type: "prose",
          html: "<p>答案是：<strong>一整个系统在协作</strong>。从你敲键盘开始，到 CPU 执行指令、内存搬运数据、硬盘读写文件、显卡渲染画面——每一步都有人在为你干活，只是你看不到。</p>"
        },
        {
          type: "prose",
          html: "<p>这门课就叫\"计算机系统\"，它的核心问题是——<strong>一段程序，到底怎么被机器理解、执行、组织和优化的？</strong>注意，我们不是学怎么造 CPU（那是数电和体系结构课的事），而是站在<b>程序员的角度</b>，理解代码在机器底层到底怎么跑。</p>"
        },
        {
          type: "prose",
          html: "<p>打个比方：你不会造发动机，但你会开车，也想知道踩油门为什么车会加速、为什么会打滑、为什么上坡要减档。这门课就是帮你成为\"懂机箱里面的程序员\"。</p>"
        }
      ]
    },
    {
      id: "s1-s2",
      title: "1.2 核心概念：冯·诺依曼架构",
      content: [
        {
          type: "prose",
          html: "<p>世界上几乎所有现代计算机，都遵循同一个设计蓝图——<strong>冯·诺依曼架构</strong>（1945 年提出）。这个架构用一句话说：<strong>程序和数据都放在同一个存储器里，CPU 一条条取出来执行。</strong></p>"
        },
        {
          type: "mermaid",
          id: "von-neumann",
          chart: `graph TD
    CPU["CPU（中央处理器）<br/>大脑：负责计算和控制"]
    MEM["存储器 Memory<br/>仓库：同时存程序和数据"]
    INPUT["输入设备<br/>键盘、鼠标、传感器"]
    OUTPUT["输出设备<br/>屏幕、打印机、喇叭"]

    CPU -- "1. 取指令 Fetch" --> MEM
    MEM -- "2. 返回指令" --> CPU
    CPU -- "3. 读/写数据" --> MEM
    INPUT -- "数据进入系统" --> MEM
    CPU -- "计算结果" --> OUTPUT`
        },
        {
          type: "card",
          title: "冯·诺依曼架构五大部件",
          body: `<div class="card">
<table>
<tbody><tr><th>部件</th><th>一句话解释</th><th>生活比喻</th></tr>
<tr><td><strong>运算器 ALU</strong></td><td>负责加减乘除、与或非等运算</td><td>计算器</td></tr>
<tr><td><strong>控制器 CU</strong></td><td>决定下一条指令取什么、数据流向哪里</td><td>指挥中心</td></tr>
<tr><td><strong>存储器 Memory</strong></td><td>放程序和数据，CPU 从这里读写</td><td>仓库</td></tr>
<tr><td><strong>输入设备 Input</strong></td><td>把外部信息送入计算机</td><td>眼睛和耳朵</td></tr>
<tr><td><strong>输出设备 Output</strong></td><td>把计算结果展示给外界</td><td>嘴巴和手</td></tr>
</tbody></table>
<p style="margin-top:12px;">运算器+控制器合在一起叫 <strong>CPU</strong>（中央处理器）。</p>
</div>`
        },
        {
          type: "callout",
          variant: "tip",
          text: "核心思想：\"存储程序\"——程序本身也是数据，也存放在存储器里。这意味着你可以写一个程序，去读另一个程序——编译器、调试器、操作系统都是这么做到的。这是计算机科学里最伟大的一个 idea。"
        },
        {
          type: "prose",
          html: "<h4>CPU 内部三大核心部件（往下学汇编必须懂）</h4>"
        },
        {
          type: "table",
          headers: ["部件", "缩写", "作用", "汇编中怎么体现"],
          rows: [
            ["程序计数器", "PC (EIP)", "存放下一条指令的地址。CPU 按它的指示去取指令。", "跳转（jmp/call/ret）就是改 PC 的值"],
            ["寄存器文件", "Registers", "CPU 内部最快的存储单元，用来暂存当前正在操作的数据。", "mov %eax, %ebx 就是在寄存器之间倒数据"],
            ["条件码", "Condition Codes", "记录最近一次运算的结果特征（是正是负？是否为零？是否溢出？）。", "cmp 加 jle 的组合就是靠条件码决定\"跳还是不跳\""]
          ]
        },
        {
          type: "prose",
          html: "<p>这三个部件在后面学汇编的时候会反复出现。先混个眼熟就行。</p>"
        }
      ]
    },
    {
      id: "s1-s3",
      title: "1.3 抽象层次——程序从高到低的\"降落\"",
      content: [
        {
          type: "prose",
          html: "<p>你写的是 C 代码（高级语言），机器执行的是 0 和 1（机器指令）。这两个世界之间，隔了很多层\"抽象\"。每一层都有自己的语言和理解方式。</p>"
        },
        {
          type: "mermaid",
          id: "abstraction-layers",
          chart: `graph TB
    C["C 高级语言<br/>int main() { return 0; }"]
    ASM["汇编语言<br/>movl $0, %eax<br/>ret"]
    BIN["机器指令（二进制）<br/>B8 00 00 00 00 C3"]
    HW["硬件（CPU + 内存 + IO）<br/>电子信号、寄存器、总线"]
    C -->|"编译器翻译"| ASM
    ASM -->|"汇编器编码"| BIN
    BIN -->|"CPU 执行"| HW`
        },
        {
          type: "prose",
          html: "<p>这门课就是沿着这条降落路线，一层一层讲清楚每层到底在干什么。到了期末，你应该能对着任一行 C 代码，画出来它在机器上大概怎么跑。</p>"
        }
      ]
    },
    {
      id: "s1-s4",
      title: "1.4 这门课的\"大地图\"——12 章都在干什么？",
      content: [
        {
          type: "prose",
          html: "<p>这门课 12 章可以分成两条主线：<strong>基础篇</strong>（前 8 章，帮你\"看懂\"机器）和 <strong>进阶篇</strong>（后 4 章，帮你\"用精\"机器）。</p>"
        },
        {
          type: "card",
          title: "基础篇（前 8 章）—— 建立\"看懂机器\"的能力",
          body: `<div class="card">
<table>
<tbody><tr><th>章</th><th>主题</th><th>学什么</th><th>为什么重要</th></tr>
<tr><td>1</td><td>概论</td><td>冯诺依曼架构、抽象层次</td><td>地图，后面所有章的地基</td></tr>
<tr><td>2</td><td>信息的位与表示</td><td>比特、字节、十六进制、大小端</td><td>机器只认 0 和 1，所有\"数据类型\"都是解释出来的</td></tr>
<tr><td>3</td><td>编译工具链</td><td>预处理-编译-汇编-链接四阶段</td><td>理解 .c 怎么变 .exe</td></tr>
<tr><td>4</td><td>汇编语言基础</td><td>寄存器、mov、寻址方式</td><td>机器指令的人可读版本，所有\"程序怎么跑\"的起点</td></tr>
<tr><td>5</td><td>整数与浮点数</td><td>补码、溢出、IEEE 754</td><td>\"int 为什么是 -2147483648~2147483647\"终于有答案了</td></tr>
<tr><td>6</td><td>程序的机器级表示</td><td>栈帧、函数调用、控制流</td><td>为什么递归能工作？为什么局部变量函数返回就没了？</td></tr>
<tr><td>7</td><td>链接</td><td>ELF、符号、重定位</td><td>\#include 的东西怎么和你的 .c 文件拼成一个程序</td></tr>
<tr><td>8</td><td>异常控制流与进程</td><td>中断、信号、fork</td><td>操作系统怎么管理多个程序同时运行</td></tr>
</tbody></table>
</div>`
        },
        {
          type: "card",
          title: "进阶篇（后 4 章）—— 提升\"用精机器\"的能力（高分重点！）",
          body: `<div class="card">
<table>
<tbody><tr><th>章</th><th>主题</th><th>学什么</th><th>考试占比</th></tr>
<tr><td>9</td><td>存储层次与 Cache</td><td>局部性、Cache 命中/缺失、地址分解</td><td>联合大题 25 分</td></tr>
<tr><td>10</td><td>虚拟内存 VM</td><td>页表、地址翻译、TLB</td><td>联合大题 25 分</td></tr>
<tr><td>11</td><td>性能优化</td><td>循环优化、访存模式</td><td>分析题 ~5 分</td></tr>
<tr><td>12</td><td>安全攻击与防御</td><td>缓冲区溢出、返回地址攻击</td><td>概念题 ~3 分</td></tr>
</tbody></table>
</div>`
        },
        {
          type: "callout",
          variant: "warning",
          text: "期末笔试占 35%，其中期中后内容（VM、Cache、异常控制流）约占 50+ 分。基础篇不能放，但时间有限时优先保进阶篇的大分值章（第 9、10 章）。"
        }
      ]
    },
    {
      id: "s1-s5",
      title: "1.5 动手试试：用最简单的 C 程序体验\"全链路\"",
      content: [
        {
          type: "prose",
          html: "<p>写一个最简单的程序，感受一下从 C 代码到执行的全过程。</p>"
        },
        {
          type: "code",
          language: "c",
          code: `/* hello.c —— 最简单的 C 程序 */
#include <stdio.h>

int main() {
    printf("hello, world\\n");
    return 0;
}`
        },
        {
          type: "prose",
          html: "<p>如果你有 Linux 环境（或 WSL），试着在终端里跑几步：</p>"
        },
        {
          type: "code",
          language: "bash",
          code: `gcc -E hello.c -o hello.i   # 1. 预处理：展开 #include、替换宏
gcc -S hello.i -o hello.s   # 2. 编译：C → 汇编
gcc -c hello.s -o hello.o   # 3. 汇编：汇编 → 目标文件
gcc hello.o -o hello        # 4. 链接：拼库函数 → 可执行程序
./hello                     # 5. 运行`
        },
        {
          type: "prose",
          html: "<p><strong>不需要现在全懂每一行。</strong>这个实验只是想让你亲眼看到：一个 <code>.c</code> 文件是经过四步\"变身\"才变成可以双击运行的程序。后面第 3 章会详细讲这四步。</p>"
        }
      ]
    },
    {
      id: "s1-s6",
      title: "1.6 考试怎么考",
      content: [
        {
          type: "prose",
          html: "<h4>题型与分值</h4>"
        },
        {
          type: "table",
          headers: [],
          rows: [
            ["题型", "分值", "考查内容"],
            ["概念题", "2~4 分", "冯诺依曼架构五大部件、存储程序思想"],
            ["简答题", "5 分", "从程序员视角解释计算机系统是什么"]
          ]
        },
        {
          type: "prose",
          html: "<h4>易错点</h4>"
        },
        {
          type: "callout",
          variant: "warning",
          text: "混淆\"运算器\"和\"控制器\"——运算器只管算（加减乘除、与或非），控制器管\"下一步干什么\"。CPU = 运算器 + 控制器。"
        },
        {
          type: "callout",
          variant: "warning",
          text: "以为\"存储程序\"就是\"程序存到硬盘上\"——不是！\"存储程序\"指的是程序运行时和数据一起放在内存里，CPU 按 PC 指针逐条取指令执行。这是冯·诺依曼架构的核心创新。"
        }
      ]
    },
    {
      id: "s1-s7",
      title: "1.7 真题演练",
      content: [
        { type: "examQuestions", ids: ["eq-s1-1", "eq-s1-2"] }
      ]
    },
    {
      id: "s1-s8",
      title: "1.8 小测验",
      content: [
        { type: "quiz", ids: ["q-s1-1", "q-s1-2"] }
      ]
    }
  ]
};

export default content;
