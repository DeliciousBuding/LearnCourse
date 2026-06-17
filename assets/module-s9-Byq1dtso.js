var e={meta:{id:`s9`,number:9,title:`机器学习`,icon:`Cpu`,courseware:`13 从 NLP 到 LLM.pptx`,examRefs:`2025 期末简答题`},calloutText:`这章解决什么问题？让计算机从一堆例子中自己"总结规律"，而不是我们一条一条告诉它规则。就像你看了 100 封垃圾邮件，自然就知道垃圾邮件长什么样——机器学习做的就是这件事。`,sections:[{id:`s9-s2`,title:`9.1 先理解直觉`,content:[{type:`prose`,html:`<p>假如你去水果店，老板给了你一堆水果，让你分类哪些是苹果、哪些是橘子。你可以看颜色（红/橙），摸硬度（硬/软），闻气味。每次做对或做错，老板会告诉你"对了"或"不对"，你就慢慢学会了。</p>`},{type:`prose`,html:`<ul>
<li><strong>监督学习</strong>就像老板每次都告诉你正确答案——你有标签。</li>
<li><strong>无监督学习</strong>就像老板什么都没说，让你自己把相似的水果放在一起——你没标签，只能自己找规律。</li>
<li><strong>半监督学习</strong>就像老板只告诉你其中几个是苹果，大部分没说——你用已知的去推测未知的。</li>
<li><strong>强化学习</strong>就像你做对了动作老板给零食，做错了罚站——你通过奖惩信号学习。</li>
</ul>`}]},{id:`s9-s3`,title:`9.2 核心概念`,content:[{type:`prose`,html:`<p><strong>ML 四种类型（2025 期末 9 分，真题直接考了）</strong></p>`},{type:`table`,headers:[],rows:[[`类型`,`数据`,`真实例子`],[`监督学习`,`有标签 (x, y)`,`给你 1000 封邮件，每封都标了"垃圾"或"正常"，训练分类器`],[`无监督学习`,`无标签 (只有 x)`,`给你 10 万条用户购物记录，自动把用户分成"学生党""上班族""宝妈"几类`],[`半监督学习`,`少量标签 + 大量无标签`,`标注了 100 张猫图，还有 10 万张未标注图，让模型自己利用未标注数据提高准确率`],[`强化学习`,`奖励信号`,`AlphaGo 下围棋：赢了 +1，输了 -1，自己跟自己下几百万盘学会的`]]},{type:`prose`,html:`<p><strong>信息熵 —— "一堆东西有多乱？"</strong></p>`},{type:`prose`,html:`<p>想象你有一袋水果：全是苹果（纯的），熵 = 0；一半苹果一半橘子（最乱的），熵最大。</p>`},{type:`code`,language:``,code:`信息熵公式：H(D) = — Σ pk × log₂(pk)

例子：10 个水果，7 个苹果 3 个橘子
H = —(0.7 × log₂(0.7) + 0.3 × log₂(0.3))
  = —(0.7 × (—0.5146) + 0.3 × (—1.7370))
  = —(—0.3602 — 0.5211)
  = 0.8813

极端情况：
  全苹果（10正0负）：H = —(1 × log₂1 + 0) = —(1×0 + 0) = 0 ✓ 纯的
  各一半（5正5负）：H = —(0.5×(—1) + 0.5×(—1)) = 1.0 ✓ 最乱`},{type:`prose`,html:`<p><strong>信息增益 —— "按这个属性分类能减少多少混乱？"</strong></p>`},{type:`code`,language:``,code:`Gain(D, A) = H(D) — Σ (|Dv| / |D|) × H(Dv)
             总混乱   —  分完后的混乱（加权平均）`},{type:`prose`,html:`<p>直觉：如果按"颜色"分完后，每一堆都是纯的（只有一种水果），那 Gain 最大。如果按"重量"分完每堆还是乱糟糟的，Gain 接近 0。</p>`},{type:`callout`,variant:`tip`,text:`考试心法：决策树就是不断选 Gain 最大的属性来划分。谁分完最"纯"，就先用谁做节点。走到叶子（都纯了）就停。`}]},{id:`s9-s4`,title:`9.3 动手试试 —— 完整决策树推演`,content:[{type:`prose`,html:`<p><strong>以 2025 期末贷款审批为例：14 个样本（9 个批准 ✓，5 个拒绝 ✗）</strong></p>`},{type:`prose`,html:`<p><strong>第 1 步：算总熵</strong></p>`},{type:`code`,language:``,code:`H(D) = —(9/14 × log₂(9/14) + 5/14 × log₂(5/14))
     = —(0.6429 × log₂(0.6429) + 0.3571 × log₂(0.3571))
     = —(0.6429 × (—0.6374) + 0.3571 × (—1.4854))
     = —(—0.4098 — 0.5305)
     = 0.9403`},{type:`prose`,html:`<p><strong>第 2 步：分别按四个属性划分，算 Gain</strong></p>`},{type:`details`,summary:`按"年龄"划分：{不到20, 20~30, 超过30}`,body:`<d\betails>

<div class="d\betails-body">
<table>
<tbody><tr><th>分组</th><th>样本数</th><th>批准</th><th>拒绝</th><th>该组熵</th></tr>
<tr><td>不到20</td><td>5</td><td>2</td><td>3</td><td>—(2/5·log₂(2/5) + 3/5·log₂(3/5)) = 0.9710</td></tr>
<tr><td>20~30</td><td>5</td><td>5</td><td>0</td><td>—(1·log₂1 + 0) = <strong>0</strong>（纯的！）</td></tr>
<tr><td>超过30</td><td>4</td><td>2</td><td>2</td><td>—(0.5·log₂(0.5) + 0.5·log₂(0.5)) = 1.0</td></tr>
</tbody></table>
<div class="code-block">H(D|年龄) = (5/14)×0.9710 + (5/14)×0 + (4/14)×1.0
          = 0.3468 + 0 + 0.2857
          = 0.6325

Gain(D, 年龄) = 0.9403 — 0.6325 = <strong>0.3078</strong></div>
</div>
</d\betails>`},{type:`details`,summary:`按"银行流水"划分：{高, 中, 低}`,body:`<d\betails>

<div class="d\betails-body">
<table>
<tbody><tr><th>分组</th><th>样本数</th><th>批准</th><th>拒绝</th><th>该组熵</th></tr>
<tr><td>高</td><td>6</td><td>6</td><td>0</td><td><strong>0</strong>（纯的！）</td></tr>
<tr><td>中</td><td>5</td><td>2</td><td>3</td><td>—(2/5·log₂(2/5) + 3/5·log₂(3/5)) = 0.9710</td></tr>
<tr><td>低</td><td>3</td><td>1</td><td>2</td><td>—(1/3·log₂(1/3) + 2/3·log₂(2/3)) = 0.9183</td></tr>
</tbody></table>
<div class="code-block">H(D|流水) = (6/14)×0 + (5/14)×0.9710 + (3/14)×0.9183
          = 0 + 0.3468 + 0.1968
          = 0.5436

Gain(D, 流水) = 0.9403 — 0.5436 = <strong>0.3967</strong></div>
<div class="callout callout--warn"><strong>注意：</strong>"高流水"那一组是纯的（全批准），贡献 0 熵，信息增益飙升！这就是为什么银行流水成了根节点。</div>
</div>
</d\betails>`},{type:`details`,summary:`按"是否结婚"划分：{是, 否}`,body:`<d\betails>

<div class="d\betails-body">
<div class="code-block">结婚组 6 人：4批准 2拒绝 → H = —(4/6·log₂(4/6) + 2/6·log₂(2/6)) = 0.9183
未婚组 8 人：5批准 3拒绝 → H = —(5/8·log₂(5/8) + 3/8·log₂(3/8)) = 0.9544

H(D|结婚) = (6/14)×0.9183 + (8/14)×0.9544
          = 0.3936 + 0.5454
          = 0.9390

Gain(D, 结婚) = 0.9403 — 0.9390 = <strong>0.0013</strong> ← 几乎没减少混乱！</div>
</div>
</d\betails>`},{type:`details`,summary:`按"是否拥有房产"划分：{有, 无}`,body:`<d\betails>

<div class="d\betails-body">
<div class="code-block">有房 5 人：4批准 1拒绝 → H = —(4/5·log₂(4/5) + 1/5·log₂(1/5)) = 0.7219
无房 9 人：5批准 4拒绝 → H = —(5/9·log₂(5/9) + 4/9·log₂(4/9)) = 0.9911

H(D|房产) = (5/14)×0.7219 + (9/14)×0.9911
          = 0.2578 + 0.6371
          = 0.8949

Gain(D, 房产) = 0.9403 — 0.8949 = <strong>0.0454</strong></div>
</div>
</d\betails>`},{type:`prose`,html:`<p><strong>第 3 步：多属性 Gain 对比 —— 选根节点</strong></p>`},{type:`table`,headers:[],rows:[[`属性`,`Gain`,`排名`],[`银行流水`,`0.3967`,`🥇 根节点`],[`年龄`,`0.3078`,`🥈`],[`是否拥有房产`,`0.0454`,`🥉`],[`是否结婚`,`0.0013`,`❌ 几乎无用`]]},{type:`prose`,html:`<p><strong>第 4 步：决策树可视化</strong></p>`},{type:`mermaid`,id:`m-fbv6gu`,chart:`graph TD
    Flow["银行流水 (Gain=0.397)"] -->|高| A1["批准 (纯)"]
    Flow -->|中| Age["年龄 (Gain=0.308)"]
    Flow -->|低| R1["拒绝"]
    Age -->|不到20| House["房产"]
    Age -->|20到30| A2["批准 (纯)"]
    Age -->|超过30| Married["结婚"]
    House -->|有| A3["批准"]
    House -->|无| R2["拒绝"]
    Married -->|是| R3["拒绝"]
    Married -->|否| A4["批准"]`},{type:`callout`,variant:`tip`,text:`注意：考试中关键步骤是把根节点选对——所有候选属性的 Gain 算出来、排大小、选最大。子节点递归同理，每一步都选当前 Gain 最大的。`}]},{id:`s9-s5`,title:`9.4 考试怎么考`,content:[{type:`prose`,html:`<p style="margin-top:var(--space-8)"><strong>朴素贝叶斯 —— "数出来的概率"</strong></p>`},{type:`prose`,html:`<p>直觉：你是动物学家，翻了一本动物图鉴。现在看到一只是陆生、胎生的动物，你要猜它是哺乳动物还是爬行动物。朴素贝叶斯的做法超简单：<strong>从数据表里数</strong>——有多少哺乳动物是陆生的？多少是胎生的？然后乘起来比较。</p>`}]},{id:`s9-s6`,title:`9.5 动手试试 —— 完整朴素贝叶斯推演`,content:[{type:`prose`,html:`<p><strong>2023 期末真题：动物分类</strong></p>`},{type:`prose`,html:`<p>假设有 10 个动物样本：</p>`},{type:`table`,headers:[],rows:[[`动物`,`栖息地`,`繁殖方式`,`类别`],[`猫`,`陆地 Land`,`胎生 Yes`,`哺乳 +`],[`狗`,`陆地 Land`,`胎生 Yes`,`哺乳 +`],[`人`,`陆地 Land`,`胎生 Yes`,`哺乳 +`],[`鲸`,`水域 Water`,`胎生 Yes`,`哺乳 +`],[`蝙蝠`,`天空 Air`,`胎生 Yes`,`哺乳 +`],[`蛇`,`陆地 Land`,`卵生 No`,`爬行 —`],[`蜥蜴`,`陆地 Land`,`卵生 No`,`爬行 —`],[`鳄鱼`,`水域 Water`,`卵生 No`,`爬行 —`],[`龟`,`陆地 Land`,`卵生 No`,`爬行 —`],[`鸟`,`天空 Air`,`卵生 No`,`爬行 —`]]},{type:`prose`,html:`<p><strong>问题：一个动物栖息地是 Land、繁殖方式是 Yes（胎生），它是哺乳动物 (+) 还是爬行动物 (—)？</strong></p>`},{type:`prose`,html:`<p><strong>步骤 1：数先验概率 P(类别)</strong></p>`},{type:`code`,language:``,code:`10 个样本中：哺乳 (+) 共 5 个，爬行 (—) 共 5 个
P(+) = 5/10 = 0.5
P(—) = 5/10 = 0.5`},{type:`prose`,html:`<p><strong>步骤 2：数条件概率 —— 这就是朴素贝叶斯的核心！</strong></p>`},{type:`code`,language:``,code:`在 5 个哺乳动物 (+) 中：
  栖息地 = Land 的有几个？猫、狗、人 → 3 个 → P(Land | +) = 3/5 = 0.6
  繁殖方式 = Yes 的有几个？猫、狗、人、鲸、蝙蝠 → 5 个 → P(Yes | +) = 5/5 = 1.0

在 5 个爬行动物 (—) 中：
  栖息地 = Land 的有几个？蛇、蜥蜴、龟 → 3 个 → P(Land | —) = 3/5 = 0.6
  繁殖方式 = Yes 的有几个？没有 → 0 个 → P(Yes | —) = 0/5 = 0`},{type:`callout`,variant:`danger`,text:`零概率问题：如果某类中 P(特征|类别) = 0，乘完整个概率就归零了！考试中通常不做拉普拉斯平滑，直接写 0。但你要知道实际应用会用 Laplace 平滑（每项 +1）避免零概率。`},{type:`prose`,html:`<p><strong>步骤 3：乘起来比较</strong></p>`},{type:`code`,language:``,code:`P(+ | Land, Yes) ∝ P(Land | +) × P(Yes | +) × P(+)
                 = 0.6 × 1.0 × 0.5
                 = 0.30

P(— | Land, Yes) ∝ P(Land | —) × P(Yes | —) × P(—)
                 = 0.6 × 0 × 0.5
                 = 0

结论：0.30 > 0 → 预测为 哺乳动物 ✓`},{type:`callout`,variant:`tip`,text:`不用归一化：考试中朴素贝叶斯只需比较"未归一化乘积"的大小。谁大就归谁。公式：P(类别|特征) ∝ P(特征₁|类别) × P(特征₂|类别) × P(类别)。`}]},{id:`s9-s7`,title:`9.6 考试怎么考`,content:[{type:`prose`,html:`<h4>考试题型与分值</h4>`},{type:`table`,headers:[],rows:[[`题型`,`分值`,`考察点`],[`信息熵 / 信息增益计算`,`8-12 分（大题）`,`给数据集，算熵、条件熵、信息增益，排序选根节点`],[`决策树画图`,`包含在大题中`,`根据 Gain 排序结果画出完整决策树`],[`朴素贝叶斯分类`,`5-8 分（大题）`,`给样本表，数条件概率，乘起来比较，判定类别`],[`ML 四种类型`,`3-5 分（简答）`,`监督/无监督/半监督/强化的定义和例子`]]},{type:`prose`,html:`<h4>得分点</h4>`},{type:`prose`,html:`<ul>
<li>熵公式 $H = -\\Sigma p_k \\log_2 p_k$ 写对就有分，哪怕后续算错</li>
<li>信息增益步骤完整：总熵 → 每个属性的条件熵 → Gain = 总熵 − 条件熵 → 排序</li>
<li>决策树根节点选对（Gain 最大的属性），子节点递归正确</li>
<li>朴素贝叶斯：P(特征|类别) 从表格里数对，乘积式子列出来，比大小即可（不需要归一化）</li>
<li>ML 分类简答：四种类型各一句话 + 一个例子</li>
</ul>`},{type:`prose`,html:`<h4>常见错误</h4>`},{type:`callout`,variant:`danger`,text:`熵计算时忘记负号 — 正确的熵一定是非负的，如果算出负值立刻检查！$\\log_2(1)=0$ 不是 1。计算器不熟的同学考前练 3 次。`},{type:`callout`,variant:`danger`,text:`信息增益 ≠ 条件熵。Gain = H(D) − H(D|A)，减号不能忘。很多人算完条件熵就停了，丢一半分。`},{type:`callout`,variant:`danger`,text:`朴素贝叶斯忘记乘先验 P(类别)。只乘 P(特征|类别) 忘了 P(类别)，乘积少了因子。`},{type:`callout`,variant:`danger`,text:`决策树递归时只在当前子集上算熵 — 不要把整个数据集再算一遍。每个分支只看走到那个分支的样本。`},{type:`prose`,html:`<h4>答题模板</h4>`},{type:`card`,title:`信息增益 + 决策树 答题步骤`,body:`<div class="card">

<p><strong>Step 1：</strong>写总熵公式并代入数字 → $H(D) = -\\frac{9}{14}\\log_2\\frac{9}{14} - \\frac{5}{14}\\log_2\\frac{5}{14} = 0.940$</p>
<p><strong>Step 2：</strong>对每个属性 $A_i$，分组统计每组的正负样本数，算每组的熵</p>
<p><strong>Step 3：</strong>$H(D|A_i) = \\sum \\frac{|D_v|}{|D|} \\times H(D_v)$，加权求和</p>
<p><strong>Step 4：</strong>$\\text{Gain}(D, A_i) = H(D) - H(D|A_i)$</p>
<p><strong>Step 5：</strong>列出所有 Gain 值的对比表，选最大 Gain 的属性做根节点</p>
<p><strong>Step 6：</strong>在分支子集上递归重复 Step 1-5，直到叶子全纯或属性用完</p>
<p><strong>Step 7：</strong>画决策树（根节点 → 分支 → 子节点 → ... → 叶节点标类别）</p>
</div>`},{type:`card`,title:`朴素贝叶斯 答题步骤`,body:`<div class="card">

<p><strong>Step 1：</strong>从表格数先验：$P(C_k) = \\frac{|\\text{类别}C_k\\text{的样本数}|}{|\\text{总样本数}|}$</p>
<p><strong>Step 2：</strong>对每个特征 $x_j$，在每个类别下数条件概率：$P(x_j|C_k) = \\frac{|\\text{类别}C_k\\text{中}x_j\\text{出现的次数}|}{|\\text{类别}C_k\\text{的样本数}|}$</p>
<p><strong>Step 3：</strong>对每个类别，写出乘积式：$P(C_k|\\mathbf{x}) \\propto P(C_k) \\times \\prod_j P(x_j|C_k)$</p>
<p><strong>Step 4：</strong>比较各类别的乘积值，取最大的 → 预测为该类别</p>
<p><strong>注意：</strong>不需要除以 $P(\\mathbf{x})$，因为比较时它是一样的。</p>
</div>`}]},{id:`s9-s8`,title:`9.7 真题演练`,content:[{type:`examQuestions`,ids:[`eq-s9-25`,`eq-s9-26`]}]},{id:`s9-s9`,title:`9.8 小测验`,content:[{type:`quiz`,ids:[`q-s9-21`,`q-s9-22`]}]}]};export{e as default};