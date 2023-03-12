import { useState ,useEffect} from 'react';
import qr from 'qrcode'
export default function Welcome(props) {
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  useEffect(() => {
    const generate = async () => {
      const qrCodeDataUrl = await qr.toDataURL('http://100.77.66.121:3000/test');
      setQRCodeUrl(qrCodeDataUrl);
    };
    generate();
  })
    return (
        
       <div className='bg-gradient-to-l from-slate-500 to-indigo-500 '>
         <div className="container py-12 px-6 h-full xl:w-9/12 pl-96  ">
           <div className="flex flex-col justify-center place-items-center h-screen pt-10 rounded-xl shadow-lg'bg-gradient-to-l from-slate-500 to-indigo-500 ">
           <img className='pb-10 ' src={qrCodeUrl}/>
           <h2 className='text-red-500 pb-60  text-3xl'>DownLoad the Mobile verison</h2>
           </div>
   
         </div>
       </div>
     )
    }