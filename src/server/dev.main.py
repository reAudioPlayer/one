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
    with subprocess.Popen(["python", "-u", "main.py", "--with-docker"],
                            shell = False,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            bufsize=0) as process:
        logger.info("process running")

        while True:
            stdout = process.stdout
            if stdout is None:
                break
            line = stdout.readline()
            if not line:
                break
            print(line.decode("utf-8").strip())
            sys.stdout.flush()
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
    except Exception as exception: # pylint: disable=broad-except
        logger.exception(exception)
        logger.info("restarting...")
