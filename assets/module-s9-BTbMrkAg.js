var e={meta:{id:`s9`,number:9,title:`存储层次与 Cache`,icon:`Database`,courseware:`09 Cache.pptx`,examRefs:`联合大题 ~25分`},calloutText:`这章解决什么问题？CPU 跑得飞快，但内存慢得像蜗牛。怎么让 CPU 别干等着？答案是在 CPU 和内存之间塞一个又小又快的"中间人"——Cache。这一章告诉你这个中间人怎么工作、怎么把地址切碎分析、以及怎么判断一段代码跑得是快还是慢。`,sections:[{id:`s9-s1`,title:`9.0 本章在考试中的位置`,content:[{type:`prose`,html:`<p style="color:var(--color-text-secondary);font-size:var(--text-sm)">课件：第19-22讲 · 期中考 Cache 基础 · 期末与 VM 联合出 25 分大题 · 套路极其固定，最容易速成拿分</p>`},{type:`callout`,variant:`tip`,text:`不用担心，这章有固定套路。先搞懂 Cache 为什么管用（局部性），然后掌握一个核心技能——把地址拆成三截，最后查表判断命中。套路固定，最容易速成拿分。`}]},{id:`s9-s2`,title:`9.1 先理解直觉——CPU 为什么会"等"？`,content:[{type:`prose`,html:`<p>想象你是一个大厨（CPU），正在疯狂炒菜。你需要盐——但盐放在仓库（内存）里，跑一趟仓库要 5 分钟。你总不能每炒一盘菜就跑一趟仓库吧？</p>`},{type:`prose`,html:`<p>聪明的大厨会在灶台旁边放一个小调料架（Cache），把常用的盐、糖、酱油放上去。伸手就能拿到（1 秒），不用跑仓库（5 分钟）。这就是 <strong>Cache 的核心思想：在快的设备和慢的设备之间，放一个"又快又近"的临时储物区。</strong></p>`},{type:`prose`,html:`<p>计算机里的层次是这样的（从最快最贵到最慢最便宜）：</p>`},{type:`prose`,html:`<p><strong>寄存器</strong>（1 个时钟周期，几百字节）→ <strong>L1 Cache</strong>（~4 周期，32KB）→ <strong>L2 Cache</strong>（~11 周期，256KB）→ <strong>L3 Cache</strong>（~30-40 周期，8MB）→ <strong>主存 DRAM</strong>（~50-100ns，若干 GB）→ <strong>SSD/硬盘</strong>（微秒~毫秒，TB 级）</p>`},{type:`prose`,html:`<p><strong>为什么需要层次？</strong>因为三个指标互相矛盾：</p>`},{type:`table`,headers:[],rows:[[`指标`,`SRAM（Cache用）`,`DRAM（内存用）`],[`速度`,`快（~1x）`,`慢（~10x）`],[`成本`,`贵（~100x）`,`便宜（1x）`],[`电路`,`6个晶体管/bit`,`1晶体管+1电容/bit`],[`需要刷新？`,`不需要`,`需要（每10-100ms）`],[`Row Hammer攻击？`,`不受影响`,`受影响`]]},{type:`prose`,html:`<p><strong>一句话总结：</strong>层次 k 是层次 k+1 的缓存。CPU 先在最快的层找，找不到才去下一层。因为局部性原理，<strong>大部分时候在最上层就能找到。</strong></p>`}]},{id:`s9-s3`,title:`9.2 局部性原理——Cache 能工作的根本原因`,content:[{type:`prose`,html:`<p>Cache 不是魔法，它能工作的根基是<strong>局部性原理</strong>。程序访问数据时不是随机跳来跳去的——它有两个规律：</p>`},{type:`card`,title:`时间局部性（Temporal Locality）`,body:`<div class="card">
<p><strong>定义：</strong>刚刚访问过的数据，很可能很快又被访问。</p>
<p><strong>例子：</strong>循环里的 <code>sum</code> 变量，每次迭代都要读写它。第一次从内存取，后面全在 Cache 里命中。</p>
<pre><code>int sum = 0;
for (int i = 0; i &lt; 1000; i++) {
    sum += a[i];  // sum 反复被访问 → 时间局部性
}</code></pre>
</div>`},{type:`card`,title:`空间局部性（Spatial Locality）`,body:`<div class="card">
<p><strong>定义：</strong>访问了一个地址，它附近的地址也很可能很快被访问。</p>
<p><strong>例子：</strong>数组按顺序遍历时，相邻元素在内存里也是相邻的。Cache 一次取一个 block（不仅取你要的那个字节，连它旁边的一起搬进来）。</p>
<pre><code>for (int i = 0; i &lt; 1000; i++) {
    sum += a[i];  // a[0],a[1],a[2]... 连续访问 → 空间局部性
}</code></pre>
</div>`},{type:`callout`,variant:`warning`,text:`常见错误：按列遍历二维数组（在 C 语言中）会破坏空间局部性。因为 C 语言数组是"行优先"存储的——a[0][0], a[0][1], a[0][2]... 在内存里相邻，但 a[0][0], a[1][0], a[2][0] 不挨着。所以外层循环遍历列、内层遍历行 = 每次访问都跳一大截 = Cache 一直 miss。这就是下面要讲的矩阵乘法优化的核心。`},{type:`details`,summary:`好代码 vs 坏代码——局部性对比`,body:`<details>
<div class="details-body">
<pre><code>// 好：按行访问（步长=1）——空间局部性极佳
for (int i = 0; i &lt; N; i++)
    for (int j = 0; j &lt; N; j++)
        sum += A[i][j];  // A[i][0], A[i][1], ... 连续

// 坏：按列访问（步长=N*sizeof(int)）——空间局部性极差
for (int j = 0; j &lt; N; j++)
    for (int i = 0; i &lt; N; i++)
        sum += A[i][j];  // A[0][0], A[1][0], ... 跳一大段
</code></pre>
<p>对于 N=1000 的矩阵，坏代码每次访问跳过 4000 字节，Cache 基本装不下。</p>
</div>
</details>`}]},{id:`s9-s4`,title:`9.3 地址分解公式——一切计算的根基`,content:[{type:`prose`,html:`<p><strong>这是整章最重要的技能。</strong>给定一个内存地址，你要能把它切成三段。考试中无论大题小题，第一步永远是做这个分解。</p>`},{type:`mermaid`,id:`s9-addr-decomp`,chart:`graph LR
    A["地址（m 位）"] --> B["Tag（t 位）"]
    A --> C["Set Index（s 位）"]
    A --> D["Block Offset（b 位）"]
    B --> E["用来和 Cache 行里的 Tag 比对<br/>——确定是不是这一块"]
    C --> F["定位到 Cache 的哪一组<br/>——去哪个抽屉找"]
    D --> G["定位到块内的哪个字节<br/>——在抽屉的哪个位置"]`},{type:`card`,title:`三个基本参数`,body:`<div class="card">
<table>
<tr><th>参数</th><th>公式</th><th>含义</th></tr>
<tr><td>$B = 2^b$</td><td>块大小（字节）</td><td>Cache 一次搬的数据量</td></tr>
<tr><td>$S = 2^s$</td><td>组数</td><td>Cache 里有多少个"抽屉"</td></tr>
<tr><td>$E = 2^e$</td><td>相联度（每组行数）</td><td>每个抽屉能放几块数据</td></tr>
</table>
<p style="margin-top:8px;"><strong>Cache 总数据容量：$C = S \\times E \\times B$（不包含 Tag 和 Valid bit 的开销！）</strong></p>
</div>`},{type:`card`,title:`实战演算：32位地址 → 直接映射 Cache`,body:`<div class="card">
<p><strong>题目：</strong>32 位地址空间，16KB Cache，直接映射（E=1），块大小 64 字节。求 t, s, b 各多少位？</p>
<p><strong>步骤：</strong></p>
<ol>
<li>$B = 64 = 2^6 \\Rightarrow b = 6$ 位（块内偏移）</li>
<li>$S = C / (E \\times B) = 16\\text{KB} / (1 \\times 64) = 16384 / 64 = 256 = 2^8 \\Rightarrow s = 8$ 位（组索引）</li>
<li>$t = m - s - b = 32 - 8 - 6 = 18$ 位（Tag）</li>
</ol>
<p><strong>答案：</strong>Tag=18位, Set Index=8位, Block Offset=6位</p>
<p>地址布局：<code>[31:14]=Tag, [13:6]=Set Index, [5:0]=Block Offset</code></p>
</div>`},{type:`callout`,variant:`warning`,text:`常见错误1：把块大小 B 和 Cache 总容量 C 搞混。B 是一块多大，C 是整个 Cache 能装多少数据。先求 b（由 B 决定），再求 s（由 S = C/(E*B) 决定），最后用 t = m - s - b。不要跳步。`},{type:`callout`,variant:`warning`,text:`常见错误2：Cache 容量公式 C = S x E x B 只算"数据容量"——不包括 Tag、Valid bit、Dirty bit。所以考试给的 Cache 大小就是这个数据容量。不要额外再减。`},{type:`callout`,variant:`warning`,text:`常见错误3：直接映射 Cache 用地址的"中间位"做组索引。为什么要用中间位？因为如果取高位，连续地址会映射到同一组，互相踢出；如果取低位，只有相邻地址会映射到不同组。取中间位是最好的折中。`},{type:`callout`,variant:`info`,text:`现在回看整章的核心套路：给定地址 → 拆成 Tag / Set Index / Block Offset 三段 → 查表判断 hit/miss → 算出数据。后面几节都在给这三步填细节——不同的映像方式(E)、不同的 Miss 类型、不同的写策略。`}]},{id:`s9-s5`,title:`9.4 三种 Cache 映像方式`,content:[{type:`table`,headers:[],rows:[[`类型`,`相联度 E`,`定位方式`,`冲突频率`,`硬件复杂度`],[`直接映射`,`1`,`每块内存只能放一个固定的 Cache 行`,`最高`,`最简单`],[`E路组相联`,`E`,`每块内存可以放组内 E 个位置中的任一个`,`中等`,`中等`],[`全相联`,`C/B (所有行)`,`每块内存可以放 Cache 任意位置`,`最低`,`最复杂`]]},{type:`prose`,html:`<p><strong>直觉理解：</strong></p><ul><li><strong>直接映射 = 每个停车位只能停一辆固定车牌的车。</strong>来了就找自己的位，位被占了就踢走旧的。简单但容易打架。</li><li><strong>E路组相联 = 每个停车场有 E 个车位，你的车可以停其中任何一个。</strong>稍微复杂一点，但冲突少多了。现代 CPU 的 L1 通常是 8 路组相联。</li><li><strong>全相联 = 整个停车场随便停。</strong>最好，但找车位要花更多时间（要找遍所有位才能确定在不在）。一般只用在 TLB 这种条目很少的地方。</li></ul>`},{type:`mermaid`,id:`s9-direct-mapped`,chart:`graph TD
    A["CPU 发出地址"] --> B["分解地址: Tag + Set Index + Block Offset"]
    B --> C{"用 Set Index<br/>找到对应的组"}
    C --> D["读出该组的 Tag 和 Valid bit"]
    D --> E{"Valid = 1 且<br/>Tag 匹配？"}
    E -->|"是 → HIT ✓"| F["从块中取 Block Offset 位置的字节<br/>返回给 CPU"]
    E -->|"否 → MISS ✗"| G["从下一级存储取整个块<br/>替换该行, 更新 Tag, Valid=1"]
    G --> F`},{type:`details`,summary:`直接映射 Cache 硬件结构图说明`,body:`<details>
<div class="details-body">
<p>Cache 内部存储结构：</p>
<pre><code>   Set 0: [Valid=1 | Tag=0x1234 | Data=...]
   Set 1: [Valid=0 | Tag=...    | Data=...]  ← 空
   Set 2: [Valid=1 | Tag=0xABCD | Data=...]
    ...
   Set S-1: [Valid=1 | Tag=0x5678 | Data=...]
</code></pre>
<p>对于直接映射，每组只有一行。CPU 访问时：</p>
<ol>
<li>用 Set Index 选中一行</li>
<li>检查 Valid bit（=1 表示这行有数据）</li>
<li>比较 Tag（确定是不是我要的那块数据）</li>
<li>用 Block Offset 从块中挑出正确字节</li>
</ol>
</div>
</details>`}]},{id:`s9-s6`,title:`9.5 三种 Cache Miss & 写策略`,content:[{type:`table`,headers:[],rows:[[`Miss 类型`,`中文`,`原因`,`能不能避免？`],[`Compulsory (Cold)`,`强制/冷不命中`,`这块数据第一次被访问`,`无法避免——只能通过预取减少`],[`Conflict`,`冲突不命中`,`多块内存映射到同一组，互相踢出`,`增加相联度 E`],[`Capacity`,`容量不命中`,`程序工作集超过 Cache 总容量`,`增大 Cache 或减小工作集（如分块）`]]},{type:`card`,title:`写策略——写数据时 Cache 和内存怎么同步？`,body:`<div class="card">
<table>
<tr><th></th><th>Write-through（写穿透）</th><th>Write-back（写回）</th></tr>
<tr><td><strong>写命中时</strong></td><td>同时写 Cache 和下一级存储</td><td>只写 Cache，标记 dirty=1，等被踢出时才写回下一级</td></tr>
<tr><td><strong>写不命中时</strong></td><td>No-write-allocate：直接写下一级，不调入 Cache</td><td>Write-allocate：先把块调入 Cache，再写 Cache</td></tr>
<tr><td><strong>优点</strong></td><td>实现简单，Cache 和内存总是一致</td><td>写很快（不需要每次都等慢的存储）</td></tr>
<tr><td><strong>缺点</strong></td><td>每次写都要等慢的存储→性能差</td><td>需要 dirty bit，被踢出时要写回→延迟不均匀</td></tr>
<tr><td><strong>实际使用</strong></td><td>很少单独用</td><td><strong>现代 CPU 的主流方案 ✓</strong></td></tr>
</table>
</div>`},{type:`callout`,variant:`warning`,text:`两个"搭配"不能搞混：(1) Write-back 通常搭配 Write-allocate；(2) Write-through 通常搭配 No-write-allocate。考试问"主流 CPU 用哪种"就答 Write-back + Write-allocate。`},{type:`card`,title:`平均访问时间公式`,body:`<div class="card">
<p>$\\text{平均访问时间} = \\text{命中时间} + \\text{不命中率} \\times \\text{不命中处罚}$</p>
<p><strong>例子：</strong>命中时间 1 cycle，不命中处罚 100 cycles</p>
<ul>
<li>97% 命中率：$1 + 0.03 \\times 100 = 4$ cycles</li>
<li>99% 命中率：$1 + 0.01 \\times 100 = 2$ cycles</li>
</ul>
<p><strong>命中率只差了 2 个百分点，平均访问时间差了 1 倍！</strong>这就是为什么即使很小的不命中率变化也对性能影响巨大。</p>
</div>`}]},{id:`s9-s7`,title:`9.6 动手试试——地址序列追踪（考试原题套路）`,content:[{type:`prose`,html:`<p><strong>这是考试必考题型。</strong>给你 Cache 参数和一段地址序列，让你一步步判断每次访问是 Hit 还是 Miss，最后算命中率。</p>`},{type:`card`,title:`题目：M=16字节地址空间，S=4组，E=1（直接映射），B=2字节/块`,body:`<div class="card">
<p><strong>分解：</strong>m=4位, b=1位, s=2位, t=1位</p>
<p><strong>地址序列：</strong>0, 1, 7, 8, 0</p>
<p><strong>逐步分析：</strong></p>
<table>
<tr><th>地址</th><th>二进制</th><th>Tag</th><th>Set</th><th>Offset</th><th>结果</th><th>解释</th></tr>
<tr><td>0</td><td>0000</td><td>0</td><td>00</td><td>0</td><td><span style="color:#991b1b">MISS</span></td><td>Set0 为空，装入 M[0-1], Tag=0</td></tr>
<tr><td>1</td><td>0001</td><td>0</td><td>00</td><td>1</td><td><span style="color:#065f46">HIT</span></td><td>Set0 Tag=0 Valid=1 → 命中</td></tr>
<tr><td>7</td><td>0111</td><td>0</td><td>11</td><td>1</td><td><span style="color:#991b1b">MISS</span></td><td>Set3 为空，装入 M[6-7], Tag=0</td></tr>
<tr><td>8</td><td>1000</td><td>1</td><td>00</td><td>0</td><td><span style="color:#991b1b">MISS</span></td><td>Set0 Tag=0≠1 → Conflict Miss, 替换为 M[8-9], Tag=1</td></tr>
<tr><td>0</td><td>0000</td><td>0</td><td>00</td><td>0</td><td><span style="color:#991b1b">MISS</span></td><td>Set0 Tag=1≠0 → Conflict Miss, 换回 M[0-1]</td></tr>
</table>
<p><strong>命中率 = 1/5 = 20%</strong></p>
<p>如果改成 E=2（2路组相联），Set0 可以同时装 Tag=0 和 Tag=1，地址 8 和 0 就不互相踢了 → 命中率提高到 40%。</p>
</div>`},{type:`card`,title:`矩阵乘法的 Cache 行为——高频考点`,body:`<div class="card">
<p><strong>三种循环顺序的 Cache 表现：</strong></p>
<table>
<tr><th>循环顺序</th><th>最内层访问</th><th>Misses/迭代</th><th>评价</th></tr>
<tr><td>i-j-k, j-i-k</td><td>A行(0.25)+B列(1.0)+C固定(0)</td><td>1.25</td><td>一般</td></tr>
<tr style="background:#ecfdf5;"><td><strong>k-i-j, i-k-j</strong></td><td><strong>A行(0)+B行(0.25)+C行(0.25)</strong></td><td><strong>0.5</strong></td><td><strong>最优 ✓</strong></td></tr>
<tr style="background:#fef2f2;"><td>j-k-i, k-j-i</td><td>A列(1.0)+B固定(0)+C列(1.0)</td><td>2.0</td><td>最差 ✗</td></tr>
</table>
<p><strong>记结论：让最内层循环全部"按行访问"（步长=1），miss rate 最低。</strong></p>
</div>`}]},{id:`s9-s8`,title:`9.7 与 VM 的联合——地址翻译到 Cache 的全流程`,content:[{type:`prose`,html:`<p><strong>这是期末 25 分大题的完整流程。</strong>在 VM 一章我们会详细展开，这里先画好整个"流水线"的图，做到心中有数。</p>`},{type:`mermaid`,id:`s9-vm-cache-full`,chart:`graph TD
    CPU["CPU 发出虚拟地址 VA"] --> SPLIT["分解 VA: VPN + VPO"]
    SPLIT --> TLB{"TLB 查询<br/>VPN→PPN ?"}
    TLB -->|"TLB Hit"| PPN1["获得 PPN"]
    TLB -->|"TLB Miss"| PT["查页表(在内存)"]
    PT -->|"页表命中"| PPN2["获得 PPN"]
    PT -->|"缺页"| PF["Page Fault<br/>从磁盘调页"]
    PF --> PT
    PPN1 --> PA["拼出物理地址 PA<br/>= PPN + PPO (PPO=VPO)"]
    PPN2 --> PA
    PA --> CACHDECOMP["分解 PA: CT + CI + CO"]
    CACHDECOMP --> CACHE{"Cache 查询<br/>CT/CI 匹配?"}
    CACHE -->|"Hit"| DATA["返回数据给 CPU"]
    CACHE -->|"Miss"| MEM["访问主存<br/>装入 Cache"]
    MEM --> DATA`},{type:`callout`,variant:`tip`,text:`关键记忆点：VPO = PPO（虚拟页面偏移 = 物理页面偏移，不变）。地址翻译只改变"页号"部分，页内偏移原封不动。这大大简化了地址分解。另外注意：PA 的 CO（块内偏移）就是 VPO 的低 b 位。`}]},{id:`s9-s9`,title:`9.8 考试怎么考`,content:[{type:`prose`,html:`<h4>题型与分值</h4>`},{type:`table`,headers:[],rows:[[`题型`,`分值`,`考查内容`],[`参数计算（简答）`,`3~5 分`,`给 Cache 参数求 t/s/b 位宽`],[`地址追踪`,`5~10 分`,`给地址序列，逐条判 Hit/Miss，算命中率`],[`Cache + VM 联合大题`,`20~25 分`,`给 VA, TLB, 页表, Cache —— 走完完整翻译流程，返回数据`]]},{type:`prose`,html:`<h4>得分点</h4>`},{type:`prose`,html:`<ul><li><strong>地址分解：</strong>先写 b=?, s=?, t=? —— 即使后面算错了，这三步有步骤分。</li><li><strong>逐条追踪：</strong>每步写清楚 Tag/Set/Offset 的值和判断逻辑，不要只写 H/M。</li><li><strong>联合大题：</strong>按 9.7 的流程图一步步走，每一步写结果。不会的空着也比乱写强。</li></ul>`},{type:`prose`,html:`<h4>常见错误</h4>`},{type:`callout`,variant:`danger`,text:`严重错误：C = S x E x B 是数据容量，Cache "总大小"也按这个算。地址拆分时 Tag 位数 = m - s - b，不要忘记 m 是地址总线宽度（VA 是20位就按20，PA 是16位就按16）。VA 和 PA 分别拆分！`},{type:`callout`,variant:`warning`,text:`混淆错误：替换策略（LRU/FIFO/Random）和写策略（Write-through/Write-back）是两回事。前者管"谁被踢出去"，后者管"写的时候同时写不写内存"。`}]},{id:`s9-s10`,title:`9.10 真题演练`,content:[{type:`examQuestions`,ids:[`eq-s9-1`,`eq-s9-2`]}]},{id:`s9-s11`,title:`9.11 小测验`,content:[{type:`quiz`,ids:[`q-s9-1`,`q-s9-2`]}]},{id:`s9-s-trace`,title:`9.X Cache实战三步法——从零开始拆地址`,content:[{type:`prose`,html:`<p>假设你在图书馆写论文。你面前的书桌只能放<strong>5本书</strong>（这就是 Cache），但图书馆书架上有几万本（这就是主存）。你要反复查阅几本核心参考书——如果放在桌上，伸手就能拿到（<strong>命中</strong>）；如果不在桌上，你得走去书架找，来回要花很多时间（<strong>缺失</strong>）。</p><p><strong>Cache 就是 CPU 面前的那张小书桌。</strong>CPU 的计算速度极快（不到 1ns 就能执行一条指令），但主存 DRAM 的访问速度慢 10~100 倍。没有 Cache，CPU 每取一条指令或一个数据都要等内存——就像一个每分钟能炒 10 盘菜的大厨，每次拿调料都要跑 5 分钟仓库。</p><p>这一节不讲概念，直接上手算。我们用<strong>"三步法"</strong>把任何 Cache 计算题拆成标准流程——掌握了这个套路，考试中 Cache 那部分的分就稳了。</p>`},{type:`card`,title:`核心工具：三步拆地址法`,body:`<div class="card">
<table>
<tr><th>步骤</th><th>算什么</th><th>公式</th><th>说明</th></tr>
<tr><td><strong>第1步</strong></td><td>块偏移 b</td><td>b = log₂(块大小)</td><td>块是 Cache 和内存之间搬数据的最小单位。块大小总是 2 的幂（4B/8B/16B/32B/64B）。</td></tr>
<tr><td><strong>第2步-a</strong></td><td>组数 S</td><td>S = Cache总大小 ÷ (块大小 × E路数)</td><td>E=1是直接映射，E=2/4/8是组相联，E=全部行是全相联。</td></tr>
<tr><td><strong>第2步-b</strong></td><td>组索引 s</td><td>s = log₂(S)</td><td>s 位用来定位"去哪个组找"。</td></tr>
<tr><td><strong>第3步</strong></td><td>标记位 t</td><td>t = 地址总位数 - s - b</td><td>剩下的高位全给 Tag，用来"到了组里确认是不是这块"。</td></tr>
</table>
<p style="margin-top:8px;"><strong>记忆口诀："先b再S再s，最后一减得大t"</strong></p>
<p style="margin-top:4px;"><strong>验证秘诀：</strong>算完检查 t + s + b 是否等于地址总位数。不相等就是算错了。</p>
</div>`},{type:`card`,title:`三种映射方式——用图书馆书桌比喻`,body:`<div class="card">
<p><strong>直接映射（E=1）：</strong>每本书只能放在书桌上<strong>固定位置</strong>——比如《计算机系统》只能放左上角。来了就往那个位置放，位置被占了就把旧书拿走。实现最简单，但两本热门书如果"指定"同一个位置，就会互相踢来踢去（冲突不命中高）。</p>
<p><strong>全相联（E=全部行，S=1）：</strong>书可以放在书桌<strong>任何位置</strong>——最灵活，绝对不会因为"固定位置"而打架。但找书的时候要翻遍整张桌子（同时比较所有行的 Tag），硬件太贵。一般只用在 TLB 这种条目很少（几十条）的地方。</p>
<p><strong>组相联 E 路（E=2/4/8）：</strong>把书桌分成若干"小组"，每本书可以在<strong>自己那组的 E 个位置中任选一个</strong>。这是折中方案——既有一定灵活性（减少冲突），又不用翻遍整张桌子（只需在组内比较 E 行）。现代 CPU 的 L1 Cache 通常是 8 路组相联。</p>
<p style="margin-top:8px;"><strong>一句话记忆：E=1（直接映射）最简单，E=全部（全相联）最灵活，E=2/4/8（组相联）最实用。</strong></p>
</div>`},{type:`code`,language:`text`,code:`╔══════════════════════════════════════════════════════════╗
║          Cache 手工追踪模板 —— 考试必须按这个写        ║
╚══════════════════════════════════════════════════════════╝

【假设条件】地址 8 位，Cache 32B，2 路组相联，块大小 4B

▸ 第1步——求 b：
  b = log₂(块大小) = log₂(4) = 2 位

▸ 第2步——求 S 和 s：
  S = Cache总大小 / (块大小 × E路数) = 32 / (4 × 2) = 4 组
  s = log₂(S) = log₂(4) = 2 位

▸ 第3步——求 t：
  t = 地址总位数 - s - b = 8 - 2 - 2 = 4 位

▸ 地址格式（画在草稿纸上！）：
  0b [tttt][ss][bb] = [Tag:4bit][Index:2bit][Offset:2bit]

  ┌──────────┬──────────┬──────────┐
  │ Tag:4位  │Index:2位 │Offset:2位│
  └──────────┴──────────┴──────────┘
     [7:4]      [3:2]      [1:0]


【实战：拆地址 0x5C】

  0x5C = 0b 0101 1100

           ┌──────┬────┬────┐
           │ 0101 │ 11 │ 00 │
           └──────┴────┴────┘
             Tag   Idx  Off

  偏移   = 00 (低2位)      → 块内第 0 字节
  组索引 = 11 (中间2位)    → 去第 3 组
  标记   = 0101 (高4位)    → Tag = 0x5

▸ 判断命中：
  去组 3，逐一检查组内两行的 Tag 和 Valid bit：

  ┌─────────────────────────────────────┐
  │ 路0: Valid=1, Tag=0x5 → 匹配！HIT ✓ │
  │ 路1: Valid=1, Tag=0xA → 不匹配      │
  └─────────────────────────────────────┘

  → 命中！从路 0 的块中取 offset=0 位置的字节

  如果两路都不匹配 → MISS → 从主存取整个块(4B)
  → 找组内 LRU 最老的那一路替换 → 更新 Tag → Valid=1`},{type:`details`,summary:`练习1：参数计算——某机地址32位，Cache 8KB，4路组相联，块大小16B。求b、S、s、t。`,body:`<details>
<div class="details-body">
<p><strong>题目：</strong>某机地址 32 位，Cache 8KB，4 路组相联，块大小 16B。求 b、S、s、t。</p>
<p><strong>按三步法依次求解：</strong></p>
<ol>
<li><strong>第1步——b：</strong>块大小 B = 16 = 2⁴ → <strong>b = log₂(16) = 4</strong></li>
<li><strong>第2步——S 和 s：</strong>S = C / (E × B) = 8192 / (4 × 16) = 8192 / 64 = <strong>128 组</strong><br/>s = log₂(128) = <strong>7</strong></li>
<li><strong>第3步——t：</strong>t = m - s - b = 32 - 7 - 4 = <strong>21</strong></li>
</ol>
<p><strong>答案：</strong>b = 4, S = 128 组, s = 7, t = 21</p>
<p><strong>验证：</strong>t + s + b = 21 + 7 + 4 = 32 ✓（等于地址总位数，正确）</p>
<p><strong>地址布局（从高位到低位）：</strong></p>
<pre><code>[31:11]=Tag(21位) [10:4]=Set Index(7位) [3:0]=Block Offset(4位)</code></pre>
<p style="margin-top:8px;color:var(--color-text-secondary);"><strong>易错提醒：</strong>很多人第一步就把 8KB 忘记换成字节。1KB = 1024B，8KB = 8192B。如果用 8000 去算，S 就错了。</p>
</div>
</details>`},{type:`details`,summary:`练习2：地址追踪——直接映射 Cache，5 个地址序列，判断命中/缺失`,body:`<details>
<div class="details-body">
<p><strong>题目：</strong>地址 8 位，Cache 32B，直接映射（E=1），块大小 4B。访问序列：0x00, 0x04, 0x0C, 0x20, 0x04（每次读 1 字节）。逐条判断 hit/miss，计算命中率。</p>
<p><strong>第0步——先算参数（不先算这几个数，后面全乱）：</strong></p>
<ul>
<li>B = 4 → <strong>b = 2</strong></li>
<li>S = 32 / (1 × 4) = 8 → <strong>s = 3</strong></li>
<li><strong>t = 8 - 3 - 2 = 3</strong></li>
</ul>
<p><strong>地址格式：</strong><code>[ttt][sss][bb]</code> = <code>[tag:3bit][index:3bit][offset:2bit]</code></p>
<hr/>
<p><strong>逐条追踪（考试按这个格式写）：</strong></p>
<table>
<tr><th>序号</th><th>地址</th><th>二进制</th><th>Tag</th><th>Index</th><th>Off</th><th>结果</th><th>原因</th></tr>
<tr><td>1</td><td>0x00</td><td>0000 0000</td><td>000</td><td>000</td><td>00</td><td style="color:#991b1b;font-weight:600;">MISS</td><td>Set0 为空，装入 M[0x00-0x03]，tag=000</td></tr>
<tr><td>2</td><td>0x04</td><td>0000 0100</td><td>000</td><td>001</td><td>00</td><td style="color:#991b1b;font-weight:600;">MISS</td><td>Set1 为空，装入 M[0x04-0x07]，tag=000</td></tr>
<tr><td>3</td><td>0x0C</td><td>0000 1100</td><td>000</td><td>011</td><td>00</td><td style="color:#991b1b;font-weight:600;">MISS</td><td>Set3 为空，装入 M[0x0C-0x0F]，tag=000</td></tr>
<tr><td>4</td><td>0x20</td><td>0010 0000</td><td>001</td><td>000</td><td>00</td><td style="color:#991b1b;font-weight:600;">MISS</td><td>Set0 tag=000≠001 → 冲突！替换为 M[0x20-0x23]，tag=001</td></tr>
<tr><td>5</td><td>0x04</td><td>0000 0100</td><td>000</td><td>001</td><td>00</td><td style="color:#065f46;font-weight:600;">HIT</td><td>Set1 tag=000 Valid=1 → 命中！（没有被踢掉）</td></tr>
</table>
<p><strong>命中率：1/5 = 20%</strong></p>
<hr/>
<p><strong>关键观察——为什么 0x20 踢掉了 0x00？</strong></p>
<ul>
<li>0x00 的 Index = 000（组0），0x20 的 Index 也是 000（组0）</li>
<li>直接映射每组只有 1 行，组 0 只能同时装一块</li>
<li>0x20 来了，组 0 已经有 0x00，只能踢掉——这就是<strong>冲突不命中</strong></li>
</ul>
<p><strong>如果改成 2 路组相联（E=2）：</strong></p>
<ul>
<li>组 0 有两行，0x00 和 0x20 可以<strong>并存</strong></li>
<li>第 5 次访问 0x00 也会命中（不会被 0x20 踢掉）</li>
<li>命中率从 20% → <strong>40%</strong></li>
</ul>
<p style="margin-top:8px;color:var(--color-accent);"><strong>核心结论：增加相联度 E → 减少冲突不命中 → 提高命中率。代价是硬件更复杂、更贵。</strong></p>
</div>
</details>`},{type:`callout`,variant:`warning`,text:`陷阱一：进制不一致。考试最坑的地方——题目可能给你十进制地址（如 128），但 Cache 参数是十六进制的（如 Cache 大小 0x2000）。第一步必须把所有地址统一转成二进制再切字段！用二进制做"中间语言"最不容易出错。十进制的 128 = 0x80 = 0b 1000 0000，别在十进制下心算位宽。`},{type:`callout`,variant:`warning`,text:`陷阱二：LRU 替换规则。组相联 Cache 缺失时，找组内"最久没有被访问过"的那一行踢出去——不是随便选、不是踢 Tag 最大的、也不是踢最后访问的那一行。考试会给访问时间戳或使用顺序表，按"谁的最后一次访问时间最早"来判断踢谁。实战中画一个访问时间线，每次访问后更新对应行的时间戳。`},{type:`callout`,variant:`danger`,text:`陷阱三：忘记检查 Valid bit。即使 Tag 匹配，Valid=0 也算 MISS！Cache 刚上电时所有行的 Valid=0（空），Tag 是随机值。很多同学看到 Tag 碰巧对了就直接写 HIT——错了。必须先确认 Valid=1，再比较 Tag。命中条件 = (Valid=1) AND (Tag匹配)，两个条件缺一不可。`}]}]};export{e as default};