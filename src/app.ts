
import express from "express";
import cors from "cors";
import router from "./router";

export const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/healthy', (req, res) => {
    res.status(200).json(
        {
            success: true,
            message: "Server is healthy"
        })
})

app.use("/api", router)
