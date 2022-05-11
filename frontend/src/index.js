import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CourseBoard  from './CourseBoard';
import CourseAssignmentUpload  from './CourseAssignmentUploadForm';
import Registration from './Registration';
import ViewSubmissions from './ViewSubmissions'

import Login from "./Login";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/*" element={<App />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/board" element={<CourseBoard />} />
        <Route exact path="/assignmentUpload" element={<CourseAssignmentUpload />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/view-submissions" element={<ViewSubmissions />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);