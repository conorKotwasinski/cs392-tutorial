import React from 'react';
import './Courses.css';

const CourseList = ({ courses }) => (
  <div className="course-list">
    {Object.keys(courses).map(key => (
      <div key={key} className="card m-1 p-2">
        <div className="card-body">
          <div className="card-content">
            <h4 className="card-title">
              {courses[key].term} CS {courses[key].number}
            </h4>
            <p className="card-text">
              {courses[key].title}
            </p>
          </div>
          <hr/>
          <p>{courses[key].meets}</p>
        </div>
      </div>
    ))}
  </div>
);


export default CourseList;

