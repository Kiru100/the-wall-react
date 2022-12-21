import "./home.scss";
import { useEffect } from "react";
import MessageItem from "./components/message_item/message_item";
import EmptyMessage from "./components/empty_message/empty_message";
import CreateMessageModal from "./modals/create_message_modal/create_message_modal";
import DeleteMessageModal from "./modals/delete_modals/delete_message_modal";
import DeleteCommentModal from "./modals/delete_modals/delete_comment_modal";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../redux/modalsSlice";

function Home() {

    useEffect(() => {
        document.title = "The Wall | Home";
    }, []);

    const dispatch = useDispatch();
    const { message } = useSelector(state => state.messages);
    const { modals } = useSelector(state => state);
    let message_list = [];
    let message_count = Object.keys(message).length;

    for(let message_index in message){
        message_list.push(<MessageItem
                                message_text={message[message_index].message_text}
                                comment_list={message[message_index].comments}
                                key={message_index}
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
                        <button type="button" id="create_new_message_btn" onClick={()=>dispatch(showModal("create_message_modal"))}>Create Message</button>
                    </div>
                    <ul id="message_container">
                        {message_list.splice(0).reverse()}
                    </ul>
                    {message_count ? null : <EmptyMessage/>}
                </main>
            </div>  
            { modals.create_message_modal ? <CreateMessageModal /> : null }
            { modals.delete_message_modal ? <DeleteMessageModal /> : null}
            { modals.delete_comment_modal ? <DeleteCommentModal /> : null}
        </>
    );
}
  
export default Home;
  