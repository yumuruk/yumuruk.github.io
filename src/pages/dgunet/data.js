// DGU-Net 프로젝트 페이지 내용. 수치·수식은 IEEE Access 최종 원고(LaTeX)에서 그대로 옮겼다.

export const PAPER = {
  title: 'Detection-Guided Deep Unfolding for Joint Underwater Image Enhancement and Object Detection',
  name: 'DGU-Net',
  venue: 'IEEE Access',
  year: 2026,
  doi: '10.1109/ACCESS.2026.3659134',
  authors: [
    { name: 'Hansung Yu', href: 'https://yumuruk.github.io/' },
    { name: 'Chuong Hoang Vo' },
    { name: 'Chul Lee', href: 'https://cilab.dongguk.edu/', corresponding: true },
  ],
  affiliation: 'Department of Computer Science and Artificial Intelligence, Dongguk University, Seoul, Korea',
}

export const LINKS = [
  { label: 'Paper', href: `https://doi.org/${PAPER.doi}`, icon: 'fas fa-file-lines' },
  { label: 'Code', href: 'https://github.com/yumuruk/DGUNet', icon: 'fab fa-github' },
  {
    label: 'UJED Dataset',
    href: 'https://drive.google.com/drive/folders/1KiMzLJUgL0Y1zAQmyfXt4KhZCTc59HAB?usp=drive_link',
    icon: 'fas fa-database',
  },
  { label: 'BibTeX', href: '#bibtex', icon: 'fas fa-quote-right' },
]

export const ABSTRACT =
  'We address the limitation of conventional underwater image enhancement algorithms, which typically prioritize perceptual quality over downstream machine vision requirements. To this end, we first construct the Underwater Joint Enhancement and Detection (UJED) dataset, the first unified benchmark that provides both perceptual reference images and detection annotations within the same domain. Next, we propose Detection-Guided deep unfolding UIE Network (DGU-Net), which integrates physics-guided and detection-guided regularization into a joint optimization framework, balancing visual quality for human perception and detection accuracy for machine vision. We solve the optimization problem iteratively and then unroll the solver into a multistage network, where the optimization variables and regularizers are updated using closed-form solutions and learnable proximal operators. Experimental results demonstrate that the proposed algorithm achieves state-of-the-art detection performance without sacrificing visual quality.'

export const CONTRIBUTIONS = [
  {
    icon: 'fa-database',
    title: 'UJED dataset',
    text: 'The first unified underwater dataset with both enhancement reference images and object detection annotations, built on URPC 2019 {cite:urpc} (3,767 / 695 / 245 train / valid / test images, 4 classes).',
  },
  {
    icon: 'fa-crosshairs',
    title: 'Detection-guided formulation',
    text: 'A joint optimization problem that couples physics-based priors with a detection-guided term, plus two learnable regularizers that compensate for modeling inaccuracies.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Deep unfolding network',
    text: 'The iterative solver is unrolled into N blocks; each block updates the variables with closed-form solutions and the learnable regularizers with CNNs.',
  },
]

// ---------------------------------------------------------------------------
// 개선 전후 비교 샘플 (UJED test). 논문 Fig. 7과 같은 장면이며, 박스는 YOLOv9e 예측 / GT 주석.
const sample = (id, caption) => {
  const p = (name) => `/dgunet/samples/${id}/${name}.jpg`
  return {
    id,
    caption,
    thumb: p('thumb'),
    input: { clean: p('input'), det: p('input_det') },
    ours: { clean: p('ours'), det: p('ours_det') },
    ref: { clean: p('ref'), det: p('ref_det') },
    methods: [
      { name: 'CCLNet', ref: 'cclnet', src: p('det_CCLNet') },
      { name: 'CDF-UIE', ref: 'cdfuie', src: p('det_CDF_UIE') },
      { name: 'Dual-CLUE', ref: 'dualclue', src: p('det_DualNet') },
    ],
  }
}

export const SAMPLES = [
  sample('YN030001_14419', 'Echinus & holothurian next to a rock'),
  sample('GP010294_31723', 'Starfish & echinus on a sandy bed'),
]

