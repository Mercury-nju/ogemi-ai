# 🚀 Ogemi AI - 快速部署指南

## 📦 部署文件已准备就绪

我已经为您准备了以下部署文件：
- ✅ `out/` 文件夹 - 包含所有静态文件
- ✅ `ogemi-ai-deploy.zip` - 压缩包，可直接上传

## 🌐 方法一：通过 Cloudflare Dashboard 部署（推荐）

### 步骤 1：登录 Cloudflare
1. 打开浏览器，访问：https://dash.cloudflare.com
2. 使用您的 Cloudflare 账户登录

### 步骤 2：创建 Pages 项目
1. 在左侧菜单中点击 **"Pages"**
2. 点击 **"创建项目"** 或 **"Create a project"**
3. 选择 **"上传资产"** 或 **"Upload assets"**

### 步骤 3：配置项目
- **项目名称**：`Ogemi AI`
- **上传文件**：选择 `ogemi-ai-deploy.zip` 文件
- **构建输出目录**：留空（已包含在压缩包中）

### 步骤 4：部署
1. 点击 **"保存并部署"**
2. 等待部署完成（通常需要 1-2 分钟）
3. 部署完成后，您会得到一个类似 `https://ogemi-ai.pages.dev` 的URL

## 🔧 方法二：手动上传文件夹

如果您不想使用压缩包，也可以：

1. 在 Cloudflare Pages 中选择 **"上传资产"**
2. 将整个 `out` 文件夹拖拽到上传区域
3. 点击部署

## ⚙️ 环境变量配置（可选）

如果需要配置环境变量：
1. 在项目设置中找到 **"环境变量"**
2. 添加以下变量：
   - `OPENAI_API_KEY`: `sk-9bf19547ddbd4be1a87a7a43cf251097`
   - `NEXT_PUBLIC_APP_NAME`: `Ogemi AI`

## 🎯 部署后的操作

1. **测试应用**：访问部署后的URL，测试AI对话功能
2. **自定义域名**：在项目设置中可以添加自定义域名
3. **监控使用**：在 Cloudflare Dashboard 中查看访问统计

## 🆘 如果遇到问题

### 常见问题解决：
1. **上传失败**：检查文件大小，确保网络连接稳定
2. **页面无法访问**：等待几分钟让CDN缓存更新
3. **AI功能不工作**：检查浏览器控制台是否有错误信息

### 技术支持：
- Cloudflare 文档：https://developers.cloudflare.com/pages/
- 项目文件位置：`C:\Users\ZhuanZ\Desktop\Ogemi AI\`

## 🎉 部署完成！

部署成功后，您的 Ogemi AI 智能体将：
- ✅ 在全球范围内快速访问
- ✅ 享受 Cloudflare 的 CDN 加速
- ✅ 支持 HTTPS 安全连接
- ✅ 自动扩展和负载均衡

---

**准备好部署了吗？按照上述步骤操作即可！** 🚀
