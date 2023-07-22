import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  return (
    <div className="column">
      <h1 className="title mt-4 is-2">Daftar Pegawai</h1>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th className="is-dark">No</th>
              <th className="is-dark">Nama</th>
              <th className="is-dark">Sisa Cuti</th>
              <th className="is-dark">Email</th>
              <th className="is-dark">Peran</th>
              <th className="is-dark">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.restCuti}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <NavLink to={`/users/edit/${user.uuid}`} className="button is-small is-primary">
                    Edit profil
                  </NavLink>
                  <NavLink to={`/users/inputcuti/${user.uuid}`} className="button is-small is-info">
                    Input cuti
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
