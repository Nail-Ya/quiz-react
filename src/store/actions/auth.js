import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_ERROR
} from './actionTypes';
import axios from 'axios';

export function authActionCreator(email, password, isLogin) {
  return function (dispatch) {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = '';

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDs7PMIc1Bp2RWfMtuj9bomRxEx1IgayVA';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDs7PMIc1Bp2RWfMtuj9bomRxEx1IgayVA';
    }
    axios.post(url, authData)
      .then(res => {
        const data = res.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));
      })
      .catch(err => {
        dispatch(authError(err));
      })
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token: token
  }
}

export function authError(err) {
  return {
    type: AUTH_ERROR,
    error: err
  }
}

export function autoLogout(time) {
  return function(dispatch) {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  }
}

export function autoLoginActionCreator() {
  return function(dispatch) {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      // если expirationDate равно текущей дате, то это значит что токен уже потерял свое время жизни
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
