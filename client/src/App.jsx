import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyRole from './pages/ApplyRole'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddRole from './pages/AddRole'
import ManageRoles from './pages/ManageRoles'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const { showRecruiterLogin, clubToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-role/:id' element={<ApplyRole />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />}>
          {
            clubToken ? <>
              <Route path='add-role' element={<AddRole />} />
              <Route path='manage-roles' element={<ManageRoles />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </> : null
          }
        </Route>
      </Routes>
    </div>
  )
}

export default App