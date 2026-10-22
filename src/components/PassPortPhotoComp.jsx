

import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import bg_remove_icon from '../icons/bg_remove_icon.png'

import "react-image-crop/dist/ReactCrop.css";

export default function PassPortPhotoComp({ image, onBack }) {
  const imgRef = useRef(null);

  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [preview, setPreview] = useState(image);
  const [isCropped, setIsCropped] = useState(false);

  // Passport ratio: 3.5 / 4.5 = 7 / 9
  const aspect = 7 / 9;

  useEffect(() => {
    setPreview(image);
    setCrop(undefined);
    setCompletedCrop(null);
    setIsCropped(false);
  }, [image]);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;

    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 50,
        },
        aspect,
        width,
        height
      ),
      width,
      height
    );

    setCrop(initialCrop);
  };

  const handleApplyCrop = () => {
    const img = imgRef.current;

    if (!img || !completedCrop) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = 700;
    canvas.height = 900;

    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      700,
      900
    );

    const croppedImage = canvas.toDataURL("image/jpeg", 0.95);

    // Show cropped image and permanently hide cropper
    setPreview(croppedImage);
    setIsCropped(true);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  return (
    <div className="w-full flex flex-col items-center p-4">

      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <h2 className="text-lg font-semibold">
          Passport Photo Editor
        </h2>
      </div>

      {/* Image / Cropper */}
      <div className={`flex ${isCropped ? 'md:flex-row':''} flex-col items-center
                    ${isCropped ? 'md:items-start':''}  `}>
           
          <div className={`w-[83vw] m-3 flex flex-col justify-center items-center  bg-white  rounded-xl p-3
                          ${isCropped ? 'md:w-[20vw]':'md:w-[30vw]'}`}>
            {preview && (
              <div className="max-w-full">
                {isCropped ? (
                  // Final cropped image only
                  <img
                    src={preview}
                    alt="Cropped passport photo"
                    className="block max-w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  // Cropper visible before applying
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(pixelCrop) => setCompletedCrop(pixelCrop)}
                    aspect={aspect}
                    minWidth={30}
                    keepSelection
                  >
                    <img
                      ref={imgRef}
                      src={preview}
                      alt="Passport photo"
                      onLoad={onImageLoad}
                      className="block max-w-full max-h-[70vh] object-contain"
                    />
                  </ReactCrop>
                )}
              </div>
            )}
          

            <p className="mt-3 text-sm text-gray-500 text-center">
              {isCropped
                ? "Passport photo cropped successfully."
                : "Move the crop area and adjust its corners before clicking Apply."}
            </p>
          </div>
        
      
      
        {/* Button area */}
        {/* for Mobile screen */}

          <div className={`flex items-center justify-center gap-3 mb-4 ${isCropped ? 'hidden':''}`}>
            <button
              onClick={onBack}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              ← Back
            </button>

            {!isCropped && (
              <button
                onClick={handleApplyCrop}
                disabled={!completedCrop?.width || !completedCrop?.height}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Apply
              </button>
            )}
          </div>

          {/* Other controlls */}
          <div className={`w-[83vw] m-3 p-3 ${isCropped ? 'flex':'hidden'} flex-col items-center rounded-lg bg-white
                          ${isCropped ? 'md:w-[20vw]':'md:w-[30vw]'}`}>

              {/* Main controls */}
              <div className="w-[100%] flex ">
                  <button
                      onClick={onBack}
                      className="w-1/2 px-4 py-2 m-2  border rounded-lg bg-gray-400 hover:bg-gray-100"
                    >
                      Back
                  </button>

                  <button className="w-1/2 px-4 py-2 m-2 border rounded-lg bg-gray-400 hover:bg-gray-100">
                    Create
                  </button>

              </div>

              {/* More option */}
              <div className="w-[100%] p-3 ">
                <label className="flex items-center bg-gray-400 p-2 rounded-lg" htmlFor="remove-bg">
                  <p>Remove background</p> 
                  <img className="w-6" src={bg_remove_icon} alt="" />
                </label>
                <input type="checkbox" name="" id="remove-bg" />

              </div>


          </div>
        
      
      </div>

    </div>
  );
}



// ______________________________________________________________________________
// export default function PassPortPhotoComp({ image, onBack }) {
  

//   return (
//     <div className="w-full min-h-screen bg-gray-100 p-5">

//       <button
//         onClick={onBack}
//         className="px-4 py-2 mb-5 bg-gray-200 hover:bg-gray-300 rounded-lg"
//       >
//         ← Back
//       </button>

//       <h1 className="text-2xl font-bold mb-5">
//         Passport Photo Editor
//       </h1>

//       <div className="bg-white p-5 rounded-2xl shadow-md flex justify-center">
//         <img
//           src={image}
//           alt="Selected image"
//           className="max-w-full max-h-[70vh] object-contain"
//         />
//       </div>

//     </div>
//   );
// }