import React, { useState } from 'react'
import { useSelector} from 'react-redux';
import "../Dashboard/dashboard.css";
import NavBar from '../Dashboard/NavBar';
import TopBar from '../component/TopBar';
import { Bar}  from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";


const chartData = [
    { month: 'January', totalStudents: 150, totalQuizzes: 300, totalQuestions: 4500 },
    { month: 'February', totalStudents: 160, totalQuizzes: 320, totalQuestions: 4800 },
    { month: 'March', totalStudents: 170, totalQuizzes: 340, totalQuestions: 5100 },
    { month: 'April', totalStudents: 180, totalQuizzes: 360, totalQuestions: 5400 },
    { month: 'May', totalStudents: 190, totalQuizzes: 380, totalQuestions: 5700 }
  ];
  

const Activities = () => {
    const toggles = useSelector(state => state.toggle);
    const userId = useSelector(state => state.auth.userId);
    const { toggle } = toggles;
    const [userData, setUserData] = useState({
        labels: chartData.map((data) => data.month),
        datasets: [
            {
                label: "Total Quizzes",
                data: chartData.map((data) => data.totalQuizzes),
                backgroundColor: ["#444"]
            },
            {
                label: "Total Questions",
                data: chartData.map((data) => data.totalQuestions),
                backgroundColor: ['#fbd3d3'],
            },
            {
                label: "Total Students",
                data: chartData.map((data) => data.totalStudents),
                backgroundColor: ['#663399']
            }
        ]
    });


  return (
    <div>
        <NavBar />
        <div className={`main ${toggle ? 'active' : ''}`}>
            <TopBar opt={false} />
            <div style={{width: '1000px', padding: '30px'}}>
                <Bar data={userData} />
            </div>
        </div>
    </div>
  )
}

export default Activities