from typing import List, Optional
from bs4 import BeautifulSoup
from bs4.element import Tag
import re

from cevlib.types.iType import IType


class Referee(IType):
    def __init__(self, tag: Tag) -> None:
        self._type = tag.find("div", class_="u-border-grey-light").string
        imgStyle = tag.find("div", class_="accordion-content__image").get("style")
        imgMatch: Optional[re.Match] = re.search(r"https:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@;?^=%&:\/~+#-]*Images\/Officials\/[\w .,@;?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])", imgStyle)
        self._img = imgMatch.group(0) if imgMatch else None

        nameAndNat = tag.find("div", class_="accordion-content__item")
        name = nameAndNat.find("div")

        self._name = name.string
        name.decompose()

        nat = nameAndNat.find("div")
        self._nationality = nat.string

    def __repr__(self) -> str:
        return f"(cevlib.types.info.Referee) {self._name} {self._type} ({self._nationality}) {self._img}"

    @property
    def valid(self) -> bool:
        return True

    def toJson(self) -> dict:
        return {
            "name": self._name,
            "image": self._img,
            "type": self._type,
            "nationality": self._nationality
        }


class Venue(IType):
    def __init__(self, tag: Tag) -> None:
        self._img = tag.find("img", class_="u-object-cover").get("src")
        data = tag.find("p")
        cap = data.find("span")
        cap.strong.decompose()
        self._capacity = cap.get_text(strip = True)
        cap.decompose()
        self._name = data.get_text(strip = True)

    def __repr__(self) -> str:
        return f"(cevlib.types.info.Venue) {self._name} (capacity: {self._capacity}) {self._img}"

    @property
    def valid(self) -> bool:
        return True

    def toJson(self) -> dict:
        return {
            "name": self._name,
            "image": self._img,
            "capacity": self._capacity
        }


def _getAccordionTitle(tag: Tag) -> Optional[str]:
    a = tag.find("a", class_="accordion-title")
    if not a:
        return None
    return a.string


class Info(IType):
    def __init__(self, html: str) -> None:
        soup = BeautifulSoup(html, "html.parser")
        infoText = soup.find("div", class_="text-container")
        self._infoText = infoText.get_text(strip=True, separator='<br>') if infoText else None
        self._officials: List[Referee] = [ ]
        self._venue: Optional[Venue] = None

        infoContainer = soup.find("div", class_="match-info")
        if not infoContainer:
            return
        infoItems = infoContainer.find_all("li", class_="accordion-item")
        for infoItem in infoItems:
            if _getAccordionTitle(infoItem) == "Officials":
                for official in infoItem.find_all("div", class_="u-flex-1"):
                    self._officials.append(Referee(official))
            if _getAccordionTitle(infoItem) == "How To Attend":
                self._venue = Venue(infoItem)

    def __repr__(self) -> str:
        return f"(cevlib.types.info.Info) {self._infoText} {self._officials} {self._venue}"

    @property
    def valid(self) -> bool:
        return True

    def toJson(self) -> dict:
        return {
            "infoText": self._infoText,
            "officials": [ official.toJson() for official in self._officials ],
            "venue": self._venue.toJson() if self._venue else None
        }
