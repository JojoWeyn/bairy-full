import React from 'react';
import ImageCarousel from '../../components/carousel/ImageCarousel';

const AccommodationModal = ({ accommodation, onClose }) => {
  if (!accommodation) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{accommodation.name}</h3>

          <ImageCarousel images={accommodation.images} alt={accommodation.name} />

          <p className="text-sm text-gray-700">{accommodation.description}</p>
          <p className="text-sm">
            <strong>Цена за ночь:</strong> {accommodation.price_per_night} ₽
          </p>
          <p className="text-sm">
            <strong>Вместимость:</strong> {accommodation.capacity} чел.
          </p>
          <p className="text-sm">
            <strong>Удобства:</strong> {accommodation.amenities.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccommodationModal;