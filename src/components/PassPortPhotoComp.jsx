import React from 'react';

export default function PassPortPhotoComp({ image, onBack }) {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">

      <button
        onClick={onBack}
        className="px-4 py-2 mb-5 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-5">
        Passport Photo Editor
      </h1>

      <div className="bg-white p-5 rounded-2xl shadow-md flex justify-center">
        <img
          src={image}
          alt="Selected image"
          className="max-w-full max-h-[70vh] object-contain"
        />
      </div>

    </div>
  );
}