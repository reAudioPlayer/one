from __future__ import annotations
from typing import List, Union
from bs4 import BeautifulSoup
from bs4.element import Tag, NavigableString
from cevlib.types.iType import IType


class MatchReport(IType):
    def __init__(self, html: str) -> None:
        soup = BeautifulSoup(html, "html.parser")
        try:
            matchReport = soup.find("div", class_="match-report")
            try:
                self._headline = matchReport.h2.get_text(strip=True)
                self._body = matchReport.find("div", class_="match-report__summary-container").p.text
            except:
                self._headline = None
                self._body = None

            matchReport.decompose()
            matchReport = soup.find("div", class_="match-report")
            self._quotes = MatchQuote.Parse(soup)
            self._inNumbers = MatchInNumber.Parse(matchReport)
        except AttributeError:
            self._headline = None
            self._body = None
            self._quotes: List[MatchQuote] = [ ]
            self._inNumbers: List[MatchInNumber]  = [ ]

    def toJson(self) -> dict:
        return {
            "headline": self.headline,
            "body": self.body,
            "quotes": [ quote.toJson() for quote in self.quotes ],
            "inNumbers": [ inNumber.toJson() for inNumber in self.inNumbers ]
        }

    @property
    def headline(self) -> str:
        assert self.valid
        return self._headline

    @property
    def body(self) -> str:
        assert self.valid
        return self._body

    @property
    def quotes(self) -> List[MatchQuote]:
        assert self.valid
        return self._quotes

    @property
    def inNumbers(self) -> List[MatchInNumber]:
        assert self.valid
        return self._inNumbers

    @property
    def valid(self) -> bool:
        return None not in (self._headline, self._body) and len(self._quotes) > 0 or len(self._inNumbers) > 0

    def __repr__(self) -> str:
        return f"(cevlib.types.report.MatchQuote) {self._headline} ({self._body})\n{self._quotes}\n{self._inNumbers}"


class MatchInNumber(IType):
    def __init__(self, value: str, title: str, description: str) -> None:
        self._value = value
        self._title = title
        self._description = description

    def toJson(self) -> dict:
        return {
            "title": self.title,
            "description": self.description,
            "value": self.value
        }

    @property
    def valid(self) -> bool:
        return None not in (self._value, self._title, self._description)

    @property
    def value(self) -> str:
        assert self.valid
        return self._value

    @property
    def title(self) -> str:
        assert self.valid
        return self._title

    @property
    def description(self) -> str:
        assert self.valid
        return self._description

    def __repr__(self) -> str:
        return f"(cevlib.types.report.MatchInNumber) {self._title}: {self._value} ({self._description})"

    @staticmethod
    def Parse(soup: Union[Tag, NavigableString]) -> List[MatchInNumber]:
        numbers = soup.find_all("div", class_="column-container")
        matchInNumbers: List[MatchInNumber] = [ ]
        for number in numbers:
            matchInNumbers.append(MatchInNumber(number.span.text, number.find("span", class_="col__content-title").get_text(strip=True), number.p.text))
        return matchInNumbers


class MatchQuote(IType):
    def __init__(self, quote: str, cite: str) -> None:
        self._quote = quote.replace("“", "").replace("”", "").removeprefix(" ").removesuffix(" ")
        self._cite = cite.split("<br>")[0]
        self._citeDescription = cite.split("<br>")[1]

    def toJson(self) -> dict:
        return {
            "quote": self.quote,
            "cite": self.cite,
            "citeDescription": self.citeDescription
        }

    @property
    def quote(self) -> str:
        assert self.valid
        return self._quote

    @property
    def cite(self) -> str:
        assert self.valid
        return self._cite

    @property
    def citeDescription(self) -> str:
        assert self.valid
        return self._citeDescription

    @property
    def valid(self) -> bool:
        return None not in (self._quote, self._cite, self._citeDescription)

    def __repr__(self) -> str:
        return f"(cevlib.types.report.MatchQuote) {self._cite} ({self._citeDescription}): '{self._quote}'"

    @staticmethod
    def Parse(soup: BeautifulSoup) -> List[MatchQuote]:
        quotes: List[MatchQuote] = [ ]
        quoteElements = soup.find_all(class_="quote-block")
        for element in quoteElements:
            quotes.append(MatchQuote(element.p.text, element.cite.get_text(strip=True, separator='<br>')))
        return quotes
