import React, { useState, useEffect } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  src,
  alt,
  isOpen,
  onClose,
}) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 transition-opacity duration-500">
      <div className="relative mx-auto transition-all duration-500 transform ease-in-out">
        <img
          src={src}
          alt={alt}
          className={`w-48 h-48 ${
            open ? "p-1 border-8 border-cyan-600" : "p-0 border-0"
          } rounded-full shadow-2xl`}
        />
        <button
          className="absolute top-0 right-0 mt-2 mr-2 p-2 text-white bg-red-600 rounded-lg focus:outline-none"
          onClick={() => {
            setOpen(false);
            setTimeout(onClose, 500);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};
