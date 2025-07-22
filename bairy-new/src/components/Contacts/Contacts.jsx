import { useState } from 'react';
import { postSendMessage } from '../../api/post';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await postSendMessage(formData);
      alert('Сообщение успешно отправлено!');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Произошла ошибка при отправке');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contacts" className="bg-[#f9fbf9] py-12 px-4 md:px-8 scroll-mt-[80px]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#121a0f] mb-8 text-center">Контакты</h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Левая часть - контактная информация */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#121a0f] mb-2">Свяжитесь с нами</h3>
              <p className="text-[#121a0f] text-sm">
                Мы всегда рады ответить на ваши вопросы и помочь с бронированием.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-medium text-[#121a0f] mb-2">Телефон:</h4>
                    <div className="flex flex-col gap-1 text-sm">
                      <a
                        href="tel:+79833269707"
                        className="text-[#639155] hover:underline transition-colors"
                      >
                        <span className="font-medium">Максим:</span> +7‒983‒326‒97‒07
                      </a>
                      <a
                        href="tel:+79835817870"
                        className="text-[#639155] hover:underline transition-colors"
                      >
                        <span className="font-medium">Людмила:</span> +7‒983‒581‒78‒70
                      </a>
                    </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-medium text-[#121a0f]">Email:</h4>
                  <a href="mailto:info@bairy.ru" className="text-sm text-[#639155] hover:underline">
                    info@bairy.ru
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - форма обратной связи */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-[#121a0f] mb-4 text-center">Форма обратной связи</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#d4e6cd] rounded-xl px-4 py-3 text-sm text-[#121a0f] focus:outline-none focus:ring-2 focus:ring-[#53d22c]"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-[#d4e6cd] rounded-xl px-4 py-3 text-sm text-[#121a0f] focus:outline-none focus:ring-2 focus:ring-[#53d22c]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#d4e6cd] rounded-xl px-4 py-3 text-sm text-[#121a0f] focus:outline-none focus:ring-2 focus:ring-[#53d22c]"
              />

              <textarea
                name="message"
                placeholder="Сообщение"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-[#d4e6cd] rounded-xl px-4 py-3 text-sm text-[#121a0f] focus:outline-none focus:ring-2 focus:ring-[#53d22c]"
              ></textarea>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#53d22c] hover:bg-[#46c126] transition rounded-xl py-3 text-sm font-bold text-[#121a0f]"
              >
                {isSending ? 'Отправка...' : 'Отправить сообщение'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
