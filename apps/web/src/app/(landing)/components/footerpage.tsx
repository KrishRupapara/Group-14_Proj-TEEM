export default function Footerpage() {
  return (
    <div className='h-48'>
        <div className='footer-bg h-[calc(60vh-3.5rem)] flex bg-[#040D21]'>
            <div className='w-3/5 mx-auto justify-center my-auto'>

             <h1 className='mx-auto text-4xl font-bold text-center py-5 text-white  '>With TEEM fruitful meetings <br /> are just click away. <br /> Join TEEM for free Today</h1>
              <div className='flex w-4/6  justify-around items-center    h-12 mx-auto'>
              <input className=' px-1 py-2 w-3/5  justify-center border rounded-xl' type="email" name="email"  />
              <button className=' text-md w-24  px-1 py-2 rounded-xl  bg-[#164de3] text-white hover: transition-colors'>Sign Up</button>
              </div>
              </div>
        </div>
        <div className='bg-black h-[4.5rem] flex'>
            <div className='w-full items-center flex   justify-center border border-white  h-full   '>
                <h2 className='  h-28px text-center justify-center mx-96  font-bold font-serif text-xl text-white '>Copyright &#169; 2023 TEEM</h2>

                <div className=" flex space-x-6   " >
                <a href="#"><img className='' src="/img/insta.png" style={{ width: '60%', height: '100%' }} alt="logo"  /></a>
                <a href="#"><img className='' src="/img/E_mail.png" style={{ width: '60%', height: '100%' }} alt="email logo" /></a>
                </div>
            
            </div>          
        </div>
    </div>
    
  )
}