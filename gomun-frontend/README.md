## GOMUN Frontend

Vite + Vue 3 + TypeScript 기반의 프런트엔드입니다. 기업과 전문가를 매칭하는 Zero-Gap HR Tech 콘셉트를 빠르게 확인할 수 있습니다.

### 개발/미리보기

```bash
npm install
npm run dev
```

### 환경 변수 & Mock Auth Server (Python)

루트에 `.env.local` 파일을 만들고 다음 값을 넣어 주세요 (다른 포트를 쓴다면 주소만 바꾸면 됩니다).

```
VITE_API_BASE=http://localhost:4000
```

FastAPI 기반의 mock 서버는 `server_py` 디렉터리에 있습니다.

```bash
cd server_py
pip install -r requirements.txt
uvicorn main:app --reload --port 4000
```

개발 모드에서는 Vite가 `/api` 요청을 위 주소로 proxy 하므로, 위 서버를 켜 두고 `npm run dev`를 실행하면 바로 연동됩니다.

### 빌드 & 배포

```bash
npm run build
npm run preview   # 로컬 번들 확인
# Firebase CLI 등을 쓰는 경우
npm run deploy
```

### 주요 페이지

- `/` : 홈 히어로 + 매칭 지표
- `/overview` : 공모전용 Overview
- `/requests` : 기업 요청 리스트 (전문가가 지원)
- `/experts` : 전문가 보드 (기업이 Send 요청)

로그인 모달에서 게스트/전문가/기업 계정으로 전환해 흐름을 테스트할 수 있습니다.
