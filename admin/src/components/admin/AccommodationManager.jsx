import React, { useState, useEffect } from 'react';
import { getAccommodation } from '../../api/get';
import { postCreateAccommodation, postUploadImage, deleteAccommodation } from '../../api/admin';
import ImageCarousel from '../../components/carousel/ImageCarousel';

const AccommodationManager = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_per_night: '',
    capacity: '',
    amenities: '',
    image_urls: []
  });


  // Загрузка размещений при монтировании компонента
  useEffect(() => {
    fetchAccommodations();
  }, []);

  // Функция для загрузки размещений
  const fetchAccommodations = async () => {
    try {
      const data = await getAccommodation();
      setAccommodations(data || []);
      console.log(data);
    } catch (error) {
      console.error('Ошибка при загрузке размещений:', error);
      alert('Не удалось загрузить размещения');
    }
  };

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик выбора файла
  const [uploadedFiles, setUploadedFiles] = useState([]); // массив выбранных файлов

  const handleFilesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (uploadedFiles.length === 0) {
    alert('Пожалуйста, выберите хотя бы один файл изображения');
    return;
  }

  setIsLoading(true);

  try {
    // Загрузка всех изображений параллельно
    const uploadPromises = uploadedFiles.map(file => {
      const formDataFile = new FormData();
      formDataFile.append('image', file);
      formDataFile.append('title', formData.name);
      formDataFile.append('alt', formData.name);
      formDataFile.append('category', 'accommodation');
      return postUploadImage(formDataFile);
    });

    const uploadResponses = await Promise.all(uploadPromises);

    // Массив URL из ответов
    const imageUrls = uploadResponses.map(res => res.url);

    // Подготовка данных для создания размещения
    const accommodationData = {
      name: formData.name,
      description: formData.description,
      price_per_night: Number(formData.price_per_night),
      capacity: Number(formData.capacity),
      amenities: formData.amenities.split(',').map(item => item.trim()),
      image_urls: imageUrls,
    };

    await postCreateAccommodation(accommodationData);

    // Очистка формы
    setFormData({
      name: '',
      description: '',
      price_per_night: '',
      capacity: '',
      amenities: '',
      image_urls: []
    });
    setUploadedFiles([]);
    fetchAccommodations();

    alert('Размещение успешно добавлено');
  } catch (error) {
    console.error('Ошибка при добавлении размещения:', error);
    alert('Произошла ошибка при добавлении размещения');
  } finally {
    setIsLoading(false);
  }
};
  // Функция для удаления размещения
  const handleDeleteAccommodation = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это размещение?')) {
      try {
        await deleteAccommodation(id);
        // После успешного удаления обновляем список
        fetchAccommodations();
        alert('Размещение успешно удалено');
      } catch (error) {
        console.error('Ошибка при удалении размещения:', error);
        alert('Произошла ошибка при удалении размещения');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Форма добавления нового размещения */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Добавить новое размещение</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена за ночь (₽)
              </label>
              <input
                type="number"
                name="price_per_night"
                value={formData.price_per_night}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Вместимость (человек)
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Удобства (через запятую)
            </label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              placeholder="Wi-Fi, Кондиционер, Холодильник"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Изображение
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Выберите одно или несколько изображений</p>
            
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#53d22c] hover:bg-[#46c126] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {isLoading ? 'Добавление...' : 'Добавить размещение'}
          </button>
        </form>
      </div>

      {/* Список существующих размещений */}
      <div>
        <h3 className="text-lg font-medium mb-4">Существующие размещения</h3>
        
        {accommodations.length === 0 ? (
          <p className="text-gray-500">Нет добавленных размещений</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accommodations.map((accommodation) => (
              <div key={accommodation.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative w-full aspect-video overflow-hidden">
  {accommodation.images && accommodation.images.length > 0 ? (
          <div className="relative w-full">
  {accommodation.images && accommodation.images.length > 0 ? (
    <ImageCarousel
      images={accommodation.images}
      alt={accommodation.name}
      aspect="aspect-video"
      rounded="rounded-none"
      showCaption={true}
    />
  ) : (
    <div className="bg-gray-100 w-full aspect-video flex items-center justify-center text-gray-500 text-sm">
      Нет изображений
    </div>
  )}
</div>
        ) : (
        <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-500 text-sm">
          Нет изображений
        </div>
      )}
    </div>
                <div className="p-4">
                  <h4 className="font-medium">{accommodation.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{accommodation.description}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><span className="font-medium">Цена:</span> {accommodation.price_per_night} ₽ за ночь</p>
                    <p className="text-sm"><span className="font-medium">Вместимость:</span> {accommodation.capacity} чел.</p>
                    <p className="text-sm"><span className="font-medium">Удобства:</span> {accommodation.amenities.join(', ')}</p>
                  </div>
                  <div className="mt-3">
                    <button 
                      onClick={() => handleDeleteAccommodation(accommodation.id)}
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

export default AccommodationManager;