import { useEffect,useState ,createContext} from "react";

const apiData = "http://192.168.196.2:4000/data";
const DataContext = createContext();

function DataProvider({children}) {
    const [data,setData] = useState([]);
    // const [activeBook, setActiveBook] = useState(null);
    
    useEffect(() => {
        fetch(apiData)
        .then(reponese => reponese.json())
        .then (data => {
        setData(data);
        })
    },[]);
  
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    ) 
}
export {DataProvider,DataContext}