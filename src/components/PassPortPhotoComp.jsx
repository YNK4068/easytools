

import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import bg_remove_icon from '../icons/bg_remove_icon.png'
import custom_color_img from '../icons/custom_color.png'


import "react-image-crop/dist/ReactCrop.css";


export default function PassPortPhotoComp({ image, onBack }) {
  const imgRef = useRef(null);

  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [preview, setPreview] = useState(image);
  const [isCropped, setIsCropped] = useState(false);
  const [optRemoveBg, setOptRemoveBg] = useState(false);

  // States for color selection
  const [customColorBg, setCustomColorBg] = useState('#FFFFFF')
  const [bgColor, setBgColor] = useState("");



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

  function showValus(){ 
      alert(`Remove Bg : ${optRemoveBg}\nColor : ${bgColor}`)
  }



  return (
    <div className="w-full flex flex-col items-center p-4">

      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <h2 className="text-lg font-semibold">
          Passport Photo Editor
        </h2>
      </div>

      {/* Image / Cropper */}
      <div className={`flex ${isCropped ? 'md:flex-row' : ''} flex-col items-center
                    ${isCropped ? 'md:items-start' : ''}  `}>

        <div className={`w-[83vw] m-3 flex flex-col justify-center items-center  bg-white  rounded-xl p-3
                          ${isCropped ? 'md:w-[20vw]' : 'md:w-[30vw]'}`}>
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

        <div className={`flex items-center justify-center gap-3 mb-4 ${isCropped ? 'hidden' : ''}`}>
          <button
            onClick={onBack}
            className="px-4 py-2 border rounded-lg bg-[#f1f5fb] hover:bg-gray-100"
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
        <div className={`w-[83vw] m-3 p-3 ${isCropped ? 'flex' : 'hidden'} flex-col items-center rounded-lg bg-white
                          ${isCropped ? 'md:w-[20vw]' : 'md:w-[30vw]'}`}>

          {/* Main controls */}
          <div className="w-[100%] flex ">
            <button
              onClick={onBack}
              className="w-1/2 px-4 py-2 m-2  border border-[#D9DEE7] hover:bg-[#eef4fd] p-2 shadow rounded-md bg-[#f1f5fb]"
            >
              ← Back
            </button>

            <button className="w-1/2 px-4 py-2 m-2 border rounded-md shadow bg-[#1769F5] text-white hover:bg-blue-800"
                    onClick={showValus}>
              Create
            </button>

          </div>

          {/* More option */}
          <div className="w-[100%] p-2 ">

            {/* remove bg button */}
            <label className={`flex items-center my-4 justify-between bg-[#f1f5fb] shadow border hover:border-[#3990FF] hover:bg-[#eef4fd] p-2 rounded-md
                                    ${optRemoveBg ? 'border-[#3990FF] bg-[#d1e3ff]' : ''}`}
              htmlFor="remove-bg">
              <p>Remove background</p>
              <div className="flex gap-3 px-2 border-gray-300 border-l-[1px]">
                <img className="w-6" src={bg_remove_icon} alt="" />
                <input className=""
                  type="checkbox"
                  checked={optRemoveBg}
                  onChange={(e) => setOptRemoveBg(e.target.checked)}
                  name=""
                  id="remove-bg" />
              </div>

            </label>


            {/* Select color */}
            <div className="flex items-center justify-between my-4 bg-[#f1f5fb] border shadow p-2 rounded-md">

              <p>Color</p>

              <div className="flex gap-3 items-center">

                {/* Color 1 */}
                <label
                  className={`size-6 bg-[#2B8EDB] cursor-pointer rounded-sm
                ${bgColor === "#2B8EDB" ? "ring-2 ring-black ring-offset-2" : ""}`}
                >
                  <input
                    type="radio"
                    name="bgColor"
                    className="hidden"
                    checked={bgColor === "#2B8EDB"}
                    onChange={() => setBgColor("#2B8EDB")}
                  />
                </label>

                {/* Color 2 */}
                <label
                  className={`size-6 bg-[#FF0000] cursor-pointer rounded-sm
                  ${bgColor === "#FF0000" ? "ring-2 ring-black ring-offset-2" : ""}`}
                >
                  <input
                    type="radio"
                    name="bgColor"
                    className="hidden"
                    checked={bgColor === "#FF0000"}
                    onChange={() => setBgColor("#FF0000")}
                  />
                </label>

                {/* Color 3 */}
                <label
                  className={`size-6 bg-[#ffffff] cursor-pointer rounded-sm
      ${bgColor === "#ffffff" ? "ring-2 ring-black ring-offset-2" : ""}`}
                >
                  <input
                    type="radio"
                    name="bgColor"
                    className="hidden"
                    checked={bgColor === "#ffffff"}
                    onChange={() => setBgColor("#ffffff")}
                  />
                </label>

                {/* Custom Color */}
                <label
                  className={`relative size-6 cursor-pointer rounded-sm
                  ${bgColor === customColorBg && bgColor !== "" ? "ring-2 ring-black ring-offset-2" : ""}`}
                  style={{ backgroundColor: customColorBg }}
                >
                  <img
                    src={custom_color_img}
                    alt="Custom color"
                    className="w-full h-full"
                  />

                  <input
                    type="color"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    value={customColorBg}
                    onChange={(e) => {
                      setCustomColorBg(e.target.value);
                      setBgColor(e.target.value);
                    }}
                  />
                </label>

              </div>
            </div>


            {/* Select Sheet */}
            <div className="flex items-center justify-between my-4 bg-[#f1f5fb] border shadow p-2 rounded-md" htmlFor="remove-bg">
              <p>Select sheet </p>

              {/* sheet option */}
              <div className="flex  gap-3 items-center">
                <div className="bg-white"></div>
                <div></div>
              </div>

            </div>




          </div>


        </div>


      </div>

    </div>
  );
}

