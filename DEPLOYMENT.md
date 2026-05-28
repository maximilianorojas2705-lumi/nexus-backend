# 🚀 Nexus Backend - Production Deployment Guide

**Version:** 1.0.0
**Last Updated:** May 28, 2026
**Status:** ✅ Production Ready

---

## 📋 Pre-Deployment Checklist

### Security Verification ✅
- [ ] All environment variables secured in `.env`
- [ ] API keys and secrets not exposed in code
- [ ] JWT secret configured (min 32 characters)
- [ ] MongoDB connection string verified
- [ ] Database authentication enabled
- [ ] CORS origins whitelist configured
- [ ] Rate limiting thresholds set appropriately
- [ ] HTTPS enabled in production
- [ ] Security headers verified (Helmet active)

### Performance Verification ✅
- [ ] Database indexes created and optimized
- [ ] Caching strategy validated
- [ ] Connection pooling configured
- [ ] Memory usage within acceptable limits
- [ ] Response times < 200ms (p95)
- [ ] Load testing completed successfully
- [ ] No memory leaks detected

### Code Quality ✅
- [ ] TypeScript compilation successful
- [ ] All lint checks passing
- [ ] Tests passing (npm test)
- [ ] No console.log in production code
- [ ] Error handling complete
- [ ] Deprecated code removed

### Documentation ✅
- [ ] README.md up-to-date
- [ ] API documentation complete
- [ ] Deployment guide reviewed
- [ ] Runbook created
- [ ] Incident response plan drafted

---

## 🚀 Deployment Methods

### Method 1: Docker Compose (Recommended)

#### Prerequisites
- Docker 20.10+
- Docker Compose 1.29+
- Port 3000 available

#### Steps
```bash
# Clone repository
git clone https://github.com/maximilianorojas2705-lumi/nexus-backend.git
cd nexus-backend

# Create production env file
cp .env.example .env
# Edit .env with production values

# Build and start
docker-compose -f docker-compose.yml up -d

# Verify services
docker-compose ps

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Method 2: Traditional Linux/Ubuntu Server

#### Prerequisites
- Node.js 16+ LTS
- npm 8+
- MongoDB 5+
- Nginx or Apache for reverse proxy
- PM2 for process management

#### Installation Steps
```bash
# Clone and setup
git clone https://github.com/maximilianorojas2705-lumi/nexus-backend.git
cd nexus-backend

# Install dependencies
npm ci

# Build
npm run build

# Setup PM2
npm install -g pm2
pm2 ecosystem

# Start with PM2
pm2 start ecosystem.config.js --env production

# Setup startup on reboot
pm2 startup
pm2 save
```

#### PM2 Ecosystem Configuration
```javascript
module.exports = {
  apps: [{
    name: 'nexus-backend',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

#### Nginx Reverse Proxy Configuration
```nginx
upstream nexus_backend {
    server localhost:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name api.example.com;
    
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    access_log /var/log/nginx/nexus_backend_access.log;
    error_log /var/log/nginx/nexus_backend_error.log;
    
    location /api {
        proxy_pass http://nexus_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### Method 3: AWS ECS

#### Prerequisites
- AWS Account with ECS access
- Docker image pushed to ECR
- RDS instance configured
- Load balancer setup

#### Deployment
```bash
docker build -t nexus-backend:1.0.0 .
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [AWS_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com
docker tag nexus-backend:1.0.0 [AWS_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com/nexus-backend:1.0.0
docker push [AWS_ACCOUNT_ID].dkr.ecr.us-east-1.amazonaws.com/nexus-backend:1.0.0

aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs update-service --cluster nexus-prod --service nexus-backend --task-definition nexus-backend:1 --force-new-deployment
```

### Method 4: Heroku

#### Steps
```bash
heroku login
heroku create nexus-backend-prod
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=<your_mongodb_uri>
heroku config:set JWT_SECRET=<your_jwt_secret>
git push heroku main
heroku logs --tail
heroku ps:scale web=2
```

---

## 🔒 Environment Configuration

### Required Variables
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://user:password@host:port/database
JWT_SECRET=your_secret_key_min_32_characters
JWT_EXPIRE=24h
API_VERSION=v1
API_BASE_URL=https://api.example.com
CORS_ORIGIN=https://frontend.example.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

---

## 📊 Monitoring & Alerts

### Key Metrics
- **Error Rate:** Target < 0.1%
- **Response Time (p95):** Target < 200ms
- **CPU Usage:** Target < 70%
- **Memory Usage:** Target < 80%
- **Database Query Time:** Target < 100ms

### Alert Thresholds
- Error rate > 1% → Page on-call
- Response time > 500ms → Warning
- CPU > 80% → Alert
- Memory > 90% → Alert
- Disk > 85% → Alert

---

## 🔄 Rollback Procedure

```bash
# Quick rollback
pm2 revert

# Docker rollback
docker-compose down
git checkout v0.9.0
docker-compose up -d

# AWS ECS rollback
aws ecs update-service --cluster nexus-prod --service nexus-backend --task-definition nexus-backend:previous-version --force-new-deployment
```

---

## 🧪 Smoke Tests

```bash
curl -X GET http://localhost:3000/api/health

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer your_jwt_token"
```

---

## 📝 Deployment Checklist

### Before
- [ ] All branches merged
- [ ] Version bumped
- [ ] CHANGELOG updated
- [ ] Environment variables prepared
- [ ] Database backups created
- [ ] Team notified
- [ ] Monitoring armed

### During
- [ ] Monitor logs
- [ ] Check error rates
- [ ] Verify database
- [ ] Test critical flows
- [ ] Monitor resources

### After
- [ ] Verify endpoints
- [ ] Check logs
- [ ] Validate data
- [ ] Test workflows
- [ ] Monitor for 24 hours
- [ ] Update documentation

---

**Deployment Guide Complete!**

For troubleshooting, see [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)