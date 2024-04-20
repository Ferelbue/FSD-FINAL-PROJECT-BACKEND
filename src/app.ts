
import express from "express";
import cors from "cors";



export const app = express();

app.use(cors());

app.use(express.json());

app.get('/healthy', (req, res) => {
    res.status(200).json(
        {
            success: true,
            message: "Server is healthy"
        })
})
