import Router, { useRouter } from 'next/router'
import React, { useState, useRef} from 'react'
import jwt from 'jsonwebtoken'
import Title from '../../components/Header/Title.jsx'
import ListMenu from '../../components/Header/Listmenu.jsx'
import Accountinformation from '../../components/varyContent/Accountinformation.js'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import path from 'path'
import Link from 'next/link.js'
import cookie from 'cookie'
import 'react-date-picker/dist/DatePicker.css'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


export default function Home(props) {
    const router = useRouter();
    const [selectedraining, setSelectedraining] = useState(false);
    const [selectedfoggy, setSelectedfoggy] = useState(false);
    const [selectedsnowing, setSelectedsnowing] = useState(false);
    const [distance, setDistance] = useState('');
    const [windlevel, setWindlevel] = useState('');
    const [parcelsize, setParcelsize] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [predict,setPredict]=useState("")
    const handleraining = (event) => {
        setSelectedraining(event.target.id === "true" ? true : false);

    };
    const handlefroggy = (event) => {
        setSelectedfoggy(event.target.id === "true" ? true : false);
    };
    const handlesnowing = (event) => {
        setSelectedsnowing(event.target.id === "true" ? true : false);
    };
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [option, setOption] = useState('')
    const [time, setTime] = useState('')
    const [qrcode, setQRCode] = useState('')
    const [trackingId, setTrackingId] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
    const uname = props.cookies.username
    const handleCheckboxChange = (event) => {
        const trackingNumber = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setCheckedCheckboxes([...checkedCheckboxes, trackingNumber]);
        } else {
            setCheckedCheckboxes(checkedCheckboxes.filter((item) => item !== trackingNumber));
        }
    };
    function checkboxes() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Loop through all the checkboxes and set their "checked" property to true
        checkboxes.forEach((checkbox) => {
            checkbox.checked = true;
        });

        // Update the state of the "isChecked" variable to true
        setIsChecked(true);
    }
    function togglePopup1(e, qr, id) {
        e.preventDefault();
        setQRCode(qr);
        setTrackingId(id);

        setShowPopup1(!showPopup1);

    }
    function togglePopup(e) {
        e.preventDefault();
        setShowPopup(!showPopup);
    }
    
    // const message = router.query.message
    // const contact = router.query.contact
    // const schoolCode = router.query.schoolCode
    const [currentContent, setCurrentContent] = useState(1)
    const parcelsWithTrackingId = props.data.parcels.map((parcel, index) => ({
        ...parcel,
        tracking_id: index + 1,
    }));
    const managerWithTrackingId = props.data.managers.map((manager, index) => ({
        ...manager,
        tracking_id1: index + 1
    }));
    function tozero() {
        document.cookie = cookie.serialize('username', '', { expires: new Date(0) });
        document.cookie = cookie.serialize('email', '', { expires: new Date(0) });
        document.cookie = cookie.serialize('phoneNo', '', { expires: new Date(0) });
        document.cookie = cookie.serialize('Identity', '', { expires: new Date(0) });
        document.cookie = cookie.serialize('schoolCode', '', { expires: new Date(0) });
        window.alert('Quit Successfully')
        Router.push("http://localhost:3000/")
    }
    function handleButtonClick(content) {
        setCurrentContent(content)

    }

    async function submitFrom(e) {

        e.preventDefault();

        try {
            const response = await fetch('/api/Homepage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    time,
                    option,
                    checkedCheckboxes,
                    uname,
                    selectedraining,
                    selectedfoggy,
                    selectedsnowing

                })
            });

            const data = await response.json();
            console.log(data)

        } catch (error) {
            console.log(error)
        }




    }
    function ModalContent() {
        return (
            <div className='bg-indigo-500 '>
                <h1 className='text-2xl text-red-400'>{predict} days </h1>
                <p>before the package arrives, please be patient</p>
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
    async function submitFrom2(e) {

        setIsModalOpen(true);


        // Render the content in the new window
        
        e.preventDefault();

        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    selectedraining,
                    selectedfoggy,
                    selectedsnowing,
                    windlevel,
                    parcelsize,
                    distance

                })
            });

            const data = await response.json();
            console.log(data)
            setPredict(data.predict)


        } catch (error) {
            console.log(error)
        }




    }
    return (
        <div className='bg-gradient-to-l from-slate-500 to-indigo-500  '>

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

                <div className='flex flex-row pr-1'>
                    <div className='flex flex-row pl-12'>
                        <ul className='flex select-none content-center items-center'>
                            <li onClick={() => handleButtonClick(1)} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Homepage</li>
                            <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'> Introduction</li>
                            <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Parcel history</li>

                        </ul>
                    </div>
                    {/* 2 Buttons*/}
                    <div className='flex justify-end bg-blue-400'>
                        <h5 className=' text-xl font-bold p-4   text-white'>Hello,{props.cookies.username}</h5>

                    </div>
                    <button onClick={(tozero)} className=' text-xl font-bold p-6 '>Sign out</button>
                </div>

            </div>
            {/*导航*/}
            <div className='grid grid-cols-12 pt-1 bg-blue-900 h-screen  '>
                <div className='col-start-1 col-span-3 bg-gray-900 '>
                    <ul className='flex flex-col item-center pl-16 pt-28 '>
                        <li onClick={() => handleButtonClick(1)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Account overview</li>
                        <li onClick={() => handleButtonClick(2)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Existing package status</li>
                        <li onClick={() => handleButtonClick(3)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Edit your profile</li>
                        <li onClick={() => handleButtonClick(4)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Predict for your parcels</li>
                        <li onClick={() => handleButtonClick(5)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Check your area's Managers</li>
                        <li className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Privacy setting</li>
                    </ul>
                </div>
                {/*45>内容*/}
                {currentContent === 1 && (
                    <div className='col-start-5 col-span-7 bg-white'>
                        <h1 className='text-5xl font-bold pl-5 pt-5'>Account overview</h1>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Your Profile</h2>
                        <div>
                            <table >
                                <tbody>
                                    <tr className='border-b-2'>
                                        <td className='text-gray-300 pl-5 pt-5'>Username</td>
                                        <td className='pl-96 pt-5'>{props.cookies.username}</td>
                                    </tr>
                                    <tr className='border-b-2'>
                                        <td className='text-gray-300 pl-5 pt-5'>Email</td>
                                        <td className='pl-96 pt-5'>{props.cookies.email}</td>
                                    </tr>
                                    <tr className='border-b-2'>
                                        <td className='text-gray-300 pl-5 pt-5'>PhoneNO</td>
                                        <td className='pl-96 pt-5'>{props.cookies.phoneNo}</td>
                                    </tr>
                                    <tr className='border-b-2'>
                                        <td className='text-gray-300 pl-5 pt-5'>Identity</td>
                                        <td className='pl-96 pt-5'>{props.cookies.Identity}</td>
                                    </tr>
                                    <tr className='border-b-2'>
                                        <td className='text-gray-300 pl-5 pt-5'>Schoolcode</td>
                                        <td className='pl-96 pt-5'>{props.cookies.schoolCode}</td>
                                    </tr>
                                </tbody>



                            </table>
                            <div className='pl-5 pt-5'>
                                <button onClick={() => handleButtonClick(3)} className='bg-blue-400 w-24 h-12 p-2 rounded-full shadow-sm'>Edit profile</button>
                            </div>
                        </div>
                    </div>
                )}
                {currentContent === 2 && (
                    <div className='col-start-4 col-span-9 '>
                        <div className='pt-10 flex flex-col'>
                            <h1 className='text-5xl text-white font-bold pl-5 flex flex-row pb-20'>Existing package status</h1>

                            <table class="border-collapse border border-slate-500 ...">
                                <thead>
                                    <tr>
                                        <th className='text-white border-2'>ID</th>
                                        <th className='text-white border-2'>Express Tracking Number</th>

                                        <th className='text-white border-2'>Address</th>
                                        <th className='text-white border-2'>Phone No</th>
                                        <th className='text-white border-2'>Email</th>
                                        <th className='text-white border-2'>Courier</th>
                                        <th className='text-white border-2'>Order Created Time</th>
                                        <th className='text-white border-2'>Warehouse Time</th>
                                        <th className='text-white border-2'>Pickup Status</th>
                                        <th className='text-white border-2'>Receiving Status</th>
                                        <td className='text-white border-2'>receiveCode</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parcelsWithTrackingId.map((parcel) => (
                                        <tr key={parcel.tracking_id}>
                                            <td className='text-white border-2'>{parcel.tracking_id}</td>
                                            <td className='text-white border-2' >{parcel.express_tracking_number}</td>

                                            <td className='text-white border-2'>{parcel.address}</td>
                                            <td className='text-white border-2'>{parcel.phone_No}</td>
                                            <td className='text-white border-2'>{parcel.email}</td>
                                            <td className='text-white border-2'>{parcel.courier}</td>
                                            <td className='text-white border-2'>{parcel.order_created_time}</td>
                                            <td className='text-white border-2'>{parcel.warehouse_time}</td>
                                            <td className={parcel.pickup_status ? 'text-green-600 border-2' : 'text-red-600 border-2'}>
                                                {parcel.pickup_status ? 'Delivered' : 'Not delivered'}

                                            </td>
                                            <td className='text-red-500 border-2'>None</td>
                                            <td className='border-2'><button onClick={(e) => togglePopup1(e, parcel.QRcode, parcel.express_tracking_number)} className='bg-green-600 rounded-full shadow-sm w-32'>check your receiveCode</button></td>
                                            {showPopup1 && (
                                                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
                                                    <div className='bg-white rounded-lg p-8'>
                                                        <h1 className='text-red-600 pl-3' onClick={(e) => togglePopup1(e, "", "")}>{trackingId}'s QRcode</h1>
                                                        <img src={qrcode} width='200' height='200' />
                                                    </div>
                                                </div>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className=' pt-10 pl-5'>
                                <button onClick={togglePopup} className='bg-blue-400 w-28 h-12 rounded-full shadow-sm'>appoint to receiving</button>
                                {showPopup && (
                                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
                                        <div className='bg-white rounded-lg p-8'>
                                            <h2 className='text-2xl font-bold mb-4'>Select a time to receive</h2>
                                            {/* Add form elements here */}
                                            <div className='flex flex-col'>

                                                <label className='text-xl font-bold mb-4'>Selct time to pick</label>
                                                <Datetime className='border-8' value={time} onChange={(moment) => setTime(moment)} />
                                                <label className='text-xl font-bold mb-4'>Managers currently online</label>
                                                <select className='border-8' value={option} onChange={(event) => setOption(event.target.value)}>
                                                    {managerWithTrackingId.map((manager) => (

                                                        <option value={manager.email}>{manager.username},{manager.email}</option>

                                                    ))}
                                                </select>
                                                <label className='text-xl font-bold mb-4'>Select Your Parcels</label>
                                                {parcelsWithTrackingId.map((parcel) => (
                                                    <label key={parcel.express_tracking_number}>
                                                        <input
                                                            type="checkbox"
                                                            className='text-black border-2'
                                                            value={parcel.express_tracking_number}
                                                            checked={checkedCheckboxes.includes(parcel.express_tracking_number)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        {parcel.express_tracking_number}
                                                    </label>
                                                ))}





                                                <div className='pt-5'>
                                                    <button onClick={checkboxes} className='bg-green-400 rounded-full shadow-sm text-white w-20 '>Select all</button>
                                                </div>
                                            </div>
                                            <div className='flex flex-row justify-around pt-10'>
                                                <button onClick={togglePopup} className='bg-gray-400 p-3 rounded-full shadow-sm text-white'>Cancel</button>
                                                <button onClick={submitFrom} className='bg-blue-400 p-3 rounded-full shadow-sm text-white'>Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div>

                        </div>
                    </div>

                )}
                {currentContent === 3 && (
                    <div className='col-start-5 col-span-7 bg-white'>
                        <h1 className='text-5xl font-bold pl-5 pt-5'>Edit profile</h1>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Email</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="Email " />
                        </div>
                        <h2 className='text-xl font-bold pl-5 pt-5'>PhoneNo</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="PhoneNo " />
                        </div>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Your address</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="not null" />
                        </div>
                        <h2 className='text-xl font-bold pl-5 pt-5'>schoolCode</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="change your schoolcode" />
                        </div>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Your Identity code</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="Your delovery address" />
                        </div>
                        <div className='pr-32 pt-20 flex justify-end '>
                            <div className='pr-12 pt-2'>
                                <button onClick={() => handleButtonClick(1)} className='text-gray-400'>Cancel</button>
                            </div>
                            <div className='pb-10'>
                                <button className='bg-blue-400 w-32 h-10 rounded-full shadow-sm'>Save profile</button>
                            </div>
                        </div>
                    </div>
                )}
                {currentContent === 4 && (
                    <div className='col-start-5 col-span-7 bg-white'>
                        <h1 className='text-5xl font-bold pl-5 pt-5'>Predict your parcel</h1>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Please choose your parcel's condiction</h2>
                        <div>

                            <div className='flex flex-col'>
                                <label className='text-xl font-bold pl-5 pt-5'>Distance</label>
                                <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    type='text' placeholder="input Distance" value={distance} onChange={(event) => setDistance(event.target.value)} />
                                <div className='flex flex-row'>
                                    <label className='text-xl font-bold pl-5 pt-1 p-2'>is_raining</label>
                                    <input className=""
                                        type='radio' id="true" name="raining" onChange={handleraining} />
                                    <label className='font-bold pt-2'>yes</label>
                                    <input className=""
                                        type='radio' id="false" name="raining" onChange={handleraining} />
                                    <label className='font-bold pt-2'>no</label>
                                </div>
                                <div className='flex flex-row'>
                                    <label className='text-xl font-bold pl-5 p-2 pt-1'>is_foggy</label>
                                    <input
                                        type='radio' id="true" name="froggy" onChange={handlefroggy} />
                                    <label className='font-bold pt-2'>yes</label>
                                    <input className=""
                                        type='radio' id="false" name="froggy" onChange={handlefroggy} />
                                    <label className='font-bold pt-2'>no</label>
                                </div>
                                <div className='flex flex-row'>
                                    <label className='text-xl font-bold pl-5 p-2 pt-1'>is_snowing</label>
                                    <input
                                        type='radio' id="true" name="snowing" onChange={handlesnowing} />
                                    <label className='font-bold pt-2'>yes</label>
                                    <input className=""
                                        type='radio' id="flase" name="snowing" onChange={handlesnowing} />
                                    <label className='font-bold pt-2'>no</label>
                                </div>
                                <label className='text-xl font-bold pl-5 pt-5'>Average wind level</label>
                                <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    type='text' placeholder="input wind level" value={windlevel} onChange={(event) => setWindlevel(event.target.value)} />
                                <label className='text-xl font-bold pl-5 pt-5'>parcel sizes</label>
                                <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    type='text' placeholder="input parcel sizes" value={parcelsize} onChange={(event) => setParcelsize(event.target.value)} />
                            </div>
                            <div className='pl-5 pt-5'>
                                <button onClick={submitFrom2} className='bg-green-400 w-24 h-12 p-2 rounded-full shadow-sm'>predict</button>
                                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles}>
                                    <ModalContent />
                                </Modal>




                            </div>
                        </div>
                    </div>
                )}
                {currentContent === 5 && (
                    <div className='col-start-5 col-span-7 bg-white'>
                        <div className='flex flex-row'>
                            <h1 className='text-5xl font-bold pl-5 pt-5'>Your schoolcode:</h1>
                            <h2 className='text-red-500 text-4xl font-bold pl-5 pt-7'>{props.cookies.schoolCode}</h2>


                        </div>
                        <table class="border-collapse border border-slate-500 ... ">
                            <thead>
                                <tr>
                                    <th className='text-black border-2'>ID</th>
                                    <th className='text-black border-2'>Manager</th>
                                    <th className='text-black border-2'>email</th>
                                    <th className='text-black border-2'>phoneNo</th>
                                </tr>
                            </thead>
                            <tbody>

                                {managerWithTrackingId.map((manager) => (
                                    <tr className='text-black border-2' key={manager.id}>
                                        <th className='text-black border-2'>{manager.id}</th>
                                        <th className='text-black border-2'>{manager.username}</th>
                                        <th className='text-black border-2'>{manager.email}</th>
                                        <th className='text-black border-2'>{manager.phoneNo}</th>



                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>
    )
}


export async function getServerSideProps(context) {
    const { req } = context
    let cookies = req.headers.cookie
    cookies = cookie.parse(req.headers.cookie || '')
    console.log(cookies)
    const response = await fetch('http://127.0.0.1:3000/api/Homepage', {
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
