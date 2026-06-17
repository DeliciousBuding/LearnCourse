var e={meta:{id:`s11`,number:11,title:`性能优化`,icon:`Zap`,courseware:`11 性能优化.pptx`,examRefs:`分析题 ~5分`},calloutText:`这章解决什么问题？代码写对了，但跑得太慢。怎么不换硬件就让程序快几倍？答案是对 Cache 友好、减少循环开销、利用 CPU 的指令级并行能力。这一章是 Cache 知识的直接应用。`,sections:[{id:`s11-s1`,title:`11.0 本章在考试中的位置`,content:[{type:`prose`,html:`<p style="color:var(--color-text-secondary);font-size:var(--text-sm)">课件：第27-28讲 · 分析题小问 ~5分 · 和 Cache 局部性紧密相关 · 常和链接/信号一起出在分析题中</p>`},{type:`callout`,variant:`tip`,text:`这一章不算重头戏，但"给一段代码让你优化"是分析题里的经典小问。记住三个大招：循环展开、减少函数调用、分块/缓存优化。看完这章你就能秒杀这5分。`}]},{id:`s11-s2`,title:`11.1 先理解直觉——为什么同样的结果，有的代码快10倍？`,content:[{type:`prose`,html:`<p>想象你在抄写一篇文章。一种抄法是看一个字写一个字；另一种是看一句话默记下来再写一整句。显然后者更快——因为你减少了"抬头看原文"的次数。</p>`},{type:`prose`,html:`<p>计算机也一样。性能优化就是减少"不必要的开销"：</p><ul><li><strong>循环开销：</strong>每次循环都要比较 i < n、跳转。如果循环体本身很简单（比如只做一次加法），这些开销占比很大。</li><li><strong>Cache Miss：</strong>数据不在 Cache 里，要等几百个周期从内存取。</li><li><strong>函数调用开销：</strong>call/ret 需要压栈、跳转、建立栈帧——如果函数体就一行，纯浪费。</li></ul>`},{type:`prose`,html:`<p><strong>优化的三个方向：</strong>(1) 减少循环开销 (2) 提高 Cache 命中率 (3) 利用指令级并行。下面一个一个讲。</p>`}]},{id:`s11-s3`,title:`11.2 循环展开（Loop Unrolling）`,content:[{type:`card`,title:`核心思想`,body:`<div class="card">
<p>把循环体复制多次，每次迭代多干几份活。这样：</p>
<ul>
<li>比较 i &lt; n 的次数减少（原来 n 次，现在 n/4 次）</li>
<li>跳转指令 break 减少</li>
<li>给 CPU 更多"连续的操作"，让流水线更饱满</li>
</ul>
</div>`},{type:`code`,language:`c`,code:`// 展开前：n 次循环，n 次比较，n 次跳转
for (int i = 0; i < n; i++)
    sum += a[i];

// 展开 4 次：约 n/4 次循环
// 上限写法保证不越界（n 可能不是 4 的倍数）
int i;
for (i = 0; i < n - 3; i += 4) {
    sum += a[i];
    sum += a[i+1];
    sum += a[i+2];
    sum += a[i+3];
}
// 处理尾部：剩下的不到 4 个元素
for (; i < n; i++)
    sum += a[i];`},{type:`prose`,html:`<p><strong>能快多少？</strong>对简单运算（如求和），展开 4 次能减少约 75% 的循环控制开销。但如果循环体本身就很重（如做复杂运算），循环开销占比小，展开效果就不明显。</p>`},{type:`mermaid`,id:`s11-loop-unroll-compare`,chart:`graph LR
    subgraph "展开前：每次迭代只干 1 份活"
        A1["i=0: sum+=a[0]; i++; cmp i&lt;n; jmp"] --> A2["i=1: sum+=a[1]; i++; cmp i&lt;n; jmp"]
        A2 --> A3["i=2: sum+=a[2]; i++; cmp i&lt;n; jmp"]
        A3 --> A4["... 共 n 次循环 · n 次比较 · n 次跳转"]
    end
    subgraph "展开 4 次：每次迭代干 4 份活"
        B1["i=0: sum+=a[0]+a[1]+a[2]+a[3]; i+=4; cmp i&lt;n; jmp"] --> B2["i=4: sum+=a[4]+a[5]+a[6]+a[7]; i+=4; cmp i&lt;n; jmp"]
        B2 --> B3["... 仅 n/4 次循环 · n/4 次比较 · n/4 次跳转"]
    end
    A1 -.->|"比较/跳转减少 75%"| B1
    style A1 fill:#fee2e2,stroke:#dc2626
    style A2 fill:#fee2e2,stroke:#dc2626
    style A3 fill:#fee2e2,stroke:#dc2626
    style A4 fill:#fee2e2,stroke:#dc2626
    style B1 fill:#d1fae5,stroke:#059669
    style B2 fill:#d1fae5,stroke:#059669
    style B3 fill:#d1fae5,stroke:#059669`}]},{id:`s11-s4`,title:`11.3 分块/平铺（Blocking/Tiling）——让 Cache 高兴`,content:[{type:`prose`,html:`<p>这是<strong>矩阵运算的终极优化</strong>，也是 Cache 知识最直接的应用。</p>`},{type:`card`,title:`分块的核心思想`,body:`<div class="card">
<p><strong>问题：</strong>大矩阵乘法 C = A x B，三个矩阵都很大，Cache 装不下。每次访问 B 的一列时都 Cache Miss。</p>
<p><strong>解法：</strong>把大矩阵切成小块，每次只算一个小块的结果。让小块完全放进 Cache。</p>
<p><strong>条件：</strong>$3B^2 < C$（三个子块能同时放入 Cache）。其中 B 是子块边长（元素数），C 是 Cache 大小。</p>
</div>`},{type:`code`,language:`c`,code:`// 分块矩阵乘法
// B = 块大小（如 B=32 对大多数 L1 Cache 合适）
for (int ii = 0; ii < N; ii += B)
    for (int jj = 0; jj < N; jj += B)
        for (int kk = 0; kk < N; kk += B)
            // 小块乘法——小块能放进 Cache
            for (int i = ii; i < min(ii+B, N); i++)
                for (int j = jj; j < min(jj+B, N); j++) {
                    int sum = 0;
                    for (int k = kk; k < min(kk+B, N); k++)
                        sum += A[i][k] * B[k][j];
                    C[i][j] += sum;
                }`},{type:`card`,title:`分块效果分析`,body:`<div class="card">
<p><strong>不分块（k-i-j 顺序，已经是较优的）：</strong></p>
<p>$\\text{不命中率} \\approx \\frac{9}{8} \\times n^3$ 次不命中</p>
<p><strong>分块（块大小 B）：</strong></p>
<p>$\\text{不命中率} \\approx \\frac{n^3}{4B}$ 次不命中</p>
<p><strong>当 B=32 时：</strong>不命中减少到原来的 $\\frac{1}{4 \\times 32} / \\frac{9}{8} \\approx \\frac{1}{18}$——将近 <strong>18 倍的提升</strong>！</p>
</div>`},{type:`callout`,variant:`warning`,text:`分块的前提是 3B^2 < C（三个矩阵的子块都能放进 Cache）。如果 B 太大，子块本身都装不下，分块反而更慢。实际中 B 通常取 32~64。`}]},{id:`s11-s5`,title:`11.4 减少函数调用 & 其他技巧`,content:[{type:`card`,title:`减少函数调用`,body:`<div class="card">
<p><strong>问题：</strong>每次函数调用有 call/ret 压栈、参数传递、建立栈帧的开销。如果函数体只有一个简单运算——调用开销比运算本身还大。</p>
<p><strong>对策：</strong></p>
<ul>
<li>简单函数用 <strong>inline</strong>（内联展开到调用处）</li>
<li>循环内不要反复调用同一函数——把结果缓存到变量</li>
</ul>
<pre><code>// 坏：每次循环调 strlen
for (int i = 0; i &lt; strlen(s); i++)
    ...

// 好：strlen 只调一次
int len = strlen(s);
for (int i = 0; i &lt; len; i++)
    ...</code></pre>
</div>`},{type:`card`,title:`其他常用优化技巧`,body:`<div class="card">
<ul>
<li><strong>强度削弱：</strong>用加法替代乘法（如 i*8 → i&lt;&lt;3）。但现代编译器通常自动做。</li>
<li><strong>公共子表达式消除：</strong>多次出现的同样计算只算一次。</li>
<li><strong>减少内存访问：</strong>把循环中反复读写的内存值放到局部变量（寄存器）。</li>
<li><strong>分支预测友好：</strong>让 if 条件在大多数情况下走同一分支。</li>
</ul>
</div>`}]},{id:`s11-s6`,title:`11.5 考试怎么考 & 答题模板`,content:[{type:`prose`,html:`<h4>典型考题</h4>`},{type:`prose`,html:`<p>给你一段代码（通常是循环或数组操作），问"如何优化，为什么能提高性能？"（如 2025 期末分析题第5小问）。</p>`},{type:`prose`,html:`<h4>答题模板</h4>`},{type:`code`,language:``,code:`【优化题答题模板】
1. 指出原代码的问题：[循环控制开销大 / Cache局部性差 / 重复函数调用 / ...]
2. 提出具体优化方案：
   - 循环展开：[展开 N 次] → 减少比较/跳转次数
   - 分块：[将矩阵切成 BxB 的子块] → 提高 Cache 命中率
   - 减少函数调用：[把 strlen 提到循环外] → 消除重复调用
3. 说明优化原理：关联到 Cache 局部性 / 循环开销 / CPU 流水线
4. （如有）提及约束条件：[如分块要求 3B^2 < C]`},{type:`callout`,variant:`tip`,text:`这题是送分题——只要你能把优化方案关联到"Cache局部性"或"减少循环开销"就有分。不需要写完整代码，用文字描述清楚即可。`}]},{id:`s11-s7`,title:`11.7 真题演练`,content:[{type:`examQuestions`,ids:[`eq-s11-1`,`eq-s11-2`]}]},{id:`s11-s8`,title:`11.8 小测验`,content:[{type:`quiz`,ids:[`q-s11-1`,`q-s11-2`]}]}]};export{e as default};