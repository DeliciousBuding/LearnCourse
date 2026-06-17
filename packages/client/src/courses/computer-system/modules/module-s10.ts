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
,
    {
      "id": "s10-s-trace",
      "title": "地址翻译全链路实战",
      "subtitle": "从一个虚拟地址的旅程看透整个存储体系",
      "content": [
        {
          "type": "prose",
          "html": "<p>## 从一个地址的旅程开始<br><br>你在淘宝下单，收货地址填的是「湖南省长沙市岳麓区麓山南路 208 号」（**虚拟地址 VA**）。快递公司不会拿着这个地址直接去找仓库——它先查自己的**配送站速查表（TLB）**：「麓山南路这片最近送过没有？」如果查到了，直接就知道对应的仓库编号。<br><br>如果 TLB 里没有，就得去翻**全国地址库（页表）**——这是个巨大的表，查起来慢，但什么地址都能查到。找到对应的实际仓库位置（**物理地址 PA**）后，顺手记到配送站速查表里（**TLB 更新**），下次就快了。<br><br>万一全国地址库里也查不到——说明这个地址对应的仓库压根没货（**缺页异常**），那就得从总仓（**磁盘**）调货了。<br><br>找到仓库（物理地址）后，快递员去仓库取货——但他不是翻遍整个仓库，而是直奔特定货架（**Cache 组**），看标签是不是自己要的货（**Cache 标记比对**），拿到了就送出去（**数据返回**）。<br><br>**这个比喻对应关系**：<br>- 收货地址 = 虚拟地址 VA<br>- 配送站速查表 = TLB（快，容量小）<br>- 全国地址库 = 页表（慢，容量大）<br>- 仓库编号 = 物理地址 PA<br>- 货架 = Cache<br>- 总仓 = 磁盘<br><br>这就是地址翻译的**全链路**。下面我们把它拆开，一步一步走。先看全景，再看零件——这是理解虚拟内存最有效的方式。</p>"
        },
        {
          "type": "card",
          "body": "<div class=\"card\">\n<p>```</p>\n<p>虚拟地址 VA (20 bits 示例)</p>\n<p>┌──────────┬──────────┐</p>\n<p>│  VPN     │   VPO    │</p>\n<p>│ VA[19:8] │ VA[7:0]  │</p>\n<p>└────┬─────┴────┬─────┘</p>\n<p>│          │</p>\n<p>┌───────────┘          │</p>\n<p>▼                      │</p>\n<p>┌─────────────┐               │</p>\n<p>│  TLB 查询    │               │</p>\n<p>│ TLBI=VPN低位 │               │</p>\n<p>│ TLBT=VPN高位 │               │</p>\n<p>└──────┬──────┘               │</p>\n<p>│                      │</p>\n<p>┌────┴────┐                 │</p>\n<p>▼         ▼                 │</p>\n<p>┌─────┐  ┌──────┐              │</p>\n<p>│命中!│  │未命中!│              │</p>\n<p>└──┬──┘  └──┬───┘              │</p>\n<p>│        ▼                  │</p>\n<p>│   ┌──────────┐            │</p>\n<p>│   │ 查页表    │            │</p>\n<p>│   └────┬─────┘            │</p>\n<p>│        │                  │</p>\n<p>│   ┌────┴────┐             │</p>\n<p>│   ▼         ▼             │</p>\n<p>│ ┌────┐  ┌──────┐          │</p>\n<p>│ │V=1 │  │V=0   │          │</p>\n<p>│ │得PPN│  │缺页! │          │</p>\n<p>│ │→TLB │  │→磁盘 │          │</p>\n<p>│ └──┬─┘  └──────┘          │</p>\n<p>│    │                      │</p>\n<p>└────┼──────────────────────┘</p>\n<p>▼</p>\n<p>┌─────────┐</p>\n<p>│  PPN    │ ◄── 来自 TLB 或页表</p>\n<p>└────┬────┘</p>\n<p>│</p>\n<p>▼</p>\n<p>┌────────────────────┐</p>\n<p>│ 物理地址 PA (16-bit) │</p>\n<p>│ PPN ∥ PPO           │ ◄── PPO = VPO 不变！</p>\n<p>└────────┬───────────┘</p>\n<p>│</p>\n<p>┌────────┼────────┐</p>\n<p>▼        ▼        ▼</p>\n<p>┌────┐ ┌─────┐ ┌──────┐</p>\n<p>│ CO │ │ CI  │ │  CT  │</p>\n<p>│偏移│ │组号 │ │ 标记 │</p>\n<p>└────┘ └──┬──┘ └──┬───┘</p>\n<p>│       │</p>\n<p>▼       ▼</p>\n<p>┌────────────────┐</p>\n<p>│  Cache 查询     │</p>\n<p>│ CI→选组        │</p>\n<p>│ CT→比标记+Valid │</p>\n<p>└───────┬────────┘</p>\n<p>│</p>\n<p>┌────┴────┐</p>\n<p>▼         ▼</p>\n<p>┌─────┐  ┌──────┐</p>\n<p>│命中!│  │未命中!│</p>\n<p>│得数据│  │访主存 │</p>\n<p>└─────┘  │→Cache│</p>\n<p>└──────┘</p>\n<p>```</p>\n<p>**核心路径四阶段**：</p>\n<p>1. **拆分 VA** → VPN（虚拟页号）+ VPO（页内偏移）</p>\n<p>2. **VPN → PPN** → TLB 快查（命中则出 PPN）→ 未命中则查页表 → 页表项 valid=0 则缺页</p>\n<p>3. **拼接 PA** → PPN ∥ PPO（PPO = VPO，直接复制，不经任何翻译！）</p>\n<p>4. **PA → 数据** → Cache 快查（CT 匹配则命中）→ 未命中则访主存并加载到 Cache</p>\n</div>"
        },
        {
          "type": "card",
          "body": "<div class=\"card\">\n<p>### 口诀一：「VPO = PPO 永远不变」</p>\n<p>页内偏移不参与任何翻译过程。虚拟地址的低位直接复制为物理地址的低位。</p>\n<p>- VPO 的位数 = PPO 的位数 = log₂(页大小)</p>\n<p>- 翻译只改变高位（VPN → PPN），低位纹丝不动</p>\n<p>- 这是「页式管理」最核心的性质：页大小 = 帧大小，页内偏移在两个空间含义完全一致</p>\n<p>### 口诀二：「虚拟看世界，物理看现实」</p>\n<p>- CPU 眼中只有虚拟地址——每个进程以为整个地址空间都是自己的</p>\n<p>- MMU+Cache+内存控制器把虚拟地址翻译为物理地址——这才是芯片引脚上真实的地址</p>\n<p>- 虚拟地址空间可以远大于物理内存（靠磁盘 swap），这就是虚拟内存的魔力</p>\n<p>### 口诀三：「TLB 查 VPN 低位，Cache 查 PA 中间位」</p>\n<p>- TLB 用 VPN 的**低位**做组索引（TLBI = VPN[k-1:0]）</p>\n<p>- Cache 用物理地址的**中间位**做组索引（CI = PA[s+b-1:b]）</p>\n<p>- 两者索引来源完全不同：一个来自 VPN（翻译前），一个来自 PA（翻译后）</p>\n<p>- **这是考试最爱挖坑的地方！**</p>\n</div>"
        },
        {
          "type": "code",
          "language": "text",
          "code": "给定配置（仿 2025 期末真题，参数简化）：\n  虚拟地址 VA = 20 bit\n  物理地址 PA = 16 bit\n  页面大小 = 256 B\n  TLB：4 组，4 路组相联（共 16 项）\n  Cache：共 32 行，2 路组相联，每块 4 B\n\n═══════════════════════════════════════\n第一步：计算所有位宽和位区间\n═══════════════════════════════════════\n\n① Cache 块偏移 b\n  块大小 = 4 B → b = log₂(4) = 2\n  CO (Cache Offset) = PA[1:0]，占 2 bit\n  解释：4 字节的块有 4 个位置(0,1,2,3)，需要 2 bit 区分\n\n② 页偏移\n  页大小 = 256 B = 2⁸ → 页偏移 = log₂(256) = 8 bit\n  VPO (Virtual Page Offset) = VA[7:0]，占 8 bit\n  PPO (Physical Page Offset) = PA[7:0]，占 8 bit\n  ★ VPO = PPO，永远相等！页内偏移不参与任何翻译\n\n③ VPN 和 PPN 的宽度\n  VPN = VA[19:8] → 20 - 8 = 12 bit\n  PPN = PA[15:8] → 16 - 8 = 8 bit\n  ★ 注意：VPN(12bit) > PPN(8bit)，虚拟页号空间可以大于物理页号空间\n\n④ TLB 分解\n  TLB 共 4 组 → 组索引位 = log₂(4) = 2\n  TLBI (TLB Index) = VPN[1:0]，占 2 bit（取 VPN 的低 2 位）\n  TLBT (TLB Tag)  = VPN[11:2]，占 10 bit（VPN 剩余高位）\n  解释：TLB 本质是 VPN→PPN 的快速缓存，组选择用 VPN 低位\n        是为了让空间局部性好的连续虚拟页分散到不同组\n\n⑤ Cache 分解\n  Cache 共 32 行，2 路 → 组数 = 32 ÷ 2 = 16 组\n  组索引位 s = log₂(16) = 4\n  CI (Cache Index) = PA[5:2]，占 4 bit  ← 注意起点是 b=2！\n  CT (Cache Tag)   = PA[15:6]，占 10 bit\n  ★ 验证：CO(2) + CI(4) + CT(10) = 16 bit = PA 宽度 ✓\n\n═══════════════════════════════════════\n第二步：汇总位区间表\n═══════════════════════════════════════\n\n  字段  | 位区间        | 宽度  | 来源\n  ──────┼───────────────┼───────┼──────\n  VPO   | VA[7:0]      | 8 bit | 虚拟地址低 8 位\n  VPN   | VA[19:8]     | 12 bit| 虚拟地址高 12 位\n  TLBI  | VPN[1:0]     | 2 bit | VPN 低 2 位\n  TLBT  | VPN[11:2]    | 10 bit| VPN 高 10 位\n  PPO   | PA[7:0]      | 8 bit | = VPO，不变\n  PPN   | PA[15:8]     | 8 bit | 来自 TLB/页表\n  CO    | PA[1:0]      | 2 bit | PA 最低 2 位\n  CI    | PA[5:2]      | 4 bit | PA 中间 4 位\n  CT    | PA[15:6]     | 10 bit| PA 高 10 位\n\n═══════════════════════════════════════\n第三步：全链路追踪实例 VA = 0x28C40\n═══════════════════════════════════════\n\n  VA = 0x28C40\n  二进制 = 0010 1000 1100 0100 0000\n\n  [拆分]  VPO = VA[7:0]  = 0100 0000 = 0x40\n          VPN = VA[19:8] = 0010 1000 1100 = 0x28C\n\n  [TLB]   TLBI = VPN[1:0]  = 0x28C & 0x3 = 0 → 查 Set 0\n          TLBT = VPN[11:2] = 0x28C >> 2 = 0x0A3\n          Set 0 Way 0: V=1, Tag=0x0A3 ✓ 命中！→ PPN = 0x12\n\n  [拼PA]  PA = PPN ∥ PPO = 0x12 ∥ 0x40 = 0x1240\n          二进制 = 0001 0010 0100 0000\n\n  [Cache] CO = PA[1:0]  = 00 → 块内第 0 字节\n          CI = PA[5:2]   = 0000 → 查 Cache Set 0x0\n          CT = PA[15:6]  = 0001 0010 01 = 0x049\n          Set 0 Way 0: V=1, Tag=0x049 ✓ 命中！\n          Block[0] = 0xAB → 数据 = 0xAB\n\n  ✅ 完成：0x28C40(V) → 0x1240(P) → 0xAB(数据)\n\n═══════════════════════════════════════\n第四步：容易算错的陷阱\n═══════════════════════════════════════\n\nQ: 为什么 CI 的起点是 b 而不是 0？\nA: Cache 块内偏移不参与组选择。块偏移 CO 占低 b 位，组索引 CI\n   从第 b 位开始取 s 位。所以 CI = PA[s+b-1 : b]，不是 PA[s-1 : 0]！\n\nQ: TLB 的 TLBI 取 VPN 的低位，为什么不取 VPN 的\"中间位\"？\nA: TLB 是 VPN→PPN 的映射缓存，连续虚拟页应该分散到不同 TLB 组\n   以减少冲突。取 VPN 低位（类似 Cache 取地址中间位）是最自然的做法。\n\nQ: 缺页（valid=0）时应该怎么办？\nA: 停止翻译，触发缺页异常。不要继续拼 PA、不要查 Cache。\n   PPN 此时无效，写 \"N/A\" 或 \"缺页\"。"
        },
        {
          "type": "details",
          "summary": "练习 1：参数位区间计算（仿 2025 真题结构）",
          "body": "<details>\n<div class=\"details-body\">\n### 题目<br><br>某计算机系统配置如下：<br>- 虚拟地址 VA = 32 bit，物理地址 PA = 28 bit<br>- 页面大小 = 4 KB<br>- TLB：共 16 项，4 路组相联<br>- Cache：总容量 64 KB，4 路组相联，每块 64 B<br><br>请计算以下字段的位宽和位区间：<br>1. VPO 和 PPO<br>2. VPN 和 PPN<br>3. TLBI 和 TLBT<br>4. CO、CI 和 CT<br><br>---<br><br>### 答案与推导<br><br>**(1) VPO 和 PPO**<br><br>页大小 = 4 KB = 4096 B = 2¹² B → 页偏移 = log₂(2¹²) = 12 bit<br><br>VPO = VA[11:0]，宽度 12 bit<br>PPO = PA[11:0]，宽度 12 bit<br><br>★ VPO = PPO<br><br>**(2) VPN 和 PPN**<br><br>VPN = VA[31:12]，宽度 = 32 − 12 = 20 bit<br>PPN = PA[27:12]，宽度 = 28 − 12 = 16 bit<br><br>**(3) TLBI 和 TLBT**<br><br>TLB 共 16 项，4 路 → 组数 = 16 ÷ 4 = 4 组<br>组索引位 = log₂(4) = 2 bit<br><br>TLBI = VPN[1:0]，宽度 2 bit<br>TLBT = VPN[19:2]，宽度 = 20 − 2 = 18 bit<br><br>**(4) CO、CI 和 CT**<br><br>块大小 = 64 B → b = log₂(64) = 6 bit<br>CO = PA[5:0]，宽度 6 bit<br><br>Cache 总容量 64 KB，4 路<br>→ 每路容量 = 64 KB ÷ 4 = 16 KB<br>→ 每路块数 = 16 KB ÷ 64 B = 16384 ÷ 64 = 256 块<br>→ 组数 = 256<br>→ s = log₂(256) = 8 bit<br><br>CI = PA[6+8−1 : 6] = PA[13:6]，宽度 8 bit<br>CT = PA[27:14]，宽度 = 28 − 6 − 8 = 14 bit<br><br>验证：CO(6) + CI(8) + CT(14) = 28 bit = PA 宽度 ✓<br><br>### 汇总表<br><br>| 字段 | 位区间     | 宽度 |<br>|------|------------|------|<br>| VPO  | VA[11:0]   | 12   |<br>| VPN  | VA[31:12]  | 20   |<br>| TLBI | VPN[1:0]   | 2    |<br>| TLBT | VPN[19:2]  | 18   |<br>| PPO  | PA[11:0]   | 12   |<br>| PPN  | PA[27:12]  | 16   |<br>| CO   | PA[5:0]    | 6    |<br>| CI   | PA[13:6]   | 8    |<br>| CT   | PA[27:14]  | 14   |<br><br>**关键提醒**：<br>- CI 的起点是 b=6，不是 0！CI 从 PA[6] 开始取 8 位到 PA[13]<br>- VPN(20bit) > PPN(16bit) 说明虚拟地址空间可大于物理地址空间\n</div>\n</details>"
        },
        {
          "type": "details",
          "summary": "练习 2：完整地址翻译（TLB + 页表 + Cache 联合追踪）",
          "body": "<details>\n<div class=\"details-body\">\n### 题目<br><br>使用第三步的配置（VA 20bit, PA 16bit, 页 256B, TLB 4组4路, Cache 32行2路4B块），给定以下状态表，翻译两个虚拟地址。<br><br>---<br><br>### TLB 状态（4 组 × 4 路）<br><br>**Set 0:**<br>| Way | Valid | Tag    | PPN |<br>|-----|-------|--------|-----|<br>| 0   | 1     | 0x0A3  | 0x12 |<br>| 1   | 1     | 0x1F2  | 0x3A |<br>| 2   | 0     | 0x0B1  | —   |<br>| 3   | 1     | 0x2C4  | 0x1F |<br><br>**Set 1:**<br>| Way | Valid | Tag    | PPN |<br>|-----|-------|--------|-----|<br>| 0   | 1     | 0x0D5  | 0x2B |<br>| 1   | 0     | 0x1A8  | —   |<br>| 2   | 1     | 0x322  | 0x0C |<br>| 3   | 1     | 0x18F  | 0x4E |<br><br>**Set 2:**<br>| Way | Valid | Tag    | PPN |<br>|-----|-------|--------|-----|<br>| 0   | 1     | 0x1F3  | 0x41 |<br>| 1   | 1     | 0x094  | 0x35 |<br>| 2   | 0     | 0x2E7  | —   |<br>| 3   | 1     | 0x14B  | 0x59 |<br><br>**Set 3:**<br>| Way | Valid | Tag    | PPN |<br>|-----|-------|--------|-----|<br>| 0   | 0     | 0x0A8  | —   |<br>| 1   | 1     | 0x1C3  | 0x6B |<br>| 2   | 1     | 0x05F  | 0x3D |<br>| 3   | 1     | 0x188  | 0x27 |<br><br>---<br><br>### 页表（部分）<br><br>| VPN    | Valid | PPN |<br>|--------|-------|-----|<br>| 0x17F  | 1     | 0x3D |<br>| 0x1B3  | 1     | 0x2E |<br>| 0x252  | 1     | 0x35 |<br>| 0x28C  | 1     | 0x12 |<br>| 0x355  | 1     | 0x2B |<br>| 0x3A1  | 0     | —   |<br>| 0x52E  | 1     | 0x59 |<br>| 0x623  | 1     | 0x27 |<br>| 0x70F  | 1     | 0x6B |<br>| 0x7C8  | 1     | 0x3A |<br>| 0xB10  | 1     | 0x1F |<br>| 0xC89  | 1     | 0x0C |<br><br>---<br><br>### Cache 状态（部分，仅列出会访问的 Set）<br><br>**Set 0 (CI=0x0)：每块 4 B**<br>| Way | Valid | Tag    | [0]  | [1]  | [2]  | [3]  |<br>|-----|-------|--------|------|------|------|------|<br>| 0   | 1     | 0x049  | 0xAB | 0x12 | 0xCD | 0x34 |<br>| 1   | 1     | 0x052  | 0x56 | 0x78 | 0x9A | 0xBC |<br><br>**Set 10 (CI=0xA)：**<br>| Way | Valid | Tag    | [0]  | [1]  | [2]  | [3]  |<br>|-----|-------|--------|------|------|------|------|<br>| 0   | 1     | 0x114  | 0xEF | 0x01 | 0x23 | 0x45 |<br>| 1   | 0     | —      | —    | —    | —    | —    |<br><br>---<br><br>### 请翻译以下两个虚拟地址<br><br>**(A) VA = 0x28C40**  — 预计 TLB 命中 + Cache 命中<br><br>**(B) VA = 0x1B3C0**  — 预计 TLB 未命中 + Cache 未命中<br><br>对每个地址写出：<br>1. VPN 和 VPO 的值<br>2. TLBI 和 TLBT，TLB 是否命中？PPN 是什么？<br>3. 物理地址 PA<br>4. CO、CI、CT<br>5. Cache 是否命中？取出的数据是多少？<br><br>---<br><br>### 答案<br><br>---<br><br>### (A) VA = 0x28C40 — Happy Path（TLB Hit + Cache Hit）<br><br>**1. 拆分 VA**<br>```<br>VA = 0x28C40 = 0010 1000 1100 0100 0000<br>VPO = VA[7:0]   = 0100 0000 = 0x40<br>VPN = VA[19:8]  = 0010 1000 1100 = 0x28C<br>```<br><br>**2. TLB 查询**<br>```<br>TLBI = VPN[1:0]  = 0x28C & 0x3 = 0x0 → 查 Set 0<br>TLBT = VPN[11:2] = 0x28C >> 2 = 0x0A3<br>```<br>查 TLB Set 0：Way 0 的 V=1, Tag=0x0A3 匹配！<br>→ **TLB 命中！PPN = 0x12**<br><br>**3. 拼接物理地址**<br>```<br>PA = PPN ∥ PPO = 0x12 ∥ 0x40 = 0x1240<br>二进制 = 0001 0010 0100 0000<br>```<br><br>**4. Cache 查询**<br>```<br>CO = PA[1:0]  = 00 → 读 Block[0]<br>CI = PA[5:2]  = 0000 → 查 Cache Set 0x0<br>CT = PA[15:6] = 0001 0010 01 = 0x049<br>```<br>查 Cache Set 0：Way 0 的 V=1, Tag=0x049 匹配！<br>→ **Cache 命中！Block[0] = 0xAB**<br><br>✅ **结果：VA 0x28C40 → PA 0x1240 → 数据 0xAB**<br><br>---<br><br>### (B) VA = 0x1B3C0 — 完整路径（TLB Miss + Page Table + Cache Miss）<br><br>**1. 拆分 VA**<br>```<br>VA = 0x1B3C0 = 0001 1011 0011 1100 0000<br>VPO = VA[7:0]   = 1100 0000 = 0xC0<br>VPN = VA[19:8]  = 0001 1011 0011 = 0x1B3<br>```<br><br>**2. TLB 查询**<br>```<br>TLBI = VPN[1:0]  = 0x1B3 & 0x3 = 0x3 → 查 Set 3<br>TLBT = VPN[11:2] = 0x1B3 >> 2 = 0x06C<br>```<br>查 TLB Set 3：Way 0 (V=0)，Way 1 (Tag=0x1C3≠0x06C)，Way 2 (Tag=0x05F≠0x06C)，Way 3 (Tag=0x188≠0x06C)<br>→ **TLB 未命中！需要查页表**<br><br>**3. 查页表**<br>```<br>VPN = 0x1B3 → 查页表<br>页表项：VPN=0x1B3 → V=1, PPN=0x2E<br>→ 页表命中！PPN = 0x2E<br>→ 将此页表项加载到 TLB Set 3（选择 Victim Way，比如替换 Way 0）<br>```<br><br>**4. 拼接物理地址**<br>```<br>PA = PPN ∥ PPO = 0x2E ∥ 0xC0 = 0x2EC0<br>二进制 = 0010 1110 1100 0000<br>```<br><br>**5. Cache 查询**<br>```<br>CO = PA[1:0]  = 00 → 读 Block[0]<br>CI = PA[5:2]  = 0000 → 查 Cache Set 0x0<br>CT = PA[15:6] = 0010 1110 11 = 0x0BB<br>```<br>查 Cache Set 0：Way 0 (Tag=0x049≠0x0BB)，Way 1 (Tag=0x052≠0x0BB)<br>→ **Cache 未命中！需要访问主存**<br>→ 从主存 PA=0x2EC0 处读取 4 B 块，加载到 Cache Set 0<br>→ 数据取决于主存实际内容（题目未给出，标记为「需访存」）<br><br>✅ **结果：VA 0x1B3C0 → PA 0x2EC0 → Cache Miss → 访存 → 数据取决于主存**<br><br>---<br><br>### 对比总结<br><br>| 步骤   | VA 0x28C40 (Happy Path) | VA 0x1B3C0 (Full Path)  |<br>|--------|-------------------------|--------------------------|<br>| TLB    | ✅ Hit, PPN=0x12        | ❌ Miss → 查页表          |<br>| 页表   | 不需要                   | ✅ Hit, PPN=0x2E          |<br>| PA     | 0x1240                  | 0x2EC0                    |<br>| Cache  | ✅ Hit, 数据=0xAB       | ❌ Miss → 访主存           |<br>| 耗时   | ~1 cycle                | ~100+ cycles              |<br><br>**启示**：TLB 和 Cache 都是为了让常见情况（Happy Path）在 1 个周期内完成。一旦 miss，代价巨大。这也是为什么局部性原理如此重要。\n</div>\n</details>"
        },
        {
          "type": "callout",
          "variant": "info",
          "text": "### 易错点 1：TLB 和 Cache 的索引来源不同\n\n❌ **错误想法**：「TLB 和 Cache 都是 Cache，索引都取低位就行。」\n\n✅ **正确理解**：\n- **TLB 的组索引用 VPN 的低位**（TLBI = VPN[k-1:0]），VPN 来自虚拟地址\n- **Cache 的组索引用物理地址的中间位**（CI = PA[s+b-1:b]），PA 是翻译后的结果\n- 两者完全独立！TLB 索引在翻译前，Cache 索引在翻译后\n- 考题常见陷阱：故意让你混淆 TLBI 和 CI 的计算方式\n\n---\n\n### 易错点 2：缺页时 PPN 不存在，不要硬填\n\n❌ **错误做法**：「页表项 valid=0，那我就当 PPN=0 继续算 PA 吧。」\n\n✅ **正确做法**：\n- 缺页（valid=0）意味着该虚拟页不在物理内存中，**PPN 无效**\n- 此时应标记为「缺页异常」，由 OS 从磁盘调入\n- **不要继续拼 PA、不要继续查 Cache**——流程在这里就中断了\n- 答题时写「PPN = N/A（缺页/Page Fault）」\n\n---\n\n### 易错点 3：VPO=PPO 是直接复制，不是「相等然后翻译」\n\n❌ **错误理解**：「VPO 经过某种运算得到 PPO。」\n\n✅ **正确理解**：\n- VPO 直接复制到 PPO，不经任何表、不做任何变换\n- 页内偏移**完全不参与地址翻译**——这是「页式管理」的设计基础\n- 因为页大小 = 帧大小，页内偏移在虚拟和物理空间中的含义完全一致\n- 翻译的本质：把 VPN 替换为 PPN，低位原封不动拼接上去"
        }
      ]
    }
  ],
};

export default content;
