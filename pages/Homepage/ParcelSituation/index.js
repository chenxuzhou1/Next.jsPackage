import Title from '../../../components/Header/Title.jsx'
import cookie from 'cookie'
import Router from 'next/router'
export default function packages(props) {
return(
    
        <div className='bg-gradient-to-l from-slate-500 to-indigo-500 h-screen'>

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
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Your Package</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'> Contact</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Client DownLoad</li>

        </ul>
  {/* 2 Buttons*/}
  <div className='flex justify-end'>
  <div className='flex  bg-blue-400'>
          <h5 className=' text-xl font-bold p-4   text-white'>Hello,{props.cookies.username}</h5>
        </div>
  <button onClick={()=>Router.push("http://localhost:3000/")} className=' text-xl font-bold p-6 '>Sign out</button>
  </div>
  </div>
  
</div>
<h1 className='text-3xl text-white pl-20 pt-10'>FZH's Package List</h1>
    </div>
)
}
export async function getServerSideProps(context) {
  const { req } = context
  let cookies = req.headers.cookie
  cookies = cookie.parse(req.headers.cookie || '')
  return {
    props: {
      cookies
    }
  }
}