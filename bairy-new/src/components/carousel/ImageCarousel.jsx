import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ImageCarousel = ({
  images = [],
  alt = '',
  aspect = 'aspect-video',
  rounded = 'rounded-lg',
  showIndicators = true,
  showCaption = true,
}) => {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (images.length === 0) return null;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Основная карусель */}
      <div className="w-full">
        <div className={`relative w-full overflow-hidden ${aspect} ${rounded} cursor-pointer`} onClick={openFullscreen}>
          <img
            src={images[index]?.url}
            alt={images[index]?.alt || alt}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Подпись */}
          {showCaption && (images[index]?.title || images[index]?.alt) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-sm font-medium">
                {images[index].title || images[index].alt}
              </p>
            </div>
          )}
        </div>

        {/* Индикаторы */}
        {showIndicators && images.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i === index ? 'bg-[#53d22c]' : 'bg-[#d6e5d2]'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Полноэкранное модальное окно */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={28} />
          </button>

          <div className="relative max-w-4xl w-full p-4">
            <img
              src={images[index]?.url}
              alt={images[index]?.alt || alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Caption */}
            {showCaption && (images[index]?.title || images[index]?.alt) && (
              <div className="text-center text-white mt-4">
                <p className="text-sm">{images[index].title || images[index].alt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;