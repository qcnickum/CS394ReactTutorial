//import React, { useState, useEffect } from 'react';
import './App.css';
import CourseList from './components/CourseList';
import { useData } from './utilities/firebase.js';
import { timeParts } from './utilities/times.js';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

// A course looks like this:
/* {
  "id": "F101",
  "title": "Computer Science: Concepts, Philosophy, and Connections",
  "meets": "MWF 11:00-11:50"
}
*/

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const App = () => {
  const [schedule, loading, error] = useData('/', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;