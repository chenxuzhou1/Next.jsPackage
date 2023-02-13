import Router from 'next/router'
import { useState } from 'react'
export default function index(){
   
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message,setMessage]=useState('') 
  
    async function submitFrom(e) {
      e.preventDefault();

  try {
    const response = await fetch('/api/login2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();
   
    if (data.message === 'success') {
      setMessage('Registration Successful!');
       Router.push("/Welcome")
       localStorage.setItem('userData', JSON.stringify({
        username,
        password
      }));
      
    } else {
      setMessage(data.message);
    }
  } catch (error) {
    setMessage('Registration failed. Please try again later.');
  }
            
   
      
      
    }
      
            
      
      
      
    
    return(
        <div className='bg-gradient-to-l from-slate-500 to-indigo-500 animate-pulse' >
        <div className="container py-12 px-6 h-full xl:w-9/12 pl-96  ">
            <div className="border-2 border-black grid place-items-center h-screen pt-10 rounded-xl shadow-lg bg-white">
                <h1 className="text-2xl pt-3 font-bold">Login</h1>
                <form >
                    <ul className="">
                        <li><label>Name</label></li>
                        <li><input className="w-96 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type='text' name='username' value={username} placeholder="Your name" onChange={e => setUsername(e.target.value)} /></li>
                        
                        <li><label>Password</label></li>
                        <li><input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type='password' name='password' value={password} placeholder="Your password" onChange={e => setPassword(e.target.value)} /></li>
                        
                    </ul>

                    <h1>{message}</h1>
                </form>
                <div >
             <button onClick={submitFrom} className="w-64 h-12   bg-emerald-400 p-2 rounded-full shadow-sm">Login</button>
                </div>
                <div className="">
                    <p className="text-xs">No account?</p>
                    <button onClick={()=>Router.push('/register')} className="text-sm text-blue-400"><p className="mx-auto">To register</p></button>
                </div>
                
            </div>
        </div>
        
    </div>
        
        )
    
}