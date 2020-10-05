import React, { useEffect, useState } from "react";
import TypeIt from "typeit-react";
import axios from "../axios";
const ascii95 = require("../../public/ascii95");
const ascii_chat = require("../../public/ascii_chat");

export default function IntroText({ changeIntro }) {
    const [widthHeight, setWidthHeight] = useState("1920 x 1080");
    const [location, setLocation] = useState();
    const [ascii, setAscii] = useState(false);
    const [chat, setChat] = useState(false);
    let dateText = new Date();
    const fillText = string => {
        return `<span id="filled_text">${string}</span>`;
    };

    useEffect(() => {
        setWidthHeight(window.screen.width + " x " + window.screen.height);
        axios
            .get("/find-ip")
            .then(({ data }) => {
                setLocation(data);
            })
            .catch(err => setLocation("a n o n y m o u s."));
    }, []);
    return (
        <div className="intro_text_wrapper">
            {location && (
                <TypeIt
                    id="typeIt"
                    options={{
                        speed: 7,
                        lifeLike: false,
                        cursor: true,
                        html: true
                    }}
                    getBeforeInit={instance => {
                        instance
                            .type("PREBOOT... <br /> <br/>", { speed: 10 })
                            .type(
                                "Video initializing... OSD_LAYER_INIT <br/>",
                                {
                                    speed: 15
                                }
                            )
                            .type(`video size is...`, { speed: 20, delay: 500 })
                            .type(fillText(widthHeight), { delay: 600 })
                            .options({ speed: 4 })
                            .break()
                            .type(
                                "LCD SCREEN clear... hdmi tx power init <br/>"
                            )
                            .type("mode - 4 ..  vic = 21 <br/>")
                            .type("CONFIG HPLL <br/><br/>")
                            .type("reboot_mode=charging <br/> <br/>")
                            .type("system platform is... ", {
                                speed: 15,
                                delay: 400
                            })
                            .type(fillText(window.navigator.platform))
                            .break()
                            .type("system browser allocated: ", {
                                speed: 10,
                                delay: 300
                            })
                            .type(fillText(window.navigator.appName), {
                                speed: 10
                            })
                            .break()
                            .type("UNIX time is:" + Date.now() + "<br/>")
                            .type("LOCALE time is: ", { speed: 10, delay: 300 })
                            .type(
                                fillText(
                                    dateText.toLocaleTimeString() +
                                        " " +
                                        fillText(
                                            dateText
                                                .toLocaleDateString()
                                                .slice(0, 6) + "1995"
                                        )
                                )
                            )
                            .break()
                            .type("Fetching location  ")
                            .type(" ....", {
                                speed: 200,
                                delay: 300,
                                cursor: false
                            })
                            .delete(5)
                            .type(" ....", {
                                speed: 200,
                                delay: 300,
                                cursor: false
                            })
                            .delete(5, { delay: 200 })
                            .type("<br/> <br />")
                            .type(fillText(location.country + "<br/>"), {
                                speed: 50
                            })
                            .type(
                                fillText(
                                    `${location.city} ${location.region} ${location.zip} <br/>`
                                )
                            )
                            .type(`${location.lat} : ${location.lon} <br />`)
                            .type(
                                `query: ${location.query} <br /> status: OK`,
                                { delay: 800 }
                            )
                            .empty()
                            .exec(() => {
                                setAscii(true),
                                    setLocation(false),
                                    setTimeout(() => {
                                        setChat(true);
                                    }, 5000);
                            });
                        return instance;
                    }}
                ></TypeIt>
            )}
            {ascii && (
                <div>
                    <TypeIt
                        id="typeIt"
                        options={{
                            speed: 15,
                            lifeLike: false,
                            cursor: false,
                            html: true
                        }}
                        getBeforeInit={instance => {
                            instance.type(
                                "Welcome to: <br /> <br/> <br/> <br/>"
                            );
                            return instance;
                        }}
                    ></TypeIt>

                    <TypeIt
                        id="ascii"
                        options={{
                            speed: 1,
                            lifeLike: false,
                            cursor: false,
                            html: true,
                            nextStringDelay: 1
                        }}
                        getBeforeInit={instance => {
                            instance.type(ascii95);
                            return instance;
                        }}
                    ></TypeIt>
                    {chat && (
                        <TypeIt
                            id="ascii"
                            options={{
                                speed: 1,
                                lifeLike: false,
                                cursor: false,
                                html: true,
                                nextStringDelay: 1
                            }}
                            getBeforeInit={instance => {
                                instance
                                    .type(ascii_chat)
                                    .pause(2000)
                                    .exec(async () => changeIntro());
                                return instance;
                            }}
                        ></TypeIt>
                    )}
                </div>
            )}
        </div>
    );
}