export const GRADCAM = [
  { id: '2019v100458', input: '/dgunet/gradcam/2019v100458/input.jpg', ours: '/dgunet/gradcam/2019v100458/ours.jpg' },
  { id: 'YN030001_04361', input: '/dgunet/gradcam/YN030001_04361/input.jpg', ours: '/dgunet/gradcam/YN030001_04361/ours.jpg' },
]

// 검출 유도 항 설명용 클래스별 마스크 (논문 Fig. 4)
export const CLASSES = ['echinus', 'holothurian', 'scallop', 'starfish']
export const TERM_MAPS = {
  predOverlay: '/dgunet/term/pred_overlay.jpg',
  gtOverlay: '/dgunet/term/gt_overlay.jpg',
  pred: (i) => `/dgunet/term/pred_${i + 1}.jpg`,
  gt: (i) => `/dgunet/term/gt_${i + 1}.jpg`,
}

// ---------------------------------------------------------------------------
// 수식 (KaTeX). \htmlClass 로 항마다 class를 달아 범례와 연결한다.
const B = (s) => `\\mathbf{${s}}`

export const IMAGING_MODEL = `${B('I')} = ${B('J')}\\,${B('t')} + ${B('B')}\\,(${B('1')} - ${B('t')})`

export const TERMS = [
  {
    key: 'data',
    label: 'Data fidelity',
    color: 'sky',
    tex: `\\tfrac{1}{2}\\big\\|${B('J')}${B('t')}+${B('B')}(${B('1')}-${B('t')})-${B('I')}\\big\\|_2^2`,
    def: IMAGING_MODEL,
    text: 'Keeps the solution consistent with the physical underwater image formation model: the observation I is the clean image J attenuated by the transmission map t, plus the background light B scattered in.',
  },
  {
    key: 'img',
    label: 'Clean-image priors',
    color: 'violet',
    tex: `\\mathcal{R}_{${B('J')}}(${B('J')})`,
    def: `\\mathcal{R}_{${B('J')}}(${B('J')}) = \\big\\|\\overline{${B('J')}}_l-\\overline{${B('J')}}_m\\big\\|_1+\\big\\|\\overline{${B('J')}}_l-\\overline{${B('J')}}_s\\big\\|_1+\\eta_1\\big\\|\\mathcal{D}(${B('J')})\\big\\|_1+\\eta_2\\big\\|${B('1')}-\\mathcal{B}(${B('J')})\\big\\|_1`,
    text: 'Following Dual-CLUE {cite:dualclue}: gray-world color balance between the largest, middle and smallest channel means {cite:mlle}, together with dark-channel {cite:he,pan} and bright-channel {cite:yan} priors that push the restored image toward natural statistics.',
  },
  {
    key: 'phys',
    label: 'Physics-guided priors',
    color: 'amber',
    tex: `\\mathcal{R}_{${B('t')}}(${B('t')})+\\mathcal{R}_{${B('B')}}(${B('B')})`,
    def: `\\mathcal{R}_{${B('t')}}(${B('t')})+\\mathcal{R}_{${B('B')}}(${B('B')}) = \\tfrac{\\eta_3}{2}\\big\\|${B('t')}-\\tilde{${B('t')}}\\big\\|_2^2+\\tfrac{\\eta_4}{2}\\big\\|${B('B')}-\\widetilde{${B('B')}}\\big\\|_2^2`,
    text: 'The transmission prior follows the maximum attenuation model {cite:liang} and is estimated from the most attenuated color channel of each input, so it adapts to different water types instead of assuming that red always fades first. The background light is initialized from the pixel where that attenuation cue peaks.',
  },
  {
    key: 'det',
    label: 'Detection-guided term',
    color: 'emerald',
    isNew: true,
    tex: `\\mathcal{R}_{\\text{Det}}(${B('J')})`,
    def: `\\mathcal{R}_{\\text{Det}}(${B('J')}) = \\tfrac{\\eta_5}{2}\\sum_{i=1}^{K}\\big\\|\\mathcal{F}(${B('J')})_i-${B('M')}_i\\big\\|_2^2`,
    text: 'A frozen detector F (YOLOv9e {cite:yolov9}) is applied to the enhanced image. Its predictions are converted into class-wise binary maps and compared with the ground-truth masks Mᵢ, so the enhancement keeps the object structures a detector needs.',
  },
  {
    key: 'learn',
    label: 'Learned priors',
    color: 'rose',
    tex: `f(${B('J')})+g(${B('t')})`,
    def: `\\operatorname{prox}_f,\\;\\operatorname{prox}_g \\;\\text{— learned CNN proximal operators}`,
    text: 'Hand-crafted priors cannot capture every degradation in real scenes. Two implicit regularizers on J and t are learned as CNN proximal operators inside the unrolled network.',
  },
]

