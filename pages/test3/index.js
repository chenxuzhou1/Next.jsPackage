import { useState, useEffect } from 'react';
import qr from 'qrcode'
import Router from 'next/router'
import MobileDetect from 'mobile-detect';
import cookie from 'cookie'
import Modal from 'react-modal';



export default function test(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  function togglePopup(e) {
    e.preventDefault();
    setShowPopup(!showPopup);
  }
  
  function ModalContent() {
    return (
      <div className='bg-indigo-500 '>
        <h1 className='text-2xl text-red-400'>{message} </h1>
        <h1 onClick={()=>(setIsModalOpen(false),Router.push("/test3"))}>exit</h1>
      </div>
    );
  }
  const customStyles = {
    content: {
      width: '400px',
      height: '300px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  };
  async function submitFrom(e) {
    e.preventDefault();
    const md = new MobileDetect(window.navigator.userAgent);
    const userAgent = md.userAgent();
    let express_tracking_number = props.posts[0].express_tracking_number
    let address = props.posts[0].address
    let account_name = props.posts[0].account_name
    let email = props.posts[0].email
    let phone_No = props.posts[0].phone_No
    let Receiving_schoolCode = props.posts[0].Receiving_schoolCode
    let courier = props.posts[0].courier
    let pickup_status = props.posts[0].pickup_status
    let order_created_time = props.posts[0].order_created_time
    let warehouse_time = props.posts[0].warehouse_time
    let cookiename=props.cookies.username


    try {
      const response = await fetch('/api/test3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          express_tracking_number,
          address,
          cookiename,
          email,
          phone_No,
          Receiving_schoolCode,
          courier,
          pickup_status,
          order_created_time,
          warehouse_time
        })
      });

      const data = await response.json();
      console.log(data)
      
      if (data == "Non-existing parcel") {
        setMessage("Non-existing parcel")
        setIsModalOpen(true)
      }
      else if(data == "It's not your parcel!"){
        setMessage("It's not your parcel!")
        setIsModalOpen(true)
      }
      else if (md.mobile()) {
        setMessage("You have picked your parcel")
        // Router.push('/successful')
      }

        else {
          // Redirect to the desktop page
          Router.push('/Mhomepage')
        }
      



    } catch (error) {
      console.log(error)
    }




  }
  return (

    <div className='bg-gradient-to-l from-slate-500 to-indigo-500 w-screen '>

      <div className="flex flex-col justify-center place-items-center h-screen pt-10 rounded-xl shadow-lg'bg-gradient-to-l from-slate-500 to-indigo-500 ">

        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles}>
          <ModalContent />
        </Modal>
        <h1  className='text-gray-300 pl-72 '>Hello,Student {props.cookies.username}</h1>
        <h2 className='text-red-500 animate-pulse pb-12 pr-20 text-3xl'>Pick up your parcel</h2>

        <form className='pb-80'>
          {props.posts.map(post => (
            <div className='flex flex-col' key={post.id}>
              <div className='flex flex-row '>
                <label className='text-white' htmlFor={`tracking_number_${post.id}`}>Tracking Number:</label>
                <input className='bg-inherit' type="text" id={`tracking_number_${post.id}`} value={post.express_tracking_number} />
              </div>
              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`address_${post.id}`}>Address:</label>
                <input className='bg-inherit' type="text" id={`address_${post.id}`} value={post.address} />
              </div>
              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`account_name_${post.id}`}>Account Name:</label>
                <input className='bg-inherit' type="text" id={`account_name_${post.id}`} value={post.account_name} />
              </div>
              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`email_${post.id}`}>Email:</label>
                <input className='bg-inherit' type="email" id={`email_${post.id}`} value={post.email} />
              </div>
              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`phone_no_${post.id}`}>Phone No:</label>
                <input className='bg-inherit' type="text" id={`phone_no_${post.id}`} value={post.phone_No} />
              </div>
              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`school_code_${post.id}`}>Receiving School Code:</label>
                <input className='bg-inherit' type="text" id={`school_code_${post.id}`} value={post.Receiving_schoolCode} />
              </div>
              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`courier_${post.id}`}>Courier:</label>
                <input className='bg-inherit' type="text" id={`courier_${post.id}`} value={post.courier} />
              </div>

              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`order_creared_time${post.id}`}>Order_created_time:</label>
                <input className='bg-inherit' type="text" id={`order_created_time${post.id}`} value={post.order_created_time} />
              </div>
              <div className='flex flex-row'>
                <label className='text-white' htmlFor={`warehouse_time_${post.id}`}>Warehouse Time:</label>
                <input className='bg-inherit' type="text" id={`warehouse_time_${post.id}`} value={post.warehouse_time} />
              </div>
              <div className='flex flex-row justify-around pt-10 '>


                <button onClick={togglePopup} className='text-xl bg-green-300 w-3/6 rounded-full'> take parcel away</button>


                {showPopup && (
                  <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
                    <div className='bg-white rounded-lg p-8'>
                      <h2 className='text-2xl font-bold mb-4'>Are you sure to take this parcel ?</h2>
                      {/* Add form elements here */}
                      <div className='flex justify-around'>
                        <button onClick={togglePopup} className='bg-gray-400 p-3 rounded-full shadow-sm text-white'>Cancel</button>
                        <button onClick={submitFrom} className='bg-blue-400 p-3 rounded-full shadow-sm text-white'>Sure</button>

                      </div>
                      <h1 className='text-red-500'>{message}</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </form>

      </div>

    </div>

  )
}

export async function getServerSideProps(context) {
  const data = await fetch('http://127.0.0.1:3000/data.json')
  const json = await data.json()
  const { req } = context
  let cookies = req.headers.cookie
  cookies = cookie.parse(req.headers.cookie || '')
  console.log(cookies)
  const response = await fetch('http://127.0.0.1:3000/api/test3', {
    
    headers: {
      'Cookie': req.headers.cookie
    }
  });
  const data1 = await response.json();

  console.log(data1);
  return {
    props: {
      cookies,
      data1,
      posts: json.posts
    }
  }
}
