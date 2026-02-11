import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="tech-header">
            <div className="header-container">
                <a href="/" className="logo-section" aria-label="Talvyyo home">
                    <div className="logo-icon">TY</div>
                    <div className="logo-text">
                        <p className="brand-name">Talvyyo</p>
                        <p className="brand-tagline">Web • Apps • Branding • Growth</p>
                    </div>
                </a>

                <button
                    id="menuBtn"
                    className="mobile-menu-btn"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobileNav"
                    aria-label="Open menu"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="menu-text">Menu</span>
                    <span className="menu-glow"></span>
                </button>

                <nav className="desktop-nav">
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="#services" className="nav-link">Services</a>
                    <a href="#products" className="nav-link">Products</a>
                    <a href="#work" className="nav-link">Work</a>
                    <a href="#team" className="nav-link">Team</a>
                    <a href="#careers" className="nav-link">Careers</a>
                    <a href="#offers" className="nav-link">Offers</a>
                    <a href="#contact" className="nav-link">Contact</a>
                    <a href="#quote" className="cta-btn">
                        <span className="btn-text">Get a Quote</span>
                        <span className="btn-glow"></span>
                    </a>
                </nav>
            </div>

            {/* Mobile nav */}
            <div id="mobileNav" className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav-content">
                    <a href="#home" className="mobile-link">Home</a>
                    <a href="#about" className="mobile-link">About</a>
                    <a href="#services" className="mobile-link">Services</a>
                    <a href="#products" className="mobile-link">Products</a>
                    <a href="#work" className="mobile-link">Work</a>
                    <a href="#team" className="mobile-link">Team</a>
                    <a href="#careers" className="mobile-link">Careers</a>
                    <a href="#offers" className="mobile-link">Offers</a>
                    <a href="#contact" className="mobile-link">Contact</a>
                    <a href="#quote" className="mobile-link-cta">Get a Quote</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
