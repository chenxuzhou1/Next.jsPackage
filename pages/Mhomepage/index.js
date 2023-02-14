import Title from '../../components/Header/Title.jsx'
import cookie from 'cookie'
import Router from 'next/router'
export default function packages(props) {
return(
    
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
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Your Package</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'> Contact</li>
          <li className='text-l font-bold  p-2 cursor-pointer  hover:text-cyan-400'>Client DownLoad</li>

        </ul>
  {/* 2 Buttons*/}
  <div className='flex justify-end'>
  <div className='flex  bg-blue-400'>
          <h5 className=' text-xl font-bold p-4   text-white'>Hello,{props.cookies.username}</h5>
        </div>
  <button onClick={()=>Router.push("http://localhost:3000/")} className=' text-xl font-bold p-6 '>Sign out</button>
  </div>
  </div>
  
</div>
<h1 className='text-5xl text-white pl-20 pt-10'>{props.cookies.username}'s Stack Package List</h1>
    <div className='flex flex-row'>
      <h3 className='pl-20 text-white text-2xl'>School area code:</h3>
    <h3 className='text-red-500 pl-5 text-2xl'>{props.cookies.schoolCode}</h3>
    </div>
    <div className='pt-6 '>

{props.data.parcels.map((parcel) => (
    <div className='pt-1 pl-20 flex flex-row' key={parcel.id}>
        
        <h2 className='bg-white pl-3 p-3 border-r-4'>{parcel.id}</h2>
        <h2 className='bg-white pl-3 p-3 border-r-4'>{parcel.Recipient_student}</h2>
        <h2 className='bg-white w-60 border-r-4 p-3'>{parcel.ParcelName}</h2>
        <h2 className='bg-white max-w-md p-3 border-r-4 pl-10'>{parcel.Parcel_orderNo}</h2>
        <h2 className='bg-white border-r-4 '>{parcel.is_deliveried}</h2>
        <h2 className='bg-white  '>{parcel.is_issued}</h2>
    </div>
))}
<div className='flex flex-row justify-end  pt-5 space-x-4 pr-10'>
<button className='bg-gray-400 p-5 rounded-full shadow-sm text-white'>Add new parcel to stack</button>
<button className='bg-gray-400 p-5 rounded-full shadow-sm text-white'>Remove deliveried parcel </button>
</div>
</div>
    </div>
)
}
export async function getServerSideProps(context) {
  const { req } = context
  let cookies = req.headers.cookie
  cookies = cookie.parse(req.headers.cookie || '')
  console.log(cookies)
  const response = await fetch('http://127.0.0.1:3000/api/Mhomepage', {
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