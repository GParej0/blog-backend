import express from "express";
import cors from "cors"
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";
import comRouter from "./routes/commentRouter.js";
const app = express();


app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})
app.use("/auth", authRouter)
app.use("/posts", postRouter)
app.use(comRouter)

app.listen(process.env.PORT || 3000, () => { console.log("El puerto 3000 se está escuchando") })