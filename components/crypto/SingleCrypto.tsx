import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { toast } from 'react-hot-toast';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { NumericFormat } from 'react-number-format';
import { useContextState } from '../../context/context';
import { ADD_FAVORITE_CRYPTO, DELETE_FAVORITE_CRYPTO } from '../../graphql/mutations';
import { GET_ALL_FAVORITE_CRYPTO, GET_ALL_FAVORITE_CRYPTO_BY_USERNAME } from '../../graphql/querries';

const SingleCrypto = ({ name, id, rank, allTimeHigh, total_market, image, price, symbol, market_cap, percent }:any) => {
    const [favoriteName, setFavoriteName] = useState<string[]>([])
    const { currencySymbol, currency } = useContextState()
    const router = useRouter()
    const { data: session } = useSession()

    // adding to favorite page
    const [addFavorite] = useMutation(ADD_FAVORITE_CRYPTO, {
        refetchQueries: [GET_ALL_FAVORITE_CRYPTO_BY_USERNAME, "getFavorite_cryptoListByUsername"]
    })

    // remove from favorite
    const [removeFavorite] = useMutation(DELETE_FAVORITE_CRYPTO,
        { refetchQueries: [GET_ALL_FAVORITE_CRYPTO_BY_USERNAME, "getFavorite_cryptoListByUsername"] }
    )

    const { data: favoriteCrypto, loading, error } = useQuery(GET_ALL_FAVORITE_CRYPTO_BY_USERNAME, {
        variables: {
            username: session?.user?.name
        }
    })
    
    let marketCapDailys = Number(total_market).toFixed(3)
    let percents = Number(percent).toFixed(2)
    
    const localPrice = currency === "NGN"? price * 1.70 : price
    const prices: any = Number(localPrice).toFixed(2)
    
    function getStatusText(change:number|string) {
        if (change < 0) {
            return "RED"
        } else if (change > 0) {
            return "GREEN"
        }
        return "green"
    }

    const removeItem = (name:string) => {
        const newArray = favoriteName.filter((item, i) => item !== name);
        setFavoriteName(newArray);
    }

    const handleFavorite = async() => {
        const notification = toast.loading('Adding to your favorite Page...');
        try{
            if (!session) {
                toast.error("Opps! you are not logged in. please login", { id: notification })
                return
            }
            // delete if already exist
            if (favoriteName.includes(name)) {
                await removeFavorite({
                    variables: {
                        name: name,
                        image: image,
                        total_market: total_market,
                        price: price,
                        rank: rank,
                        username: session?.user?.name,
                        symbol: symbol,
                        market_cap: market_cap,
                        percent: percent,
                        id: id,
                        created_at: new Date()
                    }
                })
                removeItem(name)
                toast.success("Removed from Favorite list", {id: notification})
                return
            }
            await addFavorite({
                variables:{
                    name: name,
                    image: image,
                    total_market: total_market,
                    price: price,
                    rank: rank,
                    username: session?.user?.name,
                    symbol: symbol,
                    market_cap: market_cap,
                    percent: percent  
                }
            })
            toast.success("Successfully Added...", {id: notification})
        }
        catch(error){
            toast.error("OOPS! An error occurred...", { id: notification })
            console.log(error)
        }
    }


    useEffect(() => {
        if (favoriteCrypto) {
            const FavoriteName = favoriteCrypto.getFavorite_cryptoListByUsername.map((crypto: any) => {
                return crypto.name
            })
            setFavoriteName(FavoriteName);
        }
    }, [favoriteCrypto])
 
  return (
      <div className='w-screen'>
          <div className='flex border-t-2 items-center hover:bg-gray-100 hover:shadow-xl p-3 w-inherit cursor-pointer'>
            {/* <Link href={`/crypto/${id}`}> */}
              <div className=' w-[15%] md:w-[12%] flex justify-center md:justify-between md:px-4 md:pr-10 items-center' onClick={() => router.push(`/crypto/${id}`)}>
                  <h1 className='hidden lg:flex text-xl font-semibold'>{rank}</h1>
                  <div className='flex justify-center items-center'>
                      <img loading='lazy' src={`${image ? image : name?.charAt(0)}`} alt="" className='w-[40px] rounded-full h-[40px] md:w-[50px] md:h-[50px]  text-sm'/>
                  </div>
              </div>
            {/* </Link> */}
              {/* <Link href={`/crypto/${id}`}> */}
              <div className='md:flex items-center md:space-x-3 px-2 font-mono w-[35%] md:w-[32%]  md:text-xl truncate' onClick={() => router.push(`/crypto/${id}`)}>
                  <h1 className='text-[15px] sm:text-[18px]  m-0 md:text-xl truncate text-center'>{name}</h1>
                  <div className='space-x-4 flex justify-center'>
                      <h1 className='uppercase font-semibold md:hidden sm:text-[22px] text-black text-[15px] md:text-[15px] font-serif text-center truncate' >{rank}</h1>
                      <h1 className='uppercase sm:text-[22px] text-gray-500 text-[15px] md:text-[22px] font-extrabold text-center truncate' >{symbol}</h1> 
                  </div>
              </div>
              {/* </Link> */}
              <div className=' pl-2 font-mono w-[65%] md:w-[54%] flex truncate' onClick={() => router.push(`/crypto/${id}`)}>
                  <div className='flex items-center md:space-x-3 truncate w-full'>
                      <div className=' w-[25%] sm:pl-8 md:pl-0 md:w-[12%] truncate'>
                          <h1 className='font-semibold text-[13px] sm:text-[15px]  m-0 !important truncate' style={{ color: getStatusText(percents) }}>{percents}</h1>
                      </div>
                      <div className='w-[50%] md:w-[32%] lg:w-[25%] truncate sm:pl-8 md:pl-0'>
                          <h1 className='font-semibold text-[13px] sm:text-[16px] m-0 !important px-1 pl-4 md:px-3  truncate'><NumericFormat value={prices} displayType={'text'} thousandSeparator={true} /></h1>
                      </div>
                      <div className='md:hidden w-[25%] truncate flex items-center'>
                          <h1 className='text-[13px] sm:text-[16px] m-0 truncate px-1 font-semibold' ><NumericFormat value={market_cap} displayType={'text'} thousandSeparator={true} /></h1>
                          <span className='text-xs font-medium text-gray-500 font-serif'>{market_cap?.length >= 9 ? "Ml" : "Bn"}</span>
                      </div>
                      <div className='hidden md:flex md:w-[32%] lg:w-[31%] truncate md:px-3'>
                          <h1 className='text-[10px] sm:text-[16px] m-0 truncate px-1 font-semibold' ><NumericFormat value={market_cap} displayType={'text'} thousandSeparator={true} /></h1>
                          <span className='text-xs font-medium text-gray-500 font-serif'>{market_cap?.length >= 9 ? "Ml" : "Bn"}</span>
                      </div>
                      <div className='hidden lg:flex lg:w-[31%] truncate md:px-3'>
                          <h1 className='font-semibold text-[15px]  m-0 sm:text-[16px] truncate'><NumericFormat value={market_cap} displayType={'text'} thousandSeparator={true} /></h1>
                          <span className='text-xs font-medium text-gray-500 font-serif'>{marketCapDailys.length >= 9 ? "Ml" : "Bn"}</span>
                      </div>
                  </div>
              </div>
                <div className='w-[13%] md:w-[10%] truncate border-black flex justify-center'>
                  <h1 className='font-semibold text-[25px] m-0 truncate' onClick={() => handleFavorite()}>
                      {favoriteName.includes(name)?
                          <MdStar className='text-yellow-600' />:
                        <MdStarBorder />
                      }
                    </h1>
                </div>
          </div>
    </div>
  )
} 
export default SingleCrypto