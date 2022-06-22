import axios from "axios";
export class WebApi {
    private baseUrl = "https://localhost:44306/api/";    
    public streamBaseUrl = "http://20.56.240.145:8080/hls/"

    public async post(path: string, body: string) { 
        const requestOptions = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: body
        }       
        return await fetch(this.baseUrl + path, requestOptions)
    }

    public async get(path: string) { 
        const requestOptions = {
            method: 'get',
            headers: {'content-type': 'application/json'}
        }
        return await fetch(this.baseUrl + path, requestOptions)
    }

    public async getStream(path: string) {
        const res = await fetch(this.streamBaseUrl + path + ".m3u8")
        return res
    }  
}