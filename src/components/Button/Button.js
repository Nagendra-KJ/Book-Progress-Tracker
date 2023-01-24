import { useState } from "react";
function Button(props) {

    const [focus, setFocus] = useState(false);

    const buttonStyle = {
        display: 'block',
        minHeight: 40,
        minWidth: 100,
        backgroundColor: props.bgColor,
        color: 'white',
        border: 'none',
        height: '100%'
    }

    const buttonStyleFocus = {
        display: 'block',
        minHeight: 40,
        minWidth: 100,
        backgroundColor: props.bgColorHover,
        color: 'white',
        border: 'none',
        height: '100'
    }


    const customStyle = focus ? buttonStyleFocus:buttonStyle;
    return <button type="button" onClick={props.onClick} style={customStyle} onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>{props.text}</button>;
}

export {Button};