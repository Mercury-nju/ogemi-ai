# 🚀 简单部署指南

## 现在您需要做的：

### 1. 创建 GitHub 仓库
1. 访问：https://github.com
2. 点击右上角的 "+" → "New repository"
3. 仓库名称：`ogemi-ai`
4. 描述：`AI智能体对话应用`
5. 选择 Public 或 Private
6. **不要勾选** "Add a README file"
7. 点击 "Create repository"

### 2. 复制仓库URL
创建完成后，复制仓库的HTTPS URL，类似：
`https://github.com/YOUR_USERNAME/ogemi-ai.git`

### 3. 告诉我仓库URL
将仓库URL告诉我，我会帮您完成推送和部署配置。

---

## 或者您可以直接运行这些命令：

```bash
# 替换 YOUR_USERNAME 为您的GitHub用户名
git remote add origin https://github.com/YOUR_USERNAME/ogemi-ai.git
git branch -M main
git push -u origin main
```

## 然后配置 Cloudflare Pages：

1. 访问：https://dash.cloudflare.com
2. Pages → Create a project → Connect to Git
3. 选择您的 ogemi-ai 仓库
4. 构建设置：
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: `18`
5. 环境变量：
   - `OPENAI_API_KEY`: `sk-9bf19547ddbd4be1a87a7a43cf251097`
   - `NEXT_PUBLIC_APP_NAME`: `Ogemi AI`

---

**准备好了吗？请告诉我您的GitHub仓库URL！** 🎯
