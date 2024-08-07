import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FaEdit,FaTrashAlt} from 'react-icons/fa';
import Navigationbar from './Navigationbar';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Student/')
      .then(response => setStudents(response.data))
      .catch(error => console.error('There was an error fetching the data!', error));
  }, []);

  const handleAddMarks = (studentNumber) => {
    navigate('/StudentMarks', { state: { formData: { studentNumber } } });
  };

  const handleEdit = (student) => {
    navigate('/StudentDetails', { state: { formData: student } });
  };

  const handleDelete = (student) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete student "${student.studentNumber}"?`);
    if (confirmDelete) {
      
      axios.delete(`http://127.0.0.1:8000/app/Student/${student.studentNumber}/`)
        .then(() => {
          console.log('Student and marks deleted successfully:', student.studentNumber);
          setStudents(students.filter(s => s.studentNumber !== student.studentNumber));
        })
        .catch(error => {
          console.error('Error deleting student and marks:', error);
        });
    }
  };

  return (
    <div>
      <div><Navigationbar /></div>
      <table border="1">
        <thead>
          <tr>
            <th>Student Number</th>
            <th>Name</th>
            <th>Age</th>
            <th>Add Marks</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentNumber}>
              <td>{student.studentNumber}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => handleAddMarks(student.studentNumber)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                  </svg>
                </button>
              </td>
              <td>
                <button onClick={() => handleEdit(student)}><FaEdit/></button>
              </td>
              <td>
                <button onClick={() => handleDelete(student)}><FaTrashAlt/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
