import { useState } from "react"
import Link from "next/link"
import logo from "../public/logodark.png"
import Image from "next/image";
import { MdOutlineMenu, MdClose, MdOutlineSearch, MdNotifications, } from "react-icons/md"
import { useContextState } from "../context/context";
import { FaCoins, FaHome, FaNewspaper, FaSearch, FaStackExchange } from "react-icons/fa"
import { SiBitcoinsv } from "react-icons/si"
import { signIn, signOut, useSession } from "next-auth/react";
import { Currency } from "./Currency";
import { useRouter } from "next/router";

const Header = () => {
    const {mobileOpen, setMobileOpen} = useContextState();
    const { data: session} = useSession()
    const router = useRouter()

    return (
        <header className="bg-gray-100 border-gray-200 border-b-2 sticky top-0 z-50 w-inherit">
           <div className="relative">
                <nav className="flex p-4 justify-between items-center lg:px-10">
                <div className="flex-shrink-0 pr-16">
                        <div className='w-[30px] cursor-pointer' onClick={() => router.push("/")}>
                            <Image src={logo} className="w-[30px]" alt="logo"/>
                        </div> 
                </div>
                    <div className="flex space-x-2 md:space-x-4 items-center">
                        <div className="p-1 hover:bg-white cursor-pointer  rounded-xl">
                            {mobileOpen ?
                                <MdClose className="text-3xl" onClick={() => setMobileOpen(false)} /> :
                                <MdOutlineMenu className="text-3xl" onClick={() => setMobileOpen(true)} />}
                        </div>
                        <Link href="/search">
                            <div className={`p-1 hover:bg-white cursor-pointer  rounded-xl  ${router.pathname === "/search"? "hidden": ""}`}>
                                <MdOutlineSearch className="text-2xl" />
                            </div>
                        </Link>
                        <div className="p-1 hover:bg-white cursor-pointer  rounded-xl text-gray-500">
                            <MdNotifications className="text-2xl" />
                        </div>
                        <div className="hidden md:flex p-1 hover:bg-white cursor-pointer rounded-xl relative">
                            <Currency />
                        </div>
                        {session ? 
                            <button className="p-1 px-4 hover:bg-gray-400 rounded-md font-semibold text-white bg-gray-500" onClick={() => signOut()}>Logout </button>
                            : <button className="p-1 px-4 text-sm md:text-lg hover:bg-gray-400 rounded-md font-semibold text-white bg-gray-500" onClick={() =>signIn()}>Login</button>}
                    </div>
                </nav>
                    {mobileOpen && 
                    <div className="absolute z-50 top-[74px] left-0 w-[280px] ">
                        <ul className=" bg-white shadow-2xl py-4 px-3 text-md font-semibold duration-1000">
                                <Link href="/"  onClick={() => setMobileOpen(false)}>
                                    <li className="py-3 px-7 hover:bg-gray-200  hover:text-blue-600 space-x-3 flex items-center my-3">
                                        <FaHome />
                                        <h2>Home</h2>
                                    </li>
                                </Link>
                                <Link href="/cryptos" onClick={() => setMobileOpen(false)}>
                                    <li className="py-3 px-7 hover:bg-gray-200  hover:text-blue-600 space-x-3 flex items-center my-3"> 
                                        <SiBitcoinsv />
                                        <h2>Crypto Coins</h2>
                                    </li>
                                </Link>
                                <Link href="/Exchanges" onClick={() => setMobileOpen(false)}>
                                    <li className="py-3 px-7 hover:bg-gray-200 flex items-center hover:text-blue-600 space-x-3 my-3">
                                        <FaStackExchange />
                                        <h2>Exchange Rates</h2>
                                    </li>
                                </Link>
                                <Link href="/favoriteExchanges" onClick={() => setMobileOpen(false)}>
                                    <li className="py-3 px-7 hover:bg-gray-200 flex items-center my-3 hover:text-blue-600 space-x-3">
                                        <FaCoins />
                                        <h2>Favorite Exchanges</h2>
                                    </li>
                                </Link>
                                <Link href="/favoriteCryptos" onClick={() => setMobileOpen(false)}>
                                    <li className="py-3 px-7 hover:bg-gray-200 flex items-center my-3  hover:text-blue-600 space-x-3">
                                        <FaCoins />
                                        <h2>Favorite Cryptos</h2>
                                    </li>
                                </Link>
                                <Link href="/news" onClick={() => setMobileOpen(false)}>
                                    <li className="py-3 px-7 hover:bg-gray-200 flex items-center my-3  hover:text-blue-600 space-x-3">
                                        <FaNewspaper />
                                        <h2>Crypto News</h2>
                                    </li>
                                </Link>
                                <Link href="/news" onClick={() => setMobileOpen(false)}>
                                    <li className="py-3 px-7 hover:bg-gray-200 flex items-center my-3  hover:text-blue-600 space-x-3">
                                        <FaNewspaper />
                                        <h2>Exchange News</h2>
                                    </li>
                                </Link>
                                <li className="py-3 px-7 hover:bg-gray-200 flex items-center my-3 md:hidden hover:text-blue-600 space-x-3">
                                        <h2>Currency</h2>
                                        <Currency />
                                    </li>
                            </ul>
                        </div>}
           </div>
        </header>
    )
};

export default Header;