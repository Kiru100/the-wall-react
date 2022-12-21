import "./delete_modal.scss";
import {useDispatch} from "react-redux";
import {hideModal} from "../../../../redux/modalsSlice";
import {deleteMessage} from "../../../../redux/messagesSlice";
import {useSelector} from "react-redux";

function DeleteMessageModal(){
    const dispatch = useDispatch();
    const { message_id_to_delete } = useSelector(state => state.messages);

    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch(deleteMessage(message_id_to_delete));
        dispatch(hideModal("delete_message_modal"));
    }

    return(
        <div className="delete_modal">
            <form className="modal_panel" onSubmit={handleSubmit}>
                <input type="hidden" name="message_id" value={message_id_to_delete}/>
                <button type="button" className="close_modal_btn" onClick={()=>{dispatch(hideModal("delete_message_modal"))}}><span></span></button>
                <h2>Confirm Delete Message</h2>
                <p>Are you sure you want to delete this Message?</p>
                <p>This action cannot be undone.</p>
                <div className="modal_button_container">
                    <button type="button" onClick={()=>{dispatch(hideModal("delete_message_modal"))}}>Cancel</button>
                    <button type="submit" >Yes, Remove it.</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteMessageModal;