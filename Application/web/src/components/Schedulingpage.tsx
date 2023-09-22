import Image from 'next/image'

export default function Schedulepage() {
  return (
    <div className='bg-blue-100 h-screen'>
        <div className='w-4/5 mx-auto grid grid-cols-12 px-3'>
            <div className='col-span-6'>
                <h1 className='font-bold text-2xl font-sans my-5'>Sheduling made easy!</h1>
                <p>Get things done hassle-free without scheduling coming in the way.
<br /><br />
Let us do the scheduling and devote more time to what matters the most!
<br /><br />
You'll just have to give your calendars and leave the  rest to us.</p>
            </div>
        </div>
        <div className='flex justify-end w-4/5 mt-16' >
            <Image alt="image not found" src={"/img/sheduling.png"} width={500} height={500}/>
        </div>
    </div>
  )
}
