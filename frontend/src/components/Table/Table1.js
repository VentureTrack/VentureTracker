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
         headerStyle: {textAlign: 'right'}
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
    <div className="bg-gray-900 py-5 flex flex-col overflow-x-auto">
        <table {...getTableProps()} className="rounded-t-lg border border-gray-900 overflow-hidden shadow align-middle h-20 w-11/12 lg:mx-auto mx-5 bg-gray-700">
        
            {/* Columns Header */}
            <thead className="shadow align-middle text-xl h-16 bg-gray-800">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="text-white px-4">
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
                            border: 'solid 1px gray-800',
                            borderLeft: 'none',
                            borderRight: 'none'
                            }}
                            className="text-white border border-gray-300"
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