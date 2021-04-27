import React from "react"
import {useCookies} from 'react-cookie'

function Main(){
    const[User, setUser] = useCookies(['currentUser'])
    console.log(User);
    return(
        <div>
            <h1>home</h1>
            <div>
                first name:{User.currentUser.first_name}
                last name: {}
            </div>
        </div>
    )
}

export default Main