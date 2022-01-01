import { useTable } from 'react-table'
import React from 'react';


 function Table1() {
   const data = React.useMemo(
     () => [
       {
         col1: 'Hello',
         col2: 'World',
       },
       {
         col1: 'react-table',
         col2: 'rocks',
       },
       {
         col1: 'whatever',
         col2: 'you want',
       },
     ],
     []
   )
 
   const columns = React.useMemo(
     () => [
       {
         Header: 'Coin',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Company',
         accessor: 'col2',
       },
       {
         Header: 'Category',
         accessor: 'col3',
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
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
 
   return (
    <div className="bg-gray-900 justify-center py-5 flex flex-col overflow-x-auto">
        <table {...getTableProps()} className="rounded-t-lg overflow-hidden shadow align-middle h-20 w-11/12 mx-auto bg-gray-700">
        
            {/* Columns Header */}
            <thead className="shadow align-middle text-xl h-20 bg-gray-700">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="text-white">
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            {/* Data */}
            <tbody {...getTableBodyProps()} className="bg-gray-900">
                {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td
                            {...cell.getCellProps()}
                            style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            }}
                            className="text-white"
                        >
                            {cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    </div>
   )
 }

export default Table1