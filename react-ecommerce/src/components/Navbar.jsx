import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../config/Firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth); 

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("You've been logged out successfully.");
        } catch (err) {
            console.error(err); 
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        console.error("Firebase auth error", error);
        return <div>Error loading user information</div>; 
    }

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/marketplace" className="hover:text-gray-300">Marketplace</Link>
                    <Link to="/about" className="hover:text-gray-300">About</Link>
                </div>
                <div>
                    {!user ? (
                        <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Signup
                        </Link>
                    ) : (
                        <div className="flex items-center">
                            <span className="mr-4">{user.email}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
