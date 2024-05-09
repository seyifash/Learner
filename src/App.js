import './App.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import SignUp from './LoginComponent/signUp';
import DashBoard from './Dashboard/DashBoard'
import SignIn from './LoginComponent/SignIn';
import TestCreation from './TestCreation/testCreation';
import Created from './viewAllCreated/Created';
import Help from './Settings/Help';
import Settings from './Settings/settings';
import Students from './Students/Student'


function App() {

  const userId = useSelector(state => state.auth.userId);
  return (
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          {userId && (
            <>
              <Route path="/dashboard" element={<DashBoard  />} />
              <Route path="/createTest" element={<TestCreation />} />
              <Route path="/created" element={<Created />} />
              <Route path="/help" element={<Help />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/students" element={<Students />} />
            </>
            )}
        </Routes>
  );
}

export default App;
