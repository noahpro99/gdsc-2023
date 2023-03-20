import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const Signup = () => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

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


    if (loading) {
        return <h1>Loading...</h1>
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

export default Signup