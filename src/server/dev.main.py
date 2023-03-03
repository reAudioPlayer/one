# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import subprocess
import logging
import sys

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("main")

logger.info("init...")

def run() -> None:
    """runs ./main.py"""
    process = subprocess.Popen(["python", "-u", "main.py", "--with-docker"],
                               shell = False,
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE)
    logger.info("process running")

    for c in iter(lambda: process.stdout.read(1), b""):
        sys.stdout.buffer.write(c)

    logger.info("process exited")

logger.info("restarting nginx...")

subprocess.run(["/etc/init.d/nginx", "restart"],
               stdout=subprocess.PIPE,
               stderr=subprocess.PIPE,
               check=True)

while True:
    try:
        logger.info("starting...")
        run()
    except Exception as exception:
        logger.exception(exception)
        logger.info("restarting...")
