import express from "express";
import cors from "cors"
import { mongo_url, PORT } from "./config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes"
const app = express();
app.use(express.json());
app.use(cors()); // TODO: add specific frontend domain to access backend

// TODO: use hemlet and express-rate-limiter

app.use(cookieParser());

app.use('/api/auth', userRoutes);

const startServer = async() => {
    try{
        await mongoose.connect(mongo_url);
        console.log("mongodb connected!");
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        });
    }catch(e){
        console.log("failed to connect mongodb: ", e);
        process.exit(1);
    }
}

startServer();
