import { Context } from "../helpers/Context";
import { Stream } from "../models/Stream";
import { WebApi } from "./WebApi";

export class StreamService {
    api: WebApi;
    context: Context;

    constructor() {
        this.api = new WebApi();        
        this.context = Context.getInstance();
    }

    public async getStreams(): Promise<Stream[]> {
        const response = await this.api.get('streams')

        var data = await response.json()  
        var streams: Stream[] = []

        if (response.ok) {
            streams = <Stream[]> JSON.parse(JSON.stringify(data))            
        } 
        
        return streams
    }

    public async checkIfStreamOpened() : Promise<boolean> {
        var key = localStorage.getItem('key')        

        if (key !== null) {
            const result = await this.api.getStream(key as string)            
            if (result.ok) return true            
        }
            
        return false
    }

    public async startStream(category: string) {
        var url = this.api.streamBaseUrl + localStorage.getItem('key') + ".m3u8"
        var id: number = +(localStorage.getItem('id') as string)
        var body = JSON.stringify({URL: url, category: category, streamerId: id});

        const response = await this.api.post('streams/startStream', body)

        if (response.ok) {
            return true
        }

        return false
    }
}