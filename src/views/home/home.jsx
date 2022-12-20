import { useState, useEffect } from "react";
import MessageItem from "./components/message_item/message_item";
import EmptyMessage from "./components/empty_message/empty_message";
import CreateMessageModal from "./modals/create_message_modal/create_message_modal";
import DeleteMessageModal from "./modals/delete_modals/delete_message_modal";
import DeleteCommentModal from "./modals/delete_modals/delete_comment_modal";
import data from "../../assets/data/message.json";
import "./home.scss";

function Home() {

    useEffect(() => {
        document.title = "The Wall | Home";
    }, []);

    let message_list = [];
    const [showCreateMessageModal, setShowCreateMessageModal] = useState(false);
    const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);

    const [messageToDelete, setMessageToDelete] = useState(0);
    const [commentToDelete, setCommentToDelete] = useState([]);

    const [message, setMessage] = useState(data);
    let message_count = Object.keys(message).length;

    const addNewMessage = (message_text_value) =>{
        const message_id = new Date().valueOf();
        setMessage((message) => ({...message, [message_id]:{message_text: message_text_value, comments:{}}}));
    }

    const addNewComment = (comment_text, message_id) =>{
        const comment_id = new Date().valueOf();
        message[message_id].comments[comment_id] = comment_text;
        setMessage({...message});   
    }

    const editMessage = (new_message, message_id) =>{
        message[message_id].message_text = new_message;
        setMessage({...message});
    }

    const editComment = (new_comment, message_id, comment_id) =>{
        message[message_id].comments[comment_id] = new_comment;
        setMessage({...message});  
    }


    const showDeleteModal = (message_id, type, comment_id = null) =>{
        if(type === "message"){
            setShowDeleteMessageModal(true);
            setMessageToDelete(message_id);
        }
        else{
            setShowDeleteCommentModal(true);
            setCommentToDelete([message_id, comment_id]);
        }
    }

    const handleDeleteMessage = (message_id) =>{
        delete message[message_id];
    }

    const handleDeleteComment = (message_id, comment_id) =>{
        delete message[message_id].comments[comment_id];
    }


    for(let message_index in message){
        message_list.push(<MessageItem
                                message_text={message[message_index].message_text}
                                comment_list={message[message_index].comments}
                                key={message_index}
                                onShowDeleteModal={showDeleteModal}
                                onEditMessage={editMessage}
                                onEditComment={editComment}
                                onAddComment={addNewComment}
                                message_id={message_index}/>);
    }

    return (
        <>
            <div className="home">
                <header>
                    <div>
                        <a href="/home"><h1>The Wall Assignment</h1></a>
                        <p>Welcome, Noel Dasco! <a href="/">Logout</a></p>
                    </div>
                </header>
                <main>
                    <div id="create_new_message_container">
                        <p><span>{message_count}</span> messages arranged latest posted</p>
                        <button type="button" 
                                id="create_new_message_btn" 
                                onClick={()=>{setShowCreateMessageModal(true)}}>Create Message</button>
                    </div>
                    <ul id="message_container">
                        {message_list.splice(0).reverse()}
                    </ul>
                    {message_count ? "" : <EmptyMessage/>}
                </main>
            </div>  
            {showCreateMessageModal ? <CreateMessageModal 
                                        onCloseModal={()=>setShowCreateMessageModal(false)} 
                                        onSubmit={addNewMessage}/> : null }
            {showDeleteMessageModal ? <DeleteMessageModal 
                                        onSubmitDelete={handleDeleteMessage}
                                        message_id={messageToDelete}
                                        onCloseModal={()=>setShowDeleteMessageModal(false)}/> : null}
            {showDeleteCommentModal ? <DeleteCommentModal 
                                        message_id={commentToDelete[0]}
                                        comment_id={commentToDelete[1]}
                                        onSubmitDelete={handleDeleteComment}
                                        onCloseModal={()=>setShowDeleteCommentModal(false)}/> : null}
        </>
    );
}
  
export default Home;
  