<script setup lang="ts">

import { reactive, ref, watchEffect, watch, computed } from 'vue'

import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router'

import MenuToggle from './components/MenuToggle.vue'

import SideNav from './components/SideNav.vue'

import { login, register, type Role } from './services/auth'



const router = useRouter()

const route = useRoute()



const sideOpen = ref(false)

const showAbout = ref(false)

const showAuth = ref(false)

const dark = ref(false)



const tabs = [

  { label: 'Home', to: '/' },

  { label: 'Overview', to: '/overview' },

  { label: 'Requests', to: '/requests' },

  { label: 'Experts', to: '/experts' },

  { label: 'Insights', to: '/insights' },

]



const roleOptions: Array<{ value: Role; label: string }> = [

  { value: 'guest', label: '게스트' },

  { value: 'expert', label: '전문가' },

  { value: 'company', label: '기업' },

]



const roleCopy: Record<Role, { label: string; description: string; avatar: string }> = {

  guest: { label: '게스트', description: '둘러보기 전용', avatar: '/images/av1.svg' },

  expert: { label: '전문가', description: '프로필/지원 가능', avatar: '/images/av3.svg' },

  company: { label: '기업', description: '요청 생성/매칭', avatar: '/images/av5.svg' },

}



type Session = { token: string; role: Role; name: string; email: string }

const stored = typeof window !== 'undefined' ? window.localStorage.getItem('gomun:user') : null

const currentUser = ref<Session | null>(stored ? JSON.parse(stored) : null)

watch(currentUser, (val) => {

  if (val) localStorage.setItem('gomun:user', JSON.stringify(val))

  else localStorage.removeItem('gomun:user')

})

const activeRole = computed(() => (currentUser.value ? roleCopy[currentUser.value.role] : null))



const authMode = ref<'login' | 'register'>('login')

const authRole = ref<Role>('expert')

const authForm = reactive({ name: '', email: '', password: '' })

const authLoading = ref(false)

const authError = ref('')



watchEffect(() => {

  const html = document.documentElement

  if (dark.value) html.setAttribute('data-theme', 'dark')

  else html.removeAttribute('data-theme')

})



function handleProfileClick() {

  if (!currentUser.value) openAuth('login')

  else router.push('/profile')

}



function openAuth(mode: 'login' | 'register' = 'login') {

  authMode.value = mode

  authForm.name = ''

  authForm.email = ''

  authForm.password = ''

  authError.value = ''

  showAuth.value = true

}



function closeAuth() {

  showAuth.value = false

}



function loginAsGuest() {

  currentUser.value = { token: `guest-${Date.now()}`, role: 'guest', name: '게스트', email: 'guest@gomun.kr' }

  showAuth.value = false

}



async function submitAuth() {

  authError.value = ''

  authLoading.value = true

  try {

    let session: Session

    if (authMode.value === 'login') {

      session = await login(authRole.value, authForm.email, authForm.password)

    } else {

      session = await register(authRole.value, authForm.name, authForm.email, authForm.password)

    }

    currentUser.value = session

    showAuth.value = false

  } catch (err) {

    authError.value = err instanceof Error ? err.message : '처리 중 문제가 발생했습니다.'

  } finally {

    authLoading.value = false

  }

}



function logout() {

  currentUser.value = null

}



watch(

  () => route.path,

  (p) => {

    if (p === '/requests' || p === '/experts') sideOpen.value = true

  },

  { immediate: true },

)

</script>



