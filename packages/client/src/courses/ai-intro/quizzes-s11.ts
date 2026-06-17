import type { Quiz } from '@learncourse/framework/types';

export const S11_QUIZZES: Quiz[] = [
  {
    id: "q-s11-27",
    moduleId: "s11",
    question: "关于CNN中「参数共享」（Parameter Sharing），以下哪个说法是正确的？",
    options: [
      { text: "A. 参数共享指同一层的不同卷积核共享同一组权重，以减少存储开销", isCorrect: false },
      { text: "B. 参数共享指一个卷积核在输入图像的不同位置滑动时使用相同的权重参数", isCorrect: true },
      { text: "C. 参数共享指卷积层和全连接层之间共享权重矩阵", isCorrect: false },
      { text: "D. 参数共享指训练时同一 batch 内所有样本共享同一组梯度更新方向", isCorrect: false }
    ],
    feedbackCorrect: "正确！参数共享是CNN两大核心设计思想之一（另一个是局部连接）：同一个卷积核在整个输入图像的所有空间位置复用同一组权重。这意味着无论某个特征（如垂直边缘）出现在左上角还是右下角，同一个filter都能检测到它。参数共享极大减少了参数量——一个3×3卷积核无论输入图像是32×32还是256×256，始终只有9个权重（加1个偏置），这与全连接层形成鲜明对比。",
    feedbackWrong: "不对。A恰好说反了——不同卷积核各自学习不同的权重，以检测不同的特征（有的检测边缘、有的检测纹理、有的检测角点）。如果所有核共享权重，那多个核就退化成同一个核了。C混淆了卷积层和全连接层——它们是独立的结构，参数各自独立。D描述的是batch训练中的梯度聚合方式（如batch GD取平均梯度），与CNN架构层面的参数共享无关。核心记忆：参数共享 = 同一个filter的权重在空间所有位置复用 = 平移等变性的来源。",
    type: "single"
  },
  {
    id: "q-s11-28",
    moduleId: "s11",
    question: "在一个三层卷积网络中，每层都使用3×3卷积核、步长S=1、padding P=0。第3层特征图上的一个像素，对应原始输入图像上的感受野（Receptive Field）大小是多少？",
    options: [
      { text: "A. 3×3", isCorrect: false },
      { text: "B. 5×5", isCorrect: false },
      { text: "C. 7×7", isCorrect: true },
      { text: "D. 9×9", isCorrect: false }
    ],
    feedbackCorrect: "正确！感受野逐层扩大：第1层一个像素看输入3×3；第2层一个像素看第1层3×3，而第1层的每个像素看输入3×3，叠加后覆盖输入5×5（3+3-1=5）；第3层同理再扩大（5+3-1=7），最终感受野为7×7。通用递推公式（当步长全为1时）：RF_k = RF_{k-1} + (F_k - 1)，初始RF_0 = 1。即逐层累加(F-1)：1 → 3 → 5 → 7。这也是为什么多个小卷积核堆叠（如两个3×3）可以替代一个大卷积核（如5×5）——感受野相同但参数更少、非线性更强。",
    feedbackWrong: "不对。A（3×3）是只看最后一层卷积核本身的尺寸，忽略了「层叠累积效应」——第3层每个像素的信息经过了前面所有层的汇总。B（5×5）是两层的感受野。递推公式：RF_k = RF_{k-1} + (F_k - 1)，初始RF_0 = 1。三层3×3：1 → 3 → 5 → 7。如果每层步长不全是1，公式会更复杂，需要乘以之前各层步长的累积乘积。感受野越大，神经元能「看到」的原始图像区域越大，越能捕捉全局语义信息。",
    type: "single"
  },
  {
    id: "q-s11-29",
    moduleId: "s11",
    question: "与Sigmoid/Tanh相比，ReLU成为深层CNN标配激活函数的最关键原因是？",
    options: [
      { text: "A. ReLU的数学形式f(x)=max(0,x)计算速度比指数运算更快", isCorrect: false },
      { text: "B. ReLU在正区间的导数恒为1，反向传播时梯度不衰减，有效缓解梯度消失", isCorrect: true },
      { text: "C. ReLU将输出压缩到(0,1)区间，防止激活值在深层网络中爆炸", isCorrect: false },
      { text: "D. ReLU是线性函数，因此不需要反向传播，直接解析求解", isCorrect: false }
    ],
    feedbackCorrect: "正确！ReLU在x>0区间导数恒为1，链式法则连乘时梯度不衰减，这是它解决深层网络梯度消失问题的根本机制。对比Sigmoid：σ'(5)≈0.006，σ'(10)≈0.000045——输入稍大梯度就接近0，多层叠加后前面层的梯度指数级缩小（如σ'连乘10次可能降到10^{-20}量级），几乎无法学习。虽然A也是事实（ReLU确实比指数运算快），但计算速度不是「最关键」的原因——最关键的是让深层网络能训练。C描述的反而是Sigmoid的特征。D完全错误——ReLU是非线性函数（max操作在x=0处引入了非线性），且任何需要学习的网络都必须反向传播。",
    feedbackWrong: "不对。B才是最关键原因。A（计算快）虽然也是ReLU的优点，但不是深层网络选择ReLU的根本原因——根本原因是Sigmoid的梯度消失让深层网络根本训练不动，而ReLU通过正区间梯度恒为1解决了这个瓶颈。C恰好说反了——ReLU的输出范围是[0,+∞)，而Sigmoid才是压缩到(0,1)的那个。D完全不成立：ReLU的max操作引入了非线性（否则堆叠多少层都是线性变换），且所有可训练网络都需要反向传播求梯度。补充：ReLU的缺点是x<0时输出和梯度都为0，可能导致「死神经元」，Leaky ReLU和ELU等变体正是为了解决这个问题。",
    type: "single"
  },
  {
    id: "q-s11-30",
    moduleId: "s11",
    question: "在图像分类CNN中，最后一个全连接层之后通常接Softmax层。关于Softmax输出向量的性质，以下哪个说法正确？",
    options: [
      { text: "A. 各分量是原始logit值经指数化并归一化的结果，所有分量之和严格等于1", isCorrect: true },
      { text: "B. 各分量独立地经过Sigmoid变换，每个分量取值在(0,1)之间但之和不一定为1", isCorrect: false },
      { text: "C. 输出向量中只有最大分量保留原值，其余分量全部置为0", isCorrect: false },
      { text: "D. 输出向量的每个分量是绝对值，可以大于1，用于衡量各类别的置信度", isCorrect: false }
    ],
    feedbackCorrect: "正确！Softmax定义为：softmax(z)_i = e^{z_i} / Σ_j e^{z_j}。两个核心性质：(1)每个分量在(0,1)区间；(2)所有分量之和严格等于1。这使得输出可以被解释为「输入属于各类别的概率分布」。Softmax配合交叉熵损失（Cross-Entropy Loss）是分类任务的事实标准组合——Softmax输出概率，交叉熵衡量预测概率与真实标签（one-hot）的差距。注意与Sigmoid的区别：Sigmoid用于二分类或多标签分类（各类别独立判断），Softmax用于多分类（各类别互斥、概率和为1）。",
    feedbackWrong: "不对。B描述的是多标签分类中每个类别独立接Sigmoid的做法——此时各类别概率互相独立，之和不要求为1。C描述的是argmax（硬分类），它丢弃了概率信息，而且argmax在反向传播时梯度为0（不可导），所以训练时用Softmax（可导），推理时才用argmax取最大类。D错误——Softmax的每个输出分量一定在(0,1)之间，因为分子e^{z_i}必然小于分母Σe^{z_j}（除非只有一个类别，此时输出恒为1）。记住：Softmax = 指数化 + 归一化 = 概率分布。",
    type: "single"
  },
  {
    id: "q-s11-31",
    moduleId: "s11",
    question: "关于CNN的平移不变性（Translation Invariance），以下哪个说法正确？",
    options: [
      { text: "A. 卷积层天然具备平移不变性——将输入平移一个像素，特征图完全不变", isCorrect: false },
      { text: "B. 平移不变性主要来自池化层的下采样——使特征图对输入的小幅平移不敏感", isCorrect: true },
      { text: "C. 平移不变性来自全连接层——全连接层整合全局信息后消除了位置差异", isCorrect: false },
      { text: "D. CNN完全不具备平移不变性——即使加了池化层，平移一个像素也会导致输出完全不同", isCorrect: false }
    ],
    feedbackCorrect: "正确！关键区分——卷积层提供的是平移等变性（Translation Equivariance），不是平移不变性。等变性意味着：输入平移多少，特征图也平移多少（保持空间对应关系）。而池化层的降采样操作才引入了平移不变性：在一个局部窗口内（如2×2），无论最强激活在窗口的哪个位置，最大池化都输出同一个最大值。这种「对微小平移不敏感」的特性对图像分类至关重要——一只猫在图片中间偏左还是偏右几个像素，都应该被识别为猫。",
    feedbackWrong: "不对。A混淆了「等变性」和「不变性」——卷积层是平移等变的（equivariant），即输入平移会导致特征图对应平移，而非保持不变。这是考试中的高频区分点：conv = equivariance（输出跟着变），pooling = invariance（输出不变）。C错误——全连接层不仅不提供平移不变性，反而会丢失空间结构信息（展平操作丢弃了空间坐标）。D过于绝对——加了池化层的CNN对小幅度平移确实具有相当程度的鲁棒性，只不过不是完全平移不变的（大幅平移仍可能改变输出）。",
    type: "single"
  }
];