// CS course review page data — extracted from framework components
import type { ExamIndexEntry } from 'learncourse/types';

export const CS_EXAM_TIP = '计算机系统 · 从应用程序到底层实现。题型：简答 + 程序填空 + 栈帧分析 + 链接/ECF综合 + VM+Cache联合大题。';

export const CS_SCORE_HEADERS = ['题型', '2025 期末', '分值'];
export const CS_SCORE_ROWS = [
  ['简答题（浮点数/信息表示）', '第 1 题', '10 分'],
  ['程序填空（C↔汇编）', '第 2-3 题', '25 分'],
  ['栈帧分析', '第 4 题', '15 分'],
  ['综合题（链接+信号+优化）', '第 5 题', '25 分'],
  ['VM + Cache 联合大题', '第 6 题', '25 分'],
];

export const CS_STRATEGY_HEADERS = ['层级', '模块', '策略'];
export const CS_STRATEGY_ROWS = [
  ['必拿分', 'VM 地址翻译 + Cache 地址分解（联合 50 分）', '必须会画流程图、会手算'],
  ['必拿分', '程序机器级表示（栈帧+汇编填空，40 分）', '能手绘栈帧、逐行追踪'],
  ['高频概念', '链接（强弱符号+重定位）+ ECF（fork+信号）', '能标准简答 + 代码分析'],
  ['保底覆盖', '浮点数、安全攻击、性能优化', '掌握公式和概念'],
];

export const CS_SLIDE_PDFS: Record<string, string> = {};

export const CS_EXAM_ENTRIES: ExamIndexEntry[] = [
  { year: '2025', name: '期末 A 卷', questions: '简答(10) + 程序填空(25) + 栈帧(15) + 综合(25) + VM+Cache(25)', notes: '重点：VM地址翻译、Cache分解、栈帧分析' },
  { year: '2025', name: '期中试卷', questions: '选择+填空+简答', notes: '重点：整数/浮点数、汇编基础' },
];

export const CS_COURSEWARE_ROWS = [
  ['01', '计算机系统概论', 'PPTX'],
  ['02', '信息的位与表示', 'PPTX'],
  ['03', '编译工具链', 'PPTX'],
  ['04', '汇编语言基础', 'PPTX'],
  ['05', '整数与浮点数', 'PPTX'],
  ['06', '程序的机器级表示', 'PPTX'],
  ['07', '链接', 'PPTX'],
  ['08', '异常控制流与进程', 'PPTX'],
  ['09', '存储层次与Cache', 'PPTX'],
  ['10', '虚拟内存', 'PPTX'],
  ['11', '性能优化', 'PPTX'],
  ['12', '安全攻击与防御', 'PPTX'],
];
