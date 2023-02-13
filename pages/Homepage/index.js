import Router, { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import Title from '../../components/Header/Title.jsx'
import ListMenu from '../../components/Header/Listmenu.jsx'
import Accountinformation from '../../components/varyContent/Accountinformation.js'

import path from 'path'
import Link from 'next/link.js'
import cookie from 'cookie'

export default function Home(props) {
    const router = useRouter();
    // const message = router.query.message
    // const contact = router.query.contact
    // const schoolCode = router.query.schoolCode
    const [currentContent, setCurrentContent] = useState(1)

    function handleButtonClick(content) {
        setCurrentContent(content)

    }
    console.log(props.data)
    

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
                            <li onClick={() => Router.push("/packages")} className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Your Package</li>
                            <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'> Contact</li>
                            <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Client DownLoad</li>

                        </ul>
                    </div>
                    {/* 2 Buttons*/}
                    <div className='flex justify-end bg-blue-400'>
                        <h5 className=' text-xl font-bold p-4   text-white'>Hello,{props.cookies.username}</h5>

                    </div>
                    <button onClick={() => Router.push("http://localhost:3000/")} className=' text-xl font-bold p-6 '>Sign out</button>
                </div>

            </div>
            {/*导航*/}
            <div className='grid grid-cols-8 pt-1 bg-blue-900 h-screen  '>
                <div className='col-start-2 col-span-2 bg-gray-900 '>
                    <ul className='flex flex-col item-center pl-16 pt-28 '>
                        <li onClick={() => handleButtonClick(1)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Account overview</li>
                        <li onClick={() => handleButtonClick(2)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Parcels situation</li>
                        <li onClick={() => handleButtonClick(3)} className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Edit your profile</li>
                        <li className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Predict for your parcels</li>
                        <li className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Change your password</li>
                        <li className='text-white p-7 border-solid border-2 border-gray-800 cursor-pointer hover:text-cyan-400'>Privacy setting</li>
                    </ul>
                </div>
                {/*45>内容*/}
                {currentContent === 1 && (
                    <div className='col-start-4 col-span-4 bg-white'>
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
                                        <td className='text-gray-300 pl-5 pt-5'>Contact</td>
                                        <td className='pl-96 pt-5'>{props.cookies.contact}</td>
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
                    <div>
                        <div className='pt-10 flex flex-col'>
                            <h1 className='text-5xl text-white font-bold pl-5 '>Parcels situation</h1>
                            
                            <div className='pt-6 '>

                                {props.data.parcels.map((parcel) => (
                                    <div className='pt-1 pl-4 flex flex-row' key={parcel.id}>
                                        
                                        <h2 className='bg-white pl-3 p-3 border-r-4'>{parcel.id}</h2>
                                        <h2 className='bg-white w-60 border-r-4 p-3'>{parcel.ParcelName}</h2>
                                        <h2 className='bg-white max-w-md p-3 border-r-4 pl-10'>{parcel.Parcel_orderNo}</h2>
                                        <h2 className='bg-white border-r-4 '>{parcel.is_deliveried}</h2>
                                        <h2 className='bg-white  '>{parcel.is_issued}</h2>
                                    </div>
                                ))}
                            </div>
                            </div>
                       
                        <div>

                        </div>
                    </div>

                )}
                {currentContent === 3 && (
                    <div className='col-start-4 col-span-4 bg-white'>
                        <h1 className='text-5xl font-bold pl-5 pt-5'>Edit profile</h1>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Contact</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="Email" />
                        </div>

                        <h2 className='text-xl font-bold pl-5 pt-5'>Gender</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="Gender" />
                        </div>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Day of Birth</h2>
                        <div className='pl-5'>
                            <input className="form-control block w-4/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' placeholder="Day of Birth" />
                        </div>
                        <h2 className='text-xl font-bold pl-5 pt-5'>Your delovery address</h2>
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
