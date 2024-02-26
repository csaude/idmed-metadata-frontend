import axios, { Axios } from 'axios';
import UsersService from 'src/services/UsersService';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';
import { LocalStorage } from 'quasar';
import useNotify from 'src/composables/shared/notify/UseNotify';
// import { Notify } from 'quasar';

const { website } = useSystemUtils();
const { notifyError } = useNotify();

const instance = axios.create({
  baseURL: 'http://localhost:8888/api',
});
const numTries = 0;

// Função para fazer o logout
function logout() {
  localStorage.removeItem('authUser');
  localStorage.removeItem('user');
  localStorage.removeItem('username');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('password');
  // localStorage.removeItem('tokenExpiration');
  window.location.reload();
}

// Função para iniciar o temporizador
function fixNextTokenExpirationTime() {
  localStorage.setItem('tokenExpiration', String(Date.now() + 1200000)); // 20 minutos sem request
  // localStorage.setItem('tokenExpiration', String(Date.now() + 30000)); // 30 segundos sem request para teste
}

// Request interceptor for API calls
instance.interceptors.request.use(
  (request) => {
    const userloged = localStorage.getItem('user');
    request.headers = {
      Accept: 'application/json',
    };
    if (localStorage.getItem('id_token') != null) {
      //  const localuser = UsersService.getUserByUserName(String(userloged));

      request.headers['X-Auth-Token'] = [
        '',
        localStorage.getItem('id_token'),
      ].join(' ');
    } else {
      delete request.headers.Authorization;
    }
    delete request.headers.Authorization;
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);
// axios.interceptors.request.use(
//   (config) => {
//     config.headers = {
//       Accept: 'application/json',
//     };
//     console.log('Utilizador 2', userloged);
//     if (
//       config.url === '/province' ||
//       config.url === '/district' ||
//       config.url.includes('/clinic/district') ||
//       config.url === '/systemConfigs' ||
//       config.url === '/menu' ||
//       config.url.includes('/clinic/uuid')
//     ) {
//       delete config.headers.Authorization;
//     } else if (userloged != null) {
//       const localuser = UsersService.getUserByUserName(String(userloged));
//       config.headers['X-Auth-Token'] = [
//         '',
//         localuser.access_token,
//         // localStorage.getItem('id_token'),
//       ].join(' ');
//     } else {
//       delete config.headers.Authorization; // ["Authorization"]
//     }
//     return config;
//   },
//   (error) => {
//     console.log('Utilizador 3', userloged);
//     Promise.reject(error);
//   }
// );

// Response interceptor for API calls
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    // const rToken = localStorage.getItem('id_token')
    const rToken = localStorage.getItem('refresh_token');
    if (rToken != null && rToken.length > 10) {
      if (
        (error.response.status === 403 || error.response.status === 401) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        console.log(
          'http://localhost:8888/oauth/access_token?grant_type=refresh_token&refresh_token=' +
            rToken
        );

        return axios
          .post(
            'http://localhost:8888/oauth/access_token?grant_type=refresh_token&refresh_token=' +
              rToken
          )
          .then(({ data }) => {
            console.log(
              '==got the following token back: ' +
                data.access_token +
                '___________________________________________'
            );
            localStorage.setItem('id_token', data.access_token);
            localStorage.setItem('refresh_token', data.access_token);
            //  axios.defaults.headers.common['X-Auth-Token'] = data.access_token
            originalRequest.headers['X-Auth-Token'] = [
              '',
              localStorage.getItem('id_token'),
            ].join(' ');
            return axios(originalRequest);
          });
      }
    }
    return Promise.reject(error);
  }
);

export default () => {
  return instance;
};
