from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections = {} # { roomId: { "players": {}, "connections": {}, "gameState": GameState } }

    async def connect(self, websocket: WebSocket, roomId: int, clientId: str):
        await websocket.accept()
        connections = self.active_connections[roomId]['connections']
        connections[clientId].websocket = websocket

    async def disconnect_player(self, websocket: WebSocket, roomId: int, clientId: str):
        try:
            await websocket.close()
        except Exception:
            pass  

    async def remove_player(self, websocket: WebSocket, roomId: int, clientId):
        if roomId not in self.active_connections:
            return
    
        room = self.active_connections[roomId]
        players = room['players']
        connections = room['connections']
        try:
            if not websocket.client_state.name == "DISCONNECTED":
                await websocket.close()

            if clientId in connections:
                del connections[clientId]

            if clientId in players:
                del players[clientId]
        except Exception:
            pass  
    async def remove_room(self, roomId):
        if roomId not in self.active_connections:
            return
        # Close the socket of everyone in the room
        connections = self.active_connections[roomId]['connections']
        for ws in list(connections.values()):
            socket = ws.websocket
            try:
                await socket.close()
            except Exception:
                pass
            
        del self.active_connections[roomId]
        
    async def broadcast_everyone(self, message: str, roomId: int):
        if roomId in self.active_connections:
            connections = self.active_connections[roomId]['connections']
            for ws in connections.values():
                socket = ws.websocket
                try:
                    await socket.send_text(message)
                except Exception:
                    pass  

    async def broadcast_everyone_except(self, message: str, roomId: int, websocket: WebSocket):
        if roomId in self.active_connections:
            connections = self.active_connections[roomId]['connections']
            for ws in connections.values():
                socket = ws.websocket
                if socket != websocket:
                    try:
                        await socket.send_text(message)
                    except Exception:
                        pass  

