import type { ModuleContent } from "learncourse/types";

const meta = {"id":"s6","number":6,"title":"程序的机器级表示","icon":"Cpu","courseware":"06 机器级表示.pptx","examRefs":"程序填空 ~25分 ★最高权重"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？你写的 C 代码，CPU 到底在执行什么？",
  sections: [
    {
      id: "s6-s1",
      title: "先理解直觉：从 C 到机器码的距离",
      content: [
        {
          type: "prose",
          html: "<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\">课件：第9-12讲 程序的机器级表示 · 期末程序填空 25 分 · 栈帧分析题 15 分 · 含 Bomb Lab 实战关联</p>"
        },
        {
          type: "prose",
          html: "<p>你写了一句 <code>int x = a + b;</code>，CPU 不能直接\"看懂\"。它只认识指令——把某个内存位置的值搬到寄存器、在寄存器里做加法、把结果写回内存。一行 C 代码在机器层面，通常是被拆成 3~5 条指令。</p>"
        },
        {
          type: "prose",
          html: "<p>本章虽然看起来像\"学汇编\"，但目标不是让你手写汇编程序——而是让你<strong>能看着汇编代码逆推 C 代码在干什么</strong>。这就跟 Bomb Lab 里拆炸弹一样：你面前只有一堆 mov/jmp/call，你得推理出它检查了什么条件、调了什么函数。</p>"
        },
        {
          type: "callout",
          variant: "info",
          text: "考试场景通常是：给一段 C 代码 + 一段汇编代码（有空格让你填），或者反过来给汇编让你画栈帧。不要求你凭空写汇编，但要求你能对应起来。"
        },
        {
          type: "prose",
          html: "<h3>本章知识结构（先心中有地图）</h3>"
        },
        {
          type: "mermaid",
          id: "s6-roadmap",
          chart: `graph TD
    A["C 语言程序"] --> B["基本语句<br/>赋值/算术/取地址"]
    A --> C["控制语句<br/>if/while/for/switch"]
    A --> D["过程调用<br/>函数调用与返回"]
    A --> E["数据访问<br/>数组/结构体/指针"]

    B --> B1["mov / add / sub / lea"]
    C --> C1["cmp / test + jxx 跳转"]
    D --> D1["call / ret + 栈帧<br/>push/pop/mov ebp"]
    E --> E1["基址+偏移+比例变址"]

    B1 --> F["考试题型：<br/>汇编↔C 互译填空"]
    C1 --> F
    D1 --> F
    E1 --> F

    style A fill:#0f3460,stroke:#0f3460,color:#fff
    style F fill:#ef4444,stroke:#dc2626,color:#fff`
        }
      ]
    },
    {
      id: "s6-s2",
      title: "第1部分：寄存器速查——你的\"CPU 草稿纸\"",
      content: [
        {
          type: "callout",
          variant: "info",
          text: "这是 S4 复习区——寄存器那章（IA-32 指令系统）已经讲过了。如果你记得那 8 个寄存器的名字和用途，可以直接跳到第2部分。不太熟的话快速过一遍表格和条件码就行。"
        },
        {
          type: "prose",
          html: "<p>CPU 不能每次都去内存拿数据（太慢了），所以它有几个超快的内置变量，叫<strong>寄存器</strong>。做运算之前先把数据加载到寄存器里，在寄存器里算，算完再存回内存。</p>"
        },
        {
          type: "prose",
          html: "<p>在课程用的 IA-32（32 位 x86）中，有 8 个通用寄存器，每个 32 位。它们低 16 位有别名，部分低 8 位还有别名。</p>"
        },
        {
          type: "table",
          headers: ["32位名", "16位名", "8位名(低)", "8位名(高)", "惯例用途"],
          rows: [
            ["<strong>eax</strong>", "ax", "al", "ah", "累加器，返回值默认放这里"],
            ["<strong>ecx</strong>", "cx", "cl", "ch", "计数器（如循环次数）"],
            ["<strong>edx</strong>", "dx", "dl", "dh", "数据寄存器，乘除法辅助"],
            ["<strong>ebx</strong>", "bx", "bl", "bh", "基址寄存器，一般不放临时值"],
            ["<strong>esi</strong>", "si", "sil", "-", "源索引 (source index)"],
            ["<strong>edi</strong>", "di", "dil", "-", "目的索引 (destination index)"],
            ["<strong>esp</strong>", "sp", "spl", "-", "栈顶指针"],
            ["<strong>ebp</strong>", "bp", "bpl", "-", "帧指针（访问局部变量/参数用）"],
          ]
        },
        {
          type: "callout",
          variant: "tip",
          text: "不需要全背。考场上最高频的就是这几个：eax（返回值/累加器）、esp（栈顶）、ebp（找参数和局部变量）、ecx（有时当计数器）。"
        },
        {
          type: "prose",
          html: "<h3>条件码寄存器（不用记名字，理解作用）</h3>"
        },
        {
          type: "prose",
          html: "<p>CPU 做运算时，会自动设置几个<strong>条件码</strong>标志位——你可以理解成\"CPU 在草稿纸边上打的记号\"：</p>"
        },
        {
          type: "table",
          headers: ["标志", "含义", "什么时候被设置"],
          rows: [
            ["<strong>ZF</strong> (Zero Flag)", "零标志", "结果为 0 则 ZF=1"],
            ["<strong>SF</strong> (Sign Flag)", "符号标志", "结果为负（最高位=1）则 SF=1"],
            ["<strong>OF</strong> (Overflow Flag)", "溢出标志", "补码溢出则 OF=1"],
            ["<strong>CF</strong> (Carry Flag)", "进位标志", "无符号溢出则 CF=1"],
          ]
        },
        {
          type: "prose",
          html: "<p><code>cmp a, b</code> 指令做了 a-b 但不保存结果，只设置条件码。后面的 <code>je</code>/<code>jne</code>/<code>jg</code>/<code>jl</code> 就看这些标志位决定往哪跳。</p>"
        }
      ]
    },
    {
      id: "s6-s3",
      title: "第2部分：基本指令——机器级的\"单词\"",
      content: [
        {
          type: "prose",
          html: "<h3>数据传送指令</h3>"
        },
        {
          type: "table",
          headers: ["指令", "格式", "含义", "例子"],
          rows: [
            ["<strong>mov</strong>", "mov 目标, 源", "把源的值复制到目标", "mov eax, [ebx]  将内存[ebx]处值放入eax"],
            ["<strong>push</strong>", "push 源", "esp减4，然后把源写入栈顶", "push eax  把eax压栈"],
            ["<strong>pop</strong>", "pop 目标", "从栈顶读值写到目标，esp加4", "pop ebx  弹出到ebx"],
            ["<strong>lea</strong>", "lea 目标, 地址表达式", "只算地址不访存，结果写入目标", "lea eax, [ebx+4*esi]  计算地址放入eax"],
          ]
        },
        {
          type: "callout",
          variant: "warning",
          text: "lea vs mov 是最容易搞混的！lea 是 Load Effective Address——它只算地址、不去内存取数据。mov [addr], reg 才是真正访问内存。考试经常故意放 lea 让你判断它到底拿了什么值。"
        },
        {
          type: "prose",
          html: "<h3>算术指令</h3>"
        },
        {
          type: "table",
          headers: ["指令", "格式", "效果"],
          rows: [
            ["<strong>add</strong>", "add 目标, 源", "目标 = 目标 + 源"],
            ["<strong>sub</strong>", "sub 目标, 源", "目标 = 目标 - 源"],
            ["<strong>inc</strong>", "inc 目标", "目标 = 目标 + 1"],
            ["<strong>dec</strong>", "dec 目标", "目标 = 目标 - 1"],
            ["<strong>imul</strong>", "imul 目标, 源", "有符号乘法：目标 = 目标 × 源"],
            ["<strong>and/or/xor</strong>", "and 目标, 源", "按位与/或/异或"],
            ["<strong>shl/shr</strong>", "shl 目标, n", "左移/右移 n 位"],
          ]
        },
        {
          type: "prose",
          html: "<h3>控制指令——程序的\"岔路口\"</h3>"
        },
        {
          type: "table",
          headers: ["指令", "效果", "跳转条件（基于 cmp a,b 之后）"],
          rows: [
            ["<strong>cmp a, b</strong>", "算 a-b，只设标志位不存结果", "为后续跳转准备"],
            ["<strong>jmp addr</strong>", "无条件跳到 addr", "—"],
            ["<strong>je / jz</strong>", "相等则跳", "ZF=1（a==b）"],
            ["<strong>jne / jnz</strong>", "不等则跳", "ZF=0（a!=b）"],
            ["<strong>jg / jnle</strong>", "有符号大于则跳", "ZF=0 且 SF=OF（a>b）"],
            ["<strong>jl / jnge</strong>", "有符号小于则跳", "SF!=OF（a<b）"],
            ["<strong>jge / jnl</strong>", "有符号>=跳", "SF=OF（a>=b）"],
            ["<strong>jle / jng</strong>", "有符号<=跳", "ZF=1 或 SF!=OF（a<=b）"],
            ["<strong>jbe</strong>", "无符号<=跳", "CF=1 或 ZF=1"],
            ["<strong>call addr</strong>", "调函数：push返回地址, jmp addr", "—"],
            ["<strong>ret</strong>", "返回：pop 返回地址, jmp 回去", "—"],
          ]
        },
        {
          type: "callout",
          variant: "tip",
          text: "jxx 系列不用死记——je/jne 记 ZF，jmp 无条件，有符号比较看 SF 和 OF，无符号比较看 CF。考场上需要时推导一下即可。"
        },
        {
          type: "prose",
          html: "<h3>寻址方式——访问数据的\"门牌号\"写法</h3>"
        },
        {
          type: "prose",
          html: "<p>汇编里访问内存的地址可以写得很灵活，通用格式是：<strong>偏移(基址, 变址, 比例)</strong></p>"
        },
        {
          type: "math",
          formula: "\\text{有效地址} = \\text{偏移} + \\text{基址寄存器} + \\text{变址寄存器} \\times \\text{比例因子}",
          display: true
        },
        {
          type: "code",
          language: "asm",
          code: "mov eax, [ebx]              ; 基址寻址：取 ebx 指向的值\nmov eax, [ebx + 8]          ; 基址+偏移：取 ebx+8 处的值\nmov eax, [ebx + esi*4]      ; 基址+比例变址：取 ebx+esi*4 处的值\nmov eax, [ebx + esi*4 + 12] ; 全组合：取 ebx+esi*4+12 处的值\n\n; 考试最常见的：\nmov eax, [ebp - 4]   ; 取局部变量（栈上，在 ebp 下方）\nmov eax, [ebp + 8]   ; 取函数参数（栈上，在 ebp 上方）"
        },
        {
          type: "prose",
          html: "<p><strong>ebp 是访问栈帧的锚点！</strong>ebp 上方（正偏移）是参数和返回地址；ebp 下方（负偏移）是局部变量。这个\"上下关系\"必须刻在脑子里。</p>"
        }
      ]
    },
    {
      id: "s6-s4",
      title: "第3部分：C 控制结构 → 汇编（必考模式）",
      content: [
        {
          type: "prose",
          html: "<h3>if-else → cmp + 条件跳转</h3>"
        },
        {
          type: "code",
          language: "c",
          code: "// C 代码\nif (x > y) {\n    z = x;\n} else {\n    z = y;\n}"
        },
        {
          type: "code",
          language: "asm",
          code: "// 对应汇编\n    mov eax, [ebp+8]    ; eax = x（参数x在ebp+8）\n    cmp eax, [ebp+12]   ; 比较 x 和 y\n    jle .L_else          ; 如果 x<=y，跳到 else 块\n.L_if:\n    mov [ebp-4], eax    ; z = x（z是局部变量在ebp-4）\n    jmp .L_end\n.L_else:\n    mov eax, [ebp+12]   ; eax = y\n    mov [ebp-4], eax    ; z = y\n.L_end:"
        },
        {
          type: "prose",
          html: "<h3>while 循环 → 条件判断 + 回跳</h3>"
        },
        {
          type: "code",
          language: "c",
          code: "// C 代码\nint sum = 0;\nint i = 0;\nwhile (i < 10) {\n    sum += i;\n    i++;\n}"
        },
        {
          type: "code",
          language: "asm",
          code: "// 对应汇编\n    mov dword [ebp-4], 0    ; sum = 0\n    mov dword [ebp-8], 0    ; i = 0\n    jmp .L_cond             ; 先跳到条件判断\n.L_body:\n    mov eax, [ebp-8]        ; eax = i\n    add [ebp-4], eax        ; sum += i\n    inc dword [ebp-8]       ; i++\n.L_cond:\n    cmp dword [ebp-8], 10   ; 比较 i 和 10\n    jl .L_body              ; 如果 i<10，跳回循环体\n.L_end:"
        },
        {
          type: "prose",
          html: "<p><strong>循环结构识别口诀：</strong>找到 4 个部件——初始化（给某变量赋初值）、更新（inc/dec/add）、比较（cmp）、回跳（jl/jg 往上跳）。缺一个就不是循环。</p>"
        },
        {
          type: "prose",
          html: "<h3>for 循环 → 和 while 一样（只是写法不同）</h3>"
        },
        {
          type: "prose",
          html: "<p>for(init; cond; update) 编译后和 while 没有本质区别，只是在开头放 init，然后 cond → body → update → 回到 cond。</p>"
        },
        {
          type: "prose",
          html: "<h3>switch → 跳转表（关键考点）</h3>"
        },
        {
          type: "prose",
          html: "<p>当 case 值密集且连续时，编译器会用<strong>跳转表（jump table）</strong>——一个存满地址的数组，用 switch 的值当索引直接跳过去。比一连串 if-else 快很多。</p>"
        },
        {
          type: "code",
          language: "asm",
          code: "; 跳转表示例\n    mov eax, [ebp+8]    ; eax = switch 变量 n\n    cmp eax, 3          ; 范围检查：n 是否在 0..3 之间？\n    ja .L_default       ; 超出范围跳到 default\n    jmp [.L_jt + eax*4] ; 直接跳到 .L_jt[n] 存的地址\n.L_jt:\n    .long .L_case0      ; 表项0：跳 case 0\n    .long .L_case1      ; 表项1：跳 case 1\n    .long .L_case2      ; 表项2：跳 case 2\n    .long .L_case3      ; 表项3：跳 case 3"
        },
        {
          type: "callout",
          variant: "info",
          text: "看到汇编里有 .long 数组 + jmp [table + index*4] 模式，就立刻想到这是在实现 switch。考填空时很可能会让你填跳转表某个位置的标签名。"
        }
      ]
    },
    {
      id: "s6-s5",
      title: "★ 第4部分：函数调用与栈帧——本章最核心",
      content: [
        {
          type: "prose",
          html: "<p>这是期末 25 分程序填空题 + 15 分栈帧分析题的<strong>绝对核心</strong>。必须能画出栈帧图。</p>"
        },
        {
          type: "prose",
          html: "<h3>什么是栈帧（Stack Frame）？</h3>"
        },
        {
          type: "prose",
          html: "<p>每次调用一个函数，CPU 在栈上开辟一块空间作为这个函数的\"私人工作区\"。这块空间叫<strong>栈帧</strong>。里面保存：返回地址（函数执行完该回哪）、旧 ebp（调用者的帧指针）、局部变量、临时计算值等。</p>"
        },
        {
          type: "prose",
          html: "<h3>栈帧布局图（32位 x86）—— 必须会画</h3>"
        },
        {
          type: "mermaid",
          id: "stack-frame",
          chart: `graph TD
    subgraph "高地址（栈底方向）"
        A1["... 调用者的局部变量 ..."]
        A2["参数 n （最后一个入栈）"]
        A3["参数 2"]
        A4["参数 1 （第一个入栈）<br/>→ 通过 ebp+8 访问"]
        A5["返回地址 （call 指令压入）<br/>→ 通过 ebp+4 访问"]
        A6["旧 ebp 值 ← esp 当前指向（push ebp后）<br/>→ [ebp] 存的是旧 ebp"]
    end
    subgraph "被调函数的栈帧"
        B1["局部变量 1 → ebp-4"]
        B2["局部变量 2 → ebp-8"]
        B3["... 临时空间 ..."]
        B4["← esp 始终指向栈顶"]
    end
    A5 --> A6
    A6 --> B1

    style A5 fill:#fef3c7,stroke:#d97706
    style A6 fill:#fee2e2,stroke:#dc2626
    style A4 fill:#dbeafe,stroke:#2563eb
    style B4 fill:#d1fae5,stroke:#059669`
        },
        {
          type: "prose",
          html: "<h3>ebp 偏移速查表——考试\"坐标系统\"</h3>"
        },
        {
          type: "table",
          headers: ["偏移", "指向什么", "读/写"],
          rows: [
            ["<strong>[ebp + 8]</strong>", "第一个参数", "读（通常）"],
            ["<strong>[ebp + 12]</strong>", "第二个参数", "读（通常）"],
            ["<strong>[ebp + 4]</strong>", "返回地址（call 压的）", "只读！绝不修改"],
            ["<strong>[ebp]</strong>", "旧 ebp（调用者的帧指针）", "mov ebp, [ebp] 可回溯"],
            ["<strong>[ebp - 4]</strong>", "第一个局部变量", "读写"],
            ["<strong>[ebp - 8]</strong>", "第二个局部变量", "读写"],
          ]
        },
        {
          type: "prose",
          html: "<h3>函数调用的完整过程——逐步追踪</h3>"
        },
        {
          type: "prose",
          html: "<p><strong>调用方（caller）：</strong></p>"
        },
        {
          type: "code",
          language: "asm",
          code: "; 调用前，调用方做的事：\n    push 参数3      ; 参数从右往左入栈\n    push 参数2\n    push 参数1\n    call 函数名      ; 等价于：push 返回地址; jmp 函数名\n    ; ← ret 之后回到这里\n    add esp, 12     ; 清理参数（3个参数×4字节=12）"
        },
        {
          type: "prose",
          html: "<p><strong>被调方（callee）——函数开头（序言 prologue）：</strong></p>"
        },
        {
          type: "code",
          language: "asm",
          code: "; 函数开头的标准三件套：\n    push ebp            ; 1. 保存调用者的 ebp\n    mov ebp, esp        ; 2. 建立自己的帧指针（ebp=esp）\n    sub esp, N          ; 3. 为局部变量留空间（N字节）"
        },
        {
          type: "prose",
          html: "<p><strong>被调方（callee）——函数结尾（尾声 epilogue）：</strong></p>"
        },
        {
          type: "code",
          language: "asm",
          code: "; 函数结尾的标准两件套：\n    mov esp, ebp        ; 1. 回收局部变量空间（esp回到ebp位置）\n    pop ebp             ; 2. 恢复调用者的ebp（esp+4）\n    ret                 ; 3. pop返回地址并跳转回去"
        },
        {
          type: "callout",
          variant: "tip",
          text: "记住口诀：函数开头 push ebp; mov ebp, esp; sub esp, N（三件套）。函数结尾 mov esp, ebp; pop ebp; ret（三件套）。这是每次函数调用的\"标准起手式\"和\"标准收尾式\"。",
        },
        {
          type: "prose",
          html: "<h3>参数传递约定——课程用两种</h3>"
        },
        {
          type: "prose",
          html: "<p>课程的课件例题主要在<strong>32 位 IA-32</strong>框架下讲解：参数通过栈传递，用 ebp+偏移来访问。但 64 位 x86-64 实际用寄存器传前几个参数（rdi/rsi/rdx/rcx/r8/r9）。考试时根据题目给定的汇编代码来判，看它从哪取参数：</p>"
        },
        {
          type: "table",
          headers: ["架构", "参数传递方式", "返回值", "考试出现情况"],
          rows: [
            ["IA-32 (32位)", "栈传递，ebp+8, +12, +16...", "eax", "课件例题主体，考填空最多"],
            ["x86-64 (64位)", "前6个用寄存器(rdi,rsi,rdx,rcx,r8,r9)", "rax", "偶尔概念题涉及"],
          ]
        }
      ]
    },
    {
      id: "s6-s6",
      title: "★ 完整示例：C函数→汇编→逐行追踪",
      content: [
        {
          type: "prose",
          html: "<p>这是考试级别的完整例子。把它吃透，类似的填空/分析题基本都能做。</p>"
        },
        {
          type: "prose",
          html: "<h4>C 代码</h4>"
        },
        {
          type: "code",
          language: "c",
          code: "int add_three(int a, int b, int c) {\n    int sum;\n    sum = a + b + c;\n    return sum;\n}"
        },
        {
          type: "prose",
          html: "<h4>编译后的汇编（IA-32，32位）</h4>"
        },
        {
          type: "code",
          language: "asm",
          code: "add_three:\n    push ebp              ; ① 保存旧帧指针\n    mov ebp, esp          ; ② 建新帧指针\n    sub esp, 4            ; ③ 为 sum 留 4 字节\n\n    mov eax, [ebp+8]      ; ④ eax = a（参数1在ebp+8）\n    add eax, [ebp+12]     ; ⑤ eax = a + b\n    add eax, [ebp+16]     ; ⑥ eax = a + b + c\n    mov [ebp-4], eax      ; ⑦ sum = eax\n\n    ; 返回值已放在 eax 中（惯例）\n    mov esp, ebp          ; ⑧ 回收局部变量\n    pop ebp               ; ⑨ 恢复旧帧指针\n    ret                   ; ⑩ 返回"
        },
        {
          type: "prose",
          html: "<h4>逐步追踪——每条指令后寄存器和栈的变化</h4>"
        },
        {
          type: "prose",
          html: "<p><strong>假设调用点：</strong>add_three(5, 10, 15)</p>"
        },
        {
          type: "table",
          headers: ["步骤", "指令", "执行后的效果"],
          rows: [
            ["栈上已有", "(caller push 参数)", "栈顶附近：[15][10][5][返回地址] ← esp 指向返回地址"],
            ["①", "push ebp", "旧ebp被压栈，esp = esp-4。栈上有：[旧ebp][15][10][5][返回地址] ← esp 指向旧ebp"],
            ["②", "mov ebp, esp", "ebp 现在指向 [旧ebp] 的位置，即 ebp=esp 当前位置"],
            ["③", "sub esp, 4", "esp 再减 4，留出 sum 的空间。栈布局现在完整"],
            ["④", "mov eax, [ebp+8]", "eax = 5（a的值）。注意：ebp+8 跳过 [旧ebp] 和 [返回地址] 到达参数 a"],
            ["⑤", "add eax, [ebp+12]", "eax = 5 + 10 = 15"],
            ["⑥", "add eax, [ebp+16]", "eax = 15 + 15 = 30"],
            ["⑦", "mov [ebp-4], eax", "sum(ebp-4) = 30"],
            ["⑧", "mov esp, ebp", "esp 移到 ebp 位置（收了局部变量空间）"],
            ["⑨", "pop ebp", "恢复旧 ebp，esp+4 指向返回地址"],
            ["⑩", "ret", "弹出返回地址，跳回去。eax=30 即返回值"],
          ]
        },
        {
          type: "prose",
          html: "<h4>调用完成后的栈帧图（在执行第④步时）</h4>"
        },
        {
          type: "code",
          language: "",
          code: "高地址\n  +----------------+\n  |  参数 c = 15   |  ← ebp+16\n  +----------------+\n  |  参数 b = 10   |  ← ebp+12\n  +----------------+\n  |  参数 a = 5    |  ← ebp+8\n  +----------------+\n  |   返回地址     |  ← ebp+4\n  +----------------+\n  |   旧 ebp       |  ← ebp 指向这里\n  +----------------+\n  |   sum = 30     |  ← ebp-4, esp 指向这里\n  +----------------+\n低地址"
        },
        {
          type: "callout",
          variant: "warning",
          text: "考试最常见的错误：把 [ebp+8] 当成\"ebp往下8字节\"（错！）。ebp 的偏移是往上（高地址）为正，往下（低地址）为负。参数在高地址方向，所以是 ebp+N（N>0）；局部变量在低地址方向，所以是 ebp-N（N>0）。",
        }
      ]
    },
    {
      id: "s6-s7",
      title: "数据结构的内存布局",
      content: [
        {
          type: "prose",
          html: "<h3>数组 → 基址 + 索引 × 元素大小</h3>"
        },
        {
          type: "code",
          language: "asm",
          code: "; int arr[10]; 访问 arr[i]\n    mov eax, [ebx + esi*4]   ; 假设 ebx=arr基址, esi=i, 每个int 4字节\n\n; char str[10]; 访问 str[i]\n    mov al, [ebx + esi]       ; 每个char 1字节，比例因子=1（省略）"
        },
        {
          type: "prose",
          html: "<h3>结构体 → 基址 + 字段偏移</h3>"
        },
        {
          type: "code",
          language: "c",
          code: "struct Point {\n    int x;   // 偏移 0\n    int y;   // 偏移 4\n    char c;  // 偏移 8\n};"
        },
        {
          type: "code",
          language: "asm",
          code: "; p.x = 10;\n    mov [ebx + 0], 10      ; x 在偏移 0\n; p.y = p.x + 5;\n    mov eax, [ebx + 0]     ; 取 x\n    add eax, 5\n    mov [ebx + 4], eax     ; 存 y（偏移 4）\n; 注意：结构体有内存对齐，字段间可能有空洞！"
        },
        {
          type: "callout",
          variant: "tip",
          text: "结构体字段偏移不是简单的字段大小累加——编译器可能插入 padding 来对齐。考试通常会直接给出偏移或者让考生判断合理偏移，很少要求精确算对齐——但你得知道有 padding 这回事。"
        }
      ]
    },
    {
      id: "s6-s8",
      title: "考试怎么考",
      content: [
        {
          type: "prose",
          html: "<h4>题型与分值（2025卷）</h4>"
        },
        {
          type: "table",
          headers: ["题型", "分值", "考查内容"],
          rows: [
            ["<strong>程序填空</strong>（2题）", "15+10=<strong>25分</strong>", "给 C 代码+部分汇编，填缺失的汇编指令或 C 表达式"],
            ["<strong>栈帧分析题</strong>", "<strong>15分</strong>", "读汇编画栈帧图，标出参数/局部变量/返回地址位置"],
          ]
        },
        {
          type: "prose",
          html: "<h4>程序填空解题策略</h4>"
        },
        {
          type: "prose",
          html: "<ol><li><strong>先看函数签名</strong>——有几个参数？什么类型？参数按什么顺序入栈？</li><li><strong>定位参数访问</strong>——汇编里 [ebp+8], [ebp+12] 这些就是参数。</li><li><strong>定位局部变量</strong>——汇编里 [ebp-4], [ebp-8] 就是局部变量。</li><li><strong>匹配 C 表达式</strong>——add/sub/imul 对应 + - *，mov 对应 =，cmp+jxx 对应 if/while。</li><li><strong>看返回值</strong>——return 前最后写 eax 的就是返回值。</li></ol>"
        },
        {
          type: "prose",
          html: "<h4>栈帧分析题解题策略</h4>"
        },
        {
          type: "prose",
          html: "<ol><li><strong>画栈帧图</strong>——高地址在上，低地址在下。</li><li><strong>标注所有元素</strong>——旧ebp、返回地址、参数1/2/3、局部变量1/2。</li><li><strong>写出偏移</strong>——[ebp+n] 和 [ebp-n] 分别是什么。</li><li><strong>如有调用链</strong>——画多层栈帧叠加图。</li></ol>"
        },
        {
          type: "prose",
          html: "<h4>常见错误</h4>"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误1：搞反 ebp 偏移方向。ebp+8 是\"往高地址走8字节\"（参数），ebp-4 是\"往低地址走4字节\"（局部变量）。画图时高地址在上低地址在下，加的是往上，减的是往下。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误2：忘了返回地址和旧 ebp 也占位置。从 ebp 到第一个参数中间隔了旧 ebp(4字节) 和返回地址(4字节)，所以第一个参数是 ebp+8 而不是 ebp+4，更不是 ebp。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误3：lea 当 mov。lea eax, [ebp-4] 是把 ebp-4 这个地址值放进 eax，不是去 [ebp-4] 取数据。lea 算地址，mov 取数据。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误4：jxx 跳转方向看反。je target 中，如果 target 标签在指令下方（高地址），是往前跳；如果在上方（低地址），是往回跳（循环）。考场上画个箭头标方向。"
        },
        {
          type: "callout",
          variant: "danger",
          text: "错误5：函数结尾忘了恢复栈。mov esp,ebp; pop ebp; ret 这三个缺一不可。少一个，栈就乱了，返回地址不对，程序崩溃。填空题可能让你填被省略的指令。"
        }
      ]
    },
    {
      id: "s6-s9",
      title: "真题演练",
      content: [
        { type: "examQuestions", ids: ["eq-s6-1", "eq-s6-2"] }
      ]
    },
    {
      id: "s6-s10",
      title: "小测验",
      content: [
        {
          type: "quiz",
          ids: ["q-s6-1", "q-s6-2"]
        }
      ]
    }
  ]
};

export default content;
