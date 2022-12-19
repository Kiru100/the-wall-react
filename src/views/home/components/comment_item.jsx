import React,{useState, useRef} from "react";
import {handleTextAreaKeyUp, toggleEdit} from "../../../assets/javascript/global";

function CommentItem(props){

    const [isEditActive, setEditActive] = useState(false);
    const edit_comment_textarea = useRef(null);
    const update_comment_btn = useRef(null);

    const showDeleteModal = () =>{
        props.onShowDeleteCommentModal(props.message_id, "comment", props.comment_id);
    }

    const handleEditSubmit = (event) =>{
        event.preventDefault();
        let comment_text = edit_comment_textarea.current.value;
        props.onEditComment(comment_text, props.message_id, props.comment_id);
        toggleEditComment();
    }

    const toggleEditComment = () =>{
        toggleEdit(isEditActive, setEditActive, edit_comment_textarea, props.comment_text);
    }

    return(
        <li className="comment_item">
            <div className={`comment_wrapper ${isEditActive ? "hidden" : ""}`}>
                <p className="comment_text">
                    {props.comment_text}
                </p>
                <ul className="buttons_container">
                    <li>
                        <button type="button" className="edit_btn" onClick={toggleEditComment}>
                            <span className="edit_icon"></span> 
                            Edit
                        </button> 
                    </li>
                    <li>
                        <button type="button" className="delete_btn" onClick={showDeleteModal}>
                            <span className="delete_icon"></span>
                            Delete 
                        </button> 
                    </li>
                    <li>
                        <div className="time_ago">
                            <span className="user_icon"></span> 
                            <span className="user_name">You</span> - Few seconds ago
                        </div>
                    </li>
                </ul>
            </div>
            <form className={`edit_comment_form ${isEditActive ? "" : "hidden"}`} onSubmit={handleEditSubmit} method="POST">
                <textarea 
                    name="edit_message_textarea" 
                    className="edit_message_textarea"
                    placeholder="Type your message here."
                    onKeyUp={(event)=>handleTextAreaKeyUp(event, update_comment_btn)}
                    ref={edit_comment_textarea}></textarea>
                <button type="button" className="cancel_btn" onClick={toggleEditComment}>Cancel</button>
                <button type="submit" ref={update_comment_btn} className="disabled" disabled>Update Comment</button>
            </form>
        </li>
    )
}

export default CommentItem;