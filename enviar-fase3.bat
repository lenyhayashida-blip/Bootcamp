@echo off
setlocal
cd /d "%~dp0"

set LOG=%~dp0log-fase3.txt

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set TS=%%i
set BRANCH=feature/lh-consultoria-fase3-%TS%

(
echo === 1. Conferindo se a main local esta em dia ===
git fetch origin
git merge --ff-only origin/main
echo.
echo === 2. Criando a branch de revisao ===
echo Branch: %BRANCH%
git checkout -b %BRANCH%
echo.
echo === 3. O que vai no commit ===
git add -A
git status --short
echo.
echo === 4. Commit ===
git commit -m "Fase 3 - landing page completa: Hero, Storytelling, Servicos, Vitrine e CTA" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01WCeUixBZ9BawhUzMDzfR4H"
echo.
echo === 5. Enviando para o GitHub ===
git push -u origin %BRANCH%
echo.
echo === 6. Historico ===
git log --oneline -4
echo.
echo === FIM ===
) > "%LOG%" 2>&1

set PRURL=
for /f "tokens=2" %%u in ('findstr /R "https://github.com/.*/pull/new/" "%LOG%"') do set PRURL=%%u

if defined PRURL (
  echo Abrindo o Pull Request da Fase 3 no navegador...
  start "" "%PRURL%"
) else (
  echo Nao encontrei o link do Pull Request. Veja o log que vai abrir agora.
)

notepad "%LOG%"
echo.
echo Revise e clique em "Merge pull request" quando aprovar.
pause
