import { WebSocket } from "ws";
import { IBroadcastMessage, Roles, WebSocketClient } from "../types";

export class BroadcastManager {
    private clients : Map<string, WebSocketClient> = new Map(); 
    
    // add clients to the websocket
    addClient(userId: string, ws: WebSocket, role: Roles){
        const client: WebSocketClient = {
            ws, userId, role, isAuthenticated: true
        }
        this.clients.set(userId, client);
        console.log(`Client ${userId} with ${role} is connected. Total clients: ${this.clients.size}`);
        ws.on('close', () => {
            this.removeClient(userId);
        })
        ws.on('error', (e) => {
            console.error("Websocket error for client: ", e);
            this.removeClient(userId);
        })
    } 

    // remove client if it goes offline or any error occour on client side
    removeClient(userId: string){
        if(this.clients.has(userId)){
            this.clients.delete(userId);
            console.log(`Client ${userId} disconnect. Total connected clients ${this.clients.size}`)
        }
    }

    // broadcast to role
    broadcastToRole(message: IBroadcastMessage, targetRole: Roles){
        let sentCount = 0;
        this.clients.forEach((client, userId) => {
            if(client.role === targetRole && client.ws.readyState === WebSocket.OPEN){
                try{
                    client.ws.send(JSON.stringify(message));
                    sentCount++;
                }catch(e){
                    console.error(`Failed to sent message to ${userId}: ${e}`);
                    this.removeClient(userId);
                }
            }
        });
        console.log(`Broadcast sent to ${sentCount} clients with role ${targetRole}`);
        return sentCount;
    }

    // broadcast to all
    broadcastToAll(message: IBroadcastMessage){
        let sentCount = 0;
        this.clients.forEach((client, userId) => {
            if(client.ws.readyState === WebSocket.OPEN){
                try{
                    client.ws.send(JSON.stringify(message));
                    sentCount++;
                }catch(e){
                    console.error(`Failed to sent message ${userId}: ${e}`);
                    this.removeClient(userId);
                }
            }
        });
        console.log(`Broadcast sent to ${sentCount} clients`);
        return sentCount;
    }

    // send to user
    broadcastToUser(message: IBroadcastMessage, userId: string) {
        const client = this.clients.get(userId);
        if(client && client.ws.readyState === WebSocket.OPEN){
            try{
                client.ws.send(JSON.stringify(message));
                return true;
            }catch(e){
                console.error(`Failed to send message to user ${userId}: ${e}`);
                this.removeClient(userId);
                return false;
            }
        }
        return false;
    }

    // get connected clients
    getConnectedClients(): string[]{
        return Array.from(this.clients.keys());
    }

    // get clients by role
    getClinetsByRole(targetRole: Roles): string[]{
        const clientIds: string[] = [];
        this.clients.forEach((client, userId) => {
            if(client.role === targetRole){
                clientIds.push(userId);
            }
        });
        return clientIds;
    }
}