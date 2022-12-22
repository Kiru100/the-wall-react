import "./input_group.scss";

function InputGroup(props){

    return(
        <label className="input_group">
            {props.label}
            {props.login_email ? <a href="/">Forgot Password ? </a> : null}
            <input  
                {...props.reference}
                type={props.input_type} 
                className={props.error_message === undefined ? "" : "wrong_input" } 
                tabIndex={props.tab_index}/>
                <p className="error_message">
                    {props.error_message ? `${props.error_message?.charAt(0).toUpperCase()}${props.error_message?.slice(1)}` : ""}
                </p>
        </label>
    )
}

export default InputGroup;