export class Stream{
    id!: number
    url!: string
    category!: string
    streamerId!: number

    constructor(id: number, url: string, category: string, streamerId: number) {
        this.id = id
        this.url = url
        this.category = category
        this.streamerId = streamerId
    }
}