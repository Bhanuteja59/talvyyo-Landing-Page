import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="tech-footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <a href="/" className="footer-logo">
                            <div className="footer-logo-icon">TY</div>
                            <div>
                                <p className="footer-brand-name">Talvyyo</p>
                                <p className="footer-brand-tagline">Web • Apps • Branding • Growth</p>
                            </div>
                        </a>
                        <p className="footer-description">
                            We are a design-led, development-strong studio helping startups and businesses build powerful digital products that perform and scale.
                        </p>
                    </div>

                    {/* Company */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="#about" className="footer-link">About</a></li>
                            <li><a href="#services" className="footer-link">Services</a></li>
                            <li><a href="#work" className="footer-link">Work</a></li>
                            <li><a href="#team" className="footer-link">Team</a></li>
                            <li><a href="#careers" className="footer-link">Careers</a></li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Solutions</h4>
                        <ul className="footer-links">
                            <li><a href="#saas" className="footer-link">SaaS & Products</a></li>
                            <li><a href="#app-dev" className="footer-link">App Development</a></li>
                            <li><a href="#web-dev" className="footer-link">Web Development</a></li>
                            <li><a href="#design" className="footer-link">UI/UX Design</a></li>
                            <li><a href="#marketing" className="footer-link">Digital Marketing</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Get in Touch</h4>
                        <ul className="footer-links">
                            <li className="footer-contact">
                                <svg className="contact-icon" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Hyderabad, Telangana, India
                            </li>
                            <li><a href="mailto:hello@talvyyo.com" className="footer-link">hello@talvyyo.com</a></li>
                            <li><a href="tel:+918500861757" className="footer-link">+91 85008 61757</a></li>
                        </ul>

                        <div className="social-links">
                            <a href="/" className="social-link" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.23 5.924c-.793.352-1.644.59-2.54.698a4.48 4.48 0 001.962-2.475 8.95 8.95 0 01-2.827 1.083 4.475 4.475 0 00-7.627 4.079 12.7 12.7 0 01-9.228-4.682 4.474 4.474 0 001.385 5.973 4.456 4.456 0 01-2.027-.56v.057a4.477 4.477 0 003.59 4.383 4.486 4.486 0 01-2.02.077 4.479 4.479 0 004.18 3.106A8.98 8.98 0 012 19.54a12.656 12.656 0 006.868 2.012c8.24 0 12.75-6.828 12.75-12.75 0-.195-.004-.389-.013-.582a9.13 9.13 0 002.223-2.32z" /></svg>
                            </a>
                            <a href="/" className="social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.99 3.66 9.13 8.44 9.88v-6.99H8.9v-2.89h1.54v-2.2c0-1.52.9-2.35 2.28-2.35.66 0 1.34.12 1.34.12v1.48h-.75c-.74 0-.97.46-.97.93v1.1h1.65l-.26 2.89h-1.39v6.99C18.34 21.17 22 17.03 22 12.04c0-5.52-4.48-10-10-10z" /></svg>
                            </a>
                            <a href="/" className="social-link" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© {year} Talvyyo. All Rights Reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#privacy" className="footer-bottom-link">Privacy Policy</a>
                        <a href="#terms" className="footer-bottom-link">Terms</a>
                        <a href="#refunds" className="footer-bottom-link">Refunds</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
