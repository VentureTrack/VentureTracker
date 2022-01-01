// Tailwind.css footer

import React from 'react'

const Footer = () => {
    return (
        <footer class="border-t border-gray-700 bg-gray-900">

            <div class="flex flex-col flex-wrap px-4 py-10 justify-center mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
            
                {/* Logo */}
                <div class="flex-shrink-0 w-64 mx-auto align-middle justify-center text-center md:mx-0 md:text-left">
                    <h3 className="text-3xl font-extrabold align-middle text-transparent bg-clip-text bg-gradient-to-tr from-green-300 via-blue-400 to-purple-600">VentureTrack</h3>
                </div>

                {/* Other Links */}
                <div class="justify-between w-full mt-4 text-center lg:flex">
                    
                    <div class="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 class="mb-2 font-bold tracking-widest text-white">Other Links</h2>
                        <ul class="mb-8 space-y-2 text-sm list-none">
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Home</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">About Us</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Blogs</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div class="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 class="mb-2 font-bold tracking-widest text-white">Social Media</h2>
                        <ul class="mb-8 space-y-2 text-sm list-none">
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Home</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">About Us</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Blogs</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div class="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 class="mb-2 font-bold tracking-widest text-white">Useful Links</h2>
                        <ul class="mb-8 space-y-2 text-sm list-none">
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Home</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">About Us</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Blogs</a>
                            </li>
                            <li>
                            <a class="text-gray-600 hover:text-gray-800">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <div class="flex justify-center pb-3">
                <p class="text-base text-gray-400">&copy; VentureTrack 2022</p>
            </div>
        </footer>
    )
}

export default Footer
