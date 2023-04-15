import { useState, useEffect } from 'react';
import Title from '../../components/Header/Title.jsx'
import qr from 'qrcode'
import cookie from 'cookie'
import Router from 'next/router.js';
export default function Welcome(props) {
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [status, setStatus] = useState(false)
  const [jiana, setJiana] = useState("working")
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
    document.cookie = cookie.serialize('password', '', { expires: new Date(0) });
        document.cookie = cookie.serialize('status', '', { expires: new Date(0) });
        document.cookie = cookie.serialize('statusvalue', '', { expires: new Date(0) });
    

    Router.push("http://localhost:3000/")
  }
  useEffect(() => {
    const generate = async () => {
      const qrCodeDataUrl = await qr.toDataURL('http://100.77.66.121:3000/test');
      setQRCodeUrl(qrCodeDataUrl);
    };
    generate();
  })

  var uname = props.cookies.username
  var cus = props.cookies.status

  async function handleClick(e) {

    e.preventDefault();
    try {
      const response = await fetch('/api/statusset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uname,
          status,

        })
      });

      const data = await response.json();

      setStatus(!status)
      console.log(status)
      if (status == true) {
        setJiana("On")
      }
      else {
        setJiana("Off")
      }

    } catch (error) {
      console.log(error)
    }




  }
  return (

    <div className='bg-gradient-to-l from-slate-500 to-indigo-500 '>
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
              <h5 className=' text-xl font-bold p-4   text-white'>Hello,{props.cookies.username}</h5>
            </div>
            <button onClick={(tozero)} className=' text-xl font-bold p-6 '>Sign out</button>
          </div>
          </div>
          </div>
      <div className="container py-12 px-6 h-full xl:w-9/12 pl-96  ">
        {status ?
          <div className="flex flex-col justify-center place-items-center h-screen pt-10 rounded-xl shadow-lg'bg-gradient-to-l from-slate-500 to-indigo-500 ">
            <button onClick={handleClick} className='bg-green-400 rounded-full h-60 w-60'>
              <h1 className=' text-red-400  text-3xl '>{jiana}</h1>
              <h2 className='text-white '>Press to change status</h2>
            </button>
          </div> :
          <div className="flex flex-col justify-center place-items-center h-screen pt-10 rounded-xl shadow-lg'bg-gradient-to-l from-slate-500 to-indigo-500 ">
            <button onClick={handleClick} className='bg-red-400 rounded-full h-60 w-60'>
              <h1 className=' text-green-400  text-3xl '>{jiana}</h1>
              <h2 className='text-white '>Press to change status</h2>
            </button>
          </div>}


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