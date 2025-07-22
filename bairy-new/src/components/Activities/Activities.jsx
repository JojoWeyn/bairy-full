import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { getService } from '../../api/get';

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getService();
        setActivities(data);
      } catch (error) {
        console.error('Ошибка загрузки сервисов', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section id="activities" className="@container scroll-mt-[80px]">
      <div className="@[480px]:p-4">
        <h2 className="text-[#121a0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 @[480px]:px-0 @[480px]:pt-0">
          Услуги
        </h2>
        <div className="@[480px]:bg-[#f9fbf9] @[480px]:rounded-xl @[480px]:p-6">
          <div className="grid grid-cols-1 @[480px]:grid-cols-2 @[768px]:grid-cols-4 gap-3 p-4 @[480px]:p-0">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-1 gap-3 rounded-lg border border-[#d6e5d2] bg-[#f9fbf9] p-4 flex-col"
              >
                <div className="text-[#121a0f] w-6 h-6 [&_svg]:w-6 [&_svg]:h-6">{parse(activity.icon_url)}</div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#121a0f] text-base font-bold leading-tight">
                    {activity.title}
                  </h2>
                  <p className="text-[#639155] text-sm font-normal leading-normal">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}