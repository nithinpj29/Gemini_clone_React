import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context=createContext()
const ContextProvider = (props)=>{
    const [input,setInput]=useState('')
    const [recentPrompt,setRecentPrompt]=useState('')
    const [prevPrompt,setPrevPrompt]=useState('')
    const [showResult,setShowResult]=useState(false)
    const [loading,setLoading]=useState(false)
    const [resultData,setResultData]=useState("")
    const delayWord=(index,nextWord)=>{
        setTimeout(()=>{
            setResultData(prev=>prev+nextWord)
        },75*index)
      
    }
    const newChat=()=>{
        setLoading(false);
        setShowResult(false)
    }

    const onSent=async (prompt)=>{
        console.log("prompt",prompt)
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){

            response = await run(prompt)
            setRecentPrompt(prompt)
            console.log("p1",prevPrompt)
        }else{
            
            setPrevPrompt(prev=>[...prev,input]) 
            setRecentPrompt(input)
            response = await run(input)
            console.log("p2",prevPrompt)
        }
        const responseArray=response.split('**')
        let newArray=" ";
        for(let i=0;i<=responseArray.length;i++){
            if(i===0|| i%2!==1){
               newArray +=responseArray[i]
            }
            else{
                newArray += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newFinalResponse=newArray.split('*').join('</br>')
        let newModifiedFinalResponse=newFinalResponse.split(" ")
        for(let i=0;i<newModifiedFinalResponse.length;i++){
            const nextWord=newModifiedFinalResponse[i];
            delayWord(i,nextWord+" ")
        }
       // setResultData(newFinalResponse);
        setLoading(false)
        setInput("")
    }
   
    const contextValue={
        prevPrompt,
        input,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setPrevPrompt,
        setRecentPrompt,
        setInput,
        onSent,
        newChat
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
    </Context.Provider>
    ) 
}
export default ContextProvider