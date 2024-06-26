import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input,Button,RTE,SelectBox} from "../index"
import appwriteService from '../../appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux' 
import { useCallback } from 'react'
import { useEffect } from 'react'

// let rerenderval = 0;

const PostForm = ({post}) => {

    const [error,setError] = useState(null)

    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{
            title : post?.title||"",
            slug : post?.$id || "",
            status : post?.status|| "",
            content : post?.content || ""

        }
    })

    const userData = useSelector((state)=>state.auth.userData)
    const navigate = useNavigate()

    const formSubmitHandler = async (data)=>{
        try {
            setError(null)
            if(post){
                // console.log(post)
                const file = data?.image[0]? await appwriteService.uploadFile(data.image[0]): undefined

                if(file){
                    await appwriteService.deleteFile(post.featuredImage)
                }
                // console.log(post.$id)
                // console.log({...data,featuredImage:file?file.$id:undefined})

                // while updating appwrite ignores undefined values like in this case if i dont choose a new image
                const createdPost = await appwriteService.updatePost(post.$id,{
                    ...data,
                    featuredImage : file?file.$id:undefined
                })
                if (createdPost){
                    navigate(`/post/${post.$id}`)
                }
            }else{


                // this line is for saving the image file in bucket before saving document
                const file = await appwriteService.uploadFile(data.image[0]);
                // console.log(file)

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    // console.log(data)
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
    
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }

            
        } catch (error) {
            
            console.log("Error Posting Blog ", error)
        }
    }

    const validationErrorHandler = (error)=>{
        // console.log("Validation errors : ",error ," form values : ",getValues())
        setError({...error})
    }


    // useCallback memoizes the function ie it wont be created on each rerender it will only be created once
        const slugTransform = useCallback((value)=>{
            if(value && typeof(value)==="string"){

                return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
            }
            return ""
        },[])

        // const watchtitle = watch("title")
        // if you dont want to use this watch varient it will also work but it will cause rerenders.
        // these two watch methods are different because one takes the field name to watch and other watches the form and execute the callback function


        useEffect(()=>{
            const subscription = watch((value,{name})=>{
                // console.log("inside here")
                if(name === "title"){
                    // console.log("value : "+value+" name : ", name)
                    setValue("slug",slugTransform(value.title),{shouldValidate:true})
                }

            })

            // console.log("subscription : ",subscription)

            return ()=>subscription.unsubscribe()
            // at first i thought i need to unsubscribe because watch method sets up a subscription so to prevent rerender we need to unsubscribe but i was wrong
            // still dont know the reason for this

//      when we put function in dependency array it would mean on each rerender the useeffect will run as on each rerender that function will be created again
//      but if we use useCallback while defining the function the keep that function in dependency array it will only run once as the function will only be created once and 
//      then it will be memoized
        },[watch,slugTransform,setValue])

        // dependency array should be this if you use watchtitle to cause sideeffects
        // },[watchtitle,slugTransform,setValue])


        // console.log("rerenderval : " ,rerenderval++)

        // const watchUsername = watch("title")
        // this will cause rerender even if you dont use watchUsername in the component
        // but am using watch, even to cause side effect using useEffect but that isnt causing rerender

        // the below line is wrong and will give error maybe because you can use unsubscribe only when watch recieves a callback and yes I am right 
        // watchUsername.unsubscribe()


        // but the thing you should remember is that you just cannot use unsubscribe on watch with callback fn anywhere as it will do same as watch but wont cause rerender,
        // but next line would be unsubscribe and it wont watch any longer 
        // thats why we use it in useEffect so that it will unsubscribe only when useEffect completes its work

        // const watchUsername = watch((value)=>{

        //     console.log("using callback fn in watch",value)
        // })

        // watchUsername.unsubscribe()

  return (
    <form onSubmit={handleSubmit(formSubmitHandler,validationErrorHandler)} className='flex flex-wrap'>
        
        <div>
            <Input
            label = "Title"
            placeholder = "Enter Title"
            className = "mb-4"
            {...register('title',{required:{value:true,message:"Title required"}})}
            
            />
            <div className='bg-red-500 color-white'>{error&&error.title?.message}</div>

            <Input
            label = "Slug"
            placeholder = "Slug"
            className = "mb-4"
            onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
            {...register('slug',{required:{value:true,message:"Slug required"}})}
           
            />
            <div className='bg-red-500 color-white'>{error&&error.slug?.message}</div>


            <RTE label="Content : " name="content" control={control} defaultValue={getValues("content")}/>



            <div className='w-1/3 px-2'>
            <Input
            label = "Featured Image : "
            type = "file"
            className = " mb-4"
            accept = "image/png, image/jpg, image/jpeg, image/gif"
            {...register("image",{required:{value:!post,message:"Image required"}})}
            
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
            <div className='bg-red-500 color-white'>{error&&error.image?.message}</div>
            

            <SelectBox label="Status" options={["active","inactive"]} className="mb-4" {...register("status",{required:{value:true,message:"Options required"}})}/>

            <div className='bg-red-500 color-white'>{error&&error.status?.message}</div>


            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </div>
    </form>
  )
}

