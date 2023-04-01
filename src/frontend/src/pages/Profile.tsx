import React from 'react'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import NavBar from '../components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { Lot, User } from '../types'
import Header from '../components/Header'
import LoadingWheel from '../components/LoadingWheel'
import ParkingLotCard from '../components/ParkingLotCard'

const Profile = () => {

  const [user, setUser] = React.useState<User>()
  const [loading, setLoading] = React.useState(true)
  const [favoriteLots, setFavoriteLots] = React.useState<Lot[]>([])
  const navigate = useNavigate()


  React.useEffect(() => {

    async function getUser() {
      if (!auth.currentUser) {
        console.log('no user')
        return
      }
      console.log("path", doc(db, 'users', auth.currentUser.uid).path)
      await getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
        let localUser: User | null = null
        if (docSnap.exists()) {
          localUser = docSnap.data() as User
          setUser(localUser)
          let favoriteLots: Lot[] = []
          localUser?.favoriteLotIds.forEach((id) => {
            getDoc(doc(db, 'lots', id))
              .then((docSnap) => {
                if (docSnap.exists()) {
                  let lot = docSnap.data() as Lot
                  lot.id = docSnap.id
                  favoriteLots.push(lot)
                  setFavoriteLots(favoriteLots)
                } else {
                  console.log('could not find lot with id', id)
                }
              })
          })
        }
      })
    }


    setLoading(true)
    getUser()
    setLoading(false)
  }, [])

  async function removeFavoriteLot(lotId: string) {
    if (!user) {
      console.log('no user')
      return
    }
    let favoriteLotIds = user.favoriteLotIds
    favoriteLotIds = favoriteLotIds.filter((id) => id !== lotId)
    setUser({
      ...user,
      favoriteLotIds: favoriteLotIds
    })
    setFavoriteLots(favoriteLots.filter((lot) => lot.id !== lotId))
    await setDoc(doc(db, 'users', user.uid), {
      favoriteLotIds: favoriteLotIds
    }, {
      merge: true
    })
  }



  const favoriteLotsJSX = favoriteLots.map((lot, index) => (
    <li key={index}>
      <div className='flex flex-wrap justify-center items-center w-full'>
        <ParkingLotCard
          lot={lot}
        />
        <button className='flex flex-row justify-center items-center w-24 h-12 p-2 m-4 text-black font-semibold bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75' onClick={() => {
          removeFavoriteLot(lot.id)
        }}>
          Remove
        </button>
      </div>
    </li>
  )
  )

  if (loading) {
    return <LoadingWheel />
  }
  return (
    <div className='flex flex-col min-h-screen bg-gray-500'>
      <Header />
      <div className='flex flex-col justify-center w-full items-center'>
        <div className='flex flex-wrap justify-center items-center bg-gray-700 px-4 m-4 rounded-lg shadow-md w-3/4'>
          <img src='https://boring-avatars-api.vercel.app/api/avatar?size=40&variant=pixel' alt='avatar' className='w-10 h-10 m-2 rounded-full' />
          <h1 className='text-base font-semibold text-white px-2'>{user?.email}</h1>
          <Link to='/register-lot'>
            <button className='flex flex-row justify-center items-center w-24 h-12 p-2 m-4 text-black font-semibold bg-gray-500 rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75'>
              Register Lot
            </button>
          </Link>
          <button className='flex flex-row justify-center items-center w-24 h-12 p-2 m-4 text-black font-semibold bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75' onClick={() => { auth.signOut(); navigate('/login') }}>
            Sign Out
          </button>
        </div>
        <div className='flex flex-col items-center p-4 m-4 bg-gray-700 rounded-lg shadow-md w-3/4'>
          <h1 className='text-2xl font-semibold text-white'>Favorite Spots</h1>
          {
            favoriteLots.length > 0 ?
              <ul className='flex flex-col justify-center items-center w-full'>
                {favoriteLotsJSX}
              </ul>
              :
              <p className='text-base font-semibold text-white'>You have no favorite lots</p>
          }

        </div>
      </div>

      <NavBar location='profile' />
    </div>

  )
}

export default Profile