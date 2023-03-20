// context for firebase auth

// src\frontend\src\context\auth.tsx

import React from 'react'
import { auth } from '../firebase'

export const AuthContext = React.createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}