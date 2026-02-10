import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../index.css';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

const Home = () => {
    // --- State: Top Bar ---
    const [countdown, setCountdown] = useState('');

    // --- State: Hero ---
    const [heroActiveIndex, setHeroActiveIndex] = useState(0);
    const [heroIsPaused, setHeroIsPaused] = useState(false);
    const touchStartX = useRef(0);
    const touchDx = useRef(0);

    // --- State: Services ---
    const [serviceActiveIndex, setServiceActiveIndex] = useState(0);
    const [servicePinnedIndex, setServicePinnedIndex] = useState(null);

    // --- State: Scroll Animations ---
    const observerRef = useRef(null);

    // --- State: Animated Counters ---
    const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

    // --- Data ---
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1600&auto=format&fit=crop",
            alt: "Design team collaborating"
        }
    ];

    const services = [
        {
            title: "Web Development",
            desc: "Build a user-friendly, high-performance website that showcases your business online.",
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                    <path d="M8.7 13.3L6.4 11l2.3-2.3-1.4-1.4L3.6 11l3.7 3.7 1.4-1.4zm6.6 0l2.3 2.3L21.3 11l-3.7-3.7-1.4 1.4L18.5 11l-2.3 2.3 1.1 1zM14 4l-4 16 2 .5 4-16-2-.5z" />
                </svg>
            )
        },
        {
            title: "App Development",
            desc: "Create custom mobile apps that simplify workflows and delight users.",
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                    <path d="M7 2h10a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5a3 3 0 013-3zm0 2a1 1 0 00-1 1v3h12V5a1 1 0 00-1-1H7zm11 7H6v8a1 1 0 001 1h10a1 1 0 001-1v-8z" />
                </svg>
            )
        },
        {
            title: "UI/UX Services",
            desc: "Design and develop engaging, accessible, and user-friendly interfaces.",
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a7 7 0 00-4 12.8V18a2 2 0 002 2h4a2 2 0 002-2v-3.2A7 7 0 0012 2zm2 16h-4v-1h4v1zm.4-4.5l-.4.3V16h-4v-2.2l-.4-.3A5 5 0 1114.4 13.5z" />
                </svg>
            )
        },
        {
            title: "Digital Marketing",
            desc: "Grow your reach with content, SEO/ASO, and performance campaigns.",
            icon: (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                    <path d="M21 8v8l-9 3V5l9 3zM2 10h6v4H2v-4zm7 4.9l2-.7V9.8l-2-.7v5.8z" />
                </svg>
            )
        }
    ];

    const techs = [
        { name: "Flutter", img: "https://www.wrteam.in/_next/static/media/FlutterColor.2beceef9.png" },
        { name: "React JS", img: "https://www.wrteam.in/_next/static/media/ReactColor.4ac1faaa.png" },
        { name: "Vue JS", img: "https://www.wrteam.in/_next/static/media/VueColor.02d9f917.png" },
        { name: "Next JS", img: "https://www.wrteam.in/_next/static/media/nextjs-icon.43763b75.svg" },
        { name: "Laravel", img: "https://www.wrteam.in/_next/static/media/Laravel.5c1a2139.svg" },
        { name: "Android", img: "https://www.wrteam.in/_next/static/media/Android.b540b2c3.svg" },
        { name: "iOS", img: "https://www.wrteam.in/_next/static/media/iOS.5d4ae9b5.svg" },
        { name: "PHP", img: "https://www.php.net//images/logos/new-php-logo.svg" },
    ];

    const reviews = [
        {
            name: "Johnepse",
            role: "For Customer Support",
            text: "Can explain of these guys. They are so talented and customer support is beyond the limit. Recommended them to all. They work professionally. Awesome!!!",
            stars: 5,
            iconPath: "M7.2 11.3c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2S4.5 14.2 4.5 13c0-3.7 2.2-6.6 5.5-7.8l.5 1.8c-2.2.9-3.3 2.7-3.3 4.3zm9 0c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2s-2.1-1-2.1-2.2c0-3.7 2.1-6.6 5.4-7.8l.5 1.8c-2.2.9-3.2 2.7-3.2 4.3z"
        },
        {
            name: "musbarozkok",
            role: "For Code Quality & Support",
            text: "I’m very satisfied with both the code quality and support. Fastest support team I have ever seen here.",
            stars: 5,
            iconPath: "M7.2 11.3c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2S4.5 14.2 4.5 13c0-3.7 2.2-6.6 5.5-7.8l.5 1.8c-2.2.9-3.3 2.7-3.3 4.3zm9 0c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2s-2.1-1-2.1-2.2c0-3.7 2.1-6.6 5.4-7.8l.5 1.8c-2.2.9-3.2 2.7-3.2 4.3z"
        },
        {
            name: "Akam_Barznji",
            role: "For Code Quality",
            text: "Amazing! The team is amazing. Professionalism is high level. Always responsive when you need them. Our iOS app plan is with them as well.",
            stars: 5,
            iconPath: "M7.2 11.3c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2S4.5 14.2 4.5 13c0-3.7 2.2-6.6 5.5-7.8l.5 1.8c-2.2.9-3.3 2.7-3.3 4.3zm9 0c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2s-2.1-1-2.1-2.2c0-3.7 2.1-6.6 5.4-7.8l.5 1.8c-2.2.9-3.2 2.7-3.2 4.3z"
        },
        {
            name: "ckkapel",
            role: "For Code Quality",
            text: "WRTeam, we are continually impressed by robustness and scalability. Optimized, bug-free code with rigorous standards.",
            stars: 5,
            iconPath: "M7.2 11.3c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2S4.5 14.2 4.5 13c0-3.7 2.2-6.6 5.5-7.8l.5 1.8c-2.2.9-3.3 2.7-3.3 4.3zm9 0c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2s-2.1-1-2.1-2.2c0-3.7 2.1-6.6 5.4-7.8l.5 1.8c-2.2.9-3.2 2.7-3.2 4.3z"
        },
        {
            name: "Dafrii",
            role: "For Customer Support",
            text: "I would like to give 10 stars to these guys! CodeCanyon allows only 5, but they deserve more than 5 because they’re doing a great job.",
            stars: 5,
            iconPath: "M7.2 11.3c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2S4.5 14.2 4.5 13c0-3.7 2.2-6.6 5.5-7.8l.5 1.8c-2.2.9-3.3 2.7-3.3 4.3zm9 0c.9 0 1.6.8 1.6 1.7 0 1.2-1 2.2-2.2 2.2s-2.1-1-2.1-2.2c0-3.7 2.1-6.6 5.4-7.8l.5 1.8c-2.2.9-3.2 2.7-3.2 4.3z"
        },
    ];

    // --- Custom Hook: Animated Counter ---
    const useCounter = (end, duration = 2000, shouldStart = false) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!shouldStart) return;

            let startTime;
            let animationFrame;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                setCount(Math.floor(progress * end));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }, [end, duration, shouldStart]);

        return count;
    };

    // --- Effects ---

    // 1. Scroll Animation Observer
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    // Trigger stats animation when about section is visible
                    if (entry.target.id === 'about-talvyyo' && !hasAnimatedStats) {
                        setHasAnimatedStats(true);
                    }
                }
            });
        }, options);

        // Observe all sections
        const sections = document.querySelectorAll('section, .animate-on-scroll');
        sections.forEach(section => {
            if (observerRef.current) {
                observerRef.current.observe(section);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasAnimatedStats]);

    // 2. Countdown Logic
    useEffect(() => {
        const offerEnd = new Date("2026-09-15T23:59:59").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = offerEnd - now;
            if (diff <= 0) {
                setCountdown("Offer expired");
                clearInterval(timer);
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setCountdown(`${days}d ${hours}h ${mins}m`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 4. Hero Slider Logic
    useEffect(() => {
        let timer;
        if (!heroIsPaused && slides.length > 1) {
            timer = setInterval(() => {
                setHeroActiveIndex((current) => (current + 1) % slides.length);
            }, 6000);
        }
        return () => clearInterval(timer);
    }, [heroIsPaused, slides.length]);

    // 5. Services Auto-Rotate Logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (servicePinnedIndex === null) {
                setServiceActiveIndex((prev) => (prev + 1) % services.length);
            }
        }, 3500);
        return () => clearInterval(interval);
    }, [servicePinnedIndex, services.length]);

    // --- Handlers: Hero ---
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        setHeroIsPaused(true);
    };

    const handleTouchMove = (e) => {
        touchDx.current = e.touches[0].clientX - touchStartX.current;
    };

    const handleTouchEnd = () => {
        if (Math.abs(touchDx.current) > 40) {
            if (touchDx.current < 0) {
                setHeroActiveIndex((current) => (current + 1) % slides.length);
            } else {
                setHeroActiveIndex((current) => (current - 1 + slides.length) % slides.length);
            }
        }
        touchDx.current = 0;
        setHeroIsPaused(false);
    };

    // --- Handlers: Services ---
    const handleServiceInteraction = (index) => {
        if (servicePinnedIndex === null) {
            setServiceActiveIndex(index);
        }
    };

    const handleServiceClick = (index) => {
        setServicePinnedIndex(servicePinnedIndex === index ? null : index);
        setServiceActiveIndex(index);
    };

    // --- Handlers: 3D Card Tilt ---
    const handleCardMouseMove = useCallback((e, cardRef) => {
        if (!cardRef) return;

        const rect = cardRef.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        cardRef.style.setProperty('--rotate-x', `${rotateX}deg`);
        cardRef.style.setProperty('--rotate-y', `${rotateY}deg`);
    }, []);

    const handleCardMouseLeave = useCallback((cardRef) => {
        if (!cardRef) return;

        cardRef.style.setProperty('--rotate-x', '0deg');
        cardRef.style.setProperty('--rotate-y', '0deg');
    }, []);

    // Button ripple effect
    const createRipple = (e) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();

        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - rect.left - radius}px`;
        ripple.style.top = `${e.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple-effect');

        const existingRipple = button.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    };

    // Use animated counter
    const yearsCount = useCounter(7, 2000, hasAnimatedStats);

    return (
        <>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] rounded-lg bg-neutral-900 px-3 py-2 text-white">Skip to content</a>

            {/* Top notice bar with countdown */}
            <div className="bg-blue-50 text-blue-900 border-b border-blue-200">
                <div className="mx-auto max-w-7xl px-4 py-2 text-xs md:text-sm flex items-center justify-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span> 🎉 Special Offer: 20% off for first 5 new clients • Ends in
                    <span id="countdown" className="font-semibold">{countdown}</span>
                </div>
            </div>

            <Header />

            <main id="main">
                {/* HERO SECTION */}
                <section
                    id="hero"
                    className="relative overflow-hidden min-h-[600px] md:min-h-[700px] bg-gray-900 animate-on-scroll"
                    onMouseEnter={() => setHeroIsPaused(true)}
                    onMouseLeave={() => setHeroIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Slides */}
                    <div className="absolute inset-0 z-0">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-out ${index === heroActiveIndex ? 'opacity-100 hero-slide-active' : 'opacity-0'
                                    }`}
                                data-active={index === heroActiveIndex}
                            >
                                <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover gpu-accelerated" />
                                <div className="absolute inset-0 hero-gradient-overlay"></div>
                                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-48 w-[140%] rounded-[50%] bg-white/10 blur-3xl float-element-slow"></div>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-36 text-white">
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/30 glass-card animate-on-scroll fade-in-down">
                            Web • Mobile • Branding • Growth
                        </p>
                        <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight animate-on-scroll fade-in-up">
                            We design and build <span className="text-gradient">products that grow</span> your business
                        </h1>
                        <p className="mt-5 max-w-2xl text-neutral-200 animate-on-scroll fade-in-up stagger-1">
                            Full-stack partner for startups and enterprises: strategy, UX/UI, development, and performance marketing.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3 animate-on-scroll fade-in-up stagger-2">
                            <a
                                href="/"
                                className="btn-magnetic btn-ripple btn-gradient-hover rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 will-change-transform"
                                onClick={createRipple}
                            >
                                Start a Project
                            </a>
                            <a
                                href="/"
                                className="btn-magnetic btn-ripple rounded-xl bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/30 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 glass-card will-change-transform"
                                onClick={createRipple}
                            >
                                See Our Work
                            </a>
                        </div>
                    </div>

                    <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                aria-label={`Slide ${index + 1}`}
                                className={`hero-dot h-2.5 rounded-full transition-all duration-250 ${index === heroActiveIndex ? 'w-[18px] bg-white/95' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                                onClick={() => setHeroActiveIndex(index)}
                            ></button>
                        ))}
                    </div>
                </section>

                {/* ABOUT SECTION */}
                <section id="about-talvyyo" className="mx-auto max-w-7xl px-4 py-16 animate-on-scroll">
                    <div className="grid gap-10 md:grid-cols-2 items-center">
                        <div className="relative animate-on-scroll fade-in-left">
                            <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,.15)] image-hover-zoom">
                                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop" alt="Talvyyo team at work" className="w-full h-[380px] md:h-[450px] object-cover" loading="lazy" />
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 md:bottom-8 md:left-8 md:translate-x-0 float-element">
                                <div className="rounded-2xl p-1 bg-gradient-to-br from-amber-300 via-rose-300 to-amber-600 shadow-xl stat-badge">
                                    <div className="rounded-2xl bg-neutral-900/95 text-white px-6 py-5 md:px-8 md:py-6">
                                        <div className="text-center">
                                            <div className="stat-number text-5xl md:text-6xl font-extrabold leading-none">
                                                {yearsCount}<span className="align-top text-3xl md:text-4xl">+</span>
                                            </div>
                                            <div className="mt-1 text-2xl md:text-3xl font-bold">Years</div>
                                            <div className="mt-2 text-xs tracking-[0.35em] text-neutral-300">EXPERIENCE</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="animate-on-scroll fade-in-right">
                            <a href="/" className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-200/70">
                                About Talvyyo
                            </a>

                            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-snug">
                                We are Committed to Providing our
                                <span className="text-blue-600"> Clients</span> with End-to-End
                                <span className="text-blue-600"> App and Website</span> Solutions.
                            </h2>

                            <p className="mt-5 text-neutral-700">
                                Talvyyo has experience of more than 7 years as a software design & development studio. Our senior web and app teams deliver outcomes that reach all your requirements — on time and at quality.
                            </p>

                            <p className="mt-4 text-neutral-700">
                                We’re a cross-functional group of designers and engineers: creative, dedicated, and fluent in full-stack development and UI/UX. We use modern stacks like Laravel, Flutter, React/Next.js, Node, Figma, and AWS to ship reliably and scale confidently.
                            </p>

                            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span> Full-stack delivery (Design → Dev → QA)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span> Agile sprints, code reviews, CI/CD
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span> SEO & analytics baked-in
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span> Secure contracts & IP ownership
                                </li>
                            </ul>

                            <div className="mt-8">
                                <a href="/" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                                    Discover More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DIGITAL SOLUTIONS SECTION */}
                <section id="digital-solutions" className="bg-blue-50 animate-on-scroll">
                    <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
                        <div className="flex justify-center">
                            <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100 shadow-sm animate-on-scroll scale-in">
                                Our Solutions
                            </span>
                        </div>

                        <h2 className="mt-6 text-center text-3xl md:text-5xl font-extrabold leading-tight text-neutral-900 animate-on-scroll fade-in-up">
                            <span className="text-blue-700">Digital Solutions</span> We Offer, as the<br className="hidden md:block" />
                            <span className="text-blue-700">Best Software</span> Development<br className="hidden md:block" /> Company.
                        </h2>

                        <p className="mt-5 max-w-3xl mx-auto text-center text-neutral-600 animate-on-scroll fade-in-up stagger-1">
                            We serve a wide variety of digital solutions designed for businesses — creating modern websites and mobile apps for e-commerce, education, restaurants, and beyond.
                        </p>

                        <div className="mt-14 grid gap-10 md:grid-cols-2 animate-on-scroll">
                            {/* Mobile App Products */}
                            <article className="group grid grid-cols-[1fr,1.1fr] items-center gap-5 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,.08)] p-6 md:p-8 ring-1 ring-blue-100 image-hover-zoom fade-in-left stagger-2">
                                <div className="relative overflow-hidden rounded-2xl ring-1 ring-neutral-100">
                                    <div className="absolute inset-0">
                                        <div className="h-1/2 bg-white"></div>
                                        <div className="h-1/2 bg-blue-600"></div>
                                    </div>
                                    <img src="https://www.wrteam.in/_next/static/media/AppImage.ec9fead5.webp" alt="Mobile app mockup" className="relative z-[1] w-full object-contain" loading="lazy" />
                                </div>
                                <div>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                                            <path d="M7 2h10a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5a3 3 0 013-3zm0 2a1 1 0 00-1 1v3h12V5a1 1 0 00-1-1H7zm11 7H6v8a1 1 0 001 1h10a1 1 0 001-1v-8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 leading-snug">
                                        Mobile<br />App<br />Products
                                    </h3>
                                    <a href="/" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300">
                                        Discover More
                                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6L13 5z" /></svg>
                                    </a>
                                </div>
                            </article>

                            {/* Web App Products */}
                            <article className="group grid grid-cols-[1fr,1.1fr] items-center gap-5 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,.08)] p-6 md:p-8 ring-1 ring-blue-100 image-hover-zoom fade-in-right stagger-2">
                                <div className="relative overflow-hidden rounded-2xl ring-1 ring-neutral-100">
                                    <div className="absolute inset-0">
                                        <div className="h-1/2 bg-white"></div>
                                        <div className="h-1/2 bg-blue-600"></div>
                                    </div>
                                    <img src="https://www.wrteam.in/_next/static/media/WebImage.943f6814.webp" alt="Web app mockup" className="relative z-[1] w-full object-contain" loading="lazy" />
                                </div>
                                <div>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                                            <path d="M8.7 13.3L6.4 11l2.3-2.3-1.4-1.4L3.6 11l3.7 3.7 1.4-1.4zm6.6 0l2.3 2.3L21.3 11l-3.7-3.7-1.4 1.4L18.5 11l-2.3 2.3 1.1 1zM14 4l-4 16 2 .5 4-16-2-.5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 leading-snug">
                                        Web App<br />Products
                                    </h3>
                                    <a href="/" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300">
                                        Discover More
                                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6L13 5z" /></svg>
                                    </a>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                {/* SERVICES SECTION */}
                <section id="all-services-talvyyo" className="mx-auto max-w-7xl px-4 py-16 animate-on-scroll">
                    <div className="grid gap-12 md:grid-cols-2 items-start">
                        {/* LEFT: Copy */}
                        <div className="animate-on-scroll fade-in-left">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                                Talvyyo Services
                            </span>

                            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
                                <span className="text-blue-700">Innovate, Implement, Succeed:</span><br /> We Offer Every IT Service You need, all in
                                <span className="text-blue-700"> One Place.</span>
                            </h2>

                            <p className="mt-5 text-neutral-700 leading-relaxed">
                                In the modern world having a digital presence is crucial; it's necessary to have a business website or app that leads to stronger administration & growth. Remove limitations of place & time from your business with Talvyyo's software services.
                            </p>

                            <p className="mt-5 text-neutral-700 leading-relaxed">
                                We offer all software services in one place — from designing a personalized mobile app & website to streamlining your business operations.
                            </p>

                            <p className="mt-5 text-neutral-700 leading-relaxed">
                                Our team includes experienced UI/UX designers, web developers, Flutter & React Native app developers, and growth marketers. We're committed to delivering results and building long-term relationships.
                            </p>
                        </div>

                        {/* RIGHT: 2x2 Interactive Card Grid */}
                        <div className="grid gap-10 sm:grid-cols-2 animate-on-scroll fade-in-right" id="serviceCards">
                            {services.map((service, index) => (
                                <article
                                    key={index}
                                    className={`service-card service-card-3d ${index === 0 ? 'stagger-1' : index === 1 ? 'stagger-2' : index === 2 ? 'stagger-3' : 'stagger-4'}`}
                                    tabIndex="0"
                                    role="button"
                                    aria-pressed={serviceActiveIndex === index}
                                    data-active={serviceActiveIndex === index}
                                    onMouseEnter={() => handleServiceInteraction(index)}
                                    onFocus={() => handleServiceInteraction(index)}
                                    onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                                    onMouseLeave={(e) => {
                                        if (servicePinnedIndex === null) setServiceActiveIndex(serviceActiveIndex);
                                        handleCardMouseLeave(e.currentTarget);
                                    }}
                                    onClick={() => handleServiceClick(index)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleServiceClick(index);
                                        }
                                    }}
                                >
                                    <div className="card-inner">
                                        <div className="card-icon">
                                            {service.icon}
                                        </div>
                                        <h3 className="card-title">{service.title}</h3>
                                        <p className="card-text">{service.desc}</p>
                                        <a href="/" className="explore">Explore Service
                                            <svg viewBox="0 0 24 24" className="h-4 w-4 inline" fill="currentColor"><path d="M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6L13 5z" /></svg>
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TECH STACK SECTION */}
                <section id="tech-stack" className="bg-blue-50 animate-on-scroll">
                    <div className="mx-auto max-w-7xl px-4 py-16">
                        <div className="grid gap-10 md:grid-cols-2 items-start animate-on-scroll">
                            <div className="fade-in-left">
                                <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100 shadow-sm">
                                    Technology <span className="ml-1 text-neutral-500">We Use</span>
                                </span>

                                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-neutral-900">
                                    Our Developers Have a <span className="text-blue-600">Strong Grip</span> on Advanced <span className="text-blue-600">Technologies</span> to Enhance Your Website & App.
                                </h2>
                            </div>

                            <p className="text-neutral-700 leading-relaxed fade-in-right">
                                We build with modern stacks across web and mobile — pairing solid engineering with clean UX. Here are some of the core technologies we ship with daily.
                            </p>
                        </div>

                        <div className="mt-10 rounded-[28px] bg-[#121a2a] text-white ring-1 ring-black/10 shadow-[0_24px_60px_rgba(2,6,23,.35)] overflow-hidden tech-rail-bg">
                            <div className="relative px-6 py-10 md:px-10">
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-10">
                                    {techs.map((tech, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className="tech-tile group">
                                                <img src={tech.img} alt={tech.name} className="tech-img" loading="lazy" decoding="async" />
                                            </div>
                                            <div className="tech-spine"></div>
                                            <span className="tech-label">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* REVIEWS SECTION */}
                <section id="reviews" className="bg-white animate-on-scroll">
                    <div className="mx-auto max-w-7xl px-4 py-16">
                        <div className="text-center animate-on-scroll">
                            <a href="/" className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100 scale-in">
                                Read Their Experiences
                            </a>
                            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 fade-in-up">
                                Client Reviews - Hear It in Their Words
                            </h2>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-on-scroll">
                            {reviews.map((review, index) => (
                                <article key={index} className={`review-card rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition fade-in-up ${index < 3 ? `stagger-${index + 1}` : `stagger-${(index % 3) + 1}`}`}>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                                <path d={review.iconPath} />
                                            </svg>
                                        </span>
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(review.stars)].map((_, i) => (
                                                <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M10 2l2.5 5.2 5.7.8-4.1 4 1 5.8-5.1-2.7-5.1 2.7 1-5.8-4.1-4 5.7-.8z" /></svg>
                                            ))}
                                            <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">{review.stars}.0</span>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-neutral-700">
                                        {review.text}
                                    </p>

                                    <hr className="my-4 border-neutral-200" />
                                    <div>
                                        <div className="font-semibold text-neutral-900">{review.name}</div>
                                        <div className="text-xs text-neutral-500 mt-0.5">{review.role}</div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <ChatWidget />
        </>
    );
};

export default Home;
