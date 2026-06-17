import type { ExamQuestion } from '@learncourse/framework/types';

export const S11_SIM_QUESTIONS: ExamQuestion[] = [
  {
    id: "sim-s11-1",
    moduleId: "s11",
    year: "模拟题",
    position: "自编",
    points: 12,
    questionText: "<p><strong>题目：</strong>某CNN用于32×32 RGB图像分类，网络结构如下：</p><ul><li><strong>C1：</strong>卷积层，6个5×5卷积核，步长S=1，padding P=0</li><li><strong>S2：</strong>最大池化层，窗口2×2，步长S=2</li><li><strong>C3：</strong>卷积层，16个5×5卷积核，步长S=1，padding P=0</li><li><strong>S4：</strong>最大池化层，窗口2×2，步长S=2</li><li><strong>C5：</strong>全连接层，120个神经元</li><li><strong>F6：</strong>全连接层，84个神经元</li><li><strong>Output：</strong>全连接层，10个神经元 + Softmax</li></ul><p>请回答：(1) 计算每层（C1/S2/C3/S4）输出特征图的空间尺寸和通道数（4分）；(2) 计算C1、C3、C5、F6、Output各层的可训练参数数量（含偏置）（6分）；(3) 指出参数量最大的层并解释原因（2分）。</p>",
    answerHtml: "<p><strong>(1) 各层输出尺寸（4分）：</strong></p><table><tbody><tr><th>层</th><th>类型</th><th>输入尺寸</th><th>输出尺寸</th><th>公式</th></tr><tr><td>C1</td><td>Conv</td><td>32×32×3</td><td><strong>28×28×6</strong></td><td>(32-5)/1+1=28</td></tr><tr><td>S2</td><td>MaxPool</td><td>28×28×6</td><td><strong>14×14×6</strong></td><td>(28-2)/2+1=14</td></tr><tr><td>C3</td><td>Conv</td><td>14×14×6</td><td><strong>10×10×16</strong></td><td>(14-5)/1+1=10</td></tr><tr><td>S4</td><td>MaxPool</td><td>10×10×16</td><td><strong>5×5×16</strong></td><td>(10-2)/2+1=5</td></tr></tbody></table><p><strong>(2) 各层参数量（6分）：</strong></p><table><tbody><tr><th>层</th><th>类型</th><th>权重参数</th><th>偏置</th><th>合计</th><th>计算公式</th></tr><tr><td>C1</td><td>Conv</td><td>450</td><td>6</td><td><strong>456</strong></td><td>5×5×3×6 + 6</td></tr><tr><td>S2</td><td>Pool</td><td>—</td><td>—</td><td><strong>0</strong></td><td>池化层无可训练参数</td></tr><tr><td>C3</td><td>Conv</td><td>2400</td><td>16</td><td><strong>2416</strong></td><td>5×5×6×16 + 16</td></tr><tr><td>S4</td><td>Pool</td><td>—</td><td>—</td><td><strong>0</strong></td><td>池化层无可训练参数</td></tr><tr><td>C5</td><td>FC</td><td>48000</td><td>120</td><td><strong>48120</strong></td><td>400×120 + 120（展平后400=5×5×16）</td></tr><tr><td>F6</td><td>FC</td><td>10080</td><td>84</td><td><strong>10164</strong></td><td>120×84 + 84</td></tr><tr><td>Output</td><td>FC</td><td>840</td><td>10</td><td><strong>850</strong></td><td>84×10 + 10</td></tr></tbody></table><p><strong>总参数约 62,006 个。</strong></p><p><strong>(3) 参数量最大的是C5（第一个全连接层），共48,120个参数（2分）</strong>。原因：S4展平后得到400维向量，全连接到120个神经元需要400×120=48,000个权重，远超卷积层的参数量。这体现了CNN设计的核心策略——前期用卷积的「局部连接+参数共享」压缩参数量，全连接层集中了大部分参数但只在网络末端出现。评分要点：尺寸公式写对每条1分；参数计算每层1分（公式+结果都对才给分）；指出C5并解释清楚各1分。</p>"
  },
  {
    id: "sim-s11-2",
    moduleId: "s11",
    year: "模拟题",
    position: "自编",
    points: 10,
    questionText: "<p><strong>题目：</strong>请描述LeNet-5风格的CNN流水线（Pipeline），按顺序说明每一层/每一组操作的作用，并解释CNN相比全连接网络在处理图像时的两大核心优势——「局部连接」（Local Connectivity）和「参数共享」（Parameter Sharing）——各自的含义与收益。</p>",
    answerHtml: "<p><strong>一、LeNet-5风格CNN流水线（6分，每层1分）：</strong></p><p><strong>① 输入层：</strong>接收原始图像（如32×32灰度图或RGB图）。</p><p><strong>② 卷积层（Conv）：</strong>用多个可学习的卷积核（filter）在输入上滑动，每个核提取一种局部特征（如边缘、纹理、角点）。输出多通道特征图（Feature Map）。卷积核的参数通过反向传播学习。</p><p><strong>③ 激活函数（ReLU）：</strong>对卷积输出逐元素应用f(x)=max(0,x)，引入非线性。没有激活函数，多层卷积退化为单层线性变换。ReLU相比Sigmoid缓解了梯度消失问题。</p><p><strong>④ 池化层（Pooling）：</strong>对特征图降采样（如2×2窗口取最大值），缩小空间尺寸。作用：降低计算量、扩大后续层的感受野、提供局部平移不变性、抑制过拟合。常用最大池化（Max Pooling）取窗口最强信号。</p><p><strong>⑤ 全连接层（FC）：</strong>将最后一个池化层的输出展平（Flatten）为一维向量，通过若干全连接层进行高层语义组合。最后一个全连接层输出各类别的logit值。</p><p><strong>⑥ Softmax层：</strong>将logit向量转换为概率分布（各分量∈(0,1)，和为1），输出各类别的预测概率。</p><p><strong>二、两大核心优势（4分，各2分）：</strong></p><p><strong>局部连接（Local Connectivity）：</strong>卷积层的每个神经元只连接到输入的一个局部区域（即卷积核覆盖的窗口），而非输入的所有像素。收益：(1)符合图像的局部相关性先验——相邻像素关联强，远距离像素关联弱；(2)极大减少连接数——一个28×28特征图上的神经元只需连接3×3=9个输入像素，而非整个输入的1024个像素。</p><p><strong>参数共享（Parameter Sharing）：</strong>同一个卷积核在所有空间位置使用同一组权重。收益：(1)参数量与输入尺寸解耦——一个3×3卷积核始终只有9个参数，无论输入是32×32还是256×256；(2)赋予网络平移等变性——同一个特征检测器对所有位置一视同仁，无论边缘出现在哪里都能被同一个核检测到。对比：若用全连接处理32×32×3图像到28×28×6特征图，需要(32×32×3)×(28×28×6)≈1,400万个参数；而卷积层仅需5×5×3×6+6=456个参数。</p><p><strong>评分要点：</strong>流水线各层按顺序写出得基本分，缺层或顺序错扣分；局部连接和参数共享各需写清「含义+收益」，只写定义不给满2分；能量化对比（如给出参数量的数字差异）加分。</p>"
  },
  {
    id: "sim-s11-3",
    moduleId: "s11",
    year: "模拟题",
    position: "自编",
    points: 8,
    questionText: "<p><strong>题目：</strong>(1) 一个CNN有4个连续的卷积层，卷积核依次为5×5、3×3、3×3、3×3，步长全部为S=1，padding全部为P=0。请计算第4层特征图上一个神经元对应原始输入的感受野大小，要求写出递推过程（4分）。(2) 请解释CNN中「平移等变性」（Translation Equivariance）和「平移不变性」（Translation Invariance）的区别，并指出卷积层和池化层分别提供哪种性质（4分）。</p>",
    answerHtml: "<p><strong>(1) 感受野计算（4分）：</strong></p><p>递推公式（步长全为1时）：$RF_k = RF_{k-1} + (F_k - 1)$，初始 $RF_0 = 1$（输入层每个像素看自己）。</p><table><tbody><tr><th>层k</th><th>核大小F_k</th><th>RF_{k-1}</th><th>F_k - 1</th><th>RF_k</th></tr><tr><td>1</td><td>5×5</td><td>1</td><td>4</td><td>1 + 4 = <strong>5×5</strong></td></tr><tr><td>2</td><td>3×3</td><td>5</td><td>2</td><td>5 + 2 = <strong>7×7</strong></td></tr><tr><td>3</td><td>3×3</td><td>7</td><td>2</td><td>7 + 2 = <strong>9×9</strong></td></tr><tr><td>4</td><td>3×3</td><td>9</td><td>2</td><td>9 + 2 = <strong>11×11</strong></td></tr></tbody></table><p><strong>第4层感受野为 11×11。</strong>通用公式（步长全1）：$RF_k = 1 + \\sum_{i=1}^{k}(F_i - 1)$。验证：1 + 4 + 2 + 2 + 2 = 11 ✓。（2分递推过程+1分最终结果+1分公式）</p><p><strong>(2) 平移等变性 vs 平移不变性（4分）：</strong></p><p><strong>平移等变性（Equivariance）：</strong>如果输入发生平移，输出也发生相同方向和相同比例的平移。用公式表达：设f是操作（如卷积），T是平移变换，则f(T(x)) = T(f(x))——先平移再卷积 = 先卷积再平移。卷积层提供平移等变性——输入图像中的边缘向右移2像素，特征图中对应的激活也向右移2像素。这是目标检测任务所需要的——我们想知道特征「在哪里」。</p><p><strong>平移不变性（Invariance）：</strong>输入发生微小平移时，输出保持不变。即f(T(x)) ≈ f(x)。池化层通过降采样提供平移不变性——2×2最大池化在4个像素的窗口内只保留最大值，输入在窗口内平移1个像素可能完全不改变池化输出。分类任务需要这种性质——猫在图片中偏左还是偏右几个像素，都应该是猫。</p><p><strong>总结：卷积层 = 等变性（保持空间位置信息）；池化层 = 不变性（对微小平移鲁棒）。</strong>（各1分：定义1分+对应层1分）</p><p><strong>评分要点：</strong>(1)递推过程清晰、每一步RF值正确得满分，直接写结果无过程最多得1分。(2)两个概念的定义必须区分清楚——等变是「输出跟着变」、不变是「输出不变」，混淆扣2分；对应关系写对（conv→等变，pool→不变）各1分。</p>"
  }
];