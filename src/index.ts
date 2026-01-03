import express,{Application,Request,Response} from "express"
import "dotenv/config"
import path from "path" 
import {fileURLToPath} from "url"
import ejs from "ejs"
import Routes from "./routes/index.js"

const __dir = path.dirname(fileURLToPath(import.meta.url))
const app:Application = express()
const PORT = process.env.PORT||7000
// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Set view engine
app.set("view engine","ejs")
app.set("views",path.resolve(__dir,"./views"))


import "./jobs/index.js"; 
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";


// Routes Middleware
app.use(Routes)

app.get("/",async (req:Request,res:Response)=>{
 const HTML = await ejs.renderFile(
  `${__dir}/views/emails/welcome.ejs`,
  { name: "Rohit" }
); 
//  await sendMail("focom10841@mekuron.com","Welcome to Clash",HTML)
await emailQueue.add(emailQueueName,{"to":"focom10841@mekuron.com","subject":"Welcome to Clash","body":HTML} )
 res.json({message:"Email Sent Successfully"})
// res.render("emails/welcome",{name:"Rohit"})
})





app.listen(PORT,()=>console.log(`server is Running on ${PORT}`))