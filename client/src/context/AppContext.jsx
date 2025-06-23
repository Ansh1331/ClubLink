import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { user } = useUser()
    const { getToken } = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [roles, setRoles] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [clubToken, setClubToken] = useState(null)
    const [clubData, setClubData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    // Function to Fetch Roles 
    const fetchRoles = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/roles')

            if (data.success) {
                setRoles(data.roles)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to Fetch Club Data
    const fetchClubData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/club/club', { headers: { token: clubToken } })

            if (data.success) {
                setClubData(data.club)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to Fetch User Data
   const fetchUserData = async () => {
  try {
    const token = await getToken();

    const { data } = await axios.get(backendUrl + '/api/users/user', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data.success) {
      setUserData(data.user);
    } else {
      // ❗IMPORTANT: Create user if not found
      const { data: createData } = await axios.post(backendUrl + '/api/users/create', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (createData.success) {
        setUserData(createData.user);
      } else {
        toast.error(createData.message);
      }
    }
  } catch (error) {
    toast.error(error.message);
  }
};


    // Function to Fetch User's Applied Applications
    const fetchUserApplications = async () => {
        try {

            const token = await getToken()

            const { data } = await axios.get(backendUrl + '/api/users/applications',
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                setUserApplications(data.applications)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Retrive Club Token From LocalStorage
    useEffect(() => {
        fetchRoles()

        const storedClubToken = localStorage.getItem('clubToken')

        if (storedClubToken) {
            setClubToken(storedClubToken)
        }

    }, [])

    // Fetch Club Data if Club Token is Available
    useEffect(() => {
        if (clubToken) {
            fetchClubData()
        }
    }, [clubToken])

    // Fetch User's Applications & Data if User is Logged In
    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchUserApplications()
        }
    }, [user])

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        roles, setRoles,
        showRecruiterLogin, setShowRecruiterLogin,
        clubToken, setClubToken,
        clubData, setClubData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData,
        fetchUserApplications,

    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)

}