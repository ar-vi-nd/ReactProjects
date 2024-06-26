import {appwriteUrl,appwriteProjectId} from "../conf/conf"
// console.log(conf)

import { Client, Account, ID } from "appwrite";


export class AuthService{

    client = new Client();
    account
    constructor(){
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId)

            // this is method chaining ie the client object calls a method which returns a object (which is the same object) and the on that same object we can call the next method again
            // this.client.setEndpoint(appwriteUrl)
            // this.client.setProject(appwriteProjectId)
            // these are equivalent methods

            this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){

        try {
            // const response = await account.create(ID.unique(), email, password,name);
            const response = await this.account.create(ID.unique(), email, password,name);
            console.log(response)
            if(response){
                // either make request on login endpoint or return response as created user
                return await this.userLogin({email,password})
            }else{
                return response
            }
        } catch (error) {
            throw  error
        }
    }

    async userLogin({email,password}){
        try{
            // const response = await account.createEmailPasswordSession(email,password)
            // console.log(email,password)
            // console.log(this.account)
            const response = await this.account.createEmailPasswordSession(email,password)
            return response


        }catch(error){
            console.log("error logging in ", error)
        }
    }

    async getCurrentUser(){
        try{
           return await this.account.get()
        }catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        return null
    }}

    async logout(){
        try {
            return await  this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Error : Logout Error",error)
            
        }
    }
}

const authService = new AuthService()

export default authService