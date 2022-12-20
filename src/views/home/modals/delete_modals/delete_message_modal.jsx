import "./delete_modal.scss";

function DeleteMessageModal(props){

    const handleSubmit = (event) =>{
        event.preventDefault();
        let message_input_id = event.target.message_id.value;
        props.onSubmitDelete(message_input_id);
        props.onCloseModal();
    }

    return(
        <div className="delete_modal">
            <form className="modal_panel" onSubmit={handleSubmit}>
                <input type="hidden" name="message_id" value={props.message_id}/>
                <button type="button" className="close_modal_btn" onClick={props.onCloseModal}><span></span></button>
                <h2>Confirm Delete Message</h2>
                <p>Are you sure you want to delete this Message?</p>
                <p>This action cannot be undone.</p>
                <div className="modal_button_container">
                    <button type="button" onClick={props.onCloseModal}>Cancel</button>
                    <button type="submit" >Yes, Remove it.</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteMessageModal;