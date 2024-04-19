import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useFormData } from '../../hooks/useFormData';
import { placeOrderStart } from '../../redux/actions/order.action';

const intialState = {
  name: "",
  email: "",
  companyName: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  contact: "",
}

export default function Checkout() {
  const currentCart = useSelector(state => state.cart.currentCart);
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [formData,,setFormData , inputChange, ] = useFormData(intialState, "");

  const { name, email, companyName, address,city,state, country, zipCode, contact} = formData

  useEffect(() => {
    if (!currentUser.name) {
      navigate('/login')
    }

    setFormData((prevValue) => ({
      ...prevValue,
      name: currentUser.name,
      email: currentUser.email,
      contact: currentUser.contact
    }))
  }, [])

  const submit = (event) => {
    event.preventDefault();
    
    let orderPlaced = {...currentCart, billingAddress: formData, placeOrder: true}

    dispatch(placeOrderStart(orderPlaced))

    setTimeout(() => {
      navigate("/thank-you")
    }, 1000)
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Checkout</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Billing details</h1>
          <form onSubmit={submit}>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                <div className="form-item">
                  <label className="form-label my-3">Name<sup>*</sup></label>
                  <input 
                    type="text" 
                    className="form-control"
                    name='name'
                    value={name}
                    onChange={inputChange} />
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Company Name<sup>*</sup></label>
                  <input 
                    type="text" 
                    className="form-control"
                    name='companyName'
                    value={companyName}
                    onChange={inputChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Address <sup>*</sup></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="House Number Street Name"
                    name='address'
                    value={address}
                    onChange={inputChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Town/City<sup>*</sup></label>
                  <input 
                    type="text" 
                    className="form-control"
                    name='city'
                    value={city}
                    onChange={inputChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">State<sup>*</sup></label>
                  <input 
                    type="text" 
                    className="form-control"
                    name='state'
                    value={state}
                    onChange={inputChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Country<sup>*</sup></label>
                  <input 
                    type="text" 
                    className="form-control"
                    name='country'
                    value={country}
                    onChange={inputChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                  <input 
                    type="text" 
                    className="form-control"
                    name='zipCode'
                    value={zipCode}
                    onChange={inputChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Mobile<sup>*</sup></label>
                  <input 
                    type="tel" 
                    className="form-control"
                    name='contact'
                    value={contact}
                    onChange={inputChange} />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">Email Address<sup>*</sup></label>
                  <input 
                    type="email" 
                    className="form-control"
                    name='email'
                    value={email}
                    onChange={inputChange} />
                </div>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentCart.items.length > 0 && currentCart.items.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">
                              <div className="d-flex align-items-center mt-2">
                                <img src={item.image} className="img-fluid rounded-circle" style={{
                                  width: "90px", height: "90px"
                                }} alt="" />
                              </div>
                            </th>
                            <td className="py-5">{item.name}</td>
                            <td className="py-5">${item.price}</td>
                            <td className="py-5">{item.purchaseQuantity}</td>
                            <td className="py-5">${+item.price * item.purchaseQuantity}</td>
                          </tr>
                        ))
                      }

                      <tr>
                        <th scope="row">
                        </th>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <p className="mb-0 text-dark py-3">Subtotal</p>
                        </td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${currentCart.subTotal}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                        </th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">Tax</p>
                        </td>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">$0.00</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                        </th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                        </td>
                        <td className="py-5"></td>
                        <td className="py-5"></td>
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">${currentCart.grandTotal}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input type="checkbox" className="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" value="Delivery" />
                      <label className="form-check-label" for="Delivery-1">Cash On Delivery</label>
                    </div>
                  </div>
                </div> */}

                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
