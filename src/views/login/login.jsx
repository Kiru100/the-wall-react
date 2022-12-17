import InputGroup from "../global_components/input_group";
import image_of_person from "../../assets/images/Group_2019.svg";
import React, {useEffect, useState} from "react";
import "./login.scss";

function Login() {

    const REGEX = {
        email_validation: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    }

    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);

    useEffect(() => {
        document.title = "The Wall | Sign In";

        if(emailError === false && passwordError === false){
            window.location.href = "/home";
        }
        
    }, [emailError, passwordError]);

    const submitLoginForm = (event) => {
        event.preventDefault();
        const email_input_value = event.target[0].value;
        const password_input_value = event.target[1].value;
        
        if(!email_input_value){
            setEmailError("Email field is required.");
        }
        else if(email_input_value !== "ndasco@gmail.com"){
            setEmailError("Email field is invalid.");
        }
        else if(!email_input_value.match(REGEX.email_validation)){
            setEmailError("Email field is invalid.");
        }
        else{
            setEmailError(false);
        }

        if(!password_input_value){
            setPasswordError("Password field is required.");
        }
        else if(password_input_value!== "test123"){
            setPasswordError("Password field is invalid.");
        }
        else{
            setPasswordError(false);
        }
    }
    


    return (
        <div className="login">
            <main>
                <form onSubmit={submitLoginForm}>
                    <h1>The Wall</h1>
                    <h2>Log In</h2>
                    <InputGroup name="Email" type="email" error_message={emailError}/>
                    <InputGroup name="Password" type="password" error_message={passwordError} login_email={true}/>
                    <button type="submit">SIGN IN</button>
                    <p className="sign_up_link">I don't have an account? <a href="/register">Sign Up</a></p>
                </form>
            </main>
        <div className="image_holder">
          <img src={image_of_person} alt="A person without a face holding a brown paper" />
        </div>
      </div>
    );
  }
  
  export default Login;
  