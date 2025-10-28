# 部署指南

本文档提供了将 Wula.ai 克隆项目部署到各种平台的详细说明。

## 目录
1. [Vercel 部署（推荐）](#vercel-部署推荐)
2. [Netlify 部署](#netlify-部署)
3. [Docker 部署](#docker-部署)
4. [自建服务器部署](#自建服务器部署)

---

## Vercel 部署（推荐）

Vercel 是 Next.js 的创建者，提供最佳的性能和体验。

### 步骤

1. **准备代码仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin master
   ```

2. **导入到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - Vercel 会自动检测 Next.js 项目

3. **配置环境变量**
   在 Vercel 项目设置中添加：
   ```
   TONGYI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
   NEXT_PUBLIC_API_URL=/api
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 访问提供的 URL

### 自动部署

每次推送到 master 分支都会自动触发新的部署。

---

## Netlify 部署

### 步骤

1. **创建 netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **部署到 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "New site from Git"
   - 选择你的仓库
   - 配置构建设置
   - 添加环境变量

3. **环境变量**
   ```
   TONGYI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
   NEXT_PUBLIC_API_URL=/api
   ```

---

## Docker 部署

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - TONGYI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
      - NEXT_PUBLIC_API_URL=/api
    restart: unless-stopped
```

### 构建和运行

```bash
# 构建镜像
docker build -t wula-ai .

# 运行容器
docker run -p 3000:3000 \
  -e TONGYI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097 \
  wula-ai

# 或使用 docker-compose
docker-compose up -d
```

---

## 自建服务器部署

### 使用 PM2

1. **安装 Node.js 和 PM2**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **上传代码**
   ```bash
   scp -r * user@your-server:/var/www/wula-ai/
   ```

3. **服务器上操作**
   ```bash
   cd /var/www/wula-ai
   npm install
   npm run build
   
   # 创建 ecosystem.config.js
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'wula-ai',
       script: 'node_modules/next/dist/bin/next',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
         TONGYI_API_KEY: 'sk-9bf19547ddbd4be1a87a7a43cf251097'
       }
     }]
   }
   EOF
   
   # 启动应用
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

4. **配置 Nginx 反向代理**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **启用 SSL (Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 环境变量说明

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `TONGYI_API_KEY` | 是 | 通义千问 API 密钥 |
| `NEXT_PUBLIC_API_URL` | 否 | API 基础 URL，默认 `/api` |
| `NEXT_PUBLIC_APP_URL` | 否 | 应用完整 URL |
| `NODE_ENV` | 否 | 环境：`development` 或 `production` |

---

## 性能优化建议

### 1. 启用 CDN
- Vercel 自动提供 CDN
- 其他平台可使用 Cloudflare CDN

### 2. 图片优化
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-image-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### 3. 启用压缩
```javascript
// next.config.js
module.exports = {
  compress: true,
}
```

### 4. 配置缓存
```nginx
# Nginx 配置
location /_next/static {
    expires 365d;
    add_header Cache-Control "public, immutable";
}
```

---

## 监控和日志

### Vercel Analytics
```bash
npm install @vercel/analytics
```

### PM2 日志
```bash
pm2 logs wula-ai
pm2 monit
```

### 错误追踪
推荐使用：
- Sentry
- LogRocket
- Datadog

---

## 故障排除

### 构建失败
```bash
# 清除缓存
rm -rf .next node_modules
npm install
npm run build
```

### API 连接问题
检查环境变量是否正确设置：
```bash
echo $TONGYI_API_KEY
```

### 内存不足
增加 Node.js 内存限制：
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

---

## 备份和恢复

### 备份数据库（如果使用）
```bash
# 定期备份
0 2 * * * /usr/bin/mongodump --out /backup/$(date +\%Y\%m\%d)
```

### 备份上传文件
```bash
# 同步到云存储
aws s3 sync /var/www/wula-ai/public/uploads s3://your-bucket/uploads
```

---

## 安全建议

1. **使用 HTTPS**
2. **定期更新依赖**
   ```bash
   npm audit
   npm update
   ```
3. **限制 API 访问速率**
4. **配置 CORS**
5. **启用 CSP 头部**

---

## 扩展和负载均衡

### 水平扩展
```bash
# PM2 集群模式
pm2 start ecosystem.config.js -i max
```

### 负载均衡器配置
使用 Nginx、HAProxy 或云服务商的负载均衡器。

---

## 支持

如遇到部署问题，请参考：
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 文档](https://vercel.com/docs)
- 项目 README.md

祝部署顺利！🚀

