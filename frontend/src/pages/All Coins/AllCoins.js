import React, { useEffect } from "react";

import Table from "../../components/Table/Table";
import Stats from "../../components/Stats/Stats";
import "./AllCoins.css";

function AllCoins() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Coin",
        accessor: "name", // accessor is the "key" in the data
        Cell: (e) => (
          <a
            href={`http://localhost:3000/coin/${e.value}`}
            className="underline decoration-1"
          >
            {e.value}
          </a>
        ),
      },
      {
        Header: "Company",
        accessor: "company",
        Cell: (e) => (
          <div>
            {e.value.map((data, i) => (
              <a
                href={`http://localhost:3000/exchange/${data.name}`}
                className=""
              >
                {data.name}{i < e.value.length - 1 ? ", " : ""}
              </a>
            ))}
          </div>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (e) => (
          <div>
            {e.value.map((data, i) => (
              <a>
                {data.tag}{i < e.value.length - 1 ? ", " : ""}
              </a>
            ))}
          </div>
        ),
      },
      {
        Header: "Price",
        accessor: "currentPrice",
        Cell: e => {
          // convert to dollar
          if (e.value != null) {
            return `$${e.value.toLocaleString()}`;
          } else { 
            return e.value; 
          }
        },
      },
      {
        Header: "Market Cap",
        accessor: "currentMarketCap",
        Cell: e => {
          // convert to dollar with commas
          if (e.value != null) {
            return `$${e.value.toLocaleString()}`;
          } else { 
            return e.value; 
          }
        },
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [totalAssets, setTotalAssets] = React.useState(null);


  // Only make the request once for the data
  useEffect(() => {
    setLoading(true);

    // API call to backend localhost:8080/asset/all
    const url = `http://localhost:8000/asset/all/`;
    
    fetch(url).then(async (res) => {
      let data = await res.json();
      
      setData(data);      
      setTotalAssets(data.length);
      
      console.log(data);
      setLoading(false);
    });
  }, []);


  return (
    <div className="flex flex-col bg-gray-900 grid grid-cols-1 md:px-16 px-5">
      { loading ? 
        <div>Loading...</div>
      :  
      <Stats loading={loading} totalAssets={totalAssets} name="ALL" />
      <Table columns={columns} data={data} totalAssets={totalAssets} />
    }
    </div>
  );
}

export default AllCoins;
