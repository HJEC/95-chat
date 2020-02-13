import React from "react";
import Window from "./window";

export default function Info(props) {
    const infoComponent = (
        <div className="info_main">
            <h1 className="info_title">What is &apos;95-Chat?</h1>
            <p className="info_body">
                {`
                '95-chat is a love letter to Mac-OS 7. The greatest
                operating system of all time. `}
                <br />
                <br />

                <a
                    href="http://jamesfriend.com.au/pce-js/pce-js-apps/"
                    className="info_link"
                >
                    THIS LINK
                </a>
                {` will take you to an emulator running MAC os-7 in your browser, so you can compare!`}
                <br />
                <br />

                {`It was designed with the specific purpose of discovering what kind of product could be made after delivering excruciating attention to detail.
                It was manically developed using react-redux in just over 2
                weeks by a nostalgia nerd, permanently stuck in the 90's.`}
                <br />
                {`Thanks for coming. let's chat ;)`}
            </p>
            <p className="dev_credit">
                created by Henry J. E. Crookes &copy; - 2020
            </p>
        </div>
    );
    return (
        <Window
            compToRender={infoComponent}
            title="INFO"
            default={{ x: 450, y: 150, width: 400, height: 400 }}
            windowName="info"
        />
    );
}
// &apos;95-chat is a love letter to Mac-OS 7. The greatest
// operating system of all time.
// <a href="http://jamesfriend.com.au/pce-js/pce-js-apps/">
//     (THIS LINK
// </a>
// will take you to a running emulator of MAC os-7)
// <br />
// It was designed with the intent purpose of creating a product
// with excruciating attention to detail.
// <br />
// It was manically developed using react-redux in just over 2
// weeks by a nostalgia nerd, permanently stuck in the 90&apos;s.{" "}
// <br />
// <br />
// Thanks for coming. let&apos;s chat ;)
