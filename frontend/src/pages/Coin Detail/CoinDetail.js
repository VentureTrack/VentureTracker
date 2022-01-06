import React from "react";
import Table from "../../components/Table/Table";
import Stats from "../../components/Stats/Stats";

import "./CoinDetail.css";
import { useParams } from "react-router-dom";

function CoinDetail() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Coin",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Company",
        accessor: "company",
        Cell: (e) => (
          <div>
            {e.value.map((data) => (
              <a
                href={`http://localhost:3000/exchange/${data.name}`}
                className="underline decoration-1"
              >
                {data.name}{" "}
              </a>
            ))}
          </div>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Price",
        accessor: "col4",
      },
      {
        Header: "Market Cap",
        accessor: "col5",
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [totalAssets, setTotalAssets] = React.useState(null);
  const { slug } = useParams();

  // Only make the request once for the data
  React.useEffect(() => {
    setLoading(false);

    // API call to backend localhost:8080/asset/all
    const url = `http://localhost:8000/asset/${slug}`;
    console.log(url);

    fetch(url).then(async (res) => {
      let data = await res.json();

      setData([data]);
      setTotalAssets(data.length);

      console.log(data);
    });

    setLoading(true);
  }, []);


  return (
    <div class="lex flex-col bg-gray-900 grid grid-cols-1 md:px-16 px-5">
      <Stats totalAssets={totalAssets} name={slug} />
      <Table columns={columns} data={data} totalAssets={totalAssets} />

    </div>
  );
}

export default CoinDetail;
