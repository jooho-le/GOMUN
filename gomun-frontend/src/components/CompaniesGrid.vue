<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { Company } from '../data/companies'
import { companies as seed } from '../data/companies'
import { KOREAN_REGIONS, URGENCY_OPTIONS } from '../data/options'

const jobs = ref<Company[]>(seed)
const COMPANY_TYPES = ['전체', ...new Set(seed.map((c) => c.companyType))]
const EMPLOYMENTS = ['전체', ...new Set(seed.map((c) => c.employment))]
const JOB_FIELDS = ['전체', ...new Set(seed.map((c) => c.jobCategory))]
const REGION_OPTIONS = ['전국', ...KOREAN_REGIONS]
const URGENCY = ['전체', ...URGENCY_OPTIONS]
const SORT_OPTIONS = ['최신순', '조회순']

const filters = reactive({
  companyType: '전체',
  employment: '전체',
  jobCategory: '전체',
  region: '전국',
  urgency: '전체',
  search: '',
  sort: '최신순',
})

const filtered = computed(() => {
  let list = jobs.value.filter((job) => {
    if (filters.companyType !== '전체' && job.companyType !== filters.companyType) return false
    if (filters.employment !== '전체' && job.employment !== filters.employment) return false
    if (filters.jobCategory !== '전체' && job.jobCategory !== filters.jobCategory) return false
    if (filters.region !== '전국' && job.region !== filters.region) return false
    if (filters.urgency !== '전체' && job.urgency !== filters.urgency) return false
    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase()
      const haystack = `${job.company} ${job.role} ${job.headline}`.toLowerCase()
      if (!haystack.includes(term)) return false
    }
    return true
  })

  if (filters.sort === '조회순') {
    list = [...list].sort((a, b) => b.views - a.views)
  } else {
    list = [...list].sort((a, b) => b.id - a.id)
  }

  return list
})

const selected = ref<Company | null>(null)
const sheetOpen = ref(false)
const memo = ref('')
const startWindow = ref('48시간 내 투입')
const state = ref<'idle' | 'sent'>('idle')

function setFilter<Key extends keyof typeof filters>(key: Key, value: (typeof filters)[Key]) {
  filters[key] = value
}

function resetFilters() {
  filters.companyType = '전체'
  filters.employment = '전체'
  filters.jobCategory = '전체'
  filters.region = '전국'
  filters.urgency = '전체'
  filters.search = ''
  filters.sort = '최신순'
}

function openSheet(job: Company) {
  selected.value = job
  memo.value = ''
  startWindow.value = '48시간 내 투입'
  state.value = 'idle'
  sheetOpen.value = true
}

function closeSheet() {
  sheetOpen.value = false
}

function submitApplication() {
  state.value = 'sent'
  setTimeout(() => {
    sheetOpen.value = false
  }, 1400)
}
</script>

