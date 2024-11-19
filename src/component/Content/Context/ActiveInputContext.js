import {useState ,createContext} from "react";

const ActiveInputContext = createContext();

function ActiveInputProvider({childrend}) {
    const [activeInput,setActiveInput] = useState(null);

    return (
        <ActiveInputContext.Provider value={activeInput}>
            {childrend}
        </ActiveInputContext.Provider>
    )
}
export {ActiveInputContext,ActiveInputProvider}