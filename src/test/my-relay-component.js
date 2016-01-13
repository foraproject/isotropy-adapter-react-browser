import React from "react";

class MyComponent extends React.Component {
    componentDidMount() {
        window.onDataLoad();
    }

    render() {
        return <div>Hello {this.props.ship ? this.props.ship.name : this.props.name}</div>;
    }
}

export default MyComponent;
