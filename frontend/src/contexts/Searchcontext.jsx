import React, { createContext, useState } from 'react';

export const contexthook = createContext();

const Searchcontext = ({ children }) => {
    const [context_data, setContext_data] = useState([]);

    const handleContext_data = (el) => {
        console.log("el: ",el);
        setContext_data(el);
    }

    return (
        <contexthook.Provider value={{ context_data, handleContext_data }}>
            {children})
        </contexthook.Provider>
    )
};

export default Searchcontext;
