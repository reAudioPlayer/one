@echo off

set VERSION=0.9.6

set command=%1
set arg=%2

echo %arg%

if /i "%command%" == "lint" goto lint
if /i "%command%" == "i" goto install
if /i "%command%" == "install" goto install
if /i "%command%" == "run" goto run
if /i "%command%" == "start" goto run
if /i "%command%" == "build" goto build
if /i "%command%" == "deploy" goto deploy
if /i "%command%" == "push" goto push
if /i "%command%" == "remove" goto remove
if /i "%command%" == "status" goto status
if /i "%command%" == "" goto deploy

echo unrecognised command '%command%'
echo.
echo commands:
echo lint - lint the code
echo i - install dependencies
echo run - run the server
echo deploy - deploy the docker image
echo.
echo dev commands:
echo build - build the docker image
echo push - push the docker image to github
echo remove - remove the docker image
goto end

:push
echo pushing to github
docker push ghcr.io/reaudioplayer/reap-one:%VERSION%
exit

:deploy
docker compose up -d
exit

:lint
cd src/server
python -m mypy
python -m pylint main.py ./config ./dataModel ./db ./downloader ./handler ./helper ./meta ./player ./router
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

:remove
docker compose down
docker rmi ghcr.io/reaudioplayer/reap-one:%VERSION%
exit

:status
docker ps
exit

:end
pause > nul
