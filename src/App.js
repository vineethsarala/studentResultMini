import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentDetails from './StudentDetails';
import Grade from './Grade';
import StudentMarks from './StudentMarks';
import StudentTable from './StudentTable';
import GradesTable from './GradesTable';
import StudentGrades from './StudentGrades';


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/StudentDetails" element={<StudentDetails />}></Route>
          <Route path="/Grade" element={<Grade />}></Route>
          <Route path="/StudentTable" element={<StudentTable />}></Route>
          <Route path="/GradesTable" element={<GradesTable />}></Route> 
          <Route path="/StudentMarks" element={<StudentMarks />}></Route>
          <Route path="/StudentGrades" element={<StudentGrades />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
