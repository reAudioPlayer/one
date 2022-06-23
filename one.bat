@echo off

set command=%1
set arg=%2

echo %arg%

if /i "%command%" == "lint" goto lint
if /i "%command%" == "i" goto install
if /i "%command%" == "install" goto install
if /i "%command%" == "run" goto run
if /i "%command%" == "start" goto run
if /i "%command%" == "" goto run

echo unrecognised command '%command%'
echo.
echo pass "install" or "i" to install required dependencies
echo pass no argument to run the program
goto end

:lint
python3 -m mypy
python3 -m pylint main.py ./dataModels ./downloader ./handler ./helpers ./meta ./player
exit

:install
pip3 install -r requirements.txt
pip3 install git+https://github.com/3jackdaws/soundcloud-lib.git
exit

:run
if /i "%arg%" == "dev-ui" (
    start "" http://localhost:3000
) else (
    start "" http://localhost:1234
)
echo run
python3 ./main.py
exit

:end
pause > nul
