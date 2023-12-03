import Link from "next/link";

export default function Footerpage() {
  return (
    <div className='h-48'>
        <div className='footer-bg h-[calc(60vh-3.5rem)] flex bg-[#040D21]'>
            <div className='xl:w-3/5 sm:w-full mx-auto justify-center my-auto'>

             <h1 className='mx-auto text-2xl font-bold text-center py-5 text-white'>With TEEM fruitful meetings <br /> are just click away. <br /> Join TEEM for free Today</h1>
              <div className='flex xl:w-4/6 sm:w-full justify-around items-center h-12 mx-auto'>
              <Link href="/signup" className="text-md px-10 py-2 bg-[#164de3] text-white hover:bg-white hover:text-[#101D42] delay-100 transition-colors  rounded-xl">Sign Up</Link>
          
              </div>
              </div>
        </div>
        <div className='bg-black h-[5rem]'>
            <div className='w-full items-center flex  justify-center border border-white  h-full'>
                <h2 className='h-28px text-center justify-center xl:mx-96 font-bold font-serif text-xl text-white'>Copyright &#169; 2023 TEEM</h2>
            </div>          
        </div>
    </div>
    
  )
}