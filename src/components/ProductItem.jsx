import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useCart } from '../hooks/useCart';
import { useNavigate } from "react-router-dom";
import { addCartStart } from '../redux/actions/cart.action';

export default function ProductItem({ product }) {
    const currentCart = useSelector(state => state.cart.currentCart);
    const currentUser = useSelector(state => state.user.currentUser)

    let [addCart] = useCart();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const addToCart = () => {
        if (!currentUser.name) {
            navigate('/login')
        }

        let response = addCart({...currentCart}, product, currentUser)
        
        dispatch(addCartStart(response))
    }


    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="rounded position-relative fruite-item">
                <Link to={`/product-details/${product.id}`}>
                    <div className="fruite-img">
                        <img src={product.image} className="img-fluid w-100 rounded-top" alt={product.name} />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>Fruits</div>
                </Link>
                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                    <Link to={`/product-details/${product.id}`}><h4>{product.name}</h4></Link>
                    <p>{product.shortDescription}</p>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                        <button
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                            onClick={addToCart}
                        ><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
