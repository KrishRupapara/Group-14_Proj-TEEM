import React from 'react'
import Image from 'next/image'

export default function Tasks() {
  return (
    <div className='border rounded-2xl bg-white grid grid-cols-11 gap-4 mt-5'>
      <div className='col-start-1'>
        <Image
          src="/img/meet.png"
          width={50}
          height={50}
          className='m-2'
          alt="Picture of the author"
        />
      </div>
      <div className='col-start-2'>
        <p className='font-bold'>Title</p>
        <p>Date</p>
      </div>
      <div className='col-end-13'>
        <button className='border rounded-xl p-2 bg-[#295BE7] m-2'>STATUS</button>
      </div>
    </div>
  )
}
