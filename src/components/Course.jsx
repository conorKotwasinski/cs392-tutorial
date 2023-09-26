import React from 'react';

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

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
  );
};

export default Course;
