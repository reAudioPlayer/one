from sys import argv
from bs4 import BeautifulSoup
import re


url = argv[1]

import requests

html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")

def findLinksBy(html: str, contains: str) -> None:
    for match in re.finditer(r"\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@;?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])", html):
        if contains in match[0]:
            print("http:" + match[0].replace("amp;", ""))

findLinksBy(html, "umbraco")
findLinksBy(html, "json")
