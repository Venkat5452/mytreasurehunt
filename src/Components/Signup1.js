import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context/UserAuthContext';
import { Button,Form,Alert } from 'react-bootstrap';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      if(email==="admin@gmail.com") {
        navigate("/admin");
      }
      else {
      navigate('/game')
      }
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
    <div  className="pp">
      <div className="p-4 box">
        <h2 className="mb-3">Signup Here</h2>
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
              Sign up
            </Button>
          </div>
        </Form>
          <div className="p-3 mt-3 text-center">
            Already have an account? <Link to="/Login">Log In</Link>
          </div>
      </div>
      </div>
    </>
  );
};

export default Signup;