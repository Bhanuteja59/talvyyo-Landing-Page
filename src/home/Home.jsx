import React, { useEffect, useState } from 'react';
import './Home.css';
import {
    ArrowRight,
    ChevronRight,
    Star,
    Code,
    Palette,
    Smartphone,
    Globe,
    Users,
    Zap,
    Shield,
    TrendingUp,
    CheckCircle,
    Quote,
    Calendar,
    Award,
    Sparkles
} from 'lucide-react';

import Header from "../components/Header"
import Footer from "../components/Footer"

const Home = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            const now = new Date();
            const target = new Date();
            target.setHours(24, 0, 0, 0); // Set to midnight

            const diff = target - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        // Mouse tracking for interactive background
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Scroll progress
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        // Scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        if (entry.target.classList.contains('counter')) {
                            animateCounter(entry.target);
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

        // Particle animation
        createParticles();

        // Typing animation for hero title
        animateTyping();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(timer);
            observer.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };

    const createParticles = () => {
        const container = document.querySelector('.particle-container');
        if (!container) return;

        // Clear existing particles
        container.innerHTML = '';

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            container.appendChild(particle);
        }

        // Create morphing blobs
        for (let i = 0; i < 3; i++) {
            const blob = document.createElement('div');
            blob.className = `morph-blob blob-${i + 1}`;
            container.appendChild(blob);
        }
    };

    const animateTyping = () => {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.innerHTML;
        heroTitle.classList.add('typing-active');

        // Let CSS handle the typing animation
        setTimeout(() => {
            heroTitle.classList.add('typing-complete');
        }, 3000);
    };

    const technologies = [
        { name: 'Flutter', icon: <Zap />, color: '#02569B' },
        { name: 'React JS', icon: <Code />, color: '#61DAFB' },
        { name: 'Vue JS', icon: <span className="vue-icon">Vue</span>, color: '#4FC08D' },
        { name: 'Next JS', icon: <Globe />, color: '#000000' },
        { name: 'Laravel', icon: <span className="laravel-icon">L</span>, color: '#FF2D20' },
        { name: 'Android', icon: <Smartphone />, color: '#3DDC84' },
        { name: 'iOS', icon: <Apple />, color: '#000000' },
        { name: 'PHP', icon: <span className="php-icon">PHP</span>, color: '#777BB4' },
    ];

    const services = [
        {
            icon: <Globe />,
            title: "Web Development",
            description: "Build user-friendly, high-performance websites that showcase your business online.",
            features: ["Responsive Design", "SEO Optimized", "Performance Focused"]
        },
        {
            icon: <Smartphone />,
            title: "App Development",
            description: "Create custom mobile apps that simplify workflows and delight users.",
            features: ["Cross-Platform", "Native Performance", "Scalable"]
        },
        {
            icon: <Palette />,
            title: "UI/UX Services",
            description: "Design and develop engaging, accessible, and user-friendly interfaces.",
            features: ["User Research", "Prototyping", "Design Systems"]
        },
        {
            icon: <TrendingUp />,
            title: "Digital Marketing",
            description: "Grow your reach with content, SEO/ASO, and performance campaigns.",
            features: ["SEO/ASO", "Content Strategy", "Analytics"]
        }
    ];

    const testimonials = [
        {
            name: "Johnepse",
            role: "Customer Support",
            rating: 5,
            comment: "Can explain of these guys. They are so talented and customer support is beyond the limit. Recommended them to all.",
            avatarColor: "#4F46E5"
        },
        {
            name: "Ajayambaliya",
            role: "Customer Support",
            rating: 5,
            comment: "Best app ever I've seen, and best part is the service... they provide the best services. Keep it up team.",
            avatarColor: "#10B981"
        },
        {
            name: "musbarozkok",
            role: "Code Quality & Support",
            rating: 5,
            comment: "I'm very satisfied with both the code quality and support. Fastest support team I have ever seen.",
            avatarColor: "#F59E0B"
        }
    ];

    return (
        <div className="talvyyo-home">
            <Header />
            {/* Scroll Progress Bar */}
            <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }}></div>

            {/* Interactive Background */}
            <div
                className="interactive-bg"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), rgba(139, 92, 246, 0.05) 50%, transparent 80%)`
                }}
            ></div>

            {/* Floating Particles Background */}
            <div className="particle-container"></div>

            {/* Top Banner */}
            <div className="top-banner">
                <div className="container">
                    <div className="banner-content">
                        <Sparkles size={16} />
                        <span className="banner-text">
                            Special Offer: 20% off for first 5 new clients • Ends in
                            <span className="countdown">
                                {String(timeLeft.hours).padStart(2, '0')}:
                                {String(timeLeft.minutes).padStart(2, '0')}:
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </span>
                        <Sparkles size={16} />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <div className="hero-content animate-on-scroll fade-in">
                                <div className="tagline">
                                    <span className="tag">Web</span>
                                    <span className="dot">•</span>
                                    <span className="tag">Apps</span>
                                    <span className="dot">•</span>
                                    <span className="tag">Branding</span>
                                    <span className="dot">•</span>
                                    <span className="tag">Growth</span>
                                </div>

                                <h1 className="hero-title">
                                    <span className="line-reveal">We design and build</span>
                                    <br />
                                    <span className="highlight gradient-shift">products</span>
                                    <br />
                                    <span className="line-reveal delay-1">that grow your business</span>
                                </h1>

                                <p className="hero-description">
                                    Full-stack partner for startups and enterprises: strategy, UX/UI,
                                    development, and performance marketing.
                                </p>

                                <div className="hero-actions">
                                    <button className="btn btn-primary btn-lg me-3 magnetic-btn">
                                        <span className="btn-content">Start a Project <ArrowRight className="ms-2" /></span>
                                        <span className="btn-shine"></span>
                                    </button>
                                    <button className="btn btn-outline btn-lg magnetic-btn text-white">
                                        <span className="play-icon">▶</span> See Our Work
                                    </button>
                                </div>

                                <div className="hero-stats">
                                    <div className="stat">
                                        <div className="stat-number counter" data-target="7">0</div>
                                        <div className="stat-label">Years Experience</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-number">500+</div>
                                        <div className="stat-label">Projects Delivered</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-number">98%</div>
                                        <div className="stat-label">Client Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="hero-visual animate-on-scroll slide-in-right">
                                <div className="floating-cards">
                                    <div className="card card-1">
                                        <Code size={32} />
                                        <span>Code</span>
                                    </div>
                                    <div className="card card-2">
                                        <Palette size={32} />
                                        <span>Design</span>
                                    </div>
                                    <div className="card card-3">
                                        <TrendingUp size={32} />
                                        <span>Growth</span>
                                    </div>
                                </div>
                                <div className="mockup-container">
                                    <div className="browser-mockup">
                                        <div className="browser-header">
                                            <div className="dots">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                        <div className="browser-content">
                                            <div className="code-line"></div>
                                            <div className="code-line"></div>
                                            <div className="code-line"></div>
                                        </div>
                                    </div>
                                    <div className="phone-mockup">
                                        <div className="phone-screen">
                                            <div className="app-screen">
                                                <div className="app-header"></div>
                                                <div className="app-content">
                                                    <div className="content-item"></div>
                                                    <div className="content-item"></div>
                                                    <div className="content-item"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-visual animate-on-scroll scale-in">
                                <div className="team-illustration">
                                    <div className="person person-1"></div>
                                    <div className="person person-2"></div>
                                    <div className="person person-3"></div>
                                    <div className="connection-line"></div>
                                    <div className="connection-line"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content animate-on-scroll fade-in">
                                <h2 className="section-title">
                                    About <span className="brand">Talvyyo</span>
                                </h2>
                                <p className="section-subtitle">
                                    We are Committed to Providing our Clients with End-to-End App and Website Solutions.
                                </p>
                                <p className="about-description">
                                    Talvyyo has experience of more than 7 years as a software design & development studio.
                                    Our senior web and app teams deliver outcomes that reach all your requirements — on time and at quality.
                                </p>

                                <div className="features-grid">
                                    <div className="feature">
                                        <CheckCircle className="feature-icon" />
                                        <span>Full-stack delivery (Design → Dev → QA)</span>
                                    </div>
                                    <div className="feature">
                                        <CheckCircle className="feature-icon" />
                                        <span>Agile sprints, code reviews, CI/CD</span>
                                    </div>
                                    <div className="feature">
                                        <CheckCircle className="feature-icon" />
                                        <span>SEO & analytics baked-in</span>
                                    </div>
                                    <div className="feature">
                                        <CheckCircle className="feature-icon" />
                                        <span>Secure contracts & IP ownership</span>
                                    </div>
                                </div>

                                <button className="btn btn-secondary text-white magnetic-btn">
                                    Discover More <ChevronRight className="ms-2" />
                                    <span className="btn-shine"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="container">
                    <div className="section-header text-center animate-on-scroll fade-in">
                        <h2 className="section-title">Our Solutions</h2>
                        <p className="section-subtitle">
                            Digital Solutions We Offer, as the Best Software Development Company
                        </p>
                    </div>

                    <div className="row g-4">
                        {services.map((service, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div className={`service-card animate-on-scroll slide-up delay-${index}`}>
                                    <div className="service-icon">
                                        {service.icon}
                                    </div>
                                    <h4>{service.title}</h4>
                                    <p>{service.description}</p>
                                    <div className="service-features">
                                        {service.features.map((feature, idx) => (
                                            <span key={idx} className="feature-tag">{feature}</span>
                                        ))}
                                    </div>
                                    <button className="service-link">
                                        Explore Service <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="technologies-section">
                <div className="container">
                    <div className="section-header text-center animate-on-scroll fade-in">
                        <h2 className="section-title">Technology We Use</h2>
                        <p className="section-subtitle">
                            Our Developers Have a Strong Grip on Advanced Technologies
                        </p>
                    </div>

                    <div className="tech-grid">
                        {technologies.map((tech, index) => (
                            <div
                                className="tech-card animate-on-scroll scale-in"
                                key={index}
                                style={{ '--tech-color': tech.color }}
                            >
                                <div className="tech-icon">
                                    {tech.icon}
                                </div>
                                <span className="tech-name">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header text-center animate-on-scroll fade-in">
                        <h2 className="section-title">Client Reviews</h2>
                        <p className="section-subtitle">Hear It in Their Words</p>
                    </div>

                    <div className="testimonials-slider">
                        {testimonials.map((testimonial, index) => (
                            <div className="testimonial-card animate-on-scroll slide-up" key={index}>
                                <div className="testimonial-header">
                                    <div
                                        className="avatar"
                                        style={{ backgroundColor: testimonial.avatarColor }}
                                    >
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="testimonial-info">
                                        <h5>{testimonial.name}</h5>
                                        <span>{testimonial.role}</span>
                                    </div>
                                    <div className="rating">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={16} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>
                                <Quote className="quote-icon" />
                                <p className="testimonial-text">{testimonial.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card animate-on-scroll scale-in">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 className="cta-title">Ready to Transform Your Business?</h2>
                                <p className="cta-subtitle">
                                    Let's build something amazing together. Get a free consultation today.
                                </p>
                            </div>
                            <div className="col-lg-4 text-lg-end">
                                <button className="btn btn-primary btn-lg">
                                    Get a Quote <ArrowRight className="ms-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

// Helper components
const Apple = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.31-2.33 1.05-3.11z" />
    </svg>
);

export default Home;