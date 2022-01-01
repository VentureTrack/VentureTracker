import { Link } from 'react-router-dom';

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
    <div clasName="">
      <nav className="flex justify-center py-8 bg-gray-900 border-b border-gray-800">
        
        <div>
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-green-300 via-blue-400 to-purple-600">VentureTrack</h3>
        </div>

        <div className="hidden md:flex space-x-8 mx-8 py-2 lg-flex">
          { navigation.map(({ name, href }) => (

            <Link to={href} className="font-bold text-white">{name}</Link>
          ))}
        </div>

        <div class="flex md:hidden md:flex space-x-8 mx-6 py-1 xs:mx-3">
          {/* if you click this expand responsive menu */}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </div>

      </nav>
    </div>
  )
}