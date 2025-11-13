import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./pages/HomePage.vue')
const OverviewPage = () => import('./pages/OverviewPage.vue')
const RequestsPage = () => import('./pages/RequestsPage.vue')
const CompanyDetailPage = () => import('./pages/CompanyDetailPage.vue')
const ExpertsPage = () => import('./pages/ExpertsPage.vue')
const ExpertDetailPage = () => import('./pages/ExpertDetailPage.vue')
const InsightsPage = () => import('./pages/InsightsPage.vue')
const ProfilePage = () => import('./pages/ProfilePage.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/overview', name: 'overview', component: OverviewPage },
    { path: '/requests', name: 'requests', component: RequestsPage },
    { path: '/requests/:id', name: 'request-detail', component: CompanyDetailPage },
    { path: '/experts', name: 'experts', component: ExpertsPage },
    { path: '/experts/:id', name: 'expert-detail', component: ExpertDetailPage },
    { path: '/insights', name: 'insights', component: InsightsPage },
    { path: '/profile', name: 'profile', component: ProfilePage },
  ]
})
