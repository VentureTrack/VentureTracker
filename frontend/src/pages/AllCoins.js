import React from 'react'
import './AllCoinsStyle.css'
import Table from '../components/Table/Table';
import Table1 from '../components/Table/Table1';
import Stats from '../components/Stats/Stats';

function AllCoins() {
    return (
        <div class="flex flex-col">
            <Stats />
            <Table1 className="rounded-t-xl" />
        </div>
    )
}

export default AllCoins
    