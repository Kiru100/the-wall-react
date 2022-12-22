import { createSlice } from '@reduxjs/toolkit'

export const modalsSlice = createSlice({
    name: 'modals',
    initialState:{
        delete_comment_modal: false,
        delete_message_modal: false,
        create_message_modal: false
    },
    reducers: {
        showModal:(state, action)=>{
            state[action.payload] = true;
        },
        hideModal:(state, action)=>{
            state[action.payload] = false;
        }
    },  
});

export const { hideModal, showModal } = modalsSlice.actions;
export default modalsSlice.reducer;