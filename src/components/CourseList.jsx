import React, { useState } from 'react';
import TermSelector from './TermSelector';
import './Courses.css';
import Modal from './Modal';
import CoursePlan from './CoursePlan';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const generateCourseId = (course) => {
  return `${course.term}-${course.number}-${course.meets.replace(/\s+/g, '-')}`;
}

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};


const days = ['M', 'Tu', 'W', 'Th', 'F'];

const daysOverlap = (days1, days2) => (
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1, course2) => {
  const course1Times = timeParts(course1.meets);
  const course2Times = timeParts(course2.meets);
  return daysOverlap(course1Times.days, course2Times.days) && hoursOverlap(course1Times.hours, course2Times.hours);
};

const courseConflict = (course1, course2) => (
  course1.term === course2.term
  && timeConflict(course1, course2)
);

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);



const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const CourseList = ({ courses, profile }) => {
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
      <AuthButton />
    </div>
    
    <div className="course-list">
      {termCourses.map(course => {
        const uniqueId = generateCourseId(course);
        return <Course key={uniqueId} course={course} selected={selected} setSelected={setSelected} profile={profile} />;
      })}
    </div>
  </>
);
};

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const Course = ({ course, selected, setSelected, profile }) => {
  const [user] = useAuthState();

  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  return (
    <div className="card m-1 p-2"
      data-cy="course"
      style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
      <div className="card-body">
        <div className="card-content">
          <h4 className="card-title">
            {course.term} CS {course.number}
          </h4>
          <p className="card-text">
            {course.title}
          </p>
        </div>
        <hr />
        <p>{course.meets}</p>
        {profile?.isAdmin && (
          <Link to={`/edit/${generateCourseId(course)}`} className="btn btn-link">
            <button type="button" className="btn btn-primary">
              <i className="bi bi-pencil"></i>
              Edit
            </button>
          </Link>
        )}

      </div>
    </div>
  );
};

export default CourseList;
