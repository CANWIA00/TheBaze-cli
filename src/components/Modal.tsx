import React from 'react';

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg w-96">
                {children}
            </div>
        </div>
    );
};

export default Modal;