const term = (key) => `\\htmlClass{term t-${key}}{${TERMS.find((t) => t.key === key).tex}}`
const MIN = `\\min_{${B('J')},\\,${B('t')},\\,${B('B')}}`

export const OBJECTIVE = `${MIN}\\;${TERMS.map((t) => term(t.key)).join('+')}`

// 좁은 화면용: 같은 항을 세 줄로 나눈 버전 (하이라이트 클래스는 동일)
export const OBJECTIVE_STACKED = `\\begin{aligned}
${MIN}\\; & ${term('data')} \\\\
& + ${term('img')} + ${term('phys')} \\\\
& + ${term('det')} + ${term('learn')}
\\end{aligned}`

// 논문 식 (19): 모든 정규화 항을 풀어 쓴 전체 문제
export const FULL_OBJECTIVE = `\\begin{aligned}
\\min_{${B('t')},\\,${B('B')},\\,${B('J')}}\\;
& \\tfrac{1}{2}\\big\\|${B('J')}${B('t')}+${B('B')}(${B('1')}-${B('t')})-${B('I')}\\big\\|_2^2
+ \\big\\|\\overline{${B('J')}}_l-\\overline{${B('J')}}_m\\big\\|_1
+ \\big\\|\\overline{${B('J')}}_l-\\overline{${B('J')}}_s\\big\\|_1 \\\\
& + \\eta_1\\big\\|\\mathcal{D}(${B('J')})\\big\\|_1
+ \\eta_2\\big\\|${B('1')}-\\mathcal{B}(${B('J')})\\big\\|_1
+ \\tfrac{\\eta_3}{2}\\big\\|${B('t')}-\\tilde{${B('t')}}\\big\\|_2^2 \\\\
& + \\tfrac{\\eta_4}{2}\\big\\|${B('B')}-\\widetilde{${B('B')}}\\big\\|_2^2
+ \\tfrac{\\eta_5}{2}\\sum_{i=1}^{K}\\big\\|\\mathcal{F}(${B('J')})_i-${B('M')}_i\\big\\|_2^2
+ f(${B('J')}) + g(${B('t')})
\\end{aligned}`

// ---------------------------------------------------------------------------
// 논문 Table 4 (UJED). mark: best / second 는 논문 표기를 그대로 따른다.
export const METRICS = ['PSNR ↑', 'SSIM ↑', 'LPIPS ↓', 'UIF ↑', 'UIQM ↑', 'mAP50:95 ↑', 'Avg. rank ↓']

const r = (name, values, marks = {}, ref) => ({ name, values, marks, ref })
export const RESULTS = [
  { group: null, rows: [r('Input', ['11.45', '0.5783', '0.7344', '1.1000', '−0.615', '0.515', '7.00'], { 5: 'second' })] },
  {
    group: 'Model-based',
    rows: [
      r('HLRP', ['12.07', '0.2388', '0.5455', '0.1052', '2.958', '0.374', '9.50'], {}, 'hlrp'),
      r('ACC-SWD', ['18.32', '0.8141', '0.3416', '0.2873', '3.985', '0.490', '5.33'], { 3: 'second', 4: 'second' }, 'accswd'),
      r('CBLA', ['14.31', '0.6337', '0.4517', '0.2504', '3.453', '0.452', '7.83'], {}, 'cbla'),
      r('WFAC', ['18.49', '0.8347', '0.2946', '0.2165', '3.476', '0.497', '5.50'], {}, 'wfac'),
    ],
  },
  {
    group: 'Learning-based',
    rows: [
      r('TACL', ['22.22', '0.8196', '0.2781', '0.1170', '4.404', '0.481', '5.00'], { 4: 'best' }, 'tacl'),
      r('CCLNet', ['24.88', '0.8944', '0.1985', '0.3073', '3.187', '0.245', '5.00'], { 3: 'best' }, 'cclnet'),
      r('CDF-UIE', ['26.23', '0.9173', '0.1450', '0.2696', '3.484', '0.487', '3.83'], {}, 'cdfuie'),
    ],
  },
  {
    group: 'Unrolling',
    rows: [
      r('Dual-CLUE', ['29.51', '0.9306', '0.1102', '0.2635', '3.458', '0.491', '3.33'], { 0: 'best', 1: 'best', 2: 'best', 6: 'second' }, 'dualclue'),
      { ...r('DGU-Net (ours)', ['29.02', '0.9246', '0.1205', '0.2695', '3.483', '0.549', '2.67'], { 0: 'second', 1: 'second', 2: 'second', 5: 'best', 6: 'best' }), ours: true },
    ],
  },
]

