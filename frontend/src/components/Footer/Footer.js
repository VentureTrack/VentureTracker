// Tailwind.css footer

import React from "react";

const Footer = () => {
  // get current year
  const year = new Date().getFullYear();
  return (
    <footer class="border-t border-gray-700 bg-gray-900">
      {/* <div class="flex flex-col flex-wrap px-4 py-10 justify-center mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap"> */}

        {/* Logo */}
        {/* <div class="flex-shrink-0 w-64 mx-auto align-middle justify-center text-center md:mx-0 md:text-left">
          <h3 className="text-3xl font-extrabold align-middle text-transparent bg-clip-text bg-gradient-to-tr from-green-300 via-blue-400 to-purple-600">
            VentureTrack
          </h3>
        </div> */}

        {/* Other Links */}
        {/* <div class="justify-between w-full mt-4 text-center lg:flex">
          <div class="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 class="mb-2 font-bold tracking-widest text-white">
              Other Links
            </h2>
            <ul class="mb-8 space-y-2 text-sm list-none">
              <li>
                <a class="text-gray-400 hover:text-gray-100" href="/">
                  Home
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-gray-100" href="/about">
                  About
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-gray-100" href="/exchanges">
                  All Exchanges
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-gray-100"></a>
              </li>
            </ul>
          </div>

          <div class="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 class="mb-2 font-bold tracking-widest text-white">
              Social Media
            </h2>
            <ul class="mb-8 space-y-2 text-sm list-none">
              <li>
                <a class="text-gray-400 hover:text-gray-100" href="#">
                  Discord
                </a>
              </li>
              <li>
                <a class="text-gray-400 hover:text-gray-100" href="#">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div class="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 class="mb-2 font-bold tracking-widest text-white">Privacy</h2>
            <ul class="mb-8 space-y-2 text-sm list-none">
              <li>
                <a
                  class="text-gray-400 hover:text-gray-100"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  class="text-gray-400 hover:text-gray-100"
                  href="/terms-of-service"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      <div class="flex justify-center pb-3 justify-between px-10 py-5">
        <div>
            <a
            class="text-white inline justify-between"
            href="https://www.coingecko.com"
            rel="noreferrer"
            target="_blank"
            >
            Powered By: CoinGecko
            <svg
                height="24"
                width="24"
                className="mr-1 ml-1 inline justify-between"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 276 276"
            >
                <defs></defs>
                <title>CoinGecko</title>
                <g id="Coin_Gecko_AI" data-name="Coin Gecko AI">
                <path
                    fill="#8dc63f"
                    d="M276,137.39A138,138,0,1,1,137.39,0h0A138,138,0,0,1,276,137.39Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#f9e988"
                    d="M265.65,137.44a127.63,127.63,0,1,1-128.21-127h0A127.65,127.65,0,0,1,265.65,137.44Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#fff"
                    d="M140.35,18.66a70.18,70.18,0,0,1,24.53,0,74.75,74.75,0,0,1,23.43,7.85c7.28,4,13.57,9.43,19.83,14.52s12.49,10.3,18.42,16a93.32,93.32,0,0,1,15.71,19,108.28,108.28,0,0,1,11,22.17c5.33,15.66,7.18,32.53,4.52,48.62H257c-2.67-15.95-6.29-31.15-12-45.61A177.51,177.51,0,0,0,235.56,80,209.1,209.1,0,0,0,223.14,60a72.31,72.31,0,0,0-16.64-16.8c-6.48-4.62-13.93-7.61-21.14-10.45S171,27,163.48,24.84s-15.16-3.78-23.14-5.35Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#8bc53f"
                    d="M202.74,92.39c-9.26-2.68-18.86-6.48-28.58-10.32-.56-2.44-2.72-5.48-7.09-9.19-6.35-5.51-18.28-5.37-28.59-2.93-11.38-2.68-22.62-3.63-33.41-1C16.82,93.26,66.86,152.57,34.46,212.19c4.61,9.78,54.3,66.84,126.2,51.53,0,0-24.59-59.09,30.9-87.45C236.57,153.18,269.09,110.46,202.74,92.39Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#fff"
                    d="M213.64,131.2a5.35,5.35,0,1,1-5.38-5.32A5.36,5.36,0,0,1,213.64,131.2Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#009345"
                    d="M138.48,69.91c6.43.46,29.68,8,35.68,12.12-5-14.5-21.83-16.43-35.68-12.12Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#fff"
                    d="M144.6,106.58a24.68,24.68,0,1,1-24.69-24.67h0a24.68,24.68,0,0,1,24.68,24.66Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#58595b"
                    d="M137.28,106.8a17.36,17.36,0,1,1-17.36-17.36h0A17.36,17.36,0,0,1,137.28,106.8Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#8bc53f"
                    d="M233.63,142.08c-20,14.09-42.74,24.78-75,24.78-15.1,0-18.16-16-28.14-8.18-5.15,4.06-23.31,13.14-37.72,12.45S55,162,48.49,131.23C45.91,162,44.59,184.65,33,210.62c23,36.83,77.84,65.24,127.62,53C155.31,226.27,188,189.69,206.34,171c7-7.09,20.3-18.66,27.29-28.91Z"
                    transform="translate(0 0)"
                ></path>
                <path
                    fill="#58595b"
                    d="M232.85,143c-6.21,5.66-13.6,9.85-21.12,13.55a134.9,134.9,0,0,1-23.7,8.63c-8.16,2.11-16.67,3.7-25.29,2.92s-17.43-3.71-23.14-10.17l.27-.31c7,4.54,15.08,6.14,23.12,6.37a108.27,108.27,0,0,0,24.3-2,132.71,132.71,0,0,0,23.61-7.3c7.63-3.15,15.18-6.8,21.68-12Z"
                    transform="translate(0 0)"
                    ></path>
                </g>
            </svg>
            </a>
        </div>


        <p class="text-base text-gray-400">
          Copyright &copy; {year > 2022 ? "2022-" : "" }{year} VentureTrack, All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
