import empty_message_icon from  "../../../../assets/images/vector.png";
import "./empty_message.scss"

function EmptyMessage(){
    return(
        <div id="empty_message_container">
            <img src={empty_message_icon} alt="Blue empty message"/>
            <p>No Posted Message Yet.</p>
        </div>
    )
}
export default EmptyMessage;