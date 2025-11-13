<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { companies } from '../data/companies'

const route = useRoute()
const company = computed(() => companies.find((job) => job.id === Number(route.params.id)))
</script>

<template>
  <section class="detail" v-if="company">
    <RouterLink to="/requests" class="back">← 목록으로</RouterLink>
    <header>
      <p class="label">{{ company.companyType }}</p>
      <h1>{{ company.role }}</h1>
      <span class="company">{{ company.company }}</span>
      <p class="meta">{{ company.region }} · {{ company.mode }} · {{ company.duration }} · 마감 {{ company.deadline }}</p>
    </header>
    <article class="summary">
      <h2>프로젝트 소개</h2>
      <p>{{ company.description }}</p>
      <ul class="tags">
        <li v-for="tag in company.keywords" :key="tag">#{{ tag }}</li>
      </ul>
      <div class="actions">
        <button class="primary">기업 지원하기</button>
      </div>
    </article>
  </section>
  <section class="detail" v-else>
    <p>요청을 찾을 수 없습니다.</p>
    <RouterLink to="/requests" class="back">목록으로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.detail {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
}
.back {
  text-decoration: none;
  color: #2563eb;
  display: inline-block;
  margin-bottom: 10px;
}
.label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}
.company {
  color: var(--muted);
}
.meta {
  color: var(--muted);
}
.summary {
  margin-top: 20px;
}
.tags {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tags li {
  background: rgba(15, 23, 42, 0.06);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
}
.actions {
  margin-top: 18px;
}
.primary {
  border: 0;
  background: linear-gradient(120deg, #a3e635, #10b981);
  color: #0f172a;
  font-weight: 700;
  border-radius: 999px;
  padding: 12px 20px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.35);
}
</style>
