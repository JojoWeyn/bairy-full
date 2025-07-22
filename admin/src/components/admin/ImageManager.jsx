import React, { useState, useEffect } from 'react';
import { getImagesAll, getImagesGallery, getImageBanner } from '../../api/get';
import { postUploadImage, deleteImage } from '../../api/admin';

const ImageManager = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('gallery');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imageData, setImageData] = useState({
    title: '',
    alt: '',
    category: 'gallery',
  });

  // Загрузка изображений при монтировании компонента и при изменении категории
  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  // Функция для загрузки изображений
  const fetchImages = async () => {
  try {
    let data;
    if (selectedCategory === 'gallery') {
      data = await getImagesGallery();
    } else if (selectedCategory === 'banner') {
      data = await getImageBanner();
    } else if (selectedCategory === 'all') {
      data = await getImagesAll();
    }
    setImages(data || []);
  } catch (error) {
    console.error('Ошибка при загрузке изображений:', error);
    alert('Не удалось загрузить изображения');
  }
};

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setImageData({ ...imageData, [name]: value });
  };

  // Обработчик выбора файла
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!uploadedFile) {
    alert('Пожалуйста, выберите файл');
    return;
  }

  setIsUploading(true);

  try {
    const formData = new FormData();
    formData.append('image', uploadedFile); // важно — поле должно называться "image"
    formData.append('title', imageData.title);
    formData.append('alt', imageData.alt);
    formData.append('category', selectedCategory);

    await postUploadImage(formData); // это теперь и загрузка, и создание записи

    setImageData({ title: '', alt: '', category: selectedCategory });
    setUploadedFile(null);
    fetchImages();

    alert('Изображение успешно загружено');
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    alert('Произошла ошибка при загрузке изображения');
  } finally {
    setIsUploading(false);
  }
};

  // Функция для удаления изображения
  const handleDeleteImage = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это изображение?')) {
      try {
        await deleteImage(id);
        // После успешного удаления обновляем список
        fetchImages();
        alert('Изображение успешно удалено');
      } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        alert('Произошла ошибка при удалении изображения');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Переключатель категорий */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${selectedCategory === 'gallery' ? 'bg-[#53d22c] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedCategory('gallery')}
        >
          Галерея
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedCategory === 'banner' ? 'bg-[#53d22c] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedCategory('banner')}
        >
          Баннер
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-[#53d22c] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedCategory('all')}
        >
          Все фото
        </button>
      </div>

      {/* Форма загрузки нового изображения */}
      {selectedCategory !== 'all' && (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Загрузить новое изображение</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Заголовок
            </label>
            <input
              type="text"
              name="title"
              value={imageData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Альтернативный текст
            </label>
            <input
              type="text"
              name="alt"
              value={imageData.alt}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Файл изображения
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isUploading}
            className="bg-[#53d22c] hover:bg-[#46c126] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {isUploading ? 'Загрузка...' : 'Загрузить изображение'}
          </button>
        </form>
      </div>
      )}
      
      {/* Список существующих изображений */}
      <div>
        <h3 className="text-lg font-medium mb-4">Существующие изображения</h3>
        
        {images.length === 0 ? (
          <p className="text-gray-500">Нет загруженных изображений в этой категории</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src={image.url} 
                    alt={image.alt || image.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm">{image.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{image.alt}</p>
                  <div className="flex justify-between mt-3">
                    <button 
                      onClick={() => handleDeleteImage(image.id)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageManager;