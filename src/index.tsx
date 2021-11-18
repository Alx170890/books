import React from 'react';
import {store} from "./store";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import App from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import BooksService from "./services/BooksService";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry";
import {BooksServiceProvider} from "./components/BooksServiceContext/BooksServiceContext";

const booksService = new BooksService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <BooksServiceProvider value={booksService}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </BooksServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);