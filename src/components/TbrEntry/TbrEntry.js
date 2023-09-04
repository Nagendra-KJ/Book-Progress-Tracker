import { Button } from "react-bootstrap";




function TbrEntry(props) {

    return (
      <div className="row" style={{margin:"5px"}}>
        <p className="col" style={{margin:"5px"}}>{props.tbr.title}</p>
        <Button className="col" variant="outline-success btn-block" style={{margin:"5px"}} onClick={props.updateHandler}>Add to Read</Button>
        <Button className="col" variant="outline-danger btn-block" style={{margin:"5px"}} onClick={props.deleteHandler}>Delete</Button>
      </div>
    );
}

export {TbrEntry};