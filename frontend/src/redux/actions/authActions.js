import axios from 'axios';
import { ERRORS } from '../types';

export const LoginAction = (form, navigate) => (dispatch) => {
  axios
    .post('http://34.86.158.248:8080/auth/parent/signin', form)
    .then((res) => {
      console.log(res);
      const { token } = res.data;
      localStorage.setItem('jwt', token);
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data
      });
    });
};
