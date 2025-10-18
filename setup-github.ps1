Write-Host "🚀 Ogemi AI - GitHub 自动部署设置助手" -ForegroundColor Green
Write-Host ""
Write-Host "这个脚本将帮助您设置 GitHub 仓库和自动部署" -ForegroundColor Yellow
Write-Host ""

Write-Host "📋 请按照以下步骤操作：" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 创建 GitHub 仓库：" -ForegroundColor White
Write-Host "   - 访问 https://github.com" -ForegroundColor Gray
Write-Host "   - 点击 'New repository'" -ForegroundColor Gray
Write-Host "   - 仓库名称：ogemi-ai" -ForegroundColor Gray
Write-Host "   - 描述：AI智能体对话应用" -ForegroundColor Gray
Write-Host "   - 选择 Public 或 Private" -ForegroundColor Gray
Write-Host "   - 不要勾选 'Add a README file'" -ForegroundColor Gray
Write-Host "   - 点击 'Create repository'" -ForegroundColor Gray
Write-Host ""

Write-Host "2. 复制仓库URL（类似：https://github.com/YOUR_USERNAME/ogemi-ai.git）" -ForegroundColor White
Write-Host ""

$repoUrl = Read-Host "请输入您的GitHub仓库URL"

if ([string]::IsNullOrEmpty($repoUrl)) {
    Write-Host "错误：请输入有效的仓库URL" -ForegroundColor Red
    Read-Host "按任意键退出"
    exit 1
}

Write-Host ""
Write-Host "3. 正在配置Git远程仓库..." -ForegroundColor Yellow

try {
    git remote add origin $repoUrl
    if ($LASTEXITCODE -ne 0) {
        Write-Host "警告：远程仓库可能已存在，尝试更新..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
    }
} catch {
    Write-Host "配置远程仓库时出错" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. 正在推送代码到GitHub..." -ForegroundColor Yellow

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 代码已成功推送到GitHub！" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 下一步：" -ForegroundColor Cyan
    Write-Host "   1. 访问 https://dash.cloudflare.com" -ForegroundColor White
    Write-Host "   2. 进入 Pages 部分" -ForegroundColor White
    Write-Host "   3. 选择 '连接到 Git'" -ForegroundColor White
    Write-Host "   4. 选择您的 ogemi-ai 仓库" -ForegroundColor White
    Write-Host "   5. 配置构建设置：" -ForegroundColor White
    Write-Host "      - 构建命令：npm run build" -ForegroundColor Gray
    Write-Host "      - 输出目录：out" -ForegroundColor Gray
    Write-Host "      - Node.js版本：18" -ForegroundColor Gray
    Write-Host "   6. 添加环境变量：" -ForegroundColor White
    Write-Host "      - OPENAI_API_KEY: sk-9bf19547ddbd4be1a87a7a43cf251097" -ForegroundColor Gray
    Write-Host "      - NEXT_PUBLIC_APP_NAME: Ogemi AI" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🌐 打开 Cloudflare Dashboard..." -ForegroundColor Green
    Start-Process "https://dash.cloudflare.com"
} else {
    Write-Host ""
    Write-Host "❌ 推送失败，请检查：" -ForegroundColor Red
    Write-Host "   1. GitHub仓库URL是否正确" -ForegroundColor White
    Write-Host "   2. 是否有推送权限" -ForegroundColor White
    Write-Host "   3. 网络连接是否正常" -ForegroundColor White
    Write-Host ""
    Write-Host "您可以手动运行以下命令：" -ForegroundColor Yellow
    Write-Host "git remote add origin $repoUrl" -ForegroundColor Gray
    Write-Host "git branch -M main" -ForegroundColor Gray
    Write-Host "git push -u origin main" -ForegroundColor Gray
}

Write-Host ""
Read-Host "按任意键退出"
