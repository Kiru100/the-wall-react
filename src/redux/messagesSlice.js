import { createSlice } from '@reduxjs/toolkit'
import data from "../assets/data/message.json";

export const messagesSlice = createSlice({
    name: 'messages',
    initialState:{
        message: data,
        message_id_to_delete: 0,
        comment_info_to_delete: {message_id: 0, comment_id: 0}
    },
    reducers: {
        addMessage:(state, action)=>{
            const message_id = new Date().valueOf();
            state.message = {...state.message,
                                [message_id]:{message_text: action.payload, comments:{}}};
        },
        deleteMessage:(state, action)=>{
            delete state.message[action.payload];
        },
        editMessage:(state, action)=>{
            const message_id = action.payload.message_id;
            const new_message_text = action.payload.new_message_text;
            state.message[message_id].message_text = new_message_text;
        },
        editComment:(state, action)=>{
            const comment_id = action.payload.comment_id;
            const message_id = action.payload.message_id;
            const new_comment_text = action.payload.new_comment_text;
            state.message[message_id].comments[comment_id] = new_comment_text;
        },
        addComment:(state, action)=>{
            const comment_id = new Date().valueOf();
            const comment_text = action.payload.comment_text;
            const message_id = action.payload.message_id;
            state.message[message_id].comments[comment_id] = comment_text;
        },
        deleteComment:(state, action)=>{
            const message_id = action.payload.message_id;
            const comment_id = action.payload.comment_id;
            delete state.message[message_id].comments[comment_id];
        },
        setMessageToDelete:(state, action)=>{
            state.message_id_to_delete = action.payload;
        },
        setCommentToDelete:(state, action)=>{
            state.comment_info_to_delete = {message_id: action.payload.message_id, comment_id: action.payload.comment_id};
        }
    },
});

export const { addMessage, addComment, editMessage, editComment, deleteMessage, setMessageToDelete, setCommentToDelete, deleteComment } = messagesSlice.actions;
export default messagesSlice.reducer;