// Icon components for better visual appeal
import React from 'react';

// Enhanced service icons with gradients
export const CodeIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#B429FF" />
            </linearGradient>
        </defs>
        <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="url(#codeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const SmartphoneIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFF0" />
                <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
        </defs>
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="url(#phoneGrad)" strokeWidth="2" />
        <line x1="12" y1="18" x2="12" y2="18" stroke="url(#phoneGrad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const PaletteIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="paletteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B429FF" />
                <stop offset="100%" stopColor="#FF006E" />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C12.83 22 13.5 21.33 13.5 20.5C13.5 20.11 13.35 19.76 13.11 19.49C12.88 19.23 12.73 18.88 12.73 18.5C12.73 17.67 13.4 17 14.23 17H16C19.31 17 22 14.31 22 11C22 6.03 17.52 2 12 2Z" stroke="url(#paletteGrad)" strokeWidth="2" />
        <circle cx="7" cy="10" r="1.5" fill="url(#paletteGrad)" />
        <circle cx="11" cy="7" r="1.5" fill="url(#paletteGrad)" />
        <circle cx="15" cy="10" r="1.5" fill="url(#paletteGrad)" />
    </svg>
);

export const TrendingUpIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFF0" />
                <stop offset="100%" stopColor="#B429FF" />
            </linearGradient>
        </defs>
        <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="url(#trendGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 6H23V12" stroke="url(#trendGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
