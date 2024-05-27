import { useState} from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
// import OSC from 'osc-js';

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    console.log(title,rating,method)
    const{ data, error} = await supabase
    .from('smoothies')
    .insert([{title}])
    .select();
    if(error){
      console.log(error);
      setFormError('Please fill in all the fields correctly.');

    }
    if(data){
      console.log(data);
      navigate('/create');
    }
   
  }
  

  return (

      <div className="page create">
        <form onSubmit={handleSubmit}>
          <h3>Zoekmachine</h3>
          <label htmlFor="title">wat betekent verbinding?</label>
          <input 
            type="text" 
            id="title"
            placeholder="zoekopdracht"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
  
          <button>Zoeken</button>
  
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
  
  )
}

export default Create


