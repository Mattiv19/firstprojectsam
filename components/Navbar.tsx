'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'How it works', href: '/#how-it-works' },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'About Us', href: '/#about' },
    ];

    return (
        <nav className="fixed w-full backdrop-blur-lg bg-black/[0.08] border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-black">
                            {/* Replace with your logo */}
                            <span className="text-xl font-bold">WealthStack</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                            Sign up
                        </button>
                        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                            Log in
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-600"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-4 space-y-2">
                                <button className="w-full text-gray-900 hover:text-gray-600 px-3 py-2 text-base font-medium">
                                    Sign up
                                </button>
                                <button className="w-full bg-white text-black px-4 py-2 rounded-full text-base font-medium hover:bg-gray-100">
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;