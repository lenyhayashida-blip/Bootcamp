@echo off
setlocal
cd /d "%~dp0"

set LOG=%~dp0log-sincronizacao.txt

(
echo === 1. Buscando o estado atual do GitHub ===
git fetch origin --prune
echo.
echo === 2. Deixando a copia local identica a main do GitHub ===
git checkout -f main
git reset --hard origin/main
echo.
echo === 3. Ultimos commits da main ===
git log --oneline -6
echo.
echo === 4. Arquivos da Fase 2 que estao na main ===
git ls-tree -r origin/main --name-only lh-consultoria/app
git ls-tree -r origin/main --name-only lh-consultoria/components
echo.
echo === 5. Situacao da copia local ===
git status --short
echo.
echo === FIM ===
) > "%LOG%" 2>&1

notepad "%LOG%"
echo.
echo Pronto. Volte para a conversa com a Claude.
pause
