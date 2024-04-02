import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
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
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                                <div className="sign-up mt-4">
                                    Don't have an account? <Link to="/register">Create One</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
