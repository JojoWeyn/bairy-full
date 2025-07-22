import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageManager from '../components/admin/ImageManager';
import ServiceManager from '../components/admin/ServiceManager';
import AccommodationManager from '../components/admin/AccommodationManager';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('images');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#121a0f]">Админ-панель Байры</h1>
          <div className="flex justify-end">
            <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
              Выйти
            </button>
        </div>
          <p className="text-sm text-[#639155] mt-1">Управление контентом сайта</p>
        </div>
        {/* Навигация */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'images' ? 'text-[#53d22c] border-b-2 border-[#53d22c]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('images')}
          >
            Изображения
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'services' ? 'text-[#53d22c] border-b-2 border-[#53d22c]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('services')}
          >
            Услуги
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'accommodation' ? 'text-[#53d22c] border-b-2 border-[#53d22c]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('accommodation')}
          >
            Размещение
          </button>
      
        </div>

        {/* Содержимое вкладок */}
        <div className="p-6">
          {activeTab === 'images' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Управление изображениями</h2>
              <ImageManager />
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Управление услугами</h2>
              <ServiceManager />
            </div>
          )}

          {activeTab === 'accommodation' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Управление размещением</h2>
              <AccommodationManager />
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default AdminPage;