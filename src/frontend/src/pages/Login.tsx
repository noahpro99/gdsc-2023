

import React from 'react'

import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import LoadingWheel from '../components/LoadingWheel'
import { useNavigate } from 'react-router-dom'

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
                navigate('/dashboard')
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
        <div className='flex flex-col items-center justify-center h-screen'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold mb-5 mt-5'>Email</h1>
                    <input className='rounded-lg border-2 border-gray-300'
                        autoComplete='on'
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h1 className='text-3xl font-bold mb-5 mt-5'>Password</h1>
                    <input className='rounded-lg border-2 border-gray-300'
                        autoComplete='on'
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                    {error && <p className='text-red-500'
                    >{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default Login