
import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Upload, Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

const PassportPhotoMaker = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 70,
    aspect: 7 / 9,
  });

  const [completedCrop, setCompletedCrop] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const imageRef = useRef(null);
  const fileInputRef = useRef(null);

  // Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setZoom(1);
    setRotation(0);
    setCompletedCrop(null);
  };

  // Reset
  const resetImage = () => {
    setImage(null);
    setCompletedCrop(null);
    setZoom(1);
    setRotation(0);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Create passport photo
  const generatePassportPhoto = () => {
    if (!completedCrop || !imageRef.current) {
      alert("Please crop the photo first.");
      return;
    }

    const image = imageRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    // 35 × 45 mm at 300 DPI
    const outputWidth = 413;
    const outputHeight = 531;

    const canvas = document.createElement("canvas");

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.save();

    ctx.translate(outputWidth / 2, outputHeight / 2);

    ctx.rotate((rotation * Math.PI) / 180);

    ctx.scale(zoom, zoom);

    ctx.drawImage(
      image,
      completedCrop.x * scaleX - cropWidth / 2,
      completedCrop.y * scaleY - cropHeight / 2,
      cropWidth,
      cropHeight,
      -outputWidth / 2,
      -outputHeight / 2,
      outputWidth,
      outputHeight
    );

    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "passport-photo-35x45mm.jpg";

        link.click();

        URL.revokeObjectURL(url);
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
              P
            </div>

            <h1 className="text-xl font-bold text-gray-800">
              Passport Photo Maker
            </h1>
          </div>

          {image && (
            <button
              onClick={resetImage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
              bg-gray-100 hover:bg-gray-200 transition"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          )}

        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-5 py-10">

        {!image ? (

          /* Upload Section */

          <div className="max-w-2xl mx-auto">

            <div className="text-center mb-8">

              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Create Passport Photo
              </h2>

              <p className="text-gray-500">
                Upload your photo and create a 35 × 45 mm passport-size photo.
              </p>

            </div>

            <div
              onClick={() => fileInputRef.current.click()}
              className="bg-white border-2 border-dashed border-gray-300
              hover:border-blue-500 rounded-2xl p-12 text-center
              cursor-pointer transition"
            >

              <div className="flex justify-center mb-5">

                <div className="w-20 h-20 bg-blue-50 rounded-full
                flex items-center justify-center">

                  <Upload
                    size={38}
                    className="text-blue-600"
                  />

                </div>

              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Upload your photo
              </h3>

              <p className="text-gray-500 mb-6">
                JPG, JPEG or PNG
              </p>

              <button
                className="px-6 py-3 bg-blue-600 text-white
                rounded-lg hover:bg-blue-700 transition"
              >
                Choose Photo
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

            </div>

          </div>

        ) : (

          /* Editor */

          <div>

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gray-900">
                Edit Your Photo
              </h2>

              <p className="text-gray-500 mt-2">
                Adjust the crop so your face is positioned correctly.
              </p>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

              {/* Image Editor */}

              <div className="lg:col-span-2">

                <div className="bg-white rounded-2xl shadow-sm p-6">

                  <div
                    className="min-h-[500px] bg-gray-900 rounded-xl
                    flex items-center justify-center overflow-hidden"
                  >

                    <ReactCrop
                      crop={crop}
                      onChange={(newCrop) => setCrop(newCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={7 / 9}
                    >

                      <img
                        ref={imageRef}
                        src={image}
                        alt="Uploaded"
                        style={{
                          transform: `scale(${zoom}) rotate(${rotation}deg)`,
                          maxHeight: "500px",
                          maxWidth: "100%",
                        }}
                        className="object-contain"
                      />

                    </ReactCrop>

                  </div>

                </div>

              </div>

              {/* Controls */}

              <div>

                <div className="bg-white rounded-2xl shadow-sm p-6">

                  <h3 className="text-lg font-semibold mb-6">
                    Photo Settings
                  </h3>

                  {/* Size */}

                  <div className="mb-7">

                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Passport Size
                    </p>

                    <div className="border rounded-lg p-3 bg-gray-50">

                      <p className="font-medium">
                        35 × 45 mm
                      </p>

                      <p className="text-xs text-gray-500">
                        7:9 aspect ratio
                      </p>

                    </div>

                  </div>

                  {/* Zoom */}

                  <div className="mb-7">

                    <div className="flex justify-between mb-3">

                      <span className="text-sm font-medium">
                        Zoom
                      </span>

                      <span className="text-sm text-gray-500">
                        {zoom.toFixed(1)}x
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          setZoom(Math.max(0.5, zoom - 0.1))
                        }
                        className="p-2 rounded-lg bg-gray-100
                        hover:bg-gray-200"
                      >
                        <ZoomOut size={18} />
                      </button>

                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={zoom}
                        onChange={(e) =>
                          setZoom(Number(e.target.value))
                        }
                        className="w-full"
                      />

                      <button
                        onClick={() =>
                          setZoom(Math.min(2, zoom + 0.1))
                        }
                        className="p-2 rounded-lg bg-gray-100
                        hover:bg-gray-200"
                      >
                        <ZoomIn size={18} />
                      </button>

                    </div>

                  </div>

                  {/* Rotation */}

                  <div className="mb-7">

                    <p className="text-sm font-medium mb-3">
                      Rotation
                    </p>

                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotation}
                      onChange={(e) =>
                        setRotation(Number(e.target.value))
                      }
                      className="w-full"
                    />

                    <p className="text-center text-sm text-gray-500 mt-2">
                      {rotation}°
                    </p>

                  </div>

                  {/* Download */}

                  <button
                    onClick={generatePassportPhoto}
                    className="w-full flex items-center justify-center
                    gap-2 px-5 py-3 bg-blue-600 text-white
                    rounded-lg font-medium hover:bg-blue-700
                    transition"
                  >

                    <Download size={19} />

                    Download Passport Photo

                  </button>

                </div>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
};

export default PassportPhotoMaker;




