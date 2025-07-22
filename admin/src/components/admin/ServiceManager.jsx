import React, { useState, useEffect } from 'react';
import { getService } from '../../api/get';
import { postCreateService, deleteService } from '../../api/admin';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_url: ''
  });

  // Загрузка услуг при монтировании компонента
  useEffect(() => {
    fetchServices();
  }, []);

  // Функция для загрузки услуг
  const fetchServices = async () => {
    try {
      const data = await getService();
      setServices(data || []);
    } catch (error) {
      console.error('Ошибка при загрузке услуг:', error);
      alert('Не удалось загрузить услуги');
    }
  };

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await postCreateService(formData);
      setFormData({ title: '', description: '', icon_url: '' });
      fetchServices();
      alert('Услуга успешно добавлена');
    } catch (error) {
      console.error('Ошибка при добавлении услуги:', error);
      alert('Произошла ошибка при добавлении услуги');
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для удаления услуги
  const handleDeleteService = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
      try {
        await deleteService(id);
        // После успешного удаления обновляем список
        fetchServices();
        alert('Услуга успешно удалена');
      } catch (error) {
        console.error('Ошибка при удалении услуги:', error);
        alert('Произошла ошибка при удалении услуги');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Форма добавления новой услуги */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Добавить новую услугу</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название услуги
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SVG-иконка (HTML-код)
            </label>
            <textarea
              name="icon_url"
              value={formData.icon_url}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm font-mono"
              placeholder="<svg>...</svg>"
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Вставьте HTML-код SVG иконки. Можно найти иконки на сайте:{' '}
              <a
                href="https://www.svgviewer.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#639155] hover:underline font-medium"
              >
                svgviewer.dev
              </a>
            </p>
            </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#53d22c] hover:bg-[#46c126] text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {isLoading ? 'Добавление...' : 'Добавить услугу'}
          </button>
        </form>
      </div>

      {/* Список существующих услуг */}
      <div>
        <h3 className="text-lg font-medium mb-4">Существующие услуги</h3>
        
        {services.length === 0 ? (
          <p className="text-gray-500">Нет добавленных услуг</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-[#121a0f] flex-shrink-0 w-6 h-6 [&_svg]:w-6 [&_svg]:h-6" dangerouslySetInnerHTML={{ __html: service.icon_url }}></div>
                  <div className="flex-1">
                    <h4 className="font-medium">{service.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="mt-3">
                      <button 
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Удалить
                      </button>
                    </div>
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

export default ServiceManager;