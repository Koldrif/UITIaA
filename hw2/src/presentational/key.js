import React from "react";

export default class Key extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick(this.props.value);
        event.preventDefault();
    }

    render() {
        return <button onClick={this.handleClick}>{this.props.value}</button>;
    }
}