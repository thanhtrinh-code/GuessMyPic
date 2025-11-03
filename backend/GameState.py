from dataclasses import dataclass
from typing import Optional
@dataclass
class GameState: 
    hostId: str
    capacityLimit: int
    round: int
    gameInsession: bool
    currentDrawer: Optional[str] = None # clientId that is current drawing
    currentCategory: Optional[str] = None
    currentWord: Optional[str] = None