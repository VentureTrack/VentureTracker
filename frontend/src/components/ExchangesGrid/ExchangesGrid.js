import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ExchangeGrid = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCompanies, setTotalCompanies] = useState(null);
    
    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            const url = `http://localhost:8000/company/all`;
            const res = await axios.get(url);
            setTotalCompanies(res.data.length);
            setCompanies(res.data.results);
            setLoading(false);

        }
        
        fetchCompanies();
    }, []);


    return (
        <>
            <div>
                <header className="bg-white mb-5">
                    <div className="break-normal flex justify-center mx-auto py-6 px-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Exchanges</h1>
                    </div>
                </header>

                <div>
                    {companies.map((company, index) => (
                        <div>
                            <a href={`http://localhost:3000/exchange/${company.name}`}>
                                {company.name}
                            </a>
                        </div>
                    ))}

                </div>
                
            </div>   
        </>         
    )
}

export default ExchangeGrid