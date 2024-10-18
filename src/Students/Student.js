import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector} from 'react-redux';
import NavBar from '../Dashboard/NavBar';
import TopBar from '../component/TopBar';
import "../Dashboard/dashboard.css";
import 'boxicons/css/boxicons.min.css';
import MyTable from './StudentTable';
import './student.css'
import useAxiosPrivate from '../Api/useAxiosPrivate';

const Students = () => {
    const toggles = useSelector(state => state.toggle);
    const userId = useSelector(state => state.auth.userId);
    const { toggle } = toggles;
    const [ tableData, setTableData] = useState([]);

    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        const showStudents = async () => {
          try {
          const response = await axiosPrivate.get(`/api/learners/v1/get-students/${userId}`);
          if(response.status !== 200) {
            console.log('failed to fetch student');
          }
          const Data = response.data;
          console.log(Data);
          setTableData(Data);
        }catch(error) {
          console.log(error);
        }
      }
      showStudents();
      }, [userId])

  return (
    <div>
        <NavBar />
        <div className={`main ${toggle ? 'active' : ''}`}>
            <TopBar opt={false} />
            <div>
                <MyTable data={tableData} />
            </div>
        </div>
    </div>
  )
}

export default Students;