export type Role = 'guest' | 'expert' | 'company'

export type AuthResponse = {
  token: string
  role: Role
  name: string
  email: string
}

const RAW_BASE = (import.meta as any).env?.VITE_API_BASE ?? '';
const API_BASE = (() => {
  const base = RAW_BASE.replace(/\/+$/, '');
  if (!base) return '/api';
  return base.endsWith('/api') ? base : `/api`;
})();

async function handle(res: Response) {
  const raw = await res.text()
  if (!res.ok) {
    let message = `API 요청이 실패했습니다. (status ${res.status})`
    try {
      const data = JSON.parse(raw || '{}')
      message = data.message || message
    } catch {
      message = `${message}: ${raw.slice(0, 120)}`
    }
    throw new Error(message)
  }
  return raw ? JSON.parse(raw) : {}
}

export async function login(role: Role, email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, email, password }),
  })
  return (await handle(res)) as AuthResponse
}

export async function register(role: Role, name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, name, email, password }),
  })
  return (await handle(res)) as AuthResponse
}



