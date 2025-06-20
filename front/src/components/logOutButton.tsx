import { LogOut } from 'lucide-react'
import React from 'react'

function LogOutButton() {
  return (
    <div>
        <button className='p-5 rounded-full bg-gradient-to-r from-[#AE3146] to-[#651627] hover:from-[#BE3156] hover:to-[#751637]'>
            <LogOut  size={25} color='white'/>
        </button>
    </div>
  )
}

export default LogOutButton