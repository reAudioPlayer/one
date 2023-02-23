# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import subprocess
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("main")

logger.info("init...")

def run() -> None:
    """runs ./main.py"""
    subprocess.run(["python", "main.py", "--with-docker"],
                   stdout=subprocess.PIPE,
                   stderr=subprocess.PIPE,
                   check=True)


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
