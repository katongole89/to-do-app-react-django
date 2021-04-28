import React, {useEffect} from "react"
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

function Main(){

    const[User, setUser] = useCookies(['currentUser'])
    let history = useHistory()
    //check log in status
    if(!User.currentUser){
        console.log('U NEED TO LOGIN')
        history.push('/login')
        return(<div></div>)
    }else{
        //update cookie to new time
        setUser('currentUser', User.currentUser, {
            maxAge:3600
        })
    }
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