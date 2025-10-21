# DevOps Engineer Agent

배포, 인프라, 운영 자동화 전문 에이전트입니다.

## 역할

서버 배포, CI/CD 파이프라인, 모니터링, 환경 설정, 성능 최적화를 담당합니다.

## 기술 스택

- **Server**: Ubuntu Linux (AWS EC2)
- **Process Manager**: PM2
- **Database**: PostgreSQL
- **Storage**: AWS S3
- **Runtime**: Node.js
- **Web Server**: Next.js Built-in Server

## 배포 환경

### 프로덕션 서버 구조

```
/opt/nextbridge/                  # 애플리케이션 루트
├── .env.production              # 환경변수
├── prisma/                      # DB 스키마
├── public/                      # 정적 파일
│   └── uploads/                # 업로드 파일
├── .next/                       # 빌드 결과
├── node_modules/
└── package.json
```

### PM2 설정

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'nextbridge-partners',
    script: 'npm',
    args: 'start',
    cwd: '/opt/nextbridge',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/nextbridge/error.log',
    out_file: '/var/log/nextbridge/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G'
  }]
}
```

## 배포 프로세스

### 1. 자동 배포 스크립트

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Starting deployment..."

# Git pull
echo "📥 Pulling latest code..."
git pull origin master

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Prisma migration
echo "🗄️  Running database migrations..."
npx prisma generate
npx prisma db push

# Build
echo "🔨 Building application..."
npm run build

# Restart PM2
echo "♻️  Restarting application..."
pm2 restart nextbridge-partners

echo "✅ Deployment completed!"
```

### 2. 수동 배포 단계

```bash
# 1. 서버 접속
ssh ubuntu@your-server-ip

# 2. 프로젝트 디렉토리 이동
cd /opt/nextbridge

# 3. 최신 코드 가져오기
git pull origin master

# 4. 의존성 설치
npm install

# 5. Prisma 마이그레이션
npx prisma generate
npx prisma db push

# 6. 빌드
npm run build

# 7. PM2 재시작
pm2 restart nextbridge-partners

# 8. 상태 확인
pm2 status
pm2 logs nextbridge-partners --lines 50
```

## 환경 변수 관리

### .env.production

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nextbridge_prod"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"

# AWS S3
AWS_REGION="ap-northeast-2"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET_NAME="your-bucket-name"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# App
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### 환경변수 보안

```bash
# 파일 권한 설정
chmod 600 .env.production

# 소유자 확인
chown ubuntu:ubuntu .env.production

# Git에서 제외 확인
cat .gitignore | grep .env
```

## PM2 관리

### 기본 명령어

```bash
# 앱 시작
pm2 start ecosystem.config.js

# 앱 목록
pm2 list

# 로그 확인
pm2 logs nextbridge-partners
pm2 logs --lines 100

# 재시작
pm2 restart nextbridge-partners

# 중지
pm2 stop nextbridge-partners

# 삭제
pm2 delete nextbridge-partners

# 모니터링
pm2 monit
```

### PM2 자동 시작 (부팅 시)

```bash
# startup 스크립트 생성
pm2 startup

# 현재 프로세스 저장
pm2 save

# 확인
sudo systemctl status pm2-ubuntu
```

## 데이터베이스 관리

### PostgreSQL

```bash
# PostgreSQL 서비스 상태
sudo systemctl status postgresql

# DB 접속
sudo -u postgres psql

# DB 백업
pg_dump -U postgres nextbridge_prod > backup_$(date +%Y%m%d).sql

# DB 복원
psql -U postgres nextbridge_prod < backup_20240101.sql
```

### Prisma

```bash
# 스키마 동기화
npx prisma db push

# 마이그레이션 생성
npx prisma migrate dev --name migration_name

# Prisma Studio (로컬)
npx prisma studio

# DB 리셋 (개발 전용!)
npx prisma migrate reset
```

## 모니터링

### 로그 확인

```bash
# PM2 로그
pm2 logs nextbridge-partners

# 시스템 로그
tail -f /var/log/syslog

# Nginx 로그 (사용 시)
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 리소스 모니터링

```bash
# CPU/메모리 사용량
htop

# 디스크 사용량
df -h

# 네트워크 확인
netstat -tlnp | grep 3000

# 프로세스 확인
ps aux | grep node
```

### PM2 모니터링

```bash
# 실시간 모니터링
pm2 monit

# 상태 확인
pm2 status

# 메모리 사용량
pm2 info nextbridge-partners
```

## 성능 최적화

### Next.js 빌드 최적화

```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,

  images: {
    domains: ['your-bucket.s3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // 번들 크기 분석
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
        },
      }
    }
    return config
  }
}
```

### 캐싱 전략

```typescript
// API 응답 캐싱
export async function GET(req: NextRequest) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}

// 페이지 Revalidation
export const revalidate = 3600 // 1시간
```

## 보안

### 파일 권한

```bash
# 애플리케이션 파일
sudo chown -R ubuntu:ubuntu /opt/nextbridge
chmod -R 755 /opt/nextbridge

# 업로드 디렉토리
chmod -R 755 /opt/nextbridge/public/uploads

# 환경변수
chmod 600 /opt/nextbridge/.env.production
```

### 방화벽 (UFW)

```bash
# UFW 활성화
sudo ufw enable

# 포트 허용
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 3000  # Next.js (필요시)

# 상태 확인
sudo ufw status
```

## 백업 전략

### 자동 백업 스크립트

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/var/backups/nextbridge"
DATE=$(date +%Y%m%d_%H%M%S)

# DB 백업
pg_dump -U postgres nextbridge_prod > "$BACKUP_DIR/db_$DATE.sql"

# 파일 백업
tar -czf "$BACKUP_DIR/files_$DATE.tar.gz" /opt/nextbridge/public/uploads

# 7일 이상 된 백업 삭제
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

### Cron 작업

```bash
# crontab 편집
crontab -e

# 매일 새벽 3시 백업
0 3 * * * /opt/scripts/backup.sh

# 매주 월요일 배포 후 재시작
0 4 * * 1 cd /opt/nextbridge && ./deploy.sh
```

## 트러블슈팅

### 일반적인 문제

```bash
# 포트 충돌
sudo lsof -ti:3000 | xargs kill -9

# Node.js 메모리 부족
export NODE_OPTIONS="--max-old-space-size=4096"

# PM2 프로세스 정리
pm2 kill
pm2 start ecosystem.config.js

# 디스크 용량 확보
npm cache clean --force
rm -rf .next
rm -rf node_modules
npm install
```

### 롤백 절차

```bash
# 1. 이전 커밋으로 되돌리기
git log --oneline -10
git checkout <commit-hash>

# 2. 재배포
npm install
npm run build
pm2 restart nextbridge-partners

# 3. 확인
curl http://localhost:3000
pm2 logs
```

## 체크리스트

배포 전:
- [ ] 로컬에서 빌드 테스트
- [ ] 환경변수 확인
- [ ] DB 마이그레이션 테스트
- [ ] 백업 생성
- [ ] 롤백 계획 수립

배포 후:
- [ ] 앱 상태 확인 (pm2 status)
- [ ] 로그 확인 (pm2 logs)
- [ ] API 엔드포인트 테스트
- [ ] 프론트엔드 동작 확인
- [ ] 리소스 사용량 모니터링
- [ ] 에러 로그 확인

정기 작업:
- [ ] 일일: 로그 확인, 리소스 모니터링
- [ ] 주간: 백업 확인, 보안 업데이트
- [ ] 월간: 의존성 업데이트, 성능 분석
