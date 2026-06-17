import type { Quiz } from '@learncourse/framework/types';

// === 安全攻击与防御 新增选择题 ===

export const S12_QUIZZES: Quiz[] = [
  {
    id: "q-s12-3",
    moduleId: "s12",
    question: "函数 foo 的反汇编入口如下：\n  pushl %ebp\n  movl %esp, %ebp\n  pushl %ebx\n  sub $20, %esp\nchar buf[8] 被编译器放在局部变量区的最低地址处（紧接 %esp）。攻击者从 buf[0] 开始向上写入，要完整覆盖返回地址（4 字节），至少需要写入多少字节？",
    options: [
      { text: "A. 24 字节", isCorrect: false },
      { text: "B. 32 字节", isCorrect: true },
      { text: "C. 28 字节", isCorrect: false },
      { text: "D. 36 字节", isCorrect: false },
    ],
    feedbackCorrect: "正确！逐层计算：sub $20 分配 20 字节局部变量区，pushl %ebx 又占 4 字节（位于 %ebp-4 处），因此 buf[0]（最低处）到 %ebp 共 20+4=24 字节。再往上：saved %ebp 占 4 字节（%ebp~%ebp+3），返回地址占 4 字节（%ebp+4~%ebp+7）。要完整覆盖返回地址：24+4+4=32 字节。常见错误：(A) 漏算了 pushl %ebx 的 4 字节；(C) 漏算了 saved %ebp；(D) 多算了不存在的对齐填充。",
    feedbackWrong: "不对。关键是把栈帧从低到高逐段加起来：sub $20（局部变量区 20 字节）+ pushl %ebx（被调用者保存寄存器 4 字节）+ saved %ebp（4 字节）+ 返回地址（4 字节）= 32 字节。注意 pushl %ebx 也占空间——它位于局部变量和 %ebp 之间。(A) 漏算了 %ebx；(C) 漏算了 saved %ebp；(D) 多加了填充。从汇编指令精确推算栈帧大小是缓冲区溢出攻击中确定偏移量的基本功。",
    type: "single"
  },
  {
    id: "q-s12-4",
    moduleId: "s12",
    question: "关于 ASLR（Address Space Layout Randomization），以下说法正确的是？",
    options: [
      { text: "A. ASLR 使栈地址在每次函数调用时随机变化，攻击者无法预测返回地址的位置", isCorrect: false },
      { text: "B. Linux 32 位系统栈随机化约 19 位熵（~512K 种可能），而 64 位系统因地址空间巨大，随机化熵远大于 32 位，暴力破解在 64 位下几乎不可行", isCorrect: true },
      { text: "C. ASLR 的核心原理是在栈帧中返回地址之前插入随机值，函数返回前检查此值是否被篡改", isCorrect: false },
      { text: "D. ASLR 能完全阻止缓冲区溢出攻击，因为攻击者无法获得任何有效地址", isCorrect: false },
    ],
    feedbackCorrect: "正确！ASLR 在程序每次加载（而非每次函数调用）时随机化地址空间布局。32 位系统虚拟地址仅 4GB，栈随机偏移约 2^19 种，暴力破解有一定现实可行性。64 位系统虚拟地址 48 位，随机化范围极大，暴力破解几乎不可能。但 ASLR 仍可被信息泄露（如格式化字符串漏洞读出栈/库地址）绕过——知道了基址就能算出目标地址。",
    feedbackWrong: "不对。(A) ASLR 在程序「启动」时随机化一次，而非每次函数调用——同一进程内栈基址固定不变，只有进程重启才变化。(B) 正确：32 位熵小、64 位熵大。(C) 描述的是 Stack Canary，不是 ASLR——这是最常混淆的两个防御机制。(D) 太绝对——ASLR 大幅增加难度但非银弹，信息泄露和部分覆盖技术均可绕过。三者区分：ASLR=随机化地址、Canary=栈上放守卫值检测篡改、NX=页表标记栈不可执行。",
    type: "single"
  },
  {
    id: "q-s12-5",
    moduleId: "s12",
    question: "关于 NX 位（No-eXecute bit）/ DEP（Data Execution Prevention），以下描述正确的是？",
    options: [
      { text: "A. NX 位标记页面为「不可修改」，防止攻击者篡改栈上已注入的 shellcode", isCorrect: false },
      { text: "B. NX 通过页表条目标志位标记页面不可执行，CPU 从 NX=1 的页面取指令时产生硬件异常。Return-to-libc 攻击绕过 NX 的原因是：攻击目标（如 libc 中的 system()）本身就在可执行页面中", isCorrect: true },
      { text: "C. NX 能检测栈上的返回地址是否被篡改——若返回地址指向栈区，NX 会阻止该跳转并终止程序", isCorrect: false },
      { text: "D. NX 是纯软件防御，由编译器在生成的代码中插入检查逻辑来实现", isCorrect: false },
    ],
    feedbackCorrect: "正确！NX 是硬件+OS 协作的防御机制。在 64 位 x86 页表中，每个 PTE 的 bit 63 是 NX 位，MMU 在取指时检查该位——NX=1 则禁止执行，触发 page fault。栈和堆的页面 NX=1，代码段的页面 NX=0。Return-to-libc 之所以能绕过 NX，是因为它不向栈注入新代码，而是复用 libc 等库中已有的合法可执行代码（如 system()、execve()）。ROP（Return-Oriented Programming）是 Return-to-libc 的泛化。",
    feedbackWrong: "不对。(A) NX 控制「执行」而非「修改」权限——修改权限由页表的 R/W 位控制，这是两个独立的概念。(B) 正确：NX 是硬件页表机制，Return-to-libc 因跳转到可执行区域而绕过。(C) NX 不检测返回地址是否被修改——那是 Stack Canary 的职责。NX 只管「目标页面是否可执行」。(D) NX 依赖硬件（MMU 检查页表位）和 OS（设置页表），不是编译器的软件层面防御。三者分工：Canary=检测溢出发生；NX=阻止注入代码执行；ASLR=隐藏目标地址。",
    type: "single"
  },
  {
    id: "q-s12-6",
    moduleId: "s12",
    question: "关于 Stack Canary（栈金丝雀），以下说法<strong>错误</strong>的是？",
    options: [
      { text: "A. 金丝雀值在函数入口处被放置在 saved %ebp 和局部变量之间，函数返回前与全局副本比对——若缓冲区溢出覆盖了返回地址则必然先踩过金丝雀", isCorrect: false },
      { text: "B. 攻击者通过信息泄露（如格式化字符串漏洞）读出栈上的金丝雀值，可在构造溢出 Payload 时填入正确值，从而绕过检测", isCorrect: false },
      { text: "C. 金丝雀能检测所有类型的缓冲区溢出攻击，包括越过金丝雀位置直接修改函数指针的攻击", isCorrect: true },
      { text: "D. GCC -fstack-protector 默认只为含 char 数组的函数插入金丝雀，-fstack-protector-all 为所有函数插入", isCorrect: false },
    ],
    feedbackCorrect: "正确！题目要求选「错误」的选项。C 是错误的——金丝雀并非万能。它的保护范围仅限于「溢出路径必须经过金丝雀位置」的情况。如果攻击者：(1) 直接修改同一栈帧内的函数指针（不经过金丝雀位置）；(2) 覆盖相邻局部变量中的安全关键数据（如 is_admin 标志位）；金丝雀都不会触发。C 声称「所有类型」是过度泛化。",
    feedbackWrong: "不对。题目问的是「错误的」选项，请仔细审题。(A) 正确描述了金丝雀的放置位置和检测逻辑。(B) 描述了信息泄露绕过方式，是正确的攻击技术。(C) 声称金丝雀能检测「所有类型」溢出，这是错误的——它只能检测沿栈向高地址方向、经过金丝雀位置的顺序覆盖。不经过金丝雀的溢出（如直接覆盖函数指针、修改非相邻变量）不受保护。(D) 正确描述了 GCC 的编译选项行为。答案选 C。",
    type: "single"
  },
  {
    id: "q-s12-7",
    moduleId: "s12",
    question: "以下 C 代码存在缓冲区溢出漏洞。哪项修改能<strong>最有效</strong>地消除此漏洞？\n\nvoid get_name() {\n    char buf[16];\n    gets(buf);\n    printf(\"Hello, %s\\n\", buf);\n}",
    options: [
      { text: "A. 将 char buf[16] 改为 char buf[1024]，增大缓冲区使攻击者难以填满", isCorrect: false },
      { text: "B. 将 gets(buf) 替换为 fgets(buf, 16, stdin)，限制读取长度不超过缓冲区容量", isCorrect: true },
      { text: "C. 在 gets(buf) 调用前添加 if (buf != NULL) 空指针检查", isCorrect: false },
      { text: "D. 将 gets(buf) 替换为 scanf(\"%s\", buf)，使用更安全的输入函数", isCorrect: false },
    ],
    feedbackCorrect: "正确！fgets(buf, 16, stdin) 从根本上解决了问题——它明确限制最多读取 15 个字符（第 16 字节留给 '\\0'），无论用户输入多长都不会溢出。gets() 的致命缺陷是它不接收长度参数，完全不知道 buf 的容量，会无限制读取直到遇到换行符或 EOF。A 只是增大了攻击成本（攻击者仍可输入 2000 字节），C 与溢出无关，D 中的 scanf(\"%s\") 同样不限制长度——和 gets 一样危险。正确做法：scanf(\"%15s\", buf) 或用 fgets。",
    feedbackWrong: "不对。(A) 增大缓冲区只是提高了溢出门槛——攻击者仍然可以输入超过 1024 字节来覆盖返回地址，治标不治本。(B) 正确：fgets 明确限制读取长度，从根本上杜绝溢出。(C) 空指针检查和溢出完全无关——溢出是因为写入长度超出数组边界，而不是因为指针为 NULL。(D) scanf(\"%s\", buf) 同样不安全——%s 不限制读取长度！应使用 scanf(\"%15s\", buf) 或直接 fgets。不安全函数清单：gets、strcpy、strcat、sprintf、scanf(\"%s\")。安全替代：fgets、strncpy、strncat、snprintf、scanf(\"%Ns\")。",
    type: "single"
  }
];