from abc import ABC, abstractmethod, abstractproperty

class IType(ABC):
    @abstractproperty
    def valid(self) -> bool:
        pass

    def __bool__(self):
        return self.valid

    @abstractmethod
    def toJson() -> dict:
        pass
