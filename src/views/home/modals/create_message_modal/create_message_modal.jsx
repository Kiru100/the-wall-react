import "./create_message_modal.scss";
import React, {useRef} from "react";
import {handleTextAreaKeyUp} from "../../../../assets/javascript/global";

function CreateMessageModal(props){

    const submit_button = useRef(null);

    const handleSubmit = (event) =>{
        event.preventDefault();
        props.onSubmit(event.target.create_message_textarea.value);
        props.onCloseModal();
    }

    return(
        <div className="create_new_message_modal">
            <form className="modal_content" onSubmit={handleSubmit}>
                <button type="button" className="close_modal_btn" onClick={props.onCloseModal}><span></span></button>
                <h2>Create a Message</h2>
                <textarea   
                    name="create_message_textarea" 
                    placeholder="Type your message here." 
                    className="create_message_textarea" 
                    onKeyUp={(event)=>handleTextAreaKeyUp(event, submit_button)}></textarea>
                <div className="modal_button_container">
                    <button type="button" onClick={props.onCloseModal}>Cancel</button>
                    <button type="submit" ref={submit_button} className="disabled" disabled>Post Message</button>
                </div>
            </form>
        </div>
    )
}

export default CreateMessageModal;