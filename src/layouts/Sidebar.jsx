import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logoutUserStart } from '../redux/actions/user.action';

export default function Sidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUserStart());
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    return (
        <ul className="list-group">
            <li className="list-group-item active" aria-current="true">Sidebar</li>
            <li className="list-group-item"><Link to='/admin/dashboard'>Dashboard</Link></li>
            <li className="list-group-item">Order</li>
            <li className="list-group-item"><Link to='/admin/catgory'>Category</Link></li>
            <li className="list-group-item"><Link to='/admin/product'>Product</Link></li>
            <li className="list-group-item"><Link to='/admin/user'>User</Link></li>
            <li className="list-group-item"><Link onClick={logout}>Log Out</Link></li>
        </ul>
    )
}
