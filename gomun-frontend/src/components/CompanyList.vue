<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import type { Company } from '../data/companies'
import { companies } from '../data/companies'
import { KOREAN_REGIONS } from '../data/options'

const REGIONS = ['전국', ...KOREAN_REGIONS]

const filters = reactive({
  region: '전국',
  search: '',
})

const filteredCompanies = computed<Company[]>(() =>
  companies.filter((job) => {
    if (filters.region !== '전국' && job.region !== filters.region) return false
    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase()
      const haystack = `${job.company} ${job.role} ${job.headline}`.toLowerCase()
      if (!haystack.includes(term)) return false
    }
    return true
  }),
)
</script>

<template>
  <section class="company-board">
    <header class="board__header">
      <div>
        <p class="label">기업 요청 리스트</p>
        <h2>지금 열려 있는 하이-스킬 공고</h2>
        <p class="lede">간단히 스캔하고, 상세 내용은 상세 페이지에서 확인할 수 있어요.</p>
      </div>
      <div class="filters">
        <label>
          <span>지역</span>
          <select v-model="filters.region">
            <option v-for="opt in REGIONS" :key="opt">{{ opt }}</option>
          </select>
        </label>
        <label class="search">
          <span>검색</span>
          <input v-model="filters.search" placeholder="기업, 역할, 키워드" type="search" />
        </label>
      </div>
    </header>

    <ul class="job-list">
      <li v-for="job in filteredCompanies" :key="job.id">
        <RouterLink class="job-link" :to="`/requests/${job.id}`">
          <div class="job-meta">
            <span class="pill">{{ job.companyType }}</span>
            <strong>{{ job.role }}</strong>
            <p>{{ job.company }}</p>
          </div>
          <div class="job-info">
            <span>{{ job.region }} · {{ job.mode }} · {{ job.duration }}</span>
            <span class="budget">{{ job.budget }}</span>
          </div>
          <p class="headline">{{ job.headline }}</p>
        </RouterLink>
      </li>
    </ul>
    <p v-if="!filteredCompanies.length" class="empty">조건에 맞는 공고가 없습니다.</p>
  </section>
</template>

<style scoped>
.company-board {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.board__header {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}
.lede {
  margin: 4px 0 0;
  color: var(--muted);
}
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
.filters label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--muted);
}
.filters select,
.filters input {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px;
  font-size: 14px;
}
.job-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.job-link {
  display: block;
  text-decoration: none;
  color: inherit;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.job-link:hover {
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
}
.job-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.job-meta strong {
  font-size: 16px;
}
.job-meta p {
  margin: 0;
  color: var(--muted);
}
.pill {
  font-size: 11px;
  border-radius: 999px;
  padding: 3px 10px;
  background: rgba(15, 23, 42, 0.06);
}
.job-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin: 6px 0;
  color: var(--muted);
}
.budget {
  font-weight: 700;
  color: #0f172a;
}
.headline {
  margin: 0;
  color: #0f172a;
  font-weight: 600;
}
.empty {
  text-align: center;
  color: var(--muted);
}
@media (max-width: 640px) {
  .job-info {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
