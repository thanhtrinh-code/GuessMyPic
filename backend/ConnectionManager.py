from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, roomId: int, clientId: str):
        await websocket.accept()
        self.active_connections[roomId]['connections'][clientId]['websocket'] = websocket

    async def disconnect_player(self, websocket: WebSocket, roomId: int, clientId: str):
        del self.active_connections[roomId][clientId]
        await self.broadcast_everyone_except(f"Client #{clientId} disconnected.", roomId, websocket)
        await websocket.close()

    async def broadcast_everyone(self, message: str, roomId: int):
        if roomId in self.active_connections:
            for clientId in self.active_connections[roomId]['connections']:
                connection = self.active_connections[roomId]['connections'][clientId]['websocket']
                await connection.send_text(message)

    async def broadcast_everyone_except(self, message: str, roomId: int, websocket: WebSocket):
        if roomId in self.active_connections:
            for clientId in self.active_connections[roomId]['connections']:
                connection = self.active_connections[roomId]['connections'][clientId]['websocket']
                if connection != websocket:
                    await connection.send_text(message)

