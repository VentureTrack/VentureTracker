import React from 'react'
import './AllCoinsStyle.css'
import ExchangeTable from '../components/Table/ExchangeTable';

function ExchangeDetail() {
    return (
        <div class="min-h-full flex flex-col Over">
            <ExchangeTable />
        </div>
    )
}

export default ExchangeDetail



{/* <div className="col-span-1">
<Timeline
    dataSource={{
        sourceType: 'profile',
        screenName: 'BinanceLabs'
    }}
    options={{
        height: '400',
        // width: '500'
    }}
    />
</div> */}