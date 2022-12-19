import CommentItem from "./comment_item";
import React, {useState, useRef} from "react";
import {handleTextAreaKeyUp} from "../../../assets/javascript/global";
import "./message_item.scss";

function MessageItem(props){

    const [isEditActive, setEditActive] = useState(false);
    const [isAddCommentActive, setAddCommentActive] = useState(false);

    const edit_message_textarea = useRef(null);
    const update_message_btn = useRef(null);
    const post_comment_btn = useRef(null);
    const add_comment_textarea = useRef(null);

    const comment_list = [];
    let comment_count = Object.keys(props.comment_list).length;

    const toggleEdit = () =>{
        if(isEditActive){
            setEditActive(false);
        }
        else{
            edit_message_textarea.current.value = props.message_text;
            setEditActive(true);
        }
    }

    const toggleAddComment = () =>{
        if(isAddCommentActive){
            setAddCommentActive(false);
        }
        else{
            setAddCommentActive(true);
        }
    }

    const handleEditSubmit = (event) =>{
        event.preventDefault();
        toggleEdit();

        let message_text = edit_message_textarea.current.value;
        props.onEditMessage(message_text, props.message_id)
    }

    const handleAddComment = (event) =>{
        event.preventDefault()
        let text_area_value = event.target[0].value;
        props.onAddComment(text_area_value, props.message_id);
        add_comment_textarea.current.value = "";
        post_comment_btn.current.disabled = true;
        post_comment_btn.current.classList.add('disabled');
    }


    for(let comment_index in props.comment_list){
        comment_list.push(<CommentItem 
                                comment_text={props.comment_list[comment_index]} 
                                message_id={props.message_id}
                                comment_id={comment_index}
                                onEditComment={props.onEditComment}
                                onShowDeleteCommentModal={props.onShowDeleteModal}
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
                        <button type="button" className="edit_btn" onClick={toggleEdit}>
                            <span className="edit_icon"></span> 
                            Edit
                        </button> 
                    </li>
                    <li>
                        <button type="button" className="delete_btn" onClick={()=>props.onShowDeleteModal(props.message_id, "message")}>
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
                <button type="button" className="cancel_btn" onClick={toggleEdit}>Cancel</button>
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