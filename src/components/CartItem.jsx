import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCart } from '../hooks/useCart';
import { addCartStart } from '../redux/actions/cart.action';

export default function CartItem({ item }) {
    const [quantity, setQuantity] = useState(item.purchaseQuantity)
    const currentCart = useSelector(state => state.cart.currentCart);

    const [, updateCart, deleteCart] = useCart()
    const dispatch = useDispatch();

    const incrementQuantity = () => {
        setQuantity(quantity + 1)

        let response = updateCart({ ...currentCart }, item, quantity + 1)
        dispatch(addCartStart(response))
    }

    const decrementQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)

            let response = updateCart({ ...currentCart }, item, quantity - 1)
            dispatch(addCartStart(response))
        }
    }

    const deleteItemFormCart = () => {
        let response = deleteCart({ ...currentCart }, item, quantity - 1)
        dispatch(addCartStart(response))
    }

    return (
        <tr>
            <th>
                <div className="d-flex align-items-center">
                    <img src={item.image} className="img-fluid me-5 rounded-circle" style={{
                        width: "80px", height: "80px"
                    }} alt={item.name} />
                </div>
            </th>
            <td>
                <p className="mb-0 mt-4">{item.name}</p>
            </td>
            <td>
                <p className="mb-0 mt-4">${item.price}</p>
            </td>
            <td>
                <div className="input-group quantity mt-4" style={{
                    width: "100px"
                }}>
                    <div className="input-group-btn">
                        <button
                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                            onClick={decrementQuantity} >
                            <i className="fa fa-minus"></i>
                        </button>
                    </div>
                    <input
                        type="text"
                        className="form-control form-control-sm text-center border-0"
                        value={quantity}
                        onChange={() => { }}
                        disabled />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                            onClick={incrementQuantity}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td>
                <p className="mb-0 mt-4">${+item.price * item.purchaseQuantity}</p>
            </td>
            <td>
                <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={deleteItemFormCart}>
                    <i className="fa fa-times text-danger"></i>
                </button>
            </td>
        </tr>
    )
}
