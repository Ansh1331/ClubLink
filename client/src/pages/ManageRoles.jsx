import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ManageRoles = () => {

  const navigate = useNavigate()

  const [roles, setRoles] = useState(false)

  const { backendUrl, clubToken } = useContext(AppContext)

  // Function to fetch club Role Applications data 
  const fetchClubRoles = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/club/list-roles',
        { headers: { token: clubToken } }
      )

      if (data.success) {
        setRoles(data.rolesData.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  // Function to change Role Visibility 
  const changeRoleVisiblity = async (id) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/club/change-visiblity',
        { id },
        { headers: { token: clubToken } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchClubRoles()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (clubToken) {
      fetchClubRoles()
    }
  }, [clubToken])

  return roles ? roles.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text-2xl'>No Roles Available or posted</p>
    </div>
  ) : (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Role Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Position</th>
              <th className='py-2 px-4 border-b text-center'>Applicants</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b max-sm:hidden'>{index + 1}</td>
                <td className='py-2 px-4 border-b' >{role.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden' >{moment(role.date).format('ll')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden' >{role.location}</td>
                <td className='py-2 px-4 border-b text-center' >{role.applicants}</td>
                <td className='py-2 px-4 border-b' >
                  <input onChange={() => changeRoleVisiblity(role._id)} className='scale-125 ml-4' type="checkbox" checked={role.visible} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={() => navigate('/dashboard/add-role')} className='bg-black text-white py-2 px-4 rounded'>Add new role</button>
      </div>
    </div>
  ) : <Loading />
}

export default ManageRoles