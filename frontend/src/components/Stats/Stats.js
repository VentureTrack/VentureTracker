import React from 'react'
import { useState } from 'react'

function Stats({ totalAssets, name }) {      
    const [html, setHtml] = useState(false);

    return (
        <div class="">
            <header className="bg-white">
                <div className="break-normal flex justify-center mx-auto py-6 px-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                </div>
            </header>
    

            <div class="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3 px-5 mx-auto">
                <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border shadow">
                    <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        AVG. MARKET CAP
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        $ --
                        </p>
                    </div>
                    </div>
                </div>
                <div class="min-w-0  rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border shadow">
                    <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-percent" viewBox="0 0 16 16">
                            <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        AVG. 24H %
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        $ --
                        </p>
                    </div>
                    </div>
                </div>
                <div class="min-w-0  rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border shadow">
                    <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        NUMBER OF ASSETS
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        { totalAssets }
                        </p>
                    </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default Stats
