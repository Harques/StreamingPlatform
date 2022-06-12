import axios from "axios";
export class WebApi {
    private baseUrl = "https://localhost:44306/api/";        

    public async post(path: string, body: string) { 
        const requestOptions = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: body
        }       
        return await fetch(this.baseUrl + path, requestOptions)
    }
    public async get(path: string, body: string) { 

        return await fetch(this.baseUrl + path + "/" + body)
    }     
}