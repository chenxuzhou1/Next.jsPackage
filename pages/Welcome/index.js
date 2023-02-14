import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import cookie from 'cookie'

export default function Welcome(props) {
  
  const router = useRouter();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [redirectSeconds, setRedirectSeconds] = useState(5);
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(redirectSeconds);
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
      console.log(redirectSeconds);
      
    }, 1000)
   
    if (redirectSeconds == 0 && props.cookies.Identity=='Student') {
      
      router.push("/Homepage")
    
      
  
      return;
    }
    else if (redirectSeconds == 0 && props.cookies.Identity=='Manager') {
      router.push("/Mhomepage")
    }
    return () => {
      clearTimeout(timer);
    }
    }, [redirectSeconds]);



  return (
    <div className='bg-gradient-to-l from-slate-500 to-indigo-500 '>
      <div className="container py-12 px-6 h-full xl:w-9/12 pl-96  ">
        <div className="flex flex-col justify-center place-items-center h-screen pt-10 rounded-xl shadow-lg'bg-gradient-to-l from-slate-500 to-indigo-500 ">
          <h1 className='text-3xl text-white font-serif '>Welcome,{props.cookies.username} </h1>
          <h5 className='text-xs text-white  '>Jump to the home page after a {redirectSeconds} seconds</h5>
        </div>

      </div>
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