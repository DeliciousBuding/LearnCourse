import type { ExamQuestion } from '@learncourse/framework/types';

// ── 模拟题 ──
export const S2_SIM_QUESTIONS: ExamQuestion[] = [
  {
    id: "sim-s2-1",
    moduleId: "s2",
    year: "模拟题",
    position: "自编",
    points: 8,
    questionText: "<p>在32位计算机系统中，内存地址 0x200～0x203 存储了一个 int 型变量。已知这四个地址的字节内容如下：</p><table border=「1」 cellpadding=「4」 style=「border-collapse:collapse;」><tr><th>地址</th><td>0x200</td><td>0x201</td><td>0x202</td><td>0x203</td></tr><tr><th>内容</th><td>0x2A</td><td>0x1B</td><td>0x4C</td><td>0x3D</td></tr></table><p>请回答：</p><p>(1) 若该系统为小端序（Little Endian），该 int 变量的十六进制值是多少？（4分）</p><p>(2) 若该系统为大端序（Big Endian），该 int 变量的十六进制值是多少？（4分）</p>",
    answerHtml: "<p><strong>解：</strong></p>\n<p><strong>(1) 小端序（Little Endian）——4分</strong></p>\n<p>小端序规则：最低有效字节（LSB）存放在最低地址处，最高有效字节（MSB）存放在最高地址处。</p>\n<p>地址由低到高的字节：0x200→0x2A（byte 0，LSB），0x201→0x1B（byte 1），0x202→0x4C（byte 2），0x203→0x3D（byte 3，MSB）。</p>\n<p>因此该 int 变量 = 0x3D4C1B2A。</p>\n<p><strong>(2) 大端序（Big Endian）——4分</strong></p>\n<p>大端序规则：最高有效字节（MSB）存放在最低地址处，最低有效字节（LSB）存放在最高地址处。</p>\n<p>地址由低到高的字节：0x200→0x2A（byte 3，MSB），0x201→0x1B（byte 2），0x202→0x4C（byte 1），0x203→0x3D（byte 0，LSB）。</p>\n<p>因此该 int 变量 = 0x2A1B4C3D。</p>"
  },
  {
    id: "sim-s2-2",
    moduleId: "s2",
    year: "模拟题",
    position: "自编",
    points: 12,
    questionText: "<p>在一个8位系统中，寄存器 R 的初始值为 0x00。按顺序执行以下操作（bit 编号从 0 开始，0 为 LSB）：</p><p>① 将 bit 3 置 1；</p><p>② 将 bit 7 和 bit 5 置 1（其余位不变）；</p><p>③ 将 bit 0、bit 2、bit 4、bit 6 翻转；</p><p>④ 对结果执行算术右移 1 位。</p><p>请写出每一步操作后寄存器 R 的二进制值和十六进制值，并说明最终结果解释为有符号十进制整数（补码）时的值。</p>",
    answerHtml: "<p><strong>解：</strong></p>\n<p>寄存器初始值 R<sub>0</sub> = 0x00 = 0000 0000<sub>2</sub>。</p>\n<p><strong>步骤①</strong> 将 bit 3 置 1（2分）<br>操作：R<sub>1</sub> = R<sub>0</sub> | (1 &lt;&lt; 3) = 0000 0000 | 0000 1000 = <strong>0000 1000<sub>2</sub> = 0x08</strong>。</p>\n<p><strong>步骤②</strong> 将 bit 7 和 bit 5 置 1（2分）<br>操作：R<sub>2</sub> = R<sub>1</sub> | (1 &lt;&lt; 7) | (1 &lt;&lt; 5) = 0000 1000 | 1000 0000 | 0010 0000 = <strong>1010 1000<sub>2</sub> = 0xA8</strong>。</p>\n<p><strong>步骤③</strong> 翻转 bit 0、2、4、6（3分）<br>掩码 M = (1&lt;&lt;0) | (1&lt;&lt;2) | (1&lt;&lt;4) | (1&lt;&lt;6) = 0x55 = 0101 0101<sub>2</sub>。<br>R<sub>3</sub> = R<sub>2</sub> ^ M = 1010 1000 ^ 0101 0101 = <strong>1111 1101<sub>2</sub> = 0xFD</strong>。</p>\n<p><strong>步骤④</strong> 算术右移 1 位（3分）<br>算术右移保持符号位不变，高位补符号位。R<sub>3</sub> = 1111 1101<sub>2</sub>（符号位为1），右移1位后最高位补1，得 R<sub>4</sub> = <strong>1111 1110<sub>2</sub> = 0xFE</strong>。</p>\n<p><strong>最终有符号解释（2分）</strong><br>R<sub>4</sub> = 0xFE = 1111 1110<sub>2</sub>，最高位为1，是负数。补码求值：取反加1 → ~(1111 1110) + 1 = 0000 0001 + 1 = 0000 0010<sub>2</sub> = 2<sub>10</sub>，加上负号得 <strong>-2</strong>。</p>"
  },
  {
    id: "sim-s2-3",
    moduleId: "s2",
    year: "模拟题",
    position: "自编",
    points: 10,
    questionText: "<p>在8位补码系统中，已知 A = 0x7E，B = 0x05。请完成以下计算并判断是否发生溢出：</p><p>(1) 计算 A + B 的8位补码结果（用十六进制表示），判断是否溢出，并说明判断依据。（5分）</p><p>(2) 计算 A - B 的8位补码结果（用十六进制表示），判断是否溢出，并说明判断依据。（5分）</p>",
    answerHtml: "<p><strong>解：</strong></p>\n<p>已知 A = 0x7E = 0111 1110<sub>2</sub>（十进制 +126），B = 0x05 = 0000 0101<sub>2</sub>（十进制 +5）。</p>\n<p><strong>(1) A + B（5分）</strong></p>\n<p>0111 1110 + 0000 0101 = 1000 0011<sub>2</sub> = <strong>0x83</strong>。</p>\n<p><strong>溢出判断：发生溢出。</strong></p>\n<p>判断依据——① 符号位法：两个正数（A 符号位=0，B 符号位=0）相加，结果的符号位为 1（负数）。两个正数相加不可能得到负数，说明发生了溢出。② 范围法：A + B = 126 + 5 = 131，超出 8 位有符号补码的表示范围 [-128, 127]，故溢出。此时 0x83 若解释为补码是 -125，与实际结果 131 不符，这正是溢出的表现。</p>\n<p><strong>(2) A - B（5分）</strong></p>\n<p>将减法转换为加法：A - B = A + (-B)。先求 -B 的补码：~B + 1 = ~(0000 0101) + 1 = 1111 1010 + 1 = 1111 1011<sub>2</sub> = 0xFB。</p>\n<p>0111 1110 + 1111 1011 = 1 0111 1001<sub>2</sub>（第9位进位 1 超出8位范围，截断），结果 = <strong>0111 1001<sub>2</sub> = 0x79</strong>。</p>\n<p><strong>溢出判断：未发生溢出。</strong></p>\n<p>判断依据——① 符号位法：正数（A）加负数（-B），正负相加永远不会溢出。② 范围法：A - B = 126 - 5 = 121，121 ∈ [-128, 127]，在合法范围内。0x79 = 7×16+9 = 121，结果正确。</p>"
  },
];
