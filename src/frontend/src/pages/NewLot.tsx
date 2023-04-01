import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const NewLot = () => {
  // register a new lot
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [lotName, setLotName] = React.useState('')
  const [lotAddress, setLotAddress] = React.useState('')
  const [lotLat, setLotLat] = React.useState(0)
  const [lotLng, setLotLng] = React.useState(0)
  const [lotPrice, setLotPrice] = React.useState(0)
  const [lotDescription, setLotDescription] = React.useState('')

  const handleLotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLotName(event.target.value)
  }

  const handleLotAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLotAddress(event.target.value)
  }

  const handleLotLatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLotLat(Number(event.target.value))
  }

  const handleLotLngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLotLng(Number(event.target.value))
  }

  const handleLotPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLotPrice(Number(event.target.value))
  }

  const handleLotDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLotDescription(event.target.value)
  }

  // send to firebase under db/lots/{id}
  async function registerLot() {
    setLoading(true)
    await addDoc(collection(db, 'lots'), {
      name: lotName,
      address: lotAddress,
      lat: lotLat,
      lng: lotLng,
      price: lotPrice,
      description: lotDescription,
    })
      .then(() => {
        console.log('lot registered')
        setSuccess(true)
      }
      )
      .catch((error) => {
        setError(error)
        console.log('error registering lot', error)
      })
    setLoading(false)

  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-500">
        <Header />
        <div className="flex flex-col items-center w-full mt-8">
          <div className="text-2xl font-bold text-gray-900">
            Loading...
          </div>
        </div>
        <NavBar location='' />
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-500">
        <Header />
        <div className="flex flex-col items-center w-full mt-8">
          <div className="text-2xl font-bold text-gray-900">
            Lot registered successfully!
          </div>
        </div>
        <NavBar location='' />
      </div>
    )
  }



  return (
    <div className="flex flex-col min-h-screen bg-gray-500">
      <Header />
      <div className="flex flex-col items-center w-full mt-8">
        <form className="flex flex-col w-full sm:w-1/2 bg-gray-200 p-8 rounded-md mt-8"
          onSubmit={(event) => {
            event.preventDefault()
            registerLot()
          }}
        >
          <div className="text-2xl font-bold text-gray-900">
            Register a new lot
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="text-lg font-semibold text-gray-900">Lot Name:</div>
            <input
              type="text"
              value={lotName}
              onChange={handleLotNameChange}
              className="border-2 border-gray-900 rounded-md p-2"
            />
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="text-lg font-semibold text-gray-900">Lot Address:</div>
            <input
              type="text"
              value={lotAddress}
              onChange={handleLotAddressChange}
              className="border-2 border-gray-900 rounded-md p-2"
            />
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="text-lg font-semibold text-gray-900">Lot Latitude:</div>
            <input
              type="number"
              value={lotLat}
              onChange={handleLotLatChange}
              className="border-2 border-gray-900 rounded-md p-2"
            />
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="text-lg font-semibold text-gray-900">Lot Longitude:</div>
            <input
              type="number"
              value={lotLng}
              onChange={handleLotLngChange}
              className="border-2 border-gray-900 rounded-md p-2"
            />
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="text-lg font-semibold text-gray-900">Lot Price:</div>
            <input
              type="number"
              value={lotPrice}
              onChange={handleLotPriceChange}
              className="border-2 border-gray-900 rounded-md p-2"
            />
          </div>
          <div className="flex flex-row justify-between items-start mt-4">
            <div className="text-lg font-semibold text-gray-900">Lot Description:</div>
            <textarea
              value={lotDescription}
              onChange={handleLotDescriptionChange}
              className="border-2 border-gray-900 rounded-md p-2"
            />
          </div>
          <div className="flex flex-row justify-end items-center mt-4">
            <button
              className="bg-orange-500 text-black rounded-md p-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <NavBar location={''} />
    </div>

  )
}

export default NewLot

