import React, { useEffect, useState } from 'react';
import { getAccommodation } from '../../api/get';
import AccommodationModal from '../../components/Accommodation/AccommodationModal';

export default function Accommodation() {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAccommodation();
        setAccommodations(data);
      } catch (error) {
        console.error('Ошибка при загрузке размещений', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section id="accommodation" className="@container scroll-mt-[80px]">
      <div className="@[480px]:p-4">
        <h2 className="text-[#121a0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 @[480px]:px-0 @[480px]:pt-0">
          Размещение
        </h2>
        <div className="@[480px]:bg-[#f9fbf9] @[480px]:rounded-xl @[480px]:p-6">
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 @[480px]:p-0 gap-3 @[768px]:grid @[768px]:grid-cols-3">
              {accommodations.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccommodation(acc)}
                  className="cursor-pointer flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 hover:shadow-md transition"
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col"
                    style={{ backgroundImage: `url("${acc.images[0]?.url}")` }}
                  />
                  <div>
                    <p className="text-[#121a0f] text-base font-medium leading-normal">
                      {acc.name}
                    </p>
                    <p className="text-[#639155] text-sm font-normal leading-normal line-clamp-2">
                      {acc.description}
                    </p>
                    <p className="text-[#639155] text-sm">
                      Удобства: {acc.amenities.join(', ')}
                    </p>
                    <p className="text-[#121a0f] text-sm mt-1">
                      Цена за ночь: {acc.price_per_night} ₽
                    </p>
                    <p className="text-[#121a0f] text-sm">
                      Вместимость: {acc.capacity} {acc.capacity > 1 ? 'чел.' : 'человек'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AccommodationModal
        accommodation={selectedAccommodation}
        onClose={() => setSelectedAccommodation(null)}
      />
    </section>
  );
}