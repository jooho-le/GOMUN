<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { Expert } from '../data/experts'
import { experts as seed } from '../data/experts'
import { AVAILABILITY_OPTIONS, CORE_CATEGORIES, KOREAN_REGIONS } from '../data/options'

const props = defineProps<{ mode?: 'company' | 'expert' }>()
const mode = computed(() => props.mode ?? 'company')

const REGION_CHIPS = ['전국', ...KOREAN_REGIONS]
const CATEGORY_CHIPS = ['전체', ...CORE_CATEGORIES]
const AVAILABILITY_CHIPS = ['전체', ...AVAILABILITY_OPTIONS]
const RATING_CHIPS = ['전체', '4.0+', '4.5+', '4.8+']

const filters = reactive({
  region: '전국',
  category: '전체',
  availability: '전체',
  rating: '전체',
  search: '',
})

const experts = ref<Expert[]>(seed)

const filtered = computed(() =>
  experts.value.filter((expert) => {
    if (filters.region !== '전국' && expert.region !== filters.region) return false
    if (filters.category !== '전체' && !expert.keywords.includes(filters.category)) return false
    if (filters.availability !== '전체' && expert.availability !== filters.availability) return false
    const minRating = filters.rating === '전체' ? 0 : parseFloat(filters.rating.replace('+', ''))
    if (expert.rating < minRating) return false
    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase()
      const haystack = `${expert.name} ${expert.title} ${expert.focus}`.toLowerCase()
      if (!haystack.includes(term)) return false
    }
    return true
  }),
)

const sheetOpen = ref(false)
const selected = ref<Expert | null>(null)
const memo = ref('')
const state = ref<'idle' | 'sent'>('idle')

function selectFilter(type: keyof typeof filters, value: string) {
  filters[type] = value
}

function resetFilters() {
  filters.region = '전국'
  filters.category = '전체'
  filters.availability = '전체'
  filters.rating = '전체'
  filters.search = ''
}

function openSheet(expert: Expert) {
  selected.value = expert
  memo.value = ''
  state.value = 'idle'
  sheetOpen.value = true
}

function closeSheet() {
  sheetOpen.value = false
}

function submitRequest() {
  state.value = 'sent'
  setTimeout(() => {
    sheetOpen.value = false
  }, 1300)
}
</script>

<template>
  <section class="matching">
    <header class="matching__head">
      <div>
        <p class="eyebrow">전문가 탐색</p>
        <h2>링크드인 감성의 시니어 매칭 보드</h2>
        <p class="lede">
          <strong>{{ filtered.length }}</strong
          >명의 검증된 전문가가 대기 중입니다. 필터를 조합해 바로 연결해 보세요.
        </p>
      </div>
      <div class="impact">
        <div>
          <span>평균 투입 소요</span>
          <strong>36시간</strong>
        </div>
        <div>
          <span>이번 주 요청</span>
          <strong>128건</strong>
        </div>
      </div>
    </header>

    <section class="filters">
      <div class="filter-stack">
        <article class="filter-group">
          <header>
            <span>지역</span>
            <button class="ghost" type="button" @click="filters.region = '전국'">전체</button>
          </header>
          <div class="chips">
            <button
              v-for="chip in REGION_CHIPS"
              :key="chip"
              :class="['chip', { active: filters.region === chip }]"
              type="button"
              @click="selectFilter('region', chip)"
            >
              {{ chip }}
            </button>
          </div>
        </article>
        <article class="filter-group">
          <header>
            <span>전문 분야</span>
            <button class="ghost" type="button" @click="filters.category = '전체'">전체</button>
          </header>
          <div class="chips">
            <button
              v-for="chip in CATEGORY_CHIPS"
              :key="chip"
              :class="['chip', { active: filters.category === chip }]"
              type="button"
              @click="selectFilter('category', chip)"
            >
              {{ chip }}
            </button>
          </div>
        </article>
      </div>

      <div class="filter-stack slim">
        <article class="filter-group">
          <header>
            <span>가용성</span>
          </header>
          <div class="chips">
            <button
              v-for="chip in AVAILABILITY_CHIPS"
              :key="chip"
              :class="['chip', { active: filters.availability === chip }]"
              @click="selectFilter('availability', chip)"
            >
              {{ chip }}
            </button>
          </div>
        </article>
        <article class="filter-group">
          <header>
            <span>평점</span>
          </header>
          <div class="chips">
            <button
              v-for="chip in RATING_CHIPS"
              :key="chip"
              :class="['chip', { active: filters.rating === chip }]"
              @click="selectFilter('rating', chip)"
            >
              {{ chip }}
            </button>
          </div>
        </article>
        <article class="filter-group search">
          <header>
            <span>검색</span>
          </header>
          <input v-model="filters.search" type="search" placeholder="전문가 이름, 역할, 프로젝트 키워드" />
        </article>
        <article class="filter-group slim-btns">
          <button class="ghost" type="button" @click="resetFilters">필터 초기화</button>
        </article>
      </div>
    </section>

    <transition-group name="cards" tag="div" class="cards">
      <article v-for="expert in filtered" :key="expert.id" class="profile-card">
        <div class="profile-card__left">
          <img :src="expert.avatar" :alt="expert.name" />
          <div>
            <h3>{{ expert.name }}</h3>
            <p>{{ expert.title }}</p>
            <span>{{ expert.region }} · {{ expert.years }}년</span>
          </div>
        </div>
        <div class="profile-card__middle">
          <p class="focus">{{ expert.focus }}</p>
          <ul class="tags">
            <li v-for="tag in expert.keywords" :key="tag">{{ tag }}</li>
          </ul>
        </div>
        <div class="profile-card__right">
          <div class="ratings">
            <span class="rating-chip">★ {{ expert.rating.toFixed(1) }}</span>
            <span class="availability-chip">{{ expert.availability }}</span>
            <span class="availability-chip ghost">{{ expert.responseTime }}</span>
          </div>
          <button class="primary compact" type="button" @click="openSheet(expert)">
            {{ mode === 'company' ? '요청 넣기' : '지원하기' }}
          </button>
        </div>
      </article>
    </transition-group>
    <p v-if="!filtered.length" class="empty">조건에 맞는 전문가가 없습니다. 필터를 조정해 보세요.</p>

    <transition name="sheet">
      <section v-if="sheetOpen" class="sheet" @click="closeSheet">
        <article class="sheet__card" @click.stop>
          <header>
            <div>
              <p class="sheet__eyebrow">연결 요청</p>
              <h3>{{ selected?.name }} 님에게 {{ mode === 'company' ? '요청' : '지원' }} 보내기</h3>
            </div>
            <button class="ghost" @click="closeSheet">닫기</button>
          </header>

          <p class="sheet__copy">
            {{ selected?.title }} · {{ selected?.region }} · 가용성 {{ selected?.availability }}
          </p>

          <label class="sheet__label" v-if="state === 'idle'">
            <span>메모</span>
            <textarea
              v-model="memo"
              rows="4"
              placeholder="필요한 역할, 기간, 커뮤니케이션 방법 등을 간단히 남겨 주세요."
            ></textarea>
          </label>

          <button class="primary wide" v-if="state === 'idle'" type="button" @click="submitRequest">
            {{ mode === 'company' ? '요청 전달하기' : '지원서 제출하기' }}
          </button>

          <div class="sheet__done" v-else>요청이 전달되었습니다. 평균 2시간 내 알림을 받아볼 수 있어요.</div>
        </article>
      </section>
    </transition>
  </section>
</template>

<style scoped>
.matching {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
}

.matching__head {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3);
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}

.matching__head h2 {
  margin: 6px 0;
}

.lede {
  margin: 0;
  color: var(--muted);
}

.impact {
  display: flex;
  gap: 18px;
}

.impact div {
  background: rgba(163, 230, 53, 0.12);
  border: 1px solid rgba(163, 230, 53, 0.4);
  border-radius: 16px;
  padding: 10px 14px;
  min-width: 150px;
}

.impact span {
  display: block;
  font-size: 12px;
  color: var(--muted);
}

.impact strong {
  font-size: 20px;
  line-height: 1.4;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-stack {
  display: grid;
  gap: 16px;
}

.filter-stack.slim {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.filter-group {
  background: rgba(248, 250, 252, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-group header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  color: #0f172a;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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
  background: linear-gradient(120deg, #a3e635, #34d399);
  color: #0f172a;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.25);
}

.filter-group.search input {
  border: 1px solid rgba(148, 163, 184, 0.6);
  border-radius: 12px;
  padding: 10px;
  font-size: 14px;
}

.ghost {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 28px;
}

.profile-card {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(240px, 2fr) minmax(200px, 1fr);
  gap: 18px;
  padding: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.05);
}

.profile-card__left {
  display: flex;
  gap: 12px;
  align-items: center;
}

.profile-card__left img {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.profile-card__left h3 {
  margin: 0;
}

.profile-card__left span,
.profile-card__left p {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}

.profile-card__middle .focus {
  margin: 0 0 8px;
  font-weight: 600;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
}

.tags li {
  border-radius: 999px;
  padding: 4px 10px;
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: rgba(99, 102, 241, 0.06);
  font-size: 12px;
}

.profile-card__right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.ratings {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.rating-chip,
.availability-chip {
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid rgba(148, 163, 184, 0.4);
}

.rating-chip {
  background: rgba(99, 102, 241, 0.08);
  border-color: rgba(99, 102, 241, 0.2);
}

.availability-chip {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
}

.availability-chip.ghost {
  background: rgba(15, 23, 42, 0.04);
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

.primary.compact {
  align-self: flex-end;
}

.primary.wide {
  width: 100%;
}

.empty {
  margin-top: 32px;
  text-align: center;
  color: var(--muted);
}

.sheet {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 30;
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

.sheet__label textarea {
  border-radius: 12px;
  border: 1px solid rgba(163, 230, 53, 0.4);
  padding: 10px;
  font-family: inherit;
  background: rgba(250, 250, 250, 0.95);
}

.sheet__copy {
  font-size: 14px;
  margin: 0;
  color: var(--muted);
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
  .matching {
    padding: 20px;
  }

  .impact {
    width: 100%;
    justify-content: space-between;
  }

  .profile-card {
    grid-template-columns: 1fr;
  }

  .profile-card__right {
    align-items: flex-start;
  }

  .ratings {
    justify-content: flex-start;
  }
}
</style>
