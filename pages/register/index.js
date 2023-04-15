import Router from 'next/router'
import { useState } from 'react'
import jwt from 'jsonwebtoken'


export default function Home() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message1, setMessage1] = useState('')
    const [message2, setMessage2] = useState('')
    const [address, setAddress] = useState('')
    const [selectedIdentity, setSelectedIdentity] = useState('');
    const [showPassword, setShowPassword] = useState(false);   
    const [email,setEmail]=useState('')
    const [phoneNo,setPhoneNo]=useState('')
    const [schoolCode,setSchoolcode]=useState('')
    const [message3, setMessage3] = useState('')
    const handleIdentityChange = (event) => {
      setSelectedIdentity(event.target.id);
    };
   
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
        email,
        phoneNo,
        password,
        schoolCode,
        address,
        Identity: selectedIdentity,
       
      })
    });

    const data = await response.json();
    console.log(data)
    if (data[0].message1 === 'success' && data[1].message2==='success'&& data[2]=='') {
      setMessage1('Registration Successful!');
       Router.push("/Welcome")
      //  localStorage.setItem('userData', JSON.stringify({
      //   username,
      //   email,
      //   phoneNo,
      //   password,
      //   schoolCode,
      //   address,
      //   Identity: selectedIdentity,
        
      // }));
      
    } else if (data[0].message1!=='success'){
      setMessage1(data[0].message1);
    }
    else if (data[1].message2!=='success'){
      setMessage2(data[1].message2)
    }
    else if (data[2]=='This username is already taken'){
      setMessage3(data[2])
    }
  } catch (error) {
    setMessage3('Registration failed. Please try again later.');
    setMessage3('Registration failed. Please try again later.');
  }
            
   
      
      
    }
    return (
        <div className='bg-gradient-to-l from-slate-500 to-indigo-500 animate-pulse' >
            <div className="container py-12 px-6 h-full xl:w-9/12  pl-96  ">
                <div className="border-2 border-black grid place-items-center h-screen pt-10 rounded-xl shadow-lg bg-white">
                    <h1 className="text-2xl  font-bold">C4Y</h1>
                    <form className="">
                        <ul >
                            <li><label>Name</label></li>
                            <li><input className="w-96 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='username' value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Your name"  /></li>
                            <h1 className='text-red-700'>{message1}</h1>
                            <h1 className='text-red-700'>{message3}</h1>
                            <li><label>Identity</label></li>
                            <div className='flex flex-row justify-start'>
                            <li className='pt-1'><input className=" block  font-normal text-gray-700 bg-white  border border-solid border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='radio' name='contact' id='Student' onChange={handleIdentityChange} checked={selectedIdentity === 'Student'}  ></input></li>
                                <li className='' ><label className='pr-20 ' for='Student'>Student</label></li>
                                <li className='pt-1'><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='radio' name='Identity' id='Manager' onChange={handleIdentityChange} checked={selectedIdentity === 'Manager'} ></input></li>
                                <li ><label className='pr-20' for='Student'>Manager</label></li>
                            </div>
                            <li><label>Email</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='email'  value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" /></li>
                                <li><label>phoneNO</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='phoneNo'  value={phoneNo} onChange={e=>setPhoneNo(e.target.value)} placeholder="+44" /></li>
                                <li><label>address</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='address'  value={address} onChange={e=>setAddress(e.target.value)} placeholder="address" /></li>
                            <li><label>Password</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type={showPassword ? "text" : "password"} onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)} name='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password"  /></li>
                            <li><label>Confirm your Password</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type={showPassword ? "text" : "password"} onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)} name='password' placeholder="Confirm your password"  /></li>
                            <h1 className='text-red-700'>{message2}</h1>
                            <li><label>Schoolcode</label></li>
                            <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                type='text' name='schoolCode' value={schoolCode} onChange={(event) => setSchoolcode(event.target.value)} placeholder="Your schoolcode"/></li>
                        </ul>


                    </form>
                    <div >
                 <button onClick={submitFrom} className="w-64 h-12   bg-emerald-400 p-2 rounded-full shadow-sm">Sign up</button>
                    </div>
                    <div className="flex flex-row">
                        <p className="text-xs">Aready have an account?</p>
                        <button onClick={()=>Router.push('/login2')} className="text-xs text-blue-400 pb-2"><p className="mx-auto">Sign in</p></button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}