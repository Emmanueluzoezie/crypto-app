import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import useSWR from 'swr';
import { useContextState } from '../../context/context';
import Loading from '../Loading';
import SingleCrypto from './SingleCrypto';

export const CryptoHomeComponent = () => {
    const { currency } = useContextState()
    const [page, setPage] = useState(1)

    const address = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${page}&sparkline=false`;


    const fetcher = (url: string) => axios.get(url).then(res => res.data)

    const { data, error } = useSWR(address, fetcher)

    if (error) <p>Loading failed...</p>;
    // console.log(data)
    return (
        <div>
            {!data ?
                <Loading /> :
                <div className='md:pt-10'>
                    <div className='md:flex items-center p-3 w-inherit hidden'>
                        <div className=' w-[15%] md:w-[12%] flex justify-center md:justify-between md:px-4 items-center'>
                            <h1 className='hidden lg:flex text-xl font-bold'>N0</h1>
                            <div className='flex justify-center items-center'>
                                <div className='w-[50px] rounded-full h-[50px] md:w-[60px] md:h-[60px]  text-sm' />
                            </div>
                        </div>
                        <div className='md:flex items-center md:space-x-3 px-2 font-mono w-[35%] md:w-[32%]  md:text-xl truncate'>
                            <h1 className='font-semibold text-[15px] sm:text-[18px]  m-0 md:text-xl truncate text-center'>Coins</h1>
                            <h1 className='uppercase font-bold sm:text-[22px] text-gray-500 text-[15px] md:text-[15px] text-center truncate' ></h1>
                        </div>
                        <div className=' pl-2 font-mono w-[65%] md:w-[54%] flex truncate' >
                            <div className='flex items-center md:space-x-3 truncate w-full'>
                                <div className=' w-[25%] sm:pl-8 md:pl-0 md:w-[12%] truncate'>
                                    <h1 className='font-semibold text-[13px] md:text-[20px] sm:text-[15px]  m-0 !important truncate'>Percent</h1>
                                </div>
                                <div className='w-[50%] md:w-[32%] lg:w-[25%] truncate sm:pl-8 md:pl-0'>
                                    <h1 className='font-semibold text-[13px] md:text-[20px] sm:text-[16px] m-0 !important px-1 pl-4 md:px-3  truncate'>price</h1>
                                </div>
                                <div className='md:hidden w-[25%] truncate flex items-center'>
                                    <h1 className='text-[13px] sm:text-[16px] md:text-[20px] m-0 truncate px-1 font-semibold' >Marcap</h1>
                                </div>
                                <div className='hidden md:flex md:w-[32%] lg:w-[31%] truncate md:px-3'>
                                    <h1 className='text-[10px] sm:text-[16px] md:text-[20px] m-0 truncate px-1 font-semibold' >Market cap</h1>
                                </div>
                                <div className='hidden lg:flex lg:w-[31%] truncate md:px-3'>
                                    <h1 className='font-semibold text-[15px] md:text-[20px] m-0 sm:text-[16px] truncate'>Total market</h1>
                                </div>
                            </div>
                        </div>
                        <div className='w-[13%] md:w-[10%] truncate border-black flex justify-center'>
                            <h1 className='font-semibold text-[25px] m-0 truncate' />
                        </div>
                    </div>
                    {data?.slice(0, 5).map((crypto: any) => (
                        <SingleCrypto data={data}
                            key={crypto.id}
                            id={crypto.id}
                            name={crypto.name}
                            rank={crypto.market_cap_rank}
                            image={crypto.image}
                            price={crypto.current_price}
                            percent={crypto.market_cap_change_percentage_24h}
                            symbol={crypto.symbol}
                            market_cap={crypto.market_cap}
                            total_market={crypto.market_cap_change_24h}
                            // allTimeHigh={crypto.ath}
                        />
                    ))}
                </div>}
            <div className='border-t-2 py-4 text-center font-bold text-md md:text-xl'>
                    <Link href="/cryptos" className='hover:text-blue-600 hover:underline'>View more</Link>
                </div>
        </div>
    )
}
