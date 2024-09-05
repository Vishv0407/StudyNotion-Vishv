import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { updateProfilePicture } from '../../../Services/Opertations/profileAPI';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const PhotoSettings = () => {
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
        
        dispatch(updateProfilePicture(formData, setFilePreview));
    };

    return (
        <div className="flex flex-row gap-6 items-center p-6 bg-richblack-800 rounded-lg shadow-lg border-[1px] border-richblack-700" >
            <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={filePreview || user.image}
                    alt="Profile"
                />
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-lg font-bold">Change Profile Picture</div>
                <form onSubmit={profilePictureSubmitHandler} className="flex flex-row gap-4 items-center">
                    <button
                        type="button"
                        onClick={filePreview ? handleRemoveFile : handleButtonClick}
                        className={`px-4 py-2 rounded-lg flex items-center focus:outline-none ${
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
                        className="bg-yellow-50 text-black py-2 px-4 rounded-lg"
                        type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default PhotoSettings;
