@echo off

set VERSION=0.10.1

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
if /i "%command%" == "rebuild" goto rebuild
if /i "%command%" == "dev" goto dev
if /i "%command%" == "dev-build" goto devBuild
if /i "%command%" == "" goto deploy

echo unrecognised command '%command%'
echo.
echo commands:
echo lint - lint the code
echo i - install dependencies
echo run - run the server locally
echo deploy - deploy the docker image
echo stop - stop the docker image
echo.
echo dev commands:
echo build - build the docker image
echo push - push the docker image to github
echo remove - remove the docker image
echo status - show the status of the docker containers
echo rebuild - rebuild the docker image
goto end

:push
echo pushing to github
docker push ghcr.io/reaudioplayer/reap-one:%VERSION%
exit

:deploy
docker compose up -d
exit

:stop
docker compose down
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
cd src/server
python3 ./main.py
exit

:remove
docker compose down
docker rmi ghcr.io/reaudioplayer/reap-one:%VERSION%
exit

:rebuild
docker compose down
docker rmi ghcr.io/reaudioplayer/reap-one:%VERSION%
docker build -t ghcr.io/reaudioplayer/reap-one:%VERSION% .
docker compose up -d
exit

:status
docker ps
exit

:devBuild
docker compose -f docker-compose.dev.yml down
docker rmi ghcr.io/reaudioplayer/reap-one:dev
docker compose -f docker-compose.dev.yml up
exit

:dev
docker compose -f docker-compose.dev.yml up
exit

:end
pause > nul
