import React, { useContext, useState } from 'react'
import './Sidebar.css' 
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended,setExtended]=useState(false)
  const {onSent,prevPrompt,setRecentPrompt,newChat}=useContext(Context)

  const loadPrompt=async (prompt)=>{
    setRecentPrompt(prompt)
   await onSent(prompt)
  }
  console.log(prevPrompt,"pvpmt")
  return (
    <>
    <div className='sidebar'>
        <div className='top'>
            <img className='menu' src={assets.menu_icon} alt='' 
            onClick={()=>setExtended(prev=>!prev)}></img>
            <div></div>
            <div onClick={()=>newChat()} className='new-chat'>
            <img src={assets.plus_icon} alt=''></img>
            {extended?<p>New Chat</p>:null}
            
        </div>
        {extended?
          <div className='recent'>
          <p className='recent-title'>Recent</p>
          {prevPrompt?prevPrompt.map((item,index)=>{
            return (
            <div onClick={()=>loadPrompt(item)}className='recent-entry' key={index}>
              <img src={assets.message_icon} alt=''></img>
              <p>{item.slice(0,18)}...</p>
          </div>)
          }):null}
        
        </div>:null
        }
       
        </div>
        <div className='bottom'>
         <div className='bottom-item recent-entry'>
            <img src={assets.question_icon} alt=""></img>
            {extended?<p>Help</p>:null}
         </div>
         <div className='bottom-item recent-entry'>
            <img src={assets.history_icon} alt=""></img>
            {extended?<p>Activity</p>:null}
         </div>
         <div className='bottom-item recent-entry'>
            <img src={assets.setting_icon} alt=""></img>
            {extended?<p>Settings</p>:null}
         </div>
        </div>
    </div>
    </>
  )
}

export default Sidebar