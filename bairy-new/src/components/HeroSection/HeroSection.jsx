import { getImageBanner } from '../../api/get'; 
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    async function fetchBanner() {
      try {
        const response = await getImageBanner();
        setBannerUrl(response[0].url);
      } catch (error) {
        console.error('Ошибка загрузки баннера:', error);
      }
    }

    fetchBanner();
  }, []);

  return (
    <div id="hero" className="@container scroll-mt-[80px]">
      <div className="@[480px]:p-4">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 items-center justify-center p-4"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${bannerUrl})`,
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                Турбаза Байры
              </h1>
              <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
                Отдых на природе в живописном месте
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#53d22c] text-[#121a0f] text-sm font-bold @[480px]:text-base">
              <a href="#gallery" className="text-[#121a0f] text-lg font-bold">
                Галерея
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}