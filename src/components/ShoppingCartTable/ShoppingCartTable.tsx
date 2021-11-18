import './ShoppingCartTable.scss';
import React from 'react';
import {useAppSelector} from "../../hooks";
import {onAddedToCart} from "../BooksList/BooksList";
import {store} from "../../store";

export interface CartItemInterface {
    id: number;
    name: string;
    count: number;
    total: number;
}

const onDelete = (id: number): void => {
    const item = store.getState().books.cartItems.find(caretItem => caretItem.id === id);
    item && onAddedToCart(id, -item.count)
}

export default function ShoppingCartTable(): JSX.Element {
    const data = useAppSelector((state) => state.books);

    const renderRow = (item: CartItemInterface, index: number): JSX.Element => {
        const {id, name, count, total} = item;
        return (
            <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{count}</td>
                <td>${total}</td>
                <td>
                    <button className="btn btn-outline-danger btn-sm float-right"
                            onClick={() => onDelete(id)}>
                        <i className="fa fa-trash-o"/>
                    </button>
                    <button className="btn btn-outline-success btn-sm float-right"
                            onClick={() => onAddedToCart(id, +1)}>
                        <i className="fa fa-plus-circle"/>
                    </button>
                    <button className="btn btn-outline-warning btn-sm float-right"
                            onClick={() => onAddedToCart(id, -1)}>
                        <i className="fa fa-minus-circle"/>
                    </button>
                </td>
            </tr>
        );
    }
    return (
        <div className="shopping-cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {data.cartItems.map((item: CartItemInterface, index: number) => renderRow(item, index))}
                </tbody>
            </table>

            <div className="total">
                Total: ${data.orderTotal}
            </div>
        </div>
    );
};