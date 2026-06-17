import type { Quiz } from '@learncourse/framework/types';

// === 存储层次与Cache ===

// ── 选择题 ──
export const S9_QUIZZES: Quiz[] = [
  {
    id: "q-s9-3",
    moduleId: "s9",
    question: "某32位地址空间，Cache总容量16KB，采用8路组相联（E=8），块大小64字节。则地址中Tag(t)、Set Index(s)、Block Offset(b)的位数分别是？",
    options: [
      { text: "t=19, s=7, b=6", isCorrect: false },
      { text: "t=21, s=5, b=6", isCorrect: true },
      { text: "t=20, s=6, b=6", isCorrect: false },
      { text: "t=21, s=6, b=5", isCorrect: false }
    ],
    feedbackCorrect: "正确！先求b：B=64=2^6 → b=6。总块数=C/B=16384/64=256块。组数S=总块数/E=256/8=32=2^5 → s=5。t=m-s-b=32-5-6=21。关键步骤：必须先除以相联度E才能得到正确的组数——忘了除E会算出s=8（错误）。顺序是b→S→s→t，跳步必错。",
    feedbackWrong: "不对。正确过程：①b=log₂64=6；②总块数=16KB/64B=256块；③组数S=256/8=32=2^5→s=5；④t=32-5-6=21。选A的同学可能忘了除以相联度E=8（把256块当成了256组→s=8→t=18...但选了19说明还有其他计算错误）。选C可能把m记错或倒数第二步出错。选D的同学b算错了——B=64对应b=6而非5。死记公式：S=C/(E×B)，先求b，再求S→s，最后t=m-s-b。",
    type: "single"
  },
  {
    id: "q-s9-4",
    moduleId: "s9",
    question: "关于直接映射、组相联和全相联三种Cache映射方式，以下说法正确的是？",
    options: [
      { text: "直接映射的冲突缺失（Conflict Miss）最少，因为没有多路选择的开销", isCorrect: false },
      { text: "全相联Cache不需要Tag字段，因为任何块都可以放入任意位置", isCorrect: false },
      { text: "提高相联度E可以减少冲突缺失，但会增加硬件复杂度和命中时间", isCorrect: true },
      { text: "在相同Cache数据容量下，直接映射的命中率总是高于组相联", isCorrect: false }
    ],
    feedbackCorrect: "正确！提高相联度E的本质是：每个组里有更多「车位」可选，不同内存块之间互相挤出的概率变小，冲突缺失下降。但代价是：每次访问需要并行比较组内所有路的Tag（硬件更复杂），且多路选择器的延迟略有增加。现代CPU的L1 Cache常采用8路组相联，这是在冲突缺失和硬件代价之间的工程折中。",
    feedbackWrong: "不对。A错——直接映射的冲突缺失反而是最多的（每个内存块只能放在唯一固定位置，多对一映射导致频繁踢出）。B错——全相联仍然需要Tag来唯一标识每个块，只是不需要Set Index（所有块共享一个「大组」）。D错——直接映射命中率通常低于组相联，因为冲突缺失更多。正确选项C描述了相联度E和冲突缺失的权衡关系，这是Cache设计的核心trade-off。",
    type: "single"
  },
  {
    id: "q-s9-5",
    moduleId: "s9",
    question: "某2路组相联Cache的组0初始为空，采用LRU替换策略。访问序列（仅列出tag值）：1, 2, 1, 3, 2, 1。问整个过程组0中共命中几次？",
    options: [
      { text: "0次", isCorrect: false },
      { text: "1次", isCorrect: true },
      { text: "2次", isCorrect: false },
      { text: "3次", isCorrect: false }
    ],
    feedbackCorrect: "正确！逐步追踪：①tag=1→缺失，装入路0，LRU=1；②tag=2→缺失，装入路1，LRU顺序2>1；③tag=1→命中！LRU更新为1>2；④tag=3→缺失，踢出LRU最久未用的tag=2，[1,3]，LRU=3>1；⑤tag=2→缺失（已被踢出），踢出LRU=1，[3,2]，LRU=2>3；⑥tag=1→缺失（已被踢出），踢出LRU=3，[2,1]。仅第③次命中，共1次。注意：tag=1和tag=2在互相踢来踢去——这就是冲突缺失的典型表现。如果E=4路就不会这样。",
    feedbackWrong: "不对。逐次追踪：①1→miss；②2→miss；③1→hit（此时[1,2]）；④3→miss，踢出2（LRU），[1,3]；⑤2→miss，踢出1（LRU），[3,2]；⑥1→miss，踢出3（LRU），[2,1]。仅第③次命中，共1次。易错点：第⑤次tag=2之前已被第④次踢出（虽然刚用过，但淘汰的是最久未用的1——可1在第③次刚用过，2才是此刻最久未用的，等到④踢2→⑤来了2又没命中）。这是2路不够用的典型场景。",
    type: "single"
  },
  {
    id: "q-s9-6",
    moduleId: "s9",
    question: "某处理器L1 Cache命中时间1个时钟周期，缺失代价为50个时钟周期。当命中率从95%提升到98%时，平均访存时间（AMAT）减少了多少时钟周期？",
    options: [
      { text: "减少了3.5个时钟周期", isCorrect: false },
      { text: "减少了1.5个时钟周期", isCorrect: true },
      { text: "减少了1.0个时钟周期", isCorrect: false },
      { text: "减少了0.15个时钟周期", isCorrect: false }
    ],
    feedbackCorrect: "正确！AMAT = 命中时间 + 缺失率 × 缺失代价。命中率95%时：AMAT = 1 + 0.05 × 50 = 1 + 2.5 = 3.5 cycles。命中率98%时：AMAT = 1 + 0.02 × 50 = 1 + 1.0 = 2.0 cycles。减少量 = 3.5 - 2.0 = 1.5 cycles。尽管命中率只提高了区区3个百分点，平均访存时间却缩短了43%（从3.5降到2.0）。这说明缺失率的小幅改善也能对性能产生显著影响——因为缺失代价（50 cycles）远大于命中时间（1 cycle）。这就是为什么Cache优化如此重要。",
    feedbackWrong: "不对。AMAT = 命中时间 + 缺失率 × 缺失代价。95%命中率时缺失率=0.05，AMAT = 1 + 0.05×50 = 3.5。98%命中率时缺失率=0.02，AMAT = 1 + 0.02×50 = 2.0。减少量 = 3.5 - 2.0 = 1.5 cycles。A把减少量错算成了原值3.5。C只算了缺失率差×惩罚=0.03×50=1.5（中间值但不是最终答案的关键），或者是直接算了差值。D只看了命中率差3%=0.15但没乘50。核心公式AMAT=HitTime+MissRate×MissPenalty一定要记住。",
    type: "single"
  },
  {
    id: "q-s9-7",
    moduleId: "s9",
    question: "以下四种场景分别对应不同类型的Cache缺失。哪一个属于「冲突缺失」（Conflict Miss）？",
    options: [
      { text: "程序启动后第一次访问数组A[0]——Cache为空，该数据从未被调入过", isCorrect: false },
      { text: "程序的工作集（working set）大小为2MB，但L2 Cache只有1MB，导致数据反复被踢出又调入", isCorrect: false },
      { text: "直接映射Cache中，地址0x1000和0x2000恰好映射到同一组（Set 0），交替访问导致互相踢出", isCorrect: true },
      { text: "Cache使用Write-back策略时，某脏块被踢出前需要将数据写回内存，写回期间新的访问产生缺失", isCorrect: false }
    ],
    feedbackCorrect: "正确！冲突缺失（Conflict Miss）的定义：Cache本身有足够容量装下所有需要的数据，但因为映射策略的限制（如直接映射下多个内存块被迫挤在同一组），导致互相踢出。解决方法是提高相联度E。A是冷启动缺失（Compulsory/Cold Miss）——第一次访问必然缺失，无法避免。B是容量缺失（Capacity Miss）——工作集超过Cache总容量，唯一的解决方法是增大Cache或减小工作集（如blocking分块）。D描述的是写回延迟问题，不是三种标准缺失类型之一。三种缺失的记忆口诀：「冷不防」（冷启动，第一次）、「容不下」（容量，Cache太小）、「打架」（冲突，映射到同一位置互相踢）。",
    feedbackWrong: "不对。A是冷启动缺失（Compulsory Miss）——数据第一次被访问，无论Cache多大、多路都必然缺失。B是容量缺失（Capacity Miss）——工作集超过Cache总容量，该问题不能通过提高相联度解决（要增大Cache或优化程序）。D描述的写回延迟不是标准的三种缺失类型。正确答案C才是冲突缺失——两个不同内存地址映射到同一组，即使Cache别的组还有空位也用不上（被映射规则绑死），互相踢出。解决冲突缺失的方法是提高相联度E（让每组能放更多块），但不能解决容量缺失。",
    type: "single"
  }
];

