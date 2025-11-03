from dataclasses import dataclass
from typing import Optional
@dataclass
class Player:
    name: str
    score: int
    hasGuessed: bool
    correctGuesses: int
