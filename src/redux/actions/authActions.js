import axios from 'axios';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';
import { ERRORS, SET_USER } from '../types';
import { setAuth } from '../../utils/setAuth';

export const LoginAction = (form, role) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}auth/${role}/signin`, form)
    .then((res) => {
      // console.log(res);
      const { token, user } = res.data;
      localStorage.setItem('jwt', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('fullname', user.fullname);

      if (user.profilePicture) {
        localStorage.setItem('profilePicture', user.profilePicture);
      }

      const decode = jwt_decode(token);
      // console.log(decode);
      dispatch(setUser(decode));
      // navigate('/beranda/orangtua/v2');

      let newRole = '';
      if (role === 'parent') {
        newRole = 'orangtua';
      } else if (role === 'child') {
        newRole = 'anak';
      }

      // navigate(`/beranda/orangtua`);

      window.location.href = `/beranda/${newRole}`;

      console.log(form);
    })
    .catch((err) => {
      // dispatch({
      //   type: ERRORS,
      //   payload: err.response.data
      // });
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    });
};

export const LogoutAction = () => (dispatch) => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('username');
  localStorage.removeItem('fullname');
  dispatch({
    type: SET_USER,
    payload: {}
  });
  window.location.href = `/`;
};

export const setUser = (decode) => ({
  type: SET_USER,
  payload: decode
});
