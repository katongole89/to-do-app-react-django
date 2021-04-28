import React , {useReducer} from "react"


const reducer = (state, action)=>{
    if(action.type ==='CHANGE_FIELD'){
        return {...state, [action.payload.name]:action.payload.value}
    }
    if(action.type ==='SHOW_ERRORS'){
        return {...state, errors:action.payload}
    }

}

const defaultState ={
    username:'',
    password:'',
    errors:{
        username:false,
        password:false
    }
}

function Login(){
    const[state, dispatch] = useReducer(reducer, defaultState)

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
        }else{
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
                <button onClick={handleSubmit}>Log in</button>
            </form>
        </div>
    )
}

export default Login