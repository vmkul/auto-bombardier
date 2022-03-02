echo 'Starting docker'

curl ipinfo.io
/bin/bash $(pwd)/docker-stop.sh &
docker run --rm -i alpine/bombardier -c 100 -d 300s -l 195.93.247.48
echo 'Docker finished; Restarting...'

killall openvpn

