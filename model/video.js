import { model, Schema } from "mongoose";

const video = new Schema({
    video: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
})

export const VIDEO = model("video", video)