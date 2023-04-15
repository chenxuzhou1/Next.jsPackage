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


        Router.push("")
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
                        <li onClick={() => Router.push("/statusset")} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Status set</li>
                        <li onClick={()=>Router.push("/Mhomepage")} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Stranded packages</li>
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
           <div className='pl-10 pt-20'> 
            <h1 className='text-white text-3xl'>This document is used to explain how to use the dormitory manager module:</h1>
            <ul>
               <li className='text-white text-xl'> 1. Modify the working status through status</li>
               <li className='text-white text-xl'>   2. Display the package after scanning the code with the mobile phone into the warehouse</li> 
               <li className='text-white text-xl'>  3. Receive reminders for appointment emails
               </li> 
            </ul>
            </div> 



        </div>
    )
}
export async function getServerSideProps(context) {
    const { req } = context
    let cookies = req.headers.cookie
    cookies = cookie.parse(req.headers.cookie || '')
    console.log(cookies)
    const response = await fetch(process.env.APIpath +'/api/Mhomepage', {
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