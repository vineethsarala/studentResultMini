import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigationbar from './Navigationbar';
import './StudentGrades.css';

const StudentGrades = () => {
  const [studentData, setStudentData] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [grades, setGrades] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const studentsResponse = await axios.get('http://127.0.0.1:8000/stud/Marks/');
        setStudentIds(studentsResponse.data.map(student => student.studentNumber));
        console.log('studentIds: ', studentsResponse.data);

      
        const gradesResponse = await axios.get('http://127.0.0.1:8000/ranks/Grades/');
        setGrades(gradesResponse.data);
        console.log('grades: ', gradesResponse.data);

      } catch (error) {
        console.error('There was an error fetching data!', error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async () => {
    if (!selectedStudentId) {
      console.error('No student ID selected');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/stud/Marks/');
      const output = response.data;
      const filteredOutput = output.find((item) => item.studentNumber == selectedStudentId);

      if (filteredOutput) {console.log(filteredOutput);
        const gradedData = {
          studentNumber: filteredOutput.studentNumber,
          subject1: getGrade(filteredOutput.subject1),
          
          subject2: getGrade(filteredOutput.subject2),
          subject3: getGrade(filteredOutput.subject3),
          subject4: getGrade(filteredOutput.subject4),
          subject5: getGrade(filteredOutput.subject5),
          subject6: getGrade(filteredOutput.subject6),
        };
        setStudentData([gradedData]);
      } else {
        console.error('No data found for the selected student ID');
        setStudentData([]);
      }

    } catch (error) {
      console.error(`There was an error fetching data for student ${selectedStudentId}!`, error);
    }
  };


  const getGrade = (marks) => {
    for (const grade of grades) {
      if (marks >= grade.marklevelstart && marks <= grade.marklevelend) {
        return grade.grade;
      }
    }
    return 'No Grade';
  };

  return (
    <div>
      <div><Navigationbar /></div>
      <div className='studentgradesbody'>
    
      <label htmlFor="studentId">Select Student ID:</label>
      <select
        id="studentId"
        value={selectedStudentId}
        onChange={(e) => setSelectedStudentId(e.target.value)}
      >
        <option value="">Select Student ID</option>
        {studentIds.map(studentNumber => (
          <option key={studentNumber} value={studentNumber}>
            {studentNumber}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit</button>
      <h3>Student Marks and Grades:</h3>
      </div>
      <div>
        
        <table className='studentGradestable'>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentData.length > 0 ? (
              <>
                <tr>
                  <td>Subject 1</td>
                  <td>{studentData[0].subject1}</td>
                </tr>
                <tr>
                  <td>Subject 2</td>
                  <td>{studentData[0].subject2}</td>
                </tr>
                <tr>
                  <td>Subject 3</td>
                  <td>{studentData[0].subject3}</td>
                </tr>
                <tr>
                  <td>Subject 4</td>
                  <td>{studentData[0].subject4}</td>
                </tr>
                <tr>
                  <td>Subject 5</td>
                  <td>{studentData[0].subject5}</td>
                </tr>
                <tr>
                  <td>Subject 6</td>
                  <td>{studentData[0].subject6}</td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentGrades;
