@echo off

set VERSION=0.9.1

set command=%1
set arg=%2

echo %arg%

if /i "%command%" == "lint" goto lint
if /i "%command%" == "i" goto install
if /i "%command%" == "install" goto install
if /i "%command%" == "run" goto run
if /i "%command%" == "start" goto run
if /i "%command%" == "build" goto build
if /i "%command%" == "" goto run

echo unrecognised command '%command%'
echo.
echo pass "install" or "i" to install required dependencies
echo pass no argument to run the program
goto end

:lint
cd src/server
python -m mypy
python -m pylint main.py ./dataModel ./db ./downloader ./handler ./helper ./meta ./player ./config
exit

:build
docker build -t ghcr.io/reaudioplayer/reap-one:%VERSION% .
exit

:install
pip3 install -r requirements.txt
exit

:run
if /i "%arg%" == "dev-ui" (
    start "" http://localhost:5173
) else (
    start "" http://localhost:1234
)
echo run
cd src/server
python3 ./main.py
exit

:end
pause > nul
