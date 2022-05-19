import axios from "axios";

export class WebApi {
    private baseUrl = "https://localhost:44306/api/";

    public async post(path: string, body: string) {
        return await axios.post(this.baseUrl + path, body);
    }
}