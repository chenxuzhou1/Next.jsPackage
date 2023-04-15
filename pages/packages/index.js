import Title from '../../components/Header/Title.jsx'
import cookie from 'cookie'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function packages(props) {
  const router = useRouter();
  const { express_tracking_number, account_name } = router.query;
  const [express_tracking_number1,setEXT]=useState("")
  const [showPopup1, setShowPopup1] = useState(false);

  function togglePopup1(e) {
    e.preventDefault();
    setShowPopup1(!showPopup1);
  }
  async function submitFrom(e) {

    e.preventDefault();

    try {
        const response = await fetch(process.env.APIpath +'/api/packages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              express_tracking_number
                
            })
        });

        const data = await response.json();
        console.log(data)

    } catch (error) {
        console.log(error)
    }




}
  return (

    <div className='bg-gradient-to-l from-slate-500 to-indigo-500 h-screen'>

      {/* Header */}



      <h1 className='text-3xl text-white pl-20 pt-10'>FZH's Package List</h1>
      <h1 className='text-3xl text-white pl-20 pt-10' value={express_tracking_number1} onChange={(event)=>setEXT(event.target.value)}>{express_tracking_number}</h1>
      <h1 className='text-3xl text-white pl-20 pt-10'>{account_name}</h1>
      <button onClick={togglePopup1} className='text-3xl bg-white '>Out Stack</button>
      {showPopup1 && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-8'>
            <h1 className='text-red-600 pl-3' >Are you sure to out this parcel?</h1>
            <button onClick={togglePopup1} className='text-xl bg-red-400 '>Cancel</button>
            <button onClick={submitFrom} className='text-xl bg-green-400 '>Sure</button>
          </div>
        </div>
      )}
    
  

    </div >
)
}
export async function getServerSideProps(context) {
  const { req } = context
  const { id } = context.query;
  let cookies = req.headers.cookie
  cookies = cookie.parse(req.headers.cookie || '')
  console.log(cookies)
  const response = await fetch(process.env.APIpath +'/api/packages', {
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