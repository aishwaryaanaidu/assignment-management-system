import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { Navigate } from 'react-router';
import Card from '@mui/material/Card';



export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);


  const handleSubmit = async e => {
    fetch('http://localhost:3001/api/login', {
				method: 'POST',
				//   mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"password": password, "email_id": username})
			}).then(response => response.json())
				.then(resData => {
					localStorage.setItem("userId", resData.user_id)
					localStorage.setItem("isStudent", resData.student)
          setSuccess(true);
				}).catch(error => console.log(error))

  }

  return (
    <>
        <div className="login-card">
        <div className="container">
          <h2 style={{ margin: "7px"}}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="labels">
                <p>Username</p>
                <input placeholder="Username" className="input" type="text" onChange={e => setUserName(e.target.value)} />
                <p>Password</p>
                <input placeholder="Password" className="input" type="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="submitButton">
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
        </div>

        {
				success && localStorage.getItem("isStudent") == "true" ? <Navigate to='/board' />
				:      success && localStorage.getItem("isStudent") == "false" ? <Navigate to='/assignmentUpload' /> : <Navigate to='/login' />

			}
    </>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
};