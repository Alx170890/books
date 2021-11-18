import BooksService from "../../services/BooksService";

const {
    Provider: BooksServiceProvider,
    Consumer: BooksServiceConsumer
} = createContext<BooksService | null>(null);

export {
    BooksServiceProvider,
    BooksServiceConsumer
}