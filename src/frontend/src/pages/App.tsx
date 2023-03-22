import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import NavBar from '../components/NavBar'
import Map from '../components/Map'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Lot } from '../types'
import ParkingLotCard from '../components/ParkingLotCard'
import LoadingWheel from '../components/LoadingWheel'




const App = () => {
    const navigate = useNavigate()

  const [loading, setLoading] = React.useState(true)
  const [lots, setLots] = React.useState<Lot[]>([])


  React.useEffect(() => {
    // fetch user data from firebase db
    setLoading(true)
    async function fetchLots() {
      const q = query(collection(db, "lots"), where("spots", ">", 0))
      const querySnapshot = await getDocs(q);
      const lots: Lot[] = []
      querySnapshot.forEach((doc) => {
        lots.push(doc.data() as Lot)
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
        <li key={lot.id}>
          <ParkingLotCard lot={lot} />
        </li>
      ))}

    </ul>
  )

    return (
      <div className='flex flex-col items-center min-h-screen bg-gray-500'>
        <div className="text-5xl font-bold
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-orange-500 via-orange-600 to-orange-500
            animate-text p-2 m-2
            ">
          ParkSpot
        </div>
        {loading ? <LoadingWheel /> : (<Map lots={lots} />)}
        {loading ? <></> : (<div className="my-6">{lotCards}</div>)}
        <NavBar location='app' />
        </div>

    )
}


export default App