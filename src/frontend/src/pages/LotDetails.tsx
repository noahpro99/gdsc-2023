import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { Lot } from '../types'

const LotDetails = () => {

    // pull lot id from url
    const id = useParams().toString()
    const [loading, setLoading] = React.useState(true)
    const [lot, setLot] = React.useState<Lot>()




    React.useEffect(() => {
        async function fetchLot() {
            await getDoc(doc(db, "lots", id))
                .then((doc) => {
                    if (doc.exists()) {
                        setLot(doc.data() as Lot)
                    } else {
                        console.log("No such document!");
                    }
                }
                ).catch((error) => {
                    console.log("Error getting document:", error);
                }
                )
        }
        setLoading(true)
        fetchLot().then(() => {
            setLoading(false)
        }
        ).catch((error) => {
            console.log('Error getting document:', error)
        }
        )
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{lot?.name}</h1>
            <p>{lot?.address}</p>
            <p>{lot?.spots}</p>
        </div>
    )





}

export default LotDetails