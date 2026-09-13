@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set TS=%%i
set BRANCH=feature/atualizacao-%TS%

(
echo === Criando branch de revisao: %BRANCH% ===
git checkout main
git pull origin main
git checkout -b %BRANCH%
echo.
echo === git add / commit ===
git add -A
git commit -m "Atualizacao do projeto (revisao pendente)"
echo.
echo === git push ===
git push -u origin %BRANCH%
echo.
echo === Voltando para main ===
git checkout main
echo.
echo === FIM ===
) > log-revisao.txt 2>&1

echo.
echo Procurando o link do Pull Request no log...
set PRURL=
for /f "tokens=1" %%u in ('findstr /R "https://github.com/.*/pull/new/" log-revisao.txt') do set PRURL=%%u

if defined PRURL (
  echo Link encontrado: %PRURL%
  echo Abrindo no navegador...
  start "" "%PRURL%"
) else (
  echo Nao consegui achar o link automaticamente.
  echo Abra o log-revisao.txt para ver o que aconteceu, ou acesse o GitHub manualmente.
)

notepad log-revisao.txt
echo.
echo Revise as mudancas no Pull Request que abriu no navegador.
echo Quando aprovar, clique em "Merge pull request" no GitHub — a Vercel publica sozinha depois disso.
pause
