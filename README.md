# reAudioPlayer One

The completely free and open source audio player with the perhaps most extensive catalogue.
reAudioPlayer One allows streaming and playlist curation of multiple streaming services, such as spotify, youtube, audius and soundcloud.
You can also transfer existing spotify (soundcloud and youtube playlists import coming soon) playlists to reAudioPlayer One.

Note: Songs are not streamed directly from spotify, but linked automatically to the best song match on youtube music and streamed from there.

Note 2: "Streaming" refers to caching the song locally via [YT-DLP](https://github.com/yt-dlp/yt-dlp) and playing it from there.

Note 3: A spotify account is required to access full functionality.
If you don't have a spotify account and don't want to create one or don't want to use your account, you can still use the audio player in a restricted mode. In restricted mode, you cannot use any spotify functionality, e.g. release radar, playlist import or add spotify songs to your playlists. Using a spotify account is thus highly recommended. You will be asked to provide a client id and client secret during setup. If you want to enter restricted mode, you must leave client id and client secret empty and hit "enter restricted mode".

## Table of Contents
- [reAudioPlayer One](#reaudioplayer-one)
  - [Table of Contents](#table-of-contents)
  - [Supported sources](#supported-sources)
  - [Web Scraping](#web-scraping)
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

## Web Scraping

Following sites are being scraped directly in the app. Sources are always disclosed.

- News (Article Readers)
  - [YourEDM](https://youredm.com/)
  - [The Guardian](https://theguardian.com/)
  - [The Independent](https://independent.co.uk/)
  - [BBC](https://bbc.com/)
  - [CNN](https://cnn.com/)
- Sports (Live Scoring)
  - [OneFootball](https://onefootball.com/en)
  - [CEV](https://cev.eu/)

If your website is listed here and you do not want it to be scraped, simply open an issue and it will be removed as soon as possible.
Note: reAudioPlayer One shows only publicly available data, nicely formatted and integrated into its own app.

Or as CEV put it:

The owner makes every effort to ensure that the content provided on this website does not infringe any applicable legislation or the rights of third parties. However, it is not always possible to achieve such a result.
In such cases, users are requested, without prejudice to their legal rights, to submit complaints preferably by creating an issue.

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
pip3 install git+https://github.com/3jackdaws/soundcloud-lib.git
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

