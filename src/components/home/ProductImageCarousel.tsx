import { useEffect, useState } from "react";

interface CarouselImage {
  id: number;
  image: string;
}

interface ProductImageCarouselProps {
  images: CarouselImage[];
}

export default function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Troca de imagem automática a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToIndex = (index: number) => setCurrentIndex(index);
  const goToPrev = () =>
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  const goToNext = () =>
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

  return (
    <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden">
      {images.map((img, index) => (
        <div
          key={img.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } flex justify-center items-center`}
        >
          <img
            src={img.image}
            alt={`Imagem do produto ${index + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      ))}
      {/* Botão para imagem anterior */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full"
      >
        {"<"}
      </button>
      {/* Botão para imagem próxima */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full"
      >
        {">"}
      </button>
      {/* Dots para navegação */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
