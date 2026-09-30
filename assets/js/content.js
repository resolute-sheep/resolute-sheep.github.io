/* =============================================================================
 * content.js — 站点全部内容（中英双语）
 * -----------------------------------------------------------------------------
 * 想改网站内容，只需要改这个文件。每一处文案都是 { zh: "...", en: "..." }，
 * 中文和英文各写一份即可，页面会自动跟随右上角的语言开关切换。
 *
 * 数据口径说明：项目指标保留“验证条件”（前仿真 / 实测 / 核级参考），
 * 未达标的指标如实标注。这部分依据工作区里的三份《项目详细复习文档》。
 * ========================================================================== */

const CONTENT = {

  /* ---------------------------------------------------------------- 站点信息 */
  site: {
    name:   { zh: '杨卓毅', en: 'Yang Zhuoyi' },
    nameEn: { zh: 'Yang Zhuoyi', en: '杨卓毅' },
    title:  { zh: '南京大学 集成电路学院 · 2023 级本科生',
              en: 'Undergraduate, School of Integrated Circuits, Nanjing University' },
    tagline: { zh: '高速接口与光电互连集成电路设计',
               en: 'High-Speed Interface & Optoelectronic Interconnect IC Design' },
    email: '231880490@smail.nju.edu.cn',
    location: { zh: '江苏 苏州 · 南京大学苏州校区', en: 'Suzhou, Jiangsu, China' },
  },

  /* -------------------------------------------------- 首屏右侧的身份信息卡 */
  idcard: {
    title: { zh: '基本信息', en: 'At a glance' },
    rows: [
      { k: { zh: '本科',   en: 'Undergrad' }, v: { zh: '南京大学 集成电路学院', en: 'School of Integrated Circuits, Nanjing University' } },
      { k: { zh: '专业',   en: 'Major' },     v: { zh: '集成电路设计与集成系统', en: 'IC Design & Integrated Systems' } },
      { k: { zh: '去向',   en: 'Next' },      v: { zh: '复旦大学 集成电路与微纳电子创新学院（直博）', en: 'School of Integrated Circuits and Micro-Nano Electronics, Fudan University (direct PhD)' } },
      { k: { zh: '研究方向', en: 'Research' }, v: { zh: '200 Gbps 光电互连接口电路 · 电芯片', en: '200 Gbps optoelectronic interconnect · electrical IC' } },
      { k: { zh: '所在地', en: 'Based in' },  v: { zh: '江苏 苏州', en: 'Suzhou, China' } },
    ],
  },

  /* ------------------------------------------------------------ 界面文字标签 */
  ui: {
    langLabel:   { zh: 'EN', en: '中文' },
    langTitle:   { zh: 'Switch to English', en: '切换到中文' },
    menu:        { zh: '目录', en: 'Menu' },
    metricLabel: { zh: '关键指标', en: 'Key metrics' },
    scopeLabel:  { zh: '验证边界', en: 'Scope & caveats' },
    awardsMore:  { zh: '展开其余荣誉', en: 'Show all awards' },
    footer:      { zh: '本站为静态页面，可用右上角开关切换中英文。',
                   en: 'Static site — use the switch above to change language.' },
  },

  /* -------------------------------------------------------------- 顶部导航栏 */
  nav: [
    { id: 'about',    label: { zh: '简介',     en: 'About' } },
    { id: 'education',label: { zh: '教育背景', en: 'Education' } },
    { id: 'research', label: { zh: '研究兴趣', en: 'Research' } },
    { id: 'projects', label: { zh: '科研项目', en: 'Projects' } },
    { id: 'awards',   label: { zh: '荣誉奖励', en: 'Awards' } },
    { id: 'skills',   label: { zh: '技能',     en: 'Skills' } },
    { id: 'service',  label: { zh: '学生工作', en: 'Service' } },
    { id: 'contact',  label: { zh: '联系',     en: 'Contact' } },
  ],

  /* ------------------------------------------------------------------ 个人简介 */
  about: {
    title: { zh: '简介', en: 'About' },
    paragraphs: [
      { zh: '我是杨卓毅，南京大学集成电路学院 2023 级本科生，主修集成电路设计与集成系统，中共预备党员。已推免至复旦大学集成电路与微纳电子创新学院直接攻读博士学位，研究方向为高速接口与光电互连集成电路，主要关注 200 Gbps 电芯片。',
        en: 'I am Zhuoyi Yang, a third-year undergraduate at the School of Integrated Circuits, Nanjing University, majoring in Integrated Circuit Design and Integrated Systems. I have been admitted by recommendation to the School of Integrated Circuits and Micro-Nano Electronics at Fudan University for a direct PhD, working on high-speed interface and optoelectronic interconnect integrated circuits, with a focus on 200 Gbps electrical ICs.' },
      { zh: '本科阶段我的训练集中在模拟与混合信号集成电路，并以射频电路、数字系统和设计自动化作为能力补充。我较早进入实验室参与科研实践，完成了从指标分解、晶体管级设计到仿真验证的完整闭环，也做过 FPGA 硬件加速与软硬件协同系统。这些经历让我体会到模拟设计“于细微处见功夫”——一个偏置点的选取、一对管子的宽长比，都可能决定系统性能的上限。',
        en: 'My undergraduate training centres on analog and mixed-signal integrated circuits, complemented by RF circuits, digital systems and design automation. I joined a lab early on and have worked through the full loop from specification breakdown and transistor-level design to simulation-based verification, alongside FPGA hardware acceleration and hardware–software co-design. These projects taught me that analog design is decided in the details — a bias point, a device aspect ratio, can set the ceiling of the whole system.' },
      { zh: '学习之外，我担任学院学生会执行主席，也做过大型活动主持与校园电台播音。',
        en: 'Beyond coursework, I serve as Executive President of the student union of my school, and have worked as an event host and campus radio presenter.' },
    ],
  },

  /* ------------------------------------------------------------------ 教育背景 */
  education: {
    title: { zh: '教育背景', en: 'Education' },
    entries: [
      { school: { zh: '复旦大学 · 集成电路与微纳电子创新学院', en: 'Fudan University · School of Integrated Circuits and Micro-Nano Electronics' },
        period: { zh: '2027.09 起', en: 'From Sep 2027' },
        degree: { zh: '推免录取（直接攻读博士学位）', en: 'Admitted by recommendation (direct PhD)' },
        focus:  { zh: '研究方向：高速接口与光电互连集成电路，主要关注 200 Gbps 电芯片',
                  en: 'Research focus: high-speed interface and optoelectronic interconnect ICs, with an emphasis on 200 Gbps electrical ICs' } },
      { school: { zh: '南京大学 · 集成电路学院', en: 'Nanjing University · School of Integrated Circuits' },
        period: { zh: '2023.09 – 2027.06（预计）', en: 'Sep 2023 – Jun 2027 (expected)' },
        degree: { zh: '工学学士 · 集成电路设计与集成系统', en: 'B.Eng. in Integrated Circuit Design and Integrated Systems' },
        focus:  { zh: '核心课程：模拟集成电路、数字集成电路、半导体物理、信号与系统、射频与功率集成电路',
                  en: 'Core coursework: analog ICs, digital ICs, semiconductor physics, signals and systems, RF and power ICs' } },
    ],
  },

  /* ------------------------------------------------------------------ 研究兴趣 */
  research: {
    title: { zh: '研究兴趣', en: 'Research Interests' },
    items: [
      { icon: '◈',
        name: { zh: '200 Gbps 光电互连接口电路', en: '200 Gbps Optoelectronic Interconnect Interface Circuits' },
        desc: { zh: '面向 200 Gbps 光电互连接口电路，主要研究其中的 200 Gbps 电芯片，包括高速驱动与接收前端、时钟数据恢复、均衡与信号完整性，以及速率、功耗与面积之间的权衡。',
                en: '200 Gbps optoelectronic interconnect interface circuits, focusing on the 200 Gbps electrical IC — high-speed driver and receiver front ends, clock and data recovery, equalisation and signal integrity, and the trade-offs between data rate, power and area.' } },
    ],
  },

  /* ------------------------------------------------------------------ 科研项目 */
  projects: {
    title: { zh: '科研与工程项目', en: 'Research & Engineering Projects' },
    note: { zh: '指标均标注验证层级；未达标的如实标出。',
            en: 'Every figure carries its verification level; metrics that fell short of target are marked as such.' },
    items: [
      /* ---------------------------------------------------------------- P1 */
      {
        id: 'ai4rf',
        period: { zh: '2025.07 – 2026.12', en: 'Jul 2025 – Dec 2026' },
        kind: { zh: '科研训练', en: 'Research' },
        role: { zh: '仿真自动化平台', en: 'Simulation-automation platform' },
        name: { zh: 'AI 辅助毫米波功率放大器敏捷设计', en: 'AI-Assisted Agile Design of mm-Wave Power Amplifiers' },
        summary: { zh: '面向 28 nm CMOS、120–140 GHz 变压器耦合功率放大器，把课题组已有的变压器 S 参数代理模型接入 Cadence 仿真，构建「多目标优化 + EDA 自动仿真」的闭环搜索。我负责自动化平台：用 Optuna 组织 TPE、NSGA-II、CMA-ES 等算法，把 18 维搜索坐标映射到 26 维物理参数，先用小信号仿真筛选匹配与稳定性，再用谐波平衡仿真评估 PAE 与输出功率，前后迭代了 11 个版本。',
                   en: 'A closed-loop search for a 28 nm CMOS, 120–140 GHz transformer-coupled power amplifier, wiring our group’s existing transformer S-parameter surrogate model into Cadence simulation. I built the automation platform: Optuna orchestrates TPE, NSGA-II and CMA-ES over an 18-dimensional search space mapped onto 26 physical parameters, with small-signal simulation screening matching and stability before harmonic-balance simulation evaluates PAE and output power. Eleven algorithm versions in total.' },
        tags: ['28 nm CMOS', '120–140 GHz', 'Optuna', 'Cadence Spectre', 'OCEAN'],
        metrics: [
          { v: '≈34.8%', k: { zh: 'PAE（满足全部规格）', en: 'PAE, all specs met' } },
          { v: '99.6%',  k: { zh: '稳定性筛选通过率', en: 'Stability-screen pass rate' } },
          { v: '18 → 26', k: { zh: '搜索坐标到物理参数', en: 'Search coords to physical params' } },
        ],
        scope: { zh: 'Spectre 使用代理模型预测的 S 参数而非 EM 真值，最终候选仍需回 HFSS 复验；99.6% 仅统计 v5 的 500 组 CMA-HB 样本。',
                 en: 'Spectre runs on surrogate-predicted S-parameters rather than EM ground truth, so final candidates still need HFSS re-verification; 99.6% covers only the 500 CMA-HB samples of v5.' },
      },

      /* ---------------------------------------------------------------- P2 */
      {
        id: 'afe',
        period: { zh: '2026', en: '2026' },
        kind: { zh: '竞赛 · 队长', en: 'Competition · Team lead' },
        award: { zh: '第十届全国大学生集成电路创新创业大赛 华东赛区三等奖', en: 'Third Prize, East China Region, 10th National IC Innovation & Entrepreneurship Competition' },
        role: { zh: '架构设计与仿真验证', en: 'Architecture and simulation' },
        name: { zh: '低噪声高输入阻抗生物电信号模拟前端', en: 'Low-Noise High-Input-Impedance Biopotential Analog Front End' },
        summary: { zh: '面向可穿戴生物电信号采集（0.1–2 mV @ 0.05–150 Hz）的 0.18 μm CMOS 模拟前端：斩波抑制 1/f 噪声与失调，DC-Servo 抵消差分电极失调，FVF 自举提升交流输入阻抗。我完成了架构选型、晶体管级设计与 PVT 仿真验证，并在 0.05–150 Hz 内做输入等效噪声分解，定位了噪声指标未达标的主导来源。',
                   en: 'A 0.18 μm CMOS front end for wearable biopotential acquisition (0.1–2 mV across 0.05–150 Hz): chopping suppresses 1/f noise and offset, a DC-servo loop cancels differential electrode offset, and FVF bootstrapping raises AC input impedance. I handled architecture selection, transistor-level design and PVT simulation, and decomposed the input-referred noise over 0.05–150 Hz to locate what dominates the shortfall against target.' },
        tags: ['0.18 μm CMOS', { zh: '斩波稳定 CFBIA', en: 'Chopper-stabilised CFBIA' }, 'DC-Servo', { zh: 'FVF 自举', en: 'FVF bootstrapping' }, { zh: '生物电信号采集', en: 'Biopotential acquisition' }],
        metrics: [
          { v: '476 GΩ',      k: { zh: 'DC 输入阻抗（目标 ≥2 GΩ）', en: 'DC input Z (target ≥2 GΩ)' } },
          { v: '25.9 μVrms',  k: { zh: '输入积分噪声（目标 ≤1 · 未达标）', en: 'Input noise (target ≤1 · not met)' }, bad: true },
          { v: '69.6 μA',     k: { zh: '静态电源电流（约 125 μW）', en: 'Quiescent current (≈125 μW)' } },
        ],
        scope: { zh: '全部为原理图级前仿真，尚无版图、后仿、流片与实测。',
                 en: 'All schematic-level pre-layout simulation; no layout, post-layout, tape-out or measurement.' },
      },

      /* ---------------------------------------------------------------- P3 */
      {
        id: 'gzip',
        period: { zh: '2025.03 – 2025.08', en: 'Mar 2025 – Aug 2025' },
        kind: { zh: '竞赛 · 队长', en: 'Competition · Team lead' },
        award: { zh: '第九届全国大学生集成电路创新创业大赛 全国二等奖 · 华东赛区一等奖', en: 'National Second Prize, 9th National IC Innovation & Entrepreneurship Competition · First Prize, East China Region' },
        role: { zh: '队长 · 总体架构与板级验证', en: 'Team lead · architecture and board-level verification' },
        name: { zh: 'FPGA GZIP / Deflate 压缩器 IP 核', en: 'FPGA GZIP / Deflate Compressor IP Core' },
        summary: { zh: '可综合的 GZIP 兼容流式压缩 IP 核，覆盖 LZ77 最长匹配、动态 Huffman 编码、位流打包、CRC32 与 GZIP 封装。我担任队长，负责总体架构与 DEFLATE 的硬件映射步骤、国赛技术文档、板级验证，并扩展 FT232H 高速接口、搭建 Python 解压与 CRC 闭环校验。',
                   en: 'A synthesizable, GZIP-compatible streaming compressor IP core covering LZ77 longest-match search, real-time dynamic Huffman coding, bitstream packing, CRC32 and the GZIP wrapper. As team lead I owned the overall architecture, the hardware mapping of the DEFLATE pipeline and the national-round technical report, ran board-level verification, extended a high-speed FT232H interface and built a Python decompression plus CRC closed-loop check.' },
        tags: ['Verilog', 'Deflate / LZ77', { zh: '动态 Huffman', en: 'Dynamic Huffman' }, 'AXI-Stream', 'FT232H'],
        metrics: [
          { v: '41.66%',   k: { zh: '512 KB 样例空间节省率', en: 'Space saving, 512 KB sample' } },
          { v: '≈40 MB/s', k: { zh: '端到端吞吐（实测）', en: 'End-to-end throughput (measured)' } },
          { v: '128 MHz',  k: { zh: '核级参考频率', en: 'Core-level reference frequency' } },
        ],
        scope: { zh: '核心 RTL 基于开源实现，团队完成 Robei 迁移、验证与系统扩展；128 MHz 为核级参考口径，端到端实测约 40 MB/s。',
                 en: 'The core RTL builds on an open-source implementation; the team did the Robei migration, verification and system extension. 128 MHz is a core-level reference; end-to-end measured ≈40 MB/s.' },
      },

      /* ---------------------------------------------------------------- P4 */
      {
        id: 'vision',
        period: { zh: '2025.08 – 2025.11', en: 'Aug 2025 – Nov 2025' },
        kind: { zh: '嵌入式系统', en: 'Embedded systems' },
        role: { zh: 'ARM 端软件与系统联调', en: 'ARM-side software and integration' },
        name: { zh: 'FPGA + RK3568 端云协同智慧视觉系统', en: 'FPGA + RK3568 Edge–Cloud Intelligent Vision System' },
        summary: { zh: 'FPGA 与 RK3568 异构的端云协同视觉平台：FPGA 完成三路摄像头采集、ISP 预处理与 PCIe DMA 传输，ARM 端做 NPU 推理与云端告警联动。我负责 ARM 端软件与 FPGA–ARM 联调，实现 Qt 多线程应用、RKNN INT8 推理、多模型动态调度，并分别实现 YOLOv5 的 anchor 解码与 YOLOv6 的 DFL 回归后处理。',
                   en: 'A heterogeneous edge–cloud vision platform pairing an FPGA with an RK3568: the FPGA captures three camera streams, runs ISP pre-processing and transfers over PCIe DMA, while the ARM side performs NPU inference and cloud alarm reporting. I owned the ARM-side software and FPGA–ARM integration — a multithreaded Qt application, RKNN INT8 inference, dynamic multi-model scheduling, and separate post-processing for YOLOv5 anchor decoding and YOLOv6 DFL regression.' },
        tags: ['PG2L50H FPGA', 'RK3568J', 'PCIe DMA', 'RKNN INT8', 'YOLOv5 / v6'],
        metrics: [
          { v: '≈25 fps', k: { zh: '采集与显示帧率', en: 'Capture and display frame rate' } },
          { v: '≈20 fps', k: { zh: '推理与显示帧率', en: 'Inference and display frame rate' } },
          { v: '3',       k: { zh: '三路真实摄像头输入', en: 'Real camera inputs' } },
        ],
        scope: { zh: '三路真实输入、伪四路输出（第四路为复制画面）；报告中提到的 40–50 fps 是后续优化目标，并非实测。',
                 en: 'Three real inputs with a duplicated fourth display channel; the 40–50 fps mentioned in the report is a future optimisation target, not a measured result.' },
      },
    ],
  },

  /* ------------------------------------------------------------------ 荣誉奖励 */
  awards: {
    title: { zh: '荣誉与奖励', en: 'Honours & Awards' },
    items: [
      { year: '2025.12', name: { zh: '国家奖学金', en: 'National Scholarship' }, org: { zh: '教育部', en: 'Ministry of Education' }, star: true },
      { year: '2025.12', name: { zh: '南京大学优秀学生标兵', en: 'Outstanding Student Model, Nanjing University' }, org: { zh: '南京大学', en: 'Nanjing University' }, star: true },
      { year: '2025.08', name: { zh: '第九届全国大学生集成电路创新创业大赛 全国二等奖', en: 'National Second Prize, 9th National IC Innovation & Entrepreneurship Competition' }, org: { zh: '工业和信息化部人才交流中心 · 队长', en: 'MIIT Talent Exchange Center · team lead' }, star: true },
      { year: '2026', name: { zh: '第十届集创赛 华东赛区三等奖', en: 'Third Prize, East China Region, 10th IC Competition' }, org: { zh: '全国大学生集成电路创新创业大赛组委会 · 队长', en: 'Competition Organising Committee · team lead' } },
      { year: '2025', name: { zh: '第九届集创赛 华东赛区一等奖', en: 'First Prize, East China Region, 9th IC Competition' }, org: { zh: '全国大学生集成电路创新创业大赛组委会', en: 'Competition Organising Committee' } },
      { year: '2024.12', name: { zh: '汝立奖学金', en: 'Ruli Scholarship' }, org: { zh: '南京大学', en: 'Nanjing University' }, star: true },
      { year: '2025.05', name: { zh: '南京大学优秀共青团员', en: 'Outstanding Communist Youth League Member' }, org: { zh: '共青团南京大学委员会', en: 'CYLC Committee, Nanjing University' } },
      { year: '2025', name: { zh: '“南大演说家”决赛 校级三等奖', en: 'Third Prize, “NJU Speaker” Final' }, org: { zh: '南京大学', en: 'Nanjing University' } },
      { year: '2026', name: { zh: '南京大学基层学生会优秀品牌项目（芯未来）', en: 'Outstanding Student Union Brand Project, Nanjing University (“Chip Future”)' }, org: { zh: '南京大学', en: 'Nanjing University' } },
      { year: '2024', name: { zh: '电子工艺创新暨仪器仪表大赛 院级三等奖', en: 'Third Prize, Electronic Process Innovation & Instrumentation Contest' }, org: { zh: '南京大学集成电路学院', en: 'School of Integrated Circuits, NJU' } },
      { year: '2024.12', name: { zh: '太湖马拉松 优秀志愿者', en: 'Outstanding Volunteer, Taihu Marathon' }, org: { zh: '太湖马拉松组委会', en: 'Taihu Marathon Committee' } },
    ],
  },

  /* ---------------------------------------------------------------------- 技能 */
  skills: {
    title: { zh: '技能', en: 'Skills' },
    groups: [
      { name: { zh: '编程语言', en: 'Programming' },
        items: ['C', 'Python', 'Verilog', 'LaTeX', { zh: 'MATLAB', en: 'MATLAB' }] },
      { name: { zh: 'EDA 与工具链', en: 'EDA & toolchain' },
        items: [{ zh: 'Cadence Virtuoso / Spectre', en: 'Cadence Virtuoso / Spectre' }, 'OCEAN', 'Vivado', 'Robei EDA', 'Git', 'VS Code'] },
      { name: { zh: '电路设计能力', en: 'Circuit design' },
        items: [{ zh: '模拟 / 混合信号电路设计', en: 'Analog & mixed-signal design' },
                { zh: 'gm/ID 设计方法学', en: 'gm/ID methodology' },
                { zh: 'PVT 与蒙特卡洛验证', en: 'PVT & Monte-Carlo verification' },
                { zh: '噪声与稳定性分析', en: 'Noise & stability analysis' },
                { zh: 'S 参数 / 谐波平衡仿真', en: 'S-parameter / HB simulation' }] },
      { name: { zh: '数字与系统', en: 'Digital & systems' },
        items: [{ zh: 'FPGA RTL 设计与时序收敛', en: 'FPGA RTL & timing closure' },
                { zh: 'AXI / PCIe 总线协议', en: 'AXI / PCIe protocols' },
                { zh: '嵌入式 Linux 与 NPU 部署', en: 'Embedded Linux & NPU deployment' },
                { zh: '多目标优化与仿真自动化', en: 'Multi-objective optimisation & simulation automation' }] },
      { name: { zh: '语言', en: 'Languages' },
        items: [{ zh: '中文（母语）', en: 'Chinese (native)' }, { zh: '英语 CET-6 559', en: 'English — CET-6 559' }] },
    ],
  },

  /* -------------------------------------------------------------- 学生工作服务 */
  service: {
    title: { zh: '学生工作', en: 'Leadership & Service' },
    items: [
      { period: { zh: '2025.12 – 至今', en: 'Dec 2025 – present' },
        role: { zh: '南京大学集成电路学院学生会 执行主席', en: 'Executive President, Student Union, School of Integrated Circuits' },
        desc: { zh: '统筹 19 人团队，下设主席团、学术部、宣传部和文体部，工作围绕思想引领、学业成长、专业实践、校园文化与权益服务展开。',
                en: 'Leading a 19-member student union with a presidium plus academic, publicity and culture–sports departments, covering ideological guidance, academic support, industry practice, campus culture and student welfare.' },
        points: [
          { zh: '牵头立项「芯未来」品牌项目（芯视野 / 芯练兵 / 芯机会）：组织访企研学华为南研所、中电五十五所、长鑫存储等，覆盖 60 余人次；对接 17 家企业开展实习就业服务，累计投递简历 3000 余份、达成初步意向 500 余人次；项目获评南京大学基层学生会优秀品牌项目。',
            en: 'Initiated the “Chip Future” brand programme (Vision / Training / Opportunity): industry visits to Huawei Nanjing, CETC-55 and CXMT covering 60+ participants; a careers module connecting 17 companies, with 3,000+ résumés submitted and 500+ preliminary matches. The programme was named an Outstanding Student Union Brand Project at Nanjing University.' },
          { zh: '常态化开展「芯光」学业帮扶：「芯光伙伴」一对一结对累计形成 267 份标准化帮扶记录，「芯光课堂」由学习骨干担任小讲师开展重点课程讲解与答疑。',
            en: 'Ran the ongoing “Chip Light” academic-support scheme: 267 standardised one-to-one tutoring records, plus peer-taught review sessions on core courses.' },
          { zh: '校园文化：举办学院首届迎新晚会、首届「喆塔杯」歌王争霸赛，延续「芯羽杯」羽毛球赛、「芯青年」篮球赛等活动；跨院系活动累计吸引兄弟院系 300 余名学生参与，并协同校学生会承办南京大学「十佳歌手」大赛苏州校区选拔赛。',
            en: 'Campus culture: launched the school’s first welcome gala and first singing contest, continued the badminton and basketball tournaments, and drew 300+ students from other schools to cross-department events; also co-hosted the Suzhou campus heat of Nanjing University’s Top-Ten Singers competition.' },
          { zh: '权益服务：通过线上调研与线下座谈收集餐饮、充电桩、自习空间、校园网络等问题 37 项，依托学代会提案跟进整改，推动超过半数得到实质性解决（含充电桩升级改造）。',
            en: 'Student welfare: collected 37 issues on catering, EV charging, study spaces and campus network through surveys and forums, tracked them via student congress proposals, and saw over half substantially resolved — including an upgrade of the EV charging facilities.' },
        ] },
      { period: { zh: '2024.11 – 至今', en: 'Nov 2024 – present' },
        role: { zh: '大型活动主持人与电台主播', en: 'Event host and campus radio presenter' },
        desc: { zh: '担任第八届中国研究生创“芯”大赛路演环节主持人、南京大学“十佳歌手”大赛苏州校区选拔赛主持人、苏州校区十佳歌手大赛总决赛主持人，以及青时 FM 播音员。',
                en: 'Hosted the roadshow of the 8th China Graduate IC Innovation Competition, the Suzhou campus heat of Nanjing University’s Top-Ten Singers competition and its campus final, and presented on QingShi FM.' } },
    ],
  },

  /* ---------------------------------------------------------------------- 联系 */
  contact: {
    title: { zh: '联系方式', en: 'Contact' },
    intro: { zh: '欢迎就高速接口与光电互连集成电路方向的科研合作、实习机会与我联系。',
             en: 'I welcome contact regarding research collaboration or internships in high-speed interface and optoelectronic interconnect IC design.' },
    items: [
      { label: { zh: '邮箱', en: 'Email' }, value: '231880490@smail.nju.edu.cn', href: 'mailto:231880490@smail.nju.edu.cn' },
      { label: { zh: '单位', en: 'Affiliation' }, value: { zh: '南京大学集成电路学院', en: 'School of Integrated Circuits, Nanjing University' } },
      { label: { zh: '地址', en: 'Address' }, value: { zh: '江苏省苏州市虎丘区太湖大道 1520 号 南京大学苏州校区', en: '1520 Taihu Avenue, Huqiu District, Suzhou, Jiangsu, China' } },
    ],
  },
};
