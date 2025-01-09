import { createContext, useContext } from "react";

const AbscenceContext=createContext();

export const useAbscence=()=>{
    const context=useContext(AbscenceContext);
    if(!context) throw new Error("Donde esta el contexto")
}


export const AbscenceProvider=({children})=>{
    return (
        <h1>Context</h1>
    )
}