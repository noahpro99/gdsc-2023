import React from 'react'

const LoadingWheel = () => {
    // spinning wheel
    return (
        <div className='flex justify-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500'></div>
        </div>
    )
}

export default LoadingWheel