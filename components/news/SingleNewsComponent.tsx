import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleNewsComponent = ({ title, url, image, site, description,time }:any) => {
  const newTime = new Date(time * 1000)
  const getArticleTime = moment(newTime, "YYYYMMDD").fromNow();

  return (
    <div className='mb-4 shadow-2xl rounded-2xl'>
        <div className='p-4 pt-7 md:w-[400px]'>
          <div className=''>
            <img src={image} alt="" className='w-full h-[200px]' />
          </div>
          <div className='mt-3 space-y-2'>
            <h2 className='font-semibold line-clamp-2 font-serif'>{title}</h2>
            <p className='line-clamp-3 '>{description}</p>
          </div>
          <div className='mt-3 flex justify-between'>
            <Link href={url}>
              <h2 className='font-semibold line-clamp-2 font-serif text-blue-500'>{site}</h2>
            </Link>    
            <p className='line-clamp-3 '>{getArticleTime}</p>
          </div>
        </div>
    </div>
  )
}

export default SingleNewsComponent