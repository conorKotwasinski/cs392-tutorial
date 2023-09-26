import React from 'react';

const generateCourseId = (course) => {
  return `${course.term}-${course.number}-${course.meets.replace(/\s+/g, '-')}`;
}

const CoursePlan = ({ selected }) => (
  <div className="course-plan">
    {
      selected.length === 0 ?
      <h2>The course plan is empty. 
          Select courses by clicking the 
          course card.</h2>
      : selected.map(course => {
          const uniqueId = generateCourseId(course);
          return(
              <div key={uniqueId}>
                  CS {course.number}: {course.title}, {course.meets}
              </div>
          );
      })
    }
  </div>
);

export default CoursePlan;
