import type { ReviewConfig } from 'learncourse/types';

export const csConfig: ReviewConfig = {
  title: '计算机系统',
  subtitle: '期末复习大纲',
  badge: '2026 春',

  navGroups: [
    {
      title: '考试概览',
      links: [
        { href: '#s0', label: '考试画像 & 分值分布' },
        { href: '#s-mainline', label: '整体知识主线' },
      ],
    },
    {
      title: '基础篇（前8章）',
      links: [
        { href: '#s1', label: '1. 计算机系统概论' },
        { href: '#s2', label: '2. 信息的位与表示' },
        { href: '#s3', label: '3. 编译工具链' },
        { href: '#s4', label: '4. 汇编语言基础' },
        { href: '#s5', label: '5. 整数与浮点数' },
        { href: '#s6', label: '6. 程序的机器级表示' },
        { href: '#s7', label: '7. 链接' },
        { href: '#s8', label: '8. 异常控制流 & 进程' },
      ],
    },
    {
      title: '进阶篇（后4章·高分重点）',
      links: [
        { href: '#s9', label: '9. 存储层次与 Cache' },
        { href: '#s10', label: '10. 虚拟内存 VM' },
        { href: '#s11', label: '11. 性能优化' },
        { href: '#s12', label: '12. 安全攻击与防御' },
      ],
    },
    {
      title: '复习指南',
      links: [
        { href: '#s-priority', label: '最终复习优先级' },
        { href: '#s-checklist', label: '考前自检清单' },
      ],
    },
  ],

  modules: [
    { id: 's1', number: 1, title: '计算机系统概论', icon: 'Monitor', courseware: '01 概论.pptx', examRefs: '概念题' },
    { id: 's2', number: 2, title: '信息的位与表示', icon: 'Binary', courseware: '02 信息表示.pptx', examRefs: '简答题 ~5分' },
    { id: 's3', number: 3, title: '编译工具链与Hello World', icon: 'Terminal', courseware: '03 编译工具链.pptx', examRefs: '概念题' },
    { id: 's4', number: 4, title: '汇编语言基础', icon: 'Code2', courseware: '04 汇编基础.pptx', examRefs: '综合题基础' },
    { id: 's5', number: 5, title: '整数与浮点数', icon: 'Hash', courseware: '05 整数+浮点.pptx', examRefs: '简答题 ~10分' },
    { id: 's6', number: 6, title: '程序的机器级表示', icon: 'Cpu', courseware: '06 机器级表示.pptx', examRefs: '程序填空 ~25分' },
    { id: 's7', number: 7, title: '链接', icon: 'Link2', courseware: '07 链接.pptx', examRefs: '分析题 ~10分' },
    { id: 's8', number: 8, title: '异常控制流与进程', icon: 'GitFork', courseware: '08 进程+信号.pptx', examRefs: '分析题 ~10分' },
    { id: 's9', number: 9, title: '存储层次与 Cache', icon: 'Database', courseware: '09 Cache.pptx', examRefs: '联合大题 ~25分' },
    { id: 's10', number: 10, title: '虚拟内存 VM', icon: 'HardDrive', courseware: '10 虚拟内存.pptx', examRefs: '联合大题 ~25分' },
    { id: 's11', number: 11, title: '性能优化', icon: 'Zap', courseware: '11 性能优化.pptx', examRefs: '分析题 ~5分' },
    { id: 's12', number: 12, title: '安全攻击与防御', icon: 'Shield', courseware: '12 安全+64位.pptx', examRefs: '概念题 ~3分' },
  ],

  quizzes: [],
  examQuestions: [],
  checklist: [
    { id: '1', text: '能正确进行二进制/十六进制/十进制互转' },
    { id: '2', text: '理解补码表示，能判断溢出' },
    { id: '3', text: '能手算 IEEE 754 单精度浮点数' },
    { id: '4', text: '能阅读基础汇编代码，理解 mov/lea/add/sub/cmp/jmp 指令' },
    { id: '5', text: '能手绘栈帧图，理解 call/ret 过程' },
    { id: '6', text: '理解 ELF 结构，能分析符号解析（强/弱符号）' },
    { id: '7', text: '理解 fork/execve/wait，能手算 fork 输出' },
    { id: '8', text: '能分解内存地址（Tag/Set/Offset），判断 Cache 命中/缺失' },
    { id: '9', text: '能绘制虚拟地址翻译流程图（VA→PA，含 TLB 和页表）' },
    { id: '10', text: '理解局部性原理和 Cache 优化策略' },
  ],

  examOverview: { tipText:'计算机系统——从应用程序到底层实现', scoreHeaders:['题型','2025期末','分值'], scoreRows:[['浮点数/信息表示','第1题','10分'],['程序填空(C汇编)','第2-3题','25分'],['栈帧分析','第4题','15分'],['链接+信号+优化','第5题','25分'],['VM+Cache联合','第6题','25分']], strategyHeaders:['层级','模块','策略'], strategyRows:[['必拿分','VM地址翻译+Cache地址分解(50分)','必须会手算'],['必拿分','机器级表示(栈帧+汇编,40分)','能手绘栈帧'],['高频概念','链接+ECF(fork+信号)','标准简答'],['保底覆盖','浮点数+安全+性能优化','掌握概念']] },
  moduleLoader: (moduleId: string) => import(`./modules/module-${moduleId}.ts`).then(m => m.default),
};
export const courseConfig = csConfig;
