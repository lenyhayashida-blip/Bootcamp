@echo off
setlocal
cd /d "%~dp0"

REM O log deste script e gravado FORA da pasta do projeto, e so copiado
REM para ca no final. Assim ele nunca interfere nas operacoes do git.
set LOG=%TEMP%\lh-sincronizacao.log

(
echo === 1. Buscando o estado atual do GitHub ===
git fetch origin
echo.
echo === 2. Deixando a copia local identica a do GitHub ===
git checkout -f main
git reset --hard origin/main
echo.
echo === 3. Tirando os arquivos de log do controle de versao ===
git rm --cached log-diagnostico.txt
git rm --cached log-fase2.txt
git rm --cached log-envio.txt
git rm --cached log-revisao.txt
git rm --cached log-sincronizacao.txt
echo.
echo === 4. Estado final ===
git status --short
echo.
git log --oneline -5
echo.
echo === FIM ===
) > "%LOG%" 2>&1

copy /y "%LOG%" "%~dp0log-sincronizacao.txt" >nul 2>&1
notepad "%~dp0log-sincronizacao.txt"
echo.
echo Sincronizacao concluida. Volte para a conversa com a Claude.
pause
