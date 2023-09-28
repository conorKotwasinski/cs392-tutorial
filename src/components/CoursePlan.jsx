import React from 'react';

const generateCourseId = (course) => {
  return `${course.term}-${course.number}-${course.meets.replace(/\s+/g, '-')}`;
}

const CoursePlan = ({ selected }) => (
  <div className="course-plan">
    {
      selected.length === 0 ?
      <h2>No courses selected. Click on a course card to add it to your plan.</h2>
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
