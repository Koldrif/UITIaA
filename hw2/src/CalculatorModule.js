import React from "react";
import Key from "./presentational/key";
import Display from "./presentational/display";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "0",
            stack: [],
            last_op_stack: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.createKeys = this.createKeys.bind(this);
    }

    handleChange(val) {
        let newDisplay = this.state.display;
        let newStack = this.state.stack;
        let last_stack = this.state.last_op_stack

        let n = newStack.length;

        let numbers = "0123456789.";
        let operators = "+-/x";

        if (val === "C") {
            newDisplay = "0";
            newStack = [];
            last_stack = [];
        } else if (val === "=") {
            if (last_stack.length !== 0)
            {
                newDisplay = eval(last_stack.join("  ").replace(/x/gi, "*")).toString();
                last_stack[0] = eval(newDisplay.replace(/x/gi, "*"));
                console.log(`New state: \nDisplay: ${newDisplay}\nStack: ${newStack}\nlast_stack: ${last_stack}`);

                this.setState({ display: newDisplay, stack: newStack, last_op_stack: last_stack });
                return;
            }
            let tmp = eval(newDisplay.replace(/x/gi, "*"));
            newDisplay = eval(newDisplay.replace(/x/gi, "*")).toString();
            // let op = newStack[~1];
            // let lastNum = newStack[~2];
            // newStack = [tmp, op, lastNum];
            // newDisplay = newStack.join(" ");
            last_stack = newStack.slice();
            last_stack[0] = tmp;
            newStack = [];


        } else if (numbers.includes(val)) {
            last_stack = [];
            if (n % 2 === 0) {
                newStack.push(val);
            } else {
                newStack[n - 1] = newStack[n - 1] + val;
            }
            newDisplay = newStack.join(" ");
        } else if (operators.includes(val)) {
            if (last_stack.length !== 0)
            {
                newStack.push(parseInt(newDisplay));

            }
            newStack.push(val);
            newDisplay = newStack.join(" ");
        }
        console.log(`New state: \nDisplay: ${newDisplay}\nStack: ${newStack}\nlast_stack: ${last_stack}`);
        this.setState({ display: newDisplay, stack: newStack, last_op_stack: last_stack });
    }

    createKeys() {
        const keys = [
            "C",
            "()",
            "%",
            "/",
            "7",
            "8",
            "9",
            "x",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "+",
            "+/-",
            "0",
            ".",
            "="
        ];
        const res = keys.map(key => {
            return <Key value={key} onClick={this.handleChange} />;
        });
        return res;
    }

    render() {
        return (
            <div className="Calculator">
                <Display value={this.state.display} />
                {this.createKeys()}
            </div>
        );
    }
}