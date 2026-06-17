import type { Quiz } from '@learncourse/framework/types';

// === 编译工具链 ===

// ── 选择题 ──
export const S3_QUIZZES: Quiz[] = [
  {
    id: "q-s3-3",
    moduleId: "s3",
    question: "使用「gcc -E hello.c -o hello.i」对以下C程序进行预处理后，hello.i 文件中<strong>最不可能</strong>包含的内容是？<br><pre>#include &lt;stdio.h&gt;\n#define MSG \"Hello\"\nint main() { printf(\"%s\\n\", MSG); return 0; }</pre>",
    options: [
      { text: "A. stdio.h 头文件的完整展开内容（如 extern int printf(...) 声明等）", isCorrect: false },
      { text: "B. 「#define MSG \"Hello\"」这条宏定义指令本身", isCorrect: true },
      { text: "C. 「printf(\"%s\\n\", \"Hello\");」——MSG 被替换为字符串字面量后的调用语句", isCorrect: false },
      { text: "D. main 函数的函数体定义", isCorrect: false },
    ],
    feedbackCorrect: "正确！预处理阶段（cpp）的核心工作是宏展开：预处理器扫描源文件，遇到 #define 指令后记录宏定义，随后在代码中将所有宏引用替换为定义体。处理完成后，#define 指令本身被消耗并从输出中移除，.i 文件只保留展开后的代码。因此 MSG 被替换为 \"Hello\"，而 #define 行本身不会出现在 .i 中。",
    feedbackWrong: "不对。预处理阶段（cpp）完成头文件展开（A 会出现）、宏替换（C 会出现）、条件编译处理等工作，并保留函数定义（D 会出现）。但宏定义指令 #define 本身在预处理后被移除，不会出现在 .i 输出中。请记住：.i 文件 = 完整的展开后 C 代码，但不含任何预处理指令。",
    type: "single"
  },
  {
    id: "q-s3-4",
    moduleId: "s3",
    question: "使用「gcc -S hello.c」将 C 源文件编译为汇编文件 hello.s。以下关于编译阶段（cc1）的描述，<strong>正确的是</strong>？",
    options: [
      { text: "A. .s 文件中完整保留了 C 源码中的变量名、类型名和 typedef 别名，以便汇编器 as 进行类型检查", isCorrect: false },
      { text: "B. cc1 将预处理后的 .i 文件直接转换为可重定位目标文件 .o", isCorrect: false },
      { text: "C. .s 文件中使用 movl / addl / call 等汇编指令表达运算和控制流，参数通过寄存器或栈传递，C 类型信息被降级为操作数宽度（如 int→4 字节 movl）", isCorrect: true },
      { text: "D. cc1 的主要工作是检查语法错误、展开宏定义和插入行号标记，不涉及任何目标平台的指令选择", isCorrect: false },
    ],
    feedbackCorrect: "正确！编译阶段（cc1）将预处理后的 .i 文件翻译为 .s 汇编文件。核心变化：C 的 if/for/while 控制流→jmp/je/jne 等跳转指令；运算→mov/add/sub 等指令；类型信息降级——int→4 字节操作数、char→1 字节操作数；参数通过寄存器（x86-64 用 %edi/%esi 等）或栈传递。变量名可能作为注释保留，但不是汇编指令的一部分。",
    feedbackWrong: "不对。A 错：C 类型信息在编译阶段被降级为操作数宽度（如 movl = 32 位操作），变量名最多作为注释保留，typedef 别名被展开为底层类型；B 错：.s 是文本汇编文件，转换为 .o 是汇编器 as 的工作，不是 cc1 的工作——cc1 的输出是 .s；D 错：宏展开是预处理阶段（cpp）的工作，cc1 负责词法/语法/语义分析和目标代码生成，指令选择正是 cc1 的核心职责之一。正确答案是 C。",
    type: "single"
  },
  {
    id: "q-s3-5",
    moduleId: "s3",
    question: "汇编器 as 将 hello.s 转换为 hello.o。使用「nm hello.o」查看符号表，发现 printf 条目标记为「U」。以下<strong>解释最准确</strong>的是？",
    options: [
      { text: "A. printf 的机器码已经被复制到 hello.o 的 .text 段中，标记 U 表示它使用了 User 模式指令", isCorrect: false },
      { text: "B. printf 被标记为 Undefined（未定义），说明它的代码不在本目标文件中，需要在链接阶段由链接器从其他目标文件或共享库（如 libc）中解析其实际地址", isCorrect: true },
      { text: "C. printf 是 Unused 符号，链接器在最终链接时会将其从可执行文件中移除以减小体积", isCorrect: false },
      { text: "D. printf 被标记为 Unique 符号，表示它在程序中只能被调用一次，多次调用会导致链接错误", isCorrect: false },
    ],
    feedbackCorrect: "正确！nm 输出的符号类型「U」代表 Undefined——该符号在当前目标文件中被引用（hello.c 调用了 printf），但其定义（函数体）不在此目标文件中。链接阶段，链接器 ld 会在所有输入目标文件和库文件（如 libc.so）中搜索 printf 的定义，将找到的地址填入调用处的重定位位置。如果链接器在所有输入中都找不到该符号，则报「undefined reference to 'printf'」错误。",
    feedbackWrong: "不对。nm 输出中的 U = Undefined，不是 User、Unused 或 Unique。U 表示该符号在目标文件中被引用但未定义，必须由链接器在其他目标文件或库中解析。printf 的实现位于 C 标准库 libc 中，编译 hello.c 产生的 hello.o 只知道 printf 的签名（通过 stdio.h 声明），其实际代码在链接时才被合并到最终可执行文件。",
    type: "single"
  },
  {
    id: "q-s3-6",
    moduleId: "s3",
    question: "给定两个 C 源文件，分别编译为 a.o 和 b.o：<br><pre>// a.c\nextern int bar();\nint foo() { return bar() + 1; }\nint unused_helper() { return 0; }\n\n// b.c\nextern int foo();\nint bar() { return 2; }\nint main() { return foo(); }</pre>将 a.o 和 b.o 链接时（假设 C 运行时库 crt0 等已正确链接），以下说法<strong>正确的是</strong>？",
    options: [
      { text: "A. 链接失败，因为 a.o 中的符号 bar 在本文件和其他文件中都没有定义", isCorrect: false },
      { text: "B. 链接成功，a.o 需要 bar 的定义（由 b.o 提供），b.o 需要 foo 的定义（由 a.o 提供），所有跨文件符号引用均可解析", isCorrect: true },
      { text: "C. 链接失败，因为 b.o 中声明了 extern int foo() 但未实际调用，链接器仍然会尝试解析该声明", isCorrect: false },
      { text: "D. 链接成功，但 unused_helper 函数因未被任何模块引用，链接器默认报告 warning", isCorrect: false },
    ],
    feedbackCorrect: "正确！这是链接器符号解析的典型场景。逐个分析：a.o 定义了 foo 和 unused_helper，引用了 bar（未定义）；b.o 定义了 bar 和 main，引用了 foo（未定义）。交叉解析——a.o 需要的 bar→b.o 提供 bar ✓；b.o 需要的 foo→a.o 提供 foo ✓。unused_helper 虽然未被任何模块调用，但不影响链接——链接器只需解析被引用的符号，未被引用的全局符号不会导致错误或 warning。",
    feedbackWrong: "不对。关键在于理解跨目标文件的符号供需关系。A 错：bar 虽然在 a.o 中是未定义符号，但 b.o 提供了 bar 的定义，链接器可以解析；C 错：b.o 中 foo 被 main 函数实际调用（return foo()），故确实生成了对 foo 的引用；D 错：未使用的全局函数在默认链接选项下不会产生 warning（静态函数未使用由编译器在编译期报告，与链接器无关）。正确答案是 B。",
    type: "single"
  },
  {
    id: "q-s3-7",
    moduleId: "s3",
    question: "在编译和链接一个多文件 C 项目时，可能在不同阶段遇到不同性质的错误。请将以下三个错误与产生错误的阶段进行匹配：<br>① 「fatal error: 'nonexist.h' file not found」<br>② 「error: expected ';' after expression」<br>③ 「undefined reference to 'sqrt'」<br>以下匹配<strong>正确的是</strong>？",
    options: [
      { text: "A. ①-编译（cc1），②-预处理（cpp），③-链接（ld）", isCorrect: false },
      { text: "B. ①-预处理（cpp），②-编译（cc1），③-链接（ld）", isCorrect: true },
      { text: "C. ①-汇编（as），②-编译（cc1），③-预处理（cpp）", isCorrect: false },
      { text: "D. ①-预处理（cpp），②-编译（cc1），③-汇编（as）", isCorrect: false },
    ],
    feedbackCorrect: "正确！三个错误分别对应工具链的三个不同阶段：① 头文件找不到——预处理阶段（cpp）：预处理器在标准头文件路径和 -I 指定路径中搜索 #include 引用的文件，找不到则报 fatal error，此刻尚未进入编译；② 语法错误（缺少分号）——编译阶段（cc1）：编译器对预处理后的代码进行词法分析和语法分析，发现 token 序列不符合 C 语法规则时报告 error；③ 未定义引用——链接阶段（ld）：各目标文件已成功编译为 .o，但链接器发现 sqrt 符号在所有输入文件和默认链接库中均无定义时报告 undefined reference（需用 -lm 链接数学库解决）。",
    feedbackWrong: "不对。错误信息可以清楚地指示发生的阶段：① 头文件找不到由预处理器（cpp）在搜索 include 路径时报告，与语法和语义无关；② 分号缺失等语法错误由编译器（cc1）在语法分析阶段报告；③ undefined reference 是链接器（ld）的标志性错误，表示符号在链接阶段无法解析。注意：sqrt 函数定义在 libm 中，需要使用 -lm 选项链接数学库。正确答案是 B。",
    type: "single"
  },
];

