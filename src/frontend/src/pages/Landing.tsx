import React from 'react'
import { Link } from 'react-router-dom'


const Landing = () => {

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-orange-400 to-orange-600 w-full'>
                <div className='flex flex-col items-center justify-center h-screen'>
                    <img className='w-60' src='im_car.png' alt='logo' />


                    <h1 className='text-3xl font-bold mb-5 mt-5 text-gray-900'>Welcome to ParkSpot</h1>
                    <Link to='/app'>
                        {/* extremely detailed animated border colors to app button */}
                        <button className='rounded-full p-2 px-5 bg-gray-900 text-white font-bold mt-5 border-2 border-gray-900 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:shadow-2xl'
                            type='submit'>Get Started</button>
                    </Link>
                </div>
            </div>

            {/* about us */}
            <div className='flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-gray-800 to-gray-700 w-full'>
                <div className='flex flex-col items-center justify-center h-screen'>
                    <h1 className='text-3xl font-bold mb-5 mt-5 text-white'>About Us</h1>
                    <p className='text-white text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliqu

                    </p>
                </div>
            </div>


            {/* contact us */}


        </div>


    )
}

export default Landing