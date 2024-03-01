import express, {Application, Request, Response} from "express"
import cors from "cors"
import OpenAIAPI from "openai"
import Configuration from "openai"

const PORT:number = 8000

const app: Application = express()
app.use(cors())
app.use(express.json())


const API_KEY: string = ""


const configuration = new Configuration({
    apiKey:API_KEY
})

// @ts-ignore
const openai = new OpenAIAPI(configuration)

app.post("/completions", async(req: Request, res: Response)=>{
    try{
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: "Create a SQL request to " + req.body.message}]
        })
        res.send(completion.choices[0].message)
    }
    catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`))