import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import useSWR from 'swr';
import { useContextState } from '../../context/context';
import Loading from '../Loading';
import SingleNewsComponent from './SingleNewsComponent';

export const NewsHomeComponent = () => {

    const address = `https://api.coingecko.com/api/v3/news/`;


    const fetcher = (url: string) => axios.get(url).then(res => res.data)

    const { data, error } = useSWR(address, fetcher)

    if (error) <p>Loading failed...</p>;

    return (
        <div>
            {!data ?
                <Loading /> :
                <div className='mx-auto'>
                    <div className='md:flex px-6 md:px-0 md:flex-wrap md:space-x-6 justify-center'>
                        {data.data?.slice(0, 3).map((news: any, index:number) => (
                            <SingleNewsComponent data={data}
                                Key={index}
                                title={news.title}
                                url={news.url}
                                image={news.thumb_2x}
                                site={news.news_site}
                                description={news.description}
                                time={news.updated_at}
                            />
                        ))}
                    </div>
                </div>}
            <div className='border-t-2 py-4 text-center font-bold text-md md:text-xl'>
                <Link href="/news" className='hover:text-blue-600 hover:underline'>View more</Link>
            </div>
        </div>
    )
}
