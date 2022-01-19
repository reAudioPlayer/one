# reAudioPlayer One

The completely free and open source audio player with the perhaps most extensive catalogue.
reAudioPlayer One allows streaming and playlist curation of multiple streaming services, such as spotify, youtube, audius and soundcloud.
You can also transfer existing spotify (soundcloud and youtube playlists import coming soon) playlists to reAudioPlayer One.

Note: Songs are not streamed directly from spotify, but linked automatically to the best song match on youtube music and streamed from there.

Note also: "Streaming" refers to caching the song locally via [YT-DLP](https://github.com/yt-dlp/yt-dlp) and playing it from there.

## Table of Contents
- [reAudioPlayer One](#reaudioplayer-one)
  - [Table of Contents](#table-of-contents)
  - [Supported sources](#supported-sources)
  - [Installation](#installation)
    - [Clone or download this project from github](#clone-or-download-this-project-from-github)
    - [Navigate to the downloaded repository and run the setup](#navigate-to-the-downloaded-repository-and-run-the-setup)
      - [Windows](#windows)
      - [Linux](#linux)
  - [Launch](#launch)
      - [Windows](#windows-1)
      - [Linux](#linux-1)
  - [Bugs / Requests](#bugs--requests)
  - [Contribute](#contribute)
  - [License](#license)

## Supported sources
ordered by loading times:
- [Soundcloud](https://soundcloud.com/) (Fastest)
- [Audius](https://audius.co/)
- [Youtube Music](https://music.youtube.com/)

## Installation

Make sure you have [Python 3](https://www.python.org/downloads/) installed on your computer.

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
pip3 install -r ./requirements.txt
```

## Launch

#### Windows

Run `one.bat`

#### Linux

Run the equivalent in any terminal
```sh
python3 ./main.py
```

## Bugs / Requests

Just open an issue or even better - fix it and open a pull request

## Contribute

Feel free to contribute by either directly opening up pull requests or creating issues

## License

reAudioPlayer-Apollo/online is licensed under the [Mozilla Public License 2.0](https://github.com/reAudioPlayer-Apollo/online/blob/master/LICENSE)

