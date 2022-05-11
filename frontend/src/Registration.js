import { useState } from 'react';
import './Registration.css'
import { Navigate } from 'react-router';
import Board from './CourseBoard';
import AssignmentUpload from './CourseAssignmentUploadForm';
export default function Form() {





	const [fname, setFirstName] = useState('');
	const [lname, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isStudent, setIsStudent] = useState();
	const [userId, setUserId] = useState('');

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);


	const handleFirstName = (e) => {
		setFirstName(e.target.value);
		setSubmitted(false);
	};

	const handleLastName = (e) => {
		setLastName(e.target.value);
		setSubmitted(false);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (fname === '' || email === '' || password === '') {
			setError(true);
		} else {
			setSubmitted(true);

			fetch('http://localhost:3001/api/registration', {
				method: 'POST',
				//   mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ "fname": fname, "lname": lname, "password": password, "email_id": email, "student": isStudent })
			}).then(response => response.json())
				.then(resData => {
					localStorage.setItem("userId", resData.user.user_id)
					localStorage.setItem("isStudent", isStudent)
				}).catch(error => console.log(error))

			setError(false);
		}
	};

	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h1>User {fname} successfully registered!!</h1>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? '' : 'none',
				}}>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	return (
		<div className="registration-card">
		<div className="form" style={{ paddingBottom:"6px"}}>
				<h2 style={{ paddingTop: "10px"}}>User Registration</h2>

			{/* Calling to the methods */}
			{/* <div className="messages">
				{errorMessage()}
				{successMessage()}
			</div> */}

			<form>
				{/* Labels and inputs for form data */}
				<label className="label">First Name</label>
				<input onChange={handleFirstName} className="input"
					value={fname} type="text" />

				<label className="label">Last Name</label>
				<input onChange={handleLastName} className="input"
					value={lname} type="text" />

				{/* <label className="label">PFW ID</label>
				<input className="input"
					value={userId} type="text" /> */}

				<label className="label">Email</label>
				<input onChange={handleEmail} className="input"
					value={email} type="email" />

				<label className="label">Password</label>
				<input onChange={handlePassword} className="input"
					value={password} type="password" />

				<div className="radioButtons">
					<input type="radio" className="radioBtn" name="isStudent" value="student" onChange={e => setIsStudent(true)} /> Student
					<input type="radio" className="radioBtn" name="isStudent" value="admin" onChange={e => setIsStudent(false)} /> Course Instructor

				</div>


				<div className="submitButton">
					<button onClick={handleSubmit} className="btn" type="submit">
						Submit
					</button>
				</div>
			</form>
			{
				submitted && isStudent ?        <Navigate to='/board' />
				:         submitted && !isStudent ? <Navigate to='/assignmentUpload' /> : <Navigate to='/registration' />

			}
		</div>
		</div>
	);
}
