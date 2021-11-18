import React, {Component} from 'react';
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

export default class ErrorBoundry extends Component<any, any> {
    state = {
        hasError: null
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return this.props.children;
    }
}