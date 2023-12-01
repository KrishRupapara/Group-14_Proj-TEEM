"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Nav_Home() {
  const [navbar,setNavbar]=useState(false)
  return (
    <div>
    {/* old code start*/}
    
      {/* old code finish */}
    
      <div className="">
      
          <nav className=" bg-nav w-full mx-auto top-0 left-0 right-0 z-10">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                  <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    {/* logo */}
                    <Image
                      src="/img/logo.png"
                      alt="Image is Not Found"
                      width={100}
                      height={100}
                    />
                    <div className="md:hidden">
                        <button className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400"
                          onClick={() => setNavbar(!navbar)}>
                            { navbar ? (
                              <Image src="/img/close.png" width={30} height={30} alt="logo"/>
                            ):(
                              <Image 
                                src="/img/menu.png"
                                width={30}
                                height={30}
                                alt="logo"
                                className="focus:border-none active:border-none"
                              />
                            )

                            }
                        </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0
                    ${navbar ? 'p-12 md:p-0 block' : 'hidden'}
                  `}>
                    <ul className="h-screen md:h-auto items-center justify-center md:flex">
                      <li className="pb-6 text-xl text-white py-6 md:px-6 text-center md:hover:text-black md:hover:bg-transparent">
                        <Link href="/about" onClick={()=>setNavbar(!navbar)}>
                            Features
                        </Link>
                      </li>
                      <li className="pb-6 text-xl text-white py-6 md:px-6 text-center md:hover:text-black md:hover:bg-transparent">
                        <Link href="/about" onClick={()=>setNavbar(!navbar)}>
                            Contact Us
                        </Link>
                      </li>
                      <li className="pb-6 text-xl text-white py-6 md:px-6 text-center md:hover:text-black md:hover:bg-transparent">
                        <Link href="/login" onClick={()=>setNavbar(!navbar)}>
                            Login
                        </Link>
                      </li>
                      <li className="pb-6 text-xl text-white py-6 md:px-6 text-center md:hover:text-purple-600 md:hover:bg-transparent">
                        <Link href="/signup" className="text-md px-8 py-4 bg-[#101D42] text-white hover:bg-white hover:text-[#101D42] delay-100 transition-colors  rounded-xl">Sign Up</Link>
                      </li>
                    </ul>
                  </div>
                </div>

            </div>
          </nav>
      </div>
      </div>
  )

}
