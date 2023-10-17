"use client"
import React, { FC, useState, useRef, useEffect} from 'react'
import Image from "next/image"
import Link from 'next/link'

let currentOTPIndex : number=0;
export default function varification() {
    const [otp, setotp] = useState<string[]>(new Array(6).fill(""));
    const [ActiveOTPIndex, setActiveOTPIndex] = useState<number>(0);

    const inputRef= useRef<HTMLInputElement>(null)
    const handleOnChange = ({target}:React.ChangeEvent<HTMLInputElement>):void => {
        const {value} = target;
        const newOTP: string[] = [...otp]
        newOTP[currentOTPIndex] = value.substring(value.length - 1)

        if(!value) setActiveOTPIndex(currentOTPIndex-1)
        else setActiveOTPIndex(currentOTPIndex+1)
        setotp(newOTP)
    };

    const handleOnKeyDown=({key}: React.KeyboardEvent<HTMLInputElement>, index:number)=>{
        currentOTPIndex=index;
        if(key === 'Backspace') setActiveOTPIndex(currentOTPIndex-1);
    }

    useEffect(()=>{
        inputRef.current?.focus();
    },[ActiveOTPIndex]);

    return (
        <div>
            <div className="h-[calc(100vh-4rem)] flex flex-col text-center">
                {/* <div className='flex flex-col justify-center text-center'> */}
                {/* <div> */}
                <Image alt="Image Not Found" src={"/img/Verification_bg.png"} className='-z-30 absolute' fill/>
                {/* </div> */}
                <div className='w-1/4 mx-auto my-auto'>
                    <img src="/img/Logo_black.png" style={{ width: '100%', height: '40%' }} alt="" />
                    <h1 className='font-bold mb-4 mt-3'>Verify your account</h1>
                    <p>Enter the OTP we've sent in your mailbox</p>

                    <div className='flex justify-center items-center space-x-2'>
                        {otp.map((_, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <input
                                    ref={index === ActiveOTPIndex ? inputRef:null}
                                        type="number"
                                        className="my-4 w-12 h-11 border-b-2 bg-transparent outline-none text-center font-semibold 
                                        text-xl spin-button-none border-b-black focus:border-b-black transition"
                                        onChange={handleOnChange}
                                        onKeyDown={(e)=> handleOnKeyDown(e,index)}
                                        value={otp[index]}
                                    />
                                    
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <button className='font-bold rounded-3xl px-10 p-2 bg-[#295BE7] mb-3'>Verify</button>
                    <div>
                        <button className='text-xs'>Resend OTP</button>
                        {/* <Link href="#" className='text-xs'>Resend OTP</Link> */}
                    </div>
                    {/* <p className='text-xs'>Resend OTP</p> */}
                </div>
                {/* </div> */}
            </div>
            <div className='h-[4rem] flex justify-center w-full bg-footer'>
                <div className='mt-3'>
                    <a href="#"><img src="/img/insta.png" style={{ width: '90%', height: '80%' }} alt="" /></a>
                </div>
                <div className='mt-3 ml-2'>
                    <a href="#"><img src="/img/E_mail.png" style={{ width: '75%', height: '80%' }} alt="" /></a>
                </div>
            </div>
        </div>
    )
}
