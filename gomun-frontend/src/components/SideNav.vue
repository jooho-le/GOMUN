<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ isAuth: boolean }>()

const baseItems = [
  { label: 'Home', to: '/' },
  { label: '기업 요청', to: '/requests' },
  { label: '전문가 탐색', to: '/experts' },
  { label: 'Insights', to: '/insights' },
  { label: 'Profile', to: '/profile', protected: true },
]

const items = computed(() => baseItems.filter((item) => props.isAuth || !item.protected))
</script>

<template>
  <nav class="sidenav">
    <ul>
      <li v-for="(it, i) in items" :key="i">
        <router-link :to="it.to" class="btnlike" active-class="active"><span>{{ it.label }}</span></router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidenav {
  width: 100%;
  max-width: 280px;
  background: transparent;
}
.sidenav ul {
  list-style: none;
  margin: 0;
  padding: 10px;
}
.btnlike {
  display: block;
  width: 100%;
  height: 40px;
  color: #0f172a;
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
}
.btnlike:hover {
  background: rgba(99, 102, 241, 0.08);
}
.btnlike.active {
  background: rgba(99, 102, 241, 0.12);
  color: #3730a3;
}
.btnlike span {
  font-size: 14px;
  font-weight: 600;
}
</style>
