import React from 'react'
import { Lot } from '../types'
import { Link } from 'react-router-dom'

const ParkingLotCard = ({ lot }: { lot: Lot }) => {
  return (
    <Link to={`/lots/${lot.id}`}>
      <div className="flex flex-col justify-between shadow rounded-lg overflow-hidden m-4 border border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
        <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">{lot.name}</h1>
          <p className="text-sm text-gray-500">{lot.address}</p>
        </div >
        <div className="flex flex-wrap justify-between p-4 border-t border-gray-200">
          <div className="flex items-center px-4">
            <span className="text-sm font-medium text-gray-500 mr-2">Price:</span>
            <span className="text-sm font-semibold text-gray-900">${lot.price}</span>
          </div>
          <div className="flex items-center px-4">
            <span className="text-sm font-medium text-gray-500 mr-2">Rating:</span>
            <span className="text-sm font-semibold text-gray-900">{lot.rating}/5</span>
          </div>
          <div className="flex items-center px-4">
            <span className="text-sm font-medium text-gray-500 mr-2">Spots:</span>
            <span className="text-sm font-semibold text-gray-900">{lot.spots}</span>
          </div>
        </div>
      </div >
    </Link>
  )
}

export default ParkingLotCard