<template>
  <section class="board">
    <header class="board__hero">
      <div>
        <p class="eyebrow">기업 요청</p>
        <h2>기업/프로젝트 오픈 게시보드</h2>
        <p class="lede">
          지금 <strong>{{ filtered.length }}</strong
          >건의 요청이 실시간으로 업데이트되고 있어요. 지원서를 남기면 운영팀이 바로 연결해 드립니다.
        </p>
      </div>
      <div class="board__hero-actions">
        <button class="ghost">CSV 다운로드</button>
        <button class="primary">요청 등록</button>
      </div>
    </header>

    <section class="board__filters">
      <article class="filter">
        <header>기업 형태</header>
        <div class="chips">
          <button
            v-for="opt in COMPANY_TYPES"
            :key="opt"
            :class="['chip', { active: filters.companyType === opt }]"
            @click="setFilter('companyType', opt)"
          >
            {{ opt }}
          </button>
        </div>
      </article>
      <article class="filter">
        <header>채용 형태</header>
        <div class="chips">
          <button
            v-for="opt in EMPLOYMENTS"
            :key="opt"
            :class="['chip', { active: filters.employment === opt }]"
            @click="setFilter('employment', opt)"
          >
            {{ opt }}
          </button>
        </div>
      </article>
      <article class="filter">
        <header>모집 직무</header>
        <div class="chips scroll">
          <button
            v-for="opt in JOB_FIELDS"
            :key="opt"
            :class="['chip', { active: filters.jobCategory === opt }]"
            @click="setFilter('jobCategory', opt)"
          >
            {{ opt }}
          </button>
        </div>
      </article>
      <article class="filter compact">
        <label>
          <span>근무 지역</span>
          <select v-model="filters.region">
            <option v-for="opt in REGION_OPTIONS" :key="opt">{{ opt }}</option>
          </select>
        </label>
        <label>
          <span>긴급도</span>
          <select v-model="filters.urgency">
            <option v-for="opt in URGENCY" :key="opt">{{ opt }}</option>
          </select>
        </label>
        <label>
          <span>정렬</span>
          <select v-model="filters.sort">
            <option v-for="opt in SORT_OPTIONS" :key="opt">{{ opt }}</option>
          </select>
        </label>
      </article>
      <article class="filter search">
        <input
          v-model="filters.search"
          type="search"
          placeholder="공고, 기업, 키워드를 입력하세요"
        />
        <button class="ghost" type="button" @click="resetFilters">필터 초기화</button>
      </article>
    </section>

    <transition-group name="cards" tag="div" class="grid">
      <article v-for="job in filtered" :key="job.id" class="job-card">
        <div class="job-card__meta">
          <div>
            <p class="tag company">{{ job.companyType }}</p>
            <h3>{{ job.company }}</h3>
            <p class="subtitle">{{ job.region }} · {{ job.mode }} · {{ job.duration }}</p>
          </div>
          <span class="badge">{{ job.urgency }}</span>
        </div>
        <div class="job-card__body">
          <div>
            <p class="role">{{ job.role }}</p>
            <p class="headline">{{ job.headline }}</p>
          </div>
          <p class="descr">{{ job.description }}</p>
          <ul class="keywords">
            <li v-for="k in job.keywords" :key="k">{{ k }}</li>
          </ul>
        </div>
        <div class="job-card__footer">
          <div class="detail">
            <span>예상 예산</span>
            <strong>{{ job.budget }}</strong>
          </div>
          <div class="detail">
            <span>마감</span>
            <strong>{{ job.deadline }}</strong>
          </div>
          <div class="detail">
            <span>조회</span>
            <strong>{{ job.views.toLocaleString() }}</strong>
          </div>
          <button class="primary" type="button" @click="openSheet(job)">지원하기</button>
        </div>
      </article>
    </transition-group>
    <p v-if="!filtered.length" class="empty">조건에 맞는 요청이 없습니다.</p>

    <transition name="sheet">
      <section v-if="sheetOpen" class="sheet" @click="closeSheet">
        <article class="sheet__card" @click.stop>
          <header>
            <div>
              <p class="sheet__eyebrow">지원서</p>
              <h3>{{ selected?.company }} · {{ selected?.role }}</h3>
            </div>
            <button class="ghost" @click="closeSheet">닫기</button>
          </header>

          <label class="sheet__label" v-if="state === 'idle'">
            <span>투입 가능 시점</span>
            <select v-model="startWindow">
              <option>즉시 투입</option>
              <option>48시간 내 투입</option>
              <option>1주 내 투입</option>
            </select>
          </label>

          <label class="sheet__label" v-if="state === 'idle'">
            <span>메모</span>
            <textarea v-model="memo" rows="4" placeholder="간단한 포지션 경험이나 강점을 남겨주세요."></textarea>
          </label>

          <button class="primary wide" v-if="state === 'idle'" type="button" @click="submitApplication">지원하기</button>

          <div class="sheet__done" v-else>지원이 접수되었습니다. 2시간 내 결과를 알려 드릴게요.</div>
        </article>
      </section>
    </transition>
  </section>
