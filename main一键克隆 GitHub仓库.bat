@echo off
:: GitHub 克隆 + 可选自动运行  一键脚本（防闪退最终版）
chcp 65001 >nul
title GitHub 克隆一键通
color 0B

:: 0. 检测 Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] 未检测到 Git，请先安装 Git 并加入 PATH！
    pause & exit /b 1
)

:: 1. 输入仓库地址
set /p "url=GitHub 仓库地址（HTTPS 或 SSH）："
if "%url%"=="" (
    echo [ERROR] 地址不能为空！
    pause & exit /b 1
)

:: 2. 识别协议
echo %url% | findstr /i "https://" >nul && set "proto=https"
echo %url% | findstr /i "git@" >nul    && set "proto=ssh"
if not defined proto (
    echo [ERROR] 仅支持 HTTPS 或 SSH 地址！
    pause & exit /b 1
)

:: 3. 提取仓库名当文件夹名
for %%i in ("%url%") do set "name=%%~nxi"
if "%name:~-4%"==".git" set "name=%name:~0,-4%"

if exist "%name%" (
    echo [WARN] 文件夹 "%name%" 已存在，将直接打开并后续操作。
    cd /d "%name%"
    goto :afterClone
)

:: 4. 克隆（带进度 & 停住看结果）
echo.
echo 正在克隆仓库（%proto%）...
git clone --progress "%url%" "%name%"
echo ===== 克隆结束，状态码：%errorlevel% =====
if %errorlevel% neq 0 (
    echo [ERROR] 克隆失败！请检查地址、网络或 SSH 密钥。
    pause & exit /b 1)
cd /d "%name%"

:afterClone
:: 5. 可选 npm 一条龙
if exist package.json (
    choice /C YN /N /M "检测到 package.json，是否自动 npm install + npm run dev？"
    if %errorlevel%==1 (
        echo 正在安装依赖...
        call npm install
        if %errorlevel% equ 0 (
            start cmd /k "title npm run dev & npm run dev"
        ) else (
            echo [WARN] npm install 失败，请手动处理。)
    )
)

:: 6. 打开项目目录 & 停住窗口
echo.
echo 完成！正在打开项目目录...
start .
echo （按任意键关闭本窗口）
pause & exit /b