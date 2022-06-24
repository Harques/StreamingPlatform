export class User {
    id!: number
    email!: string
    username!: string
    streamKey!: string
    lastLoginDate!: Date
    token!: string

    constructor(id: number, email: string, username: string, streamKey: string, lastLoginDate: Date, token: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.streamKey = streamKey;
        this.lastLoginDate = lastLoginDate;
        this.token = token;
    }
}