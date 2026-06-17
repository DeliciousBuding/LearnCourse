import type { Quiz } from '@learncourse/framework/types';

// === 汇编语言基础 ===

// ── 选择题 ──
export const S4_QUIZZES: Quiz[] = [
  {
    id: "q-s4-3",
    moduleId: "s4",
    question: "在AT&T汇编语法中，指令 addl %eax, (%ebx) 的含义是：",
    options: [
      { text: "A. 将 %ebx 指向的内存值加到 %eax 中，结果存入 %eax", isCorrect: false },
      { text: "B. 将 %eax 的值加到 %ebx 指向的内存值中，结果存入该内存地址", isCorrect: true },
      { text: "C. 将 %eax 和 %ebx 的值相加，结果存入 %eax", isCorrect: false },
      { text: "D. 将 %eax 的值加到 %ebx 中，结果存入 %ebx 指向的内存", isCorrect: false },
    ],
    feedbackCorrect: "正确！AT&T语法的核心特征是「源操作数在前，目的操作数在后」。addl %eax, (%ebx) 中 %eax（寄存器）是源操作数，(%ebx)（内存地址，括号表示间接寻址）是目的操作数，因此将 %eax 的值加到内存地址 %ebx 处的数据上，结果写回该内存地址。",
    feedbackWrong: "不对。AT&T语法中操作数顺序为「src, dst」，与Intel语法相反。本题中 %eax 是源操作数（提供加数），(%ebx) 是目的操作数（内存地址，括号表示间接寻址），因此执行的是 M[%ebx] = M[%ebx] + %eax。选项A混淆了操作数方向；选项C忽略了括号（将内存寻址误作寄存器）；选项D混淆了目的操作数的位置。",
    type: "single"
  },
  {
    id: "q-s4-4",
    moduleId: "s4",
    question: "在IA-32/x86架构下，以下AT&T汇编指令中哪一条是<strong>非法</strong>的？",
    options: [
      { text: "A. movl $0x100, (%esp)", isCorrect: false },
      { text: "B. movl (%eax), %ecx", isCorrect: false },
      { text: "C. movl 8(%ebp), 12(%ebp)", isCorrect: true },
      { text: "D. movl %edx, 4(%edi)", isCorrect: false },
    ],
    feedbackCorrect: "正确！x86的mov指令不允许在两个操作数都是内存引用的情况下执行——即不支持「内存到内存」的直接传送。movl 8(%ebp), 12(%ebp) 的源和目的都是内存寻址（分别位于 %ebp+8 和 %ebp+12 处），因此非法。正确的做法是借助一个中间寄存器：movl 8(%ebp), %eax; movl %eax, 12(%ebp)。",
    feedbackWrong: "不对。x86架构中mov指令有一条硬性约束：<strong>不允许两个操作数同时为内存引用</strong>（memory-to-memory）。选项C中源 8(%ebp) 和目的 12(%ebp) 均为内存寻址，因此非法。选项A（立即数→内存）、B（内存→寄存器）、D（寄存器→内存）均合法。若需在内存间传送数据，必须走「内存→寄存器→内存」两步。",
    type: "single"
  },
  {
    id: "q-s4-5",
    moduleId: "s4",
    question: "设 %eax = 0x7FFFFFFF，%ebx = 0x80000000。执行 addl %ebx, %eax 后，以下标志位状态正确的是：",
    options: [
      { text: "A. ZF=0, SF=1, OF=0, CF=0", isCorrect: true },
      { text: "B. ZF=0, SF=1, OF=1, CF=0", isCorrect: false },
      { text: "C. ZF=1, SF=0, OF=0, CF=0", isCorrect: false },
      { text: "D. ZF=0, SF=0, OF=0, CF=1", isCorrect: false },
    ],
    feedbackCorrect: "正确！0x7FFFFFFF（最大正数）+ 0x80000000（最小负数）= 0xFFFFFFFF（即-1）。结果非零故ZF=0；最高位为1故SF=1；正数加负数在符号意义上永不会溢出故OF=0；无进位/借位出第31位故CF=0。注意区分OF（有符号溢出）和CF（无符号进位）的判断条件：同号相加结果异号才置OF，本题两操作数异号故OF必为0。",
    feedbackWrong: "不对。先算结果：0x7FFFFFFF + 0x80000000 = 0xFFFFFFFF。逐项判断：\n① ZF——结果非零，ZF=0；\n② SF——结果的最高位（bit 31）为1，SF=1；\n③ OF——0x7FFFFFFF（正）与0x80000000（负）异号相加，有符号溢出不可能发生，OF=0；\n④ CF——bit 31无进位输出（0x7+0x8=0xF，未产生进位），CF=0。\n综上所述答案为A。常见错误是混淆OF与CF的触发条件（选项B误判OF=1），或忽略结果的符号位（选项D误判SF=0）。",
    type: "single"
  },
  {
    id: "q-s4-6",
    moduleId: "s4",
    question: "设 %eax = 0xFFFFFFFF，%ebx = 0x00000001。执行 cmpl %ebx, %eax 后，以下关于条件跳转的描述正确的是：",
    options: [
      { text: "A. ja 会跳转，jg 不会跳转", isCorrect: true },
      { text: "B. jg 会跳转，ja 不会跳转", isCorrect: false },
      { text: "C. ja 和 jg 都会跳转", isCorrect: false },
      { text: "D. ja 和 jg 都不会跳转", isCorrect: false },
    ],
    feedbackCorrect: "正确！cmpl %ebx, %eax 计算 %eax - %ebx。有符号视角：-1 - 1 = -2（SF=1, OF=0, ZF=0），jg 要求 ZF=0且SF=OF，此处SF≠OF故不跳转。无符号视角：0xFFFFFFFF(4294967295) - 1 = 0xFFFFFFFE(4294967294)，无借位（CF=0）且非零（ZF=0），ja 要求CF=0且ZF=0，条件满足故跳转。此题考察有符号跳转（jg/jl/jge/jle）与无符号跳转（ja/jb/jae/jbe）的本质区别——它们基于相同的标志位但使用不同的组合逻辑。",
    feedbackWrong: "不对。cmpl %ebx, %eax 执行 %eax - %ebx = 0xFFFFFFFF - 0x1 = 0xFFFFFFFE，标志位为 ZF=0, SF=1, OF=0, CF=0。关键区分：\n• ja（jump if above，无符号）：CF=0 AND ZF=0 → 0xFFFFFFFF（4294967295）确实大于0x1（1），故<strong>ja会跳转</strong>。\n• jg（jump if greater，有符号）：ZF=0 AND SF=OF → SF=1, OF=0, 1≠0，故<strong>jg不会跳转</strong>——因为有符号视角下0xFFFFFFFF=-1小于0x1=1。\n答案为A。常见误区是不区分有符号/无符号比较，认为-1>1（选项B）；或认为既然ja跳转则jg也跳转（选项C）。",
    type: "single"
  },
  {
    id: "q-s4-7",
    moduleId: "s4",
    question: "某C函数编译后开头为 pushl %ebp; movl %esp, %ebp; subl $20, %esp，结尾为 leave; ret。假设执行 call 指令进入该函数前 %esp = 0xBF00。执行到 ret 指令后（即返回调用者后），%esp 的值是：",
    options: [
      { text: "A. 0xBEE4", isCorrect: false },
      { text: "B. 0xBEFC", isCorrect: false },
      { text: "C. 0xBF00", isCorrect: true },
      { text: "D. 0xBF04", isCorrect: false },
    ],
    feedbackCorrect: "正确！逐步追踪栈指针变化：\n①call指令将返回地址压栈 → %esp = 0xBEFC\n②pushl %ebp → %esp = 0xBEF8\n③movl %esp, %ebp（%ebp=0xBEF8）\n④subl $20, %esp → %esp = 0xBEE4（分配局部变量）\n⑤leave = movl %ebp, %esp（%esp恢复为0xBEF8）+ popl %ebp（%esp=0xBEFC）\n⑥ret弹出返回地址 → %esp = 0xBF00\n栈完全平衡，%esp回到调用前的值。leave指令等价于撤销栈帧，ret指令弹出返回地址，两步共同恢复调用者的栈环境。",
    feedbackWrong: "不对。逐步追踪：call后%esp=0xBEFC（压入返回地址），pushl %ebp后=0xBEF8，subl $20后=0xBEE4。但leave指令会撤销栈帧：movl %ebp, %esp让%esp恢复到0xBEF8，popl %ebp再+4得0xBEFC。最后ret弹出返回地址再+4，%esp=0xBF00，恰好回到调用前的值。选项A（0xBEE4）忘记了leave指令会恢复%esp；选项B（0xBEFC）忘记了ret还会弹出返回地址；选项D（0xBF04）误以为ret在调用前%esp基础上+4。",
    type: "single"
  },
];