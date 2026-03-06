import { useEffect, useState } from "react";


import { pb } from "../lib/pocketbase";



export const useUser = () => {

    const [userData, setUser] = useState(() => {
        const cashed = localStorage.getItem('userData')
        return cashed? JSON.parse(cashed): null
    })

    const getUser = async () => {
        try {
            const baseUser = await pb.collection('users').getOne(pb.authStore.model?.id)
            console.log(baseUser)
            localStorage.setItem('userData', JSON.stringify(baseUser))
            setUser(baseUser)  
        }
        catch{
            alert('что то пошло не так user')
        }
    }

    useEffect(() => {
        if (pb.authStore.model?.id !== userData?.id){
            getUser()
        }
    },[])


    

    return {
        userData
    }
}