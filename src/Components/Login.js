import React from 'react'
import GoogleButton from 'react-google-button'
import { UserAuth } from '../Context/UserAuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button,Form,Alert } from 'react-bootstrap';
import { useState } from 'react';
function Login() {
    const navigate=useNavigate();
    const { signIn,googleSignIn }=UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            if(email === "admin@gmail.com") {
                navigate('/admin');
              }
              else {
                navigate('/game')
              }
        } catch (error) {
          console.log(error.message);
        }
      };

        const handleSubmit = async (e) => {
           e.preventDefault();
            setError("");
           try {
             await signIn(email, password);
             if(email === "admin@gmail.com") {
              navigate('/admin');
             }
             else {
              navigate('/game')
             }
           } catch (err) {
             setError("Invalid User");
         }
       };

  return (
    <>
    <div className="p-1 pp text-center">
      <div className="p-3 box1 text-center">
        <h2 className="mb-2">Please Login here</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="" style={{background:"rgb(238, 9, 121)"}} type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div className='mx-auto text-center'>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
          <div className="p-3 text-center  font-bold ">
            Don't have an account? <Link  to="/Signup">Sign up</Link>
          </div> 
      </div>
    </div>  
    </>
  )
}

export default Login