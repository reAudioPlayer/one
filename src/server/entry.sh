#!/bin/bash
/etc/init.d/nginx restart
python3 main.py --with-docker --no-local-playback
