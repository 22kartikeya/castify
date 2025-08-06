import { Server } from 'http';
import { WebSocketServer } from 'ws';
import { handleWebSocketConnection } from './websocketHandler';

export function webSocketInitialize(server: Server){
    const wss = new WebSocketServer({ server, path: '/ws' });
    
    wss.on("connection", (socket, request) => {
        handleWebSocketConnection(socket, request);
    })

    wss.on('error', (error) => {
        console.log("Websocket server error: ", error);
    })
    return { wss };
}