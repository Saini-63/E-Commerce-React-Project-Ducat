import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormData } from '../../hooks/useFormData';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStart, loginUserStart } from '../../redux/actions/user.action';

export default function Login() {
    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [error, setError] = useState('');

    let [formData, , , inputChange] = useFormData({
        email: '',
        password: ''
    })

    let { email, password } = formData;

    useDispatch(() => {
        dispatch(getUserStart())
    }, [])
    const submit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                let currentUser = users.find((user) => user.uid === userCredential.user.uid)

                if (currentUser) {
                    dispatch(loginUserStart(currentUser))

                    setTimeout(() => {
                        navigate('/admin/dashboard')
                    }, 1000)
                } else {
                    setError("User not found")
                }
            })
            .catch((error) => {
                setError("Invalid email or password")
            });
    }

    useEffect(() => {
        dispatch(getUserStart());
    }, [users.length])

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Sign In</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active text-white">Sign In</li>
                </ol>
            </div>

            <div className="container">
                <div className="wrapper d-flex align-items-center justify-content-center h-100">
                    <div className="card login-form">
                        <div className="card-body">
                            <h5 className="card-title text-center">Login Form</h5>
                            <form onSubmit={submit}>
                                {error && <p className='text-danger text-center fw-bold'>{error}</p>}

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name='email'
                                        value={email}
                                        onChange={inputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name='password'
                                        value={password}
                                        onChange={inputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                                <div className="sign-up mt-4">
                                    Don't have an account? <Link to="/">Create One</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
