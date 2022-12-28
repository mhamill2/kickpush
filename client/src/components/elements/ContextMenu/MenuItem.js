import { Menu } from '@headlessui/react';

const MenuItem = ({ onClick, dataId, children }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          data-id={dataId}
          className={`${(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm w-full text-left')}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
