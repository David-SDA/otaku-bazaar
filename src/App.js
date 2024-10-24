import { Route, Routes } from 'react-router-dom';
import Accueil from './components/pages/Accueil';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Header from './components/Header';
import Wishlist from './components/pages/Wishlist';
import Contact from './components/pages/Contact';
import Search from './components/pages/Search';

export default function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Accueil />} />
				<Route path='/search' element={<Search />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/wishlist' element={<Wishlist />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</>
	);
}
