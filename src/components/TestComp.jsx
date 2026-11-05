import React, { useState } from 'react'
import custom_color_img from '../icons/custom_color.png'

export default function TestComp() {
  const [customColorBg, setCustomColorBg] = useState('#FFFFFF')
  const [bgColor, setBgColor] = useState("");


  return (
    <div className="flex w-[20vw] items-center justify-between my-4 bg-[#f1f5fb] border shadow p-2 rounded-md">

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
      <button onClick={()=>{alert(bgColor)}}>show</button>
    </div>

  )
}
