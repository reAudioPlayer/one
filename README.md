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
  - [CEV](https://cev.eu/) (via [cevlib](https://github.com/dxstiny/cevlib))

Note: reAudioPlayer One shows only publicly available data, nicely formatted and integrated into its own app.

The owner makes every effort to ensure that the content provided on this website does not infringe any applicable legislation or the rights of third parties. However, it is not always possible to achieve such a result.
In such cases, users are requested, without prejudice to their legal rights, to submit complaints preferably by creating an issue.

## Installation
This project is available from Docker, but you can [also run reAudioPlayer One locally](docs/running-locally.md).

The fastest way to get started is to use the docker image.

```sh
mkdir reAudioPlayer-One
cd reAudioPlayer-One

# Download the docker-compose.yml file
curl https://raw.githubusercontent.com/reAudioPlayer/one/master/docker-compose.yml -o docker-compose.yml

# Start the container
docker-compose up -d
```

## Bugs / Requests

Just open an issue or even better - fix it and open a pull request

## Contribute

Feel free to contribute by either directly opening up pull requests or creating issues

## License

reAudioPlayer-Apollo/online is licensed under the [Mozilla Public License 2.0](https://github.com/reAudioPlayer-Apollo/online/blob/master/LICENSE)

