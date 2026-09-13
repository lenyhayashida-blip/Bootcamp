@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

set LOG=%~dp0log-fase2.txt

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set TS=%%i
set BRANCH=feature/lh-consultoria-fase2-%TS%

REM A home antiga precisa sair, porque agora ela vive na pasta do grupo marketing.
REM Feito aqui fora do bloco de log para nao confundir o interpretador do Windows.
set REMOVIDO=nao encontrada
if exist "lh-consultoria\app\page.tsx" (
  del /q "lh-consultoria\app\page.tsx"
  set REMOVIDO=removida
)

(
echo === 1. Home antiga: !REMOVIDO! ===
echo.
echo === 2. Atualizando a main local ===
git checkout main
git pull origin main
echo.
echo === 3. Criando a branch de revisao: %BRANCH% ===
git checkout -b %BRANCH%
echo.
echo === 4. O que mudou ===
git add -A
git status --short
echo.
echo === 5. Commit ===
git commit -m "Fase 2 - layout raiz: Navbar, Footer e ThemeProvider" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01WCeUixBZ9BawhUzMDzfR4H"
echo.
echo === 6. Enviando para o GitHub ===
git push -u origin %BRANCH%
echo.
echo === 7. Voltando para a main ===
git checkout main
echo.
echo === FIM ===
) > "%LOG%" 2>&1

set PRURL=
for /f "tokens=2" %%u in ('findstr /R "https://github.com/.*/pull/new/" "%LOG%"') do set PRURL=%%u

if defined PRURL (
  echo Abrindo o Pull Request da Fase 2 no navegador...
  start "" "!PRURL!"
) else (
  echo Nao encontrei o link do Pull Request. Veja o log que vai abrir agora.
)

notepad "%LOG%"
echo.
echo Revise e clique em "Merge pull request" quando aprovar.
pause
