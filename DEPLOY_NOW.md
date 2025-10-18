# 🚀 立即部署到 Cloudflare Pages

## 📋 当前状态
- ✅ 代码已推送到 GitHub：https://github.com/Mercury-nju/ogemi-ai
- ❌ **还没有在 Cloudflare Pages 中创建项目**
- ❌ **还没有配置自动部署**

## 🎯 现在需要做的步骤：

### 步骤 1：创建 Cloudflare Pages 项目

1. **在已打开的 Cloudflare Pages 页面中**：
   - 点击 **"创建项目"** 或 **"Create a project"**
   - 选择 **"连接到 Git"** 或 **"Connect to Git"**

### 步骤 2：连接 GitHub

1. **选择 Git 提供商**：
   - 选择 **"GitHub"**
   - 如果第一次使用，需要授权 Cloudflare 访问您的 GitHub 账户

2. **选择仓库**：
   - 在仓库列表中找到 **"Mercury-nju/ogemi-ai"**
   - 点击选择这个仓库

### 步骤 3：配置构建设置

**项目设置**：
- **项目名称**：`ogemi-ai`
- **生产分支**：`main`

**构建设置**：
- **构建命令**：`npm run build`
- **构建输出目录**：`out`
- **Node.js 版本**：`18`

### 步骤 4：设置环境变量

在 **"环境变量"** 部分添加：

| 变量名 | 值 |
|--------|-----|
| `OPENAI_API_KEY` | `sk-9bf19547ddbd4be1a87a7a43cf251097` |
| `NEXT_PUBLIC_APP_NAME` | `Ogemi AI` |

### 步骤 5：部署

1. **点击 "保存并部署"**
2. **等待构建完成**（通常需要 2-3 分钟）
3. **部署成功后**，您将获得网站链接

## 🔍 如果找不到 "创建项目" 按钮：

### 方法 1：直接访问创建页面
访问：https://dash.cloudflare.com/pages/new

### 方法 2：通过侧边栏
1. 在 Cloudflare Dashboard 左侧菜单中
2. 找到 **"Pages"** 选项
3. 点击进入 Pages 页面
4. 点击 **"创建项目"**

## ⚠️ 重要提醒：

1. **确保您已经登录 Cloudflare 账户**
2. **确保有 Pages 服务的访问权限**
3. **如果看不到 Pages 选项，可能需要升级账户**

## 🎯 部署完成后的结果：

- ✅ 网站将自动部署到 `https://ogemi-ai.pages.dev`
- ✅ 每次推送代码到 GitHub 都会自动重新部署
- ✅ 享受 Cloudflare 的全球 CDN 加速

## 🆘 如果遇到问题：

### 问题 1：看不到 Pages 选项
**解决方案**：确保您使用的是 Cloudflare 账户，不是 Cloudflare Workers 账户

### 问题 2：无法连接 GitHub
**解决方案**：
1. 检查 GitHub 账户权限
2. 确保仓库是公开的或您有访问权限
3. 重新授权 Cloudflare 访问 GitHub

### 问题 3：构建失败
**解决方案**：
1. 检查构建设置是否正确
2. 确保 Node.js 版本设置为 18
3. 查看构建日志中的错误信息

---

**现在开始创建 Cloudflare Pages 项目吧！** 🚀
