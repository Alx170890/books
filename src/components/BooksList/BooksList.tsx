import './BooksList.scss';
import React, {useEffect} from 'react';
import {useAppSelector} from "../../hooks";
import {fetchBooks} from "../../BooksSlice";
import BooksListItem, {BookInterface} from "../BooksListItem/BooksListItem";
import Spinner from "../Spinner/Spinner";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import {BOOKS_ADDED_TO_CART, BOOK_REMOVED_FROM_CART} from "../../BooksSlice";
import {store} from "../../store";
import type {CartItemInterface} from "../ShoppingCartTable/ShoppingCartTable";

interface BookListProps {
    books: BookInterface[];
    onAddedToCart: (bookId: number, quantity: number) => void;
}

export const updateCartItem = (item: CartItemInterface | undefined, book: BookInterface, quantity: number): CartItemInterface => {
    return item
        ? {
            ...item,
            count: item.count + quantity,
            total: item.total + quantity * book.price,
        }
        : {
            id: book.id,
            name: book.name,
            count: 0,
            total: 0,
        };
};

const updateCartItems = (cartItems: CartItemInterface[], newItem: CartItemInterface, itemIndex: number): CartItemInterface[] => {
    if (itemIndex < 0) {
        return [...cartItems, newItem];
    }

    if (newItem.count === 0) {
        return [...cartItems.slice(0, itemIndex), ...cartItems.slice(itemIndex + 1)];
    }

    return [...cartItems.slice(0, itemIndex), newItem, ...cartItems.slice(itemIndex + 1)];
};

export const onAddedToCart = (bookId: number, quantity: number): void => {
    const {cartItems, books} = store.getState().books;

    const book = books.find(book => book.id === bookId);
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === bookId);
    const item: CartItemInterface | undefined = cartItems[itemIndex];

    if (book) {
        const newItem = updateCartItem(item, book, quantity);

        quantity > 0
            ? store.dispatch(BOOKS_ADDED_TO_CART(updateCartItems(cartItems, newItem, itemIndex)))
            : store.dispatch(BOOK_REMOVED_FROM_CART(updateCartItems(cartItems, newItem, itemIndex)));
    }
}

const BooksList = ({books, onAddedToCart}: BookListProps): JSX.Element => {
    return (
        <ul className="book-list">
            {books.map((book: BookInterface) => {
                return (
                    <li key={book.id}>
                        <BooksListItem onAddedToCart={() => onAddedToCart(book.id, +1)} book={book}/>
                    </li>
                );
            })}
        </ul>
    );
};

export default function BooksListContainer(): JSX.Element {
    const data = useAppSelector((state) => state.books);

    useEffect(() => {
        fetchBooks();
    }, []);

    return <>
        {data.loading && <Spinner/>}
        {data.error !== null ? <ErrorIndicator/> : <BooksList books={data.books} onAddedToCart={onAddedToCart}/>}
    </>;
}