import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import NavBar from '../components/NavBar'
import Map from '../components/Map'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Lot } from '../types'
import ParkingLotCard from '../components/ParkingLotCard'
import LoadingWheel from '../components/LoadingWheel'
import Header from '../components/Header'

const App = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = React.useState(true)
  const [lots, setLots] = React.useState<Lot[]>([])


  React.useEffect(() => {
    // fetch user data from firebase db
    setLoading(true)
    async function fetchLots() {
      const q = query(collection(db, "lots"))
      const querySnapshot = await getDocs(q);
      const lots: Lot[] = []
      querySnapshot.forEach((doc) => {
        let lot = doc.data() as Lot
        lot.id = doc.id
        lots.push(lot)
      });
      setLots(lots)
      console.log(lots)
    }

    fetchLots().then(() => {
      setLoading(false)
    }).catch((error) => {
      console.log('Error getting document:', error)
    })


  }, [])

  // redirect to login if not logged in
  React.useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login')
    }
  }, [navigate])


  const lotCards = (
    <ul>
      {lots.map((lot) => (
        <li key={lot.id} className="m-4 overscroll-auto">
          <ParkingLotCard lot={lot} />
        </li>
      ))}

    </ul>
  )

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-500'>
      <Header />
      {loading ? <LoadingWheel /> :
        <div className="flex flex-col items-center w-full sm:flex-row sm:justify-center sm:items-center m-2 sm:p-0">
          <Map lots={lots} />
          <div className="flex flex-col items-center max-w-full mt-8">
            {lotCards}
          </div>
        </div>}
      <NavBar location='app' />
    </div>

  )
}


export default App