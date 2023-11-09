import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser,
    faBell
  } from "@fortawesome/free-solid-svg-icons";
export default function Dashboardnav() {
  return (
    <div className='h-[5rem] w-5/6 mx-auto flex flex-row items-center justify-between px-5'>
            <div>
                <Image src="/img/logoblack.png" alt="Image Not found" width={140} height={150}/>    
            </div>
            <ul className='flex gap-10 whitespace-nowrap justify-around items-center text-2xl'>
                <li><Link href="">Dashboard</Link></li>
                <li>
                    <Link href="">
                    <Image
                    src="/apps/web/public/img/add_icon.png"
                    alt="Image Not found"
                    width={50}
                    height={500}
                    />
                    </Link>
                </li>
                <li>
                    <Link href="">
                    <FontAwesomeIcon
                        icon={faBell}
                    />
                    </Link>
                </li>
                <li>
                    <Link href="">
                    <FontAwesomeIcon
                        icon={faUser}
                    />
                    </Link>
                </li>
            </ul>
    </div>
  )
}
