import { Route, Routes } from 'react-router-dom';
import Accueil from './components/pages/Accueil';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Header from './components/Header';

export default function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Accueil />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</>
	);
}
