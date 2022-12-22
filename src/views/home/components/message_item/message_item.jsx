import "./message_item.scss";
import CommentItem from "../comment_item/comment_item";
import React, {useState, useRef} from "react";
import {handleTextAreaKeyUp, toggleEdit} from "../../../../assets/javascript/helpers";
import {useDispatch} from "react-redux";
import {addComment, editMessage, setMessageToDelete} from "../../../../redux/messagesSlice";
import {showModal} from "../../../../redux/modalsSlice";

function MessageItem(props){
    const dispatch = useDispatch();

    const [isEditActive, setEditActive] = useState(false);
    const [isAddCommentActive, setAddCommentActive] = useState(false);

    const edit_message_textarea = useRef(null);
    const update_message_btn = useRef(null);
    const post_comment_btn = useRef(null);
    const add_comment_textarea = useRef(null);

    const comment_list = [];
    let comment_count = Object.keys(props.comment_list).length;

    const toggleEditMessage = () =>{
        toggleEdit(isEditActive, setEditActive, edit_message_textarea, props.message_text);
    }

    const toggleAddComment = () =>{
        isAddCommentActive ? setAddCommentActive(false) : setAddCommentActive(true);
    }

    const showDeleteMessageModal = () =>{
        dispatch(showModal("delete_message_modal"))
        dispatch(setMessageToDelete(props.message_id))
    }

    const handleEditSubmit = (event) =>{
        event.preventDefault();
        let new_message_text = edit_message_textarea.current.value;
        dispatch(editMessage({message_id: props.message_id, new_message_text: new_message_text}));
        toggleEditMessage();
    }

    const handleAddComment = (event) =>{
        event.preventDefault();
        let text_area_value = event.target.new_comment_form_textarea.value;
        dispatch(addComment({message_id: props.message_id, comment_text: text_area_value}));
        resetForm();
    }

    const resetForm = () =>{
        add_comment_textarea.current.value = "";
        post_comment_btn.current.disabled = true;
        post_comment_btn.current.classList.add('disabled');
    }

    for(let comment_index in props.comment_list){
        comment_list.push(<CommentItem 
                                comment_text={props.comment_list[comment_index]} 
                                message_id={props.message_id}
                                comment_id={comment_index}
                                key={comment_index}/>)
    }
    
    return(
        <li className="message_item">
            <div className={`message_wrapper ${isEditActive ? "hidden" : ""}`}>
                <p className="message_text">
                    {props.message_text}
                </p>
                <ul className="buttons_container" >
                    <li>
                        <button type="button" className={`comment_btn ${comment_count ? "active" : ""}`} onClick={toggleAddComment}>
                            <span className="comment_icon"></span>  
                            <span className="message_count">{comment_count}</span> comment
                        </button>
                    </li>
                    <li>
                        <button type="button" className="edit_btn" onClick={toggleEditMessage}>
                            <span className="edit_icon"></span> 
                            Edit
                        </button> 
                    </li>
                    <li>
                        <button type="button" className="delete_btn" onClick={showDeleteMessageModal}>
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
            <form className={`edit_message_form ${isEditActive ? "" : "hidden"}`} onSubmit={handleEditSubmit}>
                <textarea 
                    name="edit_message_textarea" 
                    className="edit_message_textarea"
                    placeholder="Type your message here." 
                    ref={edit_message_textarea}
                    onKeyUp={(event)=>handleTextAreaKeyUp(event, update_message_btn)}></textarea>
                <button type="button" className="cancel_btn" onClick={toggleEditMessage}>Cancel</button>
                <button type="submit" ref={update_message_btn}>Update Message</button>
            </form>
            <form className={`new_comment_form ${isAddCommentActive ? "" : "hidden"}`} onSubmit={handleAddComment}>
                <textarea 
                    name="new_comment_form_textarea" 
                    className="new_comment_form_textarea"
                    placeholder="Type your comment here." 
                    onKeyUp={(event)=>handleTextAreaKeyUp(event, post_comment_btn)}
                    ref={add_comment_textarea}></textarea>
                <button type="submit" ref={post_comment_btn} className="disabled" disabled>Post Comment</button>
            </form>
            <ul className={`comment_container ${isAddCommentActive ? "" : "hidden"}`}>
                {comment_list.splice(0).reverse()}
            </ul>
        </li>
    )
}

export default MessageItem;