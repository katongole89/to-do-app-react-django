import React from 'react'

function ToDo(props){
    return(
        <div>
            <p>
                <span>{props.data.category}</span><br/>
                <span>{props.data.text}</span><br/>
                <input type='checkbox'checked={props.data.isDone}   onChange={()=>props.handleChecked(props.data.id)} /><br/>
                <button onClick={()=>props.handleRemove(props.data.id)}>remove</button>
            </p>

        </div>
    )
}

export default ToDo