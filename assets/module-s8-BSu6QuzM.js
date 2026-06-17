var e={meta:{id:`s8`,number:8,title:`异常控制流与进程`,icon:`GitFork`,courseware:`08 进程+信号.pptx`,examRefs:`分析题 ~10分`},calloutText:`这章解决什么问题？CPU 不是只跑你的程序——它还得响应 Ctrl-C、缺页、系统调用。这些"计划外的跳转"怎么办？`,sections:[{id:`s8-s1`,title:`先理解直觉：正常控制流之外的"打断"`,content:[{type:`prose`,html:`<p style="color:var(--color-text-secondary);font-size:var(--text-sm)">课件：第23-24讲 异常控制流+进程+信号 · 分析题 ~10分 · 含 fork 输出预测、四类异常判断、信号处理分析</p>`},{type:`prose`,html:`<p>你写的程序按 inst1 → inst2 → inst3 → ... 依次执行，这叫<strong>正常控制流</strong>。但实际 CPU 不能只跑你的程序——网络包到了要处理，键盘被按了要响应，你访问了不在内存中的页要从磁盘调入。这些让 CPU <strong>突然跳去别处执行，再（可能）回来</strong>的机制，统称<strong>异常控制流</strong>（Exceptional Control Flow, ECF）。</p>`},{type:`prose`,html:`<p><strong>ECF 在计算机系统的每个层次都有：</strong></p>`},{type:`table`,headers:[`层次`,`ECF 机制`,`例子`],rows:[[`硬件底层`,`异常（Exceptions）`,`缺页、除零、系统调用`],[`操作系统`,`进程上下文切换`,`CPU 在进程 A 和进程 B 之间来回切`],[`操作系统`,`信号（Signals）`,`Ctrl-C 终止进程、子进程结束通知父进程`],[`C 语言库`,`非本地跳转`,`setjmp/longjmp 跳回之前的保存点`]]},{type:`callout`,variant:`info`,text:`本章重点三个大块：① 异常的四种类型（硬件层）；② 进程和 fork/execve/wait（OS 层）；③ 信号机制（OS 层）。概念为主，计算极少，但 fork 输出预测是每次考试都有的经典题型。`}]},{id:`s8-s2`,title:`第1部分：异常——四种类型（必须背）`,content:[{type:`prose`,html:`<p>异常 = 硬件层面的 ECF。当 CPU 在执行某条指令时，硬件检测到"有情况"，就会触发异常处理。</p>`},{type:`prose`,html:`<p><strong>分类的核心维度：</strong></p><ul><li><strong>同步 vs 异步：</strong>同步 = 执行特定指令导致的；异步 = 外部设备突然发信号导致的</li><li><strong>有意 vs 无意：</strong>有意 = 你故意触发（如系统调用）；无意 = 出错了（如除零）</li><li><strong>返回行为：</strong>返回到当前指令重试？返回到下一条？还是直接终止？</li></ul>`},{type:`table`,headers:[`类型`,`触发方式`,`同步/异步`,`返回行为`,`例子`],rows:[[`<strong>中断 Interrupt</strong>`,`外部 I/O 设备发信号`,`<strong>异步</strong>`,`返回到<strong>下一条</strong>指令`,`键盘按下（Ctrl-C）、网络包到达、硬盘读写完成、定时器到期`],[`<strong>陷阱 Trap</strong>`,`<strong>有意</strong>执行 int 指令`,`<strong>同步</strong>`,`返回到<strong>下一条</strong>指令`,`系统调用（int 0x80 / syscall）、设置断点调试`],[`<strong>故障 Fault</strong>`,`指令执行出错，<strong>可能可恢复</strong>`,`<strong>同步</strong>`,`返回<strong>当前</strong>指令重试（或终止）`,`缺页（可恢复，调入页后重试）、除零（不可恢复→终止）、段违例`],[`<strong>中止 Abort</strong>`,`不可恢复的硬件错误`,`<strong>同步</strong>`,`<strong>不返回</strong>，终止程序`,`硬件奇偶校验错、机器校验异常`]]},{type:`prose`,html:`<h3>关键区分口诀</h3>`},{type:`card`,title:`一句话区分`,body:`<div class="card">

<ul>
<li><strong>中断：</strong>"你写作业的时候有人敲门"——外部来的，跟你在写什么没关系</li>
<li><strong>陷阱：</strong>"你写作业时主动站起来去倒杯水"——你自己选择离开的</li>
<li><strong>故障：</strong>"你写作业发现笔没水了"——你在写的动作出错了，换支笔就能继续</li>
<li><strong>中止：</strong>"你写作业时桌子塌了"——不可恢复，作业没法写了</li>
</ul>
</div>`},{type:`prose`,html:`<h3>IA-32 常见异常号（认识即可）</h3>`},{type:`table`,headers:[`异常号`,`描述`,`类型`],rows:[[`0`,`除零错误`,`故障 Fault`],[`13`,`一般保护故障`,`故障 Fault`],[`14`,`页故障（缺页）`,`故障 Fault（可恢复！）`],[`18`,`机器检查`,`中止 Abort`],[`128 (0x80)`,`系统调用`,`陷阱 Trap`]]},{type:`callout`,variant:`warning`,text:`最常混淆：中断（Interrupt）和陷阱（Trap）。一个是外部设备强行打断（异步），一个是你自己执行 int 指令主动请求（同步）。中断返回下一条指令，陷阱也返回下一条指令——但原因完全不同。`},{type:`callout`,variant:`tip`,text:`缺页（Page Fault）是故障中最特殊的一个——它通常可恢复。CPU 发现要访问的页不在内存中，触发 14 号异常 → 内核从磁盘调入该页 → 更新页表 → 重新执行刚才那条指令。第二次执行就成功了。这就是虚拟内存工作机制的核心。`}]},{id:`s8-s3`,title:`第2部分：进程——程序的"活体"`,content:[{type:`prose`,html:`<h3>进程 vs 程序</h3>`},{type:`prose`,html:`<p><strong>程序（Program）：</strong>躺在磁盘上的一堆代码和数据，静态的。</p>`},{type:`prose`,html:`<p><strong>进程（Process）：</strong>程序运行起来之后的实例——程序代码 + 当前寄存器值 + 栈 + 堆 + 打开的文件 + 页表 + ... 是一个"活的"执行体。</p>`},{type:`callout`,variant:`info`,text:`一个程序可以对应多个进程——比如你开了三个终端窗口，每个终端都是同一个 /bin/bash 程序的不同进程实例。进程 = 程序 + 运行时上下文。`},{type:`prose`,html:`<h3>进程的两个关键抽象（"错觉"）</h3>`},{type:`table`,headers:[`抽象`,`你"觉得"怎样`,`实际怎样`,`靠什么实现`],rows:[[`<strong>逻辑控制流</strong>`,`你的程序独占 CPU`,`CPU 在多个进程间快速切换`,`上下文切换`],[`<strong>私有地址空间</strong>`,`你的程序独占所有内存`,`多个进程共享物理内存`,`虚拟内存（页表映射）`]]},{type:`prose`,html:`<h3>并发 vs 并行</h3>`},{type:`prose`,html:`<p><strong>并发（Concurrent）：</strong>进程 A 和 B 的控制流在时间上交叠——单核上交替执行也是并发。比如你一边用浏览器一边听歌，CPU 在两个程序之间来回切。</p>`},{type:`prose`,html:`<p><strong>并行（Parallel）：</strong>两个进程真正同时在多个 CPU 核上执行——是真同时，不是快速切换。</p>`},{type:`callout`,variant:`tip`,text:`判断口诀：单核上多个进程交错执行 → 并发但不并行。多核上同时跑 → 既并发又并行。并行是并发的子集。`}]},{id:`s8-s4`,title:`★ 第3部分：fork/execve/wait — 进程控制四剑客`,content:[{type:`prose`,html:`<h3>fork() —— 克隆自己</h3>`},{type:`card`,title:`fork 的核心事实`,body:`<div class="card">

<ol>
<li><strong>调用一次，返回两次：</strong>父进程中返回子进程的 PID（>0），子进程中返回 0。</li>
<li><strong>子进程是父进程的完整拷贝：</strong>虚拟地址空间完全复制（写时拷贝优化）。</li>
<li><strong>父子进程并发执行：</strong>谁先执行不确定——由内核调度决定。</li>
<li><strong>地址空间独立：</strong>子进程中修改变量不影响父进程。</li>
</ol>
</div>`},{type:`code`,language:`c`,code:`pid_t pid = fork();
if (pid == 0) {
    // 这是子进程
    printf("child\\n");
} else {
    // 这是父进程, pid 是子进程的 PID
    printf("parent, child pid=%d\\n", pid);
}`},{type:`prose`,html:`<h3>★ fork 输出预测 —— 考试必考题</h3>`},{type:`prose`,html:`<p>考试最爱出：给一段 fork 代码，问输出多少行什么内容。解题核心规律：<strong>每次 fork 让进程数翻倍，printf 后面的代码会被所有当前存在的进程执行。</strong></p>`},{type:`prose`,html:`<h4>基础规律：进程树图</h4>`},{type:`mermaid`,id:`fork-tree`,chart:`graph TD
    P0["父进程 (pid=100)"]
    P0 -->|"fork()返回200"| P1["父进程继续"]
    P0 -->|"fork()返回0"| C1["子进程1 (pid=200)"]

    P1 -->|"第二次fork()→返300"| P2["父进程继续"]
    P1 -->|"第二次fork()→返0"| C2["子进程2 (pid=300)"]
    C1 -->|"第二次fork()→返400"| C3["子进程1继续"]
    C1 -->|"第二次fork()→返0"| C4["子进程3 (pid=400)"]

    style P0 fill:#dbeafe,stroke:#2563eb
    style P1 fill:#dbeafe,stroke:#2563eb
    style P2 fill:#dbeafe,stroke:#2563eb
    style C1 fill:#d1fae5,stroke:#059669
    style C2 fill:#d1fae5,stroke:#059669
    style C3 fill:#d1fae5,stroke:#059669
    style C4 fill:#d1fae5,stroke:#059669`},{type:`prose`,html:`<p>上图是两次连续 fork（没有条件判断）产生的进程树——最终 4 个进程。</p>`},{type:`prose`,html:`<h4>练习 1：最简单的两次 fork</h4>`},{type:`code`,language:`c`,code:`void fork2() {
    printf("L0\\n");    // 1个进程执行 → 输出 1 行 L0
    fork();             // 1→2 进程
    printf("L1\\n");    // 2个进程执行 → 输出 2 行 L1
    fork();             // 2→4 进程
    printf("Bye\\n");   // 4个进程执行 → 输出 4 行 Bye
}
// 总输出：L0, L1, L1, Bye, Bye, Bye, Bye（7行）`},{type:`prose`,html:`<h4>练习 2：有条件 fork —— 最难！</h4>`},{type:`code`,language:`c`,code:`void fork4() {
    printf("L0\\n");
    if (fork() != 0) {      // 只有父进程进入（fork返>0）
        printf("L1\\n");
        if (fork() != 0) {  // 只有"原始父进程"进入
            printf("L2\\n");
            fork();         // "父的父"再创一个子进程
        }
    }
    printf("Bye\\n");        // 所有进程都执行这一行
}`},{type:`prose`,html:`<p><strong>逐步分析：</strong></p>`},{type:`table`,headers:[`步骤`,`进程们`,`谁执行了什么`],rows:[[`初始`,`1 个进程`,`所有进程输出 L0`],[`第一次 fork()`,`父 P + 子 C1`,`P 中 fork 返回 >0 → P 进入 if 块；C1 中返回 0 → C1 跳过 if`],[`if 块内`,`P 执行`,`P 输出 L1`],[`第二次 fork()`,`P + 子 C2`,`P 中 fork 返回 >0 → P 进入内层 if；C2 跳过`],[`内层 if`,`P 执行`,`P 输出 L2`],[`第三次 fork()`,`P + 子 C3`,``],[`最终`,`4 个进程：P, C1, C2, C3`,`每个都输出 Bye`]]},{type:`prose`,html:`<p><strong>结果：</strong>L0(1行) L1(1行) L2(1行) Bye(4行)。注意 Bye 的顺序——各进程并发执行，谁先输出 Bye 不确定！</p>`},{type:`callout`,variant:`danger`,text:`考试大坑：fork 前 printf 的内容如果没有 \\n（换行），缓冲区没刷新，会导致内容被子进程"继承"并重复输出！比如 printf("Hello") 后面没有 \\n，然后 fork，两个进程的缓冲区里都有"Hello"——当它们各自刷新时，Hello 会被输出两次。加 \\n 的行缓冲会立即刷新，不会重复。`},{type:`prose`,html:`<h4>练习 3：fork + wait</h4>`},{type:`code`,language:`c`,code:`int main() {
    int status;
    if (fork() == 0) {
        printf("HC: child\\n");
    } else {
        printf("HP: parent\\n");     // 父进程打印
        wait(&status);               // 父进程等待子进程结束
        printf("CT: child done\\n");  // 确认子进程已回收
    }
    printf("Bye\\n");
    exit(0);
}
// 输出：HP(父), HC(子), Bye(子), CT(父回收后), Bye(父)
// 注意：HC 和 Bye(子) 的顺序可能在 HP 之前（并发）`},{type:`prose`,html:`<h3>execve() —— 替换自己</h3>`},{type:`card`,title:`execve 的核心事实`,body:`<div class="card">

<ol>
<li><strong>不创建新进程！</strong>用新程序替换当前进程的代码、数据、栈。</li>
<li><strong>调用一次，成功则不返回。</strong></li>
<li><strong>保留 PID、打开的文件描述符、信号设置。</strong></li>
<li><strong>典型模式：</strong>fork() 先克隆，子进程 execve() 换装。</li>
</ol>
</div>`},{type:`code`,language:`c`,code:`// Shell 执行命令的本质
pid_t pid = fork();
if (pid == 0) {
    // 子进程：用目标程序替换自己
    execve("/bin/ls", argv, envp);
    // 如果 execve 成功，永远不会走到这里
    perror("execve failed");
    exit(1);
} else {
    // 父进程：等待子进程完成
    waitpid(pid, &status, 0);
}`},{type:`prose`,html:`<h3>./hello 从输入到运行的完整旅程</h3>`},{type:`code`,language:``,code:`1. Shell 解析命令 ./hello → 构造 argv 和 envp
2. Shell 调用 fork() → 创建子进程（拥有 Shell 的完整副本）
3. 子进程调用 execve("hello", argv, envp)
   → 用 hello 程序替换子进程映像
   → 不实际从磁盘拷贝（demand paging，用时才调入）
4. 加载器设置好栈、堆、页表后，跳转到 main()
5. hello 在子进程上下文中运行`},{type:`prose`,html:`<h3>僵死进程（Zombie）vs 孤儿进程（Orphan）</h3>`},{type:`table`,headers:[`类型`,`怎么回事`,`怎么办`],rows:[[`<strong>僵死进程</strong>`,`子进程已死，但父进程还没调 wait 回收 → 仍占 PCB 和退出状态`,`父进程调 wait/waitpid 回收`],[`<strong>孤儿进程</strong>`,`父进程先死了，子进程还活着`,`init 进程(PID=1)自动收养并负责回收`]]}]},{id:`s8-s5`,title:`第4部分：信号——"有人找你！"`,content:[{type:`prose`,html:`<p>信号是一条小消息，内核用它通知进程"有事件发生"。你可以把信号理解成：内核在进程的"信箱"里投了一张便条。</p>`},{type:`prose`,html:`<h3>常见信号速查</h3>`},{type:`table`,headers:[`ID`,`名称`,`默认行为`,`怎么触发`,`能捕获吗`],rows:[[`2`,`SIGINT`,`终止`,`Ctrl-C`,`能`],[`9`,`SIGKILL`,`终止`,`kill -9 pid`,`<strong>不能！</strong>`],[`11`,`SIGSEGV`,`终止+core dump`,`非法内存访问（段违例）`,`能`],[`14`,`SIGALRM`,`终止`,`alarm() 定时器到期`,`能`],[`17`,`SIGCHLD`,`忽略`,`子进程终止或暂停`,`能（Shell Lab 核心）`],[`18`,`SIGCONT`,`继续运行`,`fg/bg 命令`,`能`],[`20`,`SIGTSTP`,`暂停`,`Ctrl-Z`,`能`]]},{type:`prose`,html:`<h3>信号的三个关键概念</h3>`},{type:`prose`,html:`<ol><li><strong>发送：</strong>内核在目标进程的 pending 位向量中设置对应位。</li><li><strong>接收：</strong>目标进程响应信号——三种方式：忽略、终止、捕获（执行注册的 handler）。</li><li><strong>挂起（Pending）：</strong>信号已发送但还没被接收处理。</li></ol>`},{type:`prose`,html:`<h3>★ 信号两大特性（高频考点）</h3>`},{type:`table`,headers:[`特性`,`含义`,`后果`],rows:[[`<strong>信号不排队</strong>`,`每种信号只有一个 pending bit。如果类型 K 已经有挂起信号，后续再发的同类型信号被丢弃`,`SIGCHLD handler 必须用 while(waitpid(...)) 循环回收——因为多个子进程同时死可能只触发一次 SIGCHLD`],[`<strong>信号可阻塞</strong>`,`进程可设置 blocked 位向量。被阻塞的信号可发出但不会被接收，直到解除阻塞`,`Shell Lab 中 fork 前必须阻塞 SIGCHLD，防止竞态条件`]]},{type:`callout`,variant:`danger`,text:`信号不排队 + SIGCHLD：如果 3 个子进程几乎同时退出，内核可能只发 1 次 SIGCHLD。handler 里只调一次 waitpid 只能回收一个子进程，其他两个变成僵尸。正确做法是 while(waitpid(-1, &status, WNOHANG) > 0) 循环回收。2025 卷第五题第 4 问就考这个。`},{type:`prose`,html:`<h3>Ctrl-C 的完整链路（Shell Lab 核心）</h3>`},{type:`code`,language:``,code:`按键 Ctrl-C
  → 终端驱动程序识别该组合键
  → 内核向前台进程组发送 SIGINT
  → Shell 的 sigint_handler 捕获 SIGINT
  → Shell 执行 kill(-pid, SIGINT)，转发给前台作业进程组
     （-pid = 负号表示发给整个进程组，不是单个进程）
  → 前台作业进程收到 SIGINT → 默认终止
  → 每个子进程终止时，内核向父进程(Shell)发 SIGCHLD
  → Shell 的 sigchld_handler → while(waitpid(...)) 循环回收`},{type:`prose`,html:`<h3>Shell Lab 向考试的 6 个要点</h3>`},{type:`prose`,html:`<ol><li><strong>为什么 fork 前要阻塞 SIGCHLD？</strong>防止竞态：子进程可能先于 addjob 执行完并被回收，但作业表还没登记 → 状态混乱。"先登记，再允许回收"。</li><li><strong>为什么子进程要 setpgid(0,0)？</strong>建立独立进程组，使 Ctrl-C 不会误杀 Shell 本身。</li><li><strong>kill(-pid, SIGINT) 的负号？</strong>发给整个进程组（防止一个 Job 内多个进程漏收信号）。</li><li><strong>回收为什么只在 handler 中做？</strong>统一回收入口，避免 waitfg 和 handler 抢回收。</li><li><strong>handler 为什么用 while 循环 waitpid？</strong>信号不排队——一次 SIGCHLD 可能对应多个已死子进程。</li><li><strong>handler 里不能调 printf！</strong>printf 不是异步信号安全的函数，在 handler 里用是未定义行为。</li></ol>`}]},{id:`s8-s6`,title:`考试怎么考`,content:[{type:`prose`,html:`<h4>题型与分值</h4>`},{type:`table`,headers:[`题型`,`分值`,`考查内容`],rows:[[`简答/填空`,`3~5 分`,`异常类型判断（给场景问是哪种异常）`],[`分析题`,`5~10 分`,`fork 输出预测、信号处理流程分析`],[`综合题（2025卷第五大题）`,`25分（含链接+信号+优化）`,`SIGCHLD handler bug 分析、修正方案`]]},{type:`prose`,html:`<h4>fork 输出预测解题法</h4>`},{type:`prose`,html:`<ol><li><strong>画进程树：</strong>初始 1 个进程，每次 fork 后进程数翻倍。</li><li><strong>追踪每个进程的路径：</strong>在 fork 返回后，父进程（返回值 >0）和子进程（返回值=0）走不同分支。</li><li><strong>注意并发：</strong>没有 wait 同步时，各进程输出顺序不确定。</li><li><strong>检查缓冲区：</strong>printf 无 \\n 时内容在缓冲区中，fork 会复制缓冲区内容。</li></ol>`},{type:`prose`,html:`<h4>常见错误</h4>`},{type:`callout`,variant:`danger`,text:`错误1：中断 ≠ 陷阱。中断是外部设备（异步），陷阱是你自己执行 int 指令（同步）。虽然都返回"下一条指令"，但触发来源完全不同。`},{type:`callout`,variant:`danger`,text:`错误2：fork 后子进程修改变量值影响父进程。子进程地址空间是独立的复制——改了白改。`},{type:`callout`,variant:`danger`,text:`错误3：信号会排队。信号不排队！每种类型只有一个 pending bit。多个同类信号到达时只保留一个。`},{type:`callout`,variant:`danger`,text:`错误4：execve 创建新进程。execve 不创建新进程——它只是替换当前进程的映像。PID 不变，文件描述符不变。创建新进程的是 fork。`},{type:`callout`,variant:`danger`,text:`错误5：混淆僵死进程和孤儿进程。僵死 = 子进程死了父进程没回收（占资源）。孤儿 = 父进程死了子进程还活着（被 init 领养）。要分清楚谁是"已死的"，谁是"还活着的"。`},{type:`prose`,html:`<h4>额外练习：这些 fork 题你能做出来吗？</h4>`},{type:`code`,language:`c`,code:`// 练习 A：输出几次 X？
void testA() {
    printf("X");  // 注意：没有 \\n！
    fork();
    printf("Y\\n");
}
// 答案：X 输出 2 次（缓冲区被 fork 复制），Y 输出 2 行

// 练习 B：
void testB() {
    fork();
    fork();
    fork();
    printf("Z\\n");
}
// 答案：Z 输出 2^3 = 8 行

// 练习 C：
void testC() {
    if (fork() == 0) {
        printf("child\\n");
        exit(0);
    }
    wait(NULL);
    printf("parent done\\n");
}
// 答案：child 先输出还是 parent done 先输出不确定（并发），
//       但 parent done 一定在 child 之后（wait 同步）`}]},{id:`s8-s7`,title:`真题演练`,content:[{type:`examQuestions`,ids:[`eq-s8-1`,`eq-s8-2`]}]},{id:`s8-s8`,title:`小测验`,content:[{type:`quiz`,ids:[`q-s8-1`,`q-s8-2`]}]}]};export{e as default};