import type { ModuleContent } from "learncourse/types";

const content: ModuleContent = {
  meta: { id: "s4", number: 4, title: "汇编语言基础", icon: "Code2", courseware: "04 汇编基础.pptx", examRefs: "综合题基础" },
  calloutText: "这章解决什么问题？看懂机器指令的\"人可读版本\"——理解寄存器、mov 数据传送、寻址方式，为阅读汇编代码和后续栈帧/攻击章打基础。",
  sections: [
    {
      id: "s4-s1",
      title: "4.1 先理解直觉",
      content: [
        {
          type: "prose",
          html: "<p>让我们玩一个游戏。你有一个计算器和一张草稿纸。计算器只能做最简单的加减法，但速度极快——你一按它就出结果。草稿纸呢，可以写很多东西，但你得低头看、慢慢找。</p>"
        },
        {
          type: "prose",
          html: "<p>如果你在算 <code>(3+5)*2</code>，怎么最快？你肯定不会把每一步结果写在草稿纸上再去找——你会：算 3+5，得到 8，<strong>记在脑子里</strong>，再用脑子里的 8 去乘 2，得到 16。只有最终结果才写回草稿纸上。</p>"
        },
        {
          type: "prose",
          html: "<p>CPU 就是这么干的。<strong>寄存器（Register）</strong>就是 CPU 脑子的\"短期记忆\"——数量极少（几十个），但快到极致（1 个时钟周期就能读写）。<strong>内存（Memory）</strong>就是草稿纸——容量很大（几 GB），但比寄存器慢几十到上百倍。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>汇编语言，本质上就是\"指挥 CPU 在寄存器和内存之间搬数据、做运算\"的语言。</strong>你看到的 mov、add、jmp 这些指令，都是在说：把这个寄存器的数挪过去、把那个内存的数读进来、把这两个数加起来。</p>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "看汇编代码时，不要想\"这行代码在 C 里是什么意思\"。先问四个问题：① 从哪里读？（源操作数）② 写到哪里？（目的操作数）③ 读的是什么大小？（字节/字/双字）④ 这条指令改了什么？（数据/地址/条件码）"
        }
      ]
    },
    {
      id: "s4-s2",
      title: "4.2 寄存器——CPU 的\"小抽屉\"",
      content: [
        {
          type: "prose",
          html: "<p>寄存器就是 CPU 内部最快的小存储单元。在 x86（IA32）架构中，有 8 个通用寄存器，每个 32 位（4 字节）。它们各有\"昵称\"和常用用途：</p>"
        },
        {
          type: "mermaid",
          id: "cpu-registers",
          chart: `graph TD
    subgraph "x86 IA32 通用寄存器（每个 32 位 = 4 字节）"
        EAX["%eax — 累加器<br/>常用于存返回值"]
        EBX["%ebx — 基址寄存器<br/>常用于存基地址"]
        ECX["%ecx — 计数器<br/>常用于循环计数"]
        EDX["%edx — 数据寄存器<br/>常用于乘法辅助"]
        ESI["%esi — 源变址<br/>常用于字符串操作"]
        EDI["%edi — 目的变址<br/>常用于字符串操作"]
        ESP["%esp — 栈指针<br/>永远指向栈顶（别乱改！）"]
        EBP["%ebp — 帧指针<br/>指向当前函数的栈帧底部"]
    end

    EAX -->|"也可拆成 16 位"| AX["%ax（低 16 位）"]
    AX -->|"再拆"| AH["%ah（高 8 位）"]
    AX -->|"再拆"| AL["%al（低 8 位）"]
    ESP -->|"特殊：专用寄存器"| STACK["控制栈操作"]`
        },
        {
          type: "card",
          title: "8 个通用寄存器速查表",
          body: `<div class="card">
<table>
<tbody><tr><th>32 位名</th><th>16 位名</th><th>8 位名（低）</th><th>8 位名（高）</th><th>约定用途</th></tr>
<tr><td>%eax</td><td>%ax</td><td>%al</td><td>%ah</td><td>返回值、累加</td></tr>
<tr><td>%ebx</td><td>%bx</td><td>%bl</td><td>%bh</td><td>基址（被调用者保存）</td></tr>
<tr><td>%ecx</td><td>%cx</td><td>%cl</td><td>%ch</td><td>计数器</td></tr>
<tr><td>%edx</td><td>%dx</td><td>%dl</td><td>%dh</td><td>数据、乘法高位</td></tr>
<tr><td>%esi</td><td>%si</td><td>—</td><td>—</td><td>源指针</td></tr>
<tr><td>%edi</td><td>%di</td><td>—</td><td>—</td><td>目的指针</td></tr>
<tr><td>%esp</td><td>%sp</td><td>—</td><td>—</td><td><strong>栈指针（千万别乱改！）</strong></td></tr>
<tr><td>%ebp</td><td>%bp</td><td>—</td><td>—</td><td><strong>帧指针（访问局部变量用）</strong></td></tr>
</tbody></table>
<p style="margin-top:8px;">另外还有：<strong>%eip</strong>（指令指针，存放下一条指令地址）和 <strong>EFLAGS</strong>（条件码寄存器，存 CF/ZF/SF/OF 等标志位）。</p>
</div>`
        },
        {
          type: "prose",
          html: "<h4>为什么寄存器有不同的\"宽度\"？</h4>"
        },
        {
          type: "prose",
          html: "<p>%eax 是 32 位的。如果你只需要存一个 16 位的数，你可以只用它的低 16 位——叫 %ax。如果你只需要一个字节（8 位），你可以用 %al（低 8 位）或 %ah（高 8 位）。</p>"
        },
        {
          type: "prose",
          html: "<p>打个比方：%eax 是个 4 层抽屉柜，%ax 就是用下面 2 层，%al 就是最下面那层。修改 %al 只会改最下面那层，不影响上面三层。</p>"
        },
        {
          type: "callout",
          variant: "warning",
          text: "注意：%esi 和 %edi 没有 8 位的子寄存器。只有前四个通用寄存器（%eax/%ebx/%ecx/%edx）能拆成 8 位。这个细节不需要死记，看指令中的后缀就能识别操作的大小。"
        }
      ]
    },
    {
      id: "s4-s3",
      title: "4.3 mov 指令——数据的\"搬运工\"",
      content: [
        {
          type: "prose",
          html: "<p><code>mov</code> 是汇编里最常见的指令。它的名字来自英文 <strong>mov</strong>e，但有一个重要误解需要澄清：</p>"
        },
        {
          type: "callout",
          variant: "danger",
          text: "mov 是\"复制\"不是\"搬走\"！mov S, D 的含义是：把 S（源操作数）的值复制一份到 D（目的操作数）。复制完之后，S 的值还在——源操作数不会\"空掉\"。这一点和日常语言中的\"移动\"完全不同。"
        },
        {
          type: "prose",
          html: "<h4>AT&T 语法格式（本课程使用）</h4>"
        },
        {
          type: "prose",
          html: "<p><code>mov<strong>后缀</strong> 源操作数, 目的操作数</code></p>"
        },
        {
          type: "prose",
          html: "<p>关键规则：<strong>源在左，目的在右</strong>。这和 Intel 语法正好相反，很多初学者在这里搞混。</p>"
        },
        {
          type: "card",
          title: "mov 指令的后缀——决定操作大小",
          body: `<div class="card">
<table>
<tbody><tr><th>后缀</th><th>完整指令</th><th>操作大小</th><th>示例</th></tr>
<tr><td>b（byte）</td><td>movb</td><td>1 字节（8 位）</td><td>movb \$42, %al</td></tr>
<tr><td>w（word）</td><td>movw</td><td>2 字节（16 位）</td><td>movw \$1000, %ax</td></tr>
<tr><td>l（long）</td><td>movl</td><td>4 字节（32 位）</td><td>movl \$100, %eax</td></tr>
</tbody></table>
<p style="margin-top:8px;">AT&T 语法中，<code>\$</code> 表示立即数（常量），<code>%</code> 表示寄存器。例如 <code>movl \$5, %eax</code> 读作\"把立即数 5 复制到寄存器 eax\"。</p>
</div>`
        },
        {
          type: "prose",
          html: "<h4>mov 指令实例——逐行解读</h4>"
        },
        {
          type: "table",
          headers: ["指令", "解读（用大白话）", "等价 C 思维"],
          rows: [
            ["movl $10, %eax", "把立即数 10 放到寄存器 eax 里", "int eax = 10;"],
            ["movl %eax, %ebx", "把 eax 的值复制一份到 ebx", "ebx = eax;"],
            ["movl (%eax), %ebx", "eax 里存的是一个地址，去那个地址读 4 字节，放入 ebx", "ebx = *eax;"],
            ["movl %ebx, (%eax)", "把 ebx 的 4 字节数据写入 eax 所指的内存地址", "*eax = ebx;"],
            ["movb $65, %al", "把立即数 65 放到 al（eax 的低 8 位）", "char al = 65;"]
          ]
        },
        {
          type: "callout",
          variant: "warning",
          text: "mov 指令不能从内存直达内存！\"movl (addr1), (addr2)\" 是非法的。必须先读到寄存器，再写到目标内存：movl (addr1), %eax → movl %eax, (addr2)。"
        }
      ]
    },
    {
      id: "s4-s4",
      title: "4.4 寻址方式——CPU 怎样找到数据？",
      content: [
        {
          type: "prose",
          html: "<p>寻址方式，就是告诉 CPU\"数据在哪里\"的方法。x86 提供了几种方式，从简单到复杂：</p>"
        },
        {
          type: "card",
          title: "四种基本寻址方式",
          body: `<div class="card">
<table>
<tbody><tr><th>寻址方式</th><th>写法</th><th>含义</th><th>比喻</th></tr>
<tr><td><strong>立即数</strong></td><td>\$42</td><td>数据就在指令里，直接用</td><td>\"答案是 42\"——直接告诉你</td></tr>
<tr><td><strong>寄存器</strong></td><td>%eax</td><td>数据在寄存器里</td><td>\"答案在我脑子里\"——从短期记忆取</td></tr>
<tr><td><strong>直接内存</strong></td><td>0x8048000 或 (0x8048000)</td><td>直接给出内存地址</td><td>\"答案在课本第 3 页\"——已知门牌号</td></tr>
<tr><td><strong>基址+偏移</strong></td><td>8(%ebp)</td><td>以 ebp 的值为基址，加 8 得到目标地址</td><td>\"答案在课本，从第 5 页往后翻 3 页\"</td></tr>
</tbody></table>
</div>`
        },
        {
          type: "prose",
          html: "<h4>复杂寻址——最完整的格式</h4>"
        },
        {
          type: "prose",
          html: "<p>完整的内存寻址格式：<strong>偏移(基址寄存器, 变址寄存器, 比例因子)</strong></p>"
        },
        {
          type: "prose",
          html: "<p>计算公式：$地址 = 偏移 + 基址 + 变址 \\times 比例因子$</p>"
        },
        {
          type: "prose",
          html: "<p>这看起来很吓人，但其实它对应 C 语言里的数组访问。比如：<code>(%ebx, %esi, 4)</code> 如果 %ebx 是数组的首地址，%esi 是索引 i，4 是每个元素的大小（字节），那么这个寻址表达式就是 <code>array[i]</code> 的地址。</p>"
        },
        {
          type: "table",
          headers: ["寻址表达式", "地址计算公式", "典型对应的 C 代码"],
          rows: [
            ["(%eax)", "地址 = %eax的值", "读指针 *ptr"],
            ["8(%ebp)", "地址 = %ebp的值 + 8", "栈上第 2 个参数"],
            ["(%ebx, %esi, 4)", "地址 = %ebx + %esi*4", "数组元素 arr[i]（int 数组）"],
            ["12(%ebp, %ecx, 2)", "地址 = %ebp + %ecx*2 + 12", "结构体中的 short 数组"]
          ]
        },
        {
          type: "callout",
          variant: "tip",
          text: "看到复杂的括号寻址表达式时，不要慌。拆成四个部分：偏移量 = ？基址寄存器 = ？变址寄存器 = ？比例因子 = ？每部分都可以为空（即为 0 或忽略）。先拆，再读。"
        }
      ]
    },
    {
      id: "s4-s5",
      title: "4.5 基本算术指令",
      content: [
        {
          type: "prose",
          html: "<p>除了 mov（搬数据），最常用的就是算术指令了。和 mov 一样，它们也有后缀表示操作大小。</p>"
        },
        {
          type: "card",
          title: "常用算术指令速查",
          body: `<div class="card">
<table>
<tbody><tr><th>指令</th><th>格式</th><th>效果</th><th>C 等价</th></tr>
<tr><td>add</td><td>addl S, D</td><td>D = D + S</td><td>D += S;</td></tr>
<tr><td>sub</td><td>subl S, D</td><td>D = D - S</td><td>D -= S;</td></tr>
<tr><td>inc</td><td>incl D</td><td>D = D + 1</td><td>D++;</td></tr>
<tr><td>dec</td><td>decl D</td><td>D = D - 1</td><td>D--;</td></tr>
<tr><td>imul</td><td>imull S, D</td><td>D = D * S</td><td>D *= S;</td></tr>
<tr><td>neg</td><td>negl D</td><td>D = -D</td><td>D = -D;</td></tr>
<tr><td>and</td><td>andl S, D</td><td>D = D & S</td><td>D &= S;</td></tr>
<tr><td>or</td><td>orl S, D</td><td>D = D | S</td><td>D |= S;</td></tr>
<tr><td>xor</td><td>xorl S, D</td><td>D = D ^ S</td><td>D ^= S;</td></tr>
<tr><td>not</td><td>notl D</td><td>D = ~D</td><td>D = ~D;</td></tr>
<tr><td>lea</td><td>leal S, D</td><td>D = S 的地址（不做内存访问！）</td><td>D = &S; 或地址计算</td></tr>
</tbody></table>
</div>`
        },
        {
          type: "callout",
          variant: "info",
          text: "lea（Load Effective Address）是\"计算地址但不访问内存\"的指令。leal (%eax,%eax,4), %ebx 等价于 ebx = eax * 5。它经常被编译器用来做\"乘法 + 加法\"的快捷计算。"
        }
      ]
    },
    {
      id: "s4-s6",
      title: "4.6 动手试试：读一段完整的汇编代码",
      content: [
        {
          type: "prose",
          html: "<p>下面是一段完整的汇编函数，它实现了 <code>a + b + 1</code> 的计算。我们逐行解读：</p>"
        },
        {
          type: "code",
          language: "asm",
          code: `; 函数功能：计算 a + b + 1
; C 等价: int add_one(int a, int b) { return a + b + 1; }
;
; 进入函数时: a 在 8(%ebp), b 在 12(%ebp)
; 返回值通过 %eax 传回

add_one:
    pushl   %ebp               ; ① 保存旧的帧指针
    movl    %esp, %ebp         ; ② 建立新的栈帧（ebp 指向当前栈顶）
    movl    8(%ebp), %eax      ; ③ 读取参数 a → eax
    addl    12(%ebp), %eax     ; ④ eax = eax + b（即 a + b）
    addl    $1, %eax           ; ⑤ eax = eax + 1（即 a + b + 1）
    popl    %ebp               ; ⑥ 恢复旧的帧指针
    ret                        ; ⑦ 返回调用者（返回值在 %eax 里）`
        },
        {
          type: "prose",
          html: "<h4>逐行解读（用大白话）</h4>"
        },
        {
          type: "prose",
          html: "<p><strong>①②——\"进门\"仪式：</strong>每次进入函数都要做这两个动作。pushl %ebp 把旧的帧指针（调用者的\"书签\"）压入栈保存起来；movl %esp, %ebp 让 ebp 指向当前栈顶，作为本函数的\"书签\"。第 6 章会详细讲栈帧。现在你只需知道——这是一段\"固定套路\"。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>③——读参数 a：</strong>movl 8(%ebp), %eax。ebp 是本函数的\"书签\"位置。从 ebp+8 开始的 4 字节就是第一个参数 a。这条指令把 a 读到 eax 里。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>④——加 b：</strong>addl 12(%ebp), %eax。ebp+12 是第二个参数 b。这条指令做 eax = eax + b。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>⑤——加 1：</strong>addl $1, %eax。常量 1 前面有 $ 符号，表示\"立即数\"。现在 eax = a + b + 1。</p>"
        },
        {
          type: "prose",
          html: "<p><strong>⑥⑦——\"出门\"仪式：</strong>popl %ebp 恢复调用者的帧指针（把\"书签\"还回去）；ret 让 CPU 跳回调用者继续执行。返回值已经在 %eax 里了。</p>"
        },
        {
          type: "callout",
          variant: "tip",
          text: "读汇编代码的通用方法：① 先找\"入口固定套路\"（pushl %ebp / movl %esp,%ebp）和\"出口固定套路\"（popl %ebp / ret）——框定函数范围。② 找到对 %eax 的写入——这通常是返回值。③ 逐条看数据从哪来、到哪去、做了什么运算。"
        }
      ]
    },
    {
      id: "s4-s7",
      title: "4.7 GDB 调试入门——亲眼看到寄存器在变",
      content: [
        {
          type: "prose",
          html: "<p>看静态的汇编代码是一回事，看到它动态执行是另一回事。GDB 是 GNU Debugger，让你一条条指令地跟踪执行，看寄存器值怎么变。</p>"
        },
        {
          type: "card",
          title: "GDB 最常用命令",
          body: `<div class="card">
<table>
<tbody><tr><th>命令</th><th>全称/缩写</th><th>作用</th></tr>
<tr><td>break main</td><td>b main</td><td>在 main 函数入口设断点</td></tr>
<tr><td>run</td><td>r</td><td>开始执行（到断点停下）</td></tr>
<tr><td>nexti</td><td>ni</td><td>执行下一条指令（不进入函数）</td></tr>
<tr><td>stepi</td><td>si</td><td>执行下一条指令（进入函数）</td></tr>
<tr><td>info registers</td><td>i r</td><td>显示所有寄存器的值</td></tr>
<tr><td>print \$eax</td><td>p \$eax</td><td>打印 eax 的值</td></tr>
<tr><td>x/4xw \$esp</td><td>—</td><td>以 16 进制 4 字方式查看 esp 指向的内存</td></tr>
<tr><td>disassemble</td><td>disas</td><td>显示当前函数的汇编代码</td></tr>
<tr><td>continue</td><td>c</td><td>继续执行到下一个断点或结束</td></tr>
<tr><td>quit</td><td>q</td><td>退出 GDB</td></tr>
</tbody></table>
</div>`
        },
        {
          type: "code",
          language: "bash",
          code: `# 编译时加 -g 保留调试信息
gcc -g -m32 hello.c -o hello

# 启动 GDB
gdb ./hello

# 在 GDB 里
(gdb) break main         # 设断点
(gdb) run                # 运行
(gdb) disassemble        # 看汇编
(gdb) info registers     # 看寄存器
(gdb) nexti              # 逐条执行
(gdb) print $eax         # 看 eax 的值
(gdb) quit`
        },
        {
          type: "callout",
          variant: "tip",
          text: "学汇编最有效的办法就是打开 GDB，对着一小段程序逐条 nexti，每执行一条就看一次 info registers。看着寄存器的值在变化，你才能真正理解\"指令到底做了什么\"。"
        }
      ]
    },
    {
      id: "s4-s8",
      title: "4.8 考试怎么考",
      content: [
        {
          type: "prose",
          html: "<h4>本章在考试中的位置</h4>"
        },
        {
          type: "prose",
          html: "<p>本章是第 6 章（程序的机器级表示）的前置基础。直接考察可能只有 2~4 分（识别寄存器名称、解释一条 mov 指令），但<strong>如果这章不扎实，第 6 章的 25 分大题你根本读不懂题目中的汇编代码</strong>。</p>"
        },
        {
          type: "table",
          headers: [],
          rows: [
            ["题型", "分值", "考查内容"],
            ["概念选择题", "1~2 分", "哪个是累加器？%esp 的用途？"],
            ["指令解释", "2~4 分", "给一条 mov/add 指令，解释含义和结果"],
            ["寻址计算", "与后面章合并", "给定寄存器和地址表达式，计算操作数的地址"],
            ["GDB 相关", "1~2 分", "看 GDB 输出，回答某寄存器/内存的值"]
          ]
        },
        {
          type: "callout",
          variant: "warning",
          text: "易错1：AT&T 语法的操作数顺序是\"源, 目的\"。Intel 语法是\"目的, 源\"——正好相反。考试使用 AT&T 语法，别弄反。"},
        {
          type: "callout",
          variant: "warning",
          text: "易错2：movl (%eax), %ebx 是\"读内存\"——把 eax 中存的那个地址处的 4 字节读到 ebx。movl %eax, (%ebx) 是\"写内存\"——把 eax 的值写到 ebx 所指的地址。括号决定了谁是地址。"
        },
        {
          type: "callout",
          variant: "warning",
          text: "易错3：看到 mov 后面跟不同后缀（b/w/l）就乱。后缀只表示操作大小——b=1字节，w=2字节，l=4字节。操作数的大小必须和指令后缀匹配。"
        }
      ]
    },
    {
      id: "s4-s9",
      title: "4.9 真题演练",
      content: [
        { type: "examQuestions", ids: ["eq-s4-1", "eq-s4-2"] }
      ]
    },
    {
      id: "s4-s10",
      title: "4.10 小测验",
      content: [
        { type: "quiz", ids: ["q-s4-1", "q-s4-2"] }
      ]
    }
  ]
};

export default content;
