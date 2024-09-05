import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed w-full top-0 left-0 z-[100] h-full flex flex-col justify-center items-center overlay-modal">
      <div className="bg-richblack-800 p-4 flex flex-col gap-2 border-[1px] border-richblack-500 rounded-lg">
        <h1 className="font-bold">{modalData.text1}</h1>
        <p className="text-[13px] text-richblack-300">{modalData.text2}</p>
        <div className="flex flex-row gap-4 mt-2">
          <button
            className="text-center text-[13px] px-4 py-2 text-black rounded-md font-bold text-md bg-yellow-50"
            onClick={modalData.btn1Handler ? modalData.btn1Handler : () => {}}
          >
            {modalData.btn1Text}
          </button>

          <button
            className="text-center text-[13px] px-4 py-2 text-black rounded-md font-bold text-md bg-richblack-300"
            onClick={modalData.btn2Handler ? modalData.btn2Handler : () => {}}
          >
            {modalData.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
