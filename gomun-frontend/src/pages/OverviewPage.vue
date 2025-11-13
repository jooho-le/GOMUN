<script setup lang="ts">
const manifesto = [
  '초고령 사회 + 4.5일제 확산 = Zero-Gap HR Tech 필요성',
  '경력·체력 기반 매칭 알고리즘으로 긴급 공백 0일화',
  '계약/정산/평가 자동화를 통한 신뢰 보증',
]

const storytellers = [
  { role: '기획', name: '방태양', copy: '브랜드 & 공모전 스토리텔링 총괄' },
  { role: '개발', name: '이주호', copy: '프론트엔드 · 인터랙션' },
  { role: '개발', name: '심은진', copy: '백엔드 · 매칭 모듈' },
]

const applicationNotes = [
  '제출된 출품작과 서류는 수정·삭제가 불가하며 반환되지 않습니다.',
  '타 공모전 입상작/표절·복제 등 지재권 침해 시 심사 제외 및 수상 취소',
  '입상작 저작재산권은 주최·주관 측에 귀속되며 홍보 목적의 활용 가능',
  '심사 세부 결과 비공개, 일정은 주최 측 사정에 따라 변동될 수 있음',
  '허위 기재·특허 분쟁 발생 시 참가 자격 박탈에 동의',
]

const proposalSummary = [
  {
    title: '제안 개요',
    body: `Tech for All: 기술로 잇는 사회혁신 공모전에 제출한 
“고문(GOMUN): 4.5일제 시대, 시니어 전문가의 노련함을 공유하는 중·단기 인력 대체 플랫폼” 기획안입니다. 
기업 핵심 인력 공백을 고문급 시니어로 메우고, 시니어에게는 고가치 긱 워크를 제공합니다.`,
  },
  {
    title: '현황 및 문제점',
    body: `기업은 휴가·병가·신규 프로젝트로 숙련 인력 공백이 발생해도 즉시 대체가 어려운 반면, 
기존 시니어 플랫폼은 장기 재취업에만 집중되어 최고 숙련자의 유연한 활용이 제한됩니다.`,
  },
  {
    title: '제안 내용',
    body: `경력-체력 기반 매칭 알고리즘으로 기업 긴급성 및 요구 숙련도를 정밀 매칭하고,
계약/정산/평가 시스템을 자동화합니다. Layered 검증과 Trust Score를 도입해 품질을 보증합니다.`,
  },
  {
    title: '기대 효과',
    body: `사회적 효과: 시니어 소득·참여 증진과 세대 간 지식 단절 방지.
경제적 효과: 핵심 인력 공백 리스크 최소화 및 인건비 효율 증대.`,
  },
]

const roadmap = [
  {
    title: '단기 실행 (6개월)',
    items: [
      '경력·체력 매칭 알고리즘 및 계약/정산 자동화 모듈 중심 MVP 구축',
      '경영 컨설팅, 회계/재무 등 파일럿 풀 50명 확보 후 다층 검증',
      '차등 수수료·SaaS 구독 모델의 법률·세무 구조 확정',
    ],
  },
  {
    title: '중장기 전략',
    items: [
      '대기업 은퇴자 협회·전문직 단체와 제휴, 공급 채널 신뢰도 강화',
      'AARP 벤치마킹 데이터 기반 정책 제언으로 사회적 공신력 확보',
      'AI 기반 워크플로우로 계약·정산·피드백 자동화, 운영 마진 확대',
    ],
  },
]
</script>

