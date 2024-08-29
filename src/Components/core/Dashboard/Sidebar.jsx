import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import {logout} from '../../../Services/Opertations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state)=> state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(authLoading || profileLoading){
        return (
            <div className="loader"></div>
        )
    }

    return (
        <div className='text-white h-[calc(100vh-3.5rem)]'>
            <div className=''>
            {
                sidebarLinks.map((link) => {
                    if(link.type && user?.accountType != link.type) return null
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                    )
                })
            }
            </div>

            <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'>

            <div className='flex flex-col'>
                <SidebarLink 
                    link={{name:"Settings", path:"/dashboard/settings"}}
                    iconName="VscSettingsGear"
                />

                <button
                    onClick={() => { setConfirmationModal({
                        text1: "Are you sure ?",
                        text2: "You will be logged out from your account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => {dispatch(logout(navigate))},
                        btn2Handler: () => {setConfirmationModal(null)},
                    })}}
                    className='text-sm font-medium text-richblack-300'
                >

                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>

                </button>
            </div>

            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar