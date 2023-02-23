import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MdStarBorder } from 'react-icons/md'

const SearchList = ({ id, name, rank, image, price, percent, coinSymbol, marketCap,marketCapDaily }:any) => {
    const router = useRouter()

  return (
          <div className='px-4 bg-gray-200 py-2 border rounded-full cursor-pointer'>
              <div className='flex '>
                  <div className='flex flex-1 items-center truncate'>
                      {/* <div className='w-[40px] rounded-full h-[40px] md:w-[50px] md:h-[50px]  text-sm bg-red-400'></div> */}
                      <img loading='lazy' src={`${image ? image : name?.charAt(0)}`} alt="" className='w-[40px] rounded-full h-[40px] md:w-[50px] md:h-[50px]  text-sm' />
                      <div className=' flex items-center pl-3'>
                          <h1 className='pr-8 truncate'>{name}</h1>
                      <h1 className='font-bold uppercase text-lg text-gray-600'>{coinSymbol}</h1>
                      </div>
                  </div>
                  <div className='w-[70px] md:w-[140px] flex items-center justify-between'>
                      <h1 className='px-2'>{rank}</h1>
                      <h1 className='text-2xl'><MdStarBorder /></h1>
                  </div>
              </div>
          </div>
  )
}

export default SearchList