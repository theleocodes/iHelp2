import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const Test = () => {

    const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();

    const callProtected = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log(token)
            const response = await axios.get("http://localhost:5000/protected", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            console.log(response)


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>

            <button
                className='btn btn-primary'
                onClick={() => {
                    callProtected()
                }}>CALL PROTECTED</button>
        </>
    )
}

export default Test