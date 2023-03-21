import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const Signup = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        if (password !== passwordConfirmation) {
            setError('Passwords do not match')
            return
        }

        // send test to backend firebase datastore using firebase auth
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                // add user to firestore
                setDoc(doc(db, 'users', userCredential.user.uid), {
                    email: userCredential.user.email,
                    uid: userCredential.user.uid,
                    name: userCredential.user.displayName,
                }).then(() => {
                    console.log('user added to firestore')
                }
                ).catch((error) => {

                    console.log(error.message)
                    setError(error.message + ' - user not added to firestore')
                }
                );
            }
            )
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
            }
            );

        setLoading(false)

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
                        <h1 className='text-3xl font-bold mb-5 mt-5 text-white'>Confirm Password</h1>
                        <input className='rounded-full p-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent '
                            autoComplete='on'
                            type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                        {(!loading) &&
                            <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full mt-5 hover:shadow-lg'
                                type="submit">Sign Up</button>}
                        {(loading) &&
                            <div className='flex flex-col items-center justify-center mt-5'>
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
                            </div>}

                        {error &&
                            <p className='text-red-500 mt-5'>{error}</p>}

                        <Link
                            to='/login'>
                            <p className='text-white mt-5 hover:text-orange-500'>Already have an account? Log in</p>
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup