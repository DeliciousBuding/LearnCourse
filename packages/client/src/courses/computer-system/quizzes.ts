import type { Quiz } from 'learncourse/types';

export const QUIZZES: Quiz[] = [
  // ── S1 计算机系统概论 ──
  {
    id: "q-s1-1",
    moduleId: "s1",
    question: "冯·诺依曼架构的核心思想是什么？",
    options: [
      { text: "运算器和控制器必须分开制造", isCorrect: false },
      { text: "程序和数据都存放在同一个存储器中，CPU 逐条取出执行", isCorrect: true },
      { text: "计算机必须使用二进制而非十进制", isCorrect: false },
      { text: "输入设备和输出设备必须共用同一根总线", isCorrect: false }
    ],
    feedbackCorrect: "正确！冯·诺依曼架构的核心就是\"存储程序\"思想——程序代码和数据都存放在同一个存储器（内存）里，CPU 通过程序计数器 PC 一条条取出指令执行。这个设计使得程序可以被当作数据来读取和修改，编译器、调试器、操作系统都是基于这个思想才得以实现。",
    feedbackWrong: "不对。核心是\"存储程序\"——程序和数据都放在内存里，CPU 按 PC 指针逐条取指令执行。选项 A（运算器和控制器分开）不是冯·诺依曼独有；C 和 D 虽然是计算机的特点，但都不是冯·诺依曼架构最核心的创新。记住：冯·诺依曼 = 存储程序。"
  },
  {
    id: "q-s1-2",
    moduleId: "s1",
    question: "冯·诺依曼架构的五大部件不包括以下哪项？",
    options: [
      { text: "运算器 ALU", isCorrect: false },
      { text: "控制器 CU", isCorrect: false },
      { text: "存储器 Memory", isCorrect: false },
      { text: "显卡 GPU", isCorrect: true }
    ],
    feedbackCorrect: "正确！冯·诺依曼五大部件是：运算器（ALU）、控制器（CU）、存储器（Memory）、输入设备（Input）、输出设备（Output）。显卡 GPU 是后来发展的专用设备，不在原始冯·诺依曼五部件中。前两者（运算器+控制器）合称 CPU。",
    feedbackWrong: "不对。冯·诺依曼五部件 = 运算器 + 控制器 + 存储器 + 输入设备 + 输出设备。显卡 GPU 不在其中。记法：运算器算，控制器管，存储器存，输入进，输出出——五个功能正好覆盖一台计算机的所有基本操作。"
  },

  // ── S2 信息的位与表示 ──
  {
    id: "q-s2-1",
    moduleId: "s2",
    question: "将二进制 10110110 转换为十六进制，结果是？",
    options: [
      { text: "0xB5", isCorrect: false },
      { text: "0xB6", isCorrect: true },
      { text: "0xD6", isCorrect: false },
      { text: "0xB8", isCorrect: false }
    ],
    feedbackCorrect: "正确！1011 0110 → 从右向左四位一组：1011 = 8+0+2+1 = 11 = B，0110 = 0+4+2+0 = 6 = 6。所以结果是 0xB6。不要忘记十六进制 A=10, B=11, C=12, D=13, E=14, F=15。",
    feedbackWrong: "不对。10110110 分四组：1011 和 0110。1011 = 8+2+1 = 11 = B，0110 = 4+2 = 6。所以是 0xB6。A 选 B5 是因为把第二组算成了 0101=5；C 选 D6 是把第一组错算成了 1101=13=D；D 选 B8 是二进制加法出错了。"
  },
  {
    id: "q-s2-2",
    moduleId: "s2",
    question: "十进制 218 转换为十六进制，结果是？",
    options: [
      { text: "0xCA", isCorrect: false },
      { text: "0xDA", isCorrect: true },
      { text: "0xDC", isCorrect: false },
      { text: "0xAA", isCorrect: false }
    ],
    feedbackCorrect: "正确！218 ÷ 16 = 13 余 10，13 ÷ 16 = 0 余 13。余数从下往上：13 = D，10 = A → 0xDA。验证：D × 16 + A = 13×16 + 10 = 208 + 10 = 218。也可以走二进制中转：218 → 二进制 → 四位一组 → 十六进制。",
    feedbackWrong: "不对。218 ÷ 16 = 13 余 10（A），13 ÷ 16 = 0 余 13（D）。从下往上读：0xDA。A 选 CA 是错把 218 当成 202（202÷16=12余10=CA）；C 选 DC = 220；D 选 AA = 170。除 16 取余的每一步余数都要算对再转十六进制字母。"
  },

  // ── S3 编译工具链 ──
  {
    id: "q-s3-1",
    moduleId: "s3",
    question: "编译工具链四阶段的正确顺序是？",
    options: [
      { text: "编译 → 预处理 → 汇编 → 链接", isCorrect: false },
      { text: "预处理 → 编译 → 汇编 → 链接", isCorrect: true },
      { text: "汇编 → 编译 → 预处理 → 链接", isCorrect: false },
      { text: "预处理 → 汇编 → 编译 → 链接", isCorrect: false }
    ],
    feedbackCorrect: "正确！四阶段顺序：预处理（cpp，展开宏和头文件，.c→.i）→ 编译（cc1，C翻译成汇编，.i→.s）→ 汇编（as，汇编编码成机器码，.s→.o）→ 链接（ld，拼零件+符号解析+重定位，.o→可执行文件）。记住一句口诀：\"预编译汇链\"——预处理、编译、汇编、链接。",
    feedbackWrong: "不对。正确顺序：预处理→编译→汇编→链接。预处理最前面（先展开#include和宏），链接最后面（把.o文件和库拼成完整程序）。编译和汇编的顺序尤其容易搞反——编译是把C翻成汇编（文本→文本），汇编是把汇编编码成机器码（文本→二进制）。编译在汇编之前。"
  },
  {
    id: "q-s3-2",
    moduleId: "s3",
    question: "关于 .o 文件（目标文件），以下哪个说法正确？",
    options: [
      { text: ".o 文件是文本文件，可以直接用记事本打开阅读", isCorrect: false },
      { text: ".o 文件已经是二进制机器码，可以直接运行", isCorrect: false },
      { text: ".o 文件包含机器指令、符号表和重定位信息，但还不能直接运行", isCorrect: true },
      { text: ".o 文件和 .c 源文件的内容完全相同，只是格式不同", isCorrect: false }
    ],
    feedbackCorrect: "正确！.o 文件是二进制文件，包含机器指令、数据、符号表和重定位信息。但它不能直接运行——因为调用的外部函数（如 printf）的代码还没链进来，内部地址也还没最终确定。必须通过链接器（ld）把多个 .o 文件和库拼起来，完成符号解析和地址重定位后，才得到可执行文件。",
    feedbackWrong: "不对。.o 文件是二进制文件（A错），但不能直接运行（B错）——它缺少地址绑定和外部符号解析。C 是正确的：.o = 机器码 + 符号表 + 重定位信息，这些是链接器的\"原料\"。D 明显错误——.c 是 C 代码文本，.o 是二进制机器码，内容完全不同。"
  },

  // ── S4 汇编语言基础 ──
  {
    id: "q-s4-1",
    moduleId: "s4",
    question: "在 AT&T 汇编语法中，movl 8(%ebp), %eax 的含义是？",
    options: [
      { text: "把 eax 的值写入内存地址 ebp+8", isCorrect: false },
      { text: "把 8 这个立即数加上 ebp 的值后写入 eax", isCorrect: false },
      { text: "把内存地址 ebp+8 处的 4 字节数据读入 eax", isCorrect: true },
      { text: "把 eax 的值复制到 ebp 寄存器中", isCorrect: false }
    ],
    feedbackCorrect: "正确！AT&T 语法 \"movl S, D\" = 从 S 复制到 D。8(%ebp) 是内存地址 = ebp的值 + 8。所以这条指令是从内存地址 (ebp+8) 处读取 4 字节数据，复制到 eax 寄存器。注意括号——有括号就是访问内存。在函数调用中，ebp+8 通常是第一个参数的位置。",
    feedbackWrong: "不对。AT&T 语法是\"源, 目的\"——movl S, D 表示 S→D。8(%ebp) 中的括号表示内存地址（= ebp值+8），所以这是从内存读到寄存器，不是写到内存（A反了）。B 把地址计算当成了加法。D 忽略了括号和偏移。简化记法：有括号 = 访存，\$ = 常量，% = 寄存器。"
  },
  {
    id: "q-s4-2",
    moduleId: "s4",
    question: "x86 IA32 中，%esp 寄存器的专用功能是？",
    options: [
      { text: "存放函数的返回值", isCorrect: false },
      { text: "指向栈顶——永远指向当前栈的最低地址", isCorrect: true },
      { text: "存放循环计数器", isCorrect: false },
      { text: "存放下一条要执行的指令的地址", isCorrect: false }
    ],
    feedbackCorrect: "正确！%esp 是栈指针（Stack Pointer），永远指向栈顶（即栈中当前最低的地址）。push 时 esp 减小（栈向下增长），pop 时 esp 增大。尽量不要手动修改 esp——它由 push/pop/call/ret 自动维护。A 描述的是 %eax（累加器/返回值），C 是 %ecx（计数器），D 是 %eip（指令指针）。",
    feedbackWrong: "不对。%esp = 栈指针，永远指向栈顶。不要把 esp 和 eax（返回值）、ecx（计数器）、eip（下一条指令地址）搞混。8 个通用寄存器各有分工：eax=返回值/累加，ebx=基址，ecx=计数，edx=数据，esi=源指针，edi=目的指针，esp=栈顶，ebp=帧指针。前六个可较自由使用，后两个（esp/ebp）有专门用途不能乱动。"
  }
];

export default QUIZZES;
