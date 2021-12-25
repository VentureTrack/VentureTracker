import { NavLink  } from 'react-router-dom';

/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import logo from '../../images/site_icon.png';
import './Navbar.css';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const navigation = [
    { name: 'All', href: '/' },
    { name: 'Exchanges', href: '/exchanges' },
    // { name: 'Incubators', href: '/TLDs' },
    // { name: 'Graphs', href: '/Blog' },
  ]

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  
                  <NavLink  to=''>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src={ logo }
                            alt="CompoDom"
                          />
                      </div>
                      <h1 class="ml-5 font-semibold text-gray-500 text-lg" style={{ color: 'black' }}>VentureTrack</h1>
                    </div>
                  </NavLink >
                  
                  <div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-5 justify-right">
                        {navigation.map((item) => (
                          <NavLink 
                            key={item.name}
                            exact to={item.href}
                            activeClassName="text-black-500 border-b-4 border-blue-500"
                            className="px-3 py-2 rounded-md font-semibold text-black-500 border-b-4 border-white hover:border-blue-500 transition duration-300"
                          >
                            {item.name}
                          </NavLink >
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-blue-500 inline-flex items-center justify-center p-2 rounded-md text-black-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}