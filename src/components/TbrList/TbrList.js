import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import { useFormik } from "formik";
import { Card } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';


function TbrList(props) {


    const inputSchema = yup.object().shape({
        title: yup.string().required('Title is a required field'),
        totalPages: yup.number('Total Pages has to be a number').moreThan(0, 'Total Pages must be greater than 0').integer('Total Pages must be an integer').required('This is a required field'),
    });

     const submitNewBook = (values, actions) => {
        var {title, totalPages} = values;
        totalPages = parseInt(totalPages);
        props.addTbrHandler({title:title, totalPages:totalPages});
        actions.resetForm();
    }

    const {values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            title: "",
            totalPages: 0,
        },  
        validationSchema: inputSchema,
        onSubmit: submitNewBook
    });



    return (
        <Modal 
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Body className="bg-dark">
                <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="row mt-3 align-items-center">
                    <Card.Body>
                        <Card.Title className='text-center'>Enter Book Details</Card.Title>
                        <div className='row align-items-center mb-1'>
                            <Card.Text as={Col}> Title: </Card.Text>
                            <Form.Group as={Col} md="4">
                                <Form.Control type='text' name='title' id='title' isValid={touched.title && !errors.title} onChange={handleChange} value={values.title} className='text-light text-center text-capitalize' required/>
                            </Form.Group>
                        </div>
                        {touched.title && errors.title ? <p className='text-danger'>{errors.title}</p>:''}
                        <div className='row align-items-center mb-1'>
                            <Card.Text as={Col}> Total Number of Pages: </Card.Text>
                            <Form.Group as={Col} md="4">
                                <Form.Control value={values.totalPages} name='totalPages' id='totalPages' onChange={handleChange} isValid={touched.totalPages && !errors.totalPages} className='text-light text-center'/>
                            </Form.Group>
                        </div>
                        {touched.totalPages && errors.totalPages ? <p className='text-danger'>{errors.totalPages}</p>:''}
                        <div className="col-12 text-center">
                            <Button type='submit' className="btn-primary" size='lg'> Add </Button>
                        </div>
                    </Card.Body>
                </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export {TbrList};