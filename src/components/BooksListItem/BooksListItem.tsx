import './BooksListItem.scss';
import React from 'react';

export interface BookInterface {
    id: number;
    name: string;
    author: string;
    price: number;
    coverImage: string;
}

export interface Props {
    book: BookInterface;
    onAddedToCart: () => void;
}

export default function BooksListItem({book, onAddedToCart}: Props): JSX.Element {
    const {name, author, price, coverImage} = book;
    return (
        <div className="book-list-item">
            <div className="book-cover">
                <img src={coverImage} alt="cover"/>
            </div>
            <div className="book-details">
                <a href="#" className="book-title">{name}</a>
                <div className="book-author">{author}</div>
                <div className="book-price">${price}</div>
                <button className="btn btn-info add-to-cart" onClick={onAddedToCart}>В корзину</button>
            </div>
        </div>
    )
}
