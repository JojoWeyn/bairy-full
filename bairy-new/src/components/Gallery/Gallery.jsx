import { useState, useEffect } from 'react';
import { getImagesGallery } from '../../api/get';
import ImageCarousel from '../../components/carousel/ImageCarousel';

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getImagesGallery();
        setImages(data);
      } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
      }
    }
    fetchImages();
  }, []);

  return (
    <section id="gallery" className="@container scroll-mt-[80px]">
      <div className="@[480px]:p-4">
        <h2 className="text-[#121a0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 @[480px]:px-0 @[480px]:pt-0">
          Галерея
        </h2>
        <div className="@[480px]:bg-[#f9fbf9] @[480px]:rounded-xl @[480px]:p-6">
          <div className="relative px-4 @[480px]:px-0">
           <ImageCarousel
            images={images}
            alt="Галерея"
            aspect="aspect-video"
            rounded="rounded-xl"
            showCaption={true}
          />
          </div>
        </div>
      </div>
    </section>
  );
}