// ── 模拟题 ──
export const S3_SIM_QUESTIONS: ExamQuestion[] = [
  {
    id: "sim-s3-1",
    moduleId: "s3",
    year: "模拟题",
    position: "自编",
    points: 10,
    questionText: "<p>简述 GCC 工具链将 C 源程序 hello.c 转换为可执行文件的完整四阶段流程。要求：① 写出每个阶段的名称、负责的工具（可执行程序名）和输入/输出文件类型（含文件后缀名）；② 简要说明每个阶段的核心功能；③ 说明如果只需要生成目标文件 .o 而不进行链接，应该使用什么 GCC 选项。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p>\n<p><strong>第一阶段：预处理（Preprocessing）——工具：cpp</strong><br>输入：hello.c（C 源文件 .c）<br>输出：hello.i（预处理后的 C 源文件 .i）<br>功能：① 处理以 # 开头的预处理指令：将 #include 指定的头文件内容递归展开嵌入；② 将 #define 宏定义展开，所有宏引用替换为定义体；③ 处理 #ifdef / #ifndef / #if 等条件编译指令，决定保留或删除代码块；④ 删除注释；⑤ 添加行号标记（# line 指令）以支持编译阶段的错误定位。此阶段不涉及任何语法检查，输出仍是合法的 C 源代码文本。</p>\n<p><strong>第二阶段：编译（Compilation）——工具：cc1</strong><br>输入：hello.i（预处理后的 C 代码 .i）<br>输出：hello.s（汇编代码文件 .s）<br>功能：这是工具链的核心阶段。① 词法分析：将字符流分解为 token（关键字、标识符、运算符、字面量等）；② 语法分析：根据 C 语言文法将 token 序列构建为抽象语法树（AST）；③ 语义分析：检查类型匹配、作用域、声明等语义约束；④ 中间代码生成与优化（GCC 使用 GIMPLE/RTL 中间表示）；⑤ 目标代码生成：将中间表示翻译为目标平台（如 x86-64 / ARM）的汇编指令。C 语言的高级控制结构（if/for/while）被翻译为跳转和条件跳转指令，类型信息被降级为操作数宽度（如 int→4 字节 movl）。</p>\n<p><strong>第三阶段：汇编（Assembly）——工具：as</strong><br>输入：hello.s（汇编代码文件 .s）<br>输出：hello.o（可重定位目标文件 .o）<br>功能：将文本形式的汇编指令逐条翻译为二进制机器码。① 将汇编助记符（mov/add/call 等）翻译为对应的机器指令编码（opcode + 操作数）；② 将符号标签（label）记录到符号表中，此时地址是相对于段起始的偏移量；③ 为外部引用的符号（如 printf）生成重定位条目（relocation entry），标记哪些位置需要在链接时填入实际地址；④ 组织 ELF 文件结构，划分 .text 段（代码）、.data 段（已初始化数据）、.rodata 段（只读数据）、.bss 段（未初始化数据）、.symtab（符号表）、.rel.text/.rel.data（重定位表）等。</p>\n<p><strong>第四阶段：链接（Linking）——工具：ld（由 collect2 调用）</strong><br>输入：hello.o（目标文件 .o）+ libc.so / libc.a 等库文件 + crt0.o 等启动文件（提供 _start 入口点）<br>输出：a.out 或 hello（可执行文件，ELF 格式，无固定后缀名）<br>功能：① 符号解析（Symbol Resolution）：将各目标文件中的未定义符号（如 printf）与定义它们的模块（目标文件或库）建立关联；② 重定位（Relocation）：将各目标文件的相对地址合并，确定最终运行时的虚拟地址，修改指令中的地址字段；③ 段合并：将各输入目标文件的同类型段（.text / .data 等）合并为可执行文件中的对应段。链接完成后，所有符号引用均有确定的运行时地址。</p>\n<p><strong>只编译不链接：</strong>使用「gcc -c hello.c」选项，生成 hello.o 后即停止，不执行链接阶段。「-c」意为 compile only（仅编译和汇编，不链接）。</p>"
  },
  {
    id: "sim-s3-2",
    moduleId: "s3",
    year: "模拟题",
    position: "自编",
    points: 15,
    questionText: "<p>某项目包含三个源文件，结构如下：</p>\n<pre>// mathops.c\nint add(int a, int b) { return a + b; }\nstatic int sub(int a, int b) { return a - b; }\nint compute(int x) { return sub(add(x, 10), 5); }\n\n// main.c\nextern int compute(int);\nextern int add(int, int);\nint main() { return compute(3); }\n\n// util.c\nint multiply(int a, int b) { return a * b; }</pre>\n<p>请回答以下问题：</p>\n<p>①（4分）上述三个源文件分别通过「gcc -c」编译为 mathops.o、main.o、util.o。请写出每个 .o 文件的符号表中分别定义了（D）哪些全局符号，引用了（U）哪些未定义符号。（提示：static 函数不导出为全局符号）</p>\n<p>②（4分）在该项目中，linker 是否能成功链接所有三个 .o 文件生成可执行文件？如果不能，请指出具体是哪个符号导致的链接错误。</p>\n<p>③（4分）如果将 util.c 修改为「int add(int a, int b) { return a * b; }」（即定义了与 mathops.c 中同名的全局函数 add），重新编译后尝试链接 mathops.o、main.o 和 util.o。链接器会如何反应？请解释原因。</p>\n<p>④（3分）static 关键字对函数 sub 的作用是什么？从编译和链接的角度解释 static 关键字如何影响符号的可见性。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p>\n<p><strong>① 符号表分析（4分）：</strong></p>\n<p><strong>mathops.o：</strong>定义（D / T 标记）：add、compute。未定义（U 标记）：无。注意：sub 由 static 修饰，不导出为全局符号——它仅在本编译单元内可见，不出现在 .o 文件的全局符号表中（可能以 LOCAL 绑定出现，但不参与跨文件的全局符号解析）。compute 内部调用了 sub，但这是编译单元内部的调用，由编译器直接确定相对偏移，不需要链接器介入。</p>\n<p><strong>main.o：</strong>定义（D / T）：main。未定义（U）：compute、add。extern 声明告诉编译器这两个函数在别处定义，main 函数中对 compute(3) 的调用生成对 compute 的未定义引用。注意：main.c 中也声明了 extern int add(int, int)，但 main 函数体并未直接调用 add——然而 compute 在 mathops.c 中调用了 add，add 的引用由 mathops.o 产生。</p>\n<p><strong>util.o：</strong>定义（D / T）：multiply。未定义（U）：无。util.o 仅定义了一个全局函数，不引用任何外部符号。</p>\n<p>得分要点：① 正确将 static 函数 sub 排除在全局符号表之外（1分）；② 正确识别每个 .o 的定义符号和未定义符号（2分）；③ 指出 main.o 的 compute 引用和 mathops.o 的 add 引用（1分）。</p>\n<p><strong>② 链接结果分析（4分）：</strong></p>\n<p>链接<strong>可以成功</strong>。逐个检查符号供需：main.o 需要 compute → mathops.o 提供 compute ✓；mathops.o 需要 add → add 在 mathops.o 自身中定义 ✓（add 和 compute 都在同一 .o 中，add 对 mathops.o 来说是本地定义的全局符号）。util.o 定义了 multiply 但未被任何模块引用——这不影响链接成功，链接器只关注被引用的未定义符号是否都能找到定义。</p>\n<p>补充说明：本项目未使用 printf 等 C 标准库函数，main 直接调用自定义函数，因此不需要显式链接 libc（但实际中 crt0.o 仍会被链接以提供 _start 入口点，本题假设这些已就绪）。</p>\n<p><strong>③ 符号冲突分析（4分）：</strong></p>\n<p>链接器会报错：<strong>「multiple definition of 'add'」</strong>（符号 add 被多次定义）。原因：mathops.o 和修改后的 util.o 都定义（D）了全局符号 add，链接器在符号解析阶段发现同一全局符号存在多个强定义（strong definition），违反了 C 语言的 ODR（One Definition Rule，单一定义规则）。关键点：① 链接器只看符号名进行匹配——C 语言无 name mangling，不区分函数签名或函数体是否相同；② 即使两个 add 的函数体实现不同（一个做加法、一个做乘法），链接器也无法区分，统一视为符号冲突；③ 全局符号的强定义不允许重复。</p>\n<p>解决方案：① 将至少一个 add 声明为 static，将其作用域限制在所在编译单元；② 修改其中至少一个函数的名称以消除命名冲突。</p>\n<p><strong>④ static 关键字的作用（3分）：</strong></p>\n<p><strong>编译角度：</strong>static 修饰函数或全局变量，将其作用域（scope）限制在定义所在的编译单元（即 .c 文件编译后对应的 .o 文件范围）。编译器不会为该符号生成全局导出条目——在 ELF 符号表中，其绑定属性（st_bind）被标记为 STB_LOCAL 而非 STB_GLOBAL。因此其他编译单元即使使用 extern 声明，也无法通过编译器的符号解析找到它。（1分）</p>\n<p><strong>链接角度：</strong>static 符号不参与跨目标文件的全局链接符号解析。由于它不导出为全局符号，其他 .o 文件即便声明了 extern，链接器在搜索符号表时也无法发现该符号的定义，会报告 undefined reference。这意味着 static 提供了模块级别的信息隐藏。（1分）</p>\n<p><strong>实际价值：</strong>① 避免符号命名冲突——不同 .c 文件中的同名 static 函数互不影响，各自独立编译和链接；② 信息隐藏——模块内部实现细节（如 sub）不对外暴露，外部代码无法意外依赖内部实现；③ 优化机会——编译器明确知道 static 函数不会被外部调用，可做出更激进的优化决策（如内联展开、调用约定优化等）。（1分）</p>"
  },
  {
    id: "sim-s3-3",
    moduleId: "s3",
    year: "模拟题",
    position: "自编",
    points: 12,
    questionText: "<p>某同学需要编译一个调用了数学库函数 sin() 的程序 calc.c。他先后输入了以下两条命令：</p>\n<pre>$ gcc calc.c -o calc            // 命令1：得到链接错误\n$ gcc calc.c -lm -o calc        // 命令2：编译链接成功</pre>\n<p>错误信息为：<code>undefined reference to 'sin'</code>。</p>\n<p>请回答以下问题：</p>\n<p>①（3分）这个错误发生在工具链的哪个阶段？为什么不在更早的阶段被发现？</p>\n<p>②（4分）从符号表的角度解释：为什么 calc.o 中 sin 是未定义符号，而链接器在命令1中找不到它的定义，但在命令2中却找到了？说明 -lm 参数在链接阶段的具体作用及其搜索机制。</p>\n<p>③（5分）静态库 libm.a 和共享库 libm.so 都可以提供 sin 的定义。请从以下三个方面对比静态链接和动态链接：生成的可执行文件大小、运行时内存占用（多个进程同时运行时）、库更新时的维护方式。并说明 GCC 链接器在默认情况下的库选择优先级。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p>\n<p><strong>① 错误发生的阶段（3分）：</strong></p>\n<p>该错误发生在<strong>链接阶段（ld）</strong>。</p>\n<p>为什么不在更早的阶段被发现：预处理阶段（cpp）只需展开 #include &lt;math.h&gt; 即可获得 sin 的函数声明（原型），预处理器不检查符号是否存在；编译阶段（cc1）只需要 sin 的函数声明即可完成类型检查——编译器验证参数类型（double→double）和返回值使用是否合法，不关心 sin 的实现在哪里；汇编阶段（as）将编译生成的 .s 文件翻译为 .o，在重定位表中记录「此处需要 sin 的地址」但不去解析它。只有在链接阶段，链接器必须为所有未定义符号找到实际定义地址才能生成可执行文件，此时发现 sin 不在任何输入文件中才报告 undefined reference。这也是为什么链接错误总是出现在整个构建流程的末尾。</p>\n<p><strong>② 符号表与 -lm 的作用（4分）：</strong></p>\n<p>calc.o 的符号表中，sin 标记为 U（Undefined），因为 calc.c 中调用了 sin 函数（生成了 call 指令），但 sin 的机器码不包含在 calc.o 中——它的定义位于数学库 libm。链接器在解析符号时的搜索规则：① 首先在命令行显式列出的所有 .o 文件中搜索定义；② 然后在 -l 选项指定的库中按从左到右顺序搜索；③ GCC 默认自动链接 libc（C 标准库，包含 printf、malloc 等常用函数），但<strong>不自动链接 libm</strong>（数学库包含 sin、cos、sqrt 等，出于历史原因和减少默认依赖的考虑）。</p>\n<p>命令1（gcc calc.c -o calc）：链接器搜索 calc.o（无 sin 定义）→ 搜索默认链接的 libc（有 printf 等，但无 sin）→ 搜索完毕，sin 仍未解析→报 undefined reference。</p>\n<p>命令2（gcc calc.c -lm -o calc）：链接器搜索 calc.o→搜索 libm.so（或 libm.a），在数学库中找到 sin 的代码定义，将其地址填入重定位位置→链接成功。</p>\n<p>-lm 的含义：「-l&lt;name&gt;」指示链接器搜索名为 lib&lt;name&gt;.so（共享库）或 lib&lt;name&gt;.a（静态库）的库文件。链接器在标准库搜索路径（/usr/lib、/usr/local/lib 等，由 -L 选项扩展）中按顺序查找。注意 -l 选项的位置：应放在引用该库的 .o 文件之后，因为传统链接器从左到右处理，只在遇到未定义符号时才去之前出现的库中搜索（现代 GCC 通常默认 --as-needed 行为，但仍建议正确排序）。</p>\n<p><strong>③ 静态链接 vs 动态链接（5分）：</strong></p>\n<p><strong>可执行文件大小：</strong>静态链接（libm.a）：链接器将 sin 的目标代码（以及 sin 依赖的其他数学函数如 __sin_avx 等）从 libm.a 中提取并复制到最终可执行文件中。可执行文件包含库代码的完整副本，体积显著增大。动态链接（libm.so）：链接器仅在可执行文件中记录对 libm.so.N（版本号）的依赖关系（DT_NEEDED 条目）和 sin 等符号的动态重定位条目。sin 的实际代码保留在共享库文件中，可执行文件体积仅增加少量元数据，远小于静态链接版本。</p>\n<p><strong>运行时内存占用（多进程场景）：</strong>静态链接：每个进程的可执行文件都包含 sin 代码的独立物理副本。N 个进程同时运行时，操作系统为每个进程加载各自的代码段，物理内存中存在 N 份 sin 的代码页面，内存开销约为 N × sin_code_size。动态链接：操作系统的动态链接器（ld.so）在加载第一个使用 libm.so 的进程时，通过 mmap 将 libm.so 的代码段映射到该进程的地址空间。后续加载的进程共享同一份物理内存页（通过页表的 Copy-on-Write 机制——代码段只读，天然共享）。N 个进程只需 1 份 sin 代码的物理内存，仅各进程的私有数据（GOT 中的重定位后地址等）需要独立页面。因此动态链接在多进程场景下内存效率远优于静态链接。</p>\n<p><strong>库更新时的维护方式：</strong>静态链接：数学库 libm.a 更新（如修复安全漏洞或性能优化）后，所有使用该库的可执行文件都必须<strong>重新编译链接</strong>才能获取新代码。若系统中有数百个静态链接的程序使用了 libm，则每个都需要重新发布，维护成本极高。动态链接：只需替换系统中的 libm.so 文件（保持 ABI 向后兼容——即函数签名和行为不变），所有依赖该库的可执行文件在下次启动时由动态链接器自动加载新版本。操作系统级别的安全补丁可以通过更新一个 .so 文件完成，无需重新编译任何应用程序。潜在风险：如果新版本 libm.so 破坏了 ABI 兼容性（如修改了函数签名或行为语义），可能导致现有程序运行异常甚至崩溃——这被称为 DLL Hell 或依赖地狱（dependency hell），需要符号版本管理（symbol versioning）等机制来缓解。</p>\n<p><strong>链接器默认库选择优先级：</strong>在 Linux 系统上，当库搜索路径中同时存在 libm.so（共享库）和 libm.a（静态库）时，GCC 链接器<strong>默认优先选择共享库 .so</strong>。这是出于上述体积、内存和维护性的综合优势考虑。如需强制使用静态库，可以使用「-static」选项进行全静态链接，或使用「-Wl,-Bstatic -lm -Wl,-Bdynamic」在特定库上混合控制链接方式。</p>"
  }
];