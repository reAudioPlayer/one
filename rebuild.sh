docker compose down
docker rmi ghcr.io/reaudioplayer/reap-one:0.10.3
sudo bash -c 'echo "nameserver 1.1.1.1" > /etc/resolv.conf'
docker build -t ghcr.io/reaudioplayer/reap-one:0.10.3 .
docker compose up -d
