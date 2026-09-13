@echo off
cd /d "%~dp0"
git add -A
git commit -m "Atualizacao"
git push
echo.
echo Atualizacoes enviadas para o GitHub.
pause
