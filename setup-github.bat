@echo off
echo 🚀 Ogemi AI - GitHub 自动部署设置助手
echo.
echo 这个脚本将帮助您设置 GitHub 仓库和自动部署
echo.

echo 📋 请按照以下步骤操作：
echo.
echo 1. 创建 GitHub 仓库：
echo    - 访问 https://github.com
echo    - 点击 "New repository"
echo    - 仓库名称：ogemi-ai
echo    - 描述：AI智能体对话应用
echo    - 选择 Public 或 Private
echo    - 不要勾选 "Add a README file"
echo    - 点击 "Create repository"
echo.

echo 2. 复制仓库URL（类似：https://github.com/YOUR_USERNAME/ogemi-ai.git）
echo.

set /p REPO_URL="请输入您的GitHub仓库URL: "

if "%REPO_URL%"=="" (
    echo 错误：请输入有效的仓库URL
    pause
    exit /b 1
)

echo.
echo 3. 正在配置Git远程仓库...

git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo 警告：远程仓库可能已存在，尝试更新...
    git remote set-url origin %REPO_URL%
)

echo.
echo 4. 正在推送代码到GitHub...

git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 代码已成功推送到GitHub！
    echo.
    echo 📋 下一步：
    echo    1. 访问 https://dash.cloudflare.com
    echo    2. 进入 Pages 部分
    echo    3. 选择 "连接到 Git"
    echo    4. 选择您的 ogemi-ai 仓库
    echo    5. 配置构建设置：
    echo       - 构建命令：npm run build
    echo       - 输出目录：out
    echo       - Node.js版本：18
    echo    6. 添加环境变量：
    echo       - OPENAI_API_KEY: sk-9bf19547ddbd4be1a87a7a43cf251097
    echo       - NEXT_PUBLIC_APP_NAME: Ogemi AI
    echo.
    echo 🌐 打开 Cloudflare Dashboard...
    start "" "https://dash.cloudflare.com"
) else (
    echo.
    echo ❌ 推送失败，请检查：
    echo    1. GitHub仓库URL是否正确
    echo    2. 是否有推送权限
    echo    3. 网络连接是否正常
    echo.
    echo 您可以手动运行以下命令：
    echo git remote add origin %REPO_URL%
    echo git branch -M main
    echo git push -u origin main
)

echo.
pause
