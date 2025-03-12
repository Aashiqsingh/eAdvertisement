import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserNavbar } from './Component/layout/UserNavbar'
// import './App.css'
import './assets/adminlte.css';
import './assets/adminlte.min.css';
import { UserSidebar } from './Component/layout/UserSidebar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { UserProfile } from './Component/user/UserProfile';
import { Signup } from './Component/common/Signup';
import axios from 'axios';
import { Login } from './Component/common/Login';
import { AgencySidebar } from './Component/layout/AgencySidebar';
import { AgencyProfile } from './Component/admin/AgencyProfile';
import { AgencyProfile2 } from './Component/admin/AgencyProfile2';
import { ViewMyScreen } from './Component/admin/ViewMyScreen';

function App() {

  axios.defaults.baseURL = "http://localhost:3000"
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>
       <Routes>
        <Route path='/user' element={<UserSidebar/>}>
          <Route path='profile' element={<UserProfile/>}></Route>
        </Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/agencysidebar' element={<AgencySidebar/>}>
          {/* <Route path='agencyprofile' element={<AgencyProfile/>}></Route> */}
          <Route path='agencyprofile2' element={<AgencyProfile2/>}></Route>
          <Route path='myscreen' element={<ViewMyScreen/>}></Route>
        </Route>
       </Routes>
      </div>

  )
}

export default App
