@echo off
:: 设置本地 Git 身份（仅当前仓库）
chcp 65001 >nul
title Git 本地身份设置
color 0B

if not exist .git (
    echo [ERROR] 当前目录不是 Git 仓库！
    pause & exit /b 1
)

echo ===== 当前本地配置 =====
git config user.name 2>nul || echo 用户名：未设置
git config user.email 2>nul || echo 邮箱：未设置
echo ========================

set /p "name=请输入用户名："
set /p "email=请输入邮箱："

if "%name%"=="" (
    echo [ERROR] 用户名不能为空！
    pause & exit /b 1
)
if "%email%"=="" (
    echo [ERROR] 邮箱不能为空！
    pause & exit /b 1
)

git config user.name "%name%"
git config user.email "%email%"

echo ===== 已更新为 =====
git config user.name
git config user.email
echo ========================
echo 设置完成！按任意键退出...
pause & exit /b