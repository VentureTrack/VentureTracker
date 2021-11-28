import React from 'react'

import GoDaddy from "../images/godaddy.png";
import NameCheap from "../images/namecheap.png";

function Registrars() {
    const registrars = [
        {name: "GoDaddy", image: GoDaddy, url: "htXtps://www.godaddy.com/"},
        {name: "NameCheap", image: NameCheap, url: "https://www.namecheap.com/"},
        {name: "GoDaddy", image: GoDaddy, url: "htXtps://www.godaddy.com/"},
        {name: "GoDaddy", image: GoDaddy, url: "htXtps://www.godaddy.com/"},
        {name: "GoDaddy", image: GoDaddy, url: "htXtps://www.godaddy.com/"},
        {name: "GoDaddy", image: GoDaddy, url: "htXtps://www.godaddy.com/"},
        {name: "GoDaddy", image: GoDaddy, url: "htXtps://www.godaddy.com/"},
        {name: "GoDaddy", image: GoDaddy, url: "htXtps://www.godaddy.com/"},
        // {},
        // {},
    ]
    return (
        <div>
            <header className="bg-white mb-5">
                <div className="break-normal flex justify-center mx-auto py-6 px-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Registrars We Track for Price Comparisons</h1>
                </div>
            </header>
            
            {/* map registrars */}
            <div class="flex grid grid-cols-3 gap-y-4 justify-items-center">
                {registrars.map( (item) => {
                    return (
                        <div class="bg-white shadow-md border border-gray-200 rounded-md max-w-sm">
                            <a href={ item.url }>
                                <img class="rounded-t-lg" src={ item.image } alt="" />
                            </a>
                        </div>
                    )
                })}

            </div>
        </div>            
    )
}

export default Registrars
