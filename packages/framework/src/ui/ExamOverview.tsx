import { Callout } from './Callout';
import { ComparisonTable } from './ComparisonTable';
import { StatCard } from './StatCard';

interface ExamOverviewProps {
  modulesStudied: number; checklistDone: number;
  totalModules: number; totalChecklist: number;
  tipText?: string;
  scoreHeaders?: string[];
  scoreRows?: string[][];
  strategyHeaders?: string[];
  strategyRows?: string[][];
}

export function ExamOverview({ modulesStudied, checklistDone, totalModules, totalChecklist, tipText, scoreHeaders, scoreRows, strategyHeaders, strategyRows }: ExamOverviewProps) {
  const tip = tipText || '这不是纯背概念课。考试类型：概念简答 + 搜索推演 + 逻辑证明 + 概率计算 + 机器学习/强化学习计算。';
  const sHeaders = scoreHeaders || ['题型', '2025 期末', '2023 期末', '2025 期中'];
  const sRows = scoreRows || [
    ['基本概念', '25 分', '25 分', '20 分'],
    ['搜索求解', '20 分', '—', '20 分'],
    ['一阶逻辑', '15 分', '15 分', '20 分'],
    ['不确定性量化', '—', '20 分', '—'],
    ['机器学习', '20 分', '20 分', '—'],
    ['强化学习', '20 分', '—', '—'],
    ['深度学习（CNN）', '—', '20 分', '—'],
    ['对抗搜索', '—', '—', '20 分'],
    ['CSP', '—', '—', '20 分'],
  ];
  const stHeaders = strategyHeaders || ['层级', '模块', '策略'];
  const stRows = strategyRows || [
    ['必拿分', '搜索、一阶逻辑、决策树/朴素贝叶斯、贝叶斯网络、强化学习', '必须会算、会写过程'],
    ['高频概念', 'Agent、遗传算法、模拟退火、CSP、Minimax、α-β 剪枝、ML分类', '能标准简答'],
    ['保底覆盖', 'HMM、感知器、CNN、深度学习、NLP/大模型、计算机视觉', '掌握定义、流程、简单计算'],
  ];

  return (
    <section id="s0">
      <h2>考试画像 & 分值分布</h2>
      <Callout variant="tip"><strong>{tip}</strong></Callout>
      <h3>往年分值分布</h3>
      <ComparisonTable headers={sHeaders} rows={sRows} />
      <h3>三层复习策略</h3>
      <ComparisonTable headers={stHeaders} rows={stRows} />
      <hr />
      <div style={{ display: 'flex', gap: '1rem', margin: '0.85rem 0 1.25rem', flexWrap: 'wrap' }}>
        <StatCard value={`${modulesStudied}/${totalModules}`} label="模块已学" variant="accent" />
        <StatCard value={`${checklistDone}/${totalChecklist}`} label="自检完成" variant="success" />
        <StatCard value="5" label="历年真题已收录" variant="warning" />
      </div>
    </section>
  );
}
