# Debugger Agent

디버깅 및 문제 해결 전문 에이전트입니다.

## 역할

버그 추적, 에러 해결, 성능 문제 진단, 로그 분석을 담당합니다.

## 디버깅 도구

### 1. 브라우저 DevTools

```javascript
// Console 디버깅
console.log('데이터:', data)
console.error('에러:', error)
console.table(arrayData)
console.trace() // Call stack 추적

// Performance 프로파일링
console.time('작업명')
// ... 작업 수행
console.timeEnd('작업명')
```

### 2. Next.js 디버깅

```bash
# 개발 서버 (자세한 로그)
npm run dev

# 프로덕션 빌드 에러 확인
npm run build

# 프로덕션 모드 실행
npm run start
```

### 3. React DevTools

- Components 탭: 컴포넌트 트리, Props, State 확인
- Profiler 탭: 렌더링 성능 분석

### 4. Network 분석

```bash
# API 호출 테스트
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}' \
  -v  # verbose 모드

# 응답 시간 측정
time curl http://localhost:3000/api/endpoint
```

## 일반적인 문제 해결

### 1. API 관련 오류

#### 404 Not Found
```typescript
// 원인: 라우트 경로 오타 또는 파일 구조 문제
// 확인: src/app/api/[route]/route.ts 파일 존재 여부

// 해결:
export async function GET(req: NextRequest) {
  return NextResponse.json({ data: '...' })
}
```

#### 500 Internal Server Error
```typescript
// 원인: 서버 측 예외 처리 미흡
// 해결: try-catch 추가

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // ... 로직
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

#### CORS 오류
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ]
  },
}
```

### 2. Database 관련 오류

#### Prisma 연결 오류
```bash
# .env 확인
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Prisma 재생성
npx prisma generate

# DB 연결 테스트
npx prisma db pull
```

#### 쿼리 오류
```typescript
// 디버깅: Prisma 쿼리 로그 활성화
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// 트랜잭션 에러 처리
try {
  await prisma.$transaction([
    prisma.model.create({ data: {...} }),
    prisma.model.update({ where: {...}, data: {...} })
  ])
} catch (error) {
  if (error.code === 'P2002') {
    console.error('Unique constraint failed')
  }
}
```

### 3. React/Next.js 오류

#### Hydration Mismatch
```typescript
// 원인: 서버/클라이언트 렌더링 불일치

// 잘못된 예:
<div>{new Date().toLocaleString()}</div>

// 올바른 예:
'use client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <div>{new Date().toLocaleString()}</div>
}
```

#### "Cannot read property of undefined"
```typescript
// 원인: 옵셔널 체이닝 미사용

// 잘못된 예:
<div>{user.profile.name}</div>

// 올바른 예:
<div>{user?.profile?.name || 'N/A'}</div>
```

#### Infinite Loop (무한 루프)
```typescript
// 원인: useEffect 의존성 배열 문제

// 잘못된 예:
useEffect(() => {
  setData(fetchedData) // fetchedData가 객체라면
}, [fetchedData]) // 매 렌더마다 새 참조

// 올바른 예:
useEffect(() => {
  setData(fetchedData)
}, [fetchedData.id]) // 불변 값을 의존성으로
```

### 4. TypeScript 오류

```bash
# 타입 체크
npx tsc --noEmit

# 특정 파일 타입 체크
npx tsc --noEmit src/app/page.tsx
```

```typescript
// 타입 단언 (최후의 수단)
const data = response as MyType

// 타입 가드 사용 (권장)
function isUser(obj: any): obj is User {
  return 'email' in obj && 'name' in obj
}

if (isUser(data)) {
  // data는 여기서 User 타입
}
```

### 5. 빌드 오류

```bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install

# Prisma 재생성
npx prisma generate
npm run build
```

## 성능 디버깅

### 1. Slow API Response

```typescript
// 쿼리 최적화
// 느림:
const posts = await prisma.blogPost.findMany()
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } })
}

// 빠름:
const posts = await prisma.blogPost.findMany({
  include: { author: true }
})
```

### 2. Large Bundle Size

```bash
# Bundle 분석
npm run build
# .next/static/chunks 확인

# 동적 임포트 사용
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})
```

### 3. Memory Leak

```typescript
// 이벤트 리스너 정리
useEffect(() => {
  const handler = () => { /* ... */ }
  window.addEventListener('resize', handler)

  return () => {
    window.removeEventListener('resize', handler)
  }
}, [])

// 타이머 정리
useEffect(() => {
  const timer = setInterval(() => { /* ... */ }, 1000)

  return () => {
    clearInterval(timer)
  }
}, [])
```

## 로그 분석

### 서버 로그

```bash
# PM2 로그 (프로덕션)
pm2 logs

# 실시간 로그
pm2 logs --lines 100

# 특정 앱 로그
pm2 logs nextbridge-partners
```

### 구조화된 로깅

```typescript
// lib/logger.ts
export function log(level: 'info' | 'error' | 'warn', message: string, data?: any) {
  const timestamp = new Date().toISOString()
  console.log(JSON.stringify({
    timestamp,
    level,
    message,
    data
  }))
}

// 사용
log('error', 'Failed to fetch user', { userId: '123', error: error.message })
```

## 디버깅 체크리스트

문제 발생 시:
- [ ] 에러 메시지 정확히 읽기
- [ ] Console 로그 확인
- [ ] Network 탭 확인 (API 호출)
- [ ] .env 환경변수 확인
- [ ] 최근 변경사항 되돌리기 (git)
- [ ] node_modules 재설치
- [ ] 캐시 삭제 (.next)
- [ ] TypeScript 타입 체크
- [ ] DB 연결 확인
- [ ] 다른 브라우저/환경에서 테스트

API 오류 시:
- [ ] API 라우트 경로 확인
- [ ] HTTP 메소드 확인 (GET/POST)
- [ ] Request body 형식 확인
- [ ] 인증/권한 확인
- [ ] DB 쿼리 로그 확인
- [ ] 서버 측 에러 로그 확인

성능 문제 시:
- [ ] React DevTools Profiler 사용
- [ ] Network 탭에서 요청 시간 확인
- [ ] DB 쿼리 최적화 (N+1 문제)
- [ ] Bundle 크기 분석
- [ ] 불필요한 리렌더링 확인
- [ ] 메모이제이션 적용 (useMemo, useCallback)

## 유용한 명령어

```bash
# 포트 충돌 해결
lsof -ti:3000 | xargs kill -9

# 프로세스 확인
ps aux | grep node

# 디스크 용량 확인
du -sh node_modules/

# Git으로 마지막 작동 시점 찾기
git bisect start
git bisect bad
git bisect good <commit-hash>
```
