import React from 'react';

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg w-96">
                {children}
                <div className="text-center p-2">
                    <button onClick={onClose} className="text-sm text-gray-400 hover:underline">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
