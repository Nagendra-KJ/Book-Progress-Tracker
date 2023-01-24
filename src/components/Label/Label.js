function Label(props) {

    const labelStyle = {
        display: 'block',
        width: 200,
        color: '#fff',
        height: '100%'
    }
    return <p style={labelStyle}>{props.text}</p>;
}

export {Label};