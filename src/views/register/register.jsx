import InputGroup from "../global_components/input_group";
import image_of_person from "../../assets/images/Group_2019.svg";
import React, {useEffect, useState} from "react";
import {REGEX} from '../../assets/javascript/global';
import "./register.scss";

function Register() {

    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState(true);

    useEffect(() =>{
        document.title = "The Wall | Sign Up";
    },[])

    useEffect(() => {

        if(emailError === false && passwordError === false && confirmPasswordError === false){
            window.location.href = "/";
        }

    }, [emailError, passwordError, confirmPasswordError]);

    const submitLoginForm = (event) => {
        event.preventDefault();
        const email_input_value = event.target[0].value;
        const password_input_value = event.target[1].value;
        const confirm_password_input_value = event.target[2].value;
        
        if(!email_input_value){
            setEmailError("Email field is required.");
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
        else if(password_input_value < 8 ){
            setPasswordError("Minimum 8 character for password field.");
        }
        else{
            setPasswordError(false);
        }

        if(!confirm_password_input_value){
            setConfirmPasswordError("Confirm password field is required.");
        }
        else if(confirm_password_input_value !==  password_input_value){
            setConfirmPasswordError("Password does not match!");
        }
        else{
            setConfirmPasswordError(false);
        }
    }
    
    return (
        <div className="register">
            <main>
                <form onSubmit={submitLoginForm}>
                    <h1>The Wall</h1>
                    <h2>Register</h2>
                    <InputGroup name="Email" type="email" error_message={emailError} tab_index={1}/>
                    <InputGroup name="Password" type="password" error_message={passwordError} tab_index={2}/>
                    <InputGroup name="Confirm Password" type="password" error_message={confirmPasswordError} tab_index={3}/>
                    <p className="agreement">By creating an account, you agree with the Wall's <a href="/register">Privacy Policy</a> and <a href="/register">Terms of Use</a>.</p>
                    <button type="submit">SIGN IN</button>
                    <p className="sign_in_link">Already have an account ? <a href="/">Sign In</a></p>
                </form>
            </main>
        <div className="image_holder">
          <img src={image_of_person} alt="A person without a face holding a brown paper" />
        </div>
      </div>
    );
  }
  
  export default Register;
  