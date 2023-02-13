import Router from 'next/router'
import { useState } from 'react'
import jwt from 'jsonwebtoken'


export default function Home() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message1, setMessage1] = useState('')
    const [message2, setMessage2] = useState('')
    const [Identity,setiIdentity]=useState('')
    const [contact,setContact]=useState('')
    const [schoolCode,setSchoolcode]=useState('')
    
   
    async function submitFrom(e) {
     
      e.preventDefault();

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        contact,
        password,
        schoolCode,
        Identity
      })
    });

    const data = await response.json();
    console.log(data)
    if (data[0].message1 === 'success' && data[1].message2==='success') {
      setMessage1('Registration Successful!');
       Router.push("/Welcome")
       localStorage.setItem('userData', JSON.stringify({
        username,
        contact,
        password,
        schoolCode,
        Identity
      }));
      
    } else if (data[0].message1!=='success'){
      setMessage1(data[0].message1);
    }
    else if (data[1].message2!=='success'){
      setMessage2(data[1].message2)
    }
  } catch (error) {
    setMessage1('Registration failed. Please try again later.');
    setMessage2('Registration failed. Please try again later.');
  }
            
   
      
      
    }
    return (
        <div className='bg-gradient-to-l from-slate-500 to-indigo-500 animate-pulse' >
            <div className="container py-12 px-6 h-full xl:w-9/12 pl-96  ">
                <div className="border-2 border-black grid place-items-center h-screen pt-10 rounded-xl shadow-lg bg-white">
                    <h1 className="text-2xl pt-3 font-bold">C4Y</h1>
                    <form >
                        <ul className="">
                            <li><label>Name</label></li>
                            <li><input className="w-96 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='username' value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Your name"  /></li>
                            <h1 className='text-red-700'>{message1}</h1>
                            <li><label>Identity</label></li>
                            <div className='flex flex-row justify-start'>
                            <li className='pt-1'><input className=" block  font-normal text-gray-700 bg-white  border border-solid border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='radio' name='contact' id='Student' onChange={e=>setiIdentity(e.target.id)}  ></input></li>
                                <li className='' ><label className='pr-20 ' for='Student'>Student</label></li>
                                <li className='pt-1'><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='radio' name='Identity' id='Manager' onChange={e=>setiIdentity(e.target.id)}  ></input></li>
                                <li ><label className='pr-20' for='Student'>Manager</label></li>
                            </div>
                            <li><label>Email or phoneNO</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='contact'  value={contact} onChange={e=>setContact(e.target.value)} placeholder="name@email.com or +44" /></li>
                            <li><label>Password</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password"  /></li>
                            <h1 className='text-red-700'>{message2}</h1>
                            <li><label>Your school code</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='schoolCode' value={schoolCode} onChange={(event) => setSchoolcode(event.target.value)} placeholder="Your password"/></li>
                        </ul>


                    </form>
                    <div >
                 <button onClick={submitFrom} className="w-64 h-12   bg-emerald-400 p-2 rounded-full shadow-sm">Sign up</button>
                    </div>
                    <div className="">
                        <p className="text-xs">Aready have an account?</p>
                        <button onClick={()=>Router.push('/login2')} className="text-sm text-blue-400"><p className="mx-auto">Sign in</p></button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}