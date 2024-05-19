// berisi konteks untuk mengambil state dan menerapkannya pada elemen yg dibungkusnya
// digunakan pada App.js untuk membungkus routes

import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setUser } from '../redux/actions/authActions';

// Membuat context untuk auth
const AuthContext = createContext();

// Fungsi komponen untuk memasok konteks auth ke dalam aplikasi
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Gunakan useEffect untuk memastikan pengguna disetel saat komponen dipasang
  useEffect(() => {
    // Periksa apakah ada token JWT di localStorage
    if (localStorage.jwt) {
      // Decode token
      const decode = jwt_decode(localStorage.jwt);
      // Dispatch aksi untuk mengatur pengguna
      dispatch(setUser(decode));
    }
  }, [dispatch]);

  const auth = useSelector((state) => state.auth);

  const user = {
    isConnected: !!auth?.user, // Set isConnected to true if user information is available
    role: auth?.user?.role || '',
    username: auth?.user?.user?.username || '',
    fullname: auth?.user?.user?.fullname || ''
  };

  // Menyediakan konteks auth ke komponen turunan
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

// Hook untuk menggunakan konteks auth di komponen-komponen aplikasi
export const useAuth = () => useContext(AuthContext);
