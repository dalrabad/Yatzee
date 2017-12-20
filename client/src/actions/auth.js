import axios from 'axios';

export const login = (email, password, history) => {
  return dispatch => {
    axios.post('/api/auth/sign_in', { email, password })
      .then( res => {
        dispatch({ type: 'LOGIN', user: res.data.data, headers: res.headers });
        history.push('/');
      })
  }
}

export const register = (email, password, passwordConfirmation, history) => {
  return dispatch => {
    axios.post('/api/auth', { email, password, passwordConfirmation })
      .then( res => {
        dispatch({ type: 'LOGIN', user: res.data.data, header: res.headers });
        history.push('/');
      })
  }
}

export const logout = (history) => {
  return dispatch => {
    axios.delete('/api/auth/sign_out')
      .then( res => {
        dispatch({ type: 'LOGOUT' });
      });
  }
}

export const validateToken = (callBack = () => {}) => {
  return dispatch => {
    dispatch({ type: 'VALIDATE' });
    const headers = axios.defaults.headers.common;
    axios.get('/api/auth/validate_token', headers)
      .then( res => {
        const user = res.data.data;
        dispatch({ type: 'LOGIN', user, headers: res.headers });
      })
      .catch( () => callBack());
  }
}