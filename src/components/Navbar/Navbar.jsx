import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { ShoppingCart, UserCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar la apertura del menú desplegable

    const logout = () => {
        localStorage.clear('users');
        navigate("/login");
    };

    const cartItems = useSelector((state) => state.cart);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5">
            <li>
                <Link to={'/'}>Inicio</Link>
            </li>
            <li>
                <Link to={'/allproduct'}>Productos</Link>
            </li>
            {!user && (
                <>
                    <li>
                        <Link to={'/signup'}>Registrarme</Link>
                    </li>
                    <li>
                        <Link to={'/login'}>Iniciar</Link>
                    </li>
                </>
            )}

            <li className="relative">
                <Link to={'/cart'} className="flex items-center">
                    <span className="relative">
                        <ShoppingCart />
                        {cartItems.length > 0 && (
                            <span className="bg-white rounded-full px-2 py-1 text-red-500 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                                {cartItems.length}
                            </span>
                        )}
                    </span>
                </Link>
            </li>

            {user && (
                <li className="relative">
                    <span className="flex items-center cursor-pointer ml-10" onClick={toggleDropdown}>
                        <UserCircle />
                        <ChevronDown className="ml-1" />
                    </span>
                    {dropdownOpen && (
                        <ul className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg py-1">
                            {user.role === 'admin' && (
                                <li>
                                    <Link to={'/admin-dashboard'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Panel Admin
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button onClick={logout} className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200">
                                    Salir
                                </button>
                            </li>
                            {user.role === 'user' && (
                                <li>
                                    <Link to={'/user-dashboard'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Usuario
                                    </Link>
                                </li>
                            )}
                        </ul>
                    )}
                </li>
            )}

        </ul>
    );

    return (
        <nav className="bg-red-600 sticky top-0">
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl text-center">A-Maniacos</h2>
                    </Link>
                </div>
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
