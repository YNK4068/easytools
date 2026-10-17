
import React, { useRef, useState } from 'react';
import upload_filr_ico from '../icons/upload_filr_ico.png';
import crop_ico from '../icons/crop_ico.png';
import PassPortPhotoComp from './PassPortPhotoComp';

export default function PassPortOpenImageComp() {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPreviewSsection, setShowPreviewSection] = useState(false)


  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Allow dropping files
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Remove drag highlight when leaving the container
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle dropped image
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please drop an image file.');
      return;
    }

    // Assign the dropped file to the input field
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;

      // Trigger the change event
      fileInputRef.current.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }
  };

  return (
    <>
      {showPreviewSsection ? (
        <PassPortPhotoComp
          image={selectedImage}
          onBack={() => setShowPreviewSection(false)}
        />
      ) : (
        <>

          <div className="h-[8vh]"></div>

          {/* Image container */}
          <div
            className={`${showPreviewSsection ? 'hidden' : 'block'} my-5 sm:flex sm:justify-center sm:items-center
                   sm:w-[60%] sm:h-[50vh] sm:m-auto sm:bg-white
                   sm:rounded-2xl sm:p-3 md:h-[60vh]`}
          >
            {/* File select outer div */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-[95vw] h-[48vh] m-auto p-2
                      flex items-center justify-center
                      border-[2px] border-dashed rounded-2xl
                      transition-all duration-200
                      sm:w-[65%] md:w-[50%]
                      ${isDragging
                  ? 'border-blue-600 bg-blue-50 shadow-[0_0_10px_rgba(0,0,0,0.2)]'
                  : 'bg-white border-blue-400 hover:border-blue-600 hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]'
                }`}
            >
              {/* File select inner div */}
              <div className="m-3 flex flex-col justify-center items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image-input"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected preview"
                    className="max-w-full max-h-[25vh] object-contain my-2"
                  />
                ) : (
                  <label htmlFor="image-input" className="cursor-pointer">
                    <img
                      src={upload_filr_ico}
                      alt="Upload image"
                      className="w-[140px] my-5"
                    />
                  </label>
                )}

                <label
                  htmlFor="image-input"
                  className="font-bold text-2xl cursor-pointer"
                >
                  {selectedImage ? 'Change Image' : 'Select Image'}
                </label>

                {!selectedImage ? <p className="font-light text-center">
                  or drag and drop image here
                </p> : ""}

                {/* Crop button container */}
                <div
                  onClick={() => {
                    if (selectedImage) {
                      setShowPreviewSection(true);
                    }
                  }}
                  className={`justify-center gap-1 items-center py-3 px-4
                    bg-[#dcdce0] m-4 rounded-md hover:bg-[#c2c2c8]
                    cursor-pointer
                    ${selectedImage ? 'flex' : 'hidden'}`}
                >
                  <img src={crop_ico} alt="Crop" className="w-8" />
                  <p>Crop</p>
                </div>
              </div>
            </div>
          </div>

        </>
      )}
    </>
  );
}

