import type { ModuleContent } from "@learncourse/framework/types";

const meta = {"id":"s10","number":10,"title":"虚拟内存 VM","icon":"HardDrive","courseware":"10 虚拟内存.pptx","examRefs":"联合大题 ~25分 · 第一优先级"};

const content: ModuleContent = {
  meta,
  calloutText: "这章解决什么问题？每个程序都以为自己独占了整个内存，但实际上一台电脑上跑着几十个程序，物理内存只有 8GB。怎么让每个程序都\"以为\"自己有 4GB 可用？答案是虚拟内存——它给每个程序编了一个假地址，然后悄悄地翻译成真地址。这一章就是学这个\"翻译系统\"怎么工作。",
  sections: [
  {
    id: "s10-s1",
    title: "10.0 本章在考试中的位置",
    content: [
      {
        type: "prose",
        html: "<p style=\"color:var(--color-text-secondary);font-size:var(--text-sm)\">课件：第25-26讲 · 期末最大考点 · 与 Cache 联合出 25 分大题（TLB+页表+Cache 联合地址翻译）· 套路固定，掌握了流程就能拿大部分分</p>"
      },
      {
        type: "callout",
        variant: "tip",
        text: "核心一句话：虚拟地址 VA → TLB 查 VPN→PPN（找不到就查页表，再找不到就缺页处理）→ 拼出物理地址 PA → PA 再拆给 Cache 查数据。学完这章，把流程图背下来就成功了一半。"
      }
    ]
  },
  {
    id: "s10-s2",
    title: "10.1 先理解直觉——为什么需要虚拟内存？",
    content: [
      {
        type: "prose",
        html: "<p>想象你是一个学生，去图书馆自习。你有 3 本书要同时看，但书桌面积只够平铺 1 本书。怎么办？你把当下正看的那页摊在桌上，其他书摞在一边，不看的就还回书架（书架=硬盘）。虽然书桌面积小，但你觉得\"想看什么书都能随时拿到\"——这就是虚拟内存的核心体验。</p>"
      },
      {
        type: "prose",
        html: "<p><strong>虚拟内存的三大功能：</strong></p>"
      },
      {
        type: "prose",
        html: "<ol><li><strong>高效使用主存</strong>——DRAM 不够用，就把磁盘当\"后备仓库\"。只有程序真正用到的页才调入内存（demand paging）。</li><li><strong>简化内存管理</strong>——每个进程都有统一的地址空间布局（代码段在低地址、堆往上涨、栈往下跌、共享库在中间）。链接器只需要处理虚拟地址，不需要知道物理地址。</li><li><strong>内存保护</strong>——进程 A 不能读写进程 B 的内存。PTE 里有许可位（READ/WRITE/SUP），违例就 SIGSEGV（段错误）。</li></ol>"
      },
      {
        type: "prose",
        html: "<p><strong>物理地址 vs 虚拟地址：</strong></p>"
      },
      {
        type: "table",
        headers: [],
        rows: [
          ["", "虚拟地址 VA", "物理地址 PA"],
          ["谁看到的？", "程序（CPU 发出的）", "内存芯片（DRAM 看到的）"],
          ["谁翻译？", "MMU（内存管理单元，CPU 内部硬件）", "不需要翻译"],
          ["地址空间大小", "由 CPU 位数决定（如 32 位 → 4GB）", "由实际插了多少内存决定"],
          ["每个进程是否独立？", "是，每个进程有独立地址空间", "所有进程共享"],
        ]
      }
    ]
  },
  {
    id: "s10-s3",
    title: "10.2 核心概念——页、页表、PTE",
    content: [
      {
        type: "card",
        title: "VM 核心术语——第一组：地址与页",
        body: "<div class=\"card\">\n<table>\n<tr><th>术语</th><th>符号</th><th>含义</th></tr>\n<tr><td>虚拟地址</td><td>VA</td><td>程序看到的地址，由 MMU 翻译为物理地址。例：<code>mov eax, [0x1E9A7]</code> 中的 0x1E9A7</td></tr>\n<tr><td>物理地址</td><td>PA</td><td>实际 DRAM 上的地址。例：翻译后变成 0x8CA7 才是内存芯片看到的地址</td></tr>\n<tr><td>页/页帧</td><td>Page/Frame</td><td>VM 基本单位，通常 4KB。物理内存也切成一样大的\"帧\"</td></tr>\n</table>\n</div>"
      },
      {
        type: "card",
        title: "VM 核心术语——第二组：地址切分",
        body: "<div class=\"card\">\n<table>\n<tr><th>术语</th><th>符号</th><th>含义</th></tr>\n<tr><td>虚拟页号</td><td>VPN</td><td>VA 高位，用来索引页表。例：VA=0x1E9A7, 256B页→VPN=0x1E9</td></tr>\n<tr><td>虚拟页偏移</td><td>VPO</td><td>VA 低位，页内偏移。例：同上→VPO=0xA7</td></tr>\n<tr><td>物理页号</td><td>PPN</td><td>PA 高位，对应物理页帧。例：VPN=0x1E9 翻译得 PPN=0x8C</td></tr>\n<tr><td>物理页偏移</td><td>PPO</td><td>PA 低位，=VPO（永远不变）。例：PPO=0xA7</td></tr>\n</table>\n</div>"
      },
      {
        type: "card",
        title: "VM 核心术语——第三组：翻译设施",
        body: "<div class=\"card\">\n<table>\n<tr><th>术语</th><th>符号</th><th>含义</th></tr>\n<tr><td>页表</td><td>Page Table</td><td>VPN→PPN 映射表，每个进程一份。在内存里放着</td></tr>\n<tr><td>页表条目</td><td>PTE</td><td>页表一行：valid bit + PPN + 权限位。例：PTE[0x1E9] = {V=1, PPN=0x8C, R/W}</td></tr>\n<tr><td>TLB</td><td>Translation Lookaside Buffer</td><td>MMU 里的 PTE 硬件缓存，加速翻译。类似 Cache 缓存数据，TLB 缓存页表条目</td></tr>\n</table>\n</div>"
      },
      {
        type: "card",
        title: "地址格式——VA 和 PA 怎么切？",
        body: "<div class=\"card\">\n<p><strong>虚拟地址 VA（n 位）：</strong></p>\n<pre><code>┌──────────────────────┬──────────────────┐\n│   VPN（n-p 位）      │   VPO（p 位）    │\n└──────────────────────┴──────────────────┘</code></pre>\n<p><strong>物理地址 PA（m 位）：</strong></p>\n<pre><code>┌──────────────────────┬──────────────────┐\n│   PPN（m-p 位）      │   PPO（p 位）    │\n└──────────────────────┴──────────────────┘</code></pre>\n<p>其中 $P = 2^p$ 是页大小。$\\text{VPO} = \\text{PPO}$（翻译时页内偏移不变！）</p>\n<p><strong>例子：</strong>VA=20位, PA=16位, 页大小=256字节=2^8<br/>→ p=8, VPN=12位, VPO=8位, PPN=8位, PPO=8位</p>\n</div>"
      },
      {
        type: "prose",
        html: "<p><strong>PTE 的结构：</strong>一个 PTE 通常 4 或 8 字节，包含：</p><ul><li><strong>Valid bit（1位）：</strong>=1 表示该页在物理内存中，=0 表示页在磁盘上或未分配</li><li><strong>PPN（若干位）：</strong>如果 valid=1，这是物理页号；如果 valid=0，这个字段可能存放磁盘地址</li><li><strong>权限位：</strong>READ / WRITE / SUP（是否内核模式才能访问）</li></ul>"
      },
      {
        type: "callout",
        variant: "warning",
        text: "常见错误：把 VA 的位宽和 PA 的位宽搞混。VA 有 n 位（如 20位），PA 有 m 位（如 16位）。拆分时：VA 的 VPO 位数 = PA 的 PPO 位数 = log2(页大小)。VPO=PPO 这一点是永恒的。"
      }
    ]
  },
  {
    id: "s10-s4",
    title: "10.3 地址翻译全流程——考试必画图",
    content: [
      {
        type: "prose",
        html: "<p><strong>这是整个 Computer System 课程最重要的一张图，期末 25 分大题就是走这个过程。必须能默画。</strong></p>"
      },
      {
        type: "mermaid",
        id: "s10-addr-trans",
        chart: `flowchart TD
    CPU["CPU 发出 VA"] --> SPLIT["VA = VPN | VPO"]
    SPLIT --> TLBI["用 VPN 低位 = TLBI<br/>索引 TLB 组"]
    TLBI --> TLBLOOK["读出该组所有 TLB 条目"]
    TLBLOOK --> TLBCMP{"TLBT(剩余VPN高位)<br/>== 任一条目的Tag<br/>且 Valid == 1 ?"}
    TLBCMP -->|"是 → TLB Hit ✓"| PPNGET["读出该条目的 PPN"]
    TLBCMP -->|"否 → TLB Miss"| PTACCESS["访问页表（在内存）"]
    PTACCESS --> PTE{"查 PTE[VPN]"}
    PTE -->|"Valid=1"| PPNPAGE["读出 PPN<br/>更新 TLB"]
    PTE -->|"Valid=0"| PF["缺页异常<br/>从磁盘调页<br/>更新PTE<br/>重试指令"]
    PF --> PTACCESS
    PPNGET --> PA["PA = PPN | VPO(PPO)"]
    PPNPAGE --> PA
    PA --> CACHE{"送到 Cache<br/>（PA 拆 CT|CI|CO）"}
    CACHE -->|"Hit"| RESULT["返回数据给 CPU ✓"]
    CACHE -->|"Miss"| MEM["访问主存<br/>装入 Cache"]
    MEM --> RESULT`
      },
      {
        type: "prose",
        html: "<p><strong>流程文字版（考试写步骤用）：</strong></p><ol><li>CPU 发出虚拟地址 VA = {VPN, VPO}</li><li>用 VPO 的若干低位作为 TLBI，查 TLB 对应组</li><li><strong>TLB Hit：</strong>直接得到 PPN</li><li><strong>TLB Miss：</strong>去内存查页表 PTE[VPN]，得到 PPN（如果 PTE.Valid=0 则发生 Page Fault，从磁盘调入页后再重试）</li><li>拼出物理地址 PA = {PPN, PPO}，其中 PPO = VPO</li><li>以 PA 访问 L1 Cache（把 PA 拆成 CT | CI | CO）</li><li>Cache Hit → 返回数据；Cache Miss → 访问主存 → 装入 Cache → 返回数据</li></ol>"
      },
      {
        type: "callout",
        variant: "tip",
        text: "死记硬背也要记住：VPO = PPO。翻译只改变页号，页内偏移不变。这让你在计算 PA 时可以省一步。"
      },
      {
        type: "callout",
        variant: "warning",
        text: "考试踩坑点：VA 的 VPO 低几位可能用作 TLBI（因为 TLB 也是按组索引的），但剩下的才是真正的\"页内偏移\"。比如 20位VA, 256B页→VPO=8位, TLB有4组→TLBI=2位（来自VPO的低2位）。这些位既用于 TLB 索引，也是 VPO 的一部分——不要搞混。"
      }
    ]
  },
  {
    id: "s10-s5",
    title: "10.4 TLB——地址翻译的\"Cache\"",
    content: [
      {
        type: "prose",
        html: "<p><strong>TLB（Translation Lookaside Buffer）就是专门缓存 PTE 的小型 Cache。</strong>因为每次访存都要先翻译地址，如果不缓存 PTE，每次访存都要额外访问一次页表（在内存里）——太慢了。</p>"
      },
      {
        type: "card",
        title: "TLB 的结构",
        body: "<div class=\"card\">\n<p>TLB 本质上是一个<strong>全相联或组相联的小 Cache。</strong></p>\n<p><strong>TLB 条目：</strong>VPN Tag | PPN | Valid bit | 其他标志</p>\n<p><strong>查找方式：</strong></p>\n<ol>\n<li>从 VA 中提取 TLBI（组索引）和 TLBT（Tag）</li>\n<li>用 TLBI 定位到 TLB 的某一组</li>\n<li>该组中逐条比较 TLBT 和 Tag，且 Valid=1</li>\n<li>匹配成功 = TLB Hit → 直接得到 PPN</li>\n<li>匹配失败 = TLB Miss → 查页表，更新 TLB</li>\n</ol>\n<p><strong>TLBI 和 TLBT 怎么从 VA 提取？</strong></p>\n<p>TLBI 来自 VPN 的低位（因为 TLB 用组索引），TLBT 来自 VPN 的高位剩余部分。</p>\n<p>例：VA 20位, 页大小256B→VPN=12位, TLB 4组 4路→TLBI=2位, TLBT=10位</p>\n</div>"
      }
    ]
  },
  {
    id: "s10-s6",
    title: "10.5 多级页表——解决页表过大的问题",
    content: [
      {
        type: "prose",
        html: "<p><strong>问题：</strong>假设 48 位虚拟地址空间，4KB 页，每 PTE 8 字节。需要多少个 PTE？</p><p>$\\text{总页数} = 2^{48} / 2^{12} = 2^{36}$ 个页。$\\text{单级页表大小} = 2^{36} \\times 8\\text{B} = 512\\text{GB}$！这比整个物理内存还大，根本存不下。</p>"
      },
      {
        type: "card",
        title: "多级页表方案——只存\"在用\"的部分",
        body: "<div class=\"card\">\n<p><strong>核心思想：</strong>把大页表分成多级树状结构，只把程序实际使用的那些分支放在内存里。</p>\n<p><strong>Core i7 四级页表示例：</strong></p>\n<pre><code>VA = [VPN1(9位) | VPN2(9位) | VPN3(9位) | VPN4(9位) | VPO(12位)]\n         ↓            ↓            ↓            ↓\n      L1 PT → L1 PTE → 指向L2 PT的基址\n                   L2 PT → L2 PTE → 指向L3 PT的基址\n                              L3 PT → L3 PTE → 指向L4 PT的基址\n                                         L4 PT → L4 PTE → PPN!\n</code></pre>\n<p>每一级：用对应的 VPN 段做索引，查本级页表得到下一级的基址。最后一级给出 PPN。</p>\n<p><strong>优点：</strong>如果 VPN1 对应的 L2 页表完全没被用到，那整个 L2 页表都不用分配——节省了海量内存。</p>\n</div>"
      },
      {
        type: "callout",
        variant: "tip",
        text: "考试中多级页表一般考概念或简单计算。不会让你真实地走一遍四级页表翻译——那太复杂了。重点是理解\"为什么需要多级\"（单级太大）和\"多级怎么节省内存\"（只分配活跃子表）。"
      }
    ]
  },
  {
    id: "s10-s7",
    title: "10.6 缺页异常（Page Fault）& 写时拷贝（COW）",
    content: [
      {
        type: "card",
        title: "Page Fault 处理六步",
        body: "<div class=\"card\">\n<ol>\n<li>MMU 发现 PTE.Valid = 0 → 触发 <strong>Page Fault 异常（#14）</strong></li>\n<li>CPU 切换到内核态，执行 Page Fault Handler</li>\n<li>选择一个 <strong>victim 页</strong>（被踢出的页），如果它的 dirty bit=1，先写回磁盘</li>\n<li>从磁盘把需要的页<strong>读入</strong>刚才腾出的物理页帧</li>\n<li><strong>更新页表</strong> PTE：Valid=1，填入新的 PPN</li>\n<li><strong>返回</strong>原进程，重新执行那条触发缺页的指令（这次 PTE.Valid=1，翻译成功）</li>\n</ol>\n</div>"
      },
      {
        type: "card",
        title: "Copy-on-Write（写时拷贝）——fork() 的优化",
        body: "<div class=\"card\">\n<p><strong>场景：</strong>父进程调用 fork() 创建子进程。如果老老实实把父进程的所有页都拷贝一份给子进程——太慢了，而且很多页可能根本不会被修改。</p>\n<p><strong>COW 做法：</strong></p>\n<ol>\n<li>fork() 后，父子进程<strong>共享同一份物理页</strong></li>\n<li>所有共享页的 PTE 都标记为<strong>只读</strong></li>\n<li>当任一进程尝试<strong>写入</strong>这些页 → 触发保护故障</li>\n<li>内核<strong>创建该页的私有副本</strong>，修改 PTE 指向新副本，标记为 R/W</li>\n<li>写操作继续——两个进程各自拥有独立副本</li>\n</ol>\n<p><strong>核心思想：</strong>复制尽可能延后，不做无用功。充分利用稀有物理内存。</p>\n</div>"
      },
      {
        type: "table",
        headers: [],
        rows: [
          ["故障类型", "原因", "能否恢复？", "结果"],
          ["正常缺页", "PTE.Valid=0，页在磁盘", "能", "调入页后重试成功"],
          ["地址越界", "VA 超过进程地址空间", "不能", "SIGSEGV，进程终止"],
          ["访问越级", "用户态访问内核页", "不能", "SIGSEGV，进程终止"],
          ["访问越权", "写只读段（如 .text）", "不能", "SIGSEGV，进程终止"],
        ]
      }
    ]
  },
  {
    id: "s10-s8",
    title: "10.7 动手试试——联合翻译大题完整演练",
    content: [
      {
        type: "prose",
        html: "<p><strong>这是 2025 期末真题题型（25 分），2024 同款（25 分）。</strong>下面我们完整地走一遍考试会出现的题型。</p>"
      },
      {
        type: "card",
        title: "真题题型：第一步——算基本参数",
        body: "<div class=\"card\">\n<p><strong>给定条件（2025 真题）：</strong></p>\n<ul>\n<li>虚拟地址 20 位宽</li>\n<li>物理地址 16 位宽</li>\n<li>页大小 256 字节</li>\n<li>TLB 有 4 组，4 路组相联</li>\n<li>Cache 有 32 行，2 路组相联，每行 4 字节</li>\n</ul>\n<p><strong>第一步：求各字段位宽</strong></p>\n<p>$P = 256 = 2^8 \\Rightarrow$ VPO = 8 位, PPO = 8 位</p>\n<p>VPN = 20 - 8 = 12 位 | PPN = 16 - 8 = 8 位</p>\n<p>TLB：4 组 → TLBI = 2 位（VPN 的低 2 位）| TLBT = 12 - 2 = 10 位</p>\n<p>Cache：B = 4 → CO = 2 位 | S = 32/2 = 16 组 → CI = 4 位 | CT = 16 - 4 - 2 = 10 位</p>\n<p><strong>这是在考试空白处先写下的第一件事。后面全靠这些位宽做计算。</strong></p>\n</div>"
      },
      {
        type: "card",
        title: "真题题型：第二步——给定 VA=0x1E9A7，走全程",
        body: "<div class=\"card\">\n<p><strong>VA = 0x1E9A7（20位）</strong></p>\n<p><strong>先转二进制：</strong></p>\n<p>0x1E9A7 = 0001 1110 1001 1010 0111</p>\n<p><strong>分解 VA：</strong></p>\n<p>VPO = 低8位 = 1010 0111 = 0xA7</p>\n<p>VPN = 高12位 = 0001 1110 1001 = 0x1E9</p>\n<p>TLBI = VPN 低2位 = 01 = 0x1</p>\n<p>TLBT = VPN 高10位 = 00 0111 1010 = 0x07A</p>\n<p><strong>查 TLB（组1）：</strong></p>\n<p>TLB组1 中有条目 Tag=0x07A, PPN=0x8C, Valid=1 → <strong>TLB Hit ✓</strong></p>\n<p>PPN = 0x8C</p>\n<p><strong>拼 PA：</strong></p>\n<p>PA = PPN | PPO = 0x8C | 0xA7 = 1000 1100 1010 0111 = 0x8CA7</p>\n<p><strong>分解 PA 给 Cache：</strong></p>\n<p>CO = PA低2位 = 11 = 0x3</p>\n<p>CI = PA[5:2] = 1001 = 0x9</p>\n<p>CT = PA高10位 = 10 0011 0010 = 0x232</p>\n<p><strong>查 Cache 组 0x9（2路）：</strong></p>\n<p>路1: Tag=0x232, Valid=0 → 不匹配</p>\n<p>另一路也有对应条目但需要查表 → 对应路Valid可能也为0 → <strong>Cache Miss ✗</strong></p>\n<p>返回\"N/A\"（题目要求 Cache miss 时填 N/A）</p>\n</div>"
      },
      {
        type: "card",
        title: "真题题型：第三步——第二个 VA=0x1C7C3",
        body: "<div class=\"card\">\n<p><strong>VA = 0x1C7C3（20位）</strong></p>\n<p><strong>转二进制：</strong></p>\n<p>0x1C7C3 = 0001 1100 0111 1100 0011</p>\n<p><strong>分解 VA：</strong></p>\n<p>VPO = 低8位 = 1100 0011 = 0xC3</p>\n<p>VPN = 高12位 = 0001 1100 0111 = 0x1C7</p>\n<p>TLBI = VPN低2位 = 11 = 0x3</p>\n<p>TLBT = VPN高10位 = 00 0111 0001 = 0x071</p>\n<p><strong>查 TLB（组3）：</strong></p>\n<p>TLB组3 中：Tag=0x071 的条目？题目TLB表组3为 Tag=0x1F5, 0x2D4, 0x3B7, 0x4B5，无 0x071 → <strong>TLB Miss</strong></p>\n<p><strong>查页表：</strong></p>\n<p>PTE[VPN=0x1C7] → 页表中 Tag=0x1C7, PPN=0x4E, Valid=1 → 得到 PPN=0x4E</p>\n<p>无缺页。</p>\n<p><strong>拼 PA：</strong></p>\n<p>PA = PPN | PPO = 0x4E | 0xC3 = 0100 1110 1100 0011 = 0x4EC3</p>\n<p><strong>分解 PA 给 Cache：</strong></p>\n<p>CO = PA低2位 = 11 = 0x3</p>\n<p>CI = PA[5:2] = 0000 = 0x0</p>\n<p>CT = PA高10位 = 01 0011 1011 = 0x13B</p>\n<p><strong>查 Cache 组 0x0（2路）：</strong></p>\n<p>路1: Tag=0x13B, Valid=1 → <strong>Cache Hit ✓</strong></p>\n<p>从该行取 CO=0x3 位置的字节 → 第4个字节 = 0x44</p>\n<p><strong>返回高速缓存字节值：0x44</strong></p>\n</div>"
      },
      {
        type: "prose",
        html: "<p><strong>练习步骤总结——考试时按这个顺序写：</strong></p><ol><li>先算所有字段的位宽（VPO/VPN/PPO/PPN/TLBI/TLBT/CO/CI/CT）→ 写在草稿上</li><li>VA → 二进制 → 切开 VPN/VPO</li><li>从 VPN 提取 TLBI/TLBT → 查 TLB</li><li>TLB Miss 时查页表（注意缺页判断）</li><li>拼 PA = PPN | VPO</li><li>PA → 二进制 → 切开 CT/CI/CO → 查 Cache</li><li>Cache Hit → 返回数据；Miss → 填 N/A</li></ol>"
      }
    ]
  },
  {
    id: "s10-s9",
    title: "10.8 考试怎么考",
    content: [
      {
        type: "prose",
        html: "<h4>题型与分值</h4>"
      },
      {
        type: "table",
        headers: [],
        rows: [
          ["题型", "分值", "考查内容"],
          ["基本参数计算", "4~5 分", "给 VA/PA 位宽和页大小，求各字段位宽"],
          ["联合翻译大题（第一部分）", "~10 分", "给 VA, TLB, 页表 → 判 TLB hit/miss, 缺页, 求 PPN/PA"],
          ["联合翻译大题（第二部分）", "~10 分", "PA 拆给 Cache → 判 Cache hit/miss, 返回字节值"],
        ]
      },
      {
        type: "prose",
        html: "<h4>得分点</h4>"
      },
      {
        type: "prose",
        html: "<ul><li><strong>位宽计算全对 = 送分项：</strong>VPO=log2(页大小) 这个永不变，其他位宽从总宽度减出来。</li><li><strong>六进制转换要熟练：</strong>VA 转二进制、切段、查表、再拼回十六进制——每一步都可能在中间扣分。建议每一步都写二进制，减少出错。</li><li><strong>表格查对要仔细：</strong>TLB/页表/Cache 表都有 Valid bit，先检查 Valid=1 再看 Tag 匹不匹配。很多人忘了 Valid bit。</li></ul>"
      },
      {
        type: "prose",
        html: "<h4>常见错误</h4>"
      },
      {
        type: "callout",
        variant: "danger",
        text: "致命错误：忘记检查 Valid bit。PTE 的 valid=0 不代表\"没映射\"就跳过——它是缺页！要填\"是\"缺页，且 PPN 填 N/A。Cache 的 valid=0 代表该行是空的——视为 Miss。"
      },
      {
        type: "callout",
        variant: "warning",
        text: "位宽错误：TLBI 和 TLBT 是从 VPN 里分的（不是从完整的 VA），Cache 的 CT/CI/CO 是从 PA 里分的（不是从 VA）。两套拆分独立，不要混。"
      }
    ]
  },
  {
    id: "s10-s10",
    title: "10.10 真题演练",
    content: [
      { type: "examQuestions", ids: ["eq-s10-1", "eq-s10-2"] }
    ]
  },
  {
    id: "s10-s11",
    title: "10.11 小测验",
    content: [
      { type: "quiz", ids: ["q-s10-1", "q-s10-2"] }
    ]
  }
],
};

export default content;
