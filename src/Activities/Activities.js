import React, { useState, useEffect, useCallback } from 'react';
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
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://Osei.pythonanywhere.com/api/learners/v1/activities_total/${userId}`);
                console.log(response.data);
                const datas = response.data;
                if (datas.length > 0) {
                    setUserData({
                        labels: datas.map((data) => `${data.month} ${data.year}`),
                        datasets: [
                            {
                                label: "Total Quizzes",
                                data: datas.map((data) => data.totalQuizzes),
                                backgroundColor: ["#444"],
                                barThickness: 14,
                            },
                            {
                                label: "Total Questions",
                                data: datas.map((data) => data.totalQuestions),
                                backgroundColor: ["#fbd3d3"],
                                barThickness: 14,
                            },
                            {
                                label: "Total Students",
                                data: datas.map((data) => data.totalStudents),
                                backgroundColor: ['#663399'],
                                barThickness: 14,
                            }
                        ]
                    });
                }
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };
        fetch();
    }, [userId]);

    const getChartOptions = useCallback((fontSize, barThickness) => ({
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
    }), []);

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
            setUserData(prevData => prevData && ({
                ...prevData,
                datasets: prevData.datasets.map(dataset => ({
                    ...dataset,
                    barThickness: barThickness
                }))
            }));
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [getChartOptions]);

    return (
        <div>
            <NavBar />
            <div className={`main ${toggle ? 'active' : ''}`}>
                <TopBar opt={false} />
                <div className="act">
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : userData === null ? (
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
