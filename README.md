<!-- omit in toc -->
# reAudioPlayer One
<!-- omit in toc -->
### *The open source audio player with the most extensive catalogue*
<br>

reAudioPlayer One lets you curate playlists and stream any track from various platforms, including Spotify, YouTube and SoundCloud.
<br>
Seamless built-in Spotify integration lets you easily migrate your playlists to your new audio player, without leaving the app.
<br>
Use the integrated release radar to track the releases of your favourite artists.
<br>
With complete privacy and no need for a network connection, the extremely customisable reAudioPlayer One is yours to use at any time.

## Installation
This project is available from Docker, but you can also [run reAudioPlayer One locally](docs/running-locally.md).

The quickest way to get started is to use the docker image.

```sh
mkdir reAudioPlayer-One
cd reAudioPlayer-One

# Download the docker-compose.yml file
curl https://raw.githubusercontent.com/reAudioPlayer/one/master/docker-compose.yml -o docker-compose.yml

# Start the container
docker-compose up -d
```

## Table of Contents
- [Installation](#installation)
- [Table of Contents](#table-of-contents)
- [Supported Sources](#supported-sources)
- [Legal](#legal)
  - [Web Scraping](#web-scraping)
- [Bugs / Requests](#bugs--requests)
- [Contribute](#contribute)
- [Notes](#notes)
- [Licence](#licence)

## Supported Sources
ordered by loading times:
- [Soundcloud](https://soundcloud.com/) (Fastest)
- [Audius](https://audius.co/)
- [Youtube Music](https://music.youtube.com/)

## Legal
### Web Scraping
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

Note: reAudioPlayer One shows only publicly available data, nicely formatted and integrated into one app.

We make every effort to ensure that the content provided on this application does not infringe any applicable laws or the rights of third parties.
However, if you feel that this application infringes your rights, please let us know, preferably by creating a problem, without prejudice to your legal rights. Alternatively, you can email the owner at dxstiny.gh@gmail.com.

## Bugs / Requests
Just open a new issue. Or better yet, fix it and open a pull request.

## Contribute
Contribution is highly appreciated.

## Notes
- Songs are not streamed directly from spotify, but linked automatically to the best song match on youtube music and streamed from there.
- "Streaming" refers to caching the song locally via [YT-DLP](https://github.com/yt-dlp/yt-dlp) and playing it from there.
- A spotify account is required to access full functionality.<br>
  If you don't have a spotify account and don't want to create one or don't want to use your account, you can still use the audio player in a restricted mode. <br>
  In restricted mode, you cannot use any spotify functionality, e.g. release radar, playlist import or add spotify songs to your playlists. Using a spotify account is thus highly recommended. You will be asked to provide a client id and client secret during setup. If you want to enter restricted mode, leave client id and client secret empty and hit "enter restricted mode".

## Licence
reAudioPlayer One is licenced under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/).
