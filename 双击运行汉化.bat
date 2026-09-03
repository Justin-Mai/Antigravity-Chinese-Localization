@echo off
chcp 936 >nul
title Antigravity 2.0 汉化管理服务
echo =======================================================
echo  Antigravity 2.0 汉化管理面板
echo =======================================================
echo.
echo 正在启动本地管理服务...
echo 正在默认浏览器中打开控制台...
echo.

start "" "http://localhost:3388"

node "%~dp0localize.js"

if %errorlevel% neq 0 (
  echo.
  echo [错误] 启动汉化服务失败。
  echo 请确认系统已安装 Node.js (https://nodejs.org)
  echo.
  pause
)
