import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigationbar from './Navigationbar';
import axios from 'axios';
import './StudentDetails.css';

function Grade() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    id: '',
    grade: '',
    marklevelstart: '',
    marklevelend: '',
  });
  
  const [errors, setErrors] = useState({});
  const [existingGrades, setExistingGrades] = useState([]);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }
    fetchExistingGrades();
  }, [location.state]);

  const fetchExistingGrades = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/ranks/Grades/');
      const grades = response.data.map(grade => ({
        id: grade.id,
        grade: grade.grade,
        marklevelstart: grade.marklevelstart,
        marklevelend: grade.marklevelend
      }));
      setExistingGrades(grades);
    } catch (error) {
      console.error('Error fetching existing grades:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    const { grade, marklevelstart, marklevelend } = formData;

    if (existingGrades.some(g => g.grade === grade && g.id !== formData.id)) {
      tempErrors.grade = 'Grade already exists';
    }

    if (!marklevelstart) {
      tempErrors.marklevelstart = 'Mark Level Start is required';
    }
    if (!marklevelend) {
      tempErrors.marklevelend = 'Mark Level End is required';
    }
    if (marklevelend <= marklevelstart) {
      tempErrors.marklevelend = 'Mark Level End must be greater than Mark Level Start';
    }

    const isOverlapping = existingGrades.some(g =>
      (marklevelstart < g.marklevelend && marklevelend > g.marklevelstart) &&
      g.id !== formData.id
    );
    if (isOverlapping) {
      tempErrors.range = 'Mark Level ranges overlap with existing entries';
    }

    const allRanges = [...existingGrades, formData].map(g => ({
      start: g.marklevelstart,
      end: g.marklevelend
    }));
    allRanges.sort((a, b) => a.start - b.start);

    for (let i = 0; i < allRanges.length - 1; i++) {
      if (allRanges[i].end > allRanges[i + 1].start) {
        tempErrors.range = 'Mark Level gaps are not unique';
        break;
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddMore = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/ranks/Grades/', formData);
        console.log('Response from server:', response.data);
        setExistingGrades([...existingGrades, { ...formData, id: response.data.id }]);
        setFormData({
          grade: '',
          marklevelstart: '',
          marklevelend: '',
        });
        navigate('/Grade');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        if (formData.id) {
          await axios.put(`http://127.0.0.1:8000/ranks/Grades/${formData.id}/`, formData);
        } else {
          const response = await axios.post('http://127.0.0.1:8000/ranks/Grades/', formData);
          console.log('Response from server:', response.data);
          setExistingGrades([...existingGrades, { ...formData, id: response.data.id }]);
        }
        navigate('/GradesTable');
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  }

  return (
    <div>
      <Navigationbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Grade</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            readOnly={formData.id ? true : false}
          />
          {errors.grade && <span className="error">{errors.grade}</span>}
        </div>
        <div>
          <label>Mark Level Start</label>
          <input
            type="number"
            name="marklevelstart"
            value={formData.marklevelstart}
            onChange={handleChange}
          />
          {errors.marklevelstart && <span className="error">{errors.marklevelstart}</span>}
        </div>
        <div>
          <label>Mark Level End</label>
          <input
            type="number"
            name="marklevelend"
            value={formData.marklevelend}
            onChange={handleChange}
          />
          {errors.marklevelend && <span className="error">{errors.marklevelend}</span>}
        </div>
        {errors.range && <span className="error">{errors.range}</span>}
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/GradesTable')}>Cancel</button>
          <button type="button" onClick={handleAddMore}>Add More</button>
        </div>
      </form>
    </div>
  );
}

export default Grade;
