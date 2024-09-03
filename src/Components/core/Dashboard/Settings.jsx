import React, { useRef, useState } from 'react';
import PhotoSettings from './PhotoSettings';
import EditFormSettings from './EditFormSettings';
import PasswordSettings from './PasswordSettings';
import DeleteAccount from './DeleteAccount';

const Settings = () => {

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col gap-8 text-white p-8 w-full max-w-[840px]">
                <div className="flex flex-col gap-8">
                    <h1 className="text-3xl">Edit Profile</h1>
                </div>

                <PhotoSettings />

                <EditFormSettings />

                <PasswordSettings />

                <DeleteAccount />

            </div>
        </div>
        
    );
};

export default Settings;
