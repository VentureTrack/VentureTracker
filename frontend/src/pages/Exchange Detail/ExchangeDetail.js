import React, { useEffect } from "react";

import Table from "../../components/Table/Table";
import Stats from "../../components/Stats/Stats";

import "./ExchangeDetail.css";
import { useParams } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function CoinDetail() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Coin",
        accessor: "name", // accessor is the "key" in the data
        Cell: (e) => (
          <a href={`http://localhost:3000/exchange/${e.value}`}>{e.value}</a>
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
                className="underline"
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

  var urlSlug = slug.split(".").join("");

  // Only make the request once for the data
  useEffect(() => {
    setLoading(false);

    // API call to backend localhost:8080/asset/all
    const url = `http://localhost:8000/company/${urlSlug}`;

    fetch(url).then(async (res) => {
      let data = await res.json();

      setData(data.results);
      setTotalAssets(data.count);

      console.log(data.results);
    });

    setLoading(true);
  }, []);

  let twitter = {
    binance: "binancelabs",
    coinbase: "coinbase",
    blockchaincom: "blockchain",
    gemini: "gemini",
    gateio: "gate_ventures",
    kucoin: "KCLabsOfficial",
    cryptocom: "cryptocom",
    cointiger: "CoinTigerEX",
    okex: "OKEx",
  };

  var totalHeight = (5*data.length) + 6;
  console.log(totalHeight);

  return (
    <div class="lex flex-col bg-gray-900 grid grid-cols-1 md:px-16 px-5">
      <Stats totalAssets={totalAssets} name={slug} />
      
      <div className="md:grid md:grid-cols-3 bg-gray-900">
        
        <div className="md:col-span-2">
          <Table columns={columns} data={data} totalAssets={totalAssets} />
        </div>

        <div className="md:col-span-1 bg-gray-900 sm:pl-5 py-10">
          <TwitterTimelineEmbed
            sourceType="timeline"
            screenName={twitter[urlSlug.toLowerCase()]}
            theme="dark"
            options={{ height: 500 }}
            // autoHeight
          />
        </div>

      </div>
    </div>
  );
}

export default CoinDetail;
