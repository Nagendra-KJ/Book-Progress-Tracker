import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { Card, Form } from 'react-bootstrap';
import { useState } from 'react';




function BookData(props) {

    const [pagesRead, setPagesRead] = useState(props.pagesCompleted);

    const onPagesUpdate = (event) => {
        var newPages = event.target.value.replace(/\D/g, '');
        if (newPages === '')
            newPages = 0;
        newPages = parseInt(newPages);
        if (newPages <= props.totalPages)
            setPagesRead(newPages);
    }

    const updatePages = () => {
        props.updatePageCount(pagesRead);
    }

    const completeBook = () => {
        props.updatePageCount(props.totalPages);
        setPagesRead(props.totalPages);
        
    }

    return (
        <div className='container mt-3' style={{width: '25rem',}}>
            <Card className='text-light bg-dark'>
                <Card.Header className='text-center text-capitalize'>
                    Currently Reading
                </Card.Header>
                <Card.Body>
                    <Card.Title className='text-center text-capitalize'>
                        {props.title}
                    </Card.Title>
                    <div className='row align-items-center mb-1'>
                        <div className="col">
                            <Card.Text>Pages Completed</Card.Text>
                        </div>
                        <div className="col">
                            <Form.Control type='text' value={pagesRead} onChange={onPagesUpdate} className='input-sm text-center bg-dark text-light'/>
                        </div>
                    </div>
                    <div className="row align-items-center mb-1">
                        <div className="col">
                            <Card.Text>Total Pages</Card.Text>
                        </div>
                        <div className="col">
                            <Card.Text className="text-center">{props.totalPages}</Card.Text>
                        </div>
                    </div>
                    <div className='row align-items-center mb-3'>
                        <div className='col'>
                            <Card.Text>Pages Remaining</Card.Text>
                        </div>
                        <div className='col'>
                            <Card.Text className="text-center">{props.totalPages - props.pagesCompleted}</Card.Text>
                        </div>
                    </div>
                    <div className='row mb-3'>
                            <ProgressBar now={Math.trunc((props.pagesCompleted/props.totalPages)*100)} variant='success' label={Math.trunc((props.pagesCompleted/props.totalPages)*100)+'%'} min={0} max={100}/>
                    </div>
                    <div className='row gap-2'>
                            <Button variant='outline-secondary btn-block' onClick={updatePages} size='lg'> Update </Button>
                            <Button variant='outline-success btn-block' onClick={completeBook} size='lg'> Complete </Button>
                            <Button variant='outline-danger btn-block' onClick={props.deleteHandler} size='lg'> Delete </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export {BookData};