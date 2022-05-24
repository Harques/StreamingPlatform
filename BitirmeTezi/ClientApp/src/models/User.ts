export class User {
    id!: number
    email!: string
    username!: string
    streamUrl!: string
    lastLoginDate!: Date
    token!: string

    constructor(id: number, email: string, username: string, streamUrl: string, lastLoginDate: Date, token: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.streamUrl = streamUrl;
        this.lastLoginDate = lastLoginDate;
        this.token = token;
    }
}