import React, { Component } from 'react'
import { useRouter } from 'next/router';
export default function Accountinformation(){
    const router = useRouter();
    const message = router.query.message
    const contact=router.query.contact
    const schoolCode=router.query.schoolCode
  
    return (
      <div>
        <h1 className='text-5xl font-bold pl-5 pt-5'>Account overview</h1>
                    <h2 className='text-xl font-bold pl-5 pt-5'>Your Profile</h2>
                    <div >
                        <table  >
                            <tr className='border-b-2'>
                                <td className='text-gray-300 pl-5 pt-5'>Username</td>
                                <td className='pl-96 pt-5'>{message}</td>
                            </tr>
                            <tr className='border-b-2'>
                                <td className='text-gray-300 pl-5 pt-5'>Email</td>
                                <td className='pl-96 pt-5'>{contact}</td>
                            </tr>
                            <tr className='border-b-2'>
                                <td className='text-gray-300 pl-5 pt-5'>Identity</td>
                                <td className='pl-96 pt-5'>Student</td>
                            </tr>
                            <tr className='border-b-2'>
                                <td className='text-gray-300 pl-5 pt-5'>Schoolcode</td>
                                <td className='pl-96 pt-5'>{schoolCode}</td>
                            </tr>
                            
                           
                            

                        </table>
                    </div>
      </div>
    )
  
}
