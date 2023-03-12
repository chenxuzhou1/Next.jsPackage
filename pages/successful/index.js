import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import cookie from 'cookie'

export default function Welcome(props) {
  
  



  return (
    <div className='bg-gradient-to-l from-slate-500 to-indigo-500 '>
      
        <div className="flex flex-col justify-center place-items-center h-screen pt-10 rounded-xl shadow-lg'bg-gradient-to-l from-slate-500 to-indigo-500 ">
          <h1 className='text-2xl text-gradient-to-l from-white to-red-500 animate-pulse'>Successfully entered the warehouse! ! ! !</h1>
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