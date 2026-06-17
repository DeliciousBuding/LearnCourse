import type { Quiz } from '@learncourse/framework/types';

// === 程序的机器级表示 ===

// ── 选择题 ──
export const S6_QUIZZES: Quiz[] = [
  {
    id: "q-s6-3",
    moduleId: "s6",
    question: "IA-32系统中，函数 int add(int a, int b) 被调用。进入 add 后执行 push %ebp; movl %esp, %ebp 建立栈帧。此时参数 a 存放在栈帧中的哪个偏移量处？",
    options: [
      { text: "A. 4(%ebp)", isCorrect: false },
      { text: "B. 8(%ebp)", isCorrect: true },
      { text: "C. 12(%ebp)", isCorrect: false },
      { text: "D. -4(%ebp)", isCorrect: false },
    ],
    feedbackCorrect: "正确！在 IA-32 cdecl 调用约定下，调用者将参数从右向左压栈（先 push b 再 push a），然后 call 指令压入返回地址，被调用者压入旧 %ebp。因此栈帧布局为：%ebp→旧%ebp，%ebp+4→返回地址，%ebp+8→参数a（第一个参数，最后压栈，距%ebp最近），%ebp+12→参数b（第二个参数，先压栈，地址更高）。参数a位于8(%ebp)。",
    feedbackWrong: "不对。分析 IA-32 cdecl 调用约定的栈帧构建过程：(1) 调用者从右向左压栈参数：push b → push a → call add。(2) call 指令自动压入返回地址（add 的下一条指令地址）到栈顶。(3) 被调用者执行 push %ebp 保存调用者的帧指针。最终 %ebp+4=返回地址，%ebp+8=参数a（第一个形参，最后被压栈），%ebp+12=参数b（第二个形参，先被压栈）。常见错误：选A是混淆了返回地址与参数的位置（%ebp+4 是返回地址而非参数）；选C是弄反了两个参数与栈偏移的对应关系；选D是混淆了参数区（%ebp正偏移，高地址侧）与局部变量区（%ebp负偏移，低地址侧）。记住口诀：参数在「上」（高地址，正偏移），局部变量在「下」（低地址，负偏移），返回地址夹在%ebp和第一个参数之间。",
    type: "single"
  },
  {
    id: "q-s6-4",
    moduleId: "s6",
    question: "以下两段 IA-32 汇编代码片段（均已省略栈帧建立/销毁指令），分别对应哪种 C 语言控制结构？\n\n片段A：\n  cmpl %edx, %eax\n  jle  .L1\n  ... (代码块A1)\n  jmp  .L2\n.L1:\n  ... (代码块A2)\n.L2:\n  ...\n\n片段B：\n  jmp  .L2\n.L1:\n  ... (代码块B1)\n.L2:\n  cmpl %edx, %eax\n  jl   .L1",
    options: [
      { text: "A. A是if-else结构，B是while循环结构", isCorrect: true },
      { text: "B. A是while循环结构，B是if-else结构", isCorrect: false },
      { text: "C. 两者都是if-else结构", isCorrect: false },
      { text: "D. 两者都是while循环结构", isCorrect: false },
    ],
    feedbackCorrect: "正确！片段A是典型的 if-else 翻译模式：cmpl + jle 在条件满足（≤）时向后跳转到 else 体（.L1），条件不满足时顺序执行 if 体（A1），然后用 jmp 跳过 else 体。片段B是典型的 while 循环「jump-to-middle」翻译策略：先用无条件 jmp 跳到循环末尾的条件测试（.L2），测试通过（<）则向后跳转到循环体（.L1），循环体执行完再顺序进入测试——形成「测试→体→测试」的闭环。关键判别：if-else 的条件跳转方向是向前跳过 if 体进入 else（仅执行一次），而循环的条件跳转方向是向后回到循环体（可执行多次）。",
    feedbackWrong: "不对。逐段分析跳跃方向与控制流：\n\n片段A：cmpl 后 jle .L1 是「条件满足则跳转到 else 体」——.L1 在下方，A1 执行后用 jmp .L2 跳过 else。A1 和 A2 只会执行其一，不会回头重复。这是精确的 if-else 模式（条件失败→执行if体→跳过else；条件成立→跳过if体→执行else体）。\n\n片段B：首先 jmp .L2 无条件跳到测试；测试通过（jl=less than）则向后跳回 .L1（循环体）；循环体末尾自然落入测试，再次判断。这种「先跳到末尾测试，再条件向后跳回体」的结构是 while/for 循环的标志性翻译，而非 if-else。\n\n常见错误：选B是混淆了两者的跳跃方向——if-else向前跳（仅一次），循环向后跳（可重复）；选C或D是忽略了片段间的结构差异，仅凭表面都有「条件跳转+jmp」就归为同类。",
    type: "single"
  },
  {
    id: "q-s6-5",
    moduleId: "s6",
    question: "已知结构体定义 struct Node { int data; struct Node *next; }; 且指针 struct Node *p 在 8(%ebp)，result 在 -4(%ebp)。执行以下汇编片段后，result 对应的 C 表达式为？\n\n  movl 8(%ebp), %eax\n  movl 4(%eax), %eax\n  movl (%eax), %eax\n  movl %eax, -4(%ebp)",
    options: [
      { text: "A. p->data", isCorrect: false },
      { text: "B. p->next->data", isCorrect: true },
      { text: "C. p->next", isCorrect: false },
      { text: "D. p->next->next", isCorrect: false },
    ],
    feedbackCorrect: "正确！逐条解读：(1) movl 8(%ebp),%eax → eax=p（指针本身）；(2) movl 4(%eax),%eax → eax=*(p+4)，即 p->next。因为 struct Node 中 int data 占偏移0~3，指针 next 占偏移4~7（IA-32指针4字节），所以4(%eax)取的是next成员；(3) movl (%eax),%eax → eax=*(p->next)，即 p->next->data。偏移0(%eax)取的是data成员；(4) 存入result。共两次指针解引用，最终取到的是「下一个节点的data域」。",
    feedbackWrong: "不对。分步分析寄存器变化：\n(1) movl 8(%ebp),%eax：eax = p（结构体指针）\n(2) movl 4(%eax),%eax：eax = M[%eax+4] = *(p+4)。需判断偏移4处是哪个成员——struct Node 中 int data 在偏移0（占4字节），struct Node *next 在偏移4（占4字节，IA-32指针大小），所以这是取 p->next。\n(3) movl (%eax),%eax：eax = M[%eax] = *(p->next)，即 p->next->data（偏移0=第一个成员data）。\n(4) 共两次内存解引用。\n\n常见错误：选A是一次解引用就到data（但这里做了两次movl解引用）；选C是停在第一次解引用结果（返回的是指针值而非int）；选D是多算了一次解引用（p->next->next需要三次movl）。关键是把每条「movl偏移(%reg),%reg」的偏移量对应到结构体成员布局——这一步要求对结构体各成员的sizeof和对齐规则心中有数。",
    type: "single"
  },
  {
    id: "q-s6-6",
    moduleId: "s6",
    question: "分析以下 IA-32 函数（参数 x 在 8(%ebp)），其返回值是？\n\nfunc:\n  push %ebp\n  movl %esp, %ebp\n  movl 8(%ebp), %eax\n  cmpl $0, %eax\n  jge  .L1\n  negl %eax\n.L1:\n  pop %ebp\n  ret",
    options: [
      { text: "A. x的绝对值 |x|", isCorrect: true },
      { text: "B. -x（无论x正负都取相反数）", isCorrect: false },
      { text: "C. 若 x<0 返回0，否则返回x", isCorrect: false },
      { text: "D. 若 x>0 返回x，否则程序陷入死循环", isCorrect: false },
    ],
    feedbackCorrect: "正确！执行流程：(1) movl 8(%ebp),%eax → eax=x。(2) cmpl $0,%eax → 计算 x-0 并设标志位。(3) jge .L1：若 x≥0（SF=OF），跳过 negl，直接返回eax=x；若 x<0（SF≠OF），顺序执行negl。(4) negl %eax → eax=-x（将负数取反变为正数）。综上：x≥0返回x，x<0返回-x，即 |x|。注意 negl 是「negate」——将操作数按位取反再加1，等价于0-操作数。jge 是 signed jump if greater or equal。",
    feedbackWrong: "不对。逐条追踪条件分支：\n\n(1) cmpl $0,%eax 计算 eax-0，仅设置条件码（SF/ZF/OF/CF），不修改%eax。\n(2) jge .L1 判断 SF==OF（符号位==溢出位），即 signed ≥ 0。x≥0时跳过 negl 直接返回；x<0时执行 negl。\n(3) negl %eax 将 eax 替换为 0-eax，即取相反数。对于负数x，negl后变为-x（正数）。\n\n常见错误：\n- 选B：忽略了 jge 条件跳转——negl 只在 x<0 时执行，不是无条件执行。\n- 选C：把 negl 误解为「清零」或「置0」指令，但 negl 是取负而非清零。\n- 选D：不理解 jge 的含义——x>0 时 jge 成立，跳转到 .L1→返回，不会死循环；x<0 时经过 negl 后也正常返回。\n\n这是 CS:APP 第3.6.6节条件传送的「前身」——用条件跳转实现的条件赋值。",
    type: "single"
  },
  {
    id: "q-s6-7",
    moduleId: "s6",
    question: "关于 IA-32 中 call 指令和 ret 指令的行为，以下哪项描述是正确的？",
    options: [
      { text: "A. call Label 将当前 %eip 的值压栈，然后跳转到 Label", isCorrect: false },
      { text: "B. call Label 将紧接其后的指令地址（返回地址）压栈，然后跳转到 Label；ret 从栈顶弹出地址送入 %eip", isCorrect: true },
      { text: "C. call Label 将 %ebp 压栈后跳转到 Label；ret 将栈顶弹出到 %ebp", isCorrect: false },
      { text: "D. ret 指令从 %ebp+4 处加载返回地址到 %eip，然后 %esp 加4", isCorrect: false },
    ],
    feedbackCorrect: "正确！call 指令执行两个原子操作：(1) 将 call 下一条指令的地址（即返回后应继续执行的地址）压入栈顶（%esp先减4再存入）；(2) 跳转到目标 Label（修改 %eip）。ret 指令是 call 的逆操作：从当前栈顶（%esp指向处）弹出4字节加载到 %eip，然后 %esp+=4。注意：call 压入的不是 call 指令自身的地址，而是紧接其后的指令地址——如果压入的是自身地址，ret 后会再次执行 call 导致无限循环。",
    feedbackWrong: "不对。逐一辨析：\n\nA 错：call 压入的是「下一条指令的地址」（返回地址 = call 指令地址 + call 指令长度，通常+5），而非当前 %eip（当前 %eip 正指向 call 指令本身）。若压入自身地址，ret 回到 call 会无限循环。\n\nC 错：将 %ebp 压栈是 callee（被调用者）的职责——通过 push %ebp 或 enter 指令实现——而非 call 指令的行为。call 只压入返回地址。\n\nD 错：ret 从 %esp（栈顶）弹回地址，而非从 %ebp+4。的确 %ebp+4 处存储着返回地址的副本（在栈帧建立后），但 ret 是通过 %esp 操作的——它等价于 pop %eip（虽然 IA-32 没有这条指令）。在函数返回前若执行了 leave（movl %ebp,%esp; pop %ebp），%esp 才指向返回地址处，随后 ret 弹出。\n\n正确理解 call/ret 是理解栈溢出攻击的基础：攻击者覆盖 %ebp+4 处的返回地址，当函数执行 ret 时就会跳转到攻击者的代码。",
    type: "single"
  },
];

