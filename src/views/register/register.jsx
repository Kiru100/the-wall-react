import InputGroup from "../global_components/input_group";
import image_of_person from "../../assets/images/Group_2019.svg";
import React, {useEffect} from "react";
import "./register.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; 
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(50).required(),
    confirm_password: yup.string().oneOf([yup.ref("password")], null)
});

function Register() {
 
    useEffect(() =>{
        document.title = "The Wall | Sign Up";
    },[])

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmitRegisterForm = data => data ? window.location.href = "/" : "";

    return (
        <div className="register">
            <main>
                <form onSubmit={handleSubmit(onSubmitRegisterForm)} >
                    <h1>The Wall</h1>
                    <h2>Register</h2>

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
                    <InputGroup 
                        label="Confirm Password" 
                        reference={{...register('confirm_password')}}
                        input_type="password" 
                        error_message={errors.confirm_password && "password should match"} 
                        tab_index={3}/>
                    <p className="agreement">By creating an account, you agree with the Wall's <a href="/register">Privacy Policy</a> and <a href="/register">Terms of Use</a>.</p>
                    <button type="submit" formNoValidate="formnovalidate">SIGN IN</button>
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
  