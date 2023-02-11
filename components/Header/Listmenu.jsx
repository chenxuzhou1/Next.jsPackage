import React, { Component } from 'react'
import Router from 'next/router'

export default class ListMenu extends Component {
  render() {
    

    return (
         
        <ul className='flex select-none content-center items-center'>
          <li  className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Your Package</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'> Contact</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Client DownLoad</li>

        </ul>
    )
  }
}
