import { useQuery } from '@apollo/client'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { GET_ALL_FAVORITE_CRYPTO_BY_USERNAME } from '../../graphql/querries'
import Loading from '../Loading'
import SingleCrypto from './SingleCrypto'
import SingleFavorite from './SingleFavorite'

const FavoriteComponent = () => {
    const {data: session} = useSession()
    const router = useRouter()
    const { data, loading, error } = useQuery(GET_ALL_FAVORITE_CRYPTO_BY_USERNAME, {
        variables: {
            username: session?.user?.name
        }
    })

    const favoriteCrypto = data?.getFavorite_cryptoListByUsername

    // s// }

  return (
    <>
    {!session? 
    <div className='h-[80vh] flex items-center justify-center'>
      <div className='text-xl font-semibold flex flex-col items-center'>
        <p>You are not logged in. Please login to continue</p>
            <button className="p-1 px-4 text-xl hover:bg-gray-400 rounded-md font-semibold text-white bg-gray-500" 
            onClick={() => signIn()}>Login</button>
      </div>
    </div>:
        <div className='pt-10'>
          <h2 className='text-center font-mono font-bold text-2xl'>Favorites</h2>
          <div className='flex items-center p-3 w-inherit'>
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
          {favoriteCrypto?.length <= 0 && 
            <div className='h-[80vh] flex items-center justify-center'>
              <div className='text-xl font-semibold capitalize flex flex-col items-center'>
                <p className='text-center px-3 mb-4s'>You don't have a favorite crypto. please go to home page or crypto page to add some of your favorite</p>
                <div className=' space-x-4'>
                  <button className="p-1 px-4 text-xl rounded-md font-semibold text-white bg-gray-500 hover:bg-blue-500"
                    onClick={() => router.push("/")}>Home</button>
                  <button className="p-1 px-4 text-xl hover:bg-blue-500 rounded-md font-semibold text-white bg-gray-500"
                    onClick={() => router.push("/crypto")}>Crypto Coins</button>
                </div>
              </div>
            </div>
            }
          {loading && <Loading />}
          {favoriteCrypto?.map((crypto: any) =>
            <SingleFavorite crypto={crypto} />
          )}
        </div>}
    </>
  )
}

export default FavoriteComponent