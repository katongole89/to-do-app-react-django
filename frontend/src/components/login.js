import React , {useReducer} from "react"
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'


const reducer = (state, action)=>{
    if(action.type ==='CHANGE_FIELD'){
        return {...state, [action.payload.name]:action.payload.value}
    }
    if(action.type ==='SHOW_ERRORS'){
        return {...state, errors:action.payload}
    }
    if(action.type ==='INVALID_CRUDENTIALS'){
        return {...state, invalidCrudentials:action.payload}
    }
    if(action.type ==='RESET_INPUT'){
        return {...state, username:'', password:'', errors:{username:false, password:false}, invalidCrudentials:false}
    }
    
}

const defaultState ={
    username:'',
    password:'',
    errors:{
        username:false,
        password:false
    },
    invalidCrudentials:false
}

function Login(){
    const[state, dispatch] = useReducer(reducer, defaultState)
    let history = useHistory()
    const[User, setUser] = useCookies(['currentUser'])

    function handleOnChange(event){
        dispatch({type:'CHANGE_FIELD',payload:{name:event.target.name, value:event.target.value}})
    }
    function handleSubmit(event){
        event.preventDefault()
        let errors = state.errors
        let noErrors = true
        for (let key in errors){
            if(key==='username'){
                if(!state.username){
                    errors = {...errors, username:true}
                    noErrors = false
                }else{
                    errors = {...errors, username:false}
                }
            }
            if(key==='password'){
                if(!state.password){
                    errors = {...errors, password:true}
                    noErrors = false
                }else{
                    errors = {...errors, password:false}
                }
            }
                
        }

        if(noErrors){
            console.log('LOGIN SUCCESS')
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            let raw = JSON.stringify({"username":state.username,"password":state.password});
            
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            
            fetch("http://127.0.0.1:8000/auth/login/", requestOptions)
            .then(response =>response.json())
            .then(result => {
                if('auth_token' in result){
                    console.log('USER LOGGED IN SUCCESSFULLY')
                    //create cookie storing user's info---- should expire after sometime
                    setUser('currentUser', result, {
                        maxAge:3600
                    })
                    dispatch({type:'RESET_INPUT'})
                    history.push('/')
                    
                }else{
                    //server errors
                    if('detail' in result){
                        dispatch({type:'INVALID_CRUDENTIALS', payload:true})
                        dispatch({type:'SHOW_ERRORS', payload:{
                            username:false,
                            password:false
                        }})
                    }
                }
                                
            })                
            .catch(error => console.log('error', error));
            
        }else{
            dispatch({type:'INVALID_CRUDENTIALS', payload:false})            
            dispatch({type:'SHOW_ERRORS', payload:errors})
        }
    }

    return(
        <div>
            <h1>LOGIN</h1>

            <form>
                <span>username</span><br/>
                <input value={state.username} name='username' onChange={handleOnChange}/><br/>
                {state.errors.username? <div><span>required</span><br/></div>: null}
                <span>password</span><br/>
                <input value={state.password} name='password' onChange={handleOnChange} /><br/>
                {state.errors.password? <div><span>required</span><br/></div>: null}
                {state.invalidCrudentials? <div><span>INVALID CRUDENTIALS</span><br/></div>: null}
                <button onClick={handleSubmit}>Log in</button>
            </form>
        </div>
    )
}

export default Login