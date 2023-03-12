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
    

    Router.push("http://localhost:3000/")
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
            <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Status set</li>
            <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Stranded packages</li>
            <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Instruction</li>

          </ul>
          {/* 2 Buttons*/}
          <div className='flex justify-end'>
            <div className='flex  bg-blue-400'>
              <h5 className=' text-xl font-bold p-4   text-white'>Hello,{props.cookies.username}</h5>
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
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex flex-row justify-end  pt-5 space-x-4 pr-10'>
          <button onClick={togglePopup} className='bg-gray-400 p-5 rounded-full shadow-sm text-white'>Add new parcel to stack</button>
          {showPopup && (
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
              <div className='bg-white rounded-lg p-8'>
                <h2 className='text-2xl font-bold mb-4'>Add new parcel</h2>
                {/* Add form elements here */}
                <div>
                  <label>express_tracking_number</label>
                  <input className="w-96 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type='text' name='username' placeholder="" />
                  <label>account_name</label>
                  <input className="w-96 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type='text' name='username' placeholder="" />

                </div>
                <button onClick={togglePopup} className='bg-gray-400 p-3 rounded-full shadow-sm text-white'>Cancel</button>
                <button className='bg-blue-400 p-3 rounded-full shadow-sm text-white'>Save</button>
              </div>
            </div>
          )}
          <button onClick={togglePopup} className='bg-gray-400 p-5 rounded-full shadow-sm text-white'>Remove deliveried parcel </button>
          {showPopup && (
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
              <div className='bg-white rounded-lg p-8'>
                <h2 className='text-2xl font-bold mb-4'>Delete parcel history</h2>
                {/* Add form elements here */}
                <div>
                  <label>express_tracking_number</label>
                  <input className="w-96 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type='text' name='username' placeholder="" />
                </div>
                <button onClick={togglePopup} className='bg-gray-400 p-3 rounded-full shadow-sm text-white'>Cancel</button>
                <button onClick={togglePopup1} className='bg-blue-400 p-3 rounded-full shadow-sm text-white'>Delete</button>
                {showPopup1 && (
                  <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
                    <div className='bg-white rounded-lg p-8'>
                      <h2 className='text-2xl font-bold mb-4'>Add new parcel</h2>
                      {/* Add form elements here */}
                      <div>

                        <h1>Are you sure?</h1>
                      </div>
                      <button onClick={togglePopup1} className='bg-gray-400 p-3 rounded-full shadow-sm text-white'>Cancel</button>
                      <button onClick={disablePopups} className='bg-blue-400 p-3 rounded-full shadow-sm text-white'>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
  const response = await fetch('http://127.0.0.1:3000/api/Mhomepage', {
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