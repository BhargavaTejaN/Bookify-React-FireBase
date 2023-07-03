import React,{useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import useForm from "../../customHooks/useForm";
import {useFireBaseContext} from '../../customHooks/useFireBaseContext'

import "./index.css";

const Login = () => {

  const {loginUserWithEmailAndPassword,signupUserWithGoogle,isLoggedIn}  = useFireBaseContext()

  const [formData, handleChange] = useForm({ email: "", password: "" });

  const naviagte = useNavigate();

  useEffect(() => {
    if(isLoggedIn){
        // navigate to home 
        naviagte("/")
      }
  },[naviagte,isLoggedIn])


  const submitForm = async (event) => {
    try{
      event.preventDefault()
      await loginUserWithEmailAndPassword(formData.email,formData.password);
      console.log("RESPONSE : ","LOGGED IN SUCCESSFULLY");
    }catch(error){
      console.log("ERROR WHILE SIGIN : ",error)
    }
  }

  const signinWithGoogle = async () => {
    try {
        await signupUserWithGoogle();
        console.log("RESPONSE : ","SUCCESSFULLY LOGGEDIN WITH GOOGLE");
    } catch (error) {
        console.log("ERROR WHILE LOGIN WITH GOOGLE : ",error)
    }
  }
  
  return (
    <div className="background-img-cont container mt-5">
      <Form onSubmit={submitForm}>
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="form-group" controlId="formBasicPassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button className="button" variant="primary" type="submit">
        Login
        </Button>
      </Form>
      <br/ >
      <br />
      <Button onClick={signinWithGoogle} variant="danger">Signup With Google</Button>
    </div>
  );
};

export default Login;