// ── 模拟题 ──
export const S6_SIM_QUESTIONS: ExamQuestion[] = [
  {
    id: "sim-s6-1",
    moduleId: "s6",
    year: "模拟题",
    position: "自编",
    points: 10,
    questionText: "<p><b>【题型】计算题（10分）</b></p>\n<p>已知 C 函数 calc 的定义和对应的 IA-32 汇编代码如下（AT&amp;T语法，cdecl调用约定）：</p>\n<pre>int calc(int a, int b) {\n    int t;\n    if (a &gt; b)\n        t = a - b;\n    else\n        t = b - a;\n    return t * 2;\n}</pre>\n<pre>calc:\n    push %ebp\n    movl %esp, %ebp\n    subl $4, %esp\n    movl 8(%ebp), %eax\n    cmpl 12(%ebp), %eax\n    jle  .L2\n    movl 8(%ebp), %eax\n    subl 12(%ebp), %eax\n    movl %eax, -4(%ebp)\n    jmp  .L3\n.L2:\n    movl 12(%ebp), %eax\n    subl 8(%ebp), %eax\n    movl %eax, -4(%ebp)\n.L3:\n    movl -4(%ebp), %eax\n    addl %eax, %eax\n    leave\n    ret</pre>\n<p>假设调用 calc(3, 7)。请回答：<br/>(1) 画出进入 calc 后、执行第一条 movl 指令前的栈帧布局，标注 %ebp 及各偏移量处存放的内容（4分）<br/>(2) 逐条追踪汇编指令的执行过程（只需追踪与本题数据流相关的核心指令），给出 %eax 的最终返回值（4分）<br/>(3) 用一句话概括该函数的功能（2分）</p>",
    answerHtml: "<p><b>【答案与解析】</b></p>\n<p><b>(1) 栈帧布局（进入 calc 后、执行第一条 movl 前）：</b><br/>地址从高到低，%ebp 指向保存的旧 %ebp：<br/>%ebp+12: 7（参数b=7，第二个参数，先入栈，地址较高）<br/>%ebp+8: 3（参数a=3，第一个参数，后入栈，地址较低）<br/>%ebp+4: 返回地址（call calc 指令自动压入）<br/>%ebp: 旧 %ebp 值（push %ebp 保存的调用者帧指针）&larr; 当前 %ebp<br/>%ebp-4: t（subl $4,%esp 分配的局部变量，尚未初始化）&larr; 当前 %esp</p>\n<p><b>(2) 执行追踪：</b><br/>① movl 8(%ebp),%eax &rarr; eax=a=3<br/>② cmpl 12(%ebp),%eax &rarr; 计算 3-7=-4，结果&lt;0，SF=1,OF=0,ZF=0。SF≠OF 满足 jle 条件（signed ≤），跳转。<br/>③ jle .L2 &rarr; 条件成立，跳转至 .L2（else 分支）<br/>④ movl 12(%ebp),%eax &rarr; eax=b=7<br/>⑤ subl 8(%ebp),%eax &rarr; eax=7-3=4<br/>⑥ movl %eax,-4(%ebp) &rarr; t=4<br/>⑦ jmp .L3 &rarr; 无条件跳过 if 体，跳转至 .L3<br/>⑧ movl -4(%ebp),%eax &rarr; eax=t=4<br/>⑨ addl %eax,%eax &rarr; eax=4+4=8<br/>⑩ leave;ret &rarr; 函数返回，返回值=%eax=8</p>\n<p><b>(3) 函数功能：</b>计算两数之差的绝对值的 2 倍，即 2×|a-b|。本题中 2×|3-7|=8。</p>"
  },
  {
    id: "sim-s6-2",
    moduleId: "s6",
    year: "模拟题",
    position: "自编",
    points: 15,
    questionText: "<p><b>【题型】分析题（15分）</b></p>\n<p>以下是一个 IA-32 函数的完整汇编代码（AT&amp;T语法，cdecl调用约定）。请逆向分析该函数：</p>\n<pre>func:\n    push %ebp\n    movl %esp, %ebp\n    subl $8, %esp\n    movl $0, -8(%ebp)\n    movl $0, -4(%ebp)\n    jmp  .L2\n.L4:\n    movl -4(%ebp), %eax\n    movl 8(%ebp), %edx\n    movl (%edx,%eax,4), %eax\n    testl %eax, %eax\n    jle  .L3\n    addl $1, -8(%ebp)\n.L3:\n    addl $1, -4(%ebp)\n.L2:\n    movl -4(%ebp), %eax\n    cmpl 12(%ebp), %eax\n    jl   .L4\n    movl -8(%ebp), %eax\n    leave\n    ret</pre>\n<p>请回答：<br/>(1) 写出该函数的 C 语言原型（返回类型和各参数类型）（3分）<br/>(2) 指出栈帧中各局部变量的偏移量、类型及用途（3分）<br/>(3) 写出等价的 C 语言函数实现（6分）<br/>(4) 说明该函数采用了什么循环翻译策略？为什么开头有一条无条件 jmp 指令？（3分）</p>",
    answerHtml: "<p><b>【答案与解析】</b></p>\n<p><b>(1) C 语言原型：</b>int func(int *a, int n)<br/>依据：8(%ebp) 被用作基址寄存器（与 %eax*4 配合构成 (%edx,%eax,4) 数组寻址），且通过 movl (%edx,%eax,4),%eax 读取4字节值——所以它是 int* 型指针（数组首地址）。12(%ebp) 在 cmpl 中与循环变量比较——是数组长度 n（int 型）。返回值通过 %eax 传递，最终加载的是 -8(%ebp) 处的计数器值，为 int 型。</p>\n<p><b>(2) 局部变量：</b><br/>-4(%ebp)：循环变量 i（int 型，4字节），初值 0（movl $0,-4(%ebp)），每次循环 +1。<br/>-8(%ebp)：计数器 count（int 型，4字节），初值 0，满足条件时 +1。<br/>subl $8,%esp 恰好为这两个局部变量分配了 8 字节空间。</p>\n<p><b>(3) 等价 C 代码：</b><br/><pre>int func(int *a, int n) {\n    int count = 0;\n    int i;\n    for (i = 0; i &lt; n; i++) {\n        if (a[i] &gt; 0)\n            count++;\n    }\n    return count;\n}</pre><br/>解析要点：testl %eax,%eax 测试 a[i] 的值，jle 在 a[i]≤0 时跳过 count++；循环条件是 i&lt;n（jl= signed less than）；函数返回 count 而非 i。</p>\n<p><b>(4) 翻译策略：</b>该函数采用了 while/for 循环的经典「jump-to-middle」（跳到中间）翻译策略。开头无条件 jmp .L2 的作用是直接跳到循环末尾的条件测试代码（cmpl+ jl），避免在首次迭代前执行循环体。这是编译器的标准做法：将循环条件测试放在底部，顶部用 jmp 跳过去，使生成的代码只需要一个条件跳转（在底部向后跳）而非两个。如果不这样做，编译器也可以在顶部测试条件并用条件跳转跳过整个循环体，但那样需要两个分支指令。jump-to-middle 是 GCC -O0 对 while/for 循环的默认翻译方式（do-while 则不需要开头那条 jmp，因为它的语义就是先执行再判断）。</p>"
  },
  {
    id: "sim-s6-3",
    moduleId: "s6",
    year: "模拟题",
    position: "自编",
    points: 12,
    questionText: "<p><b>【题型】分析题（12分）</b></p>\n<p>已知结构体定义 struct Point { int x; int y; }; 和以下 C 函数及其 IA-32 汇编（AT&amp;T语法，cdecl调用约定）：</p>\n<pre>void scale(struct Point *p, int factor) {\n    p-&gt;x = p-&gt;x * factor;\n    p-&gt;y = p-&gt;y * factor;\n}</pre>\n<pre>scale:\n    push %ebp\n    movl %esp, %ebp\n    movl 8(%ebp), %eax\n    movl (%eax), %edx\n    imull 12(%ebp), %edx\n    movl %edx, (%eax)\n    movl 8(%ebp), %eax\n    movl 4(%eax), %edx\n    imull 12(%ebp), %edx\n    movl %edx, 4(%eax)\n    pop %ebp\n    ret</pre>\n<p>假设调用 scale(&amp;pt, 3)，其中 pt.x=5, pt.y=-2，且 pt 的起始地址为 0x1000。系统为小端字节序，int 为 32 位。<br/>请回答：<br/>(1) 解释 4(%eax) 和 (%eax) 两种寻址方式的含义，说明为什么访问 p-&gt;y 用 4(%eax) 而 p-&gt;x 用 (%eax)（4分）<br/>(2) 执行完 p-&gt;x = p-&gt;x * factor 后，内存地址 0x1000～0x1003 各字节的十六进制值分别是多少？（4分）<br/>(3) 该函数中出现了哪几种 IA-32 寻址模式？各举一例（至少3种）（4分）</p>",
    answerHtml: "<p><b>【答案与解析】</b></p>\n<p><b>(1) 寻址方式解释：</b><br/>(%eax) 是<b>寄存器间接寻址</b>——以 %eax 的值为内存地址，访问该地址处的数据。此处 %eax=p（结构体指针），(%eax) 即访问结构体首地址处的4字节数据，即 p-&gt;x（struct Point 中 x 在偏移量 0 处）。<br/>4(%eax) 是<b>基址+偏移量寻址</b>——访问地址 = %eax+4 处的数据。struct Point 中 int x 占偏移 0~3（4字节），int y 紧接其后占偏移 4~7，故 y 的偏移量为 4。用 4(%eax) 即可读取 p-&gt;y。<br/><b>关键原因：</b>结构体成员的内存布局由其定义顺序和每个成员的类型大小决定。两个成员均为 int（4字节），无对齐填充，偏移量直接累加。</p>\n<p><b>(2) 小端字节序存储：</b><br/>p-&gt;x 的新值 = 5×3 = 15 = 0x0000000F（32位十六进制）。<br/>小端（little-endian）规则：最低有效字节（LSB）存最低地址。0x0000000F 的4个字节从 LSB 到 MSB 依次为：0x0F, 0x00, 0x00, 0x00。因此：<br/>地址 0x1000: 0x0F<br/>地址 0x1001: 0x00<br/>地址 0x1002: 0x00<br/>地址 0x1003: 0x00<br/>同理，p-&gt;y 的新值 = (-2)×3 = -6 = 0xFFFFFFFA（补码），存入 0x1004~0x1007 依次为 0xFA,0xFF,0xFF,0xFF。</p>\n<p><b>(3) 寻址模式分类（至少3种）：</b><br/>① <b>寄存器寻址</b>：操作数直接在寄存器中。如 movl %edx,(%eax) 中的 %edx——源操作数在寄存器。<br/>② <b>立即数寻址</b>：操作数是常量。虽然本题汇编未直接出现 $ 前缀的立即数，imull 12(%ebp),%edx 中的源操作数来自内存……更正：本题明确出现的是以下三种：<br/>&nbsp;&nbsp;• <b>寄存器寻址</b>：movl 8(%ebp),%eax 的目标 %eax，movl (%eax),%edx 的目标 %edx。<br/>&nbsp;&nbsp;• <b>寄存器间接寻址</b>：movl (%eax),%edx——%eax 存的是地址，(%eax) 是对该地址的内存引用。<br/>&nbsp;&nbsp;• <b>基址+偏移量寻址</b>：movl 8(%ebp),%eax（偏移8字节），movl 4(%eax),%edx（偏移4字节），movl 12(%ebp),%edx（通过 imull 的内存操作数形式）。<br/>③ 本题未出现但常见的还有 <b>基址+变址+比例因子寻址</b>，如 (%edx,%eax,4)——在访问数组元素 a[i] 时使用，形式为 基址+变址×scale。</p>"
  },
];