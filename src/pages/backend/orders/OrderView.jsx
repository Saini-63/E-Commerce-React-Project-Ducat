import React, { useEffect, useState } from 'react'
import Sidebar from '../../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function OrderView() {
  let [order, setOrder] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);

  const getOrderById = () => {
    let order = orders.find((order) => order.id === id);
    if (order) {
      setOrder(order);
    } else {
      navigate('/admin/order');
    }
  }

  useEffect(() => {
    if (!id) {
      navigate('/admin/order')
    }
    getOrderById(id);
  }, [id])
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">#{order.id} </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">#{order.id} </li>
        </ol>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card" >
              <div className="card-header d-flex justify-content-between">
                <h4 className='fw-bold'>#{order.id} </h4>
                <Link to="/admin/order" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <div>
                  <h5>Order Summary</h5>
                  <hr />
                  <p>Sub Total : ${order.subTotal}</p>
                  <hr />
                  <p>Sub Total : ${order.tax}</p>
                  <hr />
                  <p>Sub Total : ${order.grandTotal}</p>
                  <hr />
                </div>

                <div>
                  <h5>Products</h5>
                  <hr />
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        order.items?.length > 0 && order.items.map((product, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td><img src={product.image} alt="" style={{
                              height: "50px"
                            }} /></td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.purchaseQuantity}</td>
                            <td>{product.category}</td>
                            <td>{+product.price * product.purchaseQuantity}</td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
