import { IncomingMessage } from "http";
import { WebSocket } from "ws";


export async function handleWebSocketConnection(socket: WebSocket, request: IncomingMessage){
    console.log("user connected");
}