// ── 模拟题 ──
export const S9_SIM_QUESTIONS: ExamQuestion[] = [
  {
    id: "sim-s9-1",
    moduleId: "s9",
    year: "模拟题",
    position: "地址分解+命中追踪",
    points: 10,
    questionText: "<p><strong>题目：</strong>某计算机采用16位物理地址，Cache参数如下：直接映射（E=1），总数据容量 C=512 字节，块大小 B=16 字节。请回答：</p><p>(1) 写出地址中 b（块内偏移）、s（组索引）、t（Tag）各占多少位，并推导计算过程。</p><p>(2) 对以下地址访问序列（十六进制），假设初始 Cache 为空，逐条判断每次访问是命中（Hit）还是缺失（Miss），并写明每次访问的 Tag、Set Index 值和判断依据。</p><p>地址序列：<code>0x0024, 0x0044, 0x0028, 0x0024, 0x0084, 0x0024</code></p><p>(3) 计算命中率。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><p><strong>(1) 参数推导（3分）：</strong></p><ul><li>B = 16 字节 = 2^4 → <strong>b = 4</strong> 位（Block Offset）</li><li>总块数 = C / B = 512 / 16 = 32 块</li><li>直接映射 E=1 → 组数 S = 32 / 1 = 32 = 2^5 → <strong>s = 5</strong> 位（Set Index）</li><li>m = 16 位（物理地址宽度）→ <strong>t = m - s - b = 16 - 5 - 4 = 7</strong> 位（Tag）</li></ul><p>地址布局：[15:9] = Tag (7b), [8:4] = Set Index (5b), [3:0] = Block Offset (4b)。</p><p><strong>(2) 逐条追踪（5分）：</strong></p><table><tbody><tr><th>#</th><th>地址</th><th>二进制（16位）</th><th>Tag(7b)</th><th>Set(5b)</th><th>Off(4b)</th><th>结果</th><th>解释</th></tr><tr><td>1</td><td>0x0024</td><td>0000 0000 0010 0100</td><td>0x00</td><td>0x02</td><td>0x4</td><td><span style='color:#991b1b'>MISS</span></td><td>冷启动：Set 2为空，装入块 M[0x20-0x2F]，Tag=0x00</td></tr><tr><td>2</td><td>0x0044</td><td>0000 0000 0100 0100</td><td>0x00</td><td>0x04</td><td>0x4</td><td><span style='color:#991b1b'>MISS</span></td><td>冷启动：Set 4为空，装入块 M[0x40-0x4F]，Tag=0x00</td></tr><tr><td>3</td><td>0x0028</td><td>0000 0000 0010 1000</td><td>0x00</td><td>0x02</td><td>0x8</td><td><span style='color:#065f46'>HIT</span></td><td>Set 2: Valid=1, Tag=0x00匹配 → 命中！（与#1同一块，不同Offset）</td></tr><tr><td>4</td><td>0x0024</td><td>0000 0000 0010 0100</td><td>0x00</td><td>0x02</td><td>0x4</td><td><span style='color:#065f46'>HIT</span></td><td>Set 2: Valid=1, Tag=0x00匹配 → 命中！（与#1完全相同的地址）</td></tr><tr><td>5</td><td>0x0084</td><td>0000 0000 1000 0100</td><td>0x00</td><td>0x08</td><td>0x4</td><td><span style='color:#991b1b'>MISS</span></td><td>冷启动：Set 8为空，装入块 M[0x80-0x8F]，Tag=0x00</td></tr><tr><td>6</td><td>0x0024</td><td>0000 0000 0010 0100</td><td>0x00</td><td>0x02</td><td>0x4</td><td><span style='color:#065f46'>HIT</span></td><td>Set 2: 块未被替换，Tag=0x00匹配 → 命中！</td></tr></tbody></table><p><strong>(3) 命中率（2分）：</strong>命中 3 次 / 共 6 次 = <strong>50%</strong>。</p><p><strong>评分要点：</strong>(1) b/s/t推导每项1分，需写出2的幂次→对数→位数的完整推导；(2) 每个地址的Tag/Set/Offset分解正确各0.5分（共3分），判断正确各约0.33分（共2分），必须写明判断逻辑——只写H/M不给满分；(3) 计算正确2分。</p>"
  },
  {
    id: "sim-s9-2",
    moduleId: "s9",
    year: "模拟题",
    position: "LRU替换追踪+缺失分类",
    points: 8,
    questionText: "<p><strong>题目：</strong>某2路组相联Cache共有4个组（Set 0~3），每组2路，采用LRU替换策略。假设初始Cache为空。给出以下6次访问（格式为「(Set索引, Tag值)」）：</p><p><strong>访问序列：</strong><code>(0,A), (1,A), (0,B), (0,C), (1,B), (0,A)</code></p><p>(1) 画出每次访问后Set 0和Set 1各自的内容（路0/路1分别装了什么Tag），并标注命中/缺失。</p><p>(2) 将每次缺失分类为冷启动缺失（Compulsory）、冲突缺失（Conflict）或容量缺失（Capacity），并说明分类依据。</p><p>(3) 如果将该Cache改为4路组相联（其他参数不变），上述序列的命中率如何变化？说明原因。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><p><strong>(1) LRU追踪表（3分）：</strong></p><table><tbody><tr><th>#</th><th>访问</th><th>命中?</th><th>Set 0 内容（路0/路1）</th><th>Set 0 LRU顺序</th><th>Set 1 内容（路0/路1）</th><th>Set 1 LRU顺序</th></tr><tr><td>1</td><td>(0,A)</td><td>MISS</td><td>A / -</td><td>A</td><td>- / -</td><td>-</td></tr><tr><td>2</td><td>(1,A)</td><td>MISS</td><td>A / -</td><td>A</td><td>A / -</td><td>A</td></tr><tr><td>3</td><td>(0,B)</td><td>MISS</td><td>A / B</td><td>B > A</td><td>A / -</td><td>A</td></tr><tr><td>4</td><td>(0,C)</td><td>MISS</td><td>C / B</td><td>C > B</td><td>A / -</td><td>A</td></tr><tr><td>5</td><td>(1,B)</td><td>MISS</td><td>C / B</td><td>C > B</td><td>A / B</td><td>B > A</td></tr><tr><td>6</td><td>(0,A)</td><td>MISS</td><td>C / A</td><td>A > C</td><td>A / B</td><td>B > A</td></tr></tbody></table><p><strong>结果：</strong>0 次命中，6 次缺失，命中率 = <strong>0%</strong>。</p><p>关键步骤解释：第4次 (0,C) 时Set 0两路已满（A和B），LRU为B > A，最久未用的是A → 踢出A，装入C。第6次 (0,A) 时Set 0为[C,B]，LRU为C > B → 踢出B（最久未用），装入A。注意A在第4次已被踢出，所以第6次必然缺失——尽管A之前被访问过，但2路不够容纳{A,B,C}三个不同Tag。这就是冲突缺失。</p><p><strong>(2) 缺失分类（3分）：</strong></p><ul><li><strong>冷启动缺失（Compulsory）：</strong>#1 (0,A)、#2 (1,A)、#3 (0,B)、#5 (1,B)。这些是新Tag值第一次出现在对应的Set中，Cache该组有空位。</li><li><strong>冲突缺失（Conflict）：</strong>#4 (0,C)、#6 (0,A)。这两个缺失发生时，Set 0本身的两路已满，但Set 1、Set 2、Set 3还空着（或有余量）。说明不是Cache总容量不够，而是因为Set 0被映射规则绑死只能装2个Tag。三个Tag {A,B,C} 挤在Set 0中导致互相踢出——这是冲突缺失的典型表现。</li><li><strong>容量缺失（Capacity）：</strong>无。整个Cache（4组 × 2路 = 8个槽位）只用了5个槽位，远未达到容量上限。</li></ul><p><strong>(3) 改为4路组相联的影响（2分）：</strong></p><p>改为4路组相联后，Set 0有4路，足以同时容纳{A,B,C}三个Tag。追踪变化：第4次(0,C)装入空路2（不踢出A或B）；第5次(1,B)仍缺失（冷启动）；第6次(0,A)时A仍在Set 0路0中 → <strong>命中</strong>。命中率从0/6=0%提高到<strong>1/6≈16.7%</strong>。提高相联度E是解决冲突缺失的直接手段——但无法解决容量缺失（若工作集真的超过总容量，再高的E也没用）。</p><p><strong>评分要点：</strong>(1) 追踪表正确且LRU顺序标注准确（3分）；(2) 每次缺失正确分类并说明理由（3分）；(3) 分析有理有据、命中率变化正确（2分）。</p>"
  },
  {
    id: "sim-s9-3",
    moduleId: "s9",
    year: "模拟题",
    position: "综合分析：局部性+Cache参数设计",
    points: 12,
    questionText: "<p><strong>题目：</strong>已知 int 类型占 4 字节，二维数组 <code>int A[128][128]</code> 在内存中按行优先（Row-major）存储。某程序员写了以下代码片段：</p><pre>int sum = 0;\nfor (int i = 0; i < 128; i++)\n    for (int j = 0; j < 128; j++)\n        sum += A[j][i];  // 注意：是 A[j][i]，不是 A[i][j]！</pre><p>(1) 这段代码对数组A的访问在空间局部性方面有什么问题？每次访问的步长（stride）是多少？</p><p>(2) 现有两种Cache设计方案（物理地址16位）：<br/><strong>方案一：</strong>直接映射，总数据容量2KB，块大小16B<br/><strong>方案二：</strong>4路组相联，总数据容量2KB，块大小64B<br/>对每种方案：计算b, s, t各多少位。</p><p>(3) 对于这段代码，两种方案中哪种的缺失率可能更低？请结合块大小、相联度和访问模式进行分析。</p><p>(4) 给出两种改善这段代码性能的方法（不改变硬件），并说明各自的原理。</p>",
    answerHtml: "<p><strong>参考答案：</strong></p><p><strong>(1) 局部性分析（3分）：</strong></p><p>代码 <code>A[j][i]</code> 外层循环i、内层循环j——意味着内层循环改变的是行索引j而列索引i不变。在行优先存储下，A[0][i]和A[1][i]在内存中的距离 = 128个int = 128×4 = 512字节。每次内层迭代j+1导致访问地址<strong>跳过512字节（stride=512B）</strong>。这是一个<strong>按列遍历</strong>的模式，空间局部性极差——每次访问大概率不在当前Cache块内，导致频繁缺失。相比之下，<code>A[i][j]</code>（按行遍历）的stride仅为4B，同一块（如16B块含4个int）内的连续访问会反复命中。</p><p><strong>(2) 参数计算（4分）：</strong></p><p><strong>方案一（直接映射，C=2KB, B=16B, E=1）：</strong></p><ul><li>b = log₂16 = <strong>4</strong> 位</li><li>总块数 = 2048/16 = 128 块，S = 128/1 = 128 = 2^7 → s = <strong>7</strong> 位</li><li>t = 16 - 7 - 4 = <strong>5</strong> 位</li></ul><p><strong>方案二（4路组相联，C=2KB, B=64B, E=4）：</strong></p><ul><li>b = log₂64 = <strong>6</strong> 位</li><li>总块数 = 2048/64 = 32 块，S = 32/4 = 8 = 2^3 → s = <strong>3</strong> 位</li><li>t = 16 - 3 - 6 = <strong>7</strong> 位</li></ul><p><strong>(3) 方案分析（3分）：</strong></p><p>对于这段按列遍历的代码（stride=512B），方案二的缺失率可能更低，原因有两个：</p><ul><li><strong>块大小优势：</strong>方案二的块为64B（含16个int），虽然按列遍历时相邻两次访问跳512B、不在同一块内（这是最坏情况），但较大的块能更好地利用其他维度的空间局部性（如外循环迭代时可能复用邻近数据）。方案一的块仅16B（4个int），对stride=512B的访问完全无效——每次访问都miss。</li><li><strong>相联度优势：</strong>方案二为4路组相联，即使有多个数据映射到同一组，也能减少冲突缺失。方案一为直接映射仅有8组（在方案二中也是8组），但方案一的128个块映射到128个组→每个组只有1路→一旦两个地址落在同一组，立即冲突踢出。方案二的32个块分布在8组→每组4路→冲突容忍度高得多。</li><li><strong>但是：</strong>两种方案在stride=512B的极端模式下都会大量缺失——根本原因不在Cache参数，而在代码的访问模式。瓶颈是<strong>软件层面</strong>而非硬件层面。</li></ul><p><strong>(4) 代码优化建议（2分）：</strong></p><p><strong>方法一：交换循环顺序（最直接、零成本）。</strong>将 <code>A[j][i]</code> 改为 <code>A[i][j]</code>——即将i和j的循环内外层交换：<code>for(j=0;j<128;j++) for(i=0;i<128;i++) sum+=A[j][i]</code>。此时内层按行访问，stride从512B降为4B，每16B块中含4个int，每4次访问仅1次miss（方案一）或每64B块16个int每16次访问1次miss（方案二）。缺失率大幅降低。</p><p><strong>方法二：分块（Blocking/Tiling）。</strong>将128×128矩阵分成若干B×B的小块（如B=8），先处理一个小块内的所有元素再处理下一个小块：<code>for(ii=0;ii<128;ii+=B) for(jj=0;jj<128;jj+=B) for(i=ii;i<ii+B;i++) for(j=jj;j<jj+B;j++) sum+=A[j][i]</code>。块内数据量小（B²个int），可以完全放入Cache，使得块内的随机/列访问开销被摊薄。分块大小B应使B²×4×3（A+B+C的块）不超过Cache容量。</p><p><strong>评分要点：</strong>(1) 指出按列访问和stride=512B（2分），说明空间局部性差的原因（1分）；(2) 每种方案的b/s/t计算正确（各2分）；(3) 结合块大小和相联度分析，结论合理（2分），指出根本原因在软件层面（1分）；(4) 两种优化方法各1分，需说明原理（不仅仅是写代码）。</p>"
  }
];