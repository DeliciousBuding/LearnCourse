import type { Quiz } from '@learncourse/framework/types';

// === 信息的位与表示 ===

// ── 选择题 ──
export const S2_QUIZZES: Quiz[] = [
  {
    id: "q-s2-3",
    moduleId: "s2",
    question: "在8位补码（Two's Complement）表示系统中，十进制数 -57 对应的十六进制表示是？",
    options: [
      { text: "A. 0x39", isCorrect: false },
      { text: "B. 0xC7", isCorrect: true },
      { text: "C. 0xB9", isCorrect: false },
      { text: "D. 0xC6", isCorrect: false },
    ],
    feedbackCorrect: "正确！-57 的 8 位补码计算：57 = 0x39 = 0011 1001，按位取反得 1100 0110，加 1 得 1100 0111 = 0xC7。",
    feedbackWrong: "不对。-57 的补码计算：先写出 +57 的二进制 0011 1001（即 0x39），按位取反得 1100 0110，再加 1 得 1100 0111 = 0xC7。选项 A（0x39）是 +57 本身，D（0xC6）漏了加 1 这一步骤，C（0xB9）是计算错误的结果。",
    type: "single"
  },
  {
    id: "q-s2-4",
    moduleId: "s2",
    question: "在32位小端序（Little Endian）机器上，整型变量 x = 0x12345678 存储在地址 0x1000～0x1003 处，四个字节依次为 0x78、0x56、0x34、0x12。若将这段内存原样复制到一台大端序（Big Endian）机器上并按32位整数读取，得到的值是多少？",
    options: [
      { text: "A. 0x12345678", isCorrect: false },
      { text: "B. 0x78563412", isCorrect: true },
      { text: "C. 0x56781234", isCorrect: false },
      { text: "D. 0x21436587", isCorrect: false },
    ],
    feedbackCorrect: "正确！小端序存储：[低地址] 0x78, 0x56, 0x34, 0x12 [高地址]。大端序读取：低地址字节为 MSB，因此值为 0x78563412。",
    feedbackWrong: "不对。小端序将最低有效字节（LSB）放在最低地址，内存从低到高依次为 0x78、0x56、0x34、0x12。大端序将最低地址字节作为 MSB，因此读取时 MSB=0x78，值 = 0x78563412。选项 A 忽略了字节序差异，C 是16位半字交换的混淆，D 是逐字节内半字节反转的错误。",
    type: "single"
  },
  {
    id: "q-s2-5",
    moduleId: "s2",
    question: "设 x = 0x6B，y = 0x8F，表达式 ((x & 0x0F) << 4) | ((y & 0xF0) >> 4) 的十六进制值是多少？",
    options: [
      { text: "A. 0xB8", isCorrect: true },
      { text: "B. 0x6F", isCorrect: false },
      { text: "C. 0xEF", isCorrect: false },
      { text: "D. 0xE4", isCorrect: false },
    ],
    feedbackCorrect: "正确！该表达式提取 x 的低4位和 y 的高4位组合成新字节。(x & 0x0F) = 0x0B，左移4位得 0xB0；(y & 0xF0) = 0x80，右移4位得 0x08；按位或得 0xB8。",
    feedbackWrong: "不对。逐步计算：(x & 0x0F) 取 x 低4位 = 0x0B，<< 4 得 0xB0；(y & 0xF0) 取 y 高4位 = 0x80，>> 4 得 0x08；0xB0 | 0x08 = 0xB8。选项 B（0x6F）是取了 x 高4位和 y 低4位组合，C（0xEF）是 x|y 简单按位或，D（0xE4）是 x^y 按位异或。",
    type: "single"
  },
  {
    id: "q-s2-6",
    moduleId: "s2",
    question: "8位补码整数 -16 的二进制表示为 11110000。分别对其执行逻辑右移2位和算术右移2位，将两个结果均解释为8位无符号整数，其差值的绝对值是多少？",
    options: [
      { text: "A. 56", isCorrect: false },
      { text: "B. 192", isCorrect: true },
      { text: "C. 128", isCorrect: false },
      { text: "D. 64", isCorrect: false },
    ],
    feedbackCorrect: "正确！逻辑右移2位：0011 1100 = 60（无符号）；算术右移2位：1111 1100 = 252（无符号）。|252 - 60| = 192。关键在于算术右移保持符号位（高位补1），而逻辑右移高位补0。",
    feedbackWrong: "不对。逻辑右移2位：高位补0 → 0011 1100 = 60。算术右移2位：高位补符号位（1）→ 1111 1100 = 252。两者的无符号解释之差：|252 - 60| = 192。选项 A（56）是将算术右移结果解释为有符号数 -4 后 60 + (-4) 得到，C 和 D 是其他错误理解。",
    type: "single"
  },
  {
    id: "q-s2-7",
    moduleId: "s2",
    question: "某16位计算机系统中，无符号整数可表示的最大值为 65535。则该系统有符号补码整数可表示的最小值是多少？",
    options: [
      { text: "A. -65535", isCorrect: false },
      { text: "B. -32768", isCorrect: true },
      { text: "C. -32767", isCorrect: false },
      { text: "D. -65536", isCorrect: false },
    ],
    feedbackCorrect: "正确！16位系统无符号最大值为 2^16 - 1 = 65535。有符号补码的最小值为 -2^(n-1) = -2^15 = -32768。补码表示存在不对称性：负数范围比正数范围多一个值。",
    feedbackWrong: "不对。16位无符号范围为 [0, 65535]，确认 n = 16。有符号补码的最小值为 -2^(16-1) = -2^15 = -32768。选项 A（-65535）混淆了无符号最大值与有符号最小值，C（-32767）取的是 -2^15 + 1（即最大正数 32767 的相反数），D（-65536）是 -2^16，把位数弄错了。",
    type: "single"
  },
];
