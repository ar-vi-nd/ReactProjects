import React from 'react'
import { useForm } from 'react-hook-form'
import {Input,Button,RTE,SelectBox} from "../index"
import appwriteService from '../../appwrite/config'
import {useNavigete} from 'react-router-dom'
import { useSelector } from 'react-redux' 
import { useCallback } from 'react'
import { useEffect } from 'react'
const PostForm = () => {

    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title : post?.title||"",
            slug : post?.slug || "",
            status : post?.status|| "",
            content : post?.content || ""

        }
    })

    const userData = useSelector((state)=>state.auth.userData)
    const navigate = useNavigete()

    const formSubmitHandler = async (data)=>{
        try {
            if(post){
                const file = data?.image[0]? await appwriteService.uploadFile(data.image[0]): undefined

                if(file){
                    await appwriteService.deleteFile(post.featuredImage)
                }
                const createdPost = await appwriteService.updatePost(post.$id,{
                    ...data,
                    featuredImage : file?file.$id:undefined
                })
                if (createdPost){
                    navigate(`/post/${post.$id}`)
                }
            }else{

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }

            
        } catch (error) {
            
            console.log("Error Posting Blog ", error)
        }

        const slugTransform = useCallback((value)=>{
            if(value && typeof(value)==="string"){

                return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            }
            return ""
        })

        useEffect(()=>{
            const subscription = watch((value,{name})=>{
                if(name === "title"){
                    setValue("slug",slugTransform(value.title),{shouldValidate:true})
                }

            })

            return ()=>subscription.unsubscribe
        },[watch,slugTransform,setValue])
    }
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className='flex flex-wrap'>
        
        <div>
            <Input
            label = "Title"
            placeholder = "Enter Title"
            className = "mb-4"
            {...register('title',{required:true})}
            
            />
            <Input
            label = "Slug"
            placeholder = "Slug"
            className = "mb-4"
            {...register('slug',{required:true})}
            onInput = {(e)=>{
                setValue("slug",slugTransform(e.currentTarget.value,{shouldValidate:true}))
            }}
            
            />

            <RTE label="Content : " name="content" control={control} defaultValue={getValues("content")}/>

            <div className='w-1/3 px-2'>
            <Input
            label = "Featured Image : "
            type = "file"
            className = " mb-4"
            accept = "image/png, image/jpg, image/jpeg, image/gif"
            {...register("image",{required:!post})}
            
            />
            {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

            <SelectBox label="Status" options={["active","inactive"]} className="mb-4" {...register("status",{required:true})}/>

            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </div>
    </form>
  )
}

export default PostForm