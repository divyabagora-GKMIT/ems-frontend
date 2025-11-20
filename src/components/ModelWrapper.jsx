import React, { useEffect } from "react";

const ModelWrapper = ({ open, onClose, children }) => {
  // Disable page scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";   // LOCK SCROLL
    } else {
      document.body.style.overflow = "auto";     // RESTORE SCROLL
    }

    return () => {
      document.body.style.overflow = "auto";     // Cleanup on unmount
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 
        flex justify-center items-start 
        overflow-hidden      
        backdrop-blur-md
        
      "
    >
      {/* Background Overlay - Click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div
        className="
          w-full 
          md:w-2/3 
          lg:w-1/2
          shadow-2xl 
          rounded-none 
          md:rounded-lg 
          p-6 
          mt-10 
          relative
          z-50
          bg-white
          max-h-[90vh]    
          overflow-y-auto /* Internal scroll only */
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default ModelWrapper;
