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

const toggleEdit = (stateName, setState, textarea, text) =>{
    if(stateName){
        setState(false);
    }
    else{
        textarea.current.value = text;
        setState(true);
    }
}

export { handleTextAreaKeyUp, toggleEdit };