import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field, ErrorMessage, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, status }) => {
    const [ users, setUsers ] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status])
    return (
        <div>
            <Form>
                <label htmlFor='name'>
                    Name: 
                    <Field type='text' name='name' id='name' autoComplete='name' required/>
                </label>
                <label htmlFor='email'>
                    Email: 
                    <Field type='email' name='email' id='email' autoComplete='email' required />
                </label>
                <label htmlFor='password'>
                    Password:
                    <Field type='password' name='password' id='password' autoComplete='new-password' required /> 
                </label>
                <label htmlFor='terms'>
                    Do you accept the <a href=''>Terms and Conditions</a> and <a href=''>User Agreement</a>?
                    <Field type='checkbox' name='terms' id='terms' required />
                </label>
                <button type='submit'>Submit</button>
                {touched.name && errors.name && <p>{errors.name}</p>}
                {touched.password && errors.password && <p>{errors.password}</p>}
            </Form>
            <div className='users'>
            {users.map(person => 
                <p>{JSON.stringify(person)}</p>
            )}
            </div>
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || '',
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().matches(/^[a-zA-Z\s]+$/, "Name can only be letters"),
        password: Yup.string().min(6).max(12)
    }),

    handleSubmit(values, { setStatus, resetForm, setSubmitting }) {
        axios.post('https://reqres.in/api/users', values)
             .then(response => {
                 setStatus(response.data);
                 resetForm();
                 setSubmitting(false);
                })
             .catch(error => {
                 console.log(error);
                 setSubmitting(false);
             })
    }
})(UserForm)

export default FormikUserForm;