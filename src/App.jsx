import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserNavbar } from './Component/layout/UserNavbar'
// import './App.css'
import './assets/adminlte.css';
import './assets/adminlte.min.css';
import { UserSidebar } from './Component/layout/UserSidebar';
import { Route, Routes } from 'react-router-dom';
import { UserProfile } from './Component/user/UserProfile';
import { Signup } from './Component/common/Signup';

function App() {

  return (

    <body className='layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded'>
      <div className='app-wrapper'>
       <Routes>
        <Route path='/user' element={<UserSidebar/>}>
          <Route path='profile' element={<UserProfile/>}></Route>
        </Route>
        <Route path='/signup' element={<Signup/>}></Route>
       </Routes>
      </div>
    </body>
  )
}

export default App
