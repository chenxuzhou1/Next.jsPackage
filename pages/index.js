import Title from '../components/Header/Title.jsx'
import ListMenu from '../components/Header/Listmenu.jsx'
import Introduction from '../components/Content/Introduction'
import Parcelsit from '../components/Content/Parcelsit'
import Router from 'next/router'

export default function Home() {
  return (
    <div className='bg-gradient-to-l from-slate-500 to-indigo-500 '>

      {/* Header */}


      <div className='grid grid-cols-2 p-1 sticky top-0 z-50 bg-white' >
        <div className='flex'>
          <div><Title /></div>
          <div className='border-2 items-center flex rounded-full shadow-sm my-4'>
          <input
            className='flex-grow pl-5 bg-transparent outline-none text-l'
            type="text"
            placeholder="Type Anything"
          />
        </div>
        </div>

        {/* Serach Bar */}
       
        <div className='flex flex-row pl-12'>
        <ul className='flex select-none content-center items-center'>
          <li onClick={()=>Router.push("/packages")} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Your Package</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'> Contact</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Client DownLoad</li>

        </ul>
        {/* 2 Buttons*/}
        <div className='flex justify-end'>
          <button onClick={()=>Router.push('/login2')} className=' text-xl font-bold p-6 '>Login</button>
          <button onClick={()=>Router.push('/register')} className='bg-[#0ea5e9] text-white text-xl font-bold  p-6 hover:bg-cyan-700'>Sign up</button>
        </div>
        </div>
        
      </div>
      
      {/* Content1*/}
      <div className='grid grid-cols-2 p-9 animate-pulse' >
        {/* Intrduction*/}
        <Introduction></Introduction>
        <div className=''>
          <img src='gg.jpg' alt='gg'></img>
        </div>
      </div>
      {/* Content2*/}
      <div className='grid grid-cols-2 p-9 animate-pulse'>
        <div >
          <img src='edg.gif' alt='gg'></img>
        </div>
        <Parcelsit></Parcelsit>
      </div>

    </div>
  )
}