<template>

  <div class="app">

    <header class="app__header">

      <div class="app__brand">

        <img src="/vite.svg" alt="logo" class="brand__logo" />

        <h1 class="brand__title">GOMUN - Zero-Gap HR Tech</h1>

        <nav class="brand-tabs">

          <RouterLink v-for="t in tabs" :key="t.label" class="brand-tab" :to="t.to" active-class="is-active">

            {{ t.label }}

          </RouterLink>

        </nav>

      </div>

      <div class="app__actions">

        <div class="header__spacer"></div>

        <button class="link" @click="showAbout = true">About</button>

        <button class="icon" @click="dark = !dark" :aria-pressed="dark" title="Toggle theme">

          <svg v-if="!dark" width="18" height="18" viewBox="0 0 24 24" fill="none">

            <path

              d="M12 3v2m0 14v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z"

              stroke="currentColor"

              stroke-width="1.5"

            />

          </svg>

          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">

            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.5" fill="currentColor" />

          </svg>

        </button>

        <button class="icon" aria-label="Notifications" title="Notifications">

          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">

            <path

              d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m2 4a2 2 0 002-2H9a2 2 0 002 2z"

              stroke="currentColor"

              stroke-width="1.5"

            />

          </svg>

        </button>

        <div class="role-pill" v-if="activeRole">

          <span>{{ activeRole.label }} · {{ currentUser?.name }}</span>

          <small>{{ activeRole.description }}</small>

        </div>

        <button class="link" v-if="currentUser" @click="logout">Logout</button>

        <button class="link" v-else @click="openAuth('login')">Login</button>

        <img

          class="avatar-mini"

          :src="activeRole?.avatar || '/images/av1.svg'"

          :alt="activeRole?.label || 'guest'"

          @click="handleProfileClick"

          title="Profile"

        />

        <MenuToggle v-model="sideOpen" />

      </div>

    </header>



    <main class="app__main" :class="{ 'with-rail': sideOpen }">

      <transition name="rail">

        <aside v-if="sideOpen" class="rail" @click.self="sideOpen = false">

          <SideNav :is-auth="Boolean(currentUser)" />

        </aside>

      </transition>



      <transition name="modal">

        <section v-if="showAuth" class="modal" @click="closeAuth">

          <article class="modal__content modal__content--wide auth-modal" @click.stop>

            <div class="auth__header">

              <h3>GOMUN 로그인</h3>

              <div class="auth__tabs">

                <button :class="{ active: authMode === 'login' }" @click="authMode = 'login'">로그인</button>

                <button :class="{ active: authMode === 'register' }" @click="authMode = 'register'">회원가입</button>

              </div>

            </div>

            <div class="role-switch auth__roles">

              <button

                v-for="opt in roleOptions"

                :key="opt.value"

                type="button"

                :class="['role-switch__btn', { active: authRole === opt.value }]"

                @click="authRole = opt.value"

              >

                {{ opt.label }}

              </button>

            </div>

            <form class="auth__form" @submit.prevent="submitAuth">

              <label v-if="authMode === 'register'">

                <span>이름</span>

                <input v-model="authForm.name" placeholder="홍길동" required />

              </label>

              <label>

                <span>이메일</span>

                <input type="email" v-model="authForm.email" placeholder="email@gomun.kr" required />

              </label>

              <label>

                <span>비밀번호</span>

                <input type="password" v-model="authForm.password" placeholder="********" required />

              </label>

              <p class="auth__error" v-if="authError">{{ authError }}</p>

              <button class="primary" type="submit" :disabled="authLoading">

                {{ authLoading ? '처리 중...' : authMode === 'login' ? '로그인' : '회원가입' }}

              </button>

            </form>

            <div class="auth__guest">

              <span>아직 계정이 없나요?</span>

              <button class="ghost" @click="loginAsGuest">게스트로 둘러보기</button>

            </div>

          </article>

        </section>

      </transition>



      <section class="app__content">

        <RouterView />

      </section>



      <transition name="modal">

        <section v-if="showAbout" class="modal" @click="showAbout = false">

          <article class="modal__content" @click.stop>

            <h3 class="modal__title">GOMUN Prototype</h3>

            <p class="modal__text">하이-스킬 긱이코노미 기반 Zero-Gap HR Tech. 매칭·계약·정산 자동화로 품질을 보증하는 실험적 브랜드입니다.</p>

            <button class="modal__close" @click="showAbout = false">닫기</button>

          </article>

        </section>

      </transition>

    </main>

  </div>

</template>



<style scoped>

.app {

  --header-h: 56px;

}

.app__header {

  position: sticky;

  top: 0;

  height: var(--header-h);

  background: #ffffff;

  border-bottom: 1px solid var(--border);

  z-index: 10;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 12px 20px;

  gap: 12px;

}

.app__brand {

  display: flex;

  align-items: center;

  gap: 12px;

}

.brand__logo {

  width: 28px;

  height: 28px;

}

.brand__title {

  font-size: 15px;

  font-weight: 800;

  margin: 0;

}

.brand-tabs {

  display: none;

  gap: 8px;

  margin-left: 14px;

}

.brand-tab {

  text-decoration: none;

  color: inherit;

  padding: 6px 10px;

  border-radius: 8px;

  font-size: 13px;

}

.brand-tab.is-active {

  background: rgba(99, 102, 241, 0.1);

  color: #1e1b4b;

  font-weight: 700;

}

@media (min-width: 900px) {

  .brand-tabs {

    display: flex;

  }

}

.app__actions {

  display: flex;

  align-items: center;

  gap: 12px;

}

.header__spacer {

  flex: 1;

}

.icon {

  border: 0;

  background: transparent;

  color: #475569;

  width: 32px;

  height: 32px;

  display: grid;

  place-items: center;

  border-radius: 8px;

  cursor: pointer;

}

.icon:hover {

  background: rgba(99, 102, 241, 0.08);

  color: #1e293b;

}

.role-switch {

  display: flex;

  background: #f8fafc;

  border: 1px solid var(--border);

  border-radius: 999px;

  padding: 2px;

}

.role-switch__btn {

  border: 0;

  background: transparent;

  font-size: 12px;

  padding: 4px 10px;

  border-radius: 999px;

  cursor: pointer;

  color: #475569;

}

.role-switch__btn.active {

  background: #fff;

  color: #0f172a;

  font-weight: 700;

  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);

}

.role-pill {

  display: flex;

  flex-direction: column;

  align-items: flex-end;

  font-size: 11px;

  color: var(--muted);

  line-height: 1.2;

}

.role-pill span {

  font-weight: 700;

  color: #0f172a;

}

.avatar-mini {

  width: 28px;

  height: 28px;

  border-radius: 50%;

  border: 1px solid var(--border);

  cursor: pointer;

}

.link {

  border: 0;

  background: transparent;

  color: #667085;

  cursor: pointer;

}

.link:hover {

  color: #0f172a;

}



.app__main {

  position: relative;

  padding: 20px;

}

.app__content {

  padding: 0;

}

.app__main.with-rail {

  padding-right: 340px;

}

.rail {

  position: fixed;

  top: var(--header-h);

  right: 0;

  bottom: 0;

  width: 320px;

  background: var(--surface);

  border-left: 1px solid var(--border);

  box-shadow: 0 6px 30px rgba(15, 23, 42, 0.06);

}

.rail-enter-active,

.rail-leave-active {

  transition: transform 0.22s ease, opacity 0.22s ease;

}

.rail-enter-from,

.rail-leave-to {

  transform: translateY(-8px);

  opacity: 0;

}



.modal {

  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.08);

  display: grid;

  place-items: center;

  z-index: 20;

}

.modal__content {

  background: var(--surface);

  border: 1px solid var(--border);

  border-radius: 12px;

  max-width: 520px;

  width: 92vw;

  padding: 24px;

}

.modal__content--wide {

  max-width: 520px;

}

.modal__title {

  margin: 0 0 8px;

}

.modal__text {

  margin: 0 0 16px;

  color: var(--muted);

}

.modal__close {

  border: 0;

  background: var(--text, #0f172a);

  color: #fff;

  border-radius: 8px;

  padding: 8px 12px;

  cursor: pointer;

}

.modal-enter-active,

.modal-leave-active {

  transition: opacity 0.2s ease;

}

.modal-enter-from,

.modal-leave-to {

  opacity: 0;

}



.auth-modal {

  max-width: 520px;

}

.auth__header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 12px;

}

.auth__tabs button {

  border: 0;

  background: transparent;

  padding: 4px 10px;

  border-radius: 8px;

  cursor: pointer;

  font-size: 12px;

}

.auth__tabs button.active {

  background: rgba(99, 102, 241, 0.12);

  color: #1e1b4b;

  font-weight: 700;

}

.auth__roles {

  margin: 12px 0;

}

.auth__form {

  display: flex;

  flex-direction: column;

  gap: 10px;

  margin-top: 10px;

}

.auth__form label {

  display: flex;

  flex-direction: column;

  gap: 4px;

  font-size: 12px;

  color: var(--muted);

}

.auth__form input {

  border: 1px solid var(--border);

  border-radius: 8px;

  padding: 8px;

  font-size: 14px;

}

.auth__error {

  color: #ef4444;

  font-size: 12px;

  margin: 0;

}

.auth__guest {

  margin-top: 12px;

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 12px;

  color: var(--muted);

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

.ghost {

  border: 0;

  background: transparent;

  color: var(--muted);

  cursor: pointer;

  font-size: 12px;

}



:global(html[data-theme='dark'] .app__header) {

  background: #0f172a;

  color: #e2e8f0;

}

</style>

