
import express from "express";
import cors from "cors";
import router from "./router";
import multer from "multer";

export const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get('/api/healthy', (req, res) => {
    res.status(200).json(
        {
            success: true,
            message: "Server is healthy"
        })
})

app.use("/api", router)
