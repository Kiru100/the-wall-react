import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from "./messagesSlice";
import modalsReducer from "./modalsSlice";

export const store = configureStore({
    reducer: {
        messages: messagesReducer,
        modals: modalsReducer
    }
});