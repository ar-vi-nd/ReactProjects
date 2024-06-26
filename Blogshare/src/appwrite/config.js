import { appwriteUrl,appwriteProjectId,appwriteDatabaseId,appwriteCollectionId,appwriteBucketId } from "../conf/conf";

import { Client,ID,Databases, Query, Storage } from "appwrite";

class Service {

    client = new Client()
    constructor(){
        this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            const response = await this.databases.createDocument(
                appwriteDatabaseId,
                appwriteCollectionId,
                slug,
                {
                  title,content,featuredImage,status,userId  
                }

            )
            return response
        } catch (error) {
            console.log("Error adding post ", error)
        }
    }

    async updatePost(documentId,{title,slug,content,featuredImage,status,userId}){

        try {
            return this.databases.updateDocument(
                appwriteDatabaseId,
                appwriteCollectionId,
                documentId,
                {
                    title,content,featuredImage,status,userId
                }
            )
        } catch (error) {
            console.log("Error updating post ", error)
        }

    }

    async deletePost(slug){
        try {
            return this.databases.deleteDocument(appwriteDatabaseId,appwriteCollectionId,slug)
        } catch (error) {
            console.log("Error Deleting Post")
        }
    }

    async getPost(slug){
        try {
            return this.databases.getDocument(appwriteDatabaseId,appwriteCollectionId,slug)
        } catch (error) {
            console.log("Error fetching post")
        }
    }

    async getPosts(userId){
        try {
            if(userId){
                return this.databases.listDocuments(
                    appwriteDatabaseId,appwriteCollectionId,[Query.equal("status",`${userId}`)])
            }
            // const queries = [Query.equal("status","active")]
            return this.databases.listDocuments(
                appwriteDatabaseId,appwriteCollectionId,[Query.equal("status","active")]
            )
        } catch (error) {
            console.log("Error fetching posts")
        }
    }

    async uploadFile(file){
        try {
            return this.bucket.createFile(
                appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error uploading file")
        }
    }

    async deleteFile(fileId){
        try {
            return this.bucket.deleteFile(appwriteBucketId,fileId)
        } catch (error) {
            console.log("Error uploading file")
            
        }

    }

    // at first i made the below function as async, thats why it wasnt returning the href i believe it was sending a promise
    // in that case i would need to send request in useEffect to fetch the file preview, and then set the link returned from this function in the image src
    // simpler way is just use simple function as it doesnt need time to fetch the image info, so no need to use await

     getFilePreview(fileId){
        try {
            // console.log(fileId)
            const image =  this.bucket.getFilePreview(appwriteBucketId,fileId)
            // console.log(image.href)
            return image.href
        } catch (error) {
            console.log("Error fetching file preview")
        }
    }

}


const appwriteService = new Service()

export default appwriteService