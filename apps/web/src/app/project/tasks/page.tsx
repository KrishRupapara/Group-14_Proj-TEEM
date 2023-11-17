import React from 'react'
import Tasks from "./components/tasks";
import Progressbar from '@/components/ui/progress-bar'

export default function page() {
    return (
        <div className='h-screen Projectbg p-10'>
            <div className='border rounded-2xl bg-white grid grid-cols-4 gap-4'>
                <div className='col-start-1 grid gap-0 content-end p-2'>
                    <p className='font-bold text-3xl'>Project Name</p>
                    <p className='text-lg'>Manager name</p>
                </div>
                <div className='col-end-6'>
                    <Progressbar percent={75} />
                </div>
            </div>
            <>
                <Tasks />
            </>
        </div>
    )
}
