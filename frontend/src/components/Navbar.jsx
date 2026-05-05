import React from 'react'
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from '../stores/useUserStore';


const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";

	return (
		<header className='fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
				<div className='flex justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-emerald-400 flex items-center whitespace-nowrap'>
						E-Commerce
					</Link>

					<nav className='flex items-center gap-6'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out font-medium'
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out font-medium'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								<span className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'></span>
							</Link>
						)}
						{isAdmin && (
							<Link
								className='bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out font-medium'
                                onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out font-medium'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out font-medium'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;