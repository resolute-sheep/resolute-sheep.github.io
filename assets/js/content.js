/* =============================================================================
 * content.js — 站点全部内容（中英双语）
 * -----------------------------------------------------------------------------
 * 想改网站内容，只需要改这个文件。每一处文案都是 { zh: "...", en: "..." }，
 * 中文和英文各写一份即可，页面会自动跟随右上角的语言开关切换。
 *
 * 数据口径说明：所有指标都保留“验证条件”（前仿真 / 实测 / 核级参考），
 * 未达标的指标如实标注。这部分依据你工作区里的三份《项目详细复习文档》。
 * ========================================================================== */

const CONTENT = {

  /* ---------------------------------------------------------------- 站点信息 */
  site: {
    name:   { zh: '杨卓毅', en: 'Yang Zhuoyi' },
    nameEn: { zh: 'Yang Zhuoyi', en: '杨卓毅' },
    title:  { zh: '南京大学 集成电路学院 · 2023 级本科生',
              en: 'Undergraduate, School of Integrated Circuits, Nanjing University' },
    tagline: { zh: '模拟与混合信号集成电路设计',
               en: 'Analog & Mixed-Signal Integrated Circuit Design' },
    email: '231880490@smail.nju.edu.cn',
    location: { zh: '江苏 苏州 · 南京大学苏州校区', en: 'Suzhou, Jiangsu, China' },
    status: { zh: '2027 届 · 推免申请中', en: 'Class of 2027 · Applying for graduate admission' },
  },

  /* -------------------------------------------------- 首屏右侧的身份信息卡 */
  idcard: {
    title: { zh: '基本信息', en: 'At a glance' },
    rows: [
      { k: { zh: '学院',   en: 'School' },  v: { zh: '南京大学 集成电路学院', en: 'School of Integrated Circuits, Nanjing University' } },
      { k: { zh: '专业',   en: 'Major' },   v: { zh: '集成电路设计与集成系统', en: 'IC Design & Integrated Systems' } },
      { k: { zh: '年级',   en: 'Year' },    v: { zh: '2023 级本科 · 2027 届', en: 'Class of 2027' } },
      { k: { zh: '方向',   en: 'Focus' },   v: { zh: '模拟与混合信号集成电路设计', en: 'Analog & mixed-signal IC design' } },
      { k: { zh: '所在地', en: 'Based in' }, v: { zh: '江苏 苏州', en: 'Suzhou, China' } },
    ],
  },

  /* ------------------------------------------------------------ 界面文字标签 */
  ui: {
    langLabel:   { zh: 'EN', en: '中文' },
    langTitle:   { zh: 'Switch to English', en: '切换到中文' },
    themeLabel:  { zh: '配色', en: 'Theme' },
    themes: {
      academic:  { zh: '学术', en: 'Academic' },
      portfolio: { zh: '作品集', en: 'Portfolio' },
      terminal:  { zh: '终端', en: 'Terminal' },
    },
    menu:        { zh: '目录', en: 'Menu' },
    metricLabel: { zh: '关键指标', en: 'Key metrics' },
    scopeLabel:  { zh: '验证边界', en: 'Scope & caveats' },
    awardsMore:  { zh: '展开其余荣誉', en: 'Show all awards' },
    footer:      { zh: '本站为静态页面，可用右上角开关切换中英文与三套配色。',
                   en: 'Static site — use the switches above to change language and theme.' },
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
      { zh: '我是杨卓毅，南京大学集成电路学院 2023 级本科生，主修集成电路设计与集成系统，中共预备党员。本科阶段我把研究兴趣聚焦在模拟与混合信号集成电路设计，并以射频电路、数字系统和设计自动化作为能力补充。',
        en: 'I am Zhuoyi Yang, a third-year undergraduate at the School of Integrated Circuits, Nanjing University, majoring in Integrated Circuit Design and Integrated Systems. My research interest centres on analog and mixed-signal IC design, complemented by RF circuits, digital systems, and design automation.' },
      { zh: '我较早进入实验室参与科研实践，先后参与四项科研与工程项目：在 AI 辅助毫米波电路设计中搭建仿真自动化平台，在 0.18 μm CMOS 低噪声模拟前端中完成斩波稳定架构的设计与验证，在 FPGA GZIP 压缩器项目中担任队长，并在 FPGA + ARM 异构平台上完成端云协同视觉系统。这些经历让我体会到模拟设计“于细微处见功夫”——一个偏置点的选取、一对管子的宽长比，都可能决定系统性能的上限。',
        en: 'I entered the lab early and have since worked on four research and engineering projects: building a simulation-automation platform for AI-assisted mm-wave circuit design, designing and verifying a chopper-stabilised low-noise analog front end in 0.18 μm CMOS, leading an FPGA GZIP compressor as team captain, and developing an edge–cloud vision system on an FPGA + ARM heterogeneous platform. These projects taught me that analog design is decided in the details — a bias point, a device aspect ratio, can set the ceiling of the whole system.' },
      { zh: '学习之外，我现任学院学生会执行主席，累计志愿服务超过 200 小时，并担任过大型竞赛路演与文艺晚会主持人。',
        en: 'Beyond coursework, I serve as Executive President of the student union of my school, have contributed over 200 hours of volunteering, and have hosted major competition roadshows and gala events.' },
    ],
    facts: [
      { k: { zh: '学位课程学分绩', en: 'Major-course GPA' }, v: '4.53 / 5.0', sub: { zh: '专业排名 9 / 153', en: 'Rank 9 / 153' } },
      { k: { zh: '全部课程学分绩', en: 'Overall GPA' },      v: '4.57 / 5.0', sub: { zh: '专业排名 5 / 153', en: 'Rank 5 / 153' } },
      { k: { zh: '英语六级', en: 'CET-6' },                  v: '559',       sub: { zh: '2025 年 12 月', en: 'Dec 2025' } },
      { k: { zh: '最高荣誉', en: 'Top honour' },             v: { zh: '国家奖学金', en: 'National Scholarship' }, sub: { zh: '2024–2025 学年', en: 'AY 2024–2025' } },
    ],
  },

  /* ------------------------------------------------------------------ 教育背景 */
  education: {
    title: { zh: '教育背景', en: 'Education' },
    school: { zh: '南京大学 · 集成电路学院', en: 'Nanjing University · School of Integrated Circuits' },
    degree: { zh: '工学学士 · 集成电路设计与集成系统', en: 'B.Eng. in Integrated Circuit Design and Integrated Systems' },
    period: { zh: '2023.09 – 2027.06（预计）', en: 'Sep 2023 – Jun 2027 (expected)' },
    gpa: [
      { k: { zh: '学位课程学分绩', en: 'Major-course GPA' }, v: '4.53 / 5.0', sub: { zh: '专业排名 9 / 153', en: 'Rank 9 / 153' } },
      { k: { zh: '全部课程学分绩', en: 'Overall GPA' },      v: '4.57 / 5.0', sub: { zh: '专业排名 5 / 153', en: 'Rank 5 / 153' } },
      { k: { zh: '已修学分', en: 'Credits earned' },         v: '156.5',     sub: { zh: '截至 2026 年 8 月', en: 'as of Aug 2026' } },
      { k: { zh: '英语六级', en: 'CET-6' },                  v: '559',       sub: { zh: '阅读 215 / 听力 182 / 写作翻译 162', en: 'R 215 / L 182 / W 162' } },
    ],
    coursesTitle: { zh: '核心课程成绩', en: 'Core coursework' },
    courses: [
      { name: { zh: '数字集成电路', en: 'Digital Integrated Circuits' },       score: '99' },
      { name: { zh: '数据结构与算法', en: 'Data Structures & Algorithms' },     score: '98' },
      { name: { zh: '信息科学中的物理学', en: 'Physics in Information Science' }, score: '98' },
      { name: { zh: '模拟集成电路', en: 'Analog Integrated Circuits' },         score: '96' },
      { name: { zh: '半导体物理', en: 'Semiconductor Physics' },                score: '93' },
      { name: { zh: '集成电路制造技术', en: 'IC Manufacturing Technology' },     score: '92' },
      { name: { zh: '数字信号处理', en: 'Digital Signal Processing' },          score: '90' },
      { name: { zh: '高级模拟及射频集成电路设计与实践', en: 'Advanced Analog & RF IC Design Lab' }, score: '87.5' },
      { name: { zh: '集成电路器件', en: 'IC Devices' },                         score: '88' },
      { name: { zh: '电路分析', en: 'Circuit Analysis' },                       score: '88' },
      { name: { zh: '信号与系统', en: 'Signals and Systems' },                  score: '85' },
      { name: { zh: '射频与功率集成电路', en: 'RF and Power ICs' },             score: '85' },
    ],
  },

  /* ------------------------------------------------------------------ 研究兴趣 */
  research: {
    title: { zh: '研究兴趣', en: 'Research Interests' },
    items: [
      { icon: '◈',
        name: { zh: '模拟与混合信号集成电路设计', en: 'Analog & Mixed-Signal IC Design' },
        desc: { zh: '低噪声低功耗生物电信号采集前端、仪表放大器拓扑、斩波稳定与失调抑制、噪声—功耗—线性度权衡。',
                en: 'Low-noise low-power biopotential acquisition front ends, instrumentation amplifier topologies, chopper stabilisation and offset rejection, and the noise–power–linearity trade-off.' } },
      { icon: '◎',
        name: { zh: '射频与毫米波集成电路', en: 'RF & mm-Wave Integrated Circuits' },
        desc: { zh: '毫米波功率放大器、宽带匹配与片上变压器、S 参数与谐波平衡仿真方法学。',
                en: 'mm-Wave power amplifiers, broadband matching and on-chip transformers, and S-parameter / harmonic-balance simulation methodology.' } },
      { icon: '⟁',
        name: { zh: 'AI 辅助电路设计自动化', en: 'AI-Assisted Design Automation' },
        desc: { zh: '神经网络代理模型、多目标黑盒优化（TPE / CMA-ES / NSGA-II）、EDA 仿真自动化与约束管理。',
                en: 'Neural surrogate models, multi-objective black-box optimisation (TPE / CMA-ES / NSGA-II), EDA simulation automation and constraint handling.' } },
      { icon: '▤',
        name: { zh: '数字与异构计算系统', en: 'Digital & Heterogeneous Systems' },
        desc: { zh: 'FPGA 硬件加速与时序收敛、软硬件协同、边缘 AI 推理部署与端到端性能分析。',
                en: 'FPGA hardware acceleration and timing closure, hardware–software co-design, edge AI inference deployment and end-to-end performance analysis.' } },
    ],
  },

  /* ------------------------------------------------------------------ 科研项目 */
  projects: {
    title: { zh: '科研与工程项目', en: 'Research & Engineering Projects' },
    note: { zh: '所有指标均标注验证层级；未达标的指标如实列出。',
            en: 'Every figure carries its verification level; metrics that fell short of target are listed as such.' },
    items: [
      /* ---------------------------------------------------------------- P1 */
      {
        id: 'ai4rf',
        period: { zh: '2025.07 – 2026.12', en: 'Jul 2025 – Dec 2026' },
        kind: { zh: '科研训练', en: 'Research' },
        role: { zh: '仿真自动化平台负责人', en: 'Simulation-automation platform lead' },
        name: { zh: 'AI 辅助毫米波功率放大器敏捷设计', en: 'AI-Assisted Agile Design of mm-Wave Power Amplifiers' },
        lead: { zh: '把课题组已有的变压器 S 参数代理模型接入 Cadence 仿真，构建「多目标优化 + EDA 自动仿真」的敏捷设计闭环，将手工调参变成可记录、可恢复、可比较的闭环搜索。',
                en: 'Connected our group’s existing transformer S-parameter surrogate model to Cadence simulation, building a closed loop of multi-objective optimisation plus automated EDA simulation — turning manual tuning into a search that is recorded, resumable, and comparable.' },
        tags: ['28 nm CMOS', '120–140 GHz', { zh: '变压器耦合 PA', en: 'Transformer-coupled PA' }, 'Optuna', 'TPE / CMA-ES / NSGA-II', 'Cadence Spectre', 'OCEAN', 'FastAPI', 'HFSS'],
        points: [
          { zh: '独立搭建 FastAPI + Cadence OCEAN 仿真自动化平台，完成电路参数批量配置、多工况自动运行与仿真指标自动解析。',
            en: 'Built the FastAPI + Cadence OCEAN automation platform: batch parameter configuration, automated multi-condition runs, and automatic parsing of simulation metrics.' },
          { zh: '基于 Optuna 组织 TPE、NSGA-II、CMA-ES 等算法，实现 18 维搜索坐标到 26 维物理参数的约束映射。',
            en: 'Orchestrated TPE, NSGA-II and CMA-ES through Optuna, mapping an 18-dimensional search space onto 26 constrained physical parameters.' },
          { zh: '分级验证策略：小信号 S 参数仿真筛选匹配、增益与稳定性；谐波平衡（HB）仿真评估 PAE、输出功率与压缩特性。',
            en: 'Two-tier verification: small-signal S-parameter simulation screens matching, gain and stability; harmonic-balance simulation evaluates PAE, output power and compression.' },
          { zh: '实现约束处理、结果缓存、日志与失败重试，应对射频仿真成本高、易不收敛的工程问题。',
            en: 'Implemented constraint handling, result caching, logging and failure retry to cope with expensive and often non-converging RF simulations.' },
          { zh: '历经 11 个算法版本迭代，逐步收敛到「稳定性筛选 + 规格约束」的分层优化流程。',
            en: 'Iterated through 11 algorithm versions, converging on a layered pipeline that separates stability screening from specification constraints.' },
        ],
        metrics: [
          { v: '≈34.8%', k: { zh: 'PAE（满足全部规格）', en: 'PAE, all specs met' } },
          { v: '≈35.5%', k: { zh: '搜索到的最高 PAE（S11 不满足约束）', en: 'Highest PAE found (S11 violated)' } },
          { v: '99.6%', k: { zh: '稳定性筛选通过率', en: 'Stability-screen pass rate' } },
          { v: '≈25%', k: { zh: '完整规格满足率', en: 'Full-spec pass rate' } },
        ],
        scope: { zh: 'Spectre 仿真使用代理模型预测的 S 参数，并非 EM 真值，最终候选仍需回到 HFSS 复验；99.6% 与 25% 两个比例仅统计 v5 版本的 500 组 CMA-HB 样本。',
                 en: 'Spectre simulations consume surrogate-predicted S-parameters rather than EM ground truth, so final candidates still require HFSS re-verification. The 99.6% and 25% figures cover only the 500 CMA-HB samples of version v5.' },
      },

      /* ---------------------------------------------------------------- P2 */
      {
        id: 'afe',
        period: { zh: '2026 · 第十届集创赛参赛作品', en: '2026 · 10th IC Innovation Competition entry' },
        kind: { zh: '模拟 IC 设计', en: 'Analog IC design' },
        role: { zh: '架构设计与仿真验证（斩波稳定 CFBIA 与 DC-Servo 环路）', en: 'Architecture and simulation (chopper-stabilised CFBIA and DC-servo loop)' },
        name: { zh: '低噪声高输入阻抗生物电信号模拟前端', en: 'Low-Noise High-Input-Impedance Biopotential Analog Front End' },
        lead: { zh: '面向可穿戴生物电信号采集（0.1–2 mV @ 0.05–150 Hz）的 0.18 μm CMOS 模拟前端：斩波抑制 1/f 噪声与失调，DC-Servo 抵消差分电极失调，FVF 自举提升交流输入阻抗。',
                en: 'A 0.18 μm CMOS front end for wearable biopotential acquisition (0.1–2 mV across 0.05–150 Hz): chopping suppresses 1/f noise and offset, a DC-servo loop cancels differential electrode offset, and FVF bootstrapping raises AC input impedance.' },
        tags: ['0.18 μm CMOS', '1.8 V', { zh: '斩波稳定', en: 'Chopper stabilisation' }, 'CFBIA / CBIA', 'DC-Servo', { zh: 'FVF 自举', en: 'FVF bootstrapping' }, { zh: '全差分跨阻级', en: 'Fully-differential TIA stage' }],
        points: [
          { zh: '完成从指标分解、架构选型、晶体管级设计到 PVT 扫描与 10 pF 负载仿真的完整设计闭环。',
            en: 'Completed the full loop from specification breakdown and architecture selection to transistor-level design, PVT sweeps and 10 pF load simulation.' },
          { zh: '架构由斩波调制、DC-Servo 失调抑制、FVF 输入级、主动自举与全差分跨阻输出级组成，三条主线相互耦合。',
            en: 'The architecture combines chopper modulation, DC-servo offset rejection, an FVF input stage, active bootstrapping and a fully-differential transimpedance output stage — three coupled design axes.' },
          { zh: '在 0.05–150 Hz 内做输入等效噪声分解，定位噪声未达标的主导来源（输入跨导管、伺服支路、开关或后级）。',
            en: 'Performed input-referred noise decomposition over 0.05–150 Hz to locate what dominates the noise shortfall: input transconductor, servo branch, switches or later stages.' },
          { zh: '通过工作点与极零点分析，量化斩波开关的电荷注入、时钟馈通与寄生电容对交流输入阻抗的影响，并用 FVF 自举补偿。',
            en: 'Used operating-point and pole-zero analysis to quantify how switch charge injection, clock feedthrough and parasitics degrade AC input impedance, then compensated with FVF bootstrapping.' },
          { zh: '结论：当前尺寸、偏置、带宽与斩波频率尚未优化到目标噪声，明确了器件级噪声贡献分解与版图后仿真的后续方向。',
            en: 'Conclusion: sizing, bias, bandwidth and chopping frequency are not yet optimised for the noise target; next steps are device-level noise contribution analysis and post-layout simulation.' },
        ],
        metrics: [
          { v: '69.57 μA', k: { zh: '静态电源电流（典型，1.8 V 下约 125.2 μW）', en: 'Quiescent supply current (typ., ≈125.2 μW at 1.8 V)' } },
          { v: '476.1 GΩ', k: { zh: 'DC 输入阻抗（目标 ≥2 GΩ · 满足）', en: 'DC input impedance (target ≥2 GΩ · met)' } },
          { v: '3.174 GΩ', k: { zh: '150 Hz 输入阻抗（目标 ≥400 MΩ · 满足）', en: 'Input impedance at 150 Hz (target ≥400 MΩ · met)' } },
          { v: '25.9 μVrms', k: { zh: '输入积分噪声（目标 ≤1 μVrms · 未达标）', en: 'Integrated input noise (target ≤1 μVrms · not met)' }, bad: true },
          { v: '60.42 dB', k: { zh: 'SFDR（目标 ≥70 dB · 未达标）', en: 'SFDR (target ≥70 dB · not met)' }, bad: true },
          { v: '±600 mV', k: { zh: 'DEO 扫描范围（原理图级）', en: 'DEO sweep range (schematic level)' } },
        ],
        scope: { zh: '全部数据为原理图级前仿真（1.62 / 1.8 / 1.92 V，−40 / 25 / 85 ℃，tt / ff / ss），尚无版图、后仿真、流片与实测；仿真电源点未覆盖赛题 1.6–1.98 V 的两个端点。CMRR 的 200 dB 以上数值来自理想对称原理图，不能外推为硅后性能。该项目为第十届集创赛初赛阶段作品，未获奖项。',
                 en: 'All data are schematic-level pre-layout simulations (1.62 / 1.8 / 1.92 V; −40 / 25 / 85 °C; tt / ff / ss). There is no layout, post-layout simulation, tape-out or measurement, and the simulated supply points do not cover the 1.6–1.98 V endpoints of the competition brief. The >200 dB CMRR comes from an ideally symmetric schematic and must not be extrapolated to silicon. This project is a preliminary-round entry of the 10th competition and received no award.' },
      },

      /* ---------------------------------------------------------------- P3 */
      {
        id: 'gzip',
        period: { zh: '2025.03 – 2025.08', en: 'Mar 2025 – Aug 2025' },
        kind: { zh: '竞赛 · 队长', en: 'Competition · Team lead' },
        award: { zh: '第九届全国大学生集成电路创新创业大赛 全国二等奖 · 华东赛区一等奖', en: 'National Second Prize, 9th National IC Innovation & Entrepreneurship Competition · First Prize, East China Region' },
        role: { zh: '队长 · 总体架构与板级验证', en: 'Team lead · architecture and board-level verification' },
        name: { zh: 'FPGA GZIP / Deflate 压缩器 IP 核', en: 'FPGA GZIP / Deflate Compressor IP Core' },
        lead: { zh: '可综合的 GZIP 兼容流式压缩 IP 核，覆盖 LZ77 最长匹配、动态 Huffman 实时编码、位流打包、CRC32 校验与 GZIP 封装。',
                en: 'A synthesizable, GZIP-compatible streaming compressor IP core covering LZ77 longest-match search, real-time dynamic Huffman coding, bitstream packing, CRC32 and the GZIP wrapper.' },
        tags: ['Verilog', 'Deflate', 'LZ77', { zh: '动态 Huffman', en: 'Dynamic Huffman' }, 'AXI-Stream', 'CRC32', 'Vivado', 'Robei EDA', 'FT232H'],
        points: [
          { zh: '作为队长确认作品总体架构与 DEFLATE 压缩算法的硬件映射步骤，负责总体方案与国赛技术文档撰写。',
            en: 'As team lead, defined the overall architecture and the hardware mapping of the DEFLATE pipeline, and owned the design proposal and national-round technical report.' },
          { zh: '团队完成 Robei 结构化迁移、模块接口整理、仿真与板级系统集成。',
            en: 'The team carried out the structured Robei migration, module interface cleanup, simulation and board-level system integration.' },
          { zh: '扩展 FT232H 异步 FIFO 高速接口，并搭建 Python 解压与 CRC 闭环校验流程，验证 GZIP 格式兼容性与数据一致性。',
            en: 'Extended a high-speed FT232H asynchronous FIFO interface and built a Python decompression plus CRC closed-loop check to verify GZIP format compatibility and data integrity.' },
          { zh: '数据流：LZ77 把重复字节串转为长度—距离对，再转 Deflate 符号并做 Huffman 编码，最后添加 GZIP 头、CRC32 与 ISIZE。',
            en: 'Data flow: LZ77 turns repeated byte strings into length–distance pairs, converted to Deflate symbols and Huffman-coded, then wrapped with the GZIP header, CRC32 and ISIZE.' },
          { zh: '4096 项哈希表支持 3–258 字节匹配、最大 16383 字节距离；超过 16 KB 的输入自动分块；8-bit 入 / 32-bit 出 AXI-Stream。',
            en: 'A 4096-entry hash table supports 3–258 byte matches and distances up to 16383 bytes; inputs above 16 KB are split automatically; 8-bit AXI-Stream input, 32-bit output.' },
        ],
        metrics: [
          { v: '41.66%', k: { zh: '512 KB 样例空间节省率（7-Zip fast 约 44%）', en: 'Space saving on a 512 KB sample (7-Zip fast ≈44%)' } },
          { v: '≈40 MB/s', k: { zh: '端到端吞吐（FT232H 实测口径）', en: 'End-to-end throughput (FT232H measured)' } },
          { v: '128 MHz', k: { zh: '核级参考频率（Artix-7，8,218 LUT / 25 BRAM36K）', en: 'Core-level reference (Artix-7, 8,218 LUT / 25 BRAM36K)' } },
          { v: '≈59.67 MHz', k: { zh: '团队 RX7020 完整系统 Fmax', en: 'Team RX7020 full-system Fmax' } },
        ],
        scope: { zh: '核心 RTL 基于开源实现（WangXuan95/FPGA-Gzip-compressor），团队工作集中在 Robei 迁移、接口整理、验证与系统扩展。128 MHz 为核级参考口径，不代表完整板级系统时序；128 MB/s 的理论上限还假设无反压、每拍接收 1 字节。',
                 en: 'The core RTL builds on an open-source implementation (WangXuan95/FPGA-Gzip-compressor); the team’s work was the Robei migration, interface cleanup, verification and system extension. 128 MHz is a core-level reference and does not represent full board-level timing; the 128 MB/s theoretical ceiling further assumes no back-pressure and one byte accepted per cycle.' },
      },

      /* ---------------------------------------------------------------- P4 */
      {
        id: 'vision',
        period: { zh: '2025.08 – 2025.11', en: 'Aug 2025 – Nov 2025' },
        kind: { zh: '嵌入式系统', en: 'Embedded systems' },
        role: { zh: 'ARM 端软件与 FPGA–ARM 系统联调', en: 'ARM-side software and FPGA–ARM integration' },
        name: { zh: 'FPGA + RK3568 端云协同智慧视觉系统', en: 'FPGA + RK3568 Edge–Cloud Intelligent Vision System' },
        lead: { zh: 'PG2L50H FPGA 与 RK3568J 处理器协同的异构视觉平台：FPGA 完成三路摄像头采集与 ISP 预处理，经 PCIe DMA 送入 ARM 端做 NPU 推理，异常触发后上传云端并推送告警。',
                en: 'A heterogeneous vision platform pairing a PG2L50H FPGA with an RK3568J processor: the FPGA captures three camera streams and runs ISP pre-processing, transfers over PCIe DMA for NPU inference on the ARM side, and uploads alarms to the cloud when anomalies fire.' },
        tags: ['PG2L50H FPGA', 'RK3568J', 'PCIe DMA', 'DDR3', 'RKNN INT8', 'YOLOv5 / v6', 'MobileNet', 'Qt', 'RGA'],
        points: [
          { zh: 'FPGA 侧：三路 OV5640 并行采集、8→16 bit 格式转换、中值滤波与灰度化、DDR3 缓冲、图像拼接与 PCIe DMA 传输。',
            en: 'FPGA side: three parallel OV5640 captures, 8→16 bit conversion, median filtering and greyscale, DDR3 buffering, image stitching and PCIe DMA transfer.' },
          { zh: 'ARM 侧：实现 Qt 多线程应用、RGA 预处理、RKNN INT8 推理、多模型动态调度与阈值调节、目标跟踪、告警与云端上传。',
            en: 'ARM side: a multithreaded Qt application, RGA pre-processing, RKNN INT8 inference, dynamic multi-model scheduling with tunable thresholds, object tracking, alarms and cloud upload.' },
          { zh: '因输出格式不同，分别实现 YOLOv5 的 anchor 解码与 YOLOv6 的 DFL 回归后处理，统一到同一跟踪与告警流程。',
            en: 'Implemented separate post-processing for YOLOv5 anchor decoding and YOLOv6 DFL regression, unified into a single tracking and alarming pipeline.' },
          { zh: '定位并解决总线打包错误导致的图像「垂直条纹」，以及数据搬运方式造成的 11.7 FPS 性能瓶颈。',
            en: 'Diagnosed and fixed “vertical stripes” caused by bus packing errors, and removed an 11.7 FPS bottleneck rooted in how image data was moved.' },
        ],
        metrics: [
          { v: '≈25 fps', k: { zh: '采集与显示帧率', en: 'Capture and display frame rate' } },
          { v: '≈20 fps', k: { zh: '推理与显示帧率', en: 'Inference and display frame rate' } },
          { v: '3 → 4', k: { zh: '三路真实输入，第四路显示通道为复制画面', en: 'Three real inputs; the fourth display channel is duplicated' } },
          { v: '3', k: { zh: '支持模型：YOLOv5 / YOLOv6 / MobileNet', en: 'Models supported: YOLOv5 / YOLOv6 / MobileNet' } },
        ],
        scope: { zh: '当前原型为三路真实摄像头输入、伪四路输出（第三路复制生成第四路）。项目报告中提到的 40–50 fps 是后续整帧传输优化的目标值，并非实测结果。',
                 en: 'The current prototype takes three real camera inputs and produces a pseudo-four-channel output (channel four duplicates channel three). The 40–50 fps mentioned in the project report is a planned optimisation target for whole-frame transfer, not a measured result.' },
      },

      /* ---------------------------------------------------------------- P5 */
      {
        id: 'opamp',
        period: { zh: '2026', en: '2026' },
        kind: { zh: '模拟 IC 设计', en: 'Analog IC design' },
        role: { zh: '独立完成指标分解、设计、仿真与稳定性补偿', en: 'Sole contributor: specifications, design, simulation and compensation' },
        name: { zh: '两级 Miller 补偿运算放大器', en: 'Two-Stage Miller-Compensated Operational Amplifier' },
        lead: { zh: '基于 TSMC 0.18 μm RF 工艺、3.3 V I/O 器件的两级 Miller 补偿运放，从 gm/ID 查表定尺寸到环路稳定性补偿的完整晶体管级设计训练。',
                en: 'A two-stage Miller-compensated op-amp in TSMC 0.18 μm RF technology with 3.3 V I/O devices — an end-to-end transistor-level exercise from gm/ID table-based sizing to loop-stability compensation.' },
        tags: ['TSMC 0.18 μm RF', '3.3 V I/O', 'gm/ID', { zh: 'Miller 补偿', en: 'Miller compensation' }, 'Cadence Virtuoso / Spectre'],
        points: [
          { zh: '建立 nch3 / pch3 的 gm/ID 查找表，依据增益、GBW、相位裕度、压摆率与功耗指标完成初始尺寸设计。',
            en: 'Built nch3 / pch3 gm/ID lookup tables and sized the devices against gain, GBW, phase margin, slew rate and power targets.' },
          { zh: '首版开环增益 113 dB，但 GBW 仅 11.18 MHz、相位裕度 31.3°；通过工作点分析定位到输入对体效应降低了有效 gm，而单纯增大第二级又会抬升第一级输出节点寄生电容。',
            en: 'The first version reached 113 dB gain but only 11.18 MHz GBW and 31.3° phase margin. Operating-point analysis showed body effect reducing the input pair’s effective gm, while simply enlarging the second stage added parasitic capacitance at the first-stage output node.' },
          { zh: '通过单参数扫描、寄生电容提取与极零点估算，联合调整输入级、补偿电容与调零电阻，而不是单独调某一个旋钮。',
            en: 'Used single-parameter sweeps, parasitic extraction and pole-zero estimation to tune the input stage, compensation capacitor and nulling resistor jointly rather than one knob at a time.' },
          { zh: '形成的设计习惯：先定位限制因素，再选择设计旋钮，最后用仿真闭环验证。',
            en: 'The habit this built: locate the limiting factor first, then pick the design knob, then close the loop with simulation.' },
        ],
        metrics: [
          { v: '112 dB', k: { zh: '开环增益', en: 'Open-loop gain' } },
          { v: '23.94 MHz', k: { zh: '单位增益带宽 GBW', en: 'Unity-gain bandwidth (GBW)' } },
          { v: '64.26°', k: { zh: '相位裕度', en: 'Phase margin' } },
          { v: '1.86 mW', k: { zh: '功耗', en: 'Power consumption' } },
        ],
        scope: { zh: '以上均为 TT 工艺角、27 ℃、3.3 V 供电、5 pF 负载下的原理图级前仿真结果，不包含版图寄生与后仿真。',
                 en: 'All figures are schematic-level pre-layout simulations at TT, 27 °C, 3.3 V supply and 5 pF load; layout parasitics and post-layout simulation are not included.' },
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
      { year: '2025', name: { zh: '第九届集创赛 华东赛区一等奖', en: 'First Prize, East China Region, 9th IC Competition' }, org: { zh: '全国大学生集成电路创新创业大赛组委会', en: 'Competition Organising Committee' } },
      { year: '2024.12', name: { zh: '汝立奖学金', en: 'Ruli Scholarship' }, org: { zh: '南京大学', en: 'Nanjing University' }, star: true },
      { year: '2025.05', name: { zh: '南京大学优秀共青团员', en: 'Outstanding Communist Youth League Member' }, org: { zh: '共青团南京大学委员会', en: 'CYLC Committee, Nanjing University' } },
      { year: '2025', name: { zh: '“南大演说家”决赛 校级三等奖', en: 'Third Prize, “NJU Speaker” Final' }, org: { zh: '南京大学', en: 'Nanjing University' } },
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
    title: { zh: '学生工作与志愿服务', en: 'Leadership & Service' },
    items: [
      { period: { zh: '2025.12 – 至今', en: 'Dec 2025 – present' },
        role: { zh: '南京大学集成电路学院学生会 执行主席', en: 'Executive President, Student Union, School of Integrated Circuits' },
        desc: { zh: '统筹学院学生活动，筹办迎新晚会等大型活动，累计参与超 1000 人次。',
                en: 'Coordinated school-wide student activities and organised large events such as the welcome gala, reaching over 1,000 participants.' } },
      { period: { zh: '2025.06 – 至今', en: 'Jun 2025 – present' },
        role: { zh: '学院党建工作站实践部 部员', en: 'Member, Practice Department, Party Building Station' },
        desc: { zh: '负责“芯启未来”青少年科普活动的策划与主讲，累计参与超 500 人次。',
                en: 'Planned and lectured the “Chip Future” youth science-popularisation programme, reaching over 500 participants.' } },
      { period: { zh: '2024.11 – 至今', en: 'Nov 2024 – present' },
        role: { zh: '大型活动主持人与电台主播', en: 'Host and campus radio presenter' },
        desc: { zh: '担任第八届中国研究生创“芯”大赛路演环节主持人、苏州校区十佳歌手大赛总决赛主持人、青时 FM 播音员。',
                en: 'Hosted the roadshow of the 8th China Graduate IC Innovation Competition and the Suzhou campus Top-Ten Singers final; presented on QingShi FM.' } },
      { period: { zh: '2024.09 – 至今', en: 'Sep 2024 – present' },
        role: { zh: '南京大学定向队 队员', en: 'Member, NJU Orienteering Team' },
        desc: { zh: '获得 3 次全勤奖，累计跑量超 1000 km。',
                en: 'Three full-attendance awards and over 1,000 km of cumulative running.' } },
      { period: { zh: '2024 – 2025', en: '2024 – 2025' },
        role: { zh: '社会实践与志愿服务', en: 'Social practice and volunteering' },
        desc: { zh: '参与 3 项社会实践（“AI 智行”校级特别专项、“智汇未来”等），累计志愿服务超 200 小时；曾作为大学生代表在苏州高新区高校企业中小学合作座谈会上发言。',
                en: 'Took part in three social-practice programmes (“AI in Action” university special project, “Smart Future”, among others) and accumulated over 200 hours of volunteering; spoke as a student representative at the Suzhou High-Tech District university–industry–school forum.' } },
    ],
  },

  /* ---------------------------------------------------------------------- 联系 */
  contact: {
    title: { zh: '联系方式', en: 'Contact' },
    intro: { zh: '欢迎就模拟与混合信号集成电路设计方向的科研合作、推免与实习机会与我联系。',
             en: 'I welcome contact regarding research collaboration, graduate admission or internships in analog and mixed-signal IC design.' },
    items: [
      { label: { zh: '邮箱', en: 'Email' }, value: '231880490@smail.nju.edu.cn', href: 'mailto:231880490@smail.nju.edu.cn' },
      { label: { zh: '单位', en: 'Affiliation' }, value: { zh: '南京大学集成电路学院', en: 'School of Integrated Circuits, Nanjing University' } },
      { label: { zh: '地址', en: 'Address' }, value: { zh: '江苏省苏州市虎丘区太湖大道 1520 号 南京大学苏州校区', en: '1520 Taihu Avenue, Huqiu District, Suzhou, Jiangsu, China' } },
    ],
  },
};