// 논문 Table: 검출 유도 항 유무
export const ABLATION = {
  without: { psnr: 29.61, ssim: 0.9471, lpips: 0.1146, map: 0.505 },
  with: { psnr: 29.02, ssim: 0.9246, lpips: 0.1205, map: 0.549 },
}

export const BIBTEX = `@article{yu2026dgunet,
  title   = {Detection-Guided Deep Unfolding for Joint Underwater
             Image Enhancement and Object Detection},
  author  = {Yu, Hansung and Vo, Chuong Hoang and Lee, Chul},
  journal = {IEEE Access},
  year    = {2026},
  doi     = {${PAPER.doi}}
}`

// ---------------------------------------------------------------------------
// 참고문헌 (IEEE 스타일). 저자·서지는 논문 bib, DOI는 Crossref로 확인했다.
// 번호는 이 배열 순서 = 기본 화면에서 처음 보이는 순서 (수식 항 설명처럼 눌러야 보이는 인용은 뒤쪽).
const doi = (d) => ({ href: `https://doi.org/${d}`, label: `doi: ${d}` })

export const REFERENCES = [
  {
    key: 'urpc',
    title: 'URPC 2019 dataset',
    venue: 'Roboflow Universe',
    details: 'Accessed: Oct. 5, 2025. [Online]. Available:',
    link: { href: 'https://universe.roboflow.com/srm-nmbuq/urpc', label: 'https://universe.roboflow.com/srm-nmbuq/urpc' },
  },
  {
    key: 'yolov9',
    authors: 'C.-Y. Wang, I.-H. Yeh, and H.-Y. M. Liao',
    title: 'YOLOv9: Learning what you want to learn using programmable gradient information',
    venue: 'in Proc. European Conf. Comput. Vis.',
    details: 'Sep. 2024, pp. 1–21.',
    link: doi('10.1007/978-3-031-72751-1_1'),
  },
  {
    key: 'hlrp',
    authors: 'P. Zhuang, J. Wu, F. Porikli, and C. Li',
    title: 'Underwater image enhancement with hyper-Laplacian reflectance priors',
    venue: 'IEEE Trans. Image Process.',
    details: 'vol. 31, pp. 5442–5455, 2022.',
    link: doi('10.1109/TIP.2022.3196546'),
  },
  {
    key: 'accswd',
    authors: 'Z. Wang, D. Zhou, Z. Li, Z. Yuan, and C. Yang',
    title: 'Underwater image enhancement via adaptive color correction and stationary wavelet detail enhancement',
    venue: 'IEEE Access',
    details: 'vol. 12, pp. 11066–11082, 2024.',
    link: doi('10.1109/ACCESS.2024.3354169'),
  },
  {
    key: 'cbla',
    authors: 'M. Jha and A. K. Bhandari',
    title: 'CBLA: Color-balanced locally adjustable underwater image enhancement',
    venue: 'IEEE Trans. Instrum. Meas.',
    details: 'vol. 73, 2024, Art. no. 5020911.',
    link: doi('10.1109/TIM.2024.3396850'),
  },
  {
    key: 'wfac',
    authors: 'W. Zhang, Q. Liu, H. Lu, J. Wang, and J. Liang',
    title: 'Underwater image enhancement via wavelet decomposition fusion of advantage contrast',
    venue: 'IEEE Trans. Circuits Syst. Video Technol.',
    details: 'vol. 35, no. 8, pp. 7807–7820, Aug. 2025.',
    link: doi('10.1109/TCSVT.2025.3545595'),
  },
  {
    key: 'tacl',
    authors: 'R. Liu, Z. Jiang, S. Yang, and X. Fan',
    title: 'Twin adversarial contrastive learning for underwater image enhancement and beyond',
    venue: 'IEEE Trans. Image Process.',
    details: 'vol. 31, pp. 4922–4936, 2022.',
    link: doi('10.1109/TIP.2022.3190209'),
  },
  {
    key: 'cclnet',
    authors: 'Y. Liu, Q. Jiang, X. Wang, T. Luo, and J. Zhou',
    title: 'Underwater image enhancement with cascaded contrastive learning',
    venue: 'IEEE Trans. Multimedia',
    details: 'vol. 27, pp. 1512–1525, 2025.',
    link: doi('10.1109/TMM.2024.3521739'),
  },
  {
    key: 'cdfuie',
    authors: 'H. Zhang, H. Xu, X. Yu, X. Zhang, X. Gao, and C. Wu',
    title: 'CDF-UIE: Leveraging cross-domain fusion for underwater image enhancement',
    venue: 'IEEE Trans. Geosci. Remote Sens.',
    details: 'vol. 63, 2025, Art. no. 4203715.',
    link: doi('10.1109/TGRS.2025.3553557'),
  },
  {
    key: 'dualclue',
    authors: 'T. T. Pham, T. T. N. Mai, H. Yu, and C. Lee',
    title: 'Dual-channel prior-based deep unfolding with contrastive learning for underwater image enhancement',
    venue: 'J. Vis. Commun. Image Represent.',
    details: 'vol. 111, Art. no. 104500, Sep. 2025.',
    link: doi('10.1016/j.jvcir.2025.104500'),
  },
  {
    key: 'gradcam',
    authors: 'R. R. Selvaraju, M. Cogswell, A. Das, R. Vedantam, D. Parikh, and D. Batra',
    title: 'Grad-CAM: Visual explanations from deep networks via gradient-based localization',
    venue: 'in Proc. IEEE Int. Conf. Comput. Vis.',
    details: 'Oct. 2017, pp. 618–626.',
    link: doi('10.1109/ICCV.2017.74'),
  },
  {
    key: 'mlle',
    authors: 'W. Zhang, P. Zhuang, H.-H. Sun, G. Li, S. Kwong, and C. Li',
    title: 'Underwater image enhancement via minimal color loss and locally adaptive contrast enhancement',
    venue: 'IEEE Trans. Image Process.',
    details: 'vol. 31, pp. 3997–4010, 2022.',
    link: doi('10.1109/TIP.2022.3177129'),
  },
  {
    key: 'he',
    authors: 'K. He, J. Sun, and X. Tang',
    title: 'Single image haze removal using dark channel prior',
    venue: 'IEEE Trans. Pattern Anal. Mach. Intell.',
    details: 'vol. 33, no. 12, pp. 2341–2353, Dec. 2011.',
    link: doi('10.1109/TPAMI.2010.168'),
  },
  {
    key: 'pan',
    authors: 'J. Pan, D. Sun, H. Pfister, and M.-H. Yang',
    title: 'Blind image deblurring using dark channel prior',
    venue: 'in Proc. IEEE Conf. Comput. Vis. Pattern Recognit.',
    details: 'Jun. 2016, pp. 1628–1636.',
    link: doi('10.1109/CVPR.2016.180'),
  },
  {
    key: 'yan',
    authors: 'Y. Yan, W. Ren, Y. Guo, R. Wang, and X. Cao',
    title: 'Image deblurring via extreme channels prior',
    venue: 'in Proc. IEEE Conf. Comput. Vis. Pattern Recognit.',
    details: 'Jul. 2017, pp. 4003–4011.',
    link: doi('10.1109/CVPR.2017.738'),
  },
  {
    key: 'liang',
    authors: 'Z. Liang, Y. Wang, X. Ding, Z. Mi, and X. Fu',
    title: 'Single underwater image enhancement by attenuation map guided color correction and detail preserved dehazing',
    venue: 'Neurocomputing',
    details: 'vol. 425, pp. 160–172, Feb. 2021.',
    link: doi('10.1016/j.neucom.2020.03.091'),
  },
]
