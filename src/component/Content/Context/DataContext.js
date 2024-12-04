import { useEffect,useState ,createContext} from "react";

const apiData = "http://192.168.244.2:4000/data";
const DataContext = createContext();

function DataProvider({children}) {
    const [data,setData] = useState([]);
    const [key, setKey] = useState(0)
    function rerender() {
        setKey(key+1)
    }
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