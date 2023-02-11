import React, { Component } from 'react'

export default class Parcelsit extends Component {
    render() {
        return (
            <div className='flex-col p-10'>

                <div>
                    <h2 className='text-4xl '>Parcels EZly Receiving!</h2>
                    <p className='text-xl text-stone-600 p-1'>Centralized management for packages</p>
                    <ul className='pl-20 pt-1'>
                        <li className='p-4 text-sm  hover:text-cyan-500'>One-stop management package collection</li>
                        <li className='p-4 text-sm  hover:text-cyan-500'>Your Operation only needs to receive your Barcode, message and parcels</li>
                        <li className='p-4 text-sm  hover:text-cyan-500'>Excellent protection for your parcels</li>

                    </ul>
                </div>
            </div>
        )
    }
}
