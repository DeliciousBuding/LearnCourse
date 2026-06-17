import type { ChecklistItem } from '@learncourse/framework/types';

export const CHECKLIST: ChecklistItem[] = [
  // ── Tier 1: 汇编与栈帧（40分，及格关键）──
  {
    id: '1',
    text: '能手算补码范围（8位: -128~127, 32位: -2^31~2^31-1），理解小端存储（低字节在低地址，如 0x12345678 存为 78 56 34 12）',
  },
  {
    id: '2',
    text: '能手算 IEEE 754 单精度浮点数全流程：分解真值→二进制→归一化→Sign/Exponent(bias=127)/Mantissa(23位含隐含1)→拼32位→转十六进制',
  },
  {
    id: '3',
    text: '能阅读 32 位 x86 AT&T 汇编基本指令：mov/add/sub/cmp/jmp/call/ret/push/pop/leave，区分 $立即数、%寄存器、(内存) 三种操作数',
  },
  {
    id: '4',
    text: '掌握汇编分块阅读法：识别函数序言(pushl %ebp; movl %esp,%ebp)、函数收尾(popl %ebp; ret 或 leave; ret)、循环体(往前跳 jle/jmp)、条件分支(往后跳 jg/je)',
  },
  {
    id: '5',
    text: '能手绘栈帧图，正确标注四要素：返回地址(ebp+4)、旧 EBP(ebp+0)、参数(ebp+8 起，从右向左压栈)、局部变量(ebp-N)。能标注地址高低方向。',
  },
  {
    id: '6',
    text: '能区分 if/else 往后跳（跳过 then/else 块）vs 循环往前跳（跳回循环体开头）的汇编模式，能从跳转方向反推控制流结构',
  },
  {
    id: '7',
    text: '能完成 C↔汇编互推（程序填空题）：给定 C 代码补全汇编指令，或给定汇编写出等价 C 代码。重点练指针解引用 (edx)↔*xp、参数位置 ebp+8/12、返回值 eax',
  },

  // ── Tier 2: 整数浮点与链接（20分）──
  {
    id: '8',
    text: '能区分 ELF 各 section 用途：.text(代码)、.data(已初始化全局变量)、.bss(未初始化全局变量，占位不占磁盘空间)、.rodata(只读常量/字符串)、.symtab(符号表)',
  },
  {
    id: '9',
    text: '能区分强符号（已初始化全局变量/函数定义）vs 弱符号（未初始化全局变量），掌握链接器符号解析三规则：多强报错→一强多弱选强→全弱任选',
  },
  {
    id: '10',
    text: '能区分 R_386_32（绝对重定位，填入目标符号运行时地址 S）vs R_386_PC32（相对重定位，填入 S - P，P 为被重定位指令下一条的地址），能手算 call 指令的偏移值',
  },

  // ── Tier 3: Cache/VM/异常/优化（65分）──
  {
    id: '11',
    text: '能完成 Cache 地址三步拆分：Offset(b = log₂B)、Index(s = log₂S)、Tag(t = m - s - b)。能区分直接映射(E=1)/组相联(E>1)/全相联(S=1)',
  },
  {
    id: '12',
    text: '能计算直接映射和组相联 Cache 的命中率：给定地址序列→逐次拆 Tag/Set/Offset→按替换策略(LRU/FIFO)追踪组内容→统计命中次数',
  },
  {
    id: '13',
    text: '能画出虚拟地址翻译全链路流程图：VA → {TLB命中? → PPN : TLB缺失 → 查页表(可能多级) → 更新TLB} → PA → Cache查询 → 数据。能标注每一步的输入输出。',
  },
  {
    id: '14',
    text: '能完成多级页表 VA→PA 翻译手算：拆 VPN1/VPN2/VPO → 查 PDE→PTE → 拼 PPN → 得 PA。能判断缺页（有效位=0）并说明 OS 处理流程',
  },
  {
    id: '15',
    text: '能手算 TLB 参数（组数、路数、TLBT、TLBI）并追踪命中/缺失。理解 PIPT vs VIVT 在上下文切换时的优劣（PIPT 无需 flush / VIVT 有别名问题）',
  },
  {
    id: '16',
    text: '能手算 fork() 输出个数：画进程树 → 每轮 fork 进程数翻倍 → 统计 printf 执行次数。能解释 \\n 行缓冲对 fork 输出的影响（无 \\n 时缓冲区被复制导致输出多于预期）',
  },
  {
    id: '17',
    text: '能识别信号处理的经典 bug：POSIX 信号不排队 → 多个子进程同时退出时只回收一个 → 需用 while(waitpid(-1,NULL,WNOHANG)>0) 循环回收。知道 signal() vs sigaction() 的可移植性差异',
  },
  {
    id: '18',
    text: '能解释 Amdahl 定律（S=1/[(1-f)+f/k]）并手算加速比。能应用循环展开（减少循环开销+增加指令级并行）、blocking（改善时间/空间局部性）等优化方法',
  },
  {
    id: '19',
    text: '能区分三种缓存不命中类型：cold miss(冷启动)、conflict miss(冲突不命中，直接映射中不同地址映射到同一组)、capacity miss(容量不命中，工作集超 Cache 大小)',
  },
  {
    id: '20',
    text: '理解缓冲区溢出攻击原理（覆盖返回地址→跳转到 shellcode 或 libc 函数），知道四种防御：Stack Canary、NX/DEP、ASLR、用 fgets 替代 gets',
  },
];
