import InputGroup from "../global_components/input_group";
import image_of_person from "../../assets/images/Group_2019.svg";
import React, {useEffect} from "react";
import "./login.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; 
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(50).required()
});

function Login() {

    useEffect(() =>{
        document.title = "The Wall | Sign In";
    },[]);

    const submitLoginForm = data => validateData(data) ? window.location.href = "/home" : "";
    
    const validateData = data =>{
        if(data.email !== "ndasco@gmail.com"){
            setError('email', { type: 'custom', message: 'invalid email' });
            return false;
        }
        if(data.password !== "testpassword"){
            setError('password', { type: 'custom', message: 'invalid password'});
            return false;
        }
        return true;
    } 

    const { register, handleSubmit, setError , formState:{ errors }} = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <div className="login">
            <main>
                <form onSubmit={handleSubmit(submitLoginForm)}>
                    <h1>The Wall</h1>
                    <h2>Log In</h2>
                    <InputGroup 
                        reference={{...register('email')}}
                        label="Email" 
                        input_type="email" 
                        error_message={errors.email?.message} 
                        tab_index={1}/>
                    <InputGroup 
                        reference={{...register('password')}}
                        label="Password" 
                        input_type="password"         
                        error_message={errors.password?.message} 
                        tab_index={2}/>
                    <button type="submit" formNoValidate="formnovalidate">SIGN IN</button>
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
  