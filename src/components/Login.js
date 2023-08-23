import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

export default function Login(props) {

    const {showAlert} = props;
    const navigate = useNavigate();

    const [credentail, setCredentail] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentail({ ...credentail, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

       // console.log(REACT_APP_API_URL)

        const Url = REACT_APP_API_URL+'/api/auth/login';

        try {
            const res = await fetch(Url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
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
                showAlert({type:'success',message:'Login successfully'});
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
            <div className='container mt-4'>
                <h3 className='text-center'>Please Login to Create New Notes and Display Own Notes</h3>
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
