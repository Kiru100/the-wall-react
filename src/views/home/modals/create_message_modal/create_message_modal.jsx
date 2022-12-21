import "./create_message_modal.scss";
import React, {useRef} from "react";
import {handleTextAreaKeyUp} from "../../../../assets/javascript/global";
import { useDispatch} from "react-redux";
import { addMessage } from "../../../../redux/messagesSlice";
import { hideModal } from "../../../../redux/modalsSlice";

function CreateMessageModal(){
    const dispatch = useDispatch();
    const submit_button = useRef(null);
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        let new_message = event.target.create_message_textarea.value;
        dispatch(addMessage(new_message));
        dispatch(hideModal("create_message_modal"));
    }

    return(
        <div className="create_new_message_modal">
            <form className="modal_content" onSubmit={handleSubmit}>
                <button type="button" className="close_modal_btn" onClick={()=>dispatch(hideModal("create_message_modal"))}><span></span></button>
                <h2>Create a Message</h2>
                <textarea   
                    name="create_message_textarea" 
                    placeholder="Type your message here." 
                    className="create_message_textarea" 
                    onKeyUp={(event)=>handleTextAreaKeyUp(event, submit_button)}></textarea>
                <div className="modal_button_container">
                    <button type="button" onClick={()=>dispatch(hideModal("create_message_modal"))}>Cancel</button>
                    <button type="submit" ref={submit_button} className="disabled" disabled>Post Message</button>
                </div>
            </form>
        </div>
    )
}

export default CreateMessageModal;