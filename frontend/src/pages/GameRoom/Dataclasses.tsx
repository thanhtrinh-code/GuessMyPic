export interface Player{
    id: string
    name: string
    score: number
    isDrawing: boolean
    hasGuessed: boolean
    correctGuesses: number
}

export interface GameState {
    hostId: string
    capacityLimit: number
    round: number
    gameInsession: boolean
    currentDrawer?: string
    currentCategory?: string
    currentWord?: string
}