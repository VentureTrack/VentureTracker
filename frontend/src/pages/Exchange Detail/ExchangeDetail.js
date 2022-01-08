import React, { useEffect } from "react";

import Table from "../../components/Table/Table";
import Stats from "../../components/Stats/Stats";

import "./ExchangeDetail.css";
import { useParams } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";

// Skeleton Loaders
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CoinDetail() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Cryptocurrencies",
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
        Header: "Companies",
        accessor: "company",
        Cell: (e) => (
          <div>
            {e.value.map((data, i) => (
              <a
                href={`http://localhost:3000/exchange/${data.name}`}
                className=""
              >
                {data.name}
                {i < e.value.length - 1 ? ", " : ""}
              </a>
            ))}
          </div>
        ),
      },
      // {
      //   Header: "Categories",
      //   accessor: "category",
      //   Cell: (e) => (
      //     <div>
      //       <a>{e.value.length > 0 ? e.value[0]["tag"] : ""}</a>
      //       {e.value.length > 1 ? "..." : ""}
      //     </div>
      //   ),
      // },
      {
        Header: "Last Price",
        accessor: "currentPrice",
        Cell: (e) => {
          // convert to dollar
          if (e.value != null) {
            return `$${e.value.toLocaleString()}`;
          } else {
            return e.value;
          }
        },
      },
      {
        Header: "Last Market Cap",
        accessor: "currentMarketCap",
        Cell: (e) => {
          // convert to dollar with commas
          if (e.value != null) {
            return `$${e.value.toLocaleString()}`;
          } else {
            return e.value;
          }
        },
      },
      {
        Header: "7 Day Change",
        accessor: "sparkline",
        Cell: (e) => <img src={e.value} />,
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
    setLoading(true);

    // API call to backend localhost:8080/asset/all
    const url = `http://localhost:8000/company/${urlSlug}`;

    fetch(url).then(async (res) => {
      let data = await res.json();

      setData(data);
      setTotalAssets(data.length);

      setLoading(false);
      console.log(data);
    });

  }, []);

  const tableColumns = React.useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            Cell: (
              <SkeletonTheme
                className="text-lg"
                baseColor="#3d3d3d"
                highlightColor="#2e2e2e"
              >
                <Skeleton height={25} width={133} />
              </SkeletonTheme>
            ),
          }))
        : columns,
    [loading, columns]
  );

  const tableData = React.useMemo(
    () => (loading ? Array(30).fill({}) : data),
    [loading, data]
  );

  var totalHeight = 5 * data.length + 6;
  console.log(totalHeight);

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

  return (
    <div class="lex flex-col bg-gray-900 grid grid-cols-1 md:px-16 px-5">
      <Stats loading={loading} totalAssets={totalAssets} name={slug} />

      <div className="md:grid md:grid-cols-3 bg-gray-900">
        <div className="md:col-span-2">
          <Table
            totalAssets={totalAssets}
            columns={tableColumns}
            data={tableData}
          />
        </div>

        <div className="md:col-span-1 bg-gray-900 sm:pl-5 py-10">
          <TwitterTimelineEmbed
            sourceType="timeline"
            screenName={twitter[urlSlug.toLowerCase()]}
            theme="dark"
            options={{ height: 500 }}
            autoHeight
          />
        </div>
      </div>
    </div>
  );
}

export default CoinDetail;
