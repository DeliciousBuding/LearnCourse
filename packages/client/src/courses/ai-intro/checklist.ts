import type { ChecklistItem } from 'learncourse/types';

export const CHECKLIST: ChecklistItem[] = [
  { id: '1', text: '能解释 Agent 定义、PEAS、四类 Agent 及任务环境七维度' },
  { id: '2', text: '能手推 A* 搜索（open/closed 表、f=g+h）' },
  { id: '3', text: '能对比 BFS/DFS/UCS/IDS/Greedy/A* 的完备性、最优性、时空复杂度' },
  { id: '4', text: '能解释模拟退火（exp(-ΔE/T)）和遗传算法的基本流程' },
  { id: '5', text: '能手推 Minimax + α-β 剪枝，理解剪枝条件' },
  { id: '6', text: '能形式化 CSP（变量/域/约束），手推回溯搜索 + 约束传播（MRV/LCV/前向检验/MAC）' },
  { id: '7', text: '能解释 Wumpus 世界推理、KB |= α 含义、可靠性/完备性' },
  { id: '8', text: '能用一阶逻辑表达自然语言命题，理解量词和归结原理' },
  { id: '9', text: '能计算条件概率、应用贝叶斯公式、判断条件独立' },
  { id: '10', text: '能构建简单贝叶斯网络并做推理（链式/共同父节点/共同子节点）' },
  { id: '11', text: '能解释马尔可夫假设、转移模型、传感器模型，理解 HMM 基本结构' },
  { id: '12', text: '能解释 ML 三范式（监督/无监督/强化）、过拟合、交叉验证、混淆矩阵' },
  { id: '13', text: '能解释决策树 ID3 的信息增益计算和朴素贝叶斯分类原理' },
  { id: '14', text: '理解 CNN 卷积/池化/全连接三层结构，知道 LeNet/AlexNet 里程碑意义' },
];
