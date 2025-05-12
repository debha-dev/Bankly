import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/databaseConfig";
import { setupSwagger } from "./config/swagger";
import {userRouter} from "./routes/userRoute";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter)

setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Bankly API!");
  });

  app.get("/api/status", (req: Request, res: Response) => {
    res.json({ message: "API is up and running!" });
  });

  const startServer = async () => {
    try {
      await connectDB(); 
      app.listen(PORT, () => {
        console.log(`🚀 Bankly server listening on port ${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start the server:", error);
    }
  };
  
  startServer();