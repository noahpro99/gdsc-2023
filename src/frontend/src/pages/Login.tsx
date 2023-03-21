

import React from 'react'

import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import LoadingWheel from '../components/LoadingWheel'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // send test to backend firebase datastore using firebase auth
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential.user);
                // go to /dashboard
                navigate('/app')
            }
            )
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
                // ..
            }
            );

        setLoading(false)

    }

    if (loading) {
        return <LoadingWheel />
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-tl from-gray-800 to-gray-700'>
            <div className='backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 rounded-xl p-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-bold mb-5 mt-5 text-white'>Email</h1>
                        <input className='rounded-full p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent '
                            autoComplete='on'
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <h1 className='text-3xl font-bold mb-5 mt-5 text-white'>Password</h1>
                        <input className='rounded-full p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent '
                            autoComplete='on'
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {(!loading) &&
                            <button className='rounded-full p-2 px-5 bg-orange-500 hover:bg-orange-700 text-white font-bold mt-5'
                                type='submit'
                            >Login</button>
                        }
                        {(loading) &&
                            <div className='flex flex-col items-center justify-center mt-5'>
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
                            </div>}
                        {error && <p className='text-red-500'>{error}</p>}
                        {/* signup  */}
                        <Link to='/signup'>
                            <p className='text-white mt-5 hover:text-orange-500'
                            >Don't have an account? Sign up here</p>
                        </Link>
                    </div>
                </form >
            </div >
        </div >
    )
}

export default Login