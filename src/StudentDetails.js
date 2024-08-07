import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigationbar from './Navigationbar';
import './StudentDetails.css';
import axios from 'axios';

function StudentDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    id: '',
    studentNumber: '',
    name: '',
    age: '',
    gender: '',
    standard: '',
    dept: '',
  });

  const [errors, setErrors] = useState({});
  const [existingStudentNumbers, setExistingStudentNumbers] = useState([]);
  const [isStudentNumberUnique, setIsStudentNumberUnique] = useState(true);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }
    fetchExistingStudentNumbers();
  }, [location.state]);

  const fetchExistingStudentNumbers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/Student/');
      const studentNumbers = response.data.map(student => student.studentNumber);
      setExistingStudentNumbers(studentNumbers);
      checkStudentNumberUnique(formData.studentNumber);
    } catch (error) {
      console.error('Error fetching existing student numbers:', error);
    }
  };

  const checkStudentNumberUnique = (studentNumber) => {
    if (existingStudentNumbers.includes(studentNumber)&& !formData.id ) {
      setIsStudentNumberUnique(false);
      setErrors(prevErrors => ({ ...prevErrors, studentNumber: 'Student Number already exists' }));
    } else {
      setIsStudentNumberUnique(true);
      setErrors(prevErrors => ({ ...prevErrors, studentNumber: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'studentNumber') {
      checkStudentNumberUnique(value);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.studentNumber) {
      tempErrors.studentNumber = 'Student Number is required';
    } else if (!isStudentNumberUnique) {
      tempErrors.studentNumber = 'Student Number already exists';
    }
    if (!formData.name) {
      tempErrors.name = 'Name is required';
    }
    if (!formData.age) {
      tempErrors.age = 'Age is required';
    }
    if (!formData.gender) {
      tempErrors.gender = 'Gender is required';
    }
    if (!formData.standard) {
      tempErrors.standard = 'Standard is required';
    }
    if (!formData.dept) {
      tempErrors.dept = 'Department is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddMore = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/Student/', formData);
        console.log('Response from server:', response.data);
        await fetchExistingStudentNumbers();  
        setFormData({
          id: '',
          studentNumber: '',
          name: '',
          age: '',
          gender: '',
          standard: '',
          dept: '',
        });
        navigate('/StudentDetails');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (formData.id) {
          await axios.put(`http://127.0.0.1:8000/api/Student/${formData.id}/`, formData);
        } else {
          const response = await axios.post('http://127.0.0.1:8000/api/Student/', formData);
          console.log('Response from server:', response.data);
          await fetchExistingStudentNumbers();  
        }
        navigate('/StudentTable');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  return (
    <div>
      <Navigationbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Number</label>
          <input 
            type="number" 
            name="studentNumber" 
            value={formData.studentNumber} 
            onChange={handleChange} 
            readOnly={formData.id ? true : false} 
          />
          {errors.studentNumber && <span className="error">{errors.studentNumber}</span>}
        </div>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Age</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div>
          <label>Gender</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div>
          <label>Class</label>
          <input 
            type="number" 
            name="standard" 
            value={formData.standard} 
            onChange={handleChange} 
          />
          {errors.standard && <span className="error">{errors.standard}</span>}
        </div>
        <div>
          <label>Dept</label>
          <input 
            type="text" 
            name="dept" 
            value={formData.dept} 
            onChange={handleChange} 
          />
          {errors.dept && <span className="error">{errors.dept}</span>}
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/StudentTable')}>Cancel</button>
          {!formData.id && <button type="button" onClick={handleAddMore}>Add More</button>}
        </div>
      </form>
    </div>
  );
}

export default StudentDetails;
