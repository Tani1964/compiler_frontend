import axios from "axios"
import { useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const Input = () => {
  const [text, setText] = useState("a=b+c")
  const {data, setData} = useContext(DataContext)

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://tani1964.pythonanywhere.com/', {text: text}).then((response)=>{
    console.log('Form Submitted successfully: ', text)
    setData(response.data)
    console.log(data)
    
  }).catch((error)=>{
    console.error('Error submitting form: ', error)
  })
    // console.log(text)
  }

  

  return (
    <div className="w-[100%] h-[10%]">
        <form onSubmit={handleSubmit} action="http://127.0.0.1:5000" method="POST" className="lg:w-1/2 flex gap-2">
        <input 
  name="text" 
  className="w-1/2 py-2 px-2 border-2 border-green-400" 
  type="text" 
  placeholder="Enter your arithmetic expression:" 
  onChange={(e) => {setText(e.target.value); console.log(text)}} 
  value={text}
  autoFocus 
/>
            <button className="py-2 px-2 bg-green-400 text-white rounded-lg" type="submit">Submit</button>
            
        </form>
    </div>
  )
}

export default Input