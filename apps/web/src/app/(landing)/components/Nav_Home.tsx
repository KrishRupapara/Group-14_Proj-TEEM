import Image from "next/image";
import Link from "next/link";


export default function Nav_Home() {
  return (
    <div className="flex p-2 w-4/5 mx-auto relative mt-10 justify-between text-white items-center">
      <div>
        <Image
          src="/img/logo.png"
          alt="Image is Not Found"
          width={100}
          height={100}
        />
      </div>


      <ul className='flex gap-10 whitespace-nowrap justify-around items-center'>
              <li className="hover:text-black"><Link href="">Features</Link></li>
              <li className="hover:text-black"><Link href="">Contact Us</Link></li>
              <li className="hover:text-black"><Link href="/login">Login</Link></li>
              <li><Link href="/signup" className="text-md px-10 py-4 bg-[#101D42] text-white hover:bg-white hover:text-[#101D42] delay-100 transition-colors  rounded-xl">Sign Up</Link></li>
              {/* <button className=' text-md px-10 py-3 bg-[#101D42] text-white'>Sign Up</button> */}
          </ul>
      
      </div>
  )

}
