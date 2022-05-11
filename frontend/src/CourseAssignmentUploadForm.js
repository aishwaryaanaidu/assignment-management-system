import React, { useEffect, useState } from 'react';
import './AssignmentFormUpload.css'
function FileUploadPage() {


    const [assignmentName, setAssignmentName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [courses, setCourses] = useState([])

    const [submitted, setSubmitted] = useState(false);

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
    const handleAssignmentName = (e) => {
        setAssignmentName(e.target.value);
        setSubmitted(false);
    };

    const handleCourseId = (e) => {
        setCourseId(e.target.value)

    };

    const handleAssignmentDescription = (e) => {
        setAssignmentDescription(e.target.value);
        setSubmitted(false);
    };


    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsFilePicked(true);
    // };

    const handleSubmission = () => {
        const formData = new FormData();


        fetch('http://localhost:3001/api/assignment/create', {
            method: 'POST',
            //   mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"course_id": 1, "assignment_name": assignmentName, "assignment_description": assignmentDescription})
        }).then(response => response.json())
            .then(resData => {
                // localStorage.setItem("userId", resData.user.user_id)
                // localStorage.setItem("isStudent", resData.user.student)
                console.log("Assignment created successfully")
            }).catch(error => console.log(error))

    };
    console.log(courses);

    return (

        <div className="assignment-card">
            <h2>Upload a new assignment</h2>

            <label className="display-block labels">Assignment Name: </label>
            <input className="display-block input" style={{ width: "310px"}} onChange={handleAssignmentName}
                value={assignmentName} type="text" />

            <label className="display-block labels">Course Id: </label>
            {/* <input className="display-block" onChange={}
                value={course_id} type="text" /> */}
            {/* <select onChange={handleCourseId} style={{ width: "100px"}}>
                {!!courses && courses.length > 0 && 
                courses.map(course => {
                    <option value={course.course_id}>{course.course_name}</option> 
                    // <div>hello</div>
                })}
            </select> */}
            <select className="input" style={{ width: "323px"}}>
                    <option value="2">OS</option> 
                    <option value="1">DBMS</option>
                    <option value="3">ML</option> 
            </select>

            {/* <label className="display-block">Deadline: </label>
            <input className="display-block" onChange={handleName}
                value={userId} type="date" /> */}

            <div className="display-block" style={{ marginTop: "1%"}} className="assignmentDescription">
                <label className="labels">
                    Assignment Description:
                </label>
                <div>
                <textarea style={{ width: "323px", height: "200px"}} onChange={handleAssignmentDescription} value={assignmentDescription}/>
                </div>
                
            </div>
            {/* <div className="inputFile">
                <input type="file" name="file" onChange={changeHandler} />
                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
            </div> */}
            <div style={{ marginTop: "5px" }
        }>
                <button className="btn" onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}

export default FileUploadPage;