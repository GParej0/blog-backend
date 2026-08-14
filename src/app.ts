import express  from "express";
import cors from "cors"
const app = express();


app.use(express.json());
app.use(cors())

app.get("/", (req, res)=>{
    res.json({
        message: 'Welcome to the API'
    })
})

app.listen(process.env.PORT || 3000, ()=>{ console.log("El puerto 3000 se está escuchando")})