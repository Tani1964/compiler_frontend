import { useContext } from "react"; 
import { DataContext } from "../contexts/DataContext";


const Interpreter = () => {
  // Create a state variable 'data' initialized with 'null', and a setter function 'setData'
  // const [data, setData] = useState(null);
  const {data, setData} = useContext(DataContext)
  // console.log(data.interpreter)
  if (data){
    setData(data)
    console.log(data.interpreter)
  }

  // useEffect hook to fetch data when the component is mounted
  // useEffect(() => {
  //   // Make an HTTP GET request to the specified URL using Axios
  //   axios
  //     .get("http://127.0.0.1:5000") // Fetching from a local server at 127.0.0.1 on port 5000
  //     .then((response) => {
  //       // If the request is successful, update 'data' with the value from the server response
  //       setData(response.data); // Access the 'interpreter' field from the response data
  //     })
  //     .catch((err) => {
  //       // If there's an error, log it to the console
  //       console.error(err);
  //     });
  // }, []); 

  return (
    // Return a JSX element to display the fetched data
    <div className="h-[20%] border-2 rounded-xl shadow-inner py-1 px-1"> 
      {/* Display the text "Interpreter output (Tokens):" followed by the 'data' */}
      Interpreter output: {data?data.interpreter: ""}
    </div>
  );
};

// Export the Interpreter component as the default export for use in other parts of the application
export default Interpreter;
