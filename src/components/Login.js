import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";

export default function Login(props) {

    const {showAlert} = props;
    const navigate = useNavigate();

    const [credentail, setCredentail] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentail({ ...credentail, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(credentail)

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentail.email,
                    password: credentail.password
                })
            })

            const jsondata = await res.json();
            console.log(jsondata)
            if(jsondata.success){
                localStorage.setItem('token',jsondata.authtoken)
                navigate('/');
                showAlert({type:'success',message:'Login successfully'})
            }else{
               // alert("invalid credential");
                showAlert({type:'danger',message:'invalid credentail'})
            }
            

        } catch (error) {
            console.log(error.message);
            showAlert({type:'danger',message:error.message})
        }

    }

    return (
        <div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" onChange={handleChange} name="email" aria-describedby="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" onChange={handleChange} id="password" name="password" placeholder="Password" autoComplete="on" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
