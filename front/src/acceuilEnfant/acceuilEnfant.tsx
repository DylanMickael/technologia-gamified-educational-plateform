import React from 'react'
import NavbarLogo from '../components/Navbar/logo'
import quizz from "../assets/QUIZZ.png"
import dessin from "../assets/dessin.png"
import puzzle from "../assets/puzzle.png" 
import { Link } from 'react-router-dom'
import LogOutButton from '../components/logOutButton'
function AcceuilEnfant() {
  return (
    <div className='landing-layout  h-screen overflow-hidden p-10 '>
        <div className='hero-section'>
           <div className='flex flex-row justify-between items-center'>
             <NavbarLogo/>
              <LogOutButton/>
           </div>
           <div className='flex flex-col justify-evenly h-screen '>
             <h1 className='font-monument text-3xl md:text-5xl leading-snug font-bold text-center'>CHOISISSEZ CE QUE VOUS ALLEZ FAIRE</h1>
             <div className="flex flex-row justify-evenly items-center">
                    <Link to="/pre_enfant" className='flex flex-col justify-center w-1/5 items-center gap-5 rounded-3xl bg-gradient-to-br from-[#C95792]/20 to-[#EDA998]/20 p-8'>
                    <div className='flex flex-col gap-5 items-center'>
                        <img src={quizz} alt="quizz" className='w-48 h-48 rounded-2xl'/>
                        <h1 className='font-monument text-xl md:text-2xl leading-snug font-bold '>QUIZZ</h1>
                    </div>
                    </Link>
                    <Link to="/paintKids" className='flex flex-col justify-center w-1/5  gap-5 rounded-3xl bg-gradient-to-br from-[#C95792]/20 to-[#EDA998]/20 p-8'>
                    <div className='flex flex-col gap-5 items-center'>
                        <img src={dessin} alt="quizz" className='w-48 h-48 rounded-2xl'/>
                        <h1 className='font-monument text-xl md:text-2xl leading-snug font-bold '>COLORIAGE</h1>
                    </div>
                    </Link>
                     <Link to="/" className='flex flex-col justify-center w-1/5 items-center gap-5 rounded-3xl bg-gradient-to-br from-[#C95792]/20 to-[#EDA998]/20 p-8'>
                    <div className='flex flex-col gap-5 items-center'>
                        <img src={puzzle} alt="quizz" className='w-48 h-48 rounded-2xl'/>
                        <h1 className='font-monument text-xl md:text-2xl leading-snug font-bold '>Puzzle</h1>
                    </div>
                    </Link>
            </div>
           </div>
        </div>
    </div>
  )
}

export default AcceuilEnfant