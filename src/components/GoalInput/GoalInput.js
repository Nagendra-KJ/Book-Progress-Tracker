import * as yup from "yup";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";



function GoalInput(props)   {

    const inputSchema = yup.object().shape({
        dailyPageGoal: yup.number('Daily Page Goal has to be a number').moreThan(-1, 'Daily Page Goal has to be greater than or equal to 0').required('Daily Page Goal is required'),
        weeklyPageGoal: yup.number('Weekly Page Goal has to be a number').moreThan(-1, 'Weekly Page Goal has to be greater than or equal to 0').integer('Weekly Page Goal has to be an integer').required('This is a required field'),
        annualBookGoal: yup.number('Annual Book Goal has to be a number').moreThan(-1, 'Annual Book Goal has to be greated than or equal to 0').integer('Annual Book Goal has to be an integer').required('This is a required field')
    });

    const submitNewGoal = (values, actions) => {
        var {dailyPageGoal, weeklyPageGoal, annualBookGoal} = values;
        dailyPageGoal = parseInt(dailyPageGoal);
        weeklyPageGoal = parseInt(weeklyPageGoal);
        annualBookGoal = parseInt(annualBookGoal);
        props.updateGoals({dailyPageGoal:dailyPageGoal, weeklyPageGoal:weeklyPageGoal, annualBookGoal:annualBookGoal});
        actions.resetForm();
    }

    const {values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            dailyPageGoal: props.dailyPageGoal,
            weeklyPageGoal: props.weeklyPageGoal,
            annualBookGoal: props.annualBookGoal
        },
        validationSchema: inputSchema,
        onSubmit: submitNewGoal,
        enableReinitialize:true
    });

    return(
        <Card className="bg-dark text-light mt-3" style={{width:'25rem'}}>
        <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="row mt-3 align-items-center">
            <Card.Body>
                <Card.Title className='text-center'>Your Reading Goals</Card.Title>
                <div className='row align-items-center mb-1'>
                    <Card.Text as={Col}> Daily Page Goal: </Card.Text>
                    <Form.Group as={Col} md="4">
                        <Form.Control type='text' name='dailyPageGoal' id='dailyPageGoal' isValid={touched.dailyPageGoal && !errors.dailyPageGoal} onChange={handleChange} value={values.dailyPageGoal} className='text-light text-center text-capitalize' required/>
                    </Form.Group>
                </div>
                {touched.dailyPageGoal && errors.dailyPageGoal ? <p className='text-danger'>{errors.dailyPageGoal}</p>:''}
                <div className='row align-items-center mb-1'>
                    <Card.Text as={Col}> Weekly Page Goal: </Card.Text>
                    <Form.Group as={Col} md="4">
                        <Form.Control value={values.weeklyPageGoal} name='weeklyPageGoal' id='weeklyPageGoal' isValid={touched.weeklyPageGoal && !errors.weeklyPageGoal} onChange={handleChange} className='text-light text-center'/>
                    </Form.Group>
                </div>
                {touched.weeklyPageGoal && errors.weeklyPageGoal ? <p className='text-danger'>{errors.weeklyPageGoal}</p>:''}
                <div className='row align-items-center mb-1'>
                    <Card.Text as={Col}> Annual Book Goal: </Card.Text>
                    <Form.Group as={Col} md="4">
                        <Form.Control value={values.annualBookGoal} name='annualBookGoal' id='annualBookGoal' onChange={handleChange} isValid={touched.annualBookGoal && !errors.annualBookGoal} className='text-light text-center'/>
                    </Form.Group>
                </div>
                {touched.annualBookGoal && errors.annualBookGoal ? <p className='text-danger'>{errors.annualBookGoal}</p>:''}
                <div className="col-12 text-center">
                    <Button type='submit' className="btn-primary" size='lg' style={{margin:'1em'}}> Set Goals </Button>
                    <Button type='button' className="btn-primary" size='lg' style={{margin:'1em'}} onClick={props.showProgressModal}> View Progress </Button>
                </div>
            </Card.Body>
        </Form.Group>
        </Form>
        </Card>
    );
}

export {GoalInput};