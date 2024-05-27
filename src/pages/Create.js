// created input from audience

import supabase from "../config/supabaseClient.js"
import { useEffect, useState } from "react"

//components
import SmoothieCard from "../components/SmoothieCard.js"

const Home = () => {
  // console.log(supabase)
  const [fetchError, setFetcherror] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const {data, error} = await supabase
        .from('smoothies')
        .select();

        if (error){
          setFetcherror('Could not fetch any smoothie')
          setSmoothies(null)
          console.log(error)

        }
        if (data){
          setSmoothies(data)
          setFetcherror(null)
        }
    }

    fetchSmoothies();
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
          {smoothies.map(smoothie =>(
            <SmoothieCard key={smoothies.id} smoothie={smoothie}/>
          ))}
            </div>
          </div>
      )}
    </div>
  )
}

export default Home