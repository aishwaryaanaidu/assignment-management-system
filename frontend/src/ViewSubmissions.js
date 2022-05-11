import React, { useState, useEffect } from 'react'
import Base64Downloader from 'react-base64-downloader';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./ViewSubmissions.css"

function ViewSubmissions() {
    const [submissions, setSubmissions] = useState([])
    const [courses, setCourses] = useState([])
    const [base64, setBase64] = useState()

    useEffect(() => {
        fetch(`http://localhost:3001/api/courses/get_courses/${localStorage.getItem("userId")}`, {
            method: 'GET',
            //   mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(resData => {
                setCourses(resData.courses)
            }).catch(error => console.log(error))
    }, [])

    const handleCourseChange = e => {
        fetch(`http://localhost:3001/api/courses/get_assignments/${e.target.value}`, {
            method: 'GET',
            //   mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(resData => {
                setSubmissions(resData.courses)
            }).catch(error => console.log(error))
    }

    const handleDownload = (assignment_id) => {
        fetch(`http://localhost:3001/api/courses/get_assignments_data/${assignment_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.blob())
            .then(resData => {
                setBase64(resData.fileData)
            }).catch(error => console.log(error))
    }
    console.log(courses);
    return (
        <>
        <select className="submissions-input" onChange={handleCourseChange}>
                {/* {courses.map((course) => { */}
                <option value="2">OS</option> 
                    <option value="1">DBMS</option>
                    <option value="3">ML</option> 

                {/* })} */}
            </select>
        <div className="submissions-card">
            {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleCourseChange}
            >
                {courses.map((course) => {
                <MenuItem value={course.course_id}>{course.name}</MenuItem>
            })}
            </Select> */}
            
            <div className="ViewSubmissions">
                <table className="AssignmentTable">
                    <tr>
                        <th>Assignment ID </th>
                        <th>Assignment Name </th>
                        <th>Student Name </th>
                        <th>Status </th>
                        <th>Files </th>
                    </tr>
                    {submissions.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.assignment_id}</td>
                                <td>{val.assignment_name}</td>
                                <td>{val.fname + " " + val.lname}</td>
                                <td>{val.status}</td>
                                <td>
                                    {/* <Base64Downloader base64={base64} downloadName="Assignment">
                                        Download Assignment
                                    </Base64Downloader> */}
                                    <a target="_blank" href={require("./Homework-1.pdf")}>Download</a>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
        </>
    )
}
export default ViewSubmissions;