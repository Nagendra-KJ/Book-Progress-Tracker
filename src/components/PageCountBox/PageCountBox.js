import {useState} from 'react';
function PageCountBox(props) {

    const [focus, setFocus] = useState(false);

    const pageCountBoxStyle = {
        display: 'block',
        textAlign: 'center',
        fontSize: '1em',
        width: '50px',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid #bec2c0',
        outline: 'none',
        height: '100%'
    }

    const pageCountBoxStyleFocus = {
        display: 'block',
        textAlign: 'center',
        fontSize: '1em',
        width: '50px',
        color: 'white',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid white',
        outline: 'none',
        height: '100%'
    }
    const customStyle = focus ? pageCountBoxStyleFocus: pageCountBoxStyle;

    
    return <input type="text" value={props.value} onChange={props.updatePageCount} style={customStyle} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}/>;
}

export {PageCountBox};