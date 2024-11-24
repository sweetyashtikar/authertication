import React from 'react'
import '../style/backtologin.css'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const BackToLogin = () => {
  const navigate = useNavigate();

  const navigatorHandler=()=>{
navigate('/login')
  }
  return (
    <div onClick={navigatorHandler} className='backtologin'>
      <IoArrowBack/>
    <span>Back to login</span>  
    </div>
  )
}

export default BackToLogin
