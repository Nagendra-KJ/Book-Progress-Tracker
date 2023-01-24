
function ProgressBar(props) {

    const containerStyles = {
        height: 20,
        width: 200,
        backgroundColor: "#6e7175",
        borderRadius: 100,
        margin: 5
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${props.completed}%`,
        backgroundColor: props.bgColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out'
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }

      return (
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}>{`${props.completed}%`}</span>
          </div>
        </div>
      );
}

export {ProgressBar};