import type { Quiz } from '@learncourse/framework/types';

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
,
  // ======================== s5 整数与浮点数 ========================
  {
    id: "q-s5-1",
    moduleId: "s5",
    question: "在32位小端（little-endian）机器上，int32_t变量x存储在内存地址0x100~0x103处，4个字节依次为0xF6, 0xFF, 0xFF, 0xFF。x的十进制值为？",
    options: [
      { text: "-10", isCorrect: true },
      { text: "-9", isCorrect: false },
      { text: "-1610612737", isCorrect: false },
      { text: "-251658241", isCorrect: false },
    ],
    feedbackCorrect: "正确！小端存储低字节在低地址，故32位值为0xFFFFFFF6。补码求值：取反得0x00000009，加1得0x0A=10，故原值为-10。",
    feedbackWrong: "不对。小端存储：地址0x100处是LSB（0xF6），0x103处是MSB（0xFF），拼出0xFFFFFFF6。逐位取反加1：~0xFFFFFFF6 = 0x00000009，+1 = 0x0A = 10，所以负数是-10。注意小端不是简单"反向读"——整数的高位字节在高地址。C选项对应的是把0xF6当作MSB按大端解读的结果。",
    type: "single"
  },
  {
    id: "q-s5-2",
    moduleId: "s5",
    question: "float变量f的IEEE 754单精度十六进制表示为0xC1100000，则f的十进制值最接近？",
    options: [
      { text: "-9.0", isCorrect: true },
      { text: "-8.0", isCorrect: false },
      { text: "-8.5", isCorrect: false },
      { text: "-10.0", isCorrect: false },
    ],
    feedbackCorrect: "正确！0xC1100000 = 1_10000010_00100000000000000000000。符号位=1（负），阶码=10000010₂=130，减bias 127得E=3，尾数=1.001₍₂₎=1+1/8=1.125。值=-1.125×2³=-9.0。",
    feedbackWrong: "不对。先将十六进制转二进制：0xC1100000 = 1 10000010 001000…。符号=1（负），阶码=130-127=3，实际指数为3。尾数隐含1，小数部分001表示1/8，故有效数字为1+0.125=1.125。最终值=-1.125×8=-9.0。常见的错误是把阶码当实际指数（忘了减bias 127），或尾数忘记加隐含的1。",
    type: "single"
  },

  // ======================== s6 程序的机器级表示 ========================
  {
    id: "q-s6-1",
    moduleId: "s6",
    question: "C代码 if (a <= b) c = a + b; else c = a - b; 中a在8(%ebp)、b在12(%ebp)、c在-4(%ebp)。以下IA-32汇编中方框处应填入哪条指令？\n\n  movl 8(%ebp), %eax\n  movl 12(%ebp), %edx\n  cmpl %edx, %eax\n  ____\n  addl %edx, %eax\n  jmp  .L2\n.L1:\n  movl 8(%ebp), %eax\n  subl 12(%ebp), %eax\n.L2:\n  movl %eax, -4(%ebp)",
    options: [
      { text: "jg .L1", isCorrect: true },
      { text: "jle .L1", isCorrect: false },
      { text: "jl .L1", isCorrect: false },
      { text: "jge .L1", isCorrect: false },
    ],
    feedbackCorrect: "正确！cmpl %edx, %eax 计算 a-b 并设标志位。若a<=b为真，应执行addl(if体)；若a>b为假，应跳转到.L1(else体)。因此需要"a>b时跳转"的指令：jg（signed greater）。注意if/else模式中，条件为假时往后跳转。",
    feedbackWrong: "不对。分析关键点：(1) cmpl S2, S1 计算 S1-S2=a-b。(2) 紧接的addl是if体(a<=b时执行)，.L1是else体(a>b时执行)。(3) 因此方框处应在a>b时跳过if体进入else，即jump if greater→jg .L1。jle表示a<=b时跳（方向反了），jl漏掉了a==b的情况，jge是a>=b时跳。注意if条件成立时"执行下一条再jmp越过else"，条件失败时"跳入else"——这与高级语言的直觉恰好相反。",
    type: "single"
  },
  {
    id: "q-s6-2",
    moduleId: "s6",
    question: "数组a[5]={2,4,6,8,10}位于-20(%ebp)，变量i在-24(%ebp)，result在-28(%ebp)。执行以下汇编片段后，result的值为？\n\n  movl $3, -24(%ebp)\n  movl -24(%ebp), %eax\n  leal 0(,%eax,4), %edx\n  leal -20(%ebp), %eax\n  addl %edx, %eax\n  movl (%eax), %eax\n  leal (%eax,%eax,2), %eax\n  movl %eax, -28(%ebp)",
    options: [
      { text: "24", isCorrect: true },
      { text: "16", isCorrect: false },
      { text: "30", isCorrect: false },
      { text: "8", isCorrect: false },
    ],
    feedbackCorrect: "正确！逐条追踪：(1) i=3；(2) edx=i*4=12（leal地址运算）；(3) eax=&a[0]；(4) eax=&a[0]+12=&a[3]；(5) eax=a[3]=8；(6) leal (%eax,%eax,2),%eax = eax+eax×2 = 8+16=24。leal虽是"加载有效地址"指令，但常用它做快速乘法——本题利用S=2的scale factor算3倍。",
    feedbackWrong: "不对。分步追踪寄存器值：(1) movl $3→i=3；(2) eax=3；(3) leal 0(,%eax,4)→edx=3×4=12；(4) leal -20(%ebp)→eax=&a[0]；(5) addl→eax=&a[3]；(6) movl (%eax)→eax=a[3]=8；(7) leal (%eax,%eax,2)→eax=8+8×2=24。注意leal是地址计算指令，不访问内存，它把"基址+变址×scale+偏移"的结果存入目标寄存器。常见的错误是把a[3]误读为6（索引从1起算），或leal的2倍误作+2（S=2表示乘2）。",
    type: "single"
  },

  // ======================== s7 链接 ========================
  {
    id: "q-s7-1",
    moduleId: "s7",
    question: "在IA-32 ELF静态链接中，file1.o中的call指令调用file2.o中定义的函数func。链接器对func符号的重定位类型是？",
    options: [
      { text: "R_386_PC32（PC相对地址重定位）", isCorrect: true },
      { text: "R_386_32（绝对地址重定位）", isCorrect: false },
      { text: "不需要重定位——call的目标在编译时已确定", isCorrect: false },
      { text: "R_386_GOT32（GOT相对重定位，用于动态链接）", isCorrect: false },
    ],
    feedbackCorrect: "正确！x86的call指令编码为E8后跟32位PC相对偏移量（目标地址-下条指令地址）。链接器需用func的最终地址与call下条指令地址的差值填充这4字节，因此使用R_386_PC32。注意：R_386_32用于数据引用的绝对地址重定位（如movl var, %eax中var的地址），而函数调用用的是相对偏移。",
    feedbackWrong: "不对。关键区分：(1) call指令的机器码是E8+32位偏移，这个偏移=目标地址-下条PC，是PC相对的；(2) func在另一个.o中，编译file2.o时编译器不知道func的最终地址，必须由链接器重定位；(3) 因为是PC相对偏移，链接器使用R_386_PC32填入差值。R_386_32用于绝对地址引用（如全局变量地址），R_386_GOT32用于动态链接的GOT表。",
    type: "single"
  },
  {
    id: "q-s7-2",
    moduleId: "s7",
    question: "以下C语言声明在目标文件中分别属于哪个段(节)？\n\nint global_var;           // ①\nstatic int s_var = 5;     // ②\nconst char* msg = \"hello\"; // ③\nvoid foo(void) { }        // ④\n\n描述正确的是：",
    options: [
      { text: "①.bss  ②.data  ③指针msg在.data、字符串\"hello\"在.rodata  ④.text", isCorrect: true },
      { text: "①.data  ②.bss  ③指针msg和\"hello\"均在.rodata  ④.text", isCorrect: false },
      { text: "①.bss  ②.data  ③指针msg和\"hello\"均在.data  ④.text", isCorrect: false },
      { text: "①.data  ②.rodata  ③指针msg在.rodata、\"hello\"在.data  ④.bss", isCorrect: false },
    ],
    feedbackCorrect: "正确！各声明分类依据：(1) 未初始化全局变量global_var→.bss（不占磁盘空间，运行时清零）；(2) 已初始化静态变量s_var→.data；(3) const char* msg是已初始化的指针变量（值=\"hello\"的地址）→.data，而字符串字面量\"hello\"是只读常量→.rodata；(4) 函数体代码→.text。",
    feedbackWrong: "不对。逐项分析：(1) 未初始化的全局变量分配在.bss段（Better Save Space），它不在目标文件中占实际空间，仅在段表中记录大小；(2) 已初始化的static变量进.data，有初始值5；(3) const char* msg中，指针msg本身是可变的（可指向别处），存于.data；它指向的字符串\"hello\"是只读常量，存于.rodata。混淆点在于const修饰的是char而非指针——const char*意味着指向的字符不可改，但指针变量本身不是const；(4) 函数定义在.text段。",
    type: "single"
  },

  // ======================== s8 异常控制流与进程 ========================
  {
    id: "q-s8-1",
    moduleId: "s8",
    question: "按照CS:APP的异常四分类（interrupt/trap/fault/abort），以下配对正确的是？",
    options: [
      { text: "缺页异常(page fault)——Fault；系统调用——Trap；时钟中断——Interrupt；机器检查异常——Abort", isCorrect: true },
      { text: "缺页异常——Trap；系统调用——Fault；时钟中断——Interrupt；机器检查——Abort", isCorrect: false },
      { text: "缺页异常——Abort；系统调用——Interrupt；时钟中断——Trap；机器检查——Fault", isCorrect: false },
      { text: "缺页异常——Fault；系统调用——Interrupt；时钟中断——Trap；机器检查——Abort", isCorrect: false },
    ],
    feedbackCorrect: "正确！四类异常的标志性区别：(1) Fault（故障）：可恢复，处理完后重新执行引发指令——缺页异常是典型（调入页面后重试访存）；(2) Trap（陷阱）：有意触发，返回后执行下一条指令——系统调用int/syscall正是陷阱；(3) Interrupt（中断）：异步，来自外部I/O设备——时钟中断由定时器芯片产生；(4) Abort（终止）：不可恢复的致命错误——机器检查异常（硬件故障）。",
    feedbackWrong: "不对。记住四类异常的核心判别标准：(1) Fault：处理完重试引发指令（缺页、除法错误、对齐错误）；(2) Trap：故意的，返回后执行下一条（系统调用、断点）；(3) Interrupt：异步的，来自处理器外部（I/O设备、时钟）；(4) Abort：无法恢复（硬件致命错误、DRAM的ECC多比特错）。最常见的混淆是把缺页当作Trap——但缺页返回后要重试访存指令而非跳过它。",
    type: "single"
  },
  {
    id: "q-s8-2",
    moduleId: "s8",
    question: "执行以下C程序，总共会打印多少行\"hello\"？\n\nint main() {\n    fork();\n    fork();\n    printf(\"hello\\n\");\n    return 0;\n}",
    options: [
      { text: "4", isCorrect: true },
      { text: "2", isCorrect: false },
      { text: "3", isCorrect: false },
      { text: "8", isCorrect: false },
    ],
    feedbackCorrect: "正确！第一个fork()后进程数变为2（父+子）；第二个fork()时每个进程再fork一次，进程数变为2×2=4。最后每个进程各执行一次printf，共输出4行。一般规律：n次连续fork()产生2ⁿ个进程。",
    feedbackWrong: "不对。用进程树理解：(1) 初始：P0。(2) 第一次fork()：P0→P0+P1，共2个。(3) 第二次fork()：P0 fork出P2，P1 fork出P3，共4个进程。(4) 每个进程执行printf一次，共4行。常见错误：认为printf在fork之前（答案=1）或认为fork()后面的代码只被父进程执行（答案=2），或把子进程再次fork出的数量加倍算错（答案=3或=8）。注意fork()之后父子进程均从fork返回处继续执行。",
    type: "single"
  },

  // ======================== s9 存储层次与Cache ========================
  {
    id: "q-s9-1",
    moduleId: "s9",
    question: "某32位地址系统，Cache容量32KB，采用直接映射（direct-mapped cache），块大小64B。访存地址0x00008040对应的组索引（set index）是多少？",
    options: [
      { text: "1", isCorrect: true },
      { text: "0", isCorrect: false },
      { text: "2", isCorrect: false },
      { text: "4", isCorrect: false },
    ],
    feedbackCorrect: "正确！先算各字段位数：块偏移b=log₂(64)=6；Cache总块数=32KB/64B=512=S（直接映射下组数=块数）；组索引s=log₂(512)=9；标记t=32-9-6=17。地址0x00008040=0b 0000...1000 0000 0100 0000，低6位（块偏移）=0，接下来9位=0 0000 0001=1，故组索引为1。",
    feedbackWrong: "不对。分步计算：(1) 块大小64B→b=log₂(64)=6（低6位）；(2) 块数=32KB/64B=32768/64=512，直接映射下S=512→s=log₂(512)=9（接下来的9位）；(3) 地址0x00008040：低6位=00 0000=0（块偏移），bit[6:14]=0 0000 0001=1（组索引）。容易犯的错误：把块偏移位宽算成8（混淆了字节数和位数），或者直接把地址截断算错。",
    type: "single"
  },
  {
    id: "q-s9-2",
    moduleId: "s9",
    question: "某2路组相联Cache共4个组，采用LRU替换策略。依次访问以下块地址序列：0, 1, 4, 1, 0, 8, 0。该序列的命中率（hit rate）为？",
    options: [
      { text: "3/7", isCorrect: true },
      { text: "4/7", isCorrect: false },
      { text: "2/7", isCorrect: false },
      { text: "5/7", isCorrect: false },
    ],
    feedbackCorrect: "正确！S=4，组索引=块号%4。逐次模拟（LRU顺序从MRU到LRU）：①0(set0)→[0] miss；②1(set1)→[1] miss；③4(set0)→[4,0] miss；④1(set1)→hit（更新MRU）；⑤0(set0)→hit [0,4]；⑥8(set0)→miss，淘汰LRU(4)→[8,0]；⑦0(set0)→hit [0,8]。共3次命中、4次缺失，命中率=3/7。",
    feedbackWrong: "不对。按2路组相联、4组、LRU逐次模拟：(1) 0→set0 [0]，miss；(2) 1→set1 [1]，miss；(3) 4%4=0→set0 [4,0]，miss（0变LRU）；(4) 1%4=1→set1 hit；(5) 0%4=0→set0 hit [0,4]；(6) 8%4=0→set0 miss，淘汰LRU 4，得[8,0]；(7) 0%4=0→set0 hit [0,8]。注意每次命中都会更新LRU序（被命中的块变为MRU），这是LRU的核心。4/7可能是漏记了某次淘汰，5/7可能是把某些冲突缺失误算为命中。",
    type: "single"
  },

  // ======================== s10 虚拟内存 ========================
  {
    id: "q-s10-1",
    moduleId: "s10",
    question: "某系统虚拟地址14位，物理地址14位，页大小64B。当前进程访问VA=0x0548时TLB不命中，查页表得VPN 0x15对应PTE的valid=1、PPN=0x2A。最终物理地址PA为？",
    options: [
      { text: "0xA88", isCorrect: true },
      { text: "0x2A08", isCorrect: false },
      { text: "0x0548（PA=VA，直接映射）", isCorrect: false },
      { text: "0x1548", isCorrect: false },
    ],
    feedbackCorrect: "正确！页大小64B=2⁶→VPO=低6位，VPN=高8位。VA=0x0548：0x0548>>6=0x15=VPN，0x0548&0x3F=0x08=VPO。PPN=0x2A。PA=PPN<<6|VPO=0x2A×64+8=2688+8=2696=0xA88。关键：VPO=PPO（页内偏移不变），只需拼接PPN和VPO。",
    feedbackWrong: "不对。翻译步骤：(1) 页大小64B，VPO=VA的低log₂(64)=6位，VA=0x0548，VPO=0x0548 & 0x3F = 0x08；(2) VPN=VA的高位=0x0548 >> 6 = 0x15；(3) PPN=0x2A；(4) PA=PPN<<6 | VPO = 0x2A0<<2...=0xA80|0x08=0xA88。错误A直接把PPN和VPO当成数字拼接（0x2A和08→0x2A08），但应该是PPN左移6位再加上VPO。错误C和D没理解虚拟地址到物理地址的转换机制。",
    type: "single"
  },
  {
    id: "q-s10-2",
    moduleId: "s10",
    question: "某系统：虚拟地址14位，物理地址14位，页大小64B。TLB有4个组、4路组相联。L1 Cache：直接映射、16个组、块大小4B，使用物理地址索引。VA=0x0208，TLB命中返回PPN=0x0B。该访问在Cache中的组索引（set index）为？",
    options: [
      { text: "2", isCorrect: true },
      { text: "0", isCorrect: false },
      { text: "8", isCorrect: false },
      { text: "5", isCorrect: false },
    ],
    feedbackCorrect: "正确！全链路追踪：(1) VPO=VA&0x3F=0x08，VPN=VA>>6=0x08；(2) TLB命中VPN=8，得PPN=0x0B；(3) PA=PPN<<6|VPO=0x2C0|0x08=0x2C8；(4) Cache：b=log₂(4)=2，s=log₂(16)=4。PA=0x2C8=0b0010 1100 1000，块偏移位[1:0]=00，组索引位[5:2]=0010=2。",
    feedbackWrong: "不对。完整翻译链路：(1) VA=0x0208，分VPN=0x08、VPO=0x08；(2) TLB命中得PPN=0x0B→PA=0x0B×64+8=712=0x2C8；(3) Cache块大小4B→b=2位，16组→s=4位。PA 0x2C8=二进制 00 1011 0010 1000，取bit[5:2]=0010=2。常见错误：直接从VA分位而非PA做Cache索引，或块偏移位宽算错导致组索引位滑动，或TLB翻译这一步跳过直接用VA高位当PPN。记住：Cache用物理地址索引，必须先把VA翻译成PA。",
    type: "single"
  },

  // ======================== s11 性能优化 ========================
  {
    id: "q-s11-1",
    moduleId: "s11",
    question: "对于以下循环（n很大），以下哪项优化组合对提升性能最为有效？\n\nfor (i = 0; i < n; i++)\n    sum += a[i] * b[i];",
    options: [
      { text: "循环展开（如4路展开）+ 多个累加变量打破数据依赖链", isCorrect: true },
      { text: "将a、b声明为volatile，确保每次从内存读取", isCorrect: false },
      { text: "将数组a、b合并为结构体数组 struct { int a; int b; } arr[n]", isCorrect: false },
      { text: "改用递归实现分治求和", isCorrect: false },
    ],
    feedbackCorrect: "正确！此循环瓶颈在于：(1) 标量累加变量sum形成数据依赖链，每次加法必须等上一次完成；(2) 循环开销（i递增+分支判断）在n很大时不可忽略。循环展开减少迭代次数从而减少循环开销；多个累加变量（sum0, sum1, sum2, sum3）打破关键路径上的数据依赖，使乱序执行/流水线能并行发射多条乘法与加法指令。两者配合是CS:APP第5章反复强调的组合优化手法。",
    feedbackWrong: "不对。逐一分析：(1) volatile强制每次从内存读写，禁止寄存器分配和指令重排，反而严重拖慢性能——与优化方向背道而驰。(2) 结构体数组(AoS)将a[i]和b[i]放在相邻位置，对同时访问两个数组有局部性优势，但普通数组分开存放也能被硬件预取有效处理，收益远不如展开+多累加器。(3) 递归分治增加函数调用开销，在简单循环上得不偿失。本题考点来自CS:APP第5.8-5.9节——循环展开和多个累加变量是消除循环开销和数据依赖的经典技法。",
    type: "single"
  },
  {
    id: "q-s11-2",
    moduleId: "s11",
    question: "对于以下循环，设数组a的元素正负号随机均匀分布。以下哪种优化最能有效减少分支预测失败（branch misprediction）？\n\nfor (i = 0; i < n; i++) {\n    if (a[i] > 0)\n        sum += a[i];\n}",
    options: [
      { text: "使用条件传送指令（如cmov）替代条件跳转", isCorrect: true },
      { text: "增加循环展开次数到8路", isCorrect: false },
      { text: "将a声明为register类型", isCorrect: false },
      { text: "逆序遍历数组（i从n-1递减到0）", isCorrect: false },
    ],
    feedbackCorrect: "正确！当a[i]正负随机分布时，if(a[i]>0)的bool结果对分支预测器而言是掷硬币——预测准确率只有约50%，每次误判都触发流水线冲刷（约10-20周期惩罚）。条件传送cmov彻底消除分支：它同时计算两个分支的结果，根据条件选择其中一个写入sum寄存器，不产生控制流分叉，因此完全规避分支预测失败。CS:APP第3.6.6节和第5.11.2节均讨论了这一技巧。",
    feedbackWrong: "不对。核心在于：a[i]正负随机分布导致分支方向无规律可循，分支预测器的准确率趋近50%。分析各选项：(1) 循环展开减少迭代次数但if仍在循环体内，每次迭代仍需分支预测，不解决根因。(2) register只是建议编译器优先放寄存器中，现代编译器已经自动做寄存器分配，且不影响分支行为。(3) 逆序遍历不改变a[i]正负的随机性，分支预测失败率不变。(4) cmov（条件传送）是正确解法——它将控制依赖转化为数据依赖：计算两个可能值，通过条件码选择，消除了分支指令本身。",
    type: "single"
  },

  // ======================== s12 安全攻击与防御 ========================
  {
    id: "q-s12-1",
    moduleId: "s12",
    question: "在32位x86栈帧中局部数组buf[8]位于%ebp-8处（即buf的起始地址=%ebp-8）。若攻击者向buf写入12字节的数据，会覆盖哪些区域？",
    options: [
      { text: "8字节填满buf[8]，另外4字节覆盖保存的%ebp；返回地址（位于%ebp+4）未被覆盖", isCorrect: true },
      { text: "8字节填满buf[8]，另外4字节覆盖返回地址（位于%ebp+4）", isCorrect: false },
      { text: "仅8字节填满buf[8]，不会覆盖任何其他数据", isCorrect: false },
      { text: "12字节全部落入buf内部（buf[8]只用了8字节，剩余4字节溢出到buf后面的padding）", isCorrect: false },
    ],
    feedbackCorrect: "正确！buf从%ebp-8开始向上（高地址方向）填充：buf[0]在%ebp-8、buf[1]在%ebp-7、…、buf[7]在%ebp-1。12字节从buf[0]写到buf[7]（8字节）+地址%ebp到%ebp+3的4字节。栈帧布局：%ebp-8(buf起点)...%ebp-1(buf终点)→%ebp(saved %ebp)→%ebp+4(return addr)。12字节刚好覆盖buf全部8字节+保存的%ebp的4字节，刚好停在返回地址之前。要想覆盖返回地址，至少需要8+4+4=16字节。",
    feedbackWrong: "不对。画栈帧布局：buf起始于%ebp-8向上填充（栈向低地址增长，但数组内部向高地址增长！假设正常写入方向）：buf[0]在%ebp-8，buf[7]在%ebp-1，紧接着%ebp存的是调用者的%ebp值，再往上是返回地址在%ebp+4。12字节覆盖范围=[%ebp-8, %ebp+3]，包含buf全部(8字节)+saved %ebp(4字节)，未触及返回地址。要覆盖返回地址至少需要8（buf）+4（saved %ebp）+4（ret addr的第1字节起）=16字节。关键：数组越界向高地址蔓延，而典型的栈溢出攻击目标是返回地址在%ebp+4处。",
    type: "single"
  },
  {
    id: "q-s12-2",
    moduleId: "s12",
    question: "关于缓冲区溢出防御机制，以下描述正确的是？",
    options: [
      { text: "栈金丝雀（stack canary）在函数返回前检查其值是否被篡改，若被修改则终止程序，用于检测栈溢出攻击", isCorrect: true },
      { text: "NX（No-eXecute）位标记栈页为可执行，使注入的shellcode能正常运行，提高兼容性", isCorrect: false },
      { text: "ASLR（地址空间布局随机化）使每次运行程序时栈地址固定不变，便于调试器附加", isCorrect: false },
      { text: "全局金丝雀值在编译时确定且所有函数共享同一值，永不改变", isCorrect: false },
    ],
    feedbackCorrect: "正确！金丝雀（canary）是函数入口处压入栈的随机值（位于saved %ebp之前），在函数返回前与全局副本比对——若缓冲区溢出覆盖了返回地址则必先踩过金丝雀，比对失败立即abort。正确防御：金丝雀检测溢出+NX禁止栈执行+ASLR随机化地址，三者构成纵深防御。",
    feedbackWrong: "不对。(1) NX（No-eXecute）位的含义是"不可执行"——它标记栈页为不可执行，阻止注入的shellcode运行，而非"设为可执行"。这是最关键的防御之一。(2) ASLR（地址空间布局随机化）恰好相反——每次运行程序时栈、堆、共享库的基址随机变化，使攻击者无法硬编码目标地址。(3) 金丝雀值通常在进程启动时随机生成，且即使在同一进程内，编译器也可能为不同函数使用不同金丝雀值或与额外数据混合（如金丝雀异或返回地址），而非固定值。",
    type: "single"
  },
];

export default QUIZZES;
