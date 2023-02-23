import axios from "axios";
import useSWR from "swr";
import { useState, useContext, useEffect } from "react";
import { Line, Doughnut, Chart } from "react-chartjs-2";
// import { CircularProgress } from '@mui/material';
import 'chart.js/auto'
import { useContextState } from "../context/context";
import SelectButton from "./SelectButton";
import Loading from "./Loading";

const CryptoInfo = ({ coinId }:any) => {

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Crypto Price',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                pointRadius: 0
            }
        ]
    });

    const [days, setDays] = useState(1);
    const { currency } = useContextState()

    const HistoricalChart = () => `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;

    const fetcher = (url:string) => axios.get(url).then(res => res.data)

    const { data, error } = useSWR(HistoricalChart, fetcher)

    const cryptoData: [] = data && data.prices;

    const chartDays = [
        {
            label: "24H",
            value: 1,
        },
        {
            label: "7days",
            value: 7,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        },
    ];

    // Determine the direction of change for each data point
    const borderColor = cryptoData?.map((datapoint:any, index:any) => {
        if (index === 0) {
            // For the first data point, use black border
            return 'black';
        } else if (datapoint[1] > cryptoData[index - 1][1]) {
            // If the value is higher than the previous data point, use green border
            return 'green';
        } else {
            // If the value is lower than the previous data point, use red border
            return 'red';
        }
    });

    return (
        <div className="w-[100%] mt-2 lg:px-10">
            <div className="w-inherit h-inherit flex flex-col">
                {cryptoData ? (
                    <>
                        <Line
                            data={{
                                labels: cryptoData.map((coin: number[]) => days === 1 ? new Date(coin[0]).toLocaleTimeString() : new Date(coin[0]).toLocaleDateString()),

                                datasets: [
                                    {
                                        label: 'Crypto Price',
                                        data: cryptoData.map((coin: number[]) => new Date(coin[1])),
                                        fill: false,
                                        borderColor: borderColor,
                                        borderWidth: 2,
                                        tension: 0.1,
                                        pointRadius: 1,
                                        
                                        // gridLines:false
                                    },
                                ],
                            }}
                            
                        />
                        <div className="flex bg-gray-200 rounded-lg w-[80%] mt-1 ml-20">

                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => {
                                        setDays(day.value);
                                    }}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    )
};

export default CryptoInfo;