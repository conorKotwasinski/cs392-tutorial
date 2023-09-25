import React, { useState } from 'react';
import TermSelector from './TermSelector';
import './Courses.css';
import Modal from './Modal'
import Cart from './Cart'

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const CourseList = ({ courses }) => {
 const [term, setTerm] = useState('Fall');
 const [selected, setSelected] = useState([]);
 const termCourses = Object.keys(courses)
   .filter(key => courses[key].term === term)
   .map(key => courses[key]);
   const [coursePlanOpen, setCoursePlanOpen] = useState(false);

   const openCoursePlan = () => setCoursePlanOpen(true);
   const closeCoursePlan = () => setCoursePlanOpen(false);
 return (
   <>
     <TermSelector term={term} setTerm={setTerm} />
<button className="btn btn-outline-dark ml-auto" onClick={openCoursePlan}>
   Course Plan
</button>
     <Modal open={coursePlanOpen} close={closeCoursePlan}>
    {selected.length === 0 ? (
        <div>
            <p>No courses selected.</p>
            <p>Click on a course to select it.</p>
        </div>
    ) : (
        <ul>
            {selected.map(course => (
                <li key={course.id}>
                    {course.term} CS {course.number}: {course.title} - {course.meets}
                </li>
            ))}
        </ul>
    )}
    <button onClick={closeCoursePlan}>Close</button>
</Modal>
     <div className="course-list">
       {termCourses.map((course, index) => <Course key={index} course={course} selected={selected} setSelected={ setSelected }/>)}
     </div>
   </>
 );
};

const Course = ({ course, selected, setSelected }) => {
 const isSelected = selected.includes(course);
 const style = {
   backgroundColor: isSelected ? 'lightgreen' : 'white'
 };
 return (
 <div className="card m-1 p-2"
   style={style}
   onClick={() =>  setSelected(toggle(course, selected))}>
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
 )
};

export default CourseList;
