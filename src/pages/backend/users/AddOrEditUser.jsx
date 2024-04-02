import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormData } from '../../../hooks/useFormData';
import Sidebar from '../../../layouts/Sidebar';
import { addUserStart, updateUserStart } from '../../../redux/actions/user.action';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase-config';


const initialState = {
  name: '',
  email: '',
  password: '',
  contact: '',
  image: '',
  status: '0',
}

export default function AddOrEditUser() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.user.users);

  const [formData, imageLoading, setFormData, inputChange, uploadFiles] = useFormData(initialState, "user");

  let { name, email, password, contact, image, status } = formData;

  const submit = async (event) => {
    event.preventDefault();
    //console.log(formData);
    if (id) {
      dispatch(updateUserStart(formData));
    }
    else {

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

        dispatch(addUserStart({ ...formData, uid: userCredential.user.uid }));
      }
      catch (error) {
        console.log("Signup Error" + error);
      }
    }

    setTimeout(() => {
      navigate('/admin/user');
    }, 2000);

  }

  const getUserById = () => {
    let user = users.find((user) => user.id === id)

    if (user) {
      setFormData(user);
    }
    else {
      navigate('/admin/user');
    }

  }

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id])

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">{id ? 'Edit' : 'Add'} User</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">{id ? 'Edit' : 'Add'} User</li>
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
                <h4 className='fw-bold'>{id ? 'Edit' : 'Add'} User</h4>
                <Link to="/admin/user" className='btn btn-primary text-white button'>Back</Link>
              </div>
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="name"
                      placeholder="Enter User Name"
                      name='name'
                      value={name}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">User Email</label>
                    <input type="email" className="form-control" id="email"
                      placeholder="Enter Email"
                      name='email'
                      value={email}
                      onChange={inputChange} />
                  </div>
                  {
                    !id && <div className="mb-3">
                      <label htmlFor="password" className="form-label">User Password</label>
                      <input type="password" className="form-control" id="password"
                        placeholder="Enter Password"
                        name='password'
                        value={password}
                        onChange={inputChange}
                      />
                    </div>
                  }
                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">User Contact Number</label>
                    <input type="text" className="form-control" id="contact"
                      placeholder="Enter Contact Number"
                      name='contact'
                      value={contact}
                      onChange={inputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Product Image</label>
                    <input type="file" className="form-control" id="image" onChange={uploadFiles} />
                    {
                      image && <div className='mt-4'>
                        <img src={image} alt='Not in database of firebase' style={{ height: "50px" }} />
                      </div>
                    }
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Product Status</label>
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
                      <button type='submit' className='btn btn-primary text-white' disabled={imageLoading}>Submit</button>
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
