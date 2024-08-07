import React, { useEffect, useState } from 'react';
import Navigationbar from './Navigationbar';
import { useNavigate } from 'react-router-dom';
import './GradesTable.css';
import axios from 'axios';
import {FaEdit,FaTrashAlt} from 'react-icons/fa';


const GradesTable = () => {
  const [grades, setGrades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    axios.get('http://127.0.0.1:8000/ranks/Grades/')
      .then(response => {
       
        const sortedGrades = response.data.sort((a, b) => a.grade.localeCompare(b.grade));
        setGrades(sortedGrades);
      })
      .catch(error => {
        console.error('There was an error fetching the grades!', error);
      });
  }, []);

  const handleEdit = (grade) => {
   
    navigate('/Grade', { state: { formData: grade }});
  };

  const handleDelete = (grade) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete grade "${grade.grade}"?`);
    if (confirmDelete) {
    
      axios.delete(`http://127.0.0.1:8000/ranks/Grades/${grade.id}/`) 
        .then(response => {
          console.log('Grade deleted successfully:', grade.grade);
         
          setGrades(grades.filter(g => g.id !== grade.id));
        })
        .catch(error => {
          console.error('Error deleting grade:', error);
        });
    }
  };

  return (
    <div>
    <div><Navigationbar /></div>
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Mark Level Start</th>
            <th>Mark Level End</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}> 
              <td>{grade.grade}</td>
              <td>{grade.marklevelstart}</td>
              <td>{grade.marklevelend}</td>
              <td>
                <button onClick={() => handleEdit(grade)}>
                  <FaEdit/>
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(grade)}>
                  <FaTrashAlt/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesTable;