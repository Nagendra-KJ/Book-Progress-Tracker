import {useState} from 'react';
function TitleInput(props) {

    const [focus, setFocus] = useState(false);


    const titleInputStyle = {
        display: 'block',
        textAlign: 'center',
        fontSize: '1em',
        width: '100%',
        height: '100',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid #bec2c0',
        outline: 'none',
        //borderRadius: 100,
        minHeight: 0,
        textTransform: 'capitalize'
    }

    const titleInputStyleFocus = {
        display: 'block',
        textAlign: 'center',
        fontSize: '1em',
        width: '100%',
        height: '100',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid white',
        outline: 'none',
        //borderRadius: 100,
        minHeight: 50,
        textTransform: 'capitalize'

    }
    const customStyle = focus ? titleInputStyleFocus : titleInputStyle;

    
    return <input type="text" placeholder='Book Title' value = {props.value} onChange={props.updateTitle} style={customStyle} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}/>;
}

export {TitleInput};