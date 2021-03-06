import React, { useState, useEffect } from "react";
import axios from "axios";

const ExchangeGrid = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCompanies, setTotalCompanies] = useState(null);
  
  // Only make the request once for the data
  useEffect(() => {
    setLoading(false);
    
    // API call to backend localhost:8080/asset/all
      const url = `http://localhost:8000/company/all`;
  
      fetch(url).then(async (res) => {
        let data = await res.json();
  
        console.log(data);

        setTotalCompanies(data.length);
        setCompanies(data);

        setLoading(false);
      });
  
      setLoading(true);
    }, []);



  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-gray-900">
      {loading === true ? 
        <div className="flex justify-center bg-gray-900 h-screen"></div>
        :
      
      companies.map((company) => (
        <div className="rounded overflow-hidden shadow-lg bg-gray-800">

          <a href={`exchange/${company.name}`}>
            <img className="h-48 w-96" src={company.logo} alt={company.name} />
            <div className="px-6 py-4">
                <a className="text-white font-bold text-xl" href={`exchange/${company.name}`}>{company.name}</a>
            </div>
          </a>

          <div className="px-6 pb-2">
            <a href={`exchange/${company.name}`} className="inline-block bg-gray-900 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              Portfolio
            </a>
            <a href={company.twitter} className="inline-block bg-gray-900 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              Twitter
            </a>
            <a href={company.website} className="inline-block bg-gray-900 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              Website
            </a>
            <a href={company.affiliateLink} className="inline-block bg-gray-900 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              Sign Up
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExchangeGrid;
