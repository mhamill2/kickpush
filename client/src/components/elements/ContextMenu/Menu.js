import { Fragment } from 'react';
import { Menu as HeadlessUiMenu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

const Menu = ({ children, position }) => {
  return (
    <HeadlessUiMenu as="div" className={`absolute ${position ? position : 'top-0 right-0'} xl:relative xl:top-auto xl:right-auto xl:self-center`}>
      <div>
        <HeadlessUiMenu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </HeadlessUiMenu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessUiMenu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children}</div>
        </HeadlessUiMenu.Items>
      </Transition>
    </HeadlessUiMenu>
  );
};

export default Menu;
