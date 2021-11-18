import {FETCH_BOOKS_SUCCESS} from "../BooksSlice";
import {store} from "../store";
import {BookInterface} from "../components/BooksListItem/BooksListItem";

export default class BooksService {
    data = [
        {
            id: 1,
            name: 'Production-Ready Microservices',
            author: 'Susan J. Fowler',
            price: 32,
            coverImage: 'https://images-na.ssl-images-amazon.com/images/I/41yJ75gpV-L._SX381_BO1,204,203,200_.jpg'},
        {
            id: 2,
            name: 'Release It!',
            author: 'Michael T. Nygard',
            price: 45,
            coverImage: 'https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg'}
    ];

    getBooks(): Promise<BookInterface[]> {
        return new Promise((resolve, reject) => {
            store.dispatch(FETCH_BOOKS_SUCCESS(true));

            setTimeout(() => {
                resolve(this.data);
                // reject(new Error('error'));
                store.dispatch(FETCH_BOOKS_SUCCESS(false));
            }, 700);
        })
    }
}