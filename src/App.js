import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Wishlist from './components/pages/Wishlist';
import Contact from './components/pages/Contact';
import Terms from './components/pages/legal/Terms';
import Privacy from './components/pages/legal/Privacy';
import Security from './components/pages/legal/Security';
import Footer from './components/Footer';

export default function App() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='container mx-auto my-5 px-4 flex-grow'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Search />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/wishlist' element={<Wishlist />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/terms' element={<Terms />} />
					<Route path='/privacy' element={<Privacy />} />
					<Route path='/security' element={<Security />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}
