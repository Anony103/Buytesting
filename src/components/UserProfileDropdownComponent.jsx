// UserProfileDropdown.jsx
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { NavLink } from 'react-router-dom';
import UserProfileDropdownAvatar from './UserProfileDropdownAvatar';
import SignOutButton from './ProfileSignOutButton';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  export default function UserProfileDropdown({
    avatar,
    menuItems,
    buttonClassName,
    menuClassName,
    svgComponents,
    onSignOutClick,
  }) {
    return (
      <Menu as="div" className="relative inline-block text-left font-Nunito">
        <div>
          <Menu.Button
            className={classNames(
              'inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-transparent py-1 text-sm font-semibold text-gray-900',
              buttonClassName
            )}
          >
            <UserProfileDropdownAvatar {...avatar} />
            <ChevronDownIcon
              className="lg:-mr-1 lg:h-5 w-3 lg:w-5 h-3 text-black"
              aria-hidden="true"
            />
          </Menu.Button>
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
          <Menu.Items
            className={classNames(
              'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              menuClassName
            )}
          >
            <div className="py-5">
              {menuItems.map((menuItem, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <NavLink
                      to={menuItem.to}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-3 text-[.8rem] md:text-[1rem]'
                      )}
                    >
                      {svgComponents && svgComponents[menuItem.label] && React.cloneElement(svgComponents[menuItem.label], { className: 'inline-block w-7 h-7 mr-2' })}
                      {menuItem.label}
                    </NavLink>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item key="signout">
                {({ active }) => (
                  <SignOutButton
                    onClick={onSignOutClick}
                    className={classNames(
                      active ? 'bg-red-500 text-white' : 'text-white',
                      'inline-block w-full px-4 py-3 text-left text-[.8rem] md:text-[.8rem] lg:text-[1rem]'
                    )}
                  />
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }