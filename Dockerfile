FROM python:3.10-alpine

RUN apk add --no-cache ffmpeg nginx git && \
    mkdir /opt/reAudioPlayer && \
    apk del --no-cache --purge && \
    rm -rf /var/cache/apk/*

COPY build/nginx.conf /etc/nginx/http.d/default.conf
COPY src /opt/reAudioPlayer

WORKDIR /opt/reAudioPlayer/server

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 80

VOLUME /opt/reAudioPlayer/usr/
VOLUME /opt/reAudioPlayer/server/_cache/

ENTRYPOINT [ "python", "main.py", "--with-docker" ]
