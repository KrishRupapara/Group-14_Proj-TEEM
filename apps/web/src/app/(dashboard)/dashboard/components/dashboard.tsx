import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function Dashboard() {
  return (
    <div className='w-5/6 mx-auto h-full'>
        <Image src="/img/dashdoodle.png" alt="Image Not found" fill/>
        {/* Navbar */}
        <div className='h-[8rem] w-full mx-auto border-2 border-black flex flex-row items-center justify-between px-5'>
            <div>
                <Image src="/img/logoblack.png" alt="Image Not found" width={140} height={150}/>    
            </div>
            <ul className='flex gap-10 whitespace-nowrap justify-around items-center'>
                <li><Link href="">Home</Link></li>
                <li><Link href="">Help</Link></li>
                <li><Link href="">Profile</Link></li>
            </ul>
        </div>
        {/* Searchbar */}
        <div className='h-[5rem] w-full border-2 border-red-400 flex flex-row justify-center items-center '>
            <input type="text" 
            className='w-2/4'/>
            <button className='w-1/4'>Menu</button>
            <button className=''>Add New</button>
        </div>
        {/* Task */}
        <div className='grid grid-cols-3 h-[calc(100vh-13rem)] w-full border-2 border-yellow-600 p-12 gap-16 '>
            <div className='bg-orange-200 border-2 border-black rounded-xl p-1'>
                {/* <div>
                    <div className='w-1/2'>
                        <h4>Project Name</h4>
                        <h3>75</h3>
                    </div>
                    <div className='w-1/2'>
                        
                    </div>
                </div>
                
                <h3>75% Daily Goal</h3>
                <h4>82 This Week</h4> */}
            </div>
            <div className='bg-orange-200 border-2 border-black rounded-xl'></div>
            <div className='bg-orange-200 border-2 border-black rounded-xl'></div>
            <div className='bg-orange-200 border-2 border-black rounded-xl'></div>
            <div className='bg-orange-200 border-2 border-black rounded-xl'></div>
            <div className='bg-orange-200 border-2 border-black rounded-xl'></div>
        </div>
    </div>
  )
}
