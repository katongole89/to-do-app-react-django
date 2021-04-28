import React, {useEffect, useReducer} from "react"
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'
import ToDo from './ToDo'


const reducer = (state, action)=>{
    if(action.type==="GET_TODO_LIST"){
        return{...state, toDoList:action.payload}
    }

}

const defaultState ={
    toDoList: [1],
}



function Main(){

    const [state, dispatch] = useReducer(reducer, defaultState)

    const[User, setUser] = useCookies(['currentUser'])
    let history = useHistory()

    useEffect(()=>{
        setUser('currentUser', User.currentUser, {
            maxAge:3600
        })


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${User.currentUser.auth_token}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch("http://127.0.0.1:8000/actions/to-dos/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("result")
            console.log(result)
            dispatch({type:'GET_TODO_LIST', payload:result})      
        })
        .catch(error => console.log('error', error));
        
    }, [])

    let list = state.toDoList
    const allActions = list.map((act,index)=> <ToDo key={index} data={act}/>)
    
    //check log in status
    if(!User.currentUser){
        console.log('U NEED TO LOGIN')
        history.push('/login')
        return(<div></div>)
    }
    


    return(
        <div>
            <h1>home</h1>
            <div>
                <h4>User logged in</h4>
                <span>first name:{User.currentUser.first_name}</span><br/>
                <span>last name:{User.currentUser.last_name}</span><br/>
                <h4>Your To Do list</h4>
                {allActions}
                 
            </div>
        </div>
    )
}

export default Main