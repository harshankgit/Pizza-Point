import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const CarouselComponent = () => {
  const images = [
    {
      src: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
      alt: "Delicious Pizza",
      description:
        "Experience the best pizza in town with fresh ingredients and authentic flavors.",
    },
    {
      src: "https://static.toiimg.com/thumb/83565509.cms?width=1200&height=900",
      alt: "Tasty Burger",
      description:
        "Sink your teeth into our juicy burgers, grilled to perfection.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ODK2tmAkskaKYm0JUz6aHpeo7TyvAHxT8A&s",
      alt: "Delicious Pasta",
      description:
        "Savor the taste of our mouthwatering pasta with rich, creamy sauces.",
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4000}
        transitionTime={700}
        emulateTouch
        className="shadow-lg"
      >
        {images.map((image, index) => (
          <div key={index} className="relative" style={{ maxHeight: "100vh" }}>
            {/* Image */}
            <Image
              src={image.src}
              alt={image.alt}
              style={{
                objectFit: "cover",
                height: "70vh",
                width: "100%",
              }}
              className="rounded-lg"
              width={500}
              height={300}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-4xl font-bold mb-4">{image.alt}</h2>
              <p className="text-lg max-w-3xl">{image.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
