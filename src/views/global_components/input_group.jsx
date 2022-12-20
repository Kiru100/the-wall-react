import React from "react";
import "./input_group.scss";

function InputGroup(props){
    return(
        <label className="input_group">
            {props.label}
            {props.login_email ?  <a href="/">Forgot Password ?</a> : null}
            <input 
                type={props.input_type} 
                className={props.error_message.length === undefined ? "" : "wrong_input"  } 
                tabIndex={props.tab_index}
                name={props.input_name}/>
            {props.error_message.length < 0 ? null : <p className="error_message">{props.error_message}</p> }
        </label>
    )
}

export default InputGroup;