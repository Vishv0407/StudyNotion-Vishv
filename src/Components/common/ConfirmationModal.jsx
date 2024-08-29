import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  console.log(modalData);
  return (
    <div className="absolute w-full h-[80vh] flex flex-col justify-center items-center">
      <div>
        <h1>{modalData.text1}</h1>
        <p>{modalData.text2}</p>
        <div>
          <button
            onClick={modalData.btn1Handler ? modalData.btn1Handler : () => {}}
          >
            {modalData.btn1Text}
          </button>

          <button
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
