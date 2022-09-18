// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
// import useMutation from Apollo 
import { useMutation } from '@apollo/client';
// import the ADD_USER mutation. 
import { LOG_IN } from '../utils/mutations';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // set mutation react hook for the ADD_USER mutation.
  const [loginUser, { error }] = useMutation(LOG_IN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Returns: 
      // {
      //   "data": {
      //     "login": {
      //       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVXNlcjYiLCJlbWFpbCI6IlVzZXI2QGVtYWlsLmNvbSIsIl9pZCI6IjYzMjU2MjA0ODlhYTIzZjc1Yzc2MzgwNCJ9LCJpYXQiOjE2NjM0OTA3NjAsImV4cCI6MTY2MzQ5Nzk2MH0.FzqmR1LvXbAWi_Zb-Wss1Ay0sxIyuRMwPEOOYUiqx6A",
      //       "user": {
      //         "_id": "6325620489aa23f75c763804",
      //         "username": "User6",
      //         "email": "User6@email.com"
      //       }
      //     }
      //   }
      // }     
      const response = await loginUser({
        variables: {
          "email": userFormData.email,
          "password": userFormData.password
        },
      });

      console.log(response.data);
      Auth.login(response.data.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
