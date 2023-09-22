import React, { useState } from 'react';
import TermSelector from './TermSelector';
import './Courses.css';

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  
  const termCourses = Object.keys(courses)
    .filter(key => courses[key].term === term)
    .map(key => courses[key]);

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
        {termCourses.map((course, index) => <Course key={index} course={course} />)}
      </div>
    </>
  );
};

const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-content">
        <h4 className="card-title">
          {course.term} CS {course.number}
        </h4>
        <p className="card-text">
          {course.title}
        </p>
      </div>
      <hr/>
      <p>{course.meets}</p>
    </div>
  </div>
);

export default CourseList;
