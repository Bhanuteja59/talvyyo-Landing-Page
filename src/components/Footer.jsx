import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-black text-neutral-300">
            <div className="mx-auto max-w-7xl px-4 py-14">
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <a href="/" className="inline-flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white grid place-items-center font-semibold text-lg shadow-lg">
                                TY
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg">Talvyyo</p>
                                <p className="text-xs text-neutral-400 font-medium">Web • Apps • Branding • Growth</p>
                            </div>
                        </a>
                        <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-xs">
                            We are a design-led, development-strong studio helping startups and businesses build powerful digital products that perform and scale.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-white text-lg mb-3">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-blue-400 transition">About</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">Services</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">Work</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">Team</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">Careers</a></li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="font-semibold text-white text-lg mb-3">Solutions</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-blue-400 transition">SaaS & Products</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">App Development</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">Web Development</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">UI/UX Design</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition">Digital Marketing</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white text-lg mb-3">Get in Touch</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.94 6.94a1.5 1.5 0 012.12 0l1.92 1.92a1.5 1.5 0 010 2.12L5.06 13.94a1.5 1.5 0 01-2.12 0L.94 11.94a7.5 7.5 0 011.08-10.48A7.5 7.5 0 0112.5.94l2 2a1.5 1.5 0 010 2.12L12.06 8.5a1.5 1.5 0 01-2.12 0L7.94 6.5a1.5 1.5 0 010-2.12L9.88 2.5a1.5 1.5 0 012.12 0l1.5 1.5a9.5 9.5 0 11-13.44 13.44l1.5-1.5a1.5 1.5 0 010-2.12L2.94 6.94z" />
                                </svg> Hyderabad, Telangana, India
                            </li>
                            <li><a href="mailto:hello@talvyyo.com" className="hover:text-blue-400 transition">hello@talvyyo.com</a></li>
                            <li><a href="tel:+918500861757" className="hover:text-blue-400 transition">+91 85008 61757</a></li>
                        </ul>

                        <div className="mt-5 flex items-center gap-4">
                            <a href="/" className="text-blue-400 hover:text-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 5.924c-.793.352-1.644.59-2.54.698a4.48 4.48 0 001.962-2.475 8.95 8.95 0 01-2.827 1.083 4.475 4.475 0 00-7.627 4.079 12.7 12.7 0 01-9.228-4.682 4.474 4.474 0 001.385 5.973 4.456 4.456 0 01-2.027-.56v.057a4.477 4.477 0 003.59 4.383 4.486 4.486 0 01-2.02.077 4.479 4.479 0 004.18 3.106A8.98 8.98 0 012 19.54a12.656 12.656 0 006.868 2.012c8.24 0 12.75-6.828 12.75-12.75 0-.195-.004-.389-.013-.582a9.13 9.13 0 002.223-2.32z" /></svg>
                            </a>
                            <a href="/" className="text-blue-400 hover:text-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.99 3.66 9.13 8.44 9.88v-6.99H8.9v-2.89h1.54v-2.2c0-1.52.9-2.35 2.28-2.35.66 0 1.34.12 1.34.12v1.48h-.75c-.74 0-.97.46-.97.93v1.1h1.65l-.26 2.89h-1.39v6.99C18.34 21.17 22 17.03 22 12.04c0-5.52-4.48-10-10-10z" /></svg>
                            </a>
                            <a href="/" className="text-blue-400 hover:text-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.48 2.04 2 6.52 2 12.04c0 4.97 3.66 9.1 8.43 9.87v-6.99H8.91v-2.88h1.52v-2.19c0-1.52.9-2.34 2.28-2.34.66 0 1.34.12 1.34.12v1.47h-.76c-.74 0-.97.46-.97.92v1.1h1.65l-.26 2.88h-1.39v6.99C18.34 21.13 22 16.99 22 12.04c0-5.52-4.48-10-10-10z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
                    <p>© <span id="year">{year}</span> Talvyyo. All Rights Reserved.</p>
                    <div className="flex gap-4 mt-3 sm:mt-0">
                        <a href="/" className="hover:text-blue-400">Privacy Policy</a>
                        <a href="/" className="hover:text-blue-400">Terms</a>
                        <a href="/" className="hover:text-blue-400">Refunds</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
