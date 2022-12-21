import "./delete_modal.scss";
import { useDispatch } from "react-redux";
import {hideModal} from "../../../../redux/modalsSlice";
import {deleteComment} from "../../../../redux/messagesSlice";
import {useSelector} from "react-redux";

function DeleteMessageModal(props){
    const dispatch = useDispatch();
    const { comment_info_to_delete } = useSelector(state=> state.messages)

    const handleSubmitDelete = (event) =>{
        event.preventDefault();
        const message_id = event.target.message_id.value;
        const comment_id = event.target.comment_id.value;
        dispatch(deleteComment({message_id: message_id, comment_id: comment_id}));
        dispatch(hideModal("delete_comment_modal"));
    }

    return(
        <div className="delete_modal">
            <form className="modal_panel" onSubmit={handleSubmitDelete}> 
                <input type="hidden" name="message_id" value={comment_info_to_delete.message_id}/>
                <input type="hidden" name="comment_id" value={comment_info_to_delete.comment_id}/>
                <button type="button" className="close_modal_btn" onClick={()=>dispatch(hideModal("delete_comment_modal"))}><span></span></button>
                <h2>Confirm Delete Comment</h2>
                <p>Are you sure you want to delete this comment?</p>
                <p>This action cannot be undone.</p>
                <div className="modal_button_container">
                    <button type="button" onClick={()=>dispatch(hideModal("delete_comment_modal"))}>Cancel</button>
                    <button type="submit">Yes, Remove it.</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteMessageModal;