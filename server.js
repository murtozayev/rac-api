import express from "express"
import cors from "cors"
const app = express()
import dot from "dotenv"
import { connect } from "./db/connect.js"
import { VIDEO } from "./model/video.js"
dot.config()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: false }))
app.use(cors())

app.post("/videos", async (req, res) => {
    const { video, title, description, like, likes, subs, subsc, category } = req.body

    try {
        const newVideo = await VIDEO.create({ video, title, description, like, likes, subs, subsc, category })

        res.json(newVideo)

    } catch (error) {
        console.error(error)
    }
})

app.get("/", async (req, res) => {
    const videos = await VIDEO.find()

    if (videos) {
        try {
            res.status(201).json(videos)
        } catch (error) {
            res.status(501).json(error)
        }
    }

})

app.get("/watch/:id", async (req, res) => {

    const videoId = req.params.id

    const singleVideo = await VIDEO.findById(videoId)

    try {
        if (!singleVideo) {
            return res.status(400).json({ message: "Bas Status" })
        }

        res.json(singleVideo)

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

connect()

export default app