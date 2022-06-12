import { Context } from "../helpers/Context";
import { User } from "../models/User";
import { WebApi } from "./WebApi";

export class AuthService {
    api: WebApi;
    context: Context;

    constructor() {
        this.api = new WebApi();
        this.context = Context.getInstance()
    }

    public async login(body: string) {
        const response = await this.api.post('auth/login', body)

        var data = await response.json()

        if (response.ok) {  
            this.context.setCurrentUser(new User(data.id, data.email, data.username, data.streamUrl, new Date(data.lastLoginDate), data.token))              
            return true
        } else {
            alert(data.Error[0])
        }
    }

    public async signUp(body: string) {
        const response = await this.api.post('auth/register', body)

        var data = await response.json()

        if (response.ok) {
            this.context.setCurrentUser(new User(data.id, data.email, data.username, data.streamUrl, new Date(data.lastLoginDate), data.token)) 
            return true
        } else {
            alert(data.Error[0])
        }
    }

    public async streamUrl(body: string){
        const response = await this.api.get('auth/stream', body)
        if(response.ok){
            return response
        }
        else{
            alert("Bu kullanıcı adına sahip bir kullanıcı bulunamadı.")
        }
    }
}