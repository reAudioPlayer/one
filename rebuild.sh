docker compose down
docker rmi ghcr.io/reaudioplayer/reap-one:0.11.0
sudo bash -c 'echo "nameserver 1.1.1.1" > /etc/resolv.conf'
docker build -t ghcr.io/reaudioplayer/reap-one:0.11.0 .
docker compose up -d
