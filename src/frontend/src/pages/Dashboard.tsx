import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Dashboard = () => {
    const navigate = useNavigate()
    // redirect to login if not logged in
    React.useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login')
        }
    }, [navigate])


    return (
        <div>Dashboard</div>
    )
}


export default Dashboard