<template>
  <main class="overview">
    <div class="bg" aria-hidden="true"></div>

    <section class="panel hero">
      <div class="hero__content">
        <div class="hero__text">
          <p class="label">Overview</p>
          <h1>GOMUN<br />Zero-Gap Deck</h1>
          <p class="description">
            Tech for All 공모전 제출용 브랜드 스토리 페이지입니다. 기업과 시니어 전문가의 긴급 공백을
            Render 감성으로 시각화하고, 서비스 철학과 팀을 한눈에 보여 줍니다.
          </p>
          <ul>
            <li v-for="line in manifesto" :key="line">{{ line }}</li>
          </ul>
          <div class="hero__actions">
            <RouterLink class="btn" to="/requests">기업 요청 살펴보기</RouterLink>
            <RouterLink class="btn btn--primary" to="/experts">전문가 탐색</RouterLink>
          </div>
        </div>
        <div class="hero__visual">
          <div class="visual__badge">Tech for All</div>
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80" alt="overview visual" />
        </div>
      </div>
    </section>

    <section class="panel grid">
      <article class="module manifesto">
        <h2>서비스 설명</h2>
        <p>
          GOMUN은 4.5일제, 초고령 사회라는 시대 신호에 맞춰 하이-스킬 공백을 0일로 만드는 Zero-Gap HR Tech입니다.
          매칭-계약-정산-평가 전 과정을 자동화하고, 시니어의 지속 가능한 활동 수준을 데이터로 관리합니다.
        </p>
        <p>
          “우리 부모님은 지금도 슈퍼맨”이라는 팀 메시지처럼, 세대 간 지식 전수를 기술로 연결해 기업의 리스크를 줄이고
          시니어의 자존감을 높이는 것이 핵심 미션입니다.
        </p>
      </article>

      <article class="module application">
        <header>
          <div>
            <p class="label">공모전 신청서</p>
            <h3>Tech for All: 기술로 잇는 사회혁신 공모전</h3>
          </div>
          <span class="badge">제안서 요약</span>
        </header>
        <div class="application__body">
          <div v-for="section in proposalSummary" :key="section.title" class="application__section">
            <h4>{{ section.title }}</h4>
            <p>{{ section.body }}</p>
          </div>
          <div class="notice">
            <h4>유의 사항</h4>
            <ul>
              <li v-for="note in applicationNotes" :key="note">{{ note }}</li>
            </ul>
          </div>
        </div>
      </article>

      <article class="module team">
        <h2>팀 소개</h2>
        <ul>
          <li v-for="member in storytellers" :key="member.name">
            <strong>{{ member.role }} · {{ member.name }}</strong>
            <span>{{ member.copy }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="panel roadmap">
      <h2>실행 로드맵 & 정책 방향</h2>
      <div class="roadmap__grid">
        <article v-for="step in roadmap" :key="step.title">
          <h3>{{ step.title }}</h3>
          <ul>
            <li v-for="item in step.items" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="module team deck">
          <h3>문서 자료</h3>
          <p>
            공모전 제안서(5p) · 개인정보 수집·이용 동의서 · 제안서 요약 1p · 계량 KPI Annex 등을
            Overview 페이지와 연동해 배포할 예정입니다.
          </p>
          <p class="small">정책, 파트너, 투자 레버리지 문서는 Insights 탭에서 순차 공개됩니다.</p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.overview {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 16px 64px;
}
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(900px 500px at 10% -10%, rgba(163, 230, 53, 0.35), transparent 60%),
    radial-gradient(800px 480px at 90% 0%, rgba(94, 234, 212, 0.35), transparent 60%),
    linear-gradient(#f8fafc, #ffffff);
}
.panel {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.08);
  padding: 32px;
}
.hero__content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  align-items: center;
}
.label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}
.hero__text h1 {
  font-size: clamp(32px, 6vw, 72px);
  margin: 12px 0 16px;
  line-height: 1;
}
.hero__text p {
  color: var(--muted);
}
.hero__text ul {
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.6;
}
.hero__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  text-decoration: none;
  color: #0f172a;
  font-weight: 600;
  min-width: 140px;
}
.btn--primary {
  background: var(--indigo);
  border-color: var(--indigo);
  color: #fff;
}
.hero__visual {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(135deg, rgba(163, 230, 53, 0.2), rgba(16, 185, 129, 0.15));
  min-height: 260px;
  display: grid;
  place-items: center;
}
.hero__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.visual__badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
.module {
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.module h2,
.module h3 {
  margin: 0;
}
.team ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.team strong {
  display: block;
}

.application header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}
.badge {
  border-radius: 999px;
  padding: 4px 12px;
  background: rgba(163, 230, 53, 0.25);
  border: 1px solid rgba(163, 230, 53, 0.5);
  font-size: 12px;
}
.application__body {
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.application__section h4 {
  margin: 0 0 4px;
}
.notice ul {
  padding-left: 16px;
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.4;
}

.roadmap__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.roadmap__grid article {
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(15, 23, 42, 0.05);
}
.roadmap__grid h3 {
  margin: 0 0 10px;
}
.roadmap__grid ul {
  padding-left: 16px;
  margin: 0;
  color: var(--muted);
  line-height: 1.5;
}
.deck {
  background: rgba(99, 102, 241, 0.04);
  border-color: rgba(99, 102, 241, 0.1);
}
.deck .small {
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 768px) {
  .panel {
    padding: 24px;
  }
  .hero__actions {
    flex-direction: column;
  }
  .roadmap__grid {
    grid-template-columns: 1fr;
  }
}
</style>
