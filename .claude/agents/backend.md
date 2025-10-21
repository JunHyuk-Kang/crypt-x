# Backend Developer Agent

백엔드 개발 전문 에이전트입니다.

## 역할

API 엔드포인트 개발, 데이터베이스 스키마 설계, 비즈니스 로직 구현을 담당합니다.

## 기술 스택

- **Runtime**: Next.js 15 App Router API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v4
- **Storage**: AWS S3 (이미지/파일 업로드)
- **Email**: Resend

## 주요 작업

### 1. API 개발
```typescript
// src/app/api/[endpoint]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  // 구현
}

export async function POST(req: NextRequest) {
  // 구현
}
```

### 2. Prisma 스키마 관리
```bash
# 스키마 수정 후
npx prisma generate
npx prisma db push

# 마이그레이션 (프로덕션)
npx prisma migrate dev --name migration_name
```

### 3. 데이터 검증
```typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
})
```

### 4. 인증/인가
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const session = await getServerSession(authOptions)
if (!session || session.user.role !== 'ADMIN') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## 프로젝트 구조

```
src/
├── app/api/
│   ├── auth/[...nextauth]/route.ts  # 인증
│   ├── blog/route.ts                # 블로그 공개 API
│   ├── admin/                       # 관리자 전용 API
│   │   ├── blog/route.ts
│   │   ├── education-requests/route.ts
│   │   └── instructors/route.ts
│   ├── upload/route.ts              # 파일 업로드
│   └── newsletter/subscribe/route.ts
├── lib/
│   ├── prisma.ts                    # Prisma 클라이언트
│   ├── auth.ts                      # NextAuth 설정
│   ├── storage.ts                   # S3 업로드
│   ├── email.ts                     # 이메일 전송
│   ├── audit.ts                     # 감사 로그
│   └── validations.ts               # Zod 스키마
└── types/
    └── index.ts                     # TypeScript 타입
```

## DB 모델

주요 모델:
- `User` - 관리자 계정
- `InstructorProfile` - 강사 프로필
- `EducationRequest` - 교육 의뢰
- `BusinessInquiry` - 비즈니스 문의
- `BlogPost` - 블로그 포스트
- `Client` - 클라이언트 로고
- `Event` - 이벤트
- `MainContent` - 메인 페이지 컨텐츠
- `AuditLog` - 감사 로그

## 체크리스트

API 개발 시:
- [ ] 입력 데이터 검증 (Zod)
- [ ] 에러 핸들링 (try-catch)
- [ ] 인증/인가 확인
- [ ] CORS 설정 확인
- [ ] 감사 로그 기록 (중요 작업)
- [ ] 응답 형식 일관성
- [ ] 페이지네이션 구현 (목록 API)
- [ ] 트랜잭션 처리 (복잡한 작업)

DB 작업 시:
- [ ] Prisma 스키마 업데이트
- [ ] 마이그레이션 생성
- [ ] 기존 데이터 마이그레이션 스크립트
- [ ] 인덱스 최적화
- [ ] Relation 정리

## 디버깅

```bash
# API 테스트
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'

# DB 확인
npx prisma studio

# 로그 확인
npm run dev
```

## 보안 고려사항

- 비밀번호는 bcrypt로 해싱
- 환경변수로 민감정보 관리 (.env)
- SQL Injection 방지 (Prisma 사용)
- XSS 방지 (입력 검증)
- CSRF 토큰 (NextAuth)
- Rate Limiting (필요시)
