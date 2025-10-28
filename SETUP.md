# 快速安装和运行指南

## 系统要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器
- 现代浏览器（Chrome、Firefox、Safari、Edge）

## 安装步骤

### 1. 安装依赖

在项目根目录运行：

```bash
npm install
```

这将安装所有必需的依赖包，包括：
- Next.js 14
- React 18
- Tailwind CSS
- TypeScript
- Framer Motion
- React Dropzone
- Axios
- 其他必要的包

### 2. 环境配置

项目已经预配置了 `.env.local` 文件，包含通义大模型的 API 密钥：

```
TONGYI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
```

如果需要修改，请编辑根目录下的 `.env.local` 文件。

### 3. 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 4. 访问网站

在浏览器中打开 http://localhost:3000

## 功能说明

### 主要页面

1. **首页** (`/`)
   - Hero 区域展示
   - 图片上传和视频生成
   - 功能特性展示
   - 使用案例
   - 灵感画廊
   - FAQ 常见问题

2. **定价页面** (`/pricing`)
   - 三种定价方案：Free、Pro、Business
   - 月付/年付切换
   - 功能对比

3. **登录页面** (`/login`)
   - 邮箱密码登录
   - 社交账号登录（Google、GitHub）

4. **注册页面** (`/signup`)
   - 新用户注册
   - 表单验证

5. **隐私政策** (`/privacy`)
   - 数据收集和使用说明

6. **服务条款** (`/terms`)
   - 使用条款和限制

### 核心功能

#### 图片转视频
1. 点击上传区域或拖拽图片
2. 支持 JPG、PNG、WEBP 格式
3. 输入提示词描述想要的动画效果
4. 点击"Generate Video"生成视频
5. 预览和下载生成的视频

#### AI 集成
- 使用通义千问 API 进行图像理解
- 基于提示词生成视频描述
- API 端点：`/api/generate-video`

## 自定义配置

### 修改颜色主题

编辑 `tailwind.config.js`：

```javascript
colors: {
  primary: '#7c3aed',    // 紫色
  secondary: '#a855f7',  // 浅紫色
  dark: '#0f0f0f',       // 深色背景
}
```

### 修改画廊内容

编辑 `components/Gallery.tsx` 中的 `galleryItems` 数组：

```javascript
const galleryItems = [
  {
    id: 1,
    title: '你的标题',
    description: '描述',
    thumbnail: '/gallery/your-image.jpg',
    video: '/gallery/your-video.mp4',
    prompt: '使用的提示词',
  },
  // ... 更多项目
]
```

### 修改定价方案

编辑 `app/pricing/page.tsx` 中的 `plans` 数组。

## 生产环境部署

### 构建项目

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

### 部署到 Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 在 Vercel 控制台添加环境变量
4. 自动部署

### 部署到其他平台

项目支持部署到任何支持 Next.js 的平台：
- Netlify
- AWS Amplify
- Google Cloud Run
- 自建服务器（使用 Docker）

## 常见问题

### Q: 视频生成失败怎么办？
A: 检查：
1. API 密钥是否正确配置
2. 图片格式是否支持
3. 提示词是否过长
4. 查看浏览器控制台的错误信息

### Q: 如何添加更多 AI 效果？
A: 在 `components/VideoUpload.tsx` 中修改生成逻辑，或在 `app/api/generate-video/route.ts` 中调整 API 参数。

### Q: 如何更改上传文件大小限制？
A: 在 `next.config.js` 中添加：
```javascript
experimental: {
  serverActions: {
    bodySizeLimit: '10mb'
  }
}
```

### Q: 本地开发时端口冲突怎么办？
A: 使用不同端口启动：
```bash
npm run dev -- -p 3001
```

## 技术支持

如有问题，请查看：
- README.md - 项目概述
- 代码注释 - 详细的功能说明
- Next.js 文档 - https://nextjs.org/docs
- Tailwind CSS 文档 - https://tailwindcss.com/docs

## 项目结构

```
wula-ai-clone/
├── app/                    # Next.js 应用目录
│   ├── api/               # API 路由
│   ├── login/             # 登录页
│   ├── signup/            # 注册页
│   ├── pricing/           # 定价页
│   ├── privacy/           # 隐私政策
│   ├── terms/             # 服务条款
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
├── public/               # 静态资源
├── tailwind.config.js    # Tailwind 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 依赖管理
```

## 下一步

1. ✅ 安装依赖
2. ✅ 启动开发服务器
3. 🎨 自定义品牌颜色
4. 📸 添加真实的画廊内容
5. 🚀 配置生产环境
6. 📱 测试响应式设计
7. 🔐 配置真实的身份验证
8. 💳 集成支付系统（如需要）

祝使用愉快！🎉

