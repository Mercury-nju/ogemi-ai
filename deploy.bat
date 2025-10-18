@echo off
echo 正在部署 Ogemi AI 到 Cloudflare Pages...

echo.
echo 1. 构建项目...
call npm run build

echo.
echo 2. 检查构建输出...
if not exist "out" (
    echo 错误：构建输出目录 'out' 不存在
    pause
    exit /b 1
)

echo.
echo 3. 构建完成！现在您可以：
echo    - 将 'out' 文件夹上传到 Cloudflare Pages
echo    - 或者使用 Wrangler CLI 部署
echo.
echo 使用 Wrangler 部署命令：
echo wrangler pages deploy out --project-name="ogemi-ai"
echo.
echo 或者访问 Cloudflare Dashboard 手动上传 'out' 文件夹
echo.

pause
