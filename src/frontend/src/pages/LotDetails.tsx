import { doc, getDoc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../firebase'
import { FaStar } from 'react-icons/fa';
import { Lot, User } from '../types'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

const LotDetails = () => {
  const id = useParams().id
  const [loading, setLoading] = React.useState(true)
  const [lot, setLot] = React.useState<Lot>()


  React.useEffect(() => {
    setLoading(true)
    async function getLot() {
      if (!id) {
        return
      }
      const docSnap = await getDoc(doc(db, 'lots', id));
      if (docSnap.exists()) {
        setLot(docSnap.data() as Lot)
      } else {
        console.log('No such document!')
      }
    }
    getLot()
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className='flex flex-col min-h-screen bg-gray-500'>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!lot) {
    return (
      <div className='flex flex-col min-h-screen bg-gray-500'>
        <h1>Lot not found</h1>
      </div>
    )
  }

  const stars = [...Array(5)].map((_, index) => {
    if (lot.rating === null || index < lot.rating) {
      return <FaStar key={index} className="text-orange-400 fill-current" />
    }
    return <FaStar key={index} className="text-gray-500 fill-current" />
  })

  async function addAsFavorite() {
    if (!auth.currentUser || !lot || !id) {
      console.log('no user')
      return
    }
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
    if (userDoc.exists()) {
      const user = userDoc.data() as User
      if (!user.favoriteLotIds) {
        user.favoriteLotIds = []
      }
      if (user.favoriteLotIds.includes(lot.id)) {
        console.log('already in favorites')
        return
      }
      user.favoriteLotIds.push(id)
      console.log('user', user)
      await setDoc(doc(db, 'users', auth.currentUser.uid), user)
        .then(() => {
          console.log('Document successfully written!')
        }
        )
        .catch((error) => {
          console.error('Error writing document: ', error)
        }
        )

    }
  }



  return (
    // display the lot on the same style of page as the app page beautify it
    <div className="flex flex-col min-h-screen bg-gray-500">
      <Header />
      <div className="flex flex-col items-center w-full mt-8">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{lot?.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {stars}
              </div>
            </div>
            <div className="text-lg mb-4">{lot?.address}</div>{
              <div className="text-xl font-bold mb-4">${lot?.price}</div>}
            <div className="text-lg mb-4">{lot?.description}</div>
          </div>


          {/* small graph of the forecasts example underlying data : [16, 50, 60, 40, 30] */}
          {/* make using a bar graph of divs */}

          <div className="flex flex-row justify-center items-end">
            <div className={`flex flex-col items-center justify-end w-1/5 m-2 bg-gray-300 rounded-lg shadow-md`}
              style={{ height: `${lot.spots / Math.max(...lot?.forecasts) * 5}rem` }}
            >
              <div className="text-lg font-bold">{lot.spots}</div>
              <div className="text-sm">Current</div>
            </div>
            {lot?.forecasts.map((forecast, index) => {
              let style = `flex flex-col items-center justify-end w-1/5 m-2 bg-gray-300 rounded-lg shadow-md`
              return (
                <div className={style}
                  style={{ height: `${forecast / Math.max(...lot?.forecasts) * 5}rem` }}
                >
                  < div className="text-lg font-bold" > {forecast}</div>
                  <div className="text-sm">+{index + 1}:00</div>
                </div>

              )
            })}
          </div>



          <div className="flex justify-center">
            <button
              className="px-4 py-2 m-4 text-black font-semibold bg-orange-500 rounded hover:bg-gray-700"
              onClick={addAsFavorite}
            >
              Add to Favorites
            </button>

          </div>
        </div>
      </div>
      <NavBar location="lots" />
    </div>

  )





}

export default LotDetails