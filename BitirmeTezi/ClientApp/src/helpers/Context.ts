import { User } from "../models/User";

export class Context {
    private currentUser!: User
    private static instance: Context;

    private constructor() {
        console.log("constructor called!")
    }
 
    public static getInstance() : Context {
        if (!Context.instance) {
            Context.instance = new Context();
        }

        return Context.instance;
    }    

    public getCurrentUser() {
        return this.currentUser;
    }

    public setCurrentUser(currentUser: User) {
        this.currentUser = currentUser;        
    }

}