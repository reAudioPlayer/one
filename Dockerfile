FROM python:3.10.8

RUN apt-get update && apt-get install -y \
    ffmpeg nginx

RUN mkdir /opt/reAudioPlayer

COPY build/nginx.conf /etc/nginx/sites-available/default
COPY src /opt/reAudioPlayer

WORKDIR /opt/reAudioPlayer/server

RUN pip3 install -r requirements.txt

EXPOSE 80

VOLUME /opt/reAudioPlayer/usr/

ENTRYPOINT [ "bash", "entry.sh" ]
