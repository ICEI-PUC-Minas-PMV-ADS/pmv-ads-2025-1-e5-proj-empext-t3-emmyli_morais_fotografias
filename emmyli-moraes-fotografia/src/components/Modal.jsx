import React from "react";

function Modal({ isOpen, onClose, children, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-[#c09b2d]">{title}</h2>
        <p>{content}</p>
        {children}
      </div>
    </div>
  );
}

export default Modal;
