# Ogemi AI - 智能对话助手

一个现代化的AI智能体对话应用，基于Next.js和OpenAI API构建，提供流畅的AI交互体验。

## 功能特性

- 🤖 **智能对话**: 集成OpenAI GPT-3.5-turbo模型，提供自然流畅的对话体验
- 🎨 **现代UI**: 参考专业设计风格，采用深色主题和玻璃拟态效果
- 📱 **响应式设计**: 完美适配桌面端和移动端设备
- 🔔 **实时通知**: 优雅的消息通知系统
- 🎭 **动画效果**: 使用Framer Motion提供流畅的交互动画
- 🎤 **语音支持**: 预留语音输入功能接口
- ⚡ **高性能**: 基于Next.js 14构建，支持服务端渲染

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI库**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **AI服务**: OpenAI GPT-3.5-turbo
- **图标**: Lucide React

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 环境配置

创建 `.env.local` 文件并添加以下配置：

```env
OPENAI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
NEXT_PUBLIC_APP_NAME=Ogemi AI
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
ogemi-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   └── chat/          # AI对话API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── ChatInterface.tsx  # 聊天界面
│   ├── Header.tsx         # 页面头部
│   └── NotificationPopup.tsx # 通知弹窗
├── public/               # 静态资源
└── ...配置文件
```

## 主要组件

### ChatInterface
- 聊天消息显示
- 消息输入和发送
- 语音录制功能（预留）
- 实时消息状态

### Header
- 响应式导航栏
- 品牌标识
- 移动端菜单

### NotificationPopup
- 优雅的通知显示
- 自动消失动画
- 进度条指示

## API接口

### POST /api/chat

发送消息给AI并获取回复。

**请求体:**
```json
{
  "message": "你好，请介绍一下自己"
}
```

**响应:**
```json
{
  "response": "你好！我是Ogemi AI，您的智能助手..."
}
```

## 自定义配置

### 修改AI模型
在 `app/api/chat/route.ts` 中修改模型配置：

```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4', // 更改为GPT-4
  // ...其他配置
})
```

### 自定义样式
在 `tailwind.config.js` 中修改主题配置：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      }
    }
  }
}
```

## 部署

### Vercel部署
1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 添加环境变量
4. 部署完成

### 其他平台
项目支持部署到任何支持Node.js的平台，如：
- Netlify
- Railway
- DigitalOcean App Platform

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues
- 邮箱: [您的邮箱]

---

**注意**: 请确保妥善保管您的OpenAI API密钥，不要将其提交到公共代码仓库中。
