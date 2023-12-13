// import { wrapper } from '@/store';
import '@/styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default wrapper.withRedux(MyApp);

import store from '@/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;