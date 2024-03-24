import { Provider } from 'react-redux';
import './App.css';
import AppLayout from './components/layout/AppLayout';
import { store } from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<AppLayout />
		</Provider>
	);
}

export default App;
