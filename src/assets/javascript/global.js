const REGEX = {
    email_validation: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
}

const handleTextAreaKeyUp = (event, button) =>{
    let textarea_value = event.target.value;

    if(textarea_value.trim()){
        button.current.disabled = false;
        button.current.classList.remove("disabled");
    }
    else{
        button.current.disabled = true;
        button.current.classList.add("disabled");
    }
}

export { REGEX, handleTextAreaKeyUp };