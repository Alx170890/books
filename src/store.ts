import {configureStore} from '@reduxjs/toolkit';
import booksSlicerReduces from "./BooksSlice";

export const store = configureStore({
    reducer: {
        books: booksSlicerReduces,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
