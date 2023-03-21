import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import NavBar from '../components/NavBar'

const App = () => {
    const navigate = useNavigate()
    // redirect to login if not logged in
    React.useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login')
        }
    }, [navigate])


    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl font-bold mb-5 mt-5'>App</h1>
            <NavBar location='app' />
        </div>

    )
}


export default App