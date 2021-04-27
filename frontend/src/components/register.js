import React, {useReducer, useState, useEffect} from "react"
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

const reducer = (state, action)=>{
    if(action.type==='INPUT_CHANGE'){
        const payload = action.payload
        return {...state, [payload.name]:payload.value }
    }    
    if (action.type ==='SUBMIT'){
        return{...state, submit:true}
    }
    if (action.type ==='RESET'){
        return{...state, submit:false}
    }
    
    if (action.type ==='RESET_INPUT'){
        return{...state, username:'', firstName:'', lastName:'', email:'', password:''}
    }
    if (action.type ==='CHECK_ERRORS'){
        return{...state, errors:action.payload}
    }
    if (action.type ==='RESET_ERRORS'){
        const errors = {
            email: false,
            username: false,
            firstName: false,
            lastName: false,
            password: false
        }
        return{...state, errors:errors}
    }
    if (action.type ==='SERVER_ERRORS'){
        return{...state, serverErrors:action.payload}
    }    

}

const defaultState = {
    'firstName':'',
    'lastName':'',
    'username':'',
    'email':'',
    'password': '',
    'emailInvalid': false,
    'invalidFirstName': false,
    'invalidLastName': false,
    'invalidPassword': false,
    'invalidUsername': false,
    'submit': false,
    'errors': {
        email: false,
        username: false,
        firstName: false,
        lastName: false,
        password: false
    },
    'serverErrors':{
    'usernameInUse': false,
    'specialCharacters': false}
}

function Register(){
    //set cookie
    const[User, setUser] = useCookies(['currentUser'])
    //set state
    const [state, dispatch] = useReducer(reducer, defaultState)
    let history = useHistory()

    
    function handleOnChange(event){
        dispatch({type:'INPUT_CHANGE', payload: {name:event.target.name, value:event.target.value}})
    }
    function ValidateEmail(mail){
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mail.match(mailformat)){
            return (true)
        }else{
            return (false)
        }
    }



    function handleSubmit(event){
        event.preventDefault()

        //deal with errors
        let errors = state.errors
        let noErrors = true
        for(let key in errors){
            if(key==='username'){
                if(state.username.length <6){
                    errors = {...errors, username:true}
                    noErrors = false
                }else{
                    errors = {...errors, username:false}
                }
            }
            if(key==='email'){
                const validity = ValidateEmail(state.email)
                if(!validity){
                    errors = {...errors, email:true}
                    noErrors = false
                }else{
                    errors = {...errors, email:false}
                }
            }
            if(key==='firstName'){
                if(state.firstName.length <2){
                    errors = {...errors, firstName:true}
                    noErrors = false
                }else{
                    errors = {...errors, firstName:false}
                }
            }
            if(key==='lastName'){
                if(state.lastName.length <2){
                    errors = {...errors, lastName:true}
                    noErrors = false
                }else{
                    errors = {...errors, lastName:false}
                }
            }
            if(key ==='password'){
                if(state.password.length <6){
                    errors = {...errors, password:true}
                    noErrors = false
                }else{
                    errors = {...errors, password:false}
                }
            }
                //console.log(errors[key])
            
        }

        if(noErrors){
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            let raw = JSON.stringify({"username":state.username,"password":state.password,"first_name":state.firstName,"last_name":state.lastName,"email":state.email});
            
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            
            fetch("http://127.0.0.1:8000/auth/registration/", requestOptions)
            .then(response =>response.json())
            .then(result => {
                if('auth_token' in result){
                    console.log('USER WAS REGISTERED')
                    //create cookie storing user's info---- should expire after sometime
                    setUser('currentUser', result, {
                        maxAge:3600
                    })
                    dispatch({type:'RESET_INPUT'})
                    history.push('/')
                    
                }else{
                    //server errors
                    let serverErrors = state.serverErrors
                    if('detail' in result){
                        if(result.detail === 'username in use'){
                            serverErrors ={...serverErrors, usernameInUse:true, specialCharacters:false}
                            dispatch({type:'SERVER_ERRORS', payload: serverErrors})
                        }
                        else{
                            serverErrors = {...serverErrors, specialCharacters:true, usernameInUse:false}
                            dispatch({type:'SERVER_ERRORS', payload: serverErrors})
                        }
                    }
            
                }
                                
            })
                
            .catch(error => console.log('error', error));

            
        }else{
            dispatch({type:'CHECK_ERRORS', payload:errors})
        }

//#######################################################
   
        
     
    }

    /*

    useEffect(()=>{
        console.log('push triggered')
        console.log(User['currentUser'])
        if(User['currentUser']){
            history.push('/')
        }
    }, [User])

    */

    
    return(
        <div>
            <h1>REGISTER</h1>
            <form>
                <span>Username</span><br/>
                <input placeholder='username' name='username' value={state.username} onChange={handleOnChange} /><br/>
                {state.errors.username?<div><span>invalid Username</span><br/></div>: null}
                {state.serverErrors.usernameInUse?<div><span>Username already in use</span><br/></div>: null}
                {state.serverErrors.specialCharacters?<div><span>Username must contain atleast a special Characters,a number, and a capital letter</span><br/></div>: null}
                <span>Email</span><br/>
                <input placeholder='email' name='email' value={state.email} onChange={handleOnChange}/><br/>
                {state.errors.email?<div><span>invalid Email</span><br/></div>: null}
                <span>First name</span><br/>
                <input placeholder='first name' name='firstName' value={state.firstName} onChange={handleOnChange} /><br/>
                {state.errors.firstName?<div><span>invalid first name .it must contain atleast two characters</span><br/></div>: null}
                <span>Last name</span><br/>
                <input placeholder='last name' name='lastName' value={state.lastName} onChange={handleOnChange} /><br/>
                {state.errors.lastName?<div><span>invalid last name .it must contain atleast two characters</span><br/></div>: null}
                <span>Password</span><br/>
                <input placeholder='password' name='password' value={state.password} onChange={handleOnChange} /><br/>
                {state.errors.password?<div><span>invalid password .it must contain atleast six characters</span><br/></div>: null}
                <button onClick ={handleSubmit}>Register</button>
            </form>
        </div>
    )
}
export default Register