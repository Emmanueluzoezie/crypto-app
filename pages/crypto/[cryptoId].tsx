import Image from "next/image"
import Link from "next/link"
import axios from "axios";
import useSWR from "swr";
import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar } from '@mui/material'
import { NumericFormat } from 'react-number-format';
import { useContextState } from "../../context/context";
import Loading from "../../components/Loading";
import CryptoInfo from "../../components/CryptoInfo";
import { MdArrowDownward, MdArrowUpward, MdOutlineArrowBack } from "react-icons/md";
import { Currency } from "../../components/Currency";
import Footer from '../../components/Footer'


const CoinPage = () => {
    const router = useRouter()
    const pid = router.query
    const coinId = pid.cryptoId;
    // console.log(coinId.cryptoId)
    const { currency, setCurrency, currencySymbol } = useContextState()

    const address = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&coins/Bitcoin

    const fetcher = (url:string) => axios.get(url).then(res => res.data)

    const getCurrency = (cur:string) => {
        return setCurrency(cur)
    }

    const { data, error } = useSWR(address, fetcher)
    // if (data && data.market_data && data.market_data.current_price){
    //     // console.log(data.market_data.current_price?.getCurrency("usd"))
    //     console.log(data)
    // }

    function getStatusText(change:any) {
        if (change < 0) {
            return "RED"
        } else if (change > 0) {
            return "GREEN"
        }
        return "green"
    }

    return (
        <div className="p-2">
            {!data && <Loading />}
            <div className="">
                {data &&
                    <div className="p-2">
                        <div className="flex items-center justify-between">
                            <div className="md:flex items-center justify-between w-full">
                                <div className="flex items-center space-x-4">
                                    <MdOutlineArrowBack className="cursor-pointer   text-2xl md:text-4xl lg:text-6xl" onClick={() => router.back()} />
                                    <div className="flex items-center space-x-2">
                                        <img loading='lazy' src={data.image?.thumb} alt="" className='w-[40px] rounded-full h-[40px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px]  text-sm' />
                                        <strong className="uppercase md:px-10 text-[20px] md:text-[30px] lg:text-[40px]">{data.symbol}</strong>
                                        <span className="bg-gray-200 px-1 rounded-md text-[14px] md:text-[20px] md:px-3">#{data.market_cap_rank}</span>
                                    </div>
                                    <Currency />
                                </div>
                                <div className="md:pr-20 mt-6 md:mt-0 flex justify-between items-center space-x-4">
                                    <strong className="text-xl md:text-2xl lg:text-4xl">{data.name}</strong>
                                    <div className="flex justify-between items-center space-x-4">
                                        <NumericFormat className="font-bold text-2xl" value={data.market_data.current_price?.currency} displayType={'text'} thousandSeparator={true} prefix="$" />
                                        <div className="text-[18px] text-white font-bold rounded-md flex items-center px-2 " style={{ backgroundColor: getStatusText(data.market_data.price_change_percentage_24h_in_currency.usd) }}>
                                            {data.market_data.price_change_percentage_24h_in_currency.usd < 0 ? (<MdArrowUpward />) : (<MdArrowDownward />)}
                                            <h1>{Number(data.market_data.price_change_percentage_24h_in_currency.usd).toFixed(3)}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                }
                {data && <div className="p-2">
                    <div>
                        <div className="mb-8">
                            <CryptoInfo coinId={coinId} />
                        </div>
                        <div className=''>
                            <strong className='text-2xl font-semibold'>Statistic</strong>
                            <div className='my-2 text-sm sm:text-[16px] md:text-xl'>
                                <div className="flex justify-between items-center my-2  shadow-xl py-4 px-4">
                                    <span className='font-semibold'>Current price</span>
                                    <NumericFormat value={data.market_data.current_price.usd} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} className="font-bold"/>
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>Price change 24h</span>
                                    <NumericFormat value={data.market_data.price_change_percentage_24h_in_currency.usd}  displayType={'text'} thousandSeparator={true} prefix={currencySymbol} className="font-bold" />
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>All time high</span>
                                    <NumericFormat value={data.market_data.ath.usd} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} className="font-bold" />
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>All time high date</span>
                                    <strong>{new Date(data.market_data.ath_date.usd).toLocaleString()}</strong>
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>All time high percentage</span>
                                    <strong>${data.market_data.ath_change_percentage.usd}</strong>
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>Market cap</span>
                                    <NumericFormat value={data.market_data.market_cap.usd} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} className="font-bold" />
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>fully dulited market cap</span>
                                    <NumericFormat value={data.market_data.fully_diluted_valuation
                                        .usd} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} className="font-bold" />
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>Trading volume</span>
                                    <NumericFormat value={data.market_data.total_volume.usd} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} className="font-bold" />
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>Total supply</span>
                                    <NumericFormat value={data.market_data.total_supply} displayType={'text'} thousandSeparator={true} prefix={currencySymbol} className="font-bold" />
                                </div>
                                <div className="flex justify-between items-center shadow-xl py-4 px-4">
                                    <span className='font-semibold'>Last Updated</span>
                                    <strong>{new Date(data.market_data.last_updated).toLocaleString()}</strong>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8 w-full'>
                            <div className="w-full border-b-2 p-3 flex items-center space-x-4">
                                <strong className='text-3xl font-semibold'>About {data.name}</strong>
                                <h1 className="uppercase font-bold lg:text-2xl">{data.symbol}</h1>
                            </div>
                            <h1 className='text-xl capitalize lg:text-2xl my-4 pl-2 font-semibold'>what is {data.name}</h1>

                            <p className="text-sm sm:text-[17px] lg:text-xl font-serif">{data.description.en.replace(/<\/?[^>]+>/gi, '')}.</p>
                        </div>
                        <div className='mt-3 w-inherit mx-auto max-w-3xl'>
                            <div className="w-full p-3 text-center">
                                <strong className='text-xl md:text-2xl  font-semibold '>{`${data.name} Links`}</strong>
                            </div>
                            <div className="w-inherit lg:text-xl flex flex-col md:flex-row items-center md:justify-between truncate"> 
                                <div className="break-words text-blue-700 truncate">
                                    <Link href={`${data.links.blockchain_site[0]}`}><span className="hover:underline text-md" >{data.links.blockchain_site[0]}</span></Link>
                                </div>
                                <div className="break-words text-blue-700 truncate">
                                    <Link href={`${data.links.blockchain_site[1]}`}><span className="hover:underline text-md" >{data.links.blockchain_site[1]}</span></Link>
                                </div>
                                <div className="break-words text-blue-700 truncate">
                                    <Link href={`${data.links.blockchain_site[2]}`}><span className="hover:underline text-md" >{data.links.blockchain_site[2]}</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <Footer />
        </div>
    );
};

export default CoinPage;