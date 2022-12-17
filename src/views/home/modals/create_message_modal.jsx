import "./create_message_modal.scss";
import React, {useRef, useState, useEffect} from "react";

function CreateMessageModal(props){

    const [disabled, setDisabled] = useState(true);
    const submit_button = useRef(null);

    useEffect(() => {
        submit_button.current.disabled = true;
    }, []);

    const handleClose = () =>{
        props.onCloseModal();
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        props.onSubmit(event.target[1].value);
        handleClose();
    }

    const handleTextAreaKeyUp = (event) =>{
        let textarea_value = event.target.value;

        if(textarea_value.trim()){
            submit_button.current.disabled = false;
            setDisabled(false);
        }
        else{
            submit_button.current.disabled = true;
            setDisabled(true);
        }
    }

    return(
        <div className="create_new_message_modal">
            <form className="modal_content" onSubmit={handleSubmit}>
                <button type="button" className="close_modal_btn" onClick={handleClose}><span></span></button>
                <h2>Create a Message</h2>
                <textarea name="create_message_textarea" placeholder="Type your message here." className="create_message_textarea" onKeyUp={handleTextAreaKeyUp}></textarea>
                <div className="modal_button_container">
                    <button type="button" onClick={handleClose}>Cancel</button>
                    <button type="submit" ref={submit_button} className={`${disabled ? "disabled" : null}`}>Post Message</button>
                </div>
            </form>
        </div>
    )
}
export default CreateMessageModal;