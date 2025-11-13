export type ProfilePayload = {
  name?: string
  title?: string
  region?: string
  focus?: string
  availability?: string
  responseTime?: string
  phone?: string
  website?: string
  bio?: string
}

const API_BASE = '/api'

async function handle(res: Response) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || '프로필 요청에 실패했습니다.')
  }
  return res.json()
}

export async function fetchProfile(email: string) {
  const res = await fetch(`${API_BASE}/profile/${encodeURIComponent(email)}`)
  return handle(res)
}

export async function updateProfile(email: string, payload: ProfilePayload) {
  const res = await fetch(`${API_BASE}/profile/${encodeURIComponent(email)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handle(res)
}
