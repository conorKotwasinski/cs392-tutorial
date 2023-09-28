import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';  // Import the new form component
import 'bootstrap/dist/css/bootstrap.min.css';
import { useJsonQuery } from './utilities/fetch';

const App = () => {
  const [schedule, isLoading] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (isLoading) return <h1>Loading schedule...</h1>;

  return (
    <Router>
      <div className="container">
        <Banner title={schedule.title} />
        <Routes>
          <Route path="/" element={<CourseList courses={schedule.courses} />} />
          <Route path="/edit/:courseId" element={<CourseForm courses={schedule.courses} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
