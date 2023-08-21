import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const {showAlert} = props

  const navigate = useNavigate();

  const [signup, setSignup] = useState({ name: "", email: "", password: "", cpassword: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { password, cpassword } = signup;
    try {

      if (password === cpassword) {
        const res = await fetch('http://localhost:5000/api/auth/createuser', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            name: signup.name,
            email: signup.email,
            password: signup.password
          })
        })

        const jsondata = await res.json();
        console.log(jsondata)
        if (jsondata.success) {
          localStorage.setItem('token', jsondata.authtoken)
          navigate('/');
          showAlert({type:'success',message:'Login successfully'})
        } else {
          showAlert({type:'danger',message:'invalid credentail'})
        }
      }

    } catch (error) {
      console.log(error.message);
      showAlert({type:'danger',message:'invalid credentail'})
    }

  }

  return (
    <div className='container mt-4'>
      <h1 className='text-center'>Please SIngup to Create Own Notes</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name="name" required={true} placeholder="Enter Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name="email" required={true} placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} required={true} minLength={5} name="password" placeholder="Password" autoComplete='On' />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} required={true} minLength={5} name="cpassword" placeholder="Password" autoComplete='On' />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}
