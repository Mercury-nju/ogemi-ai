# 🚀 GitHub + Cloudflare Pages 自动部署指南

## 📋 部署步骤

### 步骤 1：创建 GitHub 仓库

1. **访问 GitHub**
   - 打开 https://github.com
   - 登录您的账户

2. **创建新仓库**
   - 点击右上角的 "+" 号
   - 选择 "New repository"
   - 仓库名称：`ogemi-ai`
   - 描述：`AI智能体对话应用 - Ogemi AI Chatbot`
   - 选择 "Public" 或 "Private"
   - **不要**勾选 "Add a README file"（我们已经有了）
   - 点击 "Create repository"

### 步骤 2：推送代码到 GitHub

在项目目录中运行以下命令：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/ogemi-ai.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

### 步骤 3：配置 Cloudflare Pages 自动部署

1. **登录 Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com
   - 进入 "Pages" 部分

2. **连接 GitHub 仓库**
   - 点击 "创建项目" 或 "Create a project"
   - 选择 "连接到 Git" 或 "Connect to Git"
   - 选择 "GitHub" 作为Git提供商
   - 授权 Cloudflare 访问您的GitHub账户

3. **选择仓库**
   - 选择 `ogemi-ai` 仓库
   - 点击 "开始设置" 或 "Begin setup"

4. **配置构建设置**
   - **项目名称**：`ogemi-ai`
   - **生产分支**：`main`
   - **构建设置**：
     - **构建命令**：`npm run build`
     - **构建输出目录**：`out`
     - **Node.js 版本**：`18`

5. **环境变量设置**
   - 在 "环境变量" 部分添加：
     - `OPENAI_API_KEY` = `sk-9bf19547ddbd4be1a87a7a43cf251097`
     - `NEXT_PUBLIC_APP_NAME` = `Ogemi AI`

6. **部署**
   - 点击 "保存并部署"
   - 等待首次部署完成

### 步骤 4：自动部署配置

部署完成后，每次您推送代码到 `main` 分支时，Cloudflare Pages 将自动：
- 检测到代码更改
- 自动构建项目
- 部署到生产环境
- 更新您的网站

## 🔧 项目配置说明

### 构建配置
- **框架预设**：Next.js (Static Export)
- **构建命令**：`npm run build`
- **输出目录**：`out`
- **Node.js 版本**：18.x

### 环境变量
```env
OPENAI_API_KEY=sk-9bf19547ddbd4be1a87a7a43cf251097
NEXT_PUBLIC_APP_NAME=Ogemi AI
```

### 自动部署触发条件
- 推送到 `main` 分支
- 创建 Pull Request
- 手动触发部署

## 📁 项目结构

```
ogemi-ai/
├── app/                    # Next.js 应用
├── components/             # React 组件
├── out/                   # 构建输出（自动生成）
├── package.json           # 项目配置
├── next.config.js         # Next.js 配置
├── tailwind.config.js     # Tailwind 配置
└── README.md              # 项目说明
```

## 🎯 部署后的优势

1. **自动部署**：代码推送后自动构建和部署
2. **版本控制**：完整的Git历史记录
3. **回滚功能**：可以轻松回滚到之前的版本
4. **分支部署**：支持预览分支部署
5. **全球CDN**：Cloudflare的全球加速网络
6. **HTTPS**：自动SSL证书
7. **自定义域名**：支持绑定自定义域名

## 🔄 工作流程

1. **开发**：在本地开发新功能
2. **提交**：`git add . && git commit -m "新功能"`
3. **推送**：`git push origin main`
4. **自动部署**：Cloudflare Pages 自动检测并部署
5. **访问**：几分钟后新功能即可访问

## 🆘 故障排除

### 常见问题

1. **构建失败**
   - 检查 `package.json` 中的依赖
   - 确保 Node.js 版本为 18.x
   - 查看构建日志中的错误信息

2. **环境变量问题**
   - 确保在 Cloudflare Pages 中正确设置环境变量
   - 检查变量名称和值的正确性

3. **部署不更新**
   - 检查是否推送到正确的分支（main）
   - 查看 Cloudflare Pages 的部署日志

### 有用的命令

```bash
# 查看远程仓库
git remote -v

# 查看分支
git branch -a

# 查看提交历史
git log --oneline

# 强制推送（谨慎使用）
git push -f origin main
```

## 🎉 完成！

配置完成后，您的 Ogemi AI 应用将：
- ✅ 自动部署到 Cloudflare Pages
- ✅ 享受全球 CDN 加速
- ✅ 支持 HTTPS 安全连接
- ✅ 实现持续集成和部署

---

**现在开始创建 GitHub 仓库并配置自动部署吧！** 🚀
