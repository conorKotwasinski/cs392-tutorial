import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDbData } from './utilities/firebase.js';
import { useProfile } from './utilities/profile';

const App = () => {
  
  const [profile, profileLoading, profileError] = useProfile();
  

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;
  const [schedule, error] = useDbData('/');

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (schedule === undefined) return <h1>Loading data...</h1>;
  if (!schedule) return <h1>No data found</h1>;

  return (
    <Router>
      <div className="container">
        <Banner title={schedule.title} />
        <Routes>
          <Route path="/" element={<CourseList courses={schedule.courses} profile={profile} />} />
          <Route path="/edit/:courseId" element={<CourseForm courses={schedule.courses} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
