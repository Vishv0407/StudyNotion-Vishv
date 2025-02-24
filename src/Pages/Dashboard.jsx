import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading){
        return (
            <div className="text-white">Loading bro...</div>
        )
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <Sidebar />
            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
                <div className='mx-auto w-full '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard