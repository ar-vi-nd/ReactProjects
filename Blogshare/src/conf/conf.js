
const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteBucketId : import.meta.env.VITE_APPWRITE_BUCKET_ID,
    appwriteCollectionId : import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    timymceApiKey : import.meta.env.VITE_TINYMCE_KEY
}

// export  {conf}

export const {appwriteBucketId,appwriteUrl,appwriteCollectionId,appwriteDatabaseId,appwriteProjectId,timymceApiKey} = conf