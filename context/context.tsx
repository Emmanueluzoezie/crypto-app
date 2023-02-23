import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IstateContext {
    sidebar: boolean
    setSidebar: Dispatch<SetStateAction<boolean>>
    mobileOpen: boolean
    setMobileOpen: Dispatch<SetStateAction<boolean>>
    currency: string,
    setCurrency: Dispatch<SetStateAction<string>>
    currencySymbol: string,
    setCurrencySymbol: Dispatch<SetStateAction<string>>
}

const initialState = {
    sidebar: false,
    setSidebar: () => false,
    mobileOpen: false,
    setMobileOpen: () => false,
    currency: "USD", 
    setCurrency: () => {},
    currencySymbol: "₹", 
    setCurrencySymbol: () => {}
}

const StateContext = createContext<IstateContext>(initialState)

interface Childern {
    children: React.ReactNode
}

export const ContextProvider: React.FC<Childern> = ({ children }) => {
    const [sidebar, setSidebar] = useState<boolean>(false)
    const [mobileOpen, setMobileOpen] = useState<boolean>(false) 
    const [currency, setCurrency] = useState<string>("USD");
    const [currencySymbol, setCurrencySymbol] = useState<string>("₹");

    useEffect(() => {
        switch (currency) {
            case "USD":
                setCurrencySymbol("$")
                break;
            case "AED":
                setCurrencySymbol("د.إ")
                break;
            case "ARS":
                setCurrencySymbol("$")
                break;
            case "AUD":
                setCurrencySymbol("AU$")
                break;
            case "BGN":
                setCurrencySymbol("Лв")
                break;
            case "BRL":
                setCurrencySymbol("R$")
                break;
            case "BSD":
                setCurrencySymbol("B$")
                break;
            case "CAD":
                setCurrencySymbol("CA$")
                break;
            case "CHF":
                setCurrencySymbol("Fr")
                break;
            case "CLP":
                setCurrencySymbol("$")
                break;
            case "CNY":
                setCurrencySymbol("¥")
                break;
            case "COP":
                setCurrencySymbol("$")
                break;
            case "CZK":
                setCurrencySymbol("Kč")
                break;
            case "DKK":
                setCurrencySymbol("kr")
                break;
            case "DOP":
                setCurrencySymbol("RD$")
                break;
            case "EGP":
                setCurrencySymbol("E£ ")
                break;
            case "EUR":
                setCurrencySymbol("€")
                break;
            case "FJD":
                setCurrencySymbol("FJ$")
                break;
            case "GBP":
                setCurrencySymbol("£")
                break;
            case "GTQ":
                setCurrencySymbol("Q")
                break;
            case "HKD":
                setCurrencySymbol("HK$")
                break;
            case "HRK":
                setCurrencySymbol("Kn")
                break;
            case "HUF":
                setCurrencySymbol("Huf")
                break;
            case "IDR":
                setCurrencySymbol("Rp")
                break;
            case "ILS":
                setCurrencySymbol("₪")
                break;
            case "INR":
                setCurrencySymbol("₹")
                break;
            case "ISK":
                setCurrencySymbol("Kr")
                break;
            case "JPY":
                setCurrencySymbol("¥")
                break;
            case "KRW":
                setCurrencySymbol("₩")
                break;
            case "KZT":
                setCurrencySymbol("₸")
                break;
            case "MVR":
                setCurrencySymbol("Rf ")
                break;
            case "MXN":
                setCurrencySymbol("$")
                break;
            case "MYR":
                setCurrencySymbol("RM")
                break;
            case "NGN":
                setCurrencySymbol("₦")
                break;
            case "NOK":
                setCurrencySymbol("kr")
                break;
            case "NZD":
                setCurrencySymbol("NZ$")
                break;
            case "PAB":
                setCurrencySymbol("฿")
                break;
            case "PEN":
                setCurrencySymbol("S/")
                break;
            case "PHP":
                setCurrencySymbol("₱")
                break;
            case "PKR":
                setCurrencySymbol("₨")
                break;
            case "PLN":
                setCurrencySymbol("zł")
                break;
            case "PYG":
                setCurrencySymbol("₲")
                break;
            case "RON":
                setCurrencySymbol("lei")
                break;
            case "RUB":
                setCurrencySymbol("₽")
                break;
            case "SAR":
                setCurrencySymbol("ر.س")
                break;
            case "SEK":
                setCurrencySymbol("kr")
                break;
            case "SGD":
                setCurrencySymbol("S$")
                break;
            case "THB":
                setCurrencySymbol("฿")
                break;
            case "TRY":
                setCurrencySymbol("₺")
                break;
            case "TWD":
                setCurrencySymbol("NT$")
                break;
            case "UAH":
                setCurrencySymbol("₴")
                break;
            case "UYU":
                setCurrencySymbol("$U")
                break;
            case "ZAR":
                setCurrencySymbol("R")
                break;
            default:
                setCurrencySymbol("₦")
        }
    }, [currency]);
   
    return (
        <StateContext.Provider value={{
            sidebar, setSidebar, mobileOpen, setMobileOpen, currency, setCurrency, currencySymbol, setCurrencySymbol
        }}>
            {children}
        </StateContext.Provider>
    )
}
export const useContextState = () => useContext(StateContext)