import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../../layouts/Sidebar'
import { useDispatch } from 'react-redux';
import { addCategoryStart } from '../../../redux/actions/category.action';

let initialState = {
  name: '',
  image: '',
  status: 0
}
export default function AddOrEditCategory() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { name, status } = formData;

  const inputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const submit = (event) => {
    event.preventDefault();
    dispatch(addCategoryStart(formData))

    setTimeout(() => {
      navigate('/admin/category');
    }, 1000);
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Add Category</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Category</li>
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
                <h4 className='fw-bold'>Add Category</h4>
                <Link to="/admin/category" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input type="text" className="form-control" id="name"
                      placeholder="category name"
                      name='name'
                      value={name}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Category Image</label>
                    <input type="file" className="form-control" id="image" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Category Status</label>
                    <select id='status'
                      className='form-control'
                      name='status'
                      value={status}
                      onChange={inputChange}>
                      <option value='' hidden>Select Status</option>
                      <option value='0'>Inactive</option>
                      <option value='1'>Active</option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 d-grid">
                      <button type='submit' className='btn btn-primary text-white'>Submit</button>
                    </div>
                    <div className="col-sm-6 d-grid">
                      <button type='reset' className='btn btn-warning text-white'>Reset</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
