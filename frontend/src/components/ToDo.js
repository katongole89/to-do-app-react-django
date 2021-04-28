import React from 'react'

function ToDo(props){
    return(
        <div>
            <p>
                <span>{props.data.category}</span><br/>
                <span>{props.data.text}</span><br/>
                <input type='checkbox'/><br/>
                <button>remove</button>
            </p>

        </div>
    )
}

export default ToDo