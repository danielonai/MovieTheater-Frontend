import React from 'react';
type props = {
    onClose: () => void;
    title:string;
    message:string;
}

const GeneralMessageModal: React.FC<props> = ({ onClose, title, message }) => {

  return (
    <div
    onClick={()=>onClose()}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md w-96 flex flex-col items-center">
        <div className="text-xl font-bold mb-4">{title}</div>
        <div className="mb-4">{message}</div>
        <button
          onClick={()=>onClose()}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GeneralMessageModal;
