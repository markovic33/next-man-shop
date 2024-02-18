"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const HeroImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/img1.png",
    "/img2.png",

    "/img4.png",

    "/img6.png",

    "/img8.png",
    "/img9.png",
    "/img10.png",
    "/img11.png",
    "/img12.png",
    // Add more image URLs as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 1500); // Change the duration (in milliseconds) here

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative mx-auto max-w-3xl  my-4 ">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl shadow-xl">
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          width={500}
          height={500}
          className="h-[466px] w-[900px] object-cover shadow-xl"
        />
      </div>
    </div>
  );
};

export default HeroImageSlider;
