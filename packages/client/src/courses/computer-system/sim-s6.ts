import type { ExamQuestion } from '@learncourse/framework/types';

// === 程序的机器级表示 ===

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