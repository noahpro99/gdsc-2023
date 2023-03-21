import React from 'react'
import { auth, db } from '../firebase'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const [user, setUser] = React.useState<DocumentData>()
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
                setUser(doc.data())
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
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl font-bold mb-5 mt-5'>Profile</h1>
            <div className='flex flex-col items-center justify-center'>
                {user && user.name && <h1 className='text-3xl font-bold mb-5 mt-5'>Name</h1>}
                {user && user.name && <h1 className='text-3xl font-bold mb-5 mt-5'>{user.name}</h1>}
                {user && user.email && <h1 className='text-3xl font-bold mb-5 mt-5'>Email</h1>}
                {user && user.email && <h1 className='text-3xl font-bold mb-5 mt-5'>{user.email}</h1>}

            </div>

            {/* logout button */}
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => {
                    auth.signOut();
                    navigate('/login')

                }}
            >
                Logout
            </button>


            <NavBar location='profile' />
        </div>

    )
}

export default Profile