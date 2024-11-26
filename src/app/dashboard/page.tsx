"use client"
import "./welcome.css"
import Check from "../../../components.ts/Check";

export default function Home() {

    return (
       
            <div className="welcome-information">
                <div className="information-content">
                    <h3>Welcome John!</h3>
                    <p className="information-subtitle">We are delighted you're trying out Aura.</p>
                    <p>
                        We have 500+ companies worth of interviews and data for your investment analysis and research.

                        You will be able to:
                    </p>
                    <div className="information-list">
                        {
                            [
                                "Save  companies of your interest and see new entries",
                                "Use our AI tool to summarize interviews",
                                "Get exclusive data",
                                "Common questions",
                                "make reports"
                            ].map((text, i) => {
                                return (
                                    <li key={`information-item-${i}`}>
                                        <Check />
                                        <span className="fact">{text}</span>
                                    </li>
                                )
                            })
                        }
                    </div>
                    <button className="begin-button">Let's being!</button>
                </div>
                <img src="/guy-on-summit.svg" />
            </div>
    );
}
