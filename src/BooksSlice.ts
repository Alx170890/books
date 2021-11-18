import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BookInterface} from "./components/BooksListItem/BooksListItem";
import {store} from "./store";
import BooksService from "./services/BooksService";
import type {CartItemInterface} from "./components/ShoppingCartTable/ShoppingCartTable";

export interface BooksInterface {
    books: BookInterface[];
    loading: boolean;
    error: any;
    cartItems: CartItemInterface[];
    orderTotal: number;
}

const initialState: BooksInterface = {
    books: [],
    loading: false,
    error: null,
    cartItems: [],
    orderTotal: 450,
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        FETCH_BOOKS_REQUEST: (state, action: PayloadAction<BookInterface[]>) => {
            state.books = action.payload;
        },
        FETCH_BOOKS_SUCCESS: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        FETCH_BOOKS_FAILURE: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        BOOKS_ADDED_TO_CART: (state, action: PayloadAction<CartItemInterface[]>) => {
            state.cartItems = action.payload;
        },
        BOOK_REMOVED_FROM_CART: (state, action: PayloadAction<CartItemInterface[]>) => {
            state.cartItems = action.payload;
        },
    },
});

export const {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    BOOKS_ADDED_TO_CART,
    BOOK_REMOVED_FROM_CART,
} = booksSlice.actions;

export default booksSlice.reducer;

const bookService = new BooksService();

export const fetchBooks = (): any => {
    bookService.getBooks()
        .then((data: BookInterface[]) => {
            if (data.length) {
                store.dispatch(FETCH_BOOKS_REQUEST(data));
            }
        })
        .catch(((error: any) => {
                store.dispatch(FETCH_BOOKS_FAILURE(error));
            }
        ));
}