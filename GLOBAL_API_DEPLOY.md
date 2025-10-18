# 🔧 使用 Global API Key 部署到 Cloudflare Pages

## 🚨 当前问题
提供的API Token没有Cloudflare Pages的权限，需要使用Global API Key。

## 🛠️ 解决方案

### 方法1：获取Global API Key

1. **在已打开的API Tokens页面中**：
   - 找到 **"Global API Key"** 部分
   - 点击 **"View"** 按钮
   - 输入您的Cloudflare密码
   - 复制Global API Key

2. **告诉我您的信息**：
   - 邮箱：`lihongyangnju@gmail.com`
   - Global API Key：`您的Global API Key`

### 方法2：通过Web界面手动创建

1. **访问 Cloudflare Pages**：
   https://dash.cloudflare.com/pages

2. **如果看到404错误**：
   - 访问：https://dash.cloudflare.com
   - 在左侧菜单中查找 **"Pages"** 或 **"Workers & Pages"**
   - 如果没有，可能需要升级账户

3. **手动创建项目**：
   - 点击 **"Create a project"**
   - 选择 **"Connect to Git"**
   - 连接您的GitHub仓库：`Mercury-nju/ogemi-ai`

### 方法3：使用Wrangler with Global API Key

一旦您获得Global API Key，我会运行：

```bash
# 设置Global API Key
$env:CLOUDFLARE_EMAIL="lihongyangnju@gmail.com"
$env:CLOUDFLARE_API_KEY="您的Global API Key"

# 创建Pages项目
wrangler pages project create ogemi-ai

# 部署项目
wrangler pages deploy out --project-name=ogemi-ai
```

## 🎯 推荐的部署配置

### 构建设置
- **项目名称**：`ogemi-ai`
- **构建命令**：`npm run build`
- **输出目录**：`out`
- **Node.js版本**：`18`

### 环境变量
- `OPENAI_API_KEY`: `sk-9bf19547ddbd4be1a87a7a43cf251097`
- `NEXT_PUBLIC_APP_NAME`: `Ogemi AI`

## 📋 下一步

**请选择以下方案之一：**

### 方案A：提供Global API Key
1. 获取Global API Key
2. 告诉我Global API Key
3. 我立即帮您部署

### 方案B：手动创建项目
1. 通过Web界面手动创建Cloudflare Pages项目
2. 连接GitHub仓库
3. 配置构建设置

### 方案C：使用其他平台
如果Cloudflare Pages持续有问题，我们可以使用：
- **Vercel**：https://vercel.com
- **Netlify**：https://netlify.com

---

**请告诉我您的Global API Key，或者选择其他方案！** 🚀
