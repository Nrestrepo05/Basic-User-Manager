import { Provider } from 'react-redux';
import ConfigureStore from '../store/configureStore';

const store = ConfigureStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
