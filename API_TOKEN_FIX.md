# 🔧 Cloudflare API Token 权限修复指南

## 🚨 当前问题
API Token 出现 "Unable to authenticate request [code: 10001]" 错误，这表示权限配置不正确。

## 🛠️ 解决方案

### 方法1：创建新的API Token

1. **访问 Cloudflare API Tokens 页面**：
   https://dash.cloudflare.com/profile/api-tokens

2. **创建自定义Token**：
   - 点击 "Create Token"
   - 选择 "Custom token"

3. **配置权限**：
   ```
   Permissions:
   - Account: Cloudflare Pages:Edit
   - Zone: Zone:Read (如果需要)
   - Zone: Zone Settings:Read (如果需要)
   
   Account Resources:
   - Include: All accounts
   
   Zone Resources:
   - Include: All zones (如果需要)
   ```

4. **创建并复制新的Token**

### 方法2：使用全局API Key

1. **获取Global API Key**：
   - 访问：https://dash.cloudflare.com/profile/api-tokens
   - 点击 "Global API Key" 部分的 "View"
   - 输入密码获取Global API Key

2. **设置环境变量**：
   ```bash
   $env:CLOUDFLARE_EMAIL="your-email@example.com"
   $env:CLOUDFLARE_API_KEY="your-global-api-key"
   ```

### 方法3：通过Web界面手动创建

1. **访问 Cloudflare Pages**：
   https://dash.cloudflare.com/pages

2. **如果看到404错误**：
   - 访问：https://dash.cloudflare.com
   - 在左侧菜单中查找 "Pages" 或 "Workers & Pages"
   - 如果没有，可能需要升级账户

3. **手动创建项目**：
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 连接您的GitHub仓库

## 🔄 使用新Token

一旦您获得新的API Token，运行：

```bash
# 设置新的API Token
$env:CLOUDFLARE_API_TOKEN="your-new-token"

# 验证权限
wrangler whoami

# 创建Pages项目
wrangler pages project create ogemi-ai

# 部署项目
wrangler pages deploy out --project-name=ogemi-ai
```

## 🎯 推荐的API Token权限

```
Permissions:
- Account: Cloudflare Pages:Edit
- Account: Account Settings:Read
- Zone: Zone:Read (如果需要自定义域名)

Account Resources:
- Include: All accounts

Zone Resources:
- Include: All zones (如果需要自定义域名)
```

## 🆘 如果仍然有问题

### 检查账户类型
- 确保您使用的是Cloudflare账户，不是Cloudflare Workers账户
- 某些功能可能需要付费计划

### 联系支持
- Cloudflare支持：https://support.cloudflare.com
- 或者通过Web界面手动创建项目

---

**请创建新的API Token并告诉我，我会立即帮您完成部署！** 🚀
