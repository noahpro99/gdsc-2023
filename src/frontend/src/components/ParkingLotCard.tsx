import React from 'react'
import { Lot } from '../types'


const ParkingLotCard = ({ lot }: { lot: Lot }) => {
    return (
        <div className='bg-white shadow rounded-lg overflow-hidden m-4 w-96'>
            <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    {lot.name}
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                    {lot.address}
                </p>
            </div>
            <div className='border-t border-gray-200'>
                <dl>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-500'>Description</dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {lot.description}
                        </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-500'>Price</dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            ${lot.price}
                        </dd>
                    </div>
                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-500'>Rating</dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {lot.rating}
                        </dd>
                    </div>
                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                        <dt className='text-sm font-medium text-gray-500'>Spots</dt>
                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                            {lot.spots}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

    )
}

export default ParkingLotCard