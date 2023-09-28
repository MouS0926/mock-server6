const express=require("express")
const {connection}=require("./db")
// const { emproutes } = require("./routes/emproutes")

const cors=require("cors")
const { userrouter } = require("./routers/userroutes")
const { blogrouter } = require("./routers/blogroutes")




const app=express()

app.use(express.json())
app.use(cors())
app.use("/",userrouter)
app.use("/blogs",blogrouter)


app.get("/",(req,res)=>{
    res.status(200).send("GET REQ")
})

app.listen(8081,async ()=>{
    
    try {
        await connection
        console.log("db is connected");
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
    
})