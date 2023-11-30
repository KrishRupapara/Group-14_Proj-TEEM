import React from 'react'

export default function Notfound() {
    return (
        <div className='h-screen Projectbg w-screen'>
            <div className='h-screen flex flex-col justify-center item-center lg:w-3/5 md:w-4/5 sm:w-4/5 mx-auto'>
                <p className='text-7xl font-bold mx-auto'>404</p>
                <p className='font-bold text-3xl my-3 mx-auto'>Page not found</p>
                <p className='text-xl mx-auto text-center'>The requested page doesn&apos;t exist or you dont have an access to it.</p>
            </div>
        </div>
    )
}
