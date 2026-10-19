

import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";

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
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          ← Back
        </button>

        <h2 className="text-lg font-semibold">
          Passport Photo Editor
        </h2>

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

      {/* Image / Cropper */}
      <div className="w-full flex justify-center items-center bg-gray-100 rounded-xl p-3">
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
      </div>

      <p className="mt-3 text-sm text-gray-500 text-center">
        {isCropped
          ? "Passport photo cropped successfully."
          : "Move the crop area and adjust its corners before clicking Apply."}
      </p>
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