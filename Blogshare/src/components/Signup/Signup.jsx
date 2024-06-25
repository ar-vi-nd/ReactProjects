import React, { useState } from 'react'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import {Logo,Button,Input} from "../index"
import {register,handleSubmit} from 'react-hook-form'

const Signup = () => {

    const [error , setError] = useState("")

    const navigate = useNavigate()

    const dispatch = useDispatch()


    const formSubmitHandler = async(data)=>{
        setError("")
        try {

            const session = await authService.createAccount(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if (userData){
                    dispatch(login(userData))
                    navigate("/")
                }
            }
            
        } catch (error) {
            console.log("Error submitting form to create user ,",error.message)
            setError(error)
        }
    }
  return (

    <div className="flex items-center justify-center">

        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            
            <form onSubmit={handleSubmit(formSubmitHandler())}>

                <div className='space-y-5'>

                    <Input label = "Full Name :" placeholder = "Enter full name" {...register("fullname",{
                        required : true
                    })}>
                    </Input>

                    <Input label = "Email : " type= "email" placeholder = "Enter your email" {...register("email",{
                        required : true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}>
                    </Input>

                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />

                         <Button type="submit" className="w-full">
                            Create Account
                        </Button>

                </div>


            </form>

        </div>
    </div>
    
  )
}

export default Signup