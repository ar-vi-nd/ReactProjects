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

    async updatePost({title,slug,content,featuredImage,status,userId}){

        try {
            return this.databases.updateDocument(
                appwriteDatabaseId,
                appwriteCollectionId,
                slug,
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

    async getPosts(){
        try {
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

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(appwriteBucketId,fileId)
        } catch (error) {
            console.log("Error fetching file preview")
        }
    }

}


const service = new Service()

export default service