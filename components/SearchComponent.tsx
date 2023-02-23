import React, { useEffect, useState } from 'react'
import { MdClose, MdOutlineSearch } from 'react-icons/md';
import SearchList from './SearchList';
import useSWR from 'swr';
import { useContextState } from '../context/context';

const SearchComponent = () => {
    const [text, setText] = useState("")
    const { currency, setCurrency } = useContextState()

    const fetcher = (url:string) => {
        return fetch(url).then((r) => r.json());
    };

    const handle = () =>{
        
    }

    const arrayFetcher = ({ urlArray }:any) => {
        return Promise.all(urlArray.map(fetcher));
    };

    let urlArray = [];
    for (let i = 1; i < 20; i++) {
        urlArray.push(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`);
    }

    const { data } = useSWR({ urlArray }, arrayFetcher);

    // useEffect(() => {

    // },[data, text])

    return (
        <div className="bg-inherit w-screen"> 
            <div className='flex items-center mx-auto max-w-3xl pt-10 px-4 md:px-0'>
                <div className='flex-1'>
                    <form>
                        <div className="bg-gray-200 shadow-gray-400 shadow-2xl dark:shadow-none rounded-full flex space-x-2 items-center py-2 px-4" >
                            <MdOutlineSearch className='ml-2 text-gray-700 text-xl' />
                            <input className='flex-1 p-1 md:p-2 outline-none bg-inherit text-xl' placeholder='Search for crypto'
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            {text && (<button type='reset' onClick={() => setText("")} >
                                <MdClose className='cursor-pointer mr-4'/>
                            </button>)}
                        </div>
                    </form>
                </div>
            </div>
            <div className='px-5 md:px-10 hide pb-20 md:pb-32 space-y-4 pt-6'>
                {data && data.flat().filter(coin => {
                    if (text === '') {
                        return ""

                    } else if (coin.name.toLowerCase().includes(text.toLowerCase())) {
                        return coin;
                    }
                }).map((coin) => {

                    return (
                        <SearchList data={data}
                            key={coin.id}
                            id={coin.id}
                            name={coin.name}
                            rank={coin.market_cap_rank}
                            image={coin.image}
                            price={coin.current_price}
                            percent={coin.market_cap_change_percentage_24h}
                            coinSymbol={coin.symbol}
                            marketCap={coin.market_cap}
                            marketCapDaily={coin.market_cap_change_24h}
                        />
                    )
                })}
            </div>
        </div>
  )
}

export default SearchComponent