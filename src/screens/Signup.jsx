import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {

  const navigate = useNavigate();
  const [ credentials, setcredentials ] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });

    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert('Enter valid credentials')
    }
    if (json.success) {
      navigate("/login")
    }
  }

  const onChange = (event) => {
    //spread operator ...
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <div className='container'>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlfor="username" className="form-label">name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlfor="exampleInputlocation" className="form-label">Location</label>
          <input type="text" className="form-control" id="exampleInputlocation" name="geolocation" value={credentials.geolocation} onChange={onChange} />
        </div>

        <button type="submit" className="primarybutton btn text-white">Submit</button>
        <Link to='/login' className='m-3 btn btn-success'>Already a user</Link>
      </form>

    </div>
  )
}
