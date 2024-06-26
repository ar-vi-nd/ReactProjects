import React, { forwardRef, useId } from 'react'

// two important things here first is forward ref and second one is this destructured props and how to use it
// ->Please read difference bw ref and forwardref, aslo how to achieve the functionality of forwardref using ref

const Input = forwardRef(({label,type="text",className = "",...props},ref) => {

  // console.log(props)

    const id = useId()
  return (
    <div className='w-full'>
        {label&&<label className='inline-block mb-1 pl-1 ' htmlFor={id}>
            {label}
            </label>}
        <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} id={id} {...props}></input>
    </div>
  )
})

export default Input