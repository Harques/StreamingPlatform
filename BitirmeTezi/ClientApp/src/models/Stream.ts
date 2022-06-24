import { Streamer } from "./Streamer"

export class Stream{
    id!: number
    url!: string
    category!: string    
    streamer!: Streamer
    subtitle!: string

    constructor(id: number, url: string, category: string, streamer: Streamer, subtitle: string) {
        this.id = id
        this.url = url
        this.category = category
        this.streamer = streamer
        this.subtitle = subtitle
    }
}