import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { updateProfilePicture } from '../../../Services/Opertations/profileAPI';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const Settings = () => {
    const { user } = useSelector((state) => state.profile);
    const fileInputRef = useRef(null);
    const [filePreview, setFilePreview] = useState(null);

    const dispatch = useDispatch();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setFilePreview(null);
        fileInputRef.current.value = ''; // Reset the input field
    };

    const profilePictureSubmitHandler = async (e) => {
        e.preventDefault();
    
        if (!fileInputRef.current.files[0]) {
            toast.error("Please select a file");
            return;
        }

        
        const formData = new FormData();
        formData.append("displayPicture", fileInputRef.current.files[0]);
        formData.append("token", localStorage.getItem("token"));
        
        // Pass the FormData instead of the base64 string
        updateProfilePicture(formData, dispatch, setFilePreview);
    };

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col gap-8 text-white p-8 w-full max-w-[840px]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-3xl">Edit Profile</h1>
                </div>

                <div className="flex flex-row gap-6 items-center p-8 bg-richblack-800 rounded-lg shadow-lg">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={filePreview || user.image}
                            alt="Profile"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-lg font-semibold">Change Profile Picture</div>
                        <form onSubmit={profilePictureSubmitHandler} className="flex flex-row gap-4 items-center">
                            <button
                                type="button"
                                onClick={filePreview ? handleRemoveFile : handleButtonClick}
                                className={`px-4 py-2 font-bold rounded-lg flex items-center focus:outline-none ${
                                    filePreview
                                        ? 'bg-caribbeangreen-500 text-white hover:bg-green-600'
                                        : 'bg-richblack-700 text-white hover:bg-richblack-600'
                                }`}
                            >
                                {filePreview ? (
                                    <>
                                        File Selected
                                        <AiOutlineClose
                                            size={16}
                                            className="ml-2 text-white hover:text-red-500"
                                        />
                                    </>
                                ) : (
                                    'Select File'
                                )}
                            </button>
                            <input
                                type="file"
                                name="displayPicture"
                                id="displayPicture"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button 
                                className="bg-yellow-50 text-black py-2 px-4 rounded-lg font-semibold"
                                type='submit'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                <div>
                    
                </div>
            </div>
        </div>
        
    );
};

export default Settings;
