import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props: { location: string }) => {
    const location = props.location
    const svgStyle = 'w-10 h-10 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500'
    const homeStyle = location === 'app' ? 'text-orange-600 dark:text-orange-500 w-10 h-10 mb-1' : svgStyle
    const profileStyle = location === 'profile' ? 'text-orange-600 dark:text-orange-500 w-10 h-10 mb-1' : svgStyle
    return (

        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-2 mx-auto">
                <Link className="inline-flex flex-col items-center justify-center dark:hover:bg-gray-800 group"
                    to="/app">
                    <button type="button" className="inline-flex flex-col items-center justify-center px-20 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className={homeStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                    </button>
                </Link>
                <Link className="inline-flex flex-col items-center justify-center dark:hover:bg-gray-800 group"
                    to="/profile">
                    <button type="button" className="inline-flex flex-col items-center justify-center px-20 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className={profileStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                        </svg>
                    </button>
                </Link>
            </div>
        </div>


    )
}

export default NavBar