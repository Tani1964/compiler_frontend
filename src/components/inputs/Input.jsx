import axios from "axios";
import { useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const Input = () => {
  const [text, setText] = useState("a=b+c");
  const [error, setError] = useState(null);
  const { setData } = useContext(DataContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors
    
    try {
      const response = await axios.post('https://tani1964.pythonanywhere.com/', {
        text: text
      });
      
      console.log('Form submitted successfully:', text);
      setData(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.status == 500)
        {
        const errorMessage = "Please input data in right format -> Arithmetic operation..."
        setError(errorMessage);
      }else{

        // Extract the error message
        
        const errorMessage = error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'An unknown error occurred';
        
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="w-full h-[10%] relative">
      <form onSubmit={handleSubmit} className="lg:w-1/2 flex gap-2">
        <div className="relative w-1/2">
          <input
            name="text"
            className="w-full py-2 px-2 border-2 border-green-400"
            type="text"
            placeholder="Enter your arithmetic expression:"
            onChange={(e) => setText(e.target.value)}
            value={text}
            autoFocus
          />
          
          {/* Error popup */}
          {error && (
            <div className="absolute transform translate-x-full mt-1 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-md z-10 max-w-xs">
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
        <button
          className="py-2 px-2 bg-green-400 text-white rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;