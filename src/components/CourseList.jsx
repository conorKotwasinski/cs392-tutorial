import React from 'react';

const Course = ({ course }) => (
  <div>
    { course.term } CS { course.number }: { course.title }
  </div>
);

const CourseList = ({ courses }) => (
  <div>
    { Object.keys(courses).map(key => <Course key={key} course={courses[key]} />) }
  </div>
);

export default CourseList;

