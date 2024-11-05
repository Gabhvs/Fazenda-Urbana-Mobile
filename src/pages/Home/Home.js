import React from 'react'
import './Home.scss'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const history = useNavigate();

  return (
    <div className='home_container'>
      <span className='home_title'>Descubra a magia em cada pedaço com pitaya fresca</span>
      <span className='home_about' onClick={()=> history('/sobre')}>Conheça quem somos!</span>
      <span className='home_button' onClick={()=> history('/login')} >fazer login</span>
    </div>
  )
}

export default Home