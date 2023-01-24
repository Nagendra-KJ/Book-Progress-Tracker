import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import { useFormik } from "formik";
import { Card } from "react-bootstrap";

function BookInput(props) {


    const inputSchema = yup.object().shape({
        title: yup.string().required('Title is a required field'),
        totalPages: yup.number('Total Pages has to be a number').moreThan(0, 'Total Pages must be greater than 0').integer('Total Pages must be an integer').required('This is a required field'),
        pagesCompleted: yup.number('Pages Completed must be a number').moreThan(-1, 'Pages Completed must be greated than or equal to 0').integer('Pages Completed Must be an integer').required('This is a required field').max(yup.ref('totalPages'),'Pages Completed has to be lesser than Total Pages')
    });

     const submitNewBook = (values, actions) => {
        var {title, pagesCompleted, totalPages} = values;
        pagesCompleted = parseInt(pagesCompleted);
        totalPages = parseInt(totalPages);
        props.addBookHandler({title:title, pagesCompleted:pagesCompleted, totalPages:totalPages});
        actions.resetForm();
    }

    const {values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            title: "",
            pagesCompleted: 0,
            totalPages: 0
        },
        validationSchema: inputSchema,
        onSubmit: submitNewBook
    });



    return (
        <Card className="bg-dark text-light mt-3" style={{width:'50rem'}}>
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
                    <Card.Text as={Col}> Pages Completed: </Card.Text>
                    <Form.Group as={Col} md="4">
                        <Form.Control value={values.pagesCompleted} name='pagesCompleted' id='pagesCompleted' isValid={touched.pagesCompleted && !errors.pagesCompleted} onChange={handleChange} className='text-light text-center'/>
                    </Form.Group>
                </div>
                {touched.pagesCompleted && errors.pagesCompleted ? <p className='text-danger'>{errors.pagesCompleted}</p>:''}
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
        </Card>
    );
}

export {BookInput};