"use client"
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import "./layout.css"
import Link from "next/link";

import Loader from "../../../components.ts/Loader";
import { useState } from "react";
import { loaderEmitter } from "@/lib/events";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [loading, setLoading] = useState(false)

    const load = () => {
        setLoading(false)
    }
    loaderEmitter.on("off", () => {
        setLoading(false)
    })
    return (
        <div className="dashboard-layout">
            <div className="navigation">
                <div className="main-nav">
                    <Image style={{ marginBottom: "72px" }} height="64" width="90" src="../logo.svg" alt="logo" />
                    <div className="image-icons">
                        <LuImage />
                        <LuImage />
                        <LuImage />
                    </div>
                </div>
                <div className="secondary-nav">
                    <div className="image-icons">
                        <LuImage />
                        <LuImage />
                        <LuImage />
                    </div>
                </div>
            </div>
            <div className="panel">
                <div className="welcome">
                    <div className="hero">
                        <h1 className="hero-title">AURA</h1>
                        <h2 className="hero-subtitle">Augmented Universal Research Asistant</h2>
                        <p>Your in one single intuitive platform along side with your team.</p>
                        <div className="hero-cards">
                            <Link href={"/dashboard/search"} >
                                <div className="hero-card" onClick={load}>
                                    <Image width={120} height={120} alt="Folders with files" src="/folders-graphic.svg" />
                                    <h3>Search Data</h3>
                                </div>
                            </Link>
                            <Link href={"/dashboard/data"} >
                                <div className="hero-card" onClick={load}>
                                    <Image width={120} height={120} alt="Man storing files" src="/store-files-graphic.svg" />
                                    <h3>Upload you Data</h3>
                                </div>
                            </Link>
                            <Link href={"/dashboard/ai"}>
                                <div className="hero-card" onClick={load}>
                                    <Image width={120} height={120} alt="Intelligent Humanoid Robot" src="/ai-graphic.svg" />
                                    <h3>Try our AI Tool</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {
                        loading
                            ? <div className="waiting">
                                <p>Loading</p>
                                <Loader className="loader black" />
                            </div>
                            : children

                    }
                </div>
            </div>
        </div>
    );
}
