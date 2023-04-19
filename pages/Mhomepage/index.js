import Title from '../../components/Header/Title.jsx'
import cookie from 'cookie'
import Router from 'next/router'
import { useState } from 'react';
export default function packages(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const parcelsWithTrackingId = props.data.parcels.map((parcel, index) => ({
    ...parcel,
    tracking_id: index + 1,
  }));
  function togglePopup() {
    setShowPopup(!showPopup);
  }
  function togglePopup1() {
    setShowPopup1(!showPopup1);
  }

  function disablePopups() {
    setShowPopup(false);
    setShowPopup1(false);

  }
  function tozero() {
    document.cookie = cookie.serialize('username', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('contact', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('Identity', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('email', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('phoneNo', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('express_tracking_number', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('account_name', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('address', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('warehouse_time', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('order_created_time', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('courier', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('phone_No', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('pickup_status', '', { expires: new Date(0) });
    document.cookie = cookie.serialize('schoolCode', '', { expires: new Date(0) });
    

    Router.push("https://next-js-package-dhmy.vercel.app/")
  }


  return (

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
            <li onClick={()=>Router.push("/statusset")} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Status set</li>
            <li onClick={()=>Router.push("/Mhomepage")} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Stranded packages</li>
            <li onClick={()=>Router.push("/instruction")} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Instruction</li>

          </ul>
          {/* 2 Buttons*/}
          <div className='flex justify-end'>
            <div className='flex  bg-blue-400'>
              <h5 className=' text-xs font-bold p-4   text-white'>Hello,Manager {props.cookies.username}</h5>
            </div>
            <button onClick={(tozero)} className=' text-xl font-bold p-6 '>Sign out</button>
          </div>
        </div>

      </div>
      <h1 className='text-5xl text-white pl-20 pt-10'>{props.cookies.username}'s Stack Package List</h1>
      <div className='flex flex-row'>
        <h3 className='pl-20 text-white text-2xl'>School area code:</h3>
        <h3 className='text-red-500 pl-5 text-2xl'>{props.cookies.schoolCode}</h3>
      </div>
      <div className='pt-6 pl-20'>

        <table>
          <thead>
            <tr>
              <th className='text-white border-2'>ID</th>
              <th className='text-white border-2'>Express Tracking Number</th>
              <th className='text-white border-2'>Account Name</th>
              <th className='text-white border-2'>Address</th>
              <th className='text-white border-2'>Phone No</th>
              <th className='text-white border-2'>Email</th>
              <th className='text-white border-2'>Courier</th>
              <th className='text-white border-2'>Order Created Time</th>
              <th className='text-white border-2'>Warehouse Time</th>
              <th className='text-white border-2'>Pickup Status</th>
              <th className='text-white border-2'>Delayed Status</th>
            </tr>
          </thead>
          <tbody>
            {parcelsWithTrackingId.map((parcel) => (
              <tr key={parcel.tracking_id}>
                <td className='text-white border-2'>{parcel.tracking_id}</td>
                <td className='text-white border-2'>{parcel.express_tracking_number}</td>
                <td className='text-white border-2'>{parcel.account_name}</td>
                <td className='text-white border-2'>{parcel.address}</td>
                <td className='text-white border-2'>{parcel.phone_No}</td>
                <td className='text-white border-2'>{parcel.email}</td>
                <td className='text-white border-2'>{parcel.courier}</td>
                <td className='text-white border-2'>{parcel.order_created_time}</td>
                <td className='text-white border-2'>{parcel.warehouse_time}</td>
                <td className={parcel.pickup_status ? 'text-green-600 border-2' : 'text-red-600 border-2'}>
                  {parcel.pickup_status ? 'Delivered' : 'Not delivered'}
                </td>
                <td className='text-white border-2'>{parcel.expired}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex flex-row justify-end  pt-5 space-x-4 pr-10'>
         
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  const { req } = context
  let cookies = req.headers.cookie
  cookies = cookie.parse(req.headers.cookie || '')
  console.log(cookies)
  const response = await fetch('https://fastapi-production-26d4.up.railway.app/Mhomepage', {
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
