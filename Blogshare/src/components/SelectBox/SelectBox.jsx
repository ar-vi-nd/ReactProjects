import React, { useId ,forwardRef  } from 'react'


// options in the props should be array as we need to loop it and we can leave the classname as null but its better to keep it default as "" (empty string) in the props 

const SelectBox = ({options,label,className="",...props},ref) => {

  console.log(options)
    const id = useId()
  return (
    <div className='w-full'>
        {label&&<label htmlFor={id} className=''>{label}</label>}
        <select className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} id={id} ref={ref}>
        {options?.map((option)=>{
            return <option key={option} value={option}>{option}</option>
        })}
        </select>

    </div>
  )
}

export default forwardRef(SelectBox)