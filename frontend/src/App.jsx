import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Login from "./pages/Auth/Login"
import SignUp from './pages/Auth/SignUp'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/InterviewPrep/InterviewPrep'
import UserProvider from './context/userContext'

const App=()=>{



  return(
    <div>
      <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>}/>
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#333',
              color: '#fff',
            },
          },
        }}
      />
      </UserProvider>
    </div>
  )
}
export default App