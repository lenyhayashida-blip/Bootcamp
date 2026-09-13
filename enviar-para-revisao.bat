@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

REM O log agora se chama log-diagnostico.txt e esta no .gitignore,
REM para nunca mais interferir na troca de branches do proprio script.
set LOG=%~dp0log-diagnostico.txt

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set TS=%%i
set BRANCH=feature/lh-consultoria-fase1-%TS%

(
echo === 1. Branch atual ===
git branch --show-current
echo.
echo === 2. Descartando alteracoes locais nos logs antigos ===
git checkout -- log-revisao.txt
git checkout -- log-envio.txt
echo.
echo === 3. Voltando para a main ===
git checkout main
git pull origin main
echo.
echo === 4. Removendo os logs antigos do controle de versao ===
git rm --cached log-revisao.txt
git rm --cached log-envio.txt
echo.
echo === 5. O que o git esta enxergando agora ===
git status --short
echo.
echo === 6. Criando a branch de revisao: %BRANCH% ===
git checkout -b %BRANCH%
echo.
echo === 7. Commit ===
git add -A
git commit -m "Fase 1 - estrutura de pastas e design system (LH Consultoria)" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01WCeUixBZ9BawhUzMDzfR4H"
echo.
echo === 8. Enviando para o GitHub ===
git push -u origin %BRANCH%
echo.
echo === 9. Voltando para a main ===
git checkout main
echo.
echo === 10. Ultimos commits ===
git log --oneline -5
echo.
echo === FIM ===
) > "%LOG%" 2>&1

set PRURL=
<<<<<<< HEAD
REM A linha do git vem como:  remote:      https://github.com/.../pull/new/...
REM entao a URL e o SEGUNDO token, nao o primeiro.
for /f "tokens=2" %%u in ('findstr /R "https://github.com/.*/pull/new/" "%LOG%"') do set PRURL=%%u
=======
for /f "tokens=1" %%u in ('findstr /R "https://github.com/.*/pull/new/" "%LOG%"') do set PRURL=%%u
>>>>>>> e0e933cb827a5acfb7fb178a0185862d4d2a5c29

if defined PRURL (
  echo Abrindo o Pull Request no navegador...
  start "" "%PRURL%"
) else (
  echo Nao encontrei o link do Pull Request. Veja o log que vai abrir agora.
)

notepad "%LOG%"
echo.
echo Revise as mudancas no Pull Request e clique em "Merge pull request" quando aprovar.
pause