</template>

<style scoped>
.board {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
}

.board__hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3);
  margin-bottom: 24px;
}

.board__hero-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}

.lede {
  margin: 0;
  color: var(--muted);
}

.ghost {
  border: 1px solid var(--border);
  background: transparent;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
}

.primary {
  border: 0;
  background: linear-gradient(120deg, #a3e635, #10b981);
  color: #0f172a;
  font-weight: 700;
  border-radius: 999px;
  padding: 11px 18px;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.35);
}

.board__filters {
  display: grid;
  gap: 16px;
}

.filter {
  background: rgba(248, 250, 252, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 18px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter header {
  font-weight: 600;
  font-size: 13px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chips.scroll {
  max-height: 120px;
  overflow-y: auto;
}

.chip {
  border: 1px solid rgba(148, 163, 184, 0.6);
  background: #fff;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip.active {
  border-color: transparent;
  background: rgba(163, 230, 53, 0.3);
  color: #0f172a;
  font-weight: 700;
}

.filter.compact {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.filter.compact label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--muted);
}

.filter.compact select {
  border: 1px solid rgba(148, 163, 184, 0.6);
  border-radius: 12px;
  padding: 8px;
}

.filter.search {
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.filter.search input {
  flex: 1;
  border: 1px solid rgba(148, 163, 184, 0.6);
  border-radius: 12px;
  padding: 10px;
}

.grid {
  display: grid;
  gap: 18px;
  margin-top: 28px;
}

.job-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 20px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.job-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.tag {
  display: inline-block;
  background: rgba(99, 102, 241, 0.08);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  margin: 0 0 8px;
}

.subtitle {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.badge {
  border-radius: 999px;
  padding: 4px 12px;
  background: rgba(163, 230, 53, 0.25);
  border: 1px solid rgba(163, 230, 53, 0.5);
  font-size: 12px;
  align-self: flex-start;
}

.job-card__body .role {
  margin: 0;
  font-weight: 600;
  font-size: 15px;
}

.job-card__body .headline {
  margin: 4px 0 8px;
  color: #111827;
  font-size: 18px;
  font-weight: 700;
}

.descr {
  margin: 0;
  color: var(--muted);
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0 0;
  padding: 0;
}

.keywords li {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  font-size: 12px;
}

.job-card__footer {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.detail {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: var(--muted);
}

.detail strong {
  font-size: 16px;
  color: #0f172a;
}

.empty {
  padding: 24px;
  text-align: center;
  color: var(--muted);
}

.sheet {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 40;
}

.sheet__card {
  width: min(420px, 90vw);
  background: #fff;
  border-left: 1px solid rgba(148, 163, 184, 0.4);
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.12);
}

.sheet__card header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.sheet__eyebrow {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sheet__label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}

.sheet__label textarea,
.sheet__label select {
  border: 1px solid rgba(163, 230, 53, 0.4);
  border-radius: 12px;
  padding: 10px;
  font-family: inherit;
  background: rgba(250, 250, 250, 0.95);
}

.sheet__done {
  text-align: center;
  padding: 12px;
  border-radius: 12px;
  background: rgba(163, 230, 53, 0.18);
  border: 1px solid rgba(163, 230, 53, 0.4);
}

.cards-enter-active,
.cards-leave-active {
  transition: all 0.25s ease;
}

.cards-enter-from,
.cards-leave-to {
  transform: translateY(4px);
  opacity: 0;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.25s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .board {
    padding: 20px;
  }

  .board__hero {
    flex-direction: column;
  }

  .board__hero-actions {
    width: 100%;
  }

  .filter.compact {
    grid-template-columns: 1fr;
  }

  .job-card__footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .board__hero-actions {
    justify-content: flex-start;
  }
}
</style>
