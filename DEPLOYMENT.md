# Ogemi AI - Cloudflare Pages 部署指南

## 部署步骤

### 方法一：通过 Cloudflare Dashboard 部署

1. **登录 Cloudflare Dashboard**
   - 访问 [https://dash.cloudflare.com](https://dash.cloudflare.com)
   - 使用您的 Cloudflare 账户登录

2. **创建新的 Pages 项目**
   - 在左侧菜单中点击 "Pages"
   - 点击 "创建项目" 或 "Create a project"
   - 选择 "上传资产" 或 "Upload assets"

3. **配置项目**
   - 项目名称：`Ogemi AI`
   - 上传 `out` 文件夹中的所有文件
   - 构建输出目录：`out`

4. **设置环境变量**
   - 在项目设置中添加环境变量：
     - `OPENAI_API_KEY`: `sk-9bf19547ddbd4be1a87a7a43cf251097`
     - `NEXT_PUBLIC_APP_NAME`: `Ogemi AI`

5. **部署**
   - 点击 "保存并部署"
   - 等待部署完成

### 方法二：通过 Wrangler CLI 部署

1. **安装 Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **设置 API Token**
   ```bash
   $env:CLOUDFLARE_API_TOKEN="zydRr500RPYtoSSDx_VpAj1M-MJEikK5acArNabB"
   ```

3. **部署到 Pages**
   ```bash
   wrangler pages deploy out --project-name="ogemi-ai"
   ```

### 方法三：通过 Git 集成部署

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

2. **在 Cloudflare Pages 中连接 GitHub**
   - 选择 "连接到 Git"
   - 选择您的 GitHub 仓库
   - 配置构建设置：
     - 构建命令：`npm run build`
     - 构建输出目录：`out`
     - Node.js 版本：`18.x`

## 项目结构

```
ogemi-ai/
├── out/                    # 静态构建输出（部署此文件夹）
├── app/                    # Next.js 应用代码
├── components/             # React 组件
├── package.json           # 项目配置
├── next.config.js         # Next.js 配置
└── README.md              # 项目说明
```

## 环境变量

在 Cloudflare Pages 中设置以下环境变量：

- `OPENAI_API_KEY`: OpenAI API 密钥
- `NEXT_PUBLIC_APP_NAME`: 应用名称

## 注意事项

1. **API 密钥安全**：确保 API 密钥在环境变量中正确设置
2. **CORS 设置**：如果需要，在 Cloudflare Pages 中配置 CORS 规则
3. **自定义域名**：可以在 Pages 设置中添加自定义域名
4. **缓存设置**：根据需要配置缓存策略

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本（推荐 18.x）
   - 确保所有依赖都已安装
   - 检查构建日志中的错误信息

2. **API 调用失败**
   - 验证 OpenAI API 密钥是否正确
   - 检查网络连接
   - 查看浏览器控制台的错误信息

3. **样式问题**
   - 确保 Tailwind CSS 正确配置
   - 检查 CSS 文件是否正确加载

## 性能优化

1. **启用 Cloudflare 缓存**
2. **使用 CDN 加速**
3. **优化图片和资源**
4. **启用 Brotli 压缩**

## 监控和维护

1. **查看访问日志**
2. **监控 API 使用量**
3. **定期更新依赖**
4. **备份重要数据**

---

**部署完成后，您的 Ogemi AI 应用将在 Cloudflare Pages 上运行，享受全球 CDN 加速和强大的性能优化！**
