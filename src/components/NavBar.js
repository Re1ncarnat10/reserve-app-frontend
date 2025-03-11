"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { checkAdminStatus } from './api';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            setIsLoggedIn(token !== null);

            if (token) {
                checkAdminStatus()
                    .then(isAdmin => setIsAdmin(isAdmin))
                    .catch(error => console.error(error));
            }
        }
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            setIsAdmin(false);
            setIsLoggedIn(false);
            navigate.push('/');
            window.location.reload();
        }
    };

    return (
        <nav className=" p-4 shadow-md" style={{ backgroundColor: '#6D4C41' }}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="/" className="text-white text-lg font-semibold hover:text-blue-200">
                        Main Page
                    </Link>
                    <Link href="/resources" className="text-white text-lg font-semibold hover:text-blue-200">
                        Resources
                    </Link>
                    {isLoggedIn && (
                        <>
                            <Link href="/user/inventory" className="text-white text-lg font-semibold hover:text-blue-200">
                                Inventory
                            </Link>
                            <Link href="/user/me" className="text-white text-lg font-semibold hover:text-blue-200">
                                My Profile
                            </Link>
                        </>
                    )}
                    {isAdmin && (
                        <Link href="/admin/manage" className="text-white text-lg font-semibold hover:text-blue-200">
                            Manager Panel
                        </Link>
                    )}
                </div>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="text-white text-lg font-semibold hover:text-blue-200">
                        Logout
                    </button>
                ) : (
                    <Link href="/" className="text-white text-lg font-semibold hover:text-blue-200">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;