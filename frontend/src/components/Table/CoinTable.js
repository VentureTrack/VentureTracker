import React, { useState, useEffect } from 'react'
import { Timeline } from 'react-twitter-widgets'
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import Stats from '../Stats/Stats';
import { useParams } from 'react-router-dom';


const Table = ()  => {
    // make a get request to "http://localhost:8000/asset/all/" using axios
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalAssets, setTotalAssets] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [assetsPerPage] = useState(25);
    const { slug } = useParams();    


    useEffect(() => {
        const fetchAssets = async () => {
            setLoading(true);
            // const url = `http://localhost:8000/asset/all/?offset=${(currentPage-1) * assetsPerPage}&limit=${assetsPerPage}`;
            const url = `http://localhost:8000/asset/${slug}/`;
            const res = await axios.get(url);
            setTotalAssets(res.data.count);
            setAssets(res.data.results);
            setLoading(false);
            // console.log(assets);
          }
          
        fetchAssets();

    
    }, []);

    const cols = ["Coin", "Company", "Market Cap", "Category"]
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <>
        <Stats totalAssets={totalAssets} />
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="mx-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className=" min-w-full divide-y divide-gray-200">
                    {/* Column Names */}
                    <thead className="bg-gray-50">
                        <tr>
                            {cols.map((col, index) => (
                                <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {col}
                            </th>
                            ))}
                        </tr>
                    </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {assets.map((asset) => (
                      <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src={asset.image} alt="" />
                              </div>
                              <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                              </div>
                          </div>
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900"><a href={`http://localhost:3000/exchange/${asset.company}`}>{asset.company}</a></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">MarketCap</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {/* <Pagination 
                assetsPerPage={assetsPerPage} 
                totalAssets={totalAssets} 
                paginate={paginate} 
                currentPage={currentPage}
            /> */}

          </div>
        </div>
      </div>
  </>
  )
}

export default Table;


