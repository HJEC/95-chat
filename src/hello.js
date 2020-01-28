import React from "react";
import Greetee from "./greetee";
import Changer from "./changer";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Kitty"
        };
    }
    render() {
        const name = this.state.name;
        return (
            <div
                style={{
                    color: "darkslategray",
                    fontFamily: "impact",
                    fontSize: "40px"
                }}
            >
                Hello,
                {name ? <Greetee name={name} age={2 * 50} /> : "Nobody!"}
                <div>
                    <Changer change={name => this.setState({ name })} />
                </div>
                !
            </div>
        );
    }
}
