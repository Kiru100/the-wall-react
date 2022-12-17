import "./delete_modal.scss";

function DeleteMessageModal(props){

    const handleClose = () =>{
        props.onCloseModal();
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        let message_input_id = event.target[0].value;
        props.onSubmitDelete(message_input_id);
        handleClose();
    }

    return(
        <div className="delete_modal">
            <form className="modal_panel" onSubmit={handleSubmit}>
                <input type="hidden" name="message_id" value={props.message_id}/>
                <button type="button" className="close_modal_btn" onClick={handleClose}><span></span></button>
                <h2>Confirm Delete Message</h2>
                <p>Are you sure you want to delete this Message?</p>
                <p>This action cannot be undone.</p>
                <div className="modal_button_container">
                    <button type="button" onClick={handleClose}>Cancel</button>
                    <button type="submit">Yes, Remove it.</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteMessageModal;