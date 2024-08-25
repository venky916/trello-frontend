import { useEffect, useState } from "react";

const useLocalstorage = (key)=>{

    const getInitialValue = ()=>{
        const localStorageValue = localStorage.getItem(key) ;
        if(localStorageValue){
            return JSON.parse(localStorageValue)
        }else{
            return null
        }
    }

    const [getLocalStorageValue,setLocalStorageValue] = useState(getInitialValue)

    useEffect(()=>{
        const handleStorageChange = ()=>{
            const localStorageValue = localStorage.getItem(key)
            setLocalStorageValue(JSON.parse(localStorageValue))
        }

        window.addEventListener("storage",handleStorageChange)
        return()=>{
            window.removeEventListener("storage",handleStorageChange)
        }

    },[])

    const setLocalStorage = (value)=>{
        localStorage.setItem(key,JSON.stringify(value))
        setLocalStorageValue(value)
    }

    const clearLocalStorage = ()=>{
        localStorage.removeItem(key);
        console.log(key)
        setLocalStorageValue(null);
    }

    return [getLocalStorageValue, setLocalStorage, clearLocalStorage]

}

export default useLocalstorage