import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigationbar from './Navigationbar';
import axios from 'axios';

const StudentMarks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    studentNumber: '',
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
    subject5: '',
    subject6: ''
  });

  useEffect(() => {
    if (location.state && location.state.formData) {
      const { studentNumber } = location.state.formData;
      setFormData({
        ...formData,
        studentNumber: studentNumber,
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/stud/Marks/', formData);
      console.log('Response from server:', response.data);
      navigate('/StudentTable');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleAddMore = () => {
    navigate('/StudentDetails');
  };

  const handleCancel = () => {
    navigate('/StudentTable');
  };

  return (
    <div>
      <div><Navigationbar /></div>
      <form onSubmit={handleSave}>
        <div>
          <label>Student ID</label>
          <input
            type="text"
            name="studentNumber"
            value={formData.studentNumber}
            readOnly
          />
        </div>
        {['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6'].map((subject, index) => (
          <div key={index}>
            <label>{`Subject ${index + 1}`}</label>
            <input
              type="number"
              min={0}
              max={100}
              name={subject}
              value={formData[subject]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div>
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleAddMore}>Add More</button>
        </div>
      </form>
    </div>
  );
};

export default StudentMarks;
