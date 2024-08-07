import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navigationbar from './Navigationbar';
import './Home.css';
import axios from 'axios';
function Home() {
    const navigate = useNavigate();
    const [studentCount, setStudentCount] = useState(0);
    const [gradeCount, setGradeCount] = useState(0);
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/Student/')
            .then(response => {
                const studentData = response.data;
             
                setStudentCount(studentData.length); 
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });

        axios.get('http://127.0.0.1:8000/ranks/Grades/')
            .then(response => {
                const gradeData = response.data;
              
                setGradeCount(gradeData.length);
            })
            .catch(error => {
                console.error('Error fetching grade data:', error);
            });
    }, []); 
  return (
    <div>
            <Navigationbar />
            <div className='main'>
                <div className='maindiv'>
                    <div className='plus'>
                        <button onClick={() => navigate('/StudentDetails')}>+</button>
                    </div>
                    <div className='content'>
                        <p style={{marginLeft:'50px',marginTop:'50px'}}>Total Student Details</p>
                        <p style={{marginRight:"50px",marginTop:'50px'}}>Count: {studentCount}</p>
                    </div>
                </div>
                <div className='maindiv'>
                    <div className='plus'>
                        <button onClick={() => navigate('/Grade')}>+</button>
                    </div>
                    <div className='content'>
                        <p style={{marginLeft:'50px',marginTop:'50px'}}>Grade System</p>
                        <p style={{marginRight:"50px",marginTop:'50px'}}>Count: {gradeCount}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Home;