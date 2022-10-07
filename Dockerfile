FROM python:latest

RUN apt-get update && apt-get install -y \
    ffmpeg

RUN mkdir /opt/reAudioPlayer

COPY . /opt/reAudioPlayer

WORKDIR /opt/reAudioPlayer

RUN pip3 install -r requirements.txt

EXPOSE 1234

ENV TEST_MODE=true

ENTRYPOINT [ "python3", "main.py" ]
