import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormData } from './../../hooks/useFormData';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUserStart } from '../../redux/actions/user.action';
import { auth } from '../../firebase-config.js';

const initialState = {
    name: '',
    email: '',
    password: '',
}

export default function Register() {

    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    let [formData, , , inputChange] = useFormData(initialState);

    let { name, email, password } = formData;


    const submit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            dispatch(addUserStart({ ...formData, uid: userCredential.user.uid }));

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
        catch (err) {
            //console.log("Signup Error" + error);
            setError("Email id already exist");
        }
    }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Sign Up</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Sign Up</li>
                </ol>
            </div>
            <div className="container">
                <div className="wrapper d-flex align-items-center justify-content-center h-100">
                    <div className="card login-form">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign Up </h5>
                            <form onSubmit={submit}>
                                {
                                    error && <p className='text-danger text-center fw-bold'>{error}</p>
                                }
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={inputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={inputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={inputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                                <div className="sign-up mt-4">
                                    Already have an account? <Link to="/login" style={{ float: "right" }} >Sign In</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
