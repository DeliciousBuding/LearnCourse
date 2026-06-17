import type { Quiz } from '@learncourse/framework/types';

// === 链接 ===

// ── 选择题 ──
export const S7_QUIZZES: Quiz[] = [
  {
    id: "q-s7-3",
    moduleId: "s7",
    question: "在C语言静态链接过程中，关于强符号（strong symbol）和弱符号（weak symbol）的链接器解析规则，以下描述正确的是？",
    options: [
      { text: "A. 已初始化的全局变量是强符号，未初始化的全局变量是弱符号；若两个强符号同名，链接器选择文件列表中先出现的那个", isCorrect: false },
      { text: "B. 未初始化的全局变量是强符号，函数定义是弱符号；两个弱符号同名时链接器直接报「multiple definition」错误", isCorrect: false },
      { text: "C. 已初始化的全局变量和函数定义均为强符号，未初始化的全局变量为弱符号；两条核心规则：多个强符号同名→报错，一强一弱同名→选用强符号", isCorrect: true },
      { text: "D. extern声明产生弱符号，static变量产生强符号；链接器优先选择占用内存较大的符号定义", isCorrect: false },
    ],
    feedbackCorrect: "正确！Linux链接器解析符号的三条核心规则：(1) 不允许有多个同名的强符号——直接报「multiple definition」错误；(2) 一个强符号和多个弱符号同名时，选择强符号（所有弱符号引用都解析到强符号）；(3) 多个弱符号同名时，任选其一（通常选COMMON块中占用空间最大的）。区分标准：已初始化的全局变量和函数定义=强符号；未初始化的全局变量=弱符号（放入COMMON块）。extern声明不产生符号定义，仅为引用。",
    feedbackWrong: "不对。回顾链接器符号解析三条核心规则：(1) 多个强符号同名→报错（不是「选先出现的」——选先出现只用于全弱符号场景）；(2) 一强多弱→用强符号；(3) 全弱→任选（通常选占空间大的）。区分标准：已初始化的全局变量和所有函数定义=强符号；未初始化的全局变量=弱符号（存在COMMON块中）。extern声明不是定义，只产生UNDEF引用条目。static变量是LOCAL绑定，不参与全局符号解析。",
    type: "single"
  },
  {
    id: "q-s7-4",
    moduleId: "s7",
    question: "在IA-32静态链接中，file1.o的.text段有一条指令「movl var, %eax」引用定义在file2.o中的全局变量var（类型int）。链接后var的运行时地址为0x0804A030，该movl指令位于地址0x08049480处，其机器码为 A1 00 00 00 00（后4字节待重定位）。链接器对这4字节填入的值应为？",
    options: [
      { text: "A. 0x0804A030（小端：30 A0 04 08），因为R_386_32是绝对地址重定位，直接填入符号的运行时地址", isCorrect: true },
      { text: "B. 0x00000BB0（小端：B0 0B 00 00），因为R_386_PC32是PC相对重定位，需计算 offset = 0x0804A030 - 0x08049480 = 0xBB0", isCorrect: false },
      { text: "C. 0x08049480（小端：80 94 04 08），填入引用指令自身的地址，由运行时动态链接器修正", isCorrect: false },
      { text: "D. 0x00000004（小端：04 00 00 00），填var占用的字节数（int=4），链接器据此分配空间", isCorrect: false },
    ],
    feedbackCorrect: "正确！A1是「movl moff, %eax」的指令编码（将32位存储器操作数加载到eax），后4字节是var的32位绝对地址。对于数据引用（全局变量），x86使用绝对寻址模式，对应重定位类型为R_386_32——链接器将符号的最终运行时绝对地址直接写入重定位位置。这里var地址=0x0804A030，直接填入（小端字节序为30 A0 04 08）。注意本题与call指令（R_386_PC32）的关键区别：call使用相对偏移（offset=目标-PC），而数据引用使用绝对地址。",
    feedbackWrong: "不对。区分两种重定位类型是关键：(1) 数据引用（如movl var, %eax）→R_386_32，填入符号的绝对运行时地址，此处即0x0804A030。(2) 函数调用（如call func）→R_386_PC32，填入 offset = 目标地址 - 下条指令地址。本题A1指令是「movl moff, eax」，操作数是32位绝对地址而非相对偏移，因此使用R_386_32。B选项把绝对地址当作了PC相对计算（该计算方式适用于call指令而非movl）。C把重定位值当作引用指令地址本身。D混淆了地址值和数据大小。小端存储规则：0x0804A030 → 30 A0 04 08（低字节在低地址）。",
    type: "single"
  },
  {
    id: "q-s7-5",
    moduleId: "s7",
    question: "某项目包含main.c、foo.c、bar.c三个源文件。以下关于Linux下GCC静态链接操作的描述，正确的是？",
    options: [
      { text: "A. gcc -static -o prog main.c foo.c bar.c 一步完成编译、汇编、静态链接，生成的可执行文件包含libc等所有库代码的完整副本，运行时无需任何.so依赖", isCorrect: true },
      { text: "B. 先用 gcc -c main.c foo.c bar.c 生成三个.a静态库文件，再用 gcc -static -o prog main.a foo.a bar.a 链接为可执行文件", isCorrect: false },
      { text: "C. gcc -static -shared -o libprog.so main.c foo.c bar.c 可生成一个静态共享库，它同时具备静态链接的独立性和共享库的代码复用优势", isCorrect: false },
      { text: "D. ld main.o foo.o bar.o 即可完成静态链接生成a.out——ld会自动搜索并链接libc.a，无需额外指定库路径", isCorrect: false },
    ],
    feedbackCorrect: "正确！gcc -static 将-static标志传递给链接器ld，指示进行完全静态链接。所有库（包括libc、crt0启动代码等）的代码和数据段都被拷贝到最终可执行文件中。优点：无运行时依赖（ldd显示「not a dynamic executable」）、可移植到无兼容libc的系统；缺点：文件体积大、无法共享系统库的内存页、C库升级需重新链接。gcc -static 内部调用链：cc1编译→as汇编→ld（带-static）链接。",
    feedbackWrong: "不对。逐项分析：(1) gcc -c只编译+汇编生成.o可重定位目标文件，不生成.a静态库——.a是用ar工具将多个.o打包而成的「归档文件」，如 ar rcs libfoo.a foo.o bar.o。(2) -static和-shared是互斥的：-static要求全静态链接，-shared要求生成位置无关的动态共享库(.so)，两者语义冲突，gcc会报错。(3) 直接使用ld链接需要手动指定所有依赖库和启动文件，包括 crt1.o, crti.o, crtbegin.o, -lc, crtend.o, crtn.o 等——ld不会自动搜索libc。正确的静态链接流程：推荐使用 gcc -static 驱动（而非直接调ld），让gcc自动处理所有隐含的库和启动文件。",
    type: "single"
  },
  {
    id: "q-s7-6",
    moduleId: "s7",
    question: "以下C代码编译为file.o后，对其ELF符号表（.symtab）中各符号条目的描述，正确的是？\n\nint g_init = 42;         // ①\nint g_uninit;            // ②\nstatic int s_var = 7;    // ③\nextern int e_var;        // ④\nvoid bar(void) { }       // ⑤",
    options: [
      { text: "A. ① Ndx=.data, Bind=GLOBAL（强符号）; ② Ndx=COMMON, Bind=GLOBAL（弱符号）; ③ Ndx=.data, Bind=LOCAL; ④ Ndx=UNDEF, Bind=GLOBAL（外部引用）; ⑤ Ndx=.text, Bind=GLOBAL（强符号）", isCorrect: true },
      { text: "B. ① Ndx=COMMON, Bind=GLOBAL; ② Ndx=.bss, Bind=GLOBAL; ③ 不在.symtab中（static变量不写入符号表）; ④ Ndx=UNDEF, Bind=LOCAL; ⑤ Ndx=.text, Bind=LOCAL", isCorrect: false },
      { text: "C. ①② Ndx均为.data, Bind=GLOBAL（均为强符号）; ③ Ndx=.data, Bind=GLOBAL; ④ 不产生符号表条目（extern只是声明）; ⑤ Ndx=.text, Bind=GLOBAL", isCorrect: false },
      { text: "D. ① Ndx=.data, Bind=GLOBAL; ② Ndx=.bss, Bind=GLOBAL（强符号）; ③ Ndx=.data, Bind=LOCAL; ④ Ndx=.data, Bind=WEAK; ⑤ Ndx=.text, Bind=GLOBAL", isCorrect: false },
    ],
    feedbackCorrect: "正确！逐条验证ELF符号表结构：(1) g_init已初始化→存放在.data段，GLOBAL绑定（对外可见），强符号；(2) g_uninit未初始化→标记COMMON（不是.bss! 在可重定位目标文件中，未初始化全局变量放COMMON伪节，最终由链接器分配到.bss），GLOBAL绑定，弱符号；(3) s_var是static→在.data段但绑定为LOCAL——符号表中有记录（供调试器使用），但链接器不会用它解析其他模块的引用；(4) e_var是extern→Ndx=UNDEF（未定义），Bind=GLOBAL——告诉链接器「去其他模块找这个符号」；(5) bar函数定义→.text段，GLOBAL绑定，强符号。",
    feedbackWrong: "不对。逐项纠错：(1) 未初始化全局变量g_uninit在.o文件的.symtab中不是.bss而是COMMON伪节——COMMON意味着「先占位，链接时由链接器统一分配到.bss或由强符号覆盖」。只有链接完成后才在可执行文件的.bss中。(2) static变量s_var确实在符号表中有条目——其Bind=LOCAL表示模块私有，链接器不会用它解析其他模块引用，但记录在.symtab中供nm等工具查看和调试。(3) extern声明e_var会在.symtab中产生条目，Ndx=UNDEF（特殊值0）表示该符号未在本模块定义，Bind=GLOBAL告诉链接器必须从其他模块找到定义。(4) ②不是强符号——未初始化=弱符号（COMMON）；⑤函数是强符号，绑定为GLOBAL。使用 readelf -s file.o 可查看完整的符号表信息。",
    type: "single"
  },
  {
    id: "q-s7-7",
    moduleId: "s7",
    question: "三个模块：a.c中定义「double x;」（未初始化），b.c中定义「int x = 10;」（已初始化），c.c中定义「char x;」（未初始化）。链接器解析符号x时，最终x占用多少字节？值为多少？这体现了链接器对多重定义的哪条处理规则？",
    options: [
      { text: "A. 4字节，值为10——b.c的强符号胜出；体现了「一强多弱选强」规则，忽略a.c和c.c的弱符号定义（COMMON块）", isCorrect: false },
      { text: "B. 8字节，值为10——b.c强符号胜出，但链接器选择COMMON块中占空间最大者（a.c的double=8字节）；体现了「一强多弱，选强但用最大尺寸」规则", isCorrect: true },
      { text: "C. 链接器报错「multiple definition of x」——三个模块都定义了x，无论强弱均不可共存", isCorrect: false },
      { text: "D. 1字节，值为10的低8位——链接器选择COMMON中占空间最小者（c.c的char=1字节）叠加b.c的强符号值", isCorrect: false },
    ],
    feedbackCorrect: "正确！这是一个必须注意的陷阱。链接器处理流程：(1) a.c的double x（未初始化）→弱符号，COMMON块占8字节；(2) b.c的int x=10（已初始化）→强符号，.data段占4字节；(3) c.c的char x（未初始化）→弱符号，COMMON块占1字节。规则2：一强多弱→选强符号的定义（b.c），但最终x占用的空间大小取所有COMMON弱符号中最大的（double的8字节）——这可能导致强符号的4字节初始化值被放在8字节空间的前4字节。最终x=10但占用8字节。这就是为什么实践中应避免不同模块对同一变量使用不同类型——虽然链接器不报错，但会导致难以调试的内存布局问题。",
    feedbackWrong: "不对。链接器处理多个弱符号+一个强符号时：(1) 解析规则：一强多弱→选强符号b.c的定义（x初始值为10）；(2) 空间分配规则：最终x占用的空间取「所有同名符号中最大的尺寸」——a.c的double=8字节 > b.c的int=4字节 > c.c的char=1字节，因此x最终分配8字节。这不是简单的「选强符号」，链接器在COMMON块分配时会取所有定义的「最大尺寸」。这也是为什么在大型项目中，多个模块对同一变量类型不一致是危险的——不报错但产生微妙bug。补充：GCC的-fno-common选项可将未初始化变量从COMMON改为.bss，从而将此类问题暴露为链接错误。",
    type: "single"
  },
];
