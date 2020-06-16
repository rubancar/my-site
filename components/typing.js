import React from "react";
import Typed from 'typed.js'

class Typing extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        let my_words = ["Backend developer"]
        if(Array.isArray(this.props.words) && this.props.words.length > 0) {
            my_words = this.props.words
        }
        const options = {
            strings: my_words,
            typeSpeed: 40,
            backSpeed: 50,
            loop: true,
            cursorChar: "|",
        };
        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        // Please don't forget to cleanup animation layer
        this.typed.destroy();
    }

    render() {
        return (
            <>
                <span
                    style={{ whiteSpace: "pre" }}
                    ref={(el) => {
                        this.el = el;
                    }}
                />
            </>
        );
    }
}export default Typing;