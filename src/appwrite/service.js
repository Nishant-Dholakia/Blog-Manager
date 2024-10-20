import { Client, Databases,Storage,Query, ID} from "appwrite";
import conf from "../config/conf";


export class Service{
    client = new Client();
    databases;
    bucket

    constructor()
    {
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,content,slug,featuredImage,status,userId})
    {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("Service :: createPost :: error ",error);
            return false;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status})
    {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                    userId
                });
        } catch (error) {
            console.log("Service :: updatePost :: error ",error);
            return false;
        }
    }

    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
            return true;
        } catch (error) {
            console.log("Service :: deletePost :: error ",error);
            return false;
        }
    }

    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
        } catch (error) {
            console.log("Service :: getPost :: error ",error);
            return false;

        }
    }

    async getAllPosts(queries = [Query.equal('status','active')])
    {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries);
        } catch (error) {
            console.log("Service :: getAllPosts :: error ",error);
            return false;
        }
    }


    // file management
    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file);
        } catch (error) {
            console.log("Service :: uploadFile :: error ",error);
            return false;
        }
    }

    async deleteFile(fileId)
    {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
            return true;
        } catch (error) {
            console.log("Service :: deleteFile :: error ",error);
            return false;
        }
    }

    previewFile(fileId)
    {
        try {
            return  this.bucket.getFilePreview(conf.appwriteBucketId,fileId);
        } catch (error) {
            console.log("Service :: previewFile :: error ",error);
            return false;
        }
    }

}


export const service = new Service();
