import React, { useState } from 'react';
import TermSelector from './TermSelector';
import './Courses.css';
import Modal from './Modal';
import Course from './Course';
import CoursePlan from './CoursePlan';

const generateCourseId = (course) => {
  return `${course.term}-${course.number}-${course.meets.replace(/\s+/g, '-')}`;
}

const CourseList = ({ courses }) => {
 const [term, setTerm] = useState('Fall');
 const [selected, setSelected] = useState([]);
 const termCourses = Object.keys(courses)
   .filter(key => courses[key].term === term)
   .map(key => courses[key]);
 const [open, setOpen] = useState(false);
 const openModal = () => setOpen(true);
 const closeModal = () => setOpen(false);
 
 return (
  <>
    <Modal open={open} close={closeModal}>
      <CoursePlan selected={selected} />
    </Modal>
    
    <div className="d-flex justify-content-between">
      <TermSelector term={term} setTerm={setTerm} />
      <button className="ms-auto btn btn-outline-dark" onClick={openModal}>
        <i className="bi bi-cart4">Course Plan</i>
      </button>
    </div>
    
    <div className="course-list">
      {termCourses.map(course => {
        const uniqueId = generateCourseId(course);
        return <Course key={uniqueId} course={course} selected={selected} setSelected={setSelected} />;
      })}
    </div>
  </>
);
};

export default CourseList;
