import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../Dashboard/dashboard.css";
import NavBar from '../Dashboard/NavBar';
import TopBar from '../component/TopBar';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';
import './Activities.css';

const Activities = () => {
    const toggles = useSelector(state => state.toggle);
    const userId = useSelector(state => state.auth.userId);
    const { toggle } = toggles;
    const [chartData, setChartData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/learners/v1/activities_total/${userId}`);
                console.log(response.data);
                setChartData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetch();
    }, [userId]);

    useEffect(() => {
        if (chartData.length > 0) {
            setUserData({
                labels: chartData.map((data) => `${data.month} ${data.year}`),
                datasets: [
                    {
                        label: "Total Quizzes",
                        data: chartData.map((data) => data.totalQuizzes),
                        backgroundColor: ["#444"],
                        barThickness: 14,
                    },
                    {
                        label: "Total Questions",
                        data: chartData.map((data) => data.totalQuestions),
                        backgroundColor: ["#fbd3d3"],
                        barThickness: 14,
                    },
                    {
                        label: "Total Students",
                        data: chartData.map((data) => data.totalStudents),
                        backgroundColor: ['#663399'],
                        barThickness: 14,
                    }
                ]
            });
        }
    }, [chartData]);

    const getChartOptions = (fontSize, barThickness) => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    font: {
                        size: fontSize
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: fontSize
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: fontSize
                    }
                }
            }
        },
        layout: {
            padding: {
                left: barThickness / 2,
                right: barThickness / 2,
            }
        }
    });

    const [chartOptions, setChartOptions] = useState(getChartOptions(12, 14));

    useEffect(() => {
        const handleResize = () => {
            let fontSize;
            let barThickness;
            if (window.innerWidth < 480) {
                fontSize = 8;
                barThickness = 8;
            } else if (window.innerWidth < 799) {
                fontSize = 10;
                barThickness = 10;
            } else {
                fontSize = 12;
                barThickness = 14;
            }
            setChartOptions(getChartOptions(fontSize, barThickness));
            if (userData) {
                setUserData(prevData => ({
                    ...prevData,
                    datasets: prevData.datasets.map(dataset => ({
                        ...dataset,
                        barThickness: barThickness
                    }))
                }));
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [userData]);

    return (
        <div>
            <NavBar />
            <div className={`main ${toggle ? 'active' : ''}`}>
                <TopBar opt={false} />
                <div className="act">
                    {userData === null ? (
                         <h2>No Activities yet</h2>
                    ) : (
                        <Bar data={userData} options={chartOptions} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Activities;
