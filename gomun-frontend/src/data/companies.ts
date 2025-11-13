export type Company = {
  id: number
  company: string
  companyType: string
  role: string
  headline: string
  jobCategory: string
  region: string
  employment: string
  deadline: string
  views: number
  keywords: string[]
  urgency: string
  mode: string
  duration: string
  budget: string
  description: string
}

export const companies: Company[] = [
  {
    id: 1,
    company: '라이즈웨이브',
    companyType: '제조/테크',
    role: '경영 공백 PMO',
    headline: '4.5일제 전환으로 비는 HQ 전략 리드 보강',
    jobCategory: '경영/전략',
    region: '서울',
    employment: '계약·프로젝트',
    deadline: '11.16',
    views: 2971,
    keywords: ['경영', '전략', 'PMO'],
    urgency: '즉시 투입',
    mode: '하이브리드 · 주3회',
    duration: '6주',
    budget: '월 240만원',
    description:
      'HQ 전략실장이 장기 휴가 중입니다. 사업 로드맵·EXCO 보고 체계를 이어받아 줄 시니어 전략 리드가 필요합니다.',
  },
  {
    id: 2,
    company: '디오페이크',
    companyType: 'AI·SaaS',
    role: '재무·회계 총괄',
    headline: '시리즈C 직전, 연말 결산/IR 체계 긴급 구축',
    jobCategory: '재무/회계',
    region: '경기',
    employment: '컨설턴트',
    deadline: '11.17',
    views: 9501,
    keywords: ['재무', '회계', 'IR'],
    urgency: '48시간 이내',
    mode: '원격 · 주4회',
    duration: '8주',
    budget: '총 1,200만원',
    description:
      '라운드 완료 직후 IFRS 기반 검증과 IR 데이터룸 정리가 동시에 필요합니다. Big4 파트너 출신이면 우대합니다.',
  },
  {
    id: 3,
    company: '그로운랩',
    companyType: '리테일',
    role: '프로세스 혁신 리드',
    headline: '신규 브랜드 론칭, CS/풀필먼트 동시 체계화',
    jobCategory: '운영/물류',
    region: '인천',
    employment: '프로젝트',
    deadline: '11.18',
    views: 7439,
    keywords: ['운영', '프로세스', '물류'],
    urgency: '2주 이내',
    mode: '현장 · 주5일',
    duration: '4주',
    budget: '총 1,400만원',
    description:
      'D2C·오프라인 동시 론칭으로 CX 표준·물류 SLA 재설계가 필요합니다. 프로세스 디자인 경험자를 찾습니다.',
  },
  {
    id: 4,
    company: '바다로지스틱스',
    companyType: '물류',
    role: '해외 물류 컨트롤타워',
    headline: '미국 서부 신규 항만 런칭 리스크 점검',
    jobCategory: '해외전략',
    region: '부산',
    employment: '프로젝트',
    deadline: '11.19',
    views: 3303,
    keywords: ['물류', '운영', '해외전략'],
    urgency: '48시간 이내',
    mode: '하이브리드 · 주3일',
    duration: '3주',
    budget: '총 780만원',
    description:
      '긴급 보험·선사 리스 계약을 동시에 다룰 수 있는 글로벌 물류 전문가를 찾습니다. 북미 네트워크가 있으면 가산점.',
  },
  {
    id: 5,
    company: '먼데이바이브',
    companyType: '미디어',
    role: 'HR/조직 고문',
    headline: 'OKR 리프레시 & 4.5일제 연착륙 가이드',
    jobCategory: 'HR',
    region: '대전',
    employment: '컨설턴트',
    deadline: '11.20',
    views: 5120,
    keywords: ['HR', '조직개편', '운영'],
    urgency: '즉시 투입',
    mode: '원격 · 주2회',
    duration: '5주',
    budget: '총 900만원',
    description:
      '100인 규모 조직의 OKR 리디자인과 리더십 코칭을 동시 진행해야 합니다. 4.5일제 도입 경험자를 우선 검토합니다.',
  },
  {
    id: 6,
    company: '데이터인사이트',
    companyType: '플랫폼',
    role: 'BI/데이터 스트래티지스트',
    headline: '리텐션 추적 KPI와 보고 체계 풀 리뉴얼',
    jobCategory: '데이터/BI',
    region: '서울',
    employment: '프로젝트',
    deadline: '11.23',
    views: 6988,
    keywords: ['데이터', 'BI', '성과분석'],
    urgency: '2주 이내',
    mode: '원격 · 주3일',
    duration: '6주',
    budget: '총 1,100만원',
    description:
      '구독형 서비스 리텐션 분석·코호트 진단·데이터 거버넌스까지 한 번에 묶을 시니어 BI 리더를 찾습니다.',
  },
]