export default PostForm


// ====================================================================================================

/*

If you have a useEffect hook with both a and b as dependencies, and your function sets both a and b simultaneously, the useEffect will still run only once per update.

Here's a simple example to illustrate this:


import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    console.log('useEffect ran');
  }, [a, b]);

  const updateBoth = () => {
    setA(prev => prev + 1);
    setB(prev => prev + 1);
  };

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={updateBoth}>Update Both</button>
    </div>
  );
}

export default MyComponent;


When you click the button and both a and b are updated, the useEffect hook will run once. This is because React batches state updates and only re-renders after all state updates have been processed.
Thus, even though both state variables are changing, useEffect detects them together as a single change.
*/



/*

If you use a function as a dependency in a useEffect hook, the behavior will depend on how the function is defined and how it changes over time. In most cases,
you don't directly use functions as dependencies unless they are recreated on each render (like inline or arrow functions).

Here's an example to illustrate:


import React, { useState, useEffect, useCallback } from 'react';

function MyComponent() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const updateBoth = useCallback(() => {
    setA(prev => prev + 1);
    setB(prev => prev + 1);
  }, []);

  useEffect(() => {
    console.log('useEffect ran');
  }, [updateBoth]);

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={updateBoth}>Update Both</button>
    </div>
  );
}

export default MyComponent;

In this example:

The updateBoth function is defined using useCallback with an empty dependency array, meaning it will be memoized and not recreated on every render.
The useEffect hook depends on updateBoth.
Since updateBoth does not change (due to useCallback), the useEffect will run only once when the component mounts.

However, if updateBoth is not memoized (i.e., it's defined inline or without useCallback), it will be recreated on each render. This would cause the useEffect to run on every render, which is generally not desirable:



import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const updateBoth = () => {
    setA(prev => prev + 1);
    setB(prev => prev + 1);
  };

  useEffect(() => {
    console.log('useEffect ran');
  }, [updateBoth]);

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <button onClick={updateBoth}>Update Both</button>
    </div>
  );
}

export default MyComponent;


In this second example, updateBoth is a new function on every render, causing useEffect to run every time the component re-renders, even if a and b haven't changed.

To avoid unnecessary useEffect runs, ensure that functions used as dependencies are stable, typically by memoizing them with useCallback if they depend on state or props.
*/



/*

does rerender doesnt take place when we define a watch wih callback fn



The behavior of re-renders when using the watch method in React Hook Form (RHF) depends on how you use it. Let’s explore this further:

watch Method:
The watch method in RHF allows you to subscribe to changes in specific form fields.
When you use watch, it sets up a subscription to the specified field(s).
By default, it triggers re-renders at the root level of your app or form whenever the watched field(s) change.

Callback Function:
The callback function you provide to watch is called whenever the watched field(s) change.
It doesn’t directly cause a re-render but runs after the render phase.

Optimizing Performance:
If you’re experiencing performance issues due to re-renders caused by watch, consider alternatives:
Use useWatch instead of watch to limit re-renders to the specific component where the value is needed.
Use an external custom hook for value comparison if you need to detect value updates without causing re-renders.

In summary, while watch itself doesn’t directly trigger re-renders, it sets up subscriptions that can lead to re-renders at the root level. If you want more control over re-renders, consider using useWatch or custom hooks.
*/