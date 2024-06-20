import { useEffect, useState } from "react";

const useCurrencyInfo = (currency)=>{
    const [data, setData] = useState({})

    useEffect(()=>{
      const fun =   async()=>{
            const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            const jsondata = await response.json()
            // console.log(jsondata)
    
            setData(jsondata[currency])
        }

        fun()
   
        
    },[currency])
 return data
}

export default useCurrencyInfo