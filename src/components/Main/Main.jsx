import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {
    const {prevPrompt,
        input,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        onSent}=useContext(Context)
  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img src={assets.user_icon} alt=''></img>
        </div>
        <div className='main-container'>
            {!showResult
            ?<div>
<div className='greet'>
                <p><span>Hello, Developer</span></p>
                <p>How can I help you today</p>
            </div>
            <div className='cards'>
                <div className='card'>
                    <p>Suggest Beautiful Place in kerala for upcoming trip</p>
                    <img src={assets.compass_icon} alt=''></img>
                </div>
            
         
                <div className='card'>
                    <p>please give the kerala beautiful mansoon mutain photo</p>
                    <img src={assets.bulb_icon} alt=''></img>
                
                </div>
            
                <div className='card'>
                    <p>what re the main agriculture farming in Kerala</p>
                    <img src={assets.message_icon} alt=''></img>
                </div>
        
            
                <div className='card'>
                    <p>what is process of developing good quality software</p>
                    <img src={assets.code_icon} alt=''></img>
                </div>
            </div>
                </div>:
                <div className='result'>
                   <div className='result-title'>
                    <img src={assets.user_icon} alt=''></img>
                    {recentPrompt}
                   </div>
                   <div className='result-data'>
                    <img src={assets.gemini_icon} alt=''/>
                    {loading?
                    <div className='loader'>
                        <hr/>
                        <hr/>
                        <hr/>
                        </div>:
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                    
                    </div>
                 </div>
        }
            
            <div className='main-bottom'>
                <div className='search-box'>
                    <input type='input'onChange={(e)=>setInput(e.target.value)} value={input} placeholder='search'/>
                    <div>
                    <img src={assets.gallery_icon} alt=''></img>
                    <img src={assets.mic_icon} alt=''></img>
                   {input?<img onClick={()=>onSent()} src={assets.send_icon} alt=''></img>:null} 
                    </div>
                </div>
            <p className='bottom-info'>
               please double check the gotted answer 
            </p>
        </div>
        </div>
        </div>
  )
}

export default Main