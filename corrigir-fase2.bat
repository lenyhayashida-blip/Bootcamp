@echo off
setlocal
cd /d "%~dp0"

REM Log gravado fora da pasta do projeto e copiado so no final,
REM para nunca interferir nas operacoes do git.
set LOG=%TEMP%\lh-correcao.log
set ANTIGA=origin/feature/lh-consultoria-fase2-20260913-163055

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set TS=%%i
set BRANCH=feature/lh-consultoria-fase2-limpa-%TS%

(
echo === 1. Buscando o estado atual do GitHub ===
git fetch origin
echo.
echo === 2. Deixando a copia local identica a main do GitHub ===
git checkout -f main
git reset --hard origin/main
echo.
echo === 3. Criando branch nova a partir da main atualizada ===
echo Branch: %BRANCH%
git checkout -b %BRANCH%
echo.
echo === 4. Trazendo os arquivos da Fase 2 da branch anterior ===
git checkout %ANTIGA% -- lh-consultoria enviar-para-revisao.bat enviar-fase2.bat verificar.bat
echo.
echo === 5. Removendo a home antiga ===
if exist "lh-consultoria\app\page.tsx" del /q "lh-consultoria\app\page.tsx"
echo Concluido.
echo.
echo === 6. O que vai no commit ===
git add -A
git status --short
echo.
echo === 7. Commit ===
git commit -m "Fase 2 - layout raiz: Navbar, Footer e ThemeProvider" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01WCeUixBZ9BawhUzMDzfR4H"
echo.
echo === 8. Enviando para o GitHub ===
git push -u origin %BRANCH%
echo.
echo === 9. Historico ===
git log --oneline -5
echo.
echo === FIM ===
) > "%LOG%" 2>&1

copy /y "%LOG%" "%~dp0log-correcao.txt" >nul 2>&1

set PRURL=
for /f "tokens=2" %%u in ('findstr /R "https://github.com/.*/pull/new/" "%LOG%"') do set PRURL=%%u

if defined PRURL (
  echo Abrindo o novo Pull Request no navegador...
  start "" "%PRURL%"
) else (
  echo Nao encontrei o link do Pull Request. Veja o log que vai abrir agora.
)

notepad "%~dp0log-correcao.txt"
echo.
echo Pronto. Volte para a conversa com a Claude.
pause
