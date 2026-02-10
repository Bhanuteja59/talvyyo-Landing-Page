import React, { useState } from 'react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3" aria-label="Talvyyo home">
                    <div className="h-9 w-9 rounded-xl bg-neutral-900 text-white grid place-items-center font-semibold">TY</div>
                    <div className="leading-tight">
                        <p className="text-sm font-semibold">Talvyyo</p>
                        <p className="text-xs text-neutral-500">Web • Apps • Branding • Growth</p>
                    </div>
                </a>

                <button
                    id="menuBtn"
                    className="md:hidden rounded-lg border px-2 py-1 text-sm"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobileNav"
                    aria-label="Open menu"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    Menu
                </button>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <a href="/" className="hover:text-neutral-700">Home</a>
                    <a href="/" className="hover:text-neutral-700">About</a>
                    <a href="/" className="hover:text-neutral-700">Services</a>
                    <a href="/" className="hover:text-neutral-700">Products</a>
                    <a href="/" className="hover:text-neutral-700">Work</a>
                    <a href="/" className="hover:text-neutral-700">Team</a>
                    <a href="/" className="hover:text-neutral-700">Careers</a>
                    <a href="/" className="hover:text-neutral-700">Offers</a>
                    <a href="/" className="hover:text-neutral-700">Contact</a>
                    <a href="/" className="rounded-2xl bg-blue-600 text-white px-3 py-1.5 font-medium hover:bg-blue-700">Get a Quote</a>
                </nav>
            </div>
            {/* Mobile nav */}
            <div id="mobileNav" className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} border-t border-neutral-200 bg-white`}>
                <nav className="mx-auto max-w-7xl px-4 py-3 grid gap-2 text-sm">
                    <a href="/" className="py-1">Home</a>
                    <a href="/" className="py-1">About</a>
                    <a href="/" className="py-1">Services</a>
                    <a href="/" className="py-1">Products</a>
                    <a href="/" className="py-1">Work</a>
                    <a href="/" className="py-1">Team</a>
                    <a href="/" className="py-1">Careers</a>
                    <a href="/" className="py-1">Offers</a>
                    <a href="/" className="py-1">Contact</a>
                    <a href="/" className="py-1 text-blue-700 font-medium">Get a Quote</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
