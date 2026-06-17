import type { ExamQuestion } from '@learncourse/framework/types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // ── S1 计算机系统概论 ──
  {
    id: "eq-s1-1",
    moduleId: "s1",
    year: "近年概念题",
    position: "概念",
    points: 4,
    questionText: "<p><strong>题目：</strong>请画出冯·诺依曼架构的五大组成部分，并简述\"存储程序\"思想及其重要性。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><p><strong>五大部分：</strong>运算器（ALU）、控制器（CU）、存储器（Memory）、输入设备、输出设备。（运算器+控制器合称 CPU）</p><p><strong>存储程序思想：</strong>程序指令和数据都以二进制形式存储在同一个存储器中。CPU 通过程序计数器 PC 逐条从存储器中取出指令、解码、执行。这意味着程序本身也是数据，可以被其他程序读取、修改——编译器、调试器、操作系统都是基于这个思想才得以实现。</p><p><strong>重要性：</strong>这是现代通用计算机的基石。在冯·诺依曼之前，程序是通过插拔线缆来\"编程\"的——改程序需要物理重连电路。存储程序使计算机可以通用、可编程，不需要每次换程序就改硬件。</p><p><strong>评分要点：</strong>五大部件写出 4 个以上（2分）；\"程序和数据放一起\"\"逐条取指令执行\"（1分）；\"程序可被当作数据处理\"（1分）。</p>"
  },
  {
    id: "eq-s1-2",
    moduleId: "s1",
    year: "近年概念题",
    position: "概念",
    points: 6,
    questionText: "<p><strong>题目：</strong>计算机系统课程为什么要从\"程序员视角\"切入，而不是直接讲 CPU 电路设计？请用\"抽象层次\"的概念来解释。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><p>计算机系统是由多个抽象层次构成的：高级语言（C）→ 汇编语言 → 机器指令 → 硬件电路。</p><p><strong>程序员视角的含义：</strong>不要求会设计 CPU 电路，但要求能解释\"我写的 C 代码在机器上到底怎么跑\"。这包括：数据如何用比特表示（第2章）、C 代码如何变成可执行程序（第3章）、机器指令长什么样（第4章）、函数调用时栈和寄存器怎么变（第6章）、内存和 Cache 怎么配合（第9-10章）等等。</p><p><strong>为什么要这个视角：</strong></p><ul><li>写高效代码：知道 Cache 怎么工作才能写出快程序</li><li>调试：程序崩溃时能看懂栈回溯和内存 dump</li><li>安全：理解缓冲区溢出必须先懂栈帧</li><li>课程连贯性：电路级细节属于体系结构/数字逻辑课程，本课程聚焦\"软件和硬件的交界处\"</li></ul><p><strong>评分要点：</strong>提到抽象层次（2分）；具体说明程序员需要解释哪些东西（2分）；说明电路细节属于其他课程（1分）；提到实际编程中的收益（1分）。</p>"
  },

  // ── S2 信息的位与表示 ──
  {
    id: "eq-s2-1",
    moduleId: "s2",
    year: "近年期末/期中",
    position: "简答/填空",
    points: 5,
    questionText: "<p><strong>题目：</strong>(1) 将十进制 189 分别转换为二进制和十六进制。(2) 将十六进制 0xC9 转换为十进制和二进制。(3) 32 位整数 0x12345678 在小端机器上，地址从低到高的四个字节分别是什么？</p>",
    answerHtml: "<p><strong>(1) 189 → 二进制/十六进制：</strong></p><p>二进制：189÷2=94余1, 94÷2=47余0, 47÷2=23余1, 23÷2=11余1, 11÷2=5余1, 5÷2=2余1, 2÷2=1余0, 1÷2=0余1 → 从下往上：<strong>1011 1101</strong></p><p>十六进制：1011 1101 → 1011 = 11 = B，1101 = 13 = D → <strong>0xBD</strong></p><p>或 189÷16=11余13(D)，11÷16=0余11(B) → 0xBD</p><p><strong>(2) 0xC9 → 十进制/二进制：</strong></p><p>十进制：C×16 + 9 = 12×16 + 9 = 192 + 9 = <strong>201</strong></p><p>二进制：C=1100, 9=1001 → <strong>1100 1001</strong></p><p><strong>(3) 小端存储 0x12345678：</strong></p><p>小端 = 低位字节在低地址。从低到高：<strong>0x78, 0x56, 0x34, 0x12</strong>。</p><p>（大端则相反：0x12, 0x34, 0x56, 0x78——网络字节序就是大端。）</p><p><strong>评分要点：</strong>每小问约 1.5~2 分。进制计算步骤占一半分。大小端反了全扣。</p>"
  },
  {
    id: "eq-s2-2",
    moduleId: "s2",
    year: "近年概念题",
    position: "简答",
    points: 4,
    questionText: "<p><strong>题目：</strong>为什么同一串比特（如 01000001）在不同上下文中可以有不同的含义？请举例说明，并解释这背后\"编码\"的本质。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><p>因为比特本身没有天然意义——是\"解释规则\"（即编码）赋予了它含义。</p><p><strong>举例：</strong>比特串 <code>01000001</code>（即十六进制 0x41）：</p><ul><li>按无符号整数规则解释：65</li><li>按 ASCII 字符编码规则解释：大写字母 'A'</li><li>按 x86 指令编码规则解释（如果出现在指令流中）：可能是一条 inc 或 push 指令的一部分</li><li>按 IEEE 754 浮点数规则解释：是一个很小的浮点数</li></ul><p><strong>编码的本质：</strong>编码是一套\"翻译规则\"——将抽象的\"意义\"（数字、文字、指令）映射成具体的比特模式。不同的编码规则导致同一比特串可以表示截然不同的东西。</p><p>这也就是为什么 C 语言中 int 和 float 虽然都占 4 字节，但同样 4 个字节的值可能完全不同——因为它们用了不同的编码规则（补码 vs IEEE 754）。</p>"
  },

  // ── S3 编译工具链 ──
  {
    id: "eq-s3-1",
    moduleId: "s3",
    year: "近年概念题",
    position: "简答",
    points: 6,
    questionText: "<p><strong>题目：</strong>请完整描述从 hello.c 到可执行程序 hello 的四个处理阶段。对每个阶段，写出：(1) 使用的工具名；(2) 输入文件和输出文件的类型；(3) 该阶段的核心任务。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><table><tbody><tr><th>阶段</th><th>工具</th><th>输入→输出</th><th>核心任务</th></tr><tr><td>1. 预处理</td><td>cpp（预处理器）</td><td>hello.c（文本）→ hello.i（文本）</td><td>展开 #include（头文件粘贴）、展开 #define 宏、处理 #ifdef 条件编译</td></tr><tr><td>2. 编译</td><td>cc1（C 编译器）</td><td>hello.i（文本）→ hello.s（文本）</td><td>将 C 语言语义翻译为汇编语言语义。做语法分析、语义检查、优化、代码生成。</td></tr><tr><td>3. 汇编</td><td>as（汇编器）</td><td>hello.s（文本）→ hello.o（二进制）</td><td>将汇编指令编码为机器码。生成可重定位目标文件，含机器指令、数据、符号表和重定位信息。</td></tr><tr><td>4. 链接</td><td>ld（链接器）</td><td>hello.o + 库（二进制）→ hello（二进制）</td><td>符号解析（找 printf 等外部函数的代码）和重定位（填上正确的内存地址）。拼成完整的可执行文件。</td></tr></tbody></table><p><strong>补充说明：</strong>gcc hello.c -o hello 可以一口气完成全部四步，但它内部按顺序调用了 cpp → cc1 → as → ld。</p><p><strong>评分要点：</strong>四阶段写全（4分），每少一个扣1分。输入输出类型写对（共1分）。核心任务描述准确（共1分）。</p>"
  },
  {
    id: "eq-s3-2",
    moduleId: "s3",
    year: "近年概念题",
    position: "简答/判断",
    points: 3,
    questionText: "<p><strong>题目：</strong>\"编译就是把 C 代码变成机器码\"——这句话对吗？如果不完全对，请修正。</p>",
    answerHtml: "<p><strong>答案：不完全对。</strong></p><p>严格来说：\"编译\"只是 C→汇编（.c/.i → .s），输出的仍是文本（汇编代码），不是二进制机器码。</p><p>把汇编变成机器码的是\"汇编\"阶段（汇编器 as），把零件拼成可执行程序的是\"链接\"阶段（链接器 ld）。</p><p>但在日常口语中，人们常把\"编译+汇编+链接\"全过程笼统地称为\"编译\"。考试时注意区分：<strong>如果题目问\"编译阶段\"，专指 C→汇编那一步。</strong></p><p><strong>修正：</strong>\"编译工具链经过预处理、编译、汇编、链接四阶段，最终变成可执行的二进制机器码。\"</p>"
  },

  // ── S4 汇编语言基础 ──
  {
    id: "eq-s4-1",
    moduleId: "s4",
    year: "近年简答题",
    position: "简答",
    points: 6,
    questionText: "<p><strong>题目：</strong>AT&T 汇编语法下，解释以下四条指令的含义：(1) movl $42, %eax；(2) movl %eax, %ebx；(3) movl (%eax), %ebx；(4) movl 12(%ebp), %eax。对于每条指令，说明源操作数和目的操作数分别是什么，以及是访问寄存器还是内存。</p>",
    answerHtml: "<p><strong>(1) movl $42, %eax</strong></p><p>源：立即数 42（常量，符号 \$ 表示）；目的：寄存器 eax。不访问内存。效果：eax = 42。</p><p><strong>(2) movl %eax, %ebx</strong></p><p>源：寄存器 eax 的值；目的：寄存器 ebx。不访问内存。效果：ebx = eax（复制，eax 的值不变）。</p><p><strong>(3) movl (%eax), %ebx</strong></p><p>源：<strong>内存</strong>——以 eax 中存的值为地址，去那个地址读 4 字节；目的：寄存器 ebx。<strong>括号表示访存。</strong>效果：ebx = *eax（C 语言的指针解引用）。</p><p><strong>(4) movl 12(%ebp), %eax</strong></p><p>源：<strong>内存</strong>——地址 = ebp的值 + 12，去那个地址读 4 字节；目的：寄存器 eax。效果：eax = *(ebp + 12)。在函数调用中，ebp+12 通常是第二个参数。</p><p><strong>评分要点：</strong>每条指令源/目的各 0.5 分（共 4 分）；(3)(4) 明确指出\"访问内存\"（2 分）。</p>"
  },
  {
    id: "eq-s4-2",
    moduleId: "s4",
    year: "近年分析题",
    position: "简答/分析",
    points: 4,
    questionText: "<p><strong>题目：</strong>以下汇编函数实现了什么功能？请逐行解释，并写出等价的 C 代码。</p><pre>my_func:\n    pushl   %ebp\n    movl    %esp, %ebp\n    movl    8(%ebp), %eax\n    addl    8(%ebp), %eax\n    addl    8(%ebp), %eax\n    popl    %ebp\n    ret</pre>",
    answerHtml: "<p><strong>逐行解释：</strong></p><table><tbody><tr><th>指令</th><th>解释</th></tr><tr><td>pushl %ebp</td><td>保存旧的帧指针到栈上</td></tr><tr><td>movl %esp, %ebp</td><td>建立当前函数的栈帧（ebp 指向当前栈顶）</td></tr><tr><td>movl 8(%ebp), %eax</td><td>读取第一个参数（ebp+8 处），放入 eax</td></tr><tr><td>addl 8(%ebp), %eax</td><td>eax = eax + 第一个参数（即 参数×2）</td></tr><tr><td>addl 8(%ebp), %eax</td><td>eax = eax + 第一个参数（即 参数×3）</td></tr><tr><td>popl %ebp</td><td>恢复旧的帧指针</td></tr><tr><td>ret</td><td>返回调用者，返回值在 eax 中</td></tr></tbody></table><p><strong>等价 C 代码：</strong></p><pre>int my_func(int x) {\n    return x * 3;  // 或 return x + x + x;\n}</pre><p>注意：编译器此处用了三次加法实现乘以 3，而不是用乘法指令——因为加法的执行速度通常比乘法快。</p><p><strong>评分要点：</strong>识别出参数位置（1分）；识别出三次加法相当于乘以3（1分）；写出等价 C 代码（1分）；能解释为什么用加法而非乘法（1分）。</p>"
  },

  // ── S5 整数与浮点数 ──
  {
    id: "eq-s5-1",
    moduleId: "s5",
    year: "近年计算题",
    position: "计算",
    points: 5,
    questionText: "<p><strong>题目：</strong>将十进制数 $-12.625$ 转换为 IEEE 754 单精度（32位）浮点数，写出完整的 Sign、Exponent、Mantissa 字段，并给出最终的十六进制结果。要求写出推导过程。</p>",
    answerHtml: "<p><strong>解答（逐步推导）：</strong></p><p><strong>第1步：分解原数。</strong>$-12.625 = -(12 + 0.625)$。</p><ul><li>$12_{10} = 1100_2$</li><li>$0.625 \\times 2 = 1.25$ → 1；$0.25 \\times 2 = 0.5$ → 0；$0.5 \\times 2 = 1.0$ → 1 → $0.625_{10} = .101_2$</li><li>所以 $12.625_{10} = 1100.101_2$</li></ul><p><strong>第2步：归一化。</strong>$1100.101_2 = 1.100101 \\times 2^3$（小数点左移 3 位）。</p><p><strong>第3步：确定三个字段。</strong></p><ul><li><strong>Sign S = 1</strong>（负数）</li><li><strong>Exponent</strong>：实际指数 $e = 3$，偏置常数 $bias = 127$，所以 $E = 3 + 127 = 130 = 1000\\ 0010_2$</li><li><strong>Mantissa</strong>：取小数点后的 23 位 = $100101\\ 00000000000000000$（左对齐补零到 23 位）</li></ul><p><strong>第4步：拼出 32 位并转十六进制。</strong></p><p>$1\\ 10000010\\ 10010100000000000000000$</p><p>分组：$1100\\ 0001\\ 0100\\ 1010\\ 0000\\ 0000\\ 0000\\ 0000$</p><p>$= 0xC14A0000$</p><p><strong>最终答案：</strong>$\\boxed{0xC14A0000}$</p><p><strong>评分要点：</strong>符号位正确（1分）；将 12.625 转为二进制正确（1分）；归一化及指数偏置正确（1分）；尾数 23 位正确（1分）；最终十六进制正确（1分）。</p>"
  },
  {
    id: "eq-s5-2",
    moduleId: "s5",
    year: "近年概念/计算题",
    position: "简答/计算",
    points: 5,
    questionText: "<p><strong>题目：</strong>(1) 8 位补码下，计算 $(-56) + (-100)$ 是否溢出？请写出计算过程和判断依据。(2) IEEE 754 单精度浮点数 $0xC1480000$ 对应的十进制真值是多少？要求写出推导步骤。</p>",
    answerHtml: "<p><strong>(1) 溢出判断（2分）：</strong></p><p>$-56$ 的 8 位补码：$+56 = 00111000_2$，取反 $11000111_2$，加 1 → $11001000_2$。</p><p>$-100$ 的 8 位补码：$+100 = 01100100_2$，取反 $10011011_2$，加 1 → $10011100_2$。</p><p>相加：$11001000 + 10011100 = 1\\ 01100100$（9 位结果，进位 1 被丢弃），8 位结果为 $01100100 = 100$。</p><p>$(-56) + (-100)$ 的正确结果是 $-156$，但 8 位补码表示范围是 $-128 \\sim 127$，$-156$ 无法表示。两个负数相加得到正数 100 → <strong>下溢（负溢出）</strong>。</p><p><strong>答案：溢出。（理由：两负加得正 → 负溢出）</strong></p><p><strong>(2) IEEE 754 真值转换（3分）：</strong></p><p>$0xC1480000 \\to$ 二进制：$1100\\ 0001\\ 0100\\ 1000\\ 0000\\ 0000\\ 0000\\ 0000$</p><p>拆分：S=1（负数），E=$10000010_2=130$，M=$1001000...0$</p><p>实际指数 $e = E - 127 = 130 - 127 = 3$</p><p>尾数有效值（含隐含 1）：$1.1001_2 = 1 + 1/2 + 0/4 + 0/8 + 1/16 = 1 + 0.5 + 0.0625 = 1.5625$</p><p>值 $= (-1)^1 \\times 1.5625 \\times 2^3 = -1.5625 \\times 8 = \\boxed{-12.5}$</p><p><strong>评分要点：(1)</strong>补码转换正确（0.5分），相加运算正确（0.5分），溢出判断及理由正确（1分）。<strong>(2)</strong>字段拆分正确（0.5分），指数计算正确（1分），尾数计算正确（1分），最终值正确（0.5分）。</p>"
  },

  // ── S6 程序的机器级表示 ──
  {
    id: "eq-s6-1",
    moduleId: "s6",
    year: "近年程序分析题",
    position: "栈帧分析",
    points: 15,
    questionText: "<p><strong>题目：</strong>以下 C 函数 <code>sum_range</code> 的汇编代码如下。请：</p><p>(1) 画出调用 <code>sum_range(3, 5)</code> 时，执行到 <code>call sum_range</code> 之后（即进入函数、执行完 pushl %ebp 和 movl %esp,%ebp 之后）的栈帧图。标明：返回地址、旧 ebp、参数 a 和 b 的位置与值。</p><p>(2) 逐行注释汇编代码的功能。</p><p>(3) 写出等价的 C 语言完整实现（不是递归版本）。</p><pre>sum_range:\n    pushl   %ebp\n    movl    %esp, %ebp\n    pushl   %ebx\n    movl    $0, %eax\n    movl    8(%ebp), %ecx\n    cmpl    12(%ebp), %ecx\n    jg      .L2\n.L1:\n    addl    %ecx, %eax\n    addl    $1, %ecx\n    cmpl    12(%ebp), %ecx\n    jle     .L1\n.L2:\n    popl    %ebx\n    popl    %ebp\n    ret\n</pre>",
    answerHtml: "<p><strong>(1) 栈帧图（5分）：</strong></p><pre>\n        高地址 ↑\n        +------------------+\n        | 参数 b = 5       |  ← ebp + 12\n        +------------------+\n        | 参数 a = 3       |  ← ebp + 8\n        +------------------+\n        | 返回地址          |  ← ebp + 4（call 指令自动压入）\n        +------------------+\n        | 旧 ebp 值         |  ← ebp（当前帧指针指向这里）\n        +------------------+\n        | 旧 ebx 值         |  ← ebp - 4（pushl %ebx 保存）\n        +------------------+\n        低地址 ↓\n</pre><p>注意：参数从右向左压栈，所以 b（5）在栈的高地址方向（先压入），a（3）在 b 的下方（后压入）。ebp+8 是第一个参数 a，ebp+12 是第二个参数 b。</p><p><strong>(2) 逐行注释（5分）：</strong></p><table><tbody><tr><th>指令</th><th>功能</th></tr><tr><td>pushl %ebp</td><td>保存调用者的帧指针</td></tr><tr><td>movl %esp, %ebp</td><td>建立当前函数的栈帧基准</td></tr><tr><td>pushl %ebx</td><td>保存被调用者保存寄存器 ebx</td></tr><tr><td>movl $0, %eax</td><td>eax = 0（累加和初始化为 0）</td></tr><tr><td>movl 8(%ebp), %ecx</td><td>ecx = a（循环变量 i = a）</td></tr><tr><td>cmpl 12(%ebp), %ecx</td><td>比较 i 和 b</td></tr><tr><td>jg .L2</td><td>如果 i > b，跳过循环直接到 .L2</td></tr><tr><td>.L1: addl %ecx, %eax</td><td>sum = sum + i</td></tr><tr><td>addl $1, %ecx</td><td>i = i + 1</td></tr><tr><td>cmpl 12(%ebp), %ecx</td><td>比较 i 和 b</td></tr><tr><td>jle .L1</td><td>如果 i <= b，继续循环</td></tr><tr><td>.L2: popl %ebx</td><td>恢复 ebx 原值</td></tr><tr><td>popl %ebp</td><td>恢复调用者的帧指针</td></tr><tr><td>ret</td><td>返回，返回值在 eax 中</td></tr></tbody></table><p><strong>(3) 等价 C 代码（5分）：</strong></p><pre>int sum_range(int a, int b) {\n    int sum = 0;\n    int i;\n    for (i = a; i <= b; i++) {\n        sum += i;\n    }\n    return sum;\n}</pre><p>验证：sum_range(3,5) = 3+4+5 = 12。</p><p><strong>评分要点：(1)</strong> 栈方向正确、地址标注正确、四个数据项位置值正确（各约1分）；<strong>(2)</strong> 指令注释覆盖全部，循环逻辑解释清楚（5分）；<strong>(3)</strong> C代码等价且无语法错误（5分）。</p>"
  },
  {
    id: "eq-s6-2",
    moduleId: "s6",
    year: "近年程序填空题",
    position: "C→汇编填空",
    points: 10,
    questionText: "<p><strong>题目：</strong>以下 C 函数 <code>swap_add</code> 的汇编代码中有四处空白（标为 ___①___ 到 ___④___），请补全每条指令。函数功能：交换 *xp 和 *yp，并将两数之和作为返回值。</p><pre>\n// C 源码：\nint swap_add(int *xp, int *yp) {\n    int x = *xp;\n    int y = *yp;\n    *xp = y;\n    *yp = x;\n    return x + y;\n}\n\n// 汇编（部分）：\nswap_add:\n    pushl   %ebp\n    movl    %esp, %ebp\n    pushl   %ebx\n    movl    8(%ebp), %edx      // edx = xp\n    movl    12(%ebp), %ecx     // ecx = yp\n    movl    (%edx), %eax       // eax = *xp = x\n    movl    (%ecx), %ebx       // ebx = *yp = y\n    ___①___                   // *xp = y\n    ___②___                   // *yp = x\n    ___③___                   // return value = x + y\n    popl    %ebx\n    ___④___                   // 恢复栈帧并返回\n    ret\n</pre>",
    answerHtml: "<p><strong>答案解析：</strong></p><p>在调用 <code>movl 8(%ebp), %edx</code> 和 <code>movl 12(%ebp), %ecx</code> 之后：</p><ul><li>edx 存的是 xp（指向 *xp 的指针）</li><li>ecx 存的是 yp（指向 *yp 的指针）</li><li>eax = *xp = x</li><li>ebx = *yp = y</li></ul><p><strong>①：</strong><code>movl %ebx, (%edx)</code>——把 ebx 中的 y 值写入 edx 指向的地址（*xp = y）。（2.5分）</p><p><strong>②：</strong><code>movl %eax, (%ecx)</code>——把 eax 中的 x 值写入 ecx 指向的地址（*yp = x）。（2.5分）</p><p><strong>③：</strong><code>addl %ebx, %eax</code>——eax = eax + ebx = x + y。因为返回值通过 eax 传递，所以 sum 要放在 eax 中。注意不能写成 <code>addl %eax, %ebx</code>（这样 sum 在 ebx 中，返回时不会被当作返回值）。（2.5分）</p><p><strong>④：</strong><code>popl %ebp</code>——恢复调用者的帧指针。注意 <code>leave</code>（= movl %ebp,%esp; popl %ebp）也是可接受的答案，但在本题中只用 popl %ebp 即可（因为 esp 未被修改）。（2.5分）</p><p><strong>完整汇编：</strong></p><pre>swap_add:\n    pushl   %ebp\n    movl    %esp, %ebp\n    pushl   %ebx\n    movl    8(%ebp), %edx\n    movl    12(%ebp), %ecx\n    movl    (%edx), %eax\n    movl    (%ecx), %ebx\n    movl    %ebx, (%edx)     ← ①\n    movl    %eax, (%ecx)     ← ②\n    addl    %ebx, %eax       ← ③\n    popl    %ebx\n    popl    %ebp             ← ④\n    ret</pre><p><strong>评分要点：</strong>每空 2.5 分。① 和 ② 的源/目的寄存器不能反（反了全扣）。③ 的结果必须存入 eax（存入 ebx 扣1.5分）。④ 必须恢复 ebp（写 ret 扣 2.5 分——ret 已在最后一行提供）。</p>"
  },

  // ── S7 链接 ──
  {
    id: "eq-s7-1",
    moduleId: "s7",
    year: "近年分析题",
    position: "符号解析",
    points: 5,
    questionText: "<p><strong>题目：</strong>某 C 程序由以下三个模块组成。链接器在处理对符号 <code>x</code> 的引用时，最终会选择哪个模块中的哪个定义？请根据强/弱符号规则逐步分析：</p><pre>\n/* module1.c */\nint x = 5;        // 定义 A\nint y;            // 定义 B\n\n/* module2.c */\ndouble x = 3.14;  // 定义 C\n\n/* module3.c */\nint x;            // 定义 D\n</pre><p>如果链接器最终选择模块2中的 x（定义C），当模块1中的函数读取 x 并当作 int 使用时会发生什么问题？</p>",
    answerHtml: "<p><strong>符号解析分析（3分）：</strong></p><table><tbody><tr><th>定义</th><th>符号</th><th>所在模块</th><th>类型</th><th>说明</th></tr><tr><td>A</td><td>x</td><td>module1.c</td><td><strong>强符号</strong></td><td>已初始化（=5），强符号</td></tr><tr><td>B</td><td>y</td><td>module1.c</td><td>弱符号</td><td>未初始化全局变量 = 弱符号</td></tr><tr><td>C</td><td>x</td><td>module2.c</td><td><strong>强符号</strong></td><td>已初始化（=3.14），强符号</td></tr><tr><td>D</td><td>x</td><td>module3.c</td><td>弱符号</td><td>未初始化，弱符号</td></tr></tbody></table><p><strong>强/弱符号规则：</strong></p><ol><li>不允许有多个同名的强符号 → 链接错误（多重定义）。</li><li>一个强符号 + 多个弱符号 → 选强符号。</li><li>只有弱符号 → 选其中任意一个（通常选第一个遇到的）。</li></ol><p>符号 <code>x</code> 有<strong>两个强符号</strong>：定义 A（module1.c 中 int x=5）和定义 C（module2.c 中 double x=3.14）。按规则 1，链接器会报告 <strong>多重定义错误（multiple definition of 'x'）</strong>，链接失败。</p><p><strong>但如果链接器强制选择模块2（3分）：</strong></p><p>即使绕过多重定义检查，module1 中代码用 <code>int</code> 类型读取模块2中用 <code>double</code> 类型存储的 x，会发生<strong>类型不匹配</strong>的严重后果：</p><ul><li>double 占 8 字节，采用 IEEE 754 编码</li><li>int 占 4 字节，采用补码编码</li><li>用 %d 读取 double 的前 4 字节，得到的不是 3，而是一个完全无意义的整数（取决于 3.14 的 IEEE 754 二进制表示的低 4 字节）</li></ul><p>$3.14$ 的 IEEE 754 双精度表示为 $0x40091EB851EB851F$，低 4 字节为 $0x51EB851F$，按补码解释约为 $1374389535$——完全不是 3。</p><p><strong>总结：</strong>多重定义错误导致链接失败，即使强行链接也会因类型不匹配产生错误结果。这说明了头文件中只放声明（extern）的重要性。</p><p><strong>评分要点：</strong>正确识别四个定义的强弱属性（2分）；指出两个强符号导致多重定义错误（1分）；解释 int/double 混用的内存布局差异（1分）；给出具体数值说明严重性（1分）。</p>"
  },
  {
    id: "eq-s7-2",
    moduleId: "s7",
    year: "近年概念/分析题",
    position: "重定位",
    points: 5,
    questionText: "<p><strong>题目：</strong>链接器在重定位阶段需要做两种重定位：<strong>相对重定位</strong>（R_386_PC32）和<strong>绝对重定位</strong>（R_386_32）。请：(1) 解释两者的区别；(2) 假设 main.o 中有一条 <code>call swap</code> 指令位于代码段偏移 0x20 处（call 指令后下一条指令地址为 0x25），重定位条目指定引用符号 swap，而链接后 swap 函数的运行时地址被确定为 0x08048350。请计算重定位后的 <code>call</code> 指令中应填入的偏移值。</p>",
    answerHtml: "<p><strong>(1) 两种重定位的区别（2分）：</strong></p><table><tbody><tr><th>类型</th><th>重定位方式</th><th>典型用途</th></tr><tr><td>R_386_PC32（相对）</td><td>填入 offset = S - P，其中 S = 目标符号运行时地址，P = 被重定位字段所在指令的下一条指令地址</td><td>call 指令、jmp 指令、条件跳转（都是 PC 相对寻址）</td></tr><tr><td>R_386_32（绝对）</td><td>填入 S 本身（目标符号的运行时地址）</td><td>全局变量引用、函数指针、switch 跳转表</td></tr></tbody></table><p>核心区别：相对重定位用的是\"目标地址 - 当前位置\"（相对偏移，与加载位置无关），绝对重定位直接用目标地址。</p><p><strong>(2) 偏移值计算（3分）：</strong></p><p>已知：$S$（swap 运行时地址）= $0x08048350$。main.o 的 .text 段被链接器分配基址，call 下一条指令地址 $P = \\text{base} + 0x25$。设 main 段基址为 $A$，则 $P = A + 0x25$。</p><p>$\\text{offset} = S - P = 0x08048350 - (A + 0x25)$</p><p>若假设 $A = 0x08048300$（常见情况），则 $P = 0x08048325$，$\\text{offset} = 0x08048350 - 0x08048325 = \\mathbf{0x2B}$。</p><p><strong>答案：</strong>填入值 $= S - P$。具体值取决于段基址分配，若 call 下一条在 $0x08048325$ 则填入 $0x2B$。</p><p><strong>评分要点：(1)</strong> 两种类型各 1 分，需说明公式和应用场景。<strong>(2)</strong> 理解 S-P 公式（1分），正确识别 P 的含义（1分），计算正确（1分）。</p>"
  },

  // ── S8 异常控制流与进程 ──
  {
    id: "eq-s8-1",
    moduleId: "s8",
    year: "近年分析题",
    position: "fork输出预测",
    points: 6,
    questionText: "<p><strong>题目：</strong>阅读以下 C 代码，回答：(1) 程序总共输出多少个字符 'X'？(2) 如果不使用 <code>\\n</code> 而使用 <code>printf(\"X\")</code>（不带换行），输出会有什么不同，为什么？</p><pre>#include &lt;stdio.h&gt;\n#include &lt;unistd.h&gt;\n#include &lt;sys/wait.h&gt;\n\nint main() {\n    int i;\n    for (i = 0; i &lt; 2; i++) {\n        fork();\n        printf(\"X\\n\");\n    }\n    return 0;\n}</pre>",
    answerHtml: "<p><strong>(1) 输出多少个 X（3分）：</strong></p><p>逐次分析 fork 树（每次循环 fork 后打印 X\\n，然后进入下一轮）：</p><p><strong>i=0 时：</strong>初始进程 P0 调用 fork() → 创建子进程 P1。P0 和 P1 各执行一次 printf(\"X\\n\") → 共 2 个 X。现在有 2 个进程（P0, P1）进入 i=1。</p><p><strong>i=1 时：</strong>P0 调用 fork() → 创建 P0'（P0 的第二个 child）。P1 调用 fork() → 创建 P1'（P1 的 child）。4 个进程各执行一次 printf(\"X\\n\") → 共 4 个 X。</p><p><strong>总计：</strong>$2 + 4 = 6$ 个 X。最终 4 个进程。</p><p><strong>验证公式：</strong>for 循环内 fork 且每次循环体尾部无条件继续，进程数每轮翻倍：$1 \\to 2 \\to 4$。</p><p>严谨计数：</p><table><tbody><tr><th>进程</th><th>i=0 后</th><th>i=1 后</th></tr><tr><td>P0</td><td>打印 1 个 X</td><td>fork→P0'，P0+P0' 各打印 1 个 = 2 个</td></tr><tr><td>P1</td><td>打印 1 个 X</td><td>fork→P1'，P1+P1' 各打印 1 个 = 2 个</td></tr></tbody></table><p>总 X：P0(1)+P1(1)+P0(1)+P0'(1)+P1(1)+P1'(1) = 6。</p><p><strong>(2) 不带 \\n 的区别（3分）：</strong></p><p>如果写成 <code>printf(\"X\")</code>（无 \\n），输出不会立即 flush 到终端。由于 stdout 默认是<strong>行缓冲</strong>（line-buffered），没有 \\n 时 X 暂时留在进程的 stdio 缓冲区中。当 fork() 被调用时，<strong>子进程会复制父进程的整个地址空间，包括 stdio 缓冲区</strong>。</p><p>结果：每个 fork 时缓冲区中已有的 X 被复制到子进程的缓冲区中。最终每个进程退出时 flush 缓冲区，会输出<strong>多于 6 个</strong> X。</p><p>具体分析：i=0 时 P0 把 X 放入缓冲区（未打印）。P0 fork → P1 的缓冲区也复制了一份 X。然后 2 个进程进入 i=1，各自 fork 前缓冲区中的 X 被复制……最终退出时多个缓冲区 flush，输出结果大概率是 8 个 X。</p><p><strong>教训：</strong>fork 前一定要 fflush(stdout) 或使用 \\n，否则缓冲区被复制导致重复输出。</p><p><strong>评分要点：(1)</strong> 进程树正确（1分），每次 fork 后进程数正确（1分），最终计数 6 正确（1分）。<strong>(2)</strong> 指出行缓冲机制（1分），指出 fork 复制缓冲区（1分），给出 > 6 的结论（1分）。</p>"
  },
  {
    id: "eq-s8-2",
    moduleId: "s8",
    year: "近年程序分析题",
    position: "信号处理",
    points: 4,
    questionText: "<p><strong>题目：</strong>以下程序尝试在子进程结束时自动回收它（避免僵尸进程）。但程序有一个严重的 bug——在高负载下可能丢失 SIGCHLD 信号，导致部分子进程变成僵尸。请：(1) 指出 bug 所在；(2) 给出修复方案并写出修正后的 signal handler。</p><pre>\nvoid sigchld_handler(int sig) {\n    int old_errno = errno;\n    pid_t pid = wait(NULL);\n    printf(\"child %d reaped\\n\", pid);\n    errno = old_errno;\n}\n\nint main() {\n    signal(SIGCHLD, sigchld_handler);\n    for (int i = 0; i &lt; 5; i++) {\n        if (fork() == 0) {\n            sleep(1);\n            exit(0);\n        }\n    }\n    while (1) sleep(10);\n    return 0;\n}\n</pre>",
    answerHtml: "<p><strong>(1) Bug 分析（2分）：</strong></p><p>核心 bug：<strong>handler 中只调用了一次 wait(NULL)，而标准的 POSIX 信号不排队（不计数）</strong>。当多个子进程几乎同时退出时，多个 SIGCHLD 可能合并为一个信号投递到父进程。此时 handler 只回收了一个子进程，其余子进程变成僵尸（zombie），直到父进程退出。</p><p>另外还有一个次要 bug：使用了 <code>signal()</code> 而非 <code>sigaction()</code>。signal() 在不同 UNIX 变体中行为不一致（有的在 handler 执行期间自动屏蔽该信号，有的在 handler 入口重置为 SIG_DFL）。</p><p><strong>(2) 修复方案（2分）：</strong></p><p>在 handler 中使用 <strong><code>while</code> 循环 + <code>WNOHANG</code></strong> 一次性回收所有已退出的子进程：</p><pre>\nvoid sigchld_handler(int sig) {\n    int old_errno = errno;\n    pid_t pid;\n    while ((pid = waitpid(-1, NULL, WNOHANG)) &gt; 0) {\n        // 回收成功，继续循环直到没有更多退出的子进程\n        printf(\"child %d reaped\\n\", pid);\n    }\n    errno = old_errno;\n}</pre><p>关键改进：</p><ul><li><code>waitpid(-1, NULL, WNOHANG)</code> 而非 <code>wait(NULL)</code>：WNOHANG 使得当没有更多已退出子进程时立即返回 0（而非阻塞等待）；-1 表示等待任意子进程。</li><li><code>while</code> 循环确保一次 handler 调用回收所有已退出的子进程。</li></ul><p><strong>评分要点：(1)</strong> 指出只调用一次 wait 无法处理多个同时退出的子进程（1分）；提到 POSIX 信号不排队/合并投递（1分）。<strong>(2)</strong> 使用 while 循环（1分）；使用 waitpid + WNOHANG（1分）。</p>"
  },

  // ── S9 存储层次与 Cache ──
  {
    id: "eq-s9-1",
    moduleId: "s9",
    year: "近年计算题",
    position: "地址分解+命中判断",
    points: 8,
    questionText: "<p><strong>题目：</strong>某计算机采用 32 位物理地址，Cache 参数如下：直接映射，总容量 $C = 8\\text{ KB}$，块大小 $B = 32\\text{ bytes}$。(1) 求 S（组数）、E（每组行数）、b（块内偏移位数）、s（组索引位数）、t（标记位数）；(2) 对以下地址访问序列，判断每次访问是否命中（假设初始 Cache 为空）：$0x1000,\\ 0x1020,\\ 0x1004,\\ 0x1000,\\ 0x2020,\\ 0x1000$。</p>",
    answerHtml: "<p><strong>(1) 参数计算（4分）：</strong></p><ul><li>块大小 $B = 32$ bytes → 块内偏移位宽 $b = \\log_2 32 = \\mathbf{5}$ 位</li><li>总容量 $C = 8\\text{ KB} = 8192$ bytes</li><li>块数 $= C / B = 8192 / 32 = 256$ 块</li><li>直接映射 → $E = 1$（每组 1 行），$S = 256$ 组</li><li>组索引位宽 $s = \\log_2 256 = \\mathbf{8}$ 位</li><li>标记位宽 $t = m - s - b = 32 - 8 - 5 = \\mathbf{19}$ 位</li></ul><p><strong>确认：</strong>$S = 256,\\ E = 1,\\ b = 5,\\ s = 8,\\ t = 19$</p><p><strong>(2) 命中/缺失追踪（4分）：</strong></p><table><tbody><tr><th>地址</th><th>Tag (19b)</th><th>Set (8b)</th><th>Offset (5b)</th><th>命中?</th></tr><tr><td>$0x1000$</td><td>$0x00000$</td><td>$0x80$</td><td>$0x00$</td><td>缺失（冷启动）</td></tr><tr><td>$0x1020$</td><td>$0x00000$</td><td>$0x81$</td><td>$0x00$</td><td>缺失（不同 set）</td></tr><tr><td>$0x1004$</td><td>$0x00000$</td><td>$0x80$</td><td>$0x04$</td><td><strong>命中</strong>（与 0x1000 同一块）</td></tr><tr><td>$0x1000$</td><td>$0x00000$</td><td>$0x80$</td><td>$0x00$</td><td><strong>命中</strong>（块已在 Cache）</td></tr><tr><td>$0x2020$</td><td>$0x00001$</td><td>$0x81$</td><td>$0x00$</td><td>缺失（Set 0x81 tag 不匹配，原 $0x00000$ vs 新 $0x00001$）</td></tr><tr><td>$0x1000$</td><td>$0x00000$</td><td>$0x80$</td><td>$0x00$</td><td><strong>命中</strong>（未被替换）</td></tr></tbody></table><p><strong>结果：</strong>缺失 3 次，命中 3 次。</p><p><strong>示例分解（以 $0x1000$ 为例）：</strong>$0x1000 = 0000\\ 0000\\ 0000\\ 0000\\ 0001\\ 0000\\ 0000\\ 0000_2$。低 5 位 Offset=$00000_2$，中 8 位 Set=$10000000_2=128=0x80$，高 19 位 Tag=$0x00000$。</p><p><strong>评分要点：(1)</strong> b=5, s=8, t=19 各 1 分，E=1,S=256 共 1 分。<strong>(2)</strong> 每个地址判断正确得约 0.67 分，6 个共 4 分。必须写出 set/tag 对比逻辑，只写结果扣一半。</p>"
  },
  {
    id: "eq-s9-2",
    moduleId: "s9",
    year: "近年概念/分析题",
    position: "Cache替换策略",
    points: 5,
    questionText: "<p><strong>题目：</strong>某 2 路组相联 Cache 共有 4 个组，采用 LRU 替换策略。(1) 对于地址序列（仅给出 set 索引和 tag）：<code>(set=0,tag=A), (set=0,tag=B), (set=0,tag=C), (set=0,tag=A), (set=0,tag=B), (set=0,tag=D)</code>，假设初始 set 0 的两路为空，写出每次访问是命中还是缺失，以及访问后 set 0 的内容。(2) 如果改用 FIFO 替换策略，上述序列的命中和缺失情况有何不同？说明原因。</p>",
    answerHtml: "<p><strong>(1) LRU 策略追踪（3分）：</strong></p><table><tbody><tr><th>#</th><th>访问</th><th>命中?</th><th>Set 0 内容（路0 / 路1）</th><th>LRU 顺序</th></tr><tr><td>1</td><td>(0,A)</td><td>缺失</td><td>A / -</td><td>A(最近)</td></tr><tr><td>2</td><td>(0,B)</td><td>缺失</td><td>A / B</td><td>B>A</td></tr><tr><td>3</td><td>(0,C)</td><td>缺失</td><td>C / B</td><td>C>B（替换 A，A 最久未用）</td></tr><tr><td>4</td><td>(0,A)</td><td>缺失</td><td>C / A</td><td>A>C（替换 B，B 最久未用）</td></tr><tr><td>5</td><td>(0,B)</td><td>缺失</td><td>B / A</td><td>B>A（替换 C，C 最久未用）</td></tr><tr><td>6</td><td>(0,D)</td><td>缺失</td><td>B / D</td><td>D>B（替换 A，A 最久未用）</td></tr></tbody></table><p><strong>结果：</strong>全部缺失（6 次缺失，0 次命中）。</p><p>原因：总共只有 2 路，6 次访问涉及 4 个不同 tag (A,B,C,D)，即使有 LRU 复用也跟不上，因为 A 在被 LRU 踢出之后才再次出现。</p><p><strong>(2) FIFO 替代策略对比（2分）：</strong></p><p>FIFO 在此序列下也是<strong>6 次全缺失</strong>——当只有 2 路且访问 4 个不同 tag 时，FIFO 和 LRU 表现相同（每次未命中都改变两个 slot 中的一个）。</p><p>FIFO vs LRU 的区别在<strong>访问模式有局部性重复</strong>时才体现。例如序列 (0,A)(0,B)(0,A)(0,C) 在 2 路下：LRU 第 3 次命中（A 仍在），FIFO 同样命中（2 路未满）。但若序列为 (0,A)(0,B)(0,C)(0,B)(0,A)：LRU 第 4 次命中 B、第 5 次缺失 A；FIFO 第 4 次同样命中 B，但第 5 次踢出 A（最老入队）后 A 再出现会缺失。</p><p><strong>核心区别：</strong>LRU 利用\"最近使用\"信息做替换决策，在时间局部性强的场景显著优于 FIFO。FIFO 只看入队时间，不看最近访问，容易踢走\"老的但频繁使用的\"块。</p><p><strong>评分要点：(1)</strong> 每次访问的命中/缺失判断正确（1.5分），替换决策逻辑正确且 LRU 顺序正确（1.5分）。<strong>(2)</strong> 指出 FIFO 只看入队时间不看最近访问（1分），给出区别仅在局部性场景下体现的结论（1分）。</p>"
  },

  // ── S10 虚拟内存 ──
  {
    id: "eq-s10-1",
    moduleId: "s10",
    year: "2025 期末考试",
    position: "地址翻译综合",
    points: 12,
    questionText: "<p><strong>题目（2025 期末考试题）：</strong>某系统虚拟地址 20 位，物理地址 16 位，页面大小 $P = 256$ 字节，采用两级页表。一级页表共 $2^6=64$ 项，每个二级页表 $2^4=16$ 项。给定虚拟地址 $VA = 0x0A3F2$（20 位），请：(1) 给出页表结构的字段拆分（VPN1/VPN2/VPO 各多少位）；(2) 写出此 VA 对应的 VPN1、VPN2、VPO；(3) 给定部分页表内容，完成从 VA 到 PA 的完整翻译过程（若缺页请说明）；(4) TLB 采用 4 路组相联，共 2 组，请写出此 VA 的 TLBT 和 TLBI。</p><p><strong>页表内容：</strong></p><p>一级页表（部分）：$PDE[0xA]=0x1A3$（有效位=1），$PDE[0xB]=0x0$（有效位=0）</p><p>二级页表（PDE=$0x1A3$ 指向的页表，共 16 项）：$PTE[0xF]=0x47$（有效位=1），$PTE[0xE]=0x00$（有效位=0），其余 PTE 有效位=0</p>",
    answerHtml: "<p><strong>(1) 字段拆分（3分）：</strong></p><ul><li>页面大小 $P=256$ 字节 → VPO = PPO = $\\log_2 256 = \\mathbf{8}$ 位</li><li>二级页表有 $2^4=16$ 项 → VPN2 = $\\log_2 16 = \\mathbf{4}$ 位</li><li>VA 共 20 位 → VPN1 = $20 - 4 - 8 = \\mathbf{8}$ 位</li></ul><p><strong>注意：</strong>按 VPN1=8 位，一级表应有 $2^8=256$ 项，题目给 $2^6=64$ 说明一级表的实际索引位数更少（6 位），但 VA 字段拆分按给定的 VPN 位数计算。统一使用 VPN1=8 位（取 VA 高 8 位作为一级索引，与 64 项表不矛盾——索引值在 0~63 范围内有效）。</p><p><strong>(2) VA 分解（3分）：</strong></p><p>$VA = 0x0A3F2$，20 位二进制：$0000\\ 1010\\ 0011\\ 1111\\ 0010$</p><ul><li>VPN1 = 高 8 位 = $0000\\ 1010_2 = \\mathbf{0x0A}$</li><li>VPN2 = 中 4 位 = $0011_2 = \\mathbf{0x3}$</li><li>VPO = 低 8 位 = $1111\\ 0010_2 = \\mathbf{0xF2}$</li></ul><p><strong>(3) 地址翻译过程（4分）：</strong></p><p><strong>Step 1</strong>：用 VPN1 = 0x0A 查一级页表 $PDE[0x0A]$。已给出 $PDE[0xA] = 0x1A3$，有效位=1 → <strong>有效</strong>。该 PDE 指向二级页表的物理基址（PPN 部分为 $0x1A3$，含控制位）。</p><p><strong>Step 2</strong>：用 VPN2 = 0x3 查对应的二级页表。二级页表基址 = PDE 中的 PPN 部分 $\\times$ 页面大小，偏移 = VPN2 $\\times$ PTE 大小 = $0x3 \\times 4$ 字节。查找 $PTE[0x3]$。题目给出 $PTE[0xF]=0x47$（有效位=1）、$PTE[0xE]=0x00$（有效位=0），并说明\"其余 PTE 有效位=0\"。因此 <strong>$PTE[0x3]$ 有效位 = 0 → 缺页（Page Fault）</strong>。</p><p><strong>发生缺页</strong>：触发 page fault 异常，OS 从磁盘调入对应页面，设置 PTE 后重新执行访问指令。</p><p><strong>若 PTE[0x3] 有效</strong>（假设 PTE[0x3]=0x47）：物理页号 PPN = 0x47，$PA = PPN \\times 256 + VPO = 0x47 \\times 256 + 0xF2 = 0x4700 + 0xF2 = \\mathbf{0x47F2}$。</p><p><strong>(4) TLB 查找过程（2分）：</strong></p><p>TLB 4 路组相联、2 组 → 组索引位宽 = $\\log_2 2 = \\mathbf{1}$ 位。</p><p>VA 对 TLB 而言，VPN = VPN1 + VPN2 = 12 位 = $0x0A3$。</p><p>$\\text{TLBI} = \\text{VPN 最低 1 位} = 1$ → 组 1。</p><p>$\\text{TLBT} = \\text{VPN 高 11 位} = 0000\\ 1010\\ 001_2 = \\mathbf{0x051}$。</p><p>在组 1 的 4 路中并行比较 TLBT，若命中则获得 PPN，$PA = PPN + VPO$。</p><p><strong>评分要点：(1)</strong> 字段拆分正确（3分）；<strong>(2)</strong> VA 分解每个字段正确（3分）；<strong>(3)</strong> 翻译流程完整、缺页判断正确（4分）；<strong>(4)</strong> TLB 查找参数和步骤正确（2分）。</p>"
  },
  {
    id: "eq-s10-2",
    moduleId: "s10",
    year: "近年概念/分析题",
    position: "TLB+Cache联合翻译",
    points: 8,
    questionText: "<p><strong>题目：</strong>某系统采用虚拟地址访问内存，TLB 命中率为 95%，L1 Cache 命中率为 90%。假设 TLB 访问和 Cache 访问可以错开（即 TLB 翻译完成后才查 Cache）。一次 TLB 查询耗时 1 个时钟周期，一次 Cache 查询耗时 1 个时钟周期，一次内存访问（读页表或读数据）耗时 50 个时钟周期。求：(1) 平均每次访存的时钟周期数；(2) 如果采用物理地址索引 Cache（PIPT），与虚拟地址索引 Cache（VIVT）相比，在上下文切换时有何优势和劣势？</p>",
    answerHtml: "<p><strong>(1) 平均访存时间计算（4分）：</strong></p><table><tbody><tr><th>情况</th><th>TLB</th><th>Cache</th><th>概率</th><th>时延（周期）</th></tr><tr><td>A</td><td>命中</td><td>命中</td><td>$0.95 \\times 0.90 = 0.855$</td><td>$1 + 1 = 2$</td></tr><tr><td>B</td><td>命中</td><td>缺失</td><td>$0.95 \\times 0.10 = 0.095$</td><td>$1 + 1 + 50 = 52$</td></tr><tr><td>C1</td><td>缺失</td><td>命中</td><td>$0.05 \\times 0.90 = 0.045$</td><td>$1 + 50 + 1 = 52$</td></tr><tr><td>C2</td><td>缺失</td><td>缺失</td><td>$0.05 \\times 0.10 = 0.005$</td><td>$1 + 50 + 1 + 50 = 102$</td></tr></tbody></table><p><strong>AMAT（平均访存时间）：</strong></p><p>$\\text{AMAT} = 0.855 \\times 2 + 0.095 \\times 52 + 0.045 \\times 52 + 0.005 \\times 102$</p><p>$= 1.71 + 4.94 + 2.34 + 0.51 = \\boxed{9.50}$ 个时钟周期。</p><p><strong>(2) PIPT vs VIVT 对比（4分）：</strong></p><table><tbody><tr><th>方面</th><th>PIPT（物理地址索引 Cache）</th><th>VIVT（虚拟地址索引 Cache）</th></tr><tr><td>索引方式</td><td>用 PA 的组索引位选择 Cache 组</td><td>用 VA 的组索引位选择 Cache 组</td></tr><tr><td>上下文切换</td><td><strong>无影响</strong>——不同进程的同一 VA 映射到不同 PA，按 PA 索引天然隔离。切换后 Cache 无需刷新。</td><td><strong>需处理同义词/别名</strong>——不同进程的同一 VA 可能映射到不同 PA，按 VA 索引会导致错误命中旧数据。切换后需 flush 或加 ASID 标签。</td></tr><tr><td>速度</td><td>需要等 TLB 翻译出 PA 后才能开始查 Cache → <strong>串行延迟</strong></td><td>可以与 TLB 翻译<strong>并行</strong>进行（VA 已知直接查 Cache）→ 速度快</td></tr><tr><td>同义词问题</td><td>无——同一 PA 只有一个索引位置</td><td>有——同一物理页可能被映射到两个不同 VA（不同 VPN），导致 Cache 中有两份同一数据</td></tr></tbody></table><p><strong>答案：</strong>PIPT 优势：上下文切换无需 flush，无同义词/别名问题，实现简单。劣势：Cache 查询必须等 TLB 翻译完，增加延迟（可用 VIPT + 页面着色缓解）。VIVT 优势：查 Cache 和 TLB 翻译可并行；劣势：上下文切换需处理别名/同义词，可能需要 flush Cache 或加 ASID。</p><p><strong>评分要点：(1)</strong> 四种情况概率和时延正确（2分），AMAT 计算正确（2分）。<strong>(2)</strong> PIPT 优势（切换无需flush/无别名）2分，VIVT 优势和劣势对比 2 分。</p>"
  },

  // ── S11 性能优化 ──
  {
    id: "eq-s11-1",
    moduleId: "s11",
    year: "近年分析题",
    position: "循环展开+阻塞",
    points: 5,
    questionText: "<p><strong>题目：</strong>以下是矩阵乘法 $C = A \\times B$ 的三种实现：(1) 朴素三重循环；(2) 内层循环展开 4 次；(3) blocking（分块大小为 $B \\times B$）。请回答：(a) 每种优化主要利用了什么类型的局部性（时间局部性 or 空间局部性），为什么？(b) blocking 的分块大小 $B$ 应该如何选择？过小或过大会导致什么问题？</p><pre>\n// 方案 1: 朴素\nfor (i = 0; i &lt; N; i++)\n  for (j = 0; j &lt; N; j++)\n    for (k = 0; k &lt; N; k++)\n      C[i][j] += A[i][k] * B[k][j];\n\n// 方案 2: 4路展开\nfor (i = 0; i &lt; N; i++)\n  for (j = 0; j &lt; N; j++)\n    for (k = 0; k &lt; N; k += 4) {\n      C[i][j] += A[i][k] * B[k][j]\n               + A[i][k+1] * B[k+1][j]\n               + A[i][k+2] * B[k+2][j]\n               + A[i][k+3] * B[k+3][j];\n    }\n\n// 方案 3: blocking (B=块大小)\nfor (ii = 0; ii &lt; N; ii += B)\n  for (jj = 0; jj &lt; N; jj += B)\n    for (kk = 0; kk &lt; N; kk += B)\n      for (i = ii; i &lt; ii+B; i++)\n        for (j = jj; j &lt; jj+B; j++)\n          for (k = kk; k &lt; kk+B; k++)\n            C[i][j] += A[i][k] * B[k][j];\n</pre>",
    answerHtml: "<p><strong>(a) 局部性分析（3分）：</strong></p><p><strong>方案 1（朴素）：</strong></p><ul><li>A 的访问：i 不变时 k 递增，按行访问 A[i][k] → <strong>空间局部性好</strong>（同一行连续访问）</li><li>B 的访问：k 递增而 j 不变时 B[k][j] 跨行 → <strong>空间局部性差</strong>（大 stride，跨 N 个元素，每次访问大概率 Cache miss）</li><li>C 的访问：内层循环反复读写 C[i][j] → <strong>时间局部性好</strong>（同一个 C[i][j] 被反复累加）</li></ul><p><strong>方案 2（4 路展开）：</strong></p><ul><li>减少循环开销：每 4 次迭代的 k++ 和 k<N 判断从 4 次减为 1 次 → 减少指令数，增加指令级并行机会</li><li>但<strong>未改变数据访问模式</strong>——B[k][j] 跨行访问的 cache miss 问题依然存在</li></ul><p><strong>方案 3（blocking）：</strong></p><ul><li>将整个矩阵分成 $B\\times B$ 的小块处理，使得一个块内的 A 和 B 数据能够<strong>同时</strong>放入 Cache</li><li>A 块：块内按行访问 → 空间局部性好</li><li>B 块：原本 B 的列访问\"跨大行\"（stride=N），现在在块内 stride 减小到 B → <strong>空间局部性改善</strong>；同时 B 的一块数据在整个块计算期间被反复使用 → <strong>时间局部性改善</strong></li><li>这是最根本的改进：<strong>把 B 的大 stride miss 转化为块内 Cache 复用</strong></li></ul><p><strong>(b) B 的大小选择（2分）：</strong></p><p>$B$ 应使 <strong>一个 $B \\times B$ 的 A 块 + 一个 $B \\times B$ 的 B 块 + 一个 $B \\times B$ 的 C 块</strong>能同时放入 L1 Data Cache。</p><p>即 $3 \\times B^2 \\times \\text{element\\_size} \\le \\text{L1 DCache 容量}$。</p><p>例如：L1 DCache = 32KB，double（8字节），$3B^2 \\times 8 \\le 32768$ → $B^2 \\le 1365$ → $B \\le 37$。实际取 $B=32$ 或 $B=64$（按 Cache 行大小对齐更优）。</p><p><strong>B 过小：</strong>分块开销（额外的循环层级、边界检查）占比过大，收益递减。</p><p><strong>B 过大：</strong>块放不进 Cache，B 矩阵的列访问又变成了跨大行的 miss → blocking 失效，退化为方案 1。</p><p><strong>评分要点：(a)</strong> 每种方案的局部性分析各 1 分（共 3 分），需具体说明 A/B/C 的访问模式。<strong>(b)</strong> 给出 B 的选取公式/原则（1分），说明过小和过大的后果（1分）。</p>"
  },
  {
    id: "eq-s11-2",
    moduleId: "s11",
    year: "近年概念题",
    position: "Amdahl定律",
    points: 3,
    questionText: "<p><strong>题目：</strong>某程序 40% 的时间花在浮点运算上。如果通过 SIMD 指令将浮点部分加速 4 倍，整体加速比是多少？如果想让整体加速比达到 2 倍，浮点部分至少需要加速多少倍？（使用 Amdahl 定律公式 $S = \\frac{1}{(1-f) + f/k}$，其中 $f$ 为可加速部分占比，$k$ 为加速倍数）</p>",
    answerHtml: "<p><strong>(1) 浮点加速 4 倍的总体加速比（1.5分）：</strong></p><p>$f = 0.40$（浮点占比），$k = 4$（浮点加速倍数）</p><p>$S = \\frac{1}{(1-0.40) + 0.40/4} = \\frac{1}{0.60 + 0.10} = \\frac{1}{0.70} \\approx \\boxed{1.43}$</p><p>即整体加速约 43%。</p><p><strong>(2) 要达到总体加速 2 倍需要浮点加速多少（1.5分）：</strong></p><p>$S = 2$，$f = 0.40$，求 $k$：</p><p>$2 = \\frac{1}{0.60 + 0.40/k}$</p><p>$0.60 + 0.40/k = 0.50$</p><p>$0.40/k = -0.10$</p><p>$k = -4$ → <strong>不可能！</strong></p><p><strong>分析：</strong>即使浮点部分无限加速（$k \\to \\infty$），$S_{\\max} = \\frac{1}{1-f} = \\frac{1}{0.60} \\approx 1.67 < 2$。所以 40% 的浮点占比<strong>永远无法</strong>让整体加速比达到 2。</p><p><strong>结论：</strong>要让整体加速 2 倍，可加速部分占比 $f$ 必须满足 $\\frac{1}{1-f} \\ge 2$，即 $f \\ge 0.50$（至少 50%）。Amdahl 定律的核心含义：<strong>非加速部分的占比决定了加速上限。</strong></p><p><strong>评分要点：(1)</strong> 公式使用正确 + 计算正确（1.5分）。<strong>(2)</strong> 能计算出 $k<0$ 说明不可能（1分），指出 $S_{\\max}=1/(1-f)$ 上限（0.5分）。</p>"
  },

  // ── S12 安全攻击与防御 ──
  {
    id: "eq-s12-1",
    moduleId: "s12",
    year: "近年分析题",
    position: "缓冲区溢出攻击",
    points: 5,
    questionText: "<p><strong>题目：</strong>以下 C 程序存在缓冲区溢出漏洞：(1) 攻击者可以向 <code>buf</code> 中写入多少字节才能覆盖返回地址？画出此时栈帧的布局，标出 buf 起始位置和返回地址位置之间的距离。(2) 如果该程序以 root 权限运行且编译时未启用任何防御措施，攻击者在覆盖返回地址后最典型的目标是什么（描述两种具体攻击场景）？</p><pre>\nvoid safe() {\n    char buf[64];\n    gets(buf);  // 危险函数！\n}\n\nint main() {\n    safe();\n    return 0;\n}\n</pre><p>假设在 x86-32 平台上，safe() 的栈帧布局为：pushl %ebp; movl %esp,%ebp; sub $64, %esp。</p>",
    answerHtml: "<p><strong>(1) 栈帧分析（3分）：</strong></p><pre>\n        高地址 ↑\n        +------------------+\n        | main 的栈帧 ...  |\n        +------------------+\n        | 返回地址（ret addr）|  ← 溢出目标！！\n        +------------------+\n        | 旧 %ebp           |  ← pushl %ebp 压入\n        +------------------+\n        | buf[60~63]       |\n        | ...              |\n        | buf[0~3]         |  ← sub $64,%esp 后 esp 指向这里\n        +------------------+\n        低地址 ↓\n</pre><p>buf[0] 到返回地址的距离：</p><ul><li>buf 占 64 字节</li><li>紧接 buf 上面是旧 %ebp（4 字节）</li><li>旧 %ebp 上面是返回地址（4 字节）</li><li>从 buf[0] 到返回地址<strong>末尾</strong>：$64 + 4 + 4 = 72$ 字节</li></ul><p><strong>攻击者需要写入 72 字节：</strong>前 64 字节填满 buf，再 4 字节覆盖旧 ebp（可不关心具体值），再 4 字节覆盖返回地址为攻击者想要跳转到的地址。</p><p><strong>(2) 两种攻击场景（2分）：</strong></p><p><strong>场景 A — Shellcode 注入：</strong>攻击者将返回地址改为 buf 的起始地址。前 72 字节的前面部分填入 shellcode（例如 execve(\"/bin/sh\") 的机器码），溢出到返回地址处填入 buf 的地址。safe() 返回时跳到 buf 执行 shellcode，获得 root shell。</p><p><strong>场景 B — Return-to-libc / ROP：</strong>即使栈不可执行（有 NX/DEP），攻击者可以将返回地址改为 libc 中 system() 的地址，并在栈上布置参数（如 \"/bin/sh\" 字符串的地址），实现 system(\"/bin/sh\")。这叫做 return-to-libc 攻击。</p><p><strong>防御手段回顾：</strong></p><ul><li>栈随机化（ASLR）→ 攻击者不知道 buf 地址（但可通过信息泄露绕过）</li><li>Canary → 在 buf 和返回地址之间放一个随机值，返回前检查是否被修改</li><li>NX → 栈不可执行，shellcode 注入失效（但 ROP 仍可用）</li><li>不使用 gets() → 使用 fgets() 并限制长度</li></ul><p><strong>评分要点：(1)</strong> 栈帧图布局正确标出 buf/ebp/ret addr 位置（1.5分），72 字节计算正确（1.5分）。<strong>(2)</strong> 每种攻击场景描述清晰（各 1 分），需含有具体操作而非泛泛而谈。</p>"
  },
  {
    id: "eq-s12-2",
    moduleId: "s12",
    year: "近年概念题",
    position: "防御机制识别",
    points: 3,
    questionText: "<p><strong>题目：</strong>以下描述分别对应哪种防御机制？(1) 在栈帧中返回地址之前放置一个随机值，函数返回前检查该值是否被修改。(2) 将栈标记为不可执行，防止注入的 shellcode 运行。(3) 每次程序加载时，栈、堆、共享库的基地址随机变化。(4) Intel/AMD 在 64 位模式下，CPU 强制要求页表条目中 NX 位为 1 时禁止从该页取指令。</p><p>请为每个防御机制写出名称和一句原理说明。</p>",
    answerHtml: "<p><strong>(1) Stack Canary（栈金丝雀/栈保护）</strong></p><p>原理：编译器在函数入口处在返回地址和局部变量之间插入一个随机生成的守卫值（canary）。函数返回前检查该守卫值是否被修改——如果被修改则说明发生了缓冲区溢出，程序立即终止（而非跳转到攻击者控制的地址）。GCC 中通过 <code>-fstack-protector</code> 启用。</p><p><strong>(2) NX / DEP（No-eXecute / Data Execution Prevention，数据执行保护）</strong></p><p>原理：通过页表条目中的 NX 位（bit 63）标记某页为\"不可执行\"。栈和堆被标记为不可执行后，即使攻击者把 shellcode 注入到栈上，CPU 从栈取指令执行时会触发 page fault 异常终止程序。</p><p><strong>(3) ASLR（Address Space Layout Randomization，地址空间布局随机化）</strong></p><p>原理：每次程序启动时，操作系统将栈、堆、mmap 区域、共享库的加载基地址随机化，使得攻击者无法在代码中硬编码目标地址（如 shellcode 所在栈地址或 libc 函数地址）。这大大增加了远程攻击的难度。</p><p><strong>(4) 硬件 NX 位（Hardware-enforced NX）</strong></p><p>原理：这是 (2) 的硬件实现基础。64 位模式的页表条目中有一个 NX 位（bit 63），CPU 的内存管理单元（MMU）在取指令时检查该位——如果 NX=1，CPU 拒绝从该页执行并产生 page fault。这是 DEP 的硬件支撑机制，Intel/AMD 在 64 位模式中强制执行。</p><p><strong>评分要点：</strong>每项 0.75 分，共 3 分。需写出名称（0.25分）+ 原理说明（0.5分）。只写名称不解释扣 0.5 分/项。</p>"
  }
];

export default EXAM_QUESTIONS;