import { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

    const navigate = useNavigate()

    const { clubData, setClubData, setClubToken } = useContext(AppContext)

    // Function to logout for club
    const logout = () => {
        setClubToken(null)
        localStorage.removeItem('clubToken')
        setClubData(null)
        navigate('/')
    }

    useEffect(() => {
        if (clubData) {
            navigate('/dashboard/manage-roles')
        }
    }, [clubData])

    return (
        <div className='min-h-screen'>

            {/* Navbar for Recuriter Panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img
                        onClick={() => navigate('/')}
                        className="w-24 sm:w-28 md:w-32 lg:w-36 cursor-pointer"
                        src={assets.logo}
                        alt="Logo"
                    />

                    {/* <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" /> */}
                    {clubData && (
                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden'>Welcome, {clubData.name}</p>
                            <div className='relative group'>
                                <img className='w-8 border rounded-full' src={clubData.image} alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded  pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex items-start'>

                {/* Left Sidebar with option to add role, manage roles, view applications */}
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-role'}>
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Role</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-roles'}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Roles</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-2 sm:p-5'>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default Dashboard