import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, refetch, index }) => {

    const { email, role } = user;
    const makeAdmin = () => {
        fetch(`https://fathomless-gorge-87844.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status === 403) {
                    toast.error('Failed to make an admin')
                }
                return res.json()})
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`SuccessFully Make an Admin`);
                }
            })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs btn-success">Make Admin</button>}</td>
            <td><button className="btn btn-xs text-white btn-error">Delete</button></td>
        </tr>
    );
};

export default UserRow;