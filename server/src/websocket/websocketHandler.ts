import { IncomingMessage } from "http";
import { WebSocket } from "ws";

interface WebSocketMessage {
    type: 'auth' | 'ping' | 'pong' | 'subscribe' | 'unsubscribe';
    data?: any;
    token?: string
}

export async function handleWebSocketConnection(socket: WebSocket, request: IncomingMessage){
    console.log("user connected");
}