from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import uuid


from ConnectionManager import ConnectionManager
import uvicorn

app = FastAPI()
manager = ConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import json
@app.websocket("/ws/{roomId}")
async def websocket_endpoint(websocket: WebSocket, roomId: int):
    client_id = websocket.query_params.get("clientId")
    await manager.connect(websocket, roomId, client_id)

    try:
        while True:
            data = await websocket.receive_text()      # data is a string
            message = json.loads(data)
            msg_type = message['type']
            msg = message['data']

            if msg_type == 'broadcast_everyone_except':
                await manager.broadcast_everyone_except(json.dumps(msg), roomId, websocket)
            elif msg_type == 'broadcast_everyone':
                await manager.broadcast_everyone(msg, roomId)
    except WebSocketDisconnect:
        await manager.disconnect_player(websocket, roomId, client_id)
        
@app.post("/api/create_room")
async def create_room(request: Request):
    data = await request.json()
    name, room_allowed = data.get("name"), data.get("roomAllowed")
    roomId = 100000 + len(manager.active_connections) + 1
    clientId = str(uuid.uuid4())

    manager.active_connections[roomId] = {
                "name": name,
                "room_allowed": room_allowed,
                'current_drawer': None,
                'current_word': None,
                'round': 0,
                'game_insession': False,
                'connections': {
                    clientId: {
                        'name': name,
                        'host': True,
                        'websocket': None,
                        'connected': True,
                        'score': 0,
                        'is_drawing': False,
                        'has_guessed': False,
                        'ready': False,
                        'correct_guesses': 0,
                    }
                }
            }
    return { "success": True, "roomId": roomId, "clientId": clientId }

@app.post("/api/join_room")
async def join_room(request: Request):
    data = await request.json()
    name, roomId = data.get("name"), data.get("roomId")
    if roomId not in manager.active_connections:
        return { "success": False, "error": "Room does not exist." }


    room = manager.active_connections[roomId]
    if len(room['connections']) >= room['room_allowed']:
        return { "success": False, "error": "Room is full." }
    
    clientId = str(uuid.uuid4())
    room['connections'][clientId] = {
            'name': name,
            'host': False,
            'websocket': None,
            'connected': True,
            'score': 0,
            'is_drawing': False,
            'has_guessed': False,
            'ready': False,
            'correct_guesses': 0,
        }
    return { "success": True, "roomId": roomId, "clientId": clientId }
    
    

if __name__ == "__main__":
    # Run with: python main.py
    uvicorn.run(app, host="127.0.0.1", port=8000)