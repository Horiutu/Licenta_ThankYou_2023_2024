import "react-native-gesture-handler";
import Navigation from "./navigation/navigation";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from "./components/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AuthProvider>
  );
}
