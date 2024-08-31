import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { matchPath } from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    //
  return (
    <NavLink 
    to={link.path}
    // onClick
    >
    <div className= {`flex items-center pl-6 gap-x-2 border-l-[6px] border-l-transparent py-2 px-2 font-medium text-richblack-200  ${matchRoute(link.path) ? "bg-yellow-800 border-l-yellow-50 text-yellow-50" : "bg-opacity-0"}`}>
        <Icon className="text-lg" ></Icon>
        <span>{link.name}</span>
    </div>

    </NavLink>
  )
}

export default SidebarLink