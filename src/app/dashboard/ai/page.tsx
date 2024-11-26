"use client"
import { FiRefreshCw } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { LuThumbsUp } from "react-icons/lu";
import { LuThumbsDown } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";
import { loaderEmitter } from "@/lib/events";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import "./ai.css"
import { useRouter } from "next/navigation";
import Loader from "../../../../components.ts/Loader";
const Segment = (props: any) => {

    const { question, text, key } = props

    return (
        <div className="segment" key={key}>
            <div className="prompt">
                <h2 className="query">{question}</h2>
                <p className="response">
                    {text ?? <Loader className="loader black" />}
                </p>
                <div className="actions">
                    <div className="action-set">
                        <FiRefreshCw className="clickable" />
                    </div>
                    <div className="action-set">
                        <FaRegStar className="clickable" />
                    </div>
                    <div className="action-set">
                        <IoDocumentText className="clickable" />
                        <FaFileAlt className="clickable" />
                    </div>
                    <div className="action-set">
                        <LuThumbsUp className="clickable" />
                        <LuThumbsDown className="clickable" />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function Home() {
    useEffect(() => {
        loaderEmitter.emit("off")
    }, [])
    const [content, setContent]: any = useState([])
    const [disabled, setDisabled]: any = useState(false)
    const promptRef = useRef(null)
    const submit = async () => {
        const el: any = promptRef.current
        const query = el.value
        if (query.length < 1) {
            return
        }
        setDisabled(true)
        el.value = ""
        setContent([...content].concat([{ text: undefined, question: query }]))
        const aiCall = await fetch("/api/ai", { method: "POST", body: JSON.stringify({ content: query }) })
        const aiData = await aiCall.json()
        if (aiCall.status === 200) {
            setContent([...content.filter((x: any) => x !== null)].concat(aiData))
        }
        setDisabled(false)
    }

    const checkSubmit = (e: any) => {
        try {
            if (e.key === "Enter") {
                submit()
            }
        } catch (error) {
            // implement logger
        }
    }

    const router = useRouter()
    return (

        <div className="ai-panel">
            <div className="ai-header">
                <div className="ai-return">
                    <IoChevronBack className="clickable" onClick={() => router.push("/dashboard")} />
                    <p>
                        Return
                    </p>
                </div>
                <h1 className="ai-title">Aura Ai</h1>
            </div>
            <div className="segments">
                {
                    content.map((item: any, i: number) => {
                        return (
                            <Segment text={item.text} question={item.question} key={`prompt-${i}`} />
                        )
                    })
                }
            </div>
            <div id="prompt-box">
                <input disabled={disabled} ref={promptRef} onKeyDown={checkSubmit} placeholder={disabled ? "Thinking..." : "Hi, I’m Aura, you AI Assistant. Tell me, what question do you have?"} />
            </div>
        </div>
    );
}
