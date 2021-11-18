import React from 'react';
import {BooksServiceConsumer} from "../BooksServiceContext/BooksServiceContext";

const withBooksService = (): ((Wrapped: any) => (props: any) => JSX.Element) => (Wrapped: any): ((props: any) => JSX.Element) => {
    return (props): JSX.Element => {
        return (
            <BooksServiceConsumer>
                {
                    (BooksService) => {
                        return <Wrapped {...props} BooksService={BooksService}/>
                    }
                }
            </BooksServiceConsumer>
        )
    }
}

export default withBooksService;