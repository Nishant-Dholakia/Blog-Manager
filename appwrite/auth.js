import { Client, Account, ID } from "appwrite";
import conf from "../config/conf";
export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async  createAccount({email,password,username})
    {
        try {
            const user = await this.account.create(ID.unique(),email,password,username);
            if(user)
            {
                return await this.login({email,password});
            }
            else{
                return user;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email,password})
    {
        try {
            return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            throw error;
        }
    }

    async getUser()
    {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService :: getUser :: error : " , error);
        }
        return null;
    }

    async logOut()
    {
        try {
            await this.account.deleteSessions(); 
        } catch (error) {
            console.log("AuthService :: logOut :: error : " , error);
        }
    }

}


export const authService = new AuthService();
 