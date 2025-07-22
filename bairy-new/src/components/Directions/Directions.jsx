import { YMaps, Map as YandexMap, Placemark } from '@pbe/react-yandex-maps';

export default function Directions() {
  const position = [50.157390, 86.301475];

  const openYandexMaps = () => {
    window.open(`https://yandex.ru/maps/?mode=routes&rtext=~${position[0]},${position[1]}&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D190055579680&z=16.78`, '_blank');
  };

  return (
    <section id="directions" className="@container scroll-mt-[80px]">
      <div className="@[480px]:p-4">
        <h2 className="text-[#121a0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 @[480px]:px-0 @[480px]:pt-0">Как добраться</h2>
        <div className="flex flex-col @[768px]:flex-row gap-4">
          <div className="flex-1 @[768px]:w-1/3">
            <div className="@[480px]:bg-[#f9fbf9] @[480px]:rounded-xl @[480px]:border @[480px]:border-[#d6e5d2] @[480px]:p-6">
              <div className="px-4 @[480px]:px-0 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#121a0f] text-base font-bold leading-tight">Адрес</h3>
                  <p className="text-[#121a0f] text-sm font-normal leading-normal">
                    Республика Алтай, Усть-Коксинский район, с.Тюнгур<br />
                    Координаты: 50.1476° N, 86.5973° E
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#121a0f] text-base font-bold leading-tight">Как добраться</h3>
                  <ul className="text-[#121a0f] text-sm font-normal leading-normal list-disc pl-4">
                    <li>От Горно-Алтайска следуйте по Чуйскому тракту (Р-256)</li>
                    <li>В селе Усть-Кокса поверните на дорогу к Тюнгуру</li>
                    <li>Следуйте указателям до села Тюнгур</li>
                    <li>По прибытии в село, наша база находится в центральной части</li>
                  </ul>
                </div>
                <button
                  onClick={openYandexMaps}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#53d22c] text-[#121a0f] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base"
                >
                  <span className="truncate">Построить маршрут</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-[2] @[768px]:w-2/3 h-[300px] @[768px]:h-auto rounded-xl @[480px]:border border-[#d6e5d2] overflow-hidden">
            <YMaps>
              <YandexMap
                defaultState={{
                  center: position,
                  zoom: 14,
                }}
                width="100%"
                height="100%"
              >
                <Placemark geometry={position} />
              </YandexMap>
            </YMaps>
          </div>
        </div>
      </div>
    </section>
  );
}