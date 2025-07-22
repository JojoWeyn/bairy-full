import { useState } from 'react';
import { login } from '../api/admin';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(formData);

      // Предполагается, что ответ содержит токен: { token: '...' }
      if (response?.token) {
        localStorage.setItem('adminToken', response.token);
        console.log('Успешный вход, токен сохранён:', response.token);
        window.location.href = '/admin';
      } else {
        setError('Неверные данные или нет токена');
      }
    } catch (err) {
      console.error('Ошибка входа:', err);
      setError('Ошибка авторизации. Проверьте email и пароль.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fbf9] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6 border border-[#e0eede]">
        <h2 className="text-2xl font-bold text-center text-[#121a0f]">Вход в админ-панель</h2>

        {error && (
          <div className="text-sm text-red-500 text-center bg-red-50 border border-red-300 rounded p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#121a0f] mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-[#d6e5d2] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#53d22c]"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#121a0f] mb-1">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-[#d6e5d2] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#53d22c]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#53d22c] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#48b927] transition-colors"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}