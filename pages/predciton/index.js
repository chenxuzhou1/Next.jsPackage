import Title from '../../components/Header/Title.jsx'
import cookie from 'cookie'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function packages(props) {
  const router = useRouter();
  
  return (

    <div className='bg-gradient-to-l from-slate-500 to-indigo-500 h-screen'>

      {/* Header */}



      <h1 className='text-3xl text-white pl-20 pt-10'>FZH's Package List</h1>
      <label>Location</label>
      <input type="text"/>
      <label>is_raining</label>
      <input type="text"/>
      <label>wind level</label>
      <input type="text"/>
      <label>parcel size</label>
      <input type="text"/>
      
        </div>
      
    
  

    
)
}
export async function getServerSideProps(context) {
  const { req } = context
  const { id } = context.query;
  let cookies = req.headers.cookie
  cookies = cookie.parse(req.headers.cookie || '')
  console.log(cookies)
  const response = await fetch('http://127.0.0.1:3000/api/packages', {
    headers: {
      'Cookie': req.headers.cookie
    }
  });
  const data = await response.json();

  console.log(data);
  return {
    props: {
      cookies,
      data
    }
  }
}