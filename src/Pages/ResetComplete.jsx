import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { apiConnector } from '../Services/apiConnector';
import { endpoints } from '../Services/apis';

const ResetComplete = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [token, setToken] = useState(() => {
        // Try to extract the token from location.state or URL
        return location.state?.token || new URLSearchParams(window.location.search).get('token') || "";
    });

    useEffect(() => {
        // If the token is missing, redirect with the token in the URL
        if (!token) {
            navigate('/reset-complete', { replace: true, search: `?token=${token}` });
        }
    }, [token, navigate]);

    const fetchEmail = async () => {
        try {
            if (token) {
                const result = await apiConnector("POST", endpoints.RESETCOMPLETEUSERDATA_API, { token });
                setEmail(result.data.data.email);
            }
        } catch (error) {
            console.log("Could not fetch userData", error);
        }
    }

    // Fetch email when token is set
    useEffect(() => {
        fetchEmail();
    }, [token]);

    const clickHandler = () => {
        navigate("/login");
    }

  return (
    <div className='h-[90vh] flex justify-center items-center'>
       <div className=' w-[80%] md:w-[60%] lg:w-[25%] md:min-w-[400px] m-auto h-[90vh] flex flex-col justify-center items-start'>
            <h1 className='text-richblack-5 font-bold text-3xl mb-4'>
                Reset complete!
            </h1>
            <p className='text-richblack-200 mb-0'>
                Your password has been successfully changed! <br></br>A confirmation email has been sent to <span className="font-bold">{email}</span>.
</p>

            <button onClick={clickHandler} className='bg-yellow-200 py-2 px-4 rounded-lg flex justify-center mt-8 w-full font-semibold'>
                Back to Login
            </button>
       </div>

    </div>
  )
}

export default ResetComplete