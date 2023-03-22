import React from 'react'
import { auth, db } from '../firebase'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { User } from '../types'

const Profile = () => {

    const [user, setUser] = React.useState<User>()
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate()


    React.useEffect(() => {
        // fetch user data from firebase db
        setLoading(true)


        if (!auth.currentUser) {
            return
        }
        getDoc(doc(db, 'users', auth.currentUser.uid)).then((doc) => {
            if (doc.exists()) {
                setUser(doc.data() as User)
            } else {
                console.log('No such document!')
            }
        }).catch((error) => {
            console.log('Error getting document:', error)
        })


        setLoading(false)
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='flex flex-col min-h-screen bg-gray-500'>
            {/* div for top right corner */}
            <div className='flex flex-row justify-end w-full'>
                <div className='flex flex-row justify-end bg-gray-700 px-4 m-4 rounded-lg shadow-md'>
                    <img src='https://boring-avatars-api.vercel.app/api/avatar?size=40&variant=pixel' alt='avatar' />
                    <button className='flex flex-row justify-center items-center w-24 h-12 m-4 text-black font-semibold bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75' onClick={() => { auth.signOut(); navigate('/login') }}>
                        Sign Out
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-center w-full'>
                <div className='flex flex-col items-center w-3/4 p-4 m-4 bg-gray-700 rounded-lg shadow-md'>
                    <h1 className='text-2xl font-bold text-white'>Favorite Spots</h1>
                    <div className='flex flex-row justify-center w-full'>
                    </div>
                </div>

            </div>





            <NavBar location='profile' />
        </div>

    )
}

export default Profile