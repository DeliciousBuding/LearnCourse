import type { Quiz } from '@learncourse/framework/types';

// === 虚拟内存 ===

// ── 选择题 ──
export const S10_QUIZZES: Quiz[] = [
  {
    id: "q-s10-3",
    moduleId: "s10",
    question: "某计算机虚拟地址 VA = 32 bit，物理地址 PA = 24 bit，页面大小 P = 8 KB。关于 VPO 和 PPO，以下说法正确的是？",
    options: [
      { text: "A. VPO = VA[11:0] 共 12 bit，PPO = PA[11:0] 共 12 bit，VPO 直接复制为 PPO", isCorrect: false },
      { text: "B. VPO = VA[12:0] 共 13 bit，PPO = PA[12:0] 共 13 bit，VPO 直接复制为 PPO，不经任何翻译", isCorrect: true },
      { text: "C. VPO = VA[12:0] 共 13 bit，PPO = PA[12:0] 共 13 bit，VPO 需经页表映射后得到 PPO", isCorrect: false },
      { text: "D. VPO = VA[14:0] 共 15 bit，PPO = PA[10:0] 共 11 bit，两者位数不同因为 VA 和 PA 位宽不同", isCorrect: false }
    ],
    feedbackCorrect: "正确！8 KB = 2^13 B，所以 VPO = PPO = log2(2^13) = 13 bit，对应 VA[12:0] 和 PA[12:0]。核心性质：VPO 直接复制为 PPO，页内偏移不参与任何翻译过程——这是「页式管理」的设计基础。页大小 = 帧大小，偏移在虚拟和物理空间含义完全一致，翻译只改变页号（VPN → PPN），低位原封不动拼接。",
    feedbackWrong: "不对。8 KB = 8192 = 2^13 B，所以页偏移 = log2(2^13) = 13 bit。VPO = VA[12:0]，PPO = PA[12:0]，且 VPO 直接复制为 PPO——不经任何表、不做任何变换。A 把 8 KB 错当成 4 KB（12 bit）。C 的说法「VPO 经页表映射成 PPO」是错误的——翻译只改高位 VPN→PPN，低位纹丝不动。D 的位宽计算混乱：VPO 和 PPO 永远相等（都等于 log2(页大小)），与 VA/PA 总位宽无关。记忆口诀：「页面大小定偏移，VPO=PPO 永不变。」",
    type: "single"
  },
  {
    id: "q-s10-4",
    moduleId: "s10",
    question: "某系统 VA = 32 bit，页大小 4 KB，TLB 共 64 项、8 路组相联。则 TLBI 和 TLBT 的位宽及来源正确的是？",
    options: [
      { text: "A. TLBI = VPN[2:0] 共 3 bit，取自 VPN 低 3 位；TLBT = VPN[19:3] 共 17 bit，取自 VPN 剩余高位", isCorrect: true },
      { text: "B. TLBI = VPN[5:0] 共 6 bit，取自 VPN 低 6 位；TLBT = VPN[19:6] 共 14 bit", isCorrect: false },
      { text: "C. TLBI = VA[2:0] 共 3 bit，取自完整 VA 低 3 位；TLBT = VA[31:3] 共 29 bit", isCorrect: false },
      { text: "D. TLBI = VPN[7:0] 共 8 bit（因为 Cache 的 CI 也是 8 bit，TLB 和 Cache 索引结构类似）", isCorrect: false }
    ],
    feedbackCorrect: "正确！计算步骤：(1) 页大小 4 KB = 2^12 → VPO = 12 bit，VPN = 32 - 12 = 20 bit。(2) TLB 共 64 项，8 路 → 组数 = 64/8 = 8 组 → 组索引位 = log2(8) = 3 bit。(3) TLBI = VPN[2:0]，TLBT = VPN[19:3] = 20 - 3 = 17 bit。关键：TLB 的组索引用的是 VPN 的低位（不是完整 VA！），因为 TLB 是 VPN→PPN 映射缓存，索引只和 VPN 有关。这是考试最爱挖的坑——TLBI 来自 VPN，Cache 的 CI 来自 PA，两者完全独立。",
    feedbackWrong: "不对。正确推导：(1) 4 KB = 2^12 → VPO = 12，VPN = 32 - 12 = 20。(2) TLB 64 项 8 路 → 64/8 = 8 组 → log2(8) = 3 → TLBI = 3 bit。(3) TLBI = VPN[2:0]，TLBT = VPN[19:3] = 17 bit。B 错在把「64 项」当成了组数（64 是一共多少个条目，不是多少组）。C 错在用了完整 VA 而非 VPN——VPO 部分不参与 TLB 索引（TLB 查的是页号映射，跟页内偏移无关）。D 是最危险的干扰：TLB 和 Cache 虽然都是「组相联的 Cache」，但 TLB 索引取 VPN 低位（翻译前），Cache 索引取 PA 中间位（翻译后），两者结构独立、位宽不同。",
    type: "single"
  },
  {
    id: "q-s10-5",
    moduleId: "s10",
    question: "某 48 位虚拟地址空间，页大小 4 KB，每个 PTE 占 8 字节。以下关于单级页表和多级页表的分析，正确的是？",
    options: [
      { text: "A. 单级页表需 2^36 × 8 B = 512 GB，远超物理内存常驻容量，因此必须采用多级页表——只把活跃的子表放在内存中，大幅节省空间", isCorrect: true },
      { text: "B. 单级页表需 2^48 / 2^12 = 2^36 项，但现代 64 位服务器内存动辄 TB 级别，512 GB 完全可以接受，多级页表的主要目的是加快翻译速度而非节省空间", isCorrect: false },
      { text: "C. 多级页表将 2^36 个 PTE 压缩为约 2^24 个——通过把不存在的虚拟页对应的 PTE 合并，减少了 PTE 总数量", isCorrect: false },
      { text: "D. 多级页表的每一级页表都固定占一个完整页面（4 KB），因此 4 级页表无论程序多小至少占用 4 × 4 KB = 16 KB 的内存来存页表", isCorrect: false }
    ],
    feedbackCorrect: "正确！48 位 VA，4 KB 页 → VPO = 12 bit，VPN = 36 bit。单级页表条目数 = 2^36 ≈ 6.87 × 10^10，每 PTE 8 字节 → 512 GB。这么大的表不可能全部常驻物理内存。多级页表的核心思想：把大表拆成树状结构，只有程序实际使用的那些分支才分配——比如一个只用了低地址几 MB 的小程序，可能只需要几十 KB 的页表内存。这正是「按需分配」的精髓。",
    feedbackWrong: "不对。单级页表 = 2^(48-12) × 8 B = 2^36 × 8 = 512 GB，这远非当今物理内存能容纳（注意是整个页表本身 512 GB，不是地址空间大小！）。B 混淆了地址空间和页表本身的大小——页表本身是数据结构，512 GB 的页表塞不进 128 GB 的服务器。C 错在多级页表并不减少 PTE 总数（最终级仍有 2^36 项），而是让大部分未使用的 PTE 不需要预先分配存储。D 的推理有漏洞——虽然每级页表大小确为 4 KB，且 4 级 = 16 KB，但 D 把这个「至少 16 KB」当成负面描述，忽略了相比 512 GB 的巨大节省，措辞偏向误导。多级页表的核心优势是空间效率，16 KB 的起步开销在 512 GB 面前完全合理。记住：多级页表 = 空间效率（只分配活跃分支）+ 时间代价（多级查询增加访存次数）。",
    type: "single"
  },
  {
    id: "q-s10-6",
    moduleId: "s10",
    question: "在地址翻译过程中，MMU 查到页表项 PTE 的 Valid bit = 0。以下关于此时系统行为的描述，正确的是？",
    options: [
      { text: "A. Valid=0 时 PPN 字段存的是磁盘地址，MMU 硬件自动从磁盘读取数据并更新 TLB，整个过程对 OS 透明", isCorrect: false },
      { text: "B. MMU 触发缺页异常（Page Fault），CPU 切换到内核态，OS 的缺页处理程序选择一个 victim 页、从磁盘调入所需页、更新 PTE 和 TLB、然后返回用户态重新执行触发缺页的那条指令", isCorrect: true },
      { text: "C. Valid=0 仅表示该页从未被写过（clean），OS 为该页分配一个新的物理页帧并填入 PPN，不需要访问磁盘", isCorrect: false },
      { text: "D. MMU 将 Valid=0 当作 TLB Miss 处理——直接去内存中的页表再次查找，因为页表内容一定比 TLB 更新、更完整", isCorrect: false }
    ],
    feedbackCorrect: "正确！缺页异常（Page Fault，#14）的完整流程：(1) MMU 发现 PTE.V=0 → 触发 page fault。(2) CPU 切内核态，执行缺页处理程序。(3) 选 victim 页，若 dirty 则写回磁盘。(4) 从磁盘读入所需页到腾出的物理帧。(5) 更新 PTE（V=1，填入新 PPN），更新 TLB。(6) 返回用户态，重新执行触发缺页的指令——这次 V=1，翻译成功。关键：缺页异常中断了翻译流程，不要继续拼 PA、不要继续查 Cache。PPN 此时无效，答题时应写「缺页/N/A」。",
    feedbackWrong: "不对。缺页异常的正确流程是 B。A 错在「MMU 硬件自动处理」——缺页处理是 OS 软件完成的（内核中的 page fault handler），不是硬件自动完成，因为磁盘 I/O 涉及设备驱动、调度、文件系统等复杂逻辑。C 混淆了 Valid bit 和 Dirty bit：V=0 表示页不在物理内存（可能在磁盘上或从未分配），而非「从未被写过」。D 是最危险的错误思路——Valid=0 出现在页表条目中，不是 TLB 的问题，再去查同一个页表得到的还是 V=0。Valid=0 意味着页不在物理内存中，不是 TLB 缓存过期的问题。记住：V=0 → 停止一切，触发异常。",
    type: "single"
  },
  {
    id: "q-s10-7",
    moduleId: "s10",
    question: "关于 PIPT（物理索引物理标记）和 VIVT（虚拟索引虚拟标记）Cache 的对比，以下说法正确的是？",
    options: [
      { text: "A. VIVT Cache 在上下文切换后可能读到旧进程的数据（不同进程同一 VA 可能映射到不同 PA），因此需要 flush 或加 ASID 标签；PIPT 按 PA 索引，切换后天然隔离无需 flush", isCorrect: true },
      { text: "B. PIPT Cache 的优势在于 Cache 查询和 TLB 翻译可以完全并行——因为 Cache 用物理地址索引，无需等待翻译结果", isCorrect: false },
      { text: "C. VIVT Cache 天然不存在「同义词」（synonym/alias）问题——因为虚拟地址是每个进程唯一的，不会出现两个不同 VA 映射到同一 PA 的情况", isCorrect: false },
      { text: "D. PIPT Cache 的组索引 CI 来自虚拟地址的中间位，因此必须等 MMU 翻译完成才能查 Cache，但优势是上下文切换开销小", isCorrect: false }
    ],
    feedbackCorrect: "正确！PIPT（Physical Index Physical Tag）：组索引和标记都来自 PA。优势：无同义词问题（同一 PA 只有一个 Cache 位置），上下文切换无需 flush。劣势：必须先等 TLB 翻译完才能开始查 Cache（串行延迟）。VIVT（Virtual Index Virtual Tag）：组索引和标记都来自 VA。优势：可以和 TLB 翻译并行（VA 已知直接查）。劣势：同义词问题（不同 VA 映射同一 PA → Cache 中有多份），上下文切换时不同进程同一 VA 可能对应不同 PA → 需要 flush 或 ASID。A 准确描述了 VIVT 的别名问题和上下文切换开销，以及 PIPT 的天然隔离优势。",
    feedbackWrong: "不对。正确选项是 A。B 的说法刚好反了——PIPT 的劣势正是必须等 TLB 翻译出 PA 后才能开始 Cache 查询，不能并行（这也是 VIPT「虚拟索引物理标记」折中方案存在的动机）。C 错误：VIVT 恰恰存在严重的同义词问题——同一物理页可以被不同虚拟地址映射（例如两个进程共享同一物理页但各自用不同 VA），按 VA 索引会导致同一数据在 Cache 中出现多份（synonym/alias），修改一份后另一份变「脏」。D 前半句错误——PIPT 的 CI 来自物理地址（PA），不是虚拟地址。记住口诀：「PIPT = 准但慢（等翻译），VIVT = 快但乱（同义词/上下文切换）。」",
    type: "single"
  }
];