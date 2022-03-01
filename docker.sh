echo 'Starting docker'

curl ipinfo.io
/bin/bash $(pwd)/docker-stop.sh &
docker run --rm -i alpine/bombardier -c 100 -d 15s -l https://www.cbr.ru/
echo 'Docker finished; Restarting...'

killall openvpn
