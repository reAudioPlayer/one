# Running reAudioPlayer One locally

While it is recommended to use the docker container, you can also run reAudioPlayer One locally.

## Installation

Make sure you have [Python 3](https://www.python.org/downloads/) installed on your computer.
You'll also need [ffmpeg](https://ffmpeg.org/download.html).

### Clone or download this project from github
```sh
git clone https://github.com/reAudioPlayer-Apollo/online.git
```

### Navigate to the downloaded repository and run the setup

#### Windows

Run `setup.bat`

#### Linux

Run the equivalent in any terminal
```sh
pip3 install -r ./src/server/requirements.txt
```

## Launch

#### Windows

Run `one.bat`

#### Linux

Run the equivalent in any terminal
```sh
cd ./src/server
python3 ./main.py
```
