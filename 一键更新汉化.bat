@echo off
chcp 936 >nul
title Antigravity 2.0 一键最新汉化部署
echo =======================================================
echo    Antigravity 2.0 一键最新汉化部署工具
echo =======================================================
echo.
echo 正在自动关闭运行中的 Antigravity 实例...
taskkill /F /IM Antigravity.exe >nul 2>&1
timeout /t 1 >nul

echo 正在部署预编译的全新汉化包...
copy /y "%~dp0app.asar.ready" "%LOCALAPPDATA%\Programs\antigravity\resources\app.asar" >nul

if %errorlevel% equ 0 (
  echo.
  echo =======================================================
  echo  [成功] 汉化更新已成功部署！
  echo  现在您可以正常启动 Antigravity 2.0 了。
  echo =======================================================
) else (
  echo.
  echo [失败] 复制汉化包失败，请确认是否以管理员权限运行或 Antigravity 已完全退出。
)
echo.
pause
