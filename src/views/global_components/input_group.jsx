import React from "react";
import "./input_group.scss";

function InputGroup(props){

    return(
        <label className="input_group">
            {props.label}
            {props.login_email ?  <a href="/">Forgot Password ?</a> : null}
            <input  
                {...props.reference}
                type={props.input_type} 
                className={props.error_message === undefined ? "" : "wrong_input"  } 
                tabIndex={props.tab_index}/>
                <p className="error_message">{props.error_message}</p>
        </label>
    )
}

export default InputGroup;