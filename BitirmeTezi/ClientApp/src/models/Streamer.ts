export class Streamer {
    id!: number
    email!: string
    username!: string
    

    constructor(id: number, email: string, username: string) {
        this.id = id;
        this.email = email;
        this.username = username;        
    }
}