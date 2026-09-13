@echo off
cd /d "%~dp0"
set LOG=%~dp0log-diagnostico.txt

(
echo === Consultando o GitHub ===
git fetch origin
echo.
echo === Ultimos commits que estao na main do GitHub ===
git log origin/main --oneline -8
echo.
echo === Pastas e arquivos na raiz da main do GitHub ===
git ls-tree origin/main --name-only
echo.
echo === Arquivos do projeto LH Consultoria ja publicados na main ===
git ls-tree -r origin/main --name-only lh-consultoria
echo.
echo === Branches de revisao existentes ===
git branch -r
echo.
echo === FIM ===
) > "%LOG%" 2>&1

notepad "%LOG%"
echo.
echo Pronto. Volte para a conversa com a Claude que ela le esse resultado sozinha.
pause
