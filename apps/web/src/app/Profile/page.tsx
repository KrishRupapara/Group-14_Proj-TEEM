import React from 'react'
import Link from "next/link";

export default function Profile() {
    return (
        <div>
            <div className='h-[4rem] bg-[#101D42]'>
                <img src="/img/Logo.png" height={100} width={130} className='mx-5' alt="" />
            </div>
            <div className='flex h-[calc(100vh-4rem)]'>
                <div className='w-1/2 bg-gradient bg-gradient flex flex-col justify-center text-center'>
                    <div className='w-4/5 mx-auto'>
                        <h1 className='font-Montserrat font-bold mb-6 text-3xl'>Welcome to TEEM</h1>
                        <h3 className='mb-8 text-xl w-3/5 mx-auto'>We're glad that you chose us, now let's efficiently manage your meetings and projects.</h3>
                        <Link href="#" className='border border-[#101D42] drop-shadow-2xl rounded-full p-4 text-[white] bg-[#101D42]'>Create your first project</Link>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img src="/img/Profile.png" alt="" style={{width: '100%',height: '100%'}} />
                </div>
            </div>
        </div>
    )
}
