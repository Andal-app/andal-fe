import React from 'react';
import { Icon } from '@iconify/react';

function NotifListView({ title, detail, dateTime }) {
  return (
    <li className="flex items-start gap-5 px-6 lg:px-10 py-4 border-b border-neutral-300 hover:bg-neutral-50 duration-300">
      <div className="pt-1">
        <div
          id="notification__icon__circle"
          className="w-8 h-8 rounded-full border border-neutral-200 flex justify-center items-center"
        >
          <Icon icon="mingcute:notification-line" className={`w-6 h-6 text-yellow-500`} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-b-sm font-bold">{title}</p>
        <p className="text-b-xsm text-neutral-500">{detail}</p>
        <p className="text-b-xsm text-neutral-500">{dateTime}</p>
      </div>
    </li>
  );
}

export default NotifListView;
