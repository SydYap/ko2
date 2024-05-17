import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
// import OSC from 'osc-js';

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [created_at] = useState('')
  const [formError, setFormError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    console.log(title,rating,method)
    const{ data, error} = await supabase
    .from('smoothies')
    .insert([{title, method, rating}])
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
          <h3>Hi &#x2661;, welcome to the show</h3>
          <label htmlFor="title">would you like for it to change:</label>
          <input 
            type="text" 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
  
          <label htmlFor="method">yes?</label>
          <textarea 
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <label htmlFor="rating">no way!</label>
          <input 
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

      
           
         
  
          <button>Submit</button>
  
          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
  
  )
}

export default Create


