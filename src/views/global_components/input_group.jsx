import React from "react";
import "./input_group.scss";

function InputGroup(props){
    return(
        <label className="input_group">
            {props.name}
            {props.login_email ?  <a href="/">Forgot Password ?</a> : null}
            <input type={props.type} className={props.error_message.length === undefined ? "" : "wrong_input"  }/>
            {props.error_message.length < 0 ? null : <p className="error_message">{props.error_message}</p> }
        </label>
    )
}

export default InputGroup;