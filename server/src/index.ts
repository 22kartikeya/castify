import express from "express";
import cors from "cors"
import { frontend_url, mongo_url, PORT } from "./config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes"
import { userBroadcastRouter } from "./routes/userBroadcastRoutes";
import { adminBroadcastRouter } from "./routes/adminBroadcastRoutes";
import { createServer } from 'http';
import { webSocketInitialize } from "./websocket/websocketServer"

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(cors({
  origin: frontend_url,
  credentials: true,
}));// TODO: add specific frontend domain to access backend

// TODO: use helmet and express-rate-limiter

app.use(cookieParser());

app.use('/api/auth', userRouter);
app.use('/api/user/routes', userBroadcastRouter);
app.use('/api/admin/routes', adminBroadcastRouter)

const { wss } = webSocketInitialize(server)

const startServer = async() => {
    try{
        await mongoose.connect(mongo_url);
        console.log("mongodb connected!");
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
            console.log(`WebSocket server is running on ws://localhost:${PORT}`);
        });
    }catch(e){
        console.log("failed to connect mongodb: ", e);
        process.exit(1);
    }
}

startServer();
