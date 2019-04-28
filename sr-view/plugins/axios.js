import Cookies from 'js-cookie';

export default function({ $axios }) {
  $axios.onRequest(config => {
    const jwt = Cookies.get('sr.auth.token');
    if (jwt != null) {
      config.headers.common.Authorization = jwt;
    }
  });
}
