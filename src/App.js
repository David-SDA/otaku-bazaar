import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Wishlist from './components/pages/Wishlist';
import Contact from './components/pages/Contact';
import Terms from './components/pages/legal/Terms';
import Privacy from './components/pages/legal/Privacy';
import Security from './components/pages/legal/Security';
import NotFound from './components/pages/errors/NotFound';
import Footer from './components/layout/Footer';

export default function App() {
	return (
		<div className='bg-[#f4f6ee] text-neutral-800 flex flex-col min-h-screen'>
			<Header />
			<main className='container mx-auto my-5 px-4 '>
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
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}
