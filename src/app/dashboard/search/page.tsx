"use client"
import { Select } from "antd";
import "./search.css"
import Image from "next/image";
import { useEffect, useState } from "react";
import { on } from "events";
import { loaderEmitter } from "@/lib/events";

interface StockInterface {
    handle: string,
    commercialName: string,
}

const DebouncedSelect = () => {

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<StockInterface[] | []>([])
    const searchData = async () => {
        try {
            setLoading(true)
            const dataCall = await fetch(`/api/stocks`, { method: "POST", body: JSON.stringify({ query }) })
            if (dataCall.status !== 200) {
                return
            }
            const apiData: StockInterface[] = await dataCall.json()
            setData(apiData)
        } catch (error) {
            //log error
        } finally {
            setLoading(false)
        }
    }


    const handleInputChange = (event: any) => {
        setQuery(event)
    }

    useEffect(() => {

        loaderEmitter.emit("off")
        const timeOut = setTimeout(() => {
            if (query.length > 0) {
                searchData()
            }
        }, 500);

        return () => {
            clearTimeout(timeOut)
        }

    }, [query])

    return (
        <Select
            className="search-input"
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            key="options"
            filterOption={(input, option: any) => {
                const valueAndHandle = option.filterValue.toLowerCase()

                return valueAndHandle.includes(input.toLowerCase())
            }
            }
            loading={loading}
            options={data.map((stock, i) => {
                return {
                    value: stock.handle, label: <div className="stock-option">
                        <span className="select-handle">
                            {stock.handle}
                        </span>
                        <span className="select-name">
                            {stock.commercialName}
                        </span>
                    </div>,
                    filterValue: `${stock.handle} ${stock.commercialName}`
                }
            })}
            onSearch={handleInputChange}
        />
    )
};


export default function Home() {
    return (
        <div className="search-panel">
            <div className="searcher">
                <p className="search-title">
                    5,000+ companies with data and insight for you
                </p>
                <p className="search-subtitle">
                    Find the company you are interested in.
                    This will help us customize your experience.
                </p>
                <DebouncedSelect />
                <div className="popular-stocks">
                    {
                        [
                            {
                                commercialName: "Amazon",
                                handle: "amzn"
                            },
                            {
                                commercialName: "Microsoft",
                                handle: "msft"
                            },
                            {
                                commercialName: "Microsoft",
                                handle: "msft"
                            },
                            {
                                commercialName: "Elastic",
                                handle: "estc"
                            },
                            {
                                commercialName: "Unity Software",
                                handle: "u"
                            },
                            {
                                commercialName: "Carvana Co",
                                handle: "cvna"
                            },
                            {
                                commercialName: "EPAM Systems",
                                handle: "EPAM"
                            },
                            {
                                commercialName: "Warner Bros",
                                handle: "WBD"
                            },
                        ].map((stock: StockInterface, i: number) => {
                            return (
                                <div className="stock-pill" key={`stock-pill-${i}`}>
                                    <span className="handle">{stock.commercialName}</span>
                                    <span className="commercialName">{stock.commercialName}</span>
                                </div>
                            )
                        })
                    }
                    <span className="amount-saved">0 Companies saved</span>
                </div>
            </div>
            <Image src="/stock-graphic.svg" alt="Person searching stocks" width="400" height="400" />
        </div >
    );
}
