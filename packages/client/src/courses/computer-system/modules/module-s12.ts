import type { ModuleContent } from "@learncourse/framework/types";

const meta = {"id":"s12","number":12,"title":"安全攻击与防御","icon":"Shield","courseware":"12 安全+64位.pptx","examRefs":"概念题 ~3分"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？C 语言不检查数组越界——如果你往一个 10 字节的 buffer 里写了 100 字节，多出的 90 字节会覆盖栈上的其他东西，包括函数的返回地址。攻击者可以利用这一点控制程序执行任意代码。这一章告诉你攻击怎么发生的，以及现代系统怎么防御。",
  sections: [
  {
    id: "s12-s1",
    title: "12.0 本章在考试中的位置",
    content: [
      {
        type: "prose",
        html: "<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\">课件：12 安全+64位.pptx · 概念题 ~3分 · 低优先级，但概念很直观，容易速成</p>"
      }
    ]
  },
  {
    id: "s12-s2",
    title: "12.1 先理解直觉——栈上的\"多米诺骨牌\"",
    content: [
      {
        type: "prose",
        html: "<p>栈是一叠从上往下长的多米诺骨牌。当你调用函数时，栈上依次放了：</p><ol><li>局部变量（如 char buffer[10]）</li><li>旧的 %ebp（栈帧基址）</li><li><strong>返回地址</strong>——函数执行完该回到哪里</li></ol>"
      },
      {
        type: "prose",
        html: "<p>如果 buffer 只分配了 10 字节，但你往里写了 100 字节——多出的 90 字节会<strong>往上覆盖</strong>旧 %ebp 和<strong>返回地址</strong>。攻击者可以精心构造输入，让返回地址指向自己注入的恶意代码。</p>"
      },
      {
        type: "mermaid",
        id: "s12-stack-overflow",
        chart: `graph TD
    subgraph "正常栈（调用函数后）"
        A1["高地址<br/>..."] --> A2["返回地址<br/>(call的下一行)"]
        A2 --> A3["旧 %ebp"]
        A3 --> A4["buffer[9..0]<br/>(10字节)"]
    end
    subgraph "溢出后栈"
        B1["高地址<br/>..."] --> B2["被覆盖为<br/>恶意代码地址"]
        B2 --> B3["被覆盖为<br/>任意值"]
        B3 --> B4["AAAAAAAAAA<br/>BBBBBBBB<br/>...+恶意地址"]
    end
    A4 -->|"输入超过10字节"| B4`
      },
      {
        type: "prose",
        html: "<p><strong>经典例子：</strong></p>"
      },
      {
        type: "code",
        language: "c",
        code: `// 危险代码
void echo() {
    char buf[8];  // 只有 8 字节！
    gets(buf);     // 不检查长度，可能输入 100 字节
    puts(buf);
}

// gets() 不知道 buf 只有 8 字节——它会把用户输入
// 全部写到 buf 开始的地址。超过 8 字节的部分就会
// 覆盖栈上的旧 %ebp 和返回地址。`
      },
      {
        type: "callout",
        variant: "danger",
        text: "gets() 函数是 C 语言里最危险的函数之一——它不检查缓冲区长度，完全信任输入。现代系统上调用 gets() 编译器甚至会直接报警告。永远不要用 gets()，用 fgets() 替代。"
      }
    ]
  },
  {
    id: "s12-s3",
    title: "12.2 攻击原理——覆盖返回地址",
    content: [
      {
        type: "prose",
        html: "<p><strong>攻击目标：</strong>把返回地址覆盖为一个指向攻击者控制的代码的地址。</p>"
      },
      {
        type: "card",
        title: "攻击步骤",
        body: "<div class=\"card\">\n<ol>\n<li>找到漏洞函数（使用了 gets/strcpy 等不安全函数）</li>\n<li>构造一个<strong>超长输入</strong>：填充字节 + 恶意代码地址</li>\n<li>计算 offset：填充字节需要恰好覆盖到返回地址的位置</li>\n<li>在恶意代码地址处放入<strong>shellcode</strong>（通常是 execve(\"/bin/sh\") 的机器码）</li>\n<li>当漏洞函数返回时，CPU 从栈上弹出\"返回地址\"——但已经被改成恶意代码地址</li>\n<li>CPU 跳转到恶意代码 → 攻击者获得 shell</li>\n</ol>\n</div>"
      },
      {
        type: "code",
        language: "",
        code: `【攻击者构造的输入】
[ N个'A'(填充) ][ 4字节覆盖旧ebp ][ 4字节新返回地址 ][ shellcode ]
                                                    ↑
                                    指向 shellcode 的起始地址

【如何计算 N（偏移量）】
N = 局部变量总大小 + 可能的对齐填充
例：buf[8] + 4字节对齐 = 12 → N=12 才能到达旧ebp
   再加 4 字节旧ebp 后，第 16-19 字节就是返回地址`
      },
      {
        type: "prose",
        html: "<p><strong>关键：</strong>攻击者需要精确知道栈的布局和 buffer 的地址。这就是下面要介绍的防御措施试图阻止的。</p>"
      }
    ]
  },
  {
    id: "s12-s4",
    title: "12.3 三大防御机制",
    content: [
      {
        type: "card",
        title: "1. 栈金丝雀（Stack Canary）",
        body: "<div class=\"card\">\n<p><strong>做法：</strong>在局部变量和返回地址之间放一个<strong>随机值</strong>（canary / stack guard）。函数返回前检查金丝雀是否被修改——如果变了，说明发生了溢出，立即终止程序。</p>\n<pre><code>栈帧布局（有金丝雀）：\n[局部变量][金丝雀(随机值)][旧ebp][返回地址]\n                          ↑\n                   溢出必须先覆盖金丝雀 → 被检测到！\n</code></pre>\n<p><strong>GCC 编译选项：</strong><code>-fstack-protector</code>（默认开启）</p>\n</div>"
      },
      {
        type: "card",
        title: "2. NX（No-eXecute）/ DEP（Data Execution Prevention）",
        body: "<div class=\"card\">\n<p><strong>做法：</strong>标记栈和堆为\"不可执行\"。即使攻击者把 shellcode 通过溢出写到栈上，CPU 也不会执行栈上的代码——尝试执行会触发硬件异常。</p>\n<p><strong>硬件支持：</strong>AMD 的叫 NX bit，Intel 的叫 XD bit。页表中有专门的 NX 位来控制。</p>\n</div>"
      },
      {
        type: "card",
        title: "3. ASLR（Address Space Layout Randomization）",
        body: "<div class=\"card\">\n<p><strong>做法：</strong>每次程序运行时，随机化栈、堆、共享库、代码段的起始地址。攻击者无法提前知道 buffer 或 shellcode 的确切地址——构造的返回地址大概率指向无效位置，导致程序崩溃而非执行恶意代码。</p>\n<p><strong>效果：</strong>攻击者暴力猜测正确地址的概率极低（32位系统约 1/2^16 ~ 1/2^24）。</p>\n</div>"
      },
      {
        type: "table",
        headers: [],
        rows: [
          ["防御", "阻止的是什么？", "攻击者的应对", "GCC 标志"],
          ["Stack Canary", "阻止溢出覆盖返回地址而不被发现", "泄漏金丝雀值/信息泄露", "-fstack-protector"],
          ["NX/DEP", "阻止执行栈/堆上的代码", "Return-to-libc / ROP", "-z noexecstack"],
          ["ASLR", "阻止攻击者预测内存布局", "信息泄露 + 暴力破解", "-pie -fPIE"],
        ]
      },
      {
        type: "callout",
        variant: "tip",
        text: "考试如果问\"如何防御缓冲区溢出\"，直接列这三样：Stack Canary、NX、ASLR，每样一句话解释即可拿满 3 分。"
      }
    ]
  },
  {
    id: "s12-s5",
    title: "12.4 高级攻击——绕过防御",
    content: [
      {
        type: "prose",
        html: "<p>防御不是万能的。攻击者也在进化：</p>"
      },
      {
        type: "prose",
        html: "<ul><li><strong>绕过 NX：Return-to-libc</strong>——不注入代码，而是让程序\"返回\"到已有的库函数（如 libc 中的 system()）。这些库代码在可执行区域，不受 NX 限制。</li><li><strong>绕过 Canary：信息泄露</strong>——如果程序有格式化字符串漏洞，可以读出栈上的金丝雀值，然后在溢出攻击中填入正确的值。</li><li><strong>绕过 ASLR：暴力+信息泄露+部分覆盖</strong>——64 位系统上 ASLR 非常有效，但 32 位上熵不够大，可能被暴力破解。</li></ul>"
      },
      {
        type: "prose",
        html: "<p>考试一般只考基础三防御，回路的攻防不深入要求。</p>"
      }
    ]
  },
  {
    id: "s12-s6",
    title: "12.5 考试怎么考",
    content: [
      {
        type: "prose",
        html: "<h4>典型考题</h4>"
      },
      {
        type: "prose",
        html: "<p>概念题：\"什么是缓冲区溢出？有哪些防御措施？\"或给出代码判断是否有溢出风险。</p>"
      },
      {
        type: "prose",
        html: "<h4>答题模板</h4>"
      },
      {
        type: "code",
        language: "",
        code: `【缓冲区溢出防御题】
1. 描述溢出原理：往小 buffer 写大数据 → 覆盖返回地址 → 控制程序流
2. 列三种防御：
   - Stack Canary：在返回地址前放随机值，返回前校验
   - NX/DEP：标记栈不可执行
   - ASLR：随机化内存布局
3. 对给定代码：指出不安全函数（gets/strcpy/sprintf），建议替代方案（fgets/strncpy/snprintf）`
      },
      {
        type: "callout",
        variant: "warning",
        text: "单写防御名称不给解释 = 扣分。每个防御必须一句话说明原理。比如\"NX 通过页表标志位禁止从栈执行代码\"而不是只写\"NX\"两字。"
      }
    ]
  },
  {
    id: "s12-s7",
    title: "12.7 真题演练",
    content: [
      { type: "examQuestions", ids: ["eq-s12-1", "eq-s12-2"] }
    ]
  },
  {
    id: "s12-s8",
    title: "12.8 小测验",
    content: [
      { type: "quiz", ids: ["q-s12-1", "q-s12-2"] }
    ]
  }
],
};

export default content;
