import './Header.scss';
import React from "react";

interface Props {
    numItems: number;
    total: number;
}

export default function Header({numItems, total}: Props): JSX.Element {
    return (
        <header className="header">
            <a className="logo text-dark" href="/">ReStore</a>
            <a className="shopping-cart" href="cart">
                <i className="cart-icon fa fa-shopping-cart"/>
                {numItems} items (${total})
            </a>
        </header>
    );
};