import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import useSWR from 'swr';
import { useContextState } from '../../context/context';
import Loading from '../Loading';
import SingleNewsComponent from './SingleNewsComponent';

export const NewsComponent = () => {
    const { currency } = useContextState()
    const [page, setPage] = useState(1)

    const address = `https://api.coingecko.com/api/v3/news/`;


    const fetcher = (url: string) => axios.get(url).then(res => res.data)

    const { data, error } = useSWR(address, fetcher)

    if (error) <p>Loading failed...</p>;
    console.log(data)

    return (
        <div>
            {!data ?
                <Loading /> :
                <div className='pt-6 mx-auto max-w-7xl'>
                    <div className='md:flex md:flex-wrap md:space-x-6 justify-center'>
                        {data.data?.map((news: any) => (
                            <SingleNewsComponent data={data}
                                Key={news.title}
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
        </div>
    )
}
