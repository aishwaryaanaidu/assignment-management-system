-- Database: assignment-management

-- DROP DATABASE IF EXISTS "assignment-management";

CREATE DATABASE "assignment-management"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


CREATE TABLE registration (
    user_id SERIAL PRIMARY KEY,
    fname varchar(255),
    lname varchar(255),
    email_id varchar(255),
    password varchar(255),
	student boolean
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name varchar(255),
    instructor_id int REFERENCES registration(user_id),
	list_of_assignments text[]
);


CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    fname varchar(255),
    lname varchar(255),
    user_id int REFERENCES registration(user_id),
    list_of_courses text[]
);

CREATE TABLE assignment (
    assignment_id SERIAL PRIMARY KEY,
    assignment_name varchar(255),
    assignment_description varchar(255),
    course_id int REFERENCES courses(course_id)
);

CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    student_id int REFERENCES student(student_id),
    assignment_id int REFERENCES assignment(assignment_id),
    status varchar(255),
    files bytea,
    grade varchar(255)
);