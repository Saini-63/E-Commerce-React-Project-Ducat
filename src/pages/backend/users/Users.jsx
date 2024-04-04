import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserStart, getUserStart } from '../../../redux/actions/user.action';

export default function Users() {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUserStart());
  }, [users.length])

  const deleteUser = (user) => {
    dispatch(deleteUserStart(user));
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Users</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Users</li>
        </ol>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className='fw-bold'>Users</h4>
                <Link to="/admin/user/create" className='btn btn-primary text-white button'>Add User</Link>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.length > 0 && users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td><img src={user.image} alt="no data  " style={{ height: "50px" }} /></td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.contact}</td>
                          <td>{user.status === '1' ? 'Active' : "InActive"}</td>
                          <td>
                            <Link to={`/admin/user/edit/${user.id}`} className='btn btn-warning btn-sm me-2'>Edit</Link>
                            <button className='btn btn-danger btn-sm me-2' onClick={() => deleteUser(user)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
