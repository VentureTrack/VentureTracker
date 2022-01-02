import React from 'react'
import './AllCoinsStyle.css'
// import Table from '../components/Table/Table';
// import Table1 from '../components/Table/Table1';
import Table from '../components/Table/Table2';
import Stats from '../components/Stats/Stats';

function AllCoins() {
    const columns = React.useMemo( () => [
          {
            Header: 'Coin',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Company',
            accessor: 'company',
          },
          {
            Header: 'Category',
            accessor: 'category',
          },
          {
            Header: 'Price',
            accessor: 'col4',
          },
          {
            Header: 'Market Cap',
            accessor: 'col5',
          },   
        ],
        []
    )

    // We'll start our table without any data
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const [totalAssets, setTotalAssets] = React.useState(null);
    const fetchIdRef = React.useRef(0)

    const fetchData = React.useCallback(({ pageIndex }) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current
        const pageSize = 25;

        // Set the loading state
        setLoading(true)

        // We'll even set a delay to simulate a server here
        setTimeout(() => {
        // Only update the data if this is the latest fetch
        if (fetchId === fetchIdRef.current) {
            // const startRow = pageSize * pageIndex
            // const endRow = startRow + pageSize

            const url = `http://localhost:8000/asset/all/?offset=${pageSize * pageIndex}`;

            // API call to backend localhost:8080/asset/all
            fetch(url)
                .then(async res => {
                    let data = await res.json();
                    setData(data.results);
                    setTotalAssets(data.count);
                    setPageCount(Math.ceil(data.count / pageSize));
                })
                
            
            setLoading(false)
        }
        })
    }, [])

    return (
        <div class="flex flex-col">
            <Stats totalAssets={totalAssets} name="ALL" />
            <Table
                columns={columns}
                data={data}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                totalAssets={totalAssets}
            />
        </div>
    )

}

export default AllCoins;