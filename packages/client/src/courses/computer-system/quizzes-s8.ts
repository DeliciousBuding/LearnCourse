import type { Quiz } from '@learncourse/framework/types';

// === 异常控制流与进程 ===

// ── 选择题 ──
export const S8_QUIZZES: Quiz[] = [
  {
    id: "q-s8-3",
    moduleId: "s8",
    question: "某程序执行一条访存指令时，目标虚拟地址对应的页表项显示该页不在物理内存中（present bit = 0），MMU触发异常。关于这个异常，以下描述正确的是：",
    options: [
      { text: "A. 这是一次Interrupt（中断），因为由MMU硬件检测触发，属于异步事件", isCorrect: false },
      { text: "B. 这是一次Trap（陷阱），与系统调用属于同一类型，执行完后返回到触发指令的下一条", isCorrect: false },
      { text: "C. 这是一次Fault（故障），异常处理时CPU保存的返回地址指向触发异常的指令，OS处理成功后重新执行该指令", isCorrect: true },
      { text: "D. 这是一次Abort（终止），因为缺页是致命错误，OS无法修复，进程必然被内核终止", isCorrect: false },
    ],
    feedbackCorrect: "正确！Page fault（缺页异常）是Fault的典型代表。Fault的关键特征：处理程序可以修正错误条件（从磁盘调入页面并更新页表），然后CPU将控制返回到触发异常的指令重新执行——这次执行就会成功。返回地址指向触发指令而非下一条指令，这是Fault区别于Trap的核心特征。",
    feedbackWrong: "不对。Page fault属于Fault类型，不是Interrupt/Trap/Abort。Interrupt来自外部I/O设备的异步信号（如磁盘中断）；Trap是有意触发的指令（如syscall），返回地址是下一条指令；Abort是不可恢复的致命错误（如硬件奇偶校验错），处理程序通常不返回。Fault的独特之处在于可修正+重试——缺页处理正是这样工作的。",
    type: "single"
  },
  {
    id: "q-s8-4",
    moduleId: "s8",
    question: "阅读以下C代码，假设所有fork()调用均成功。程序总共会创建多少个进程（包括最初的main进程），最终输出多少行「A」？\n\nfork();\nif (fork() == 0) {\n    fork();\n}\nprintf(「A\\n」);",
    options: [
      { text: "A. 创建5个进程，输出5行", isCorrect: false },
      { text: "B. 创建6个进程，输出6行", isCorrect: true },
      { text: "C. 创建7个进程，输出7行", isCorrect: false },
      { text: "D. 创建8个进程，输出8行", isCorrect: false },
    ],
    feedbackCorrect: "正确！逐层追踪：（1）初始1个进程；（2）第一个fork()后变为2个；（3）两个进程都执行第二个fork()，变为4个——关键：只有fork()返回0的子进程（2个）进入if体执行第三个fork()；（4）这2个子进程各fork出一个，增加2个。最终共1+1+2+2=6个进程，每个进程执行到最后的printf输出一行「A」。",
    feedbackWrong: "不对。关键陷阱：第三个fork()在if(fork()==0)体内，只有第二个fork()返回0的子进程才会执行它，不是所有4个进程都执行。逐层计算：第一个fork→2进程；第二个fork(全员)→4进程；第三个fork(仅2个进程执行)→+2=6进程。常见错误：当成3次无条件fork得2^3=8个进程。建议画出进程树，逐层标记每个fork的分支。",
    type: "single"
  },
  {
    id: "q-s8-5",
    moduleId: "s8",
    question: "x86-64 Linux系统中，用户程序调用read()读取文件。以下关于系统调用底层机制的描述，正确的是：",
    options: [
      { text: "A. 系统调用号通过%eax寄存器传递，int 0x80指令触发从Ring 3到Ring 0的特权级切换", isCorrect: false },
      { text: "B. 系统调用号通过%rax寄存器传递，syscall指令触发特权级切换（Ring 3→Ring 0），返回地址自动存入%rcx，RFLAGS存入%r11，内核通过sysret返回用户态", isCorrect: true },
      { text: "C. read()函数是C标准库中的纯用户态函数，直接在用户空间完成文件数据的读取，不涉及内核", isCorrect: false },
      { text: "D. 系统调用与普通函数调用的机制完全相同，都是通过call/ret指令对实现跳转和返回", isCorrect: false },
    ],
    feedbackCorrect: "正确！x86-64 Linux的系统调用约定：（1）调用号存入%rax（read为0）；（2）最多6个参数依次通过%rdi、%rsi、%rdx、%r10、%r8、%r9传递；（3）syscall指令：CPU从Ring 3切换到Ring 0，RIP→%rcx，RFLAGS→%r11，跳转到MSR_LSTAR指定的内核入口；（4）内核处理完后执行sysret返回用户态。注意x86-64使用syscall/sysret，而x86（32位）才使用int 0x80——这是选项A的关键错误。",
    feedbackWrong: "不对。正确选项是B。选项A混淆了x86-64和x86的机制：x86-64使用syscall/sysret指令对，int 0x80是传统x86（32位）的方式，且x86中用%eax而非%rax。选项C忽略了read()必须通过系统调用陷入内核才能访问磁盘/页缓存——用户态无权直接操作硬件。选项D忽略了系统调用涉及CPU特权级切换（Ring 3→Ring 0），不能用普通的call/ret实现，call指令无法跨越特权级。",
    type: "single"
  },
  {
    id: "q-s8-6",
    moduleId: "s8",
    question: "关于进程上下文切换（context switch），以下描述正确的是：",
    options: [
      { text: "A. 上下文切换完全在用户态完成，由C标准库的setjmp/longjmp机制实现，因此开销很小", isCorrect: false },
      { text: "B. 每次上下文切换必然导致TLB被完全刷新，这是切换开销的主要来源且无法避免", isCorrect: false },
      { text: "C. 上下文切换由内核调度器触发，时机包括进程时间片耗尽、进程等待I/O主动阻塞、高优先级进程就绪抢占等；切换时需要保存当前进程的寄存器/PC/SP等CPU状态，并从下一个进程的上下文恢复", isCorrect: true },
      { text: "D. 上下文切换时硬件会自动保存和恢复全部寄存器的值，内核只需切换页表基址寄存器即可", isCorrect: false },
    ],
    feedbackCorrect: "正确！上下文切换是内核调度器在核心态完成的核心操作。三大典型触发时机：（1）时间片到期——定时器中断触发内核抢占；（2）主动阻塞——当前进程因I/O、信号量等事件调用阻塞原语；（3）抢占——更高优先级进程变为就绪态。切换期间内核需要保存当前进程的完整CPU上下文（通用寄存器、PC、SP、浮点/向量寄存器等）到其task_struct/内核栈，再从目标进程的内核栈恢复其上下文，切换CR3指向目标进程的页表。",
    feedbackWrong: "不对。正确选项是C。选项A：setjmp/longjmp只能在同一进程内实现非局部跳转，无法切换地址空间，进程上下文切换必须由内核完成。选项B：现代CPU使用ASID（地址空间ID）标记TLB条目，同ASID的条目在切换后仍有效，不需要完全刷新TLB。选项D：硬件在中断/异常入口时自动保存的只有SS/RSP/RFLAGS/CS/RIP（通过压栈），其余寄存器必须由内核软件显式保存和恢复，硬件不会自动处理。",
    type: "single"
  },
  {
    id: "q-s8-7",
    moduleId: "s8",
    question: "父进程创建了3个子进程来处理任务，并在循环中调用waitpid(-1, &status, WNOHANG)尝试回收。假设子进程的终止顺序不可预测，父进程在创建完所有子进程后立即进入回收循环。以下描述正确的是：",
    options: [
      { text: "A. 每次waitpid调用都会挂起父进程，直到至少有一个子进程终止才返回", isCorrect: false },
      { text: "B. waitpid(-1, &status, WNOHANG)的行为是：若有已终止的子进程则立即回收（返回该PID）；若所有子进程均未终止则立即返回0（不挂起父进程）", isCorrect: true },
      { text: "C. 父进程循环恰好执行3次waitpid后，可以保证所有子进程已被回收，即使某些子进程当时尚未终止", isCorrect: false },
      { text: "D. WNOHANG选项的含义是：如果调用时没有子进程终止，waitpid返回-1并设置errno为ECHILD", isCorrect: false },
    ],
    feedbackCorrect: "正确！waitpid(-1, &status, WNOHANG)实现非阻塞回收：-1表示等待任意子进程，WNOHANG（no hang）使调用立即返回而不阻塞。返回值语义：>0表示回收成功，值为被回收子进程的PID；0表示没有已终止的子进程；-1表示出错。父进程通常需要在while循环中反复调用直到返回0或-1/ECHILD，才能确保回收所有已终止子进程——仅循环固定次数（如3次）是不够的，因为循环时子进程可能尚未终止。",
    feedbackWrong: "不对。正确选项是B。WNOHANG最关键的含义是「不挂起」（no hang）——waitpid立即返回而非阻塞等待。选项A描述的是不带WNOHANG（即options=0）时的阻塞行为。选项C的错误：循环3次时子进程可能还没终止，waitpid返回0表示暂无子进程可回收，循环结束后子进程才终止的话就会成为僵尸进程。选项D的错误：返回-1+ECHILD发生在调用者没有任何子进程时（或所有子进程已被回收），而非「子进程存在但尚未终止」时——后者返回0。",
    type: "single"
  },
];