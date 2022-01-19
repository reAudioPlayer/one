@echo off

set command=%1
set arg=%2

echo %arg%

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

:install
pip3 install -r requirements.txt
exit

:run
if /i "%arg%" == "dev-ui" (
    start "" http://localhost:8080
) else (
    start "" http://localhost:1234
)
echo run
python3 ./main.py
exit

:end
pause > nul
