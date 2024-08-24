import { BASE_URL } from "../utils/constants";

export const LogIN = async (user)=>{

    try{
        const response = await fetch(`${BASE_URL}/api/auth/login`,{
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error("Failed to Login")
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error in signUP:", error.message);
        throw error;
    }

}

export const SignUP =async (user)=>{

    try{
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });

        if(!response.ok){
            throw new Error("Failed to Login")
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in signUP:", error.message);
        throw error;
    }

}

// export const LogOUT = ()=>{

// }