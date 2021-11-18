import React from 'react';
import BooksList from "../BooksList/BooksList";
import ShoppingCartTable from "../ShoppingCartTable/ShoppingCartTable";

export default function HomePage(): JSX.Element {
    return (
        <div>
            <BooksList/>
            <ShoppingCartTable/>
        </div>
    );
}