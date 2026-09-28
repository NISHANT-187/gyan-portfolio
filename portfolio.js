// DOM Cache
const dom = {
    loader: document.querySelector('.loader-overlay'),
    heroPhoto: document.querySelector('.hero-photo'),
    heroContent: document.querySelector('.hero-content'),
    decoTerminal: document.querySelector('.deco-terminal'),
    pageGap: document.querySelector('.page-gap'),
    paperTearBottom: document.querySelector('.paper-tear-bottom'),
    paperTearBottomBgGray: document.querySelector('.paper-tear-bottom svg path[fill="#d0d0d0"]'),
    paperTearBottomBgWhite: document.querySelector('.paper-tear-bottom svg path[fill="#ffffff"]'),
    tearTapeSticker: document.querySelector('.tear-tape-sticker'),
    highlights: document.querySelectorAll('.highlight'),
    languageItems: document.querySelectorAll('.language-item'),
    journeyTimeline: document.querySelector('.journey-timeline'),
    journeyTimelineBack: document.querySelector('.journey-timeline-back'),
    themeToggle: document.getElementById('theme-toggle'),
    themeToggleIcon: document.getElementById('theme-toggle')?.querySelector('i'),
    body: document.body,
    navLinks: document.querySelectorAll('.nav-link'),
    navbar: document.querySelector('.navbar'),
    progressBarFill: document.querySelector('.progress-bar-fill'),
    checkpoints: document.querySelectorAll('.checkpoint'),
    discordCard: document.getElementById('discord-contact'),
    resumeModal: document.getElementById('resume-modal'),
    resumeModalCloseBtn: document.getElementById('resume-modal-close-btn'),
    resumeTabBtns: document.querySelectorAll('.resume-tab-btn'),
    resumeTabPanels: document.querySelectorAll('.resume-tab-panel'),
    mapContainer: document.querySelector('.journey-map-container'),
    mapSkeleton: document.getElementById('map-skeleton'),
    mapError: document.getElementById('map-error'),
    mapRetryBtn: document.getElementById('btn-retry-map')
};

// Debug Logger
const __dbg = (loc, msg, data, hypothesisId) => fetch('http://127.0.0.1:7807/ingest/a9733e84-3bfd-45f7-af81-24e4a8992d1e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'809e1d'},body:JSON.stringify({sessionId:'809e1d',location:loc,message:msg,data,hypothesisId,timestamp:Date.now(),runId:'pre-fix'})}).catch(()=>{});
window.addEventListener('error', (e) => __dbg('index.html:global', 'Uncaught JS error', {message:e.message,filename:e.filename,line:e.lineno}, 'C'));
window.addEventListener('unhandledrejection', (e) => __dbg('index.html:global', 'Unhandled promise rejection', {reason:String(e.reason)}, 'C'));

// Always start at top of page on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('load', () => {
    setTimeout(() => {
        if (dom.loader) dom.loader.classList.add('hidden');
    }, 1200);

    // DOM audit
    const criticalEls = ['heroPhoto','decoTerminal','heroContent','pageGap','journeyTimeline','themeToggle','greetingElement','progressBarFill','journey-map'];
    const domAudit = {};
    criticalEls.forEach(id => {
        const el = id === 'journey-map' ? document.getElementById(id) : (window[id] || document.querySelector('.' + id.replace(/([A-Z])/g,'-$1').toLowerCase().replace(/^-/,'')));
        domAudit[id] = !!el;
    });
    domAudit.heroPhoto = !!dom.heroPhoto;
    domAudit.decoTerminal = !!dom.decoTerminal;
    domAudit.heroContent = !!dom.heroContent;
    domAudit.pageGap = !!dom.pageGap;
    domAudit.journeyTimeline = !!dom.journeyTimeline;
    domAudit.themeToggle = !!dom.themeToggle;
    domAudit.greetingElement = !!document.getElementById('hero-greeting');
    domAudit.progressBarFill = !!dom.progressBarFill;
    domAudit.journeyMap = !!document.getElementById('journey-map');
    __dbg('index.html:load', 'DOM audit on load', domAudit, 'B');

    let storedTheme = localStorage.getItem('portfolio-theme');
    const validPortfolioThemes = ['light', 'dark'];
    if (!validPortfolioThemes.includes(storedTheme)) {
        storedTheme = 'light';
    }
    __dbg('index.html:load', 'Theme localStorage check', {storedTheme,isValidPortfolioTheme:validPortfolioThemes.includes(storedTheme),bodyDataTheme:dom.body.getAttribute('data-theme')}, 'D');

    const placeholderCount = document.documentElement.innerHTML.split('YOUR_DOMAIN').length - 1;
    __dbg('index.html:load', 'YOUR_DOMAIN placeholder count', {count:placeholderCount,canonical:document.querySelector('link[rel=canonical]')?.href}, 'A');

    ['image/avatar.jpg','image/soldier-cat.png','image/social-cover.png'].forEach(src => {
        const img = new Image();
        img.onload = () => __dbg('index.html:assets', 'Image loaded OK', {src}, 'E');
        img.onerror = () => __dbg('index.html:assets', 'Image FAILED to load', {src}, 'E');
        img.src = src;
    });
});

// Scroll state variables
let photoTilted = false;
let terminalFallen = false;
let lastScroll = 0;

// Highlight Map Setup
const highlightData = new Map();
dom.highlights.forEach((highlight, index) => {
    const direction = index % 2 === 0 ? 'left' : 'right';
    highlight.setAttribute('data-direction', direction);
    highlightData.set(highlight, {
        hasStarted: false,
        startScroll: 0,
        duration: 100,
        direction: direction
    });
});

// Language Stars Setup
const languageStarsData = new Map();
dom.languageItems.forEach(item => {
    const stars = item.querySelectorAll('.language-stars .star');
    languageStarsData.set(item, {
        hasStarted: false,
        startScroll: 0,
        stars: stars,
        starDelay: 50
    });
});

// Journey Timeline Setup
const journeyTimelineData = {
    hasStarted: false,
    startScroll: 0,
    pageRange: 200
};

// Initial calculations
function calculateFallDistance() {
    if (!dom.heroContent || !dom.decoTerminal) return;
    const heroContentRect = dom.heroContent.getBoundingClientRect();
    const heroContentBottom = heroContentRect.bottom;
    const terminalRect = dom.decoTerminal.getBoundingClientRect();
    const terminalFall = Math.max(0, heroContentBottom - terminalRect.bottom - 50);
    dom.decoTerminal.style.setProperty('--fall-distance', `${terminalFall}px`);
}
calculateFallDistance();
window.addEventListener('resize', () => {
    calculateFallDistance();
    if (dom.paperTearBottom) {
        const rect = dom.paperTearBottom.getBoundingClientRect();
        if (dom.tearTapeSticker) dom.tearTapeSticker.style.setProperty('--tape-position', `${rect.top}px`);
    }
});

function updatePhotoTilt(scrollY) {
    if (!dom.heroPhoto) return;
    if (!photoTilted && scrollY > 5) {
        dom.heroPhoto.classList.add('tilted');
        photoTilted = true;
    }
}

if (dom.heroPhoto) {
    dom.heroPhoto.addEventListener('mouseenter', () => {
        dom.heroPhoto.classList.remove('tilted');
    });

    dom.heroPhoto.addEventListener('mouseleave', () => {
        if (photoTilted) {
            dom.heroPhoto.classList.add('tilted');
        }
    });
}

function updateTerminalFall(scrollY) {
    if (!dom.decoTerminal) return;
    if (!terminalFallen && scrollY > 5) {
        dom.decoTerminal.classList.add('falling');
        terminalFallen = true;
    }
}

function updateGapParallax(scrollY) {
    if (!dom.pageGap || !dom.paperTearBottom) return;
    if (window.innerWidth <= 768) return; // Skip parallax on mobile

    const minGapHeight = -30;
    const initialGapHeight = 300;
    const scrollStart = 100;
    const scrollRange = 200;
    const stickerDelay = 30;
    const stickerStart = scrollStart + scrollRange + stickerDelay;
    const stickerRange = 60;

    // Update Tape position
    const rect = dom.paperTearBottom.getBoundingClientRect();
    if (dom.tearTapeSticker) dom.tearTapeSticker.style.setProperty('--tape-position', `${rect.top}px`);

    if (scrollY <= scrollStart) {
        dom.pageGap.style.setProperty('height', initialGapHeight + 'px', 'important');
        dom.paperTearBottom.style.setProperty('margin-top', '0px', 'important');
        if (dom.paperTearBottomBgGray) dom.paperTearBottomBgGray.style.opacity = '1';
        if (dom.tearTapeSticker) {
            dom.tearTapeSticker.style.transform = 'rotate(-8deg) translateY(-40px) translateZ(30px) rotateX(35deg)';
            dom.tearTapeSticker.style.opacity = '0';
        }
    } else if (scrollY >= scrollStart && scrollY <= scrollStart + scrollRange) {
        const progress = (scrollY - scrollStart) / scrollRange;
        const currentHeight = initialGapHeight - (initialGapHeight - minGapHeight) * progress;

        if (currentHeight >= 0) {
            dom.pageGap.style.setProperty('height', currentHeight + 'px', 'important');
            dom.paperTearBottom.style.setProperty('margin-top', '0px', 'important');
            if (dom.paperTearBottomBgGray) dom.paperTearBottomBgGray.style.opacity = '1';
            if (dom.tearTapeSticker) {
                dom.tearTapeSticker.style.transform = 'rotate(-8deg) translateY(-100px) translateZ(50px) rotateX(45deg)';
                dom.tearTapeSticker.style.opacity = '0';
            }
        } else {
            dom.pageGap.style.setProperty('height', '0px', 'important');
            dom.paperTearBottom.style.setProperty('margin-top', currentHeight + 'px', 'important');

            const negativePart = Math.abs(minGapHeight);
            const negativeProgress = Math.abs(currentHeight) / negativePart;
            const opacity = 1 - negativeProgress;

            if (dom.paperTearBottomBgGray) dom.paperTearBottomBgGray.style.opacity = opacity;
            if (dom.tearTapeSticker) {
                dom.tearTapeSticker.style.transform = 'rotate(-8deg) translateY(-100px) translateZ(50px) rotateX(45deg)';
                dom.tearTapeSticker.style.opacity = '0';
            }
        }
    } else if (scrollY > stickerStart && scrollY < stickerStart + stickerRange) {
        dom.pageGap.style.setProperty('height', '0px', 'important');
        dom.paperTearBottom.style.setProperty('margin-top', minGapHeight + 'px', 'important');
        if (dom.paperTearBottomBgGray) dom.paperTearBottomBgGray.style.opacity = '0';

        if (dom.tearTapeSticker) {
            const stickerProgress = (scrollY - stickerStart) / stickerRange;
            const translateY = -40 + (40 * stickerProgress);
            const translateZ = 30 - (30 * stickerProgress);
            const rotateX = 35 - (35 * stickerProgress);
            const opacityVal = Math.min(1, Math.max(0, (stickerProgress - 0.35) * 1.54));

            dom.tearTapeSticker.style.transform = `rotate(-8deg) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg)`;
            dom.tearTapeSticker.style.opacity = opacityVal;
        }
    } else if (scrollY >= stickerStart + stickerRange) {
        dom.pageGap.style.setProperty('height', '0px', 'important');
        dom.paperTearBottom.style.setProperty('margin-top', minGapHeight + 'px', 'important');
        if (dom.paperTearBottomBgGray) dom.paperTearBottomBgGray.style.opacity = '0';
        if (dom.tearTapeSticker) {
            dom.tearTapeSticker.style.transform = 'rotate(-8deg) translateY(0px) translateZ(0px) rotateX(0deg)';
            dom.tearTapeSticker.style.opacity = '1';
        }
    } else {
        dom.pageGap.style.setProperty('height', '0px', 'important');
        dom.paperTearBottom.style.setProperty('margin-top', minGapHeight + 'px', 'important');
        if (dom.paperTearBottomBgGray) dom.paperTearBottomBgGray.style.opacity = '0';
        if (dom.tearTapeSticker) {
            dom.tearTapeSticker.style.transform = 'rotate(-8deg) translateY(-40px) translateZ(30px) rotateX(35deg)';
            dom.tearTapeSticker.style.opacity = '0';
        }
    }
}

function updateHighlights(scrollY) {
    const windowHeight = window.innerHeight;

    dom.highlights.forEach(highlight => {
        const rect = highlight.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const data = highlightData.get(highlight);
        const triggerPoint = scrollY + windowHeight * 0.8;

        if (!data.hasStarted && triggerPoint >= elementTop) {
            data.hasStarted = true;
            data.startScroll = scrollY;
        }

        if (data.hasStarted) {
            const progress = Math.min(1, Math.max(0, (scrollY - data.startScroll) / data.duration));
            highlight.style.setProperty('--highlight-progress', `${progress * 100}%`);
        }

        if (data.hasStarted && scrollY < data.startScroll - 50) {
            data.hasStarted = false;
            highlight.style.setProperty('--highlight-progress', '0%');
        }
    });
}

function updateLanguageStars(scrollY) {
    const windowHeight = window.innerHeight;

    dom.languageItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const data = languageStarsData.get(item);
        const triggerPoint = scrollY + windowHeight * 0.8;

        if (!data.hasStarted && triggerPoint >= elementTop) {
            data.hasStarted = true;
            data.startScroll = scrollY;
        }

        if (data.hasStarted) {
            const scrollProgress = scrollY - data.startScroll;
            data.stars.forEach((star, index) => {
                const starTrigger = index * data.starDelay;
                if (scrollProgress >= starTrigger) {
                    star.classList.add('visible');
                }
            });
        }
    });
}

function updateJourneyTimeline(scrollY) {
    if (!dom.journeyTimeline || !dom.journeyTimelineBack) return;
    if (window.innerWidth < 769) return; // Only desktop

    const windowHeight = window.innerHeight;
    const rect = dom.journeyTimeline.getBoundingClientRect();
    const elementTop = rect.top + scrollY;
    const triggerPoint = scrollY + windowHeight * 0.5;

    if (!journeyTimelineData.hasStarted && triggerPoint >= elementTop) {
        journeyTimelineData.hasStarted = true;
        journeyTimelineData.startScroll = scrollY;
    }

    if (journeyTimelineData.hasStarted) {
        const progress = Math.min(1, Math.max(0, (scrollY - journeyTimelineData.startScroll) / journeyTimelineData.pageRange));
        const rotateY = 180 - (180 * progress);

        dom.journeyTimeline.style.transform = `rotateY(${rotateY}deg)`;
        dom.journeyTimelineBack.style.transform = `rotateY(${rotateY}deg)`;

        if (rotateY > 95) {
            dom.journeyTimeline.style.zIndex = '1';
            dom.journeyTimelineBack.style.zIndex = '100';
        } else {
            dom.journeyTimeline.style.zIndex = '100';
            dom.journeyTimelineBack.style.zIndex = '1';
        }

        if (progress >= 1) {
            dom.journeyTimeline.style.overflowY = 'auto';
        } else {
            dom.journeyTimeline.style.overflowY = 'hidden';
        }
    } else {
        dom.journeyTimeline.style.transform = 'rotateY(180deg)';
        dom.journeyTimelineBack.style.transform = 'rotateY(180deg)';
        dom.journeyTimeline.style.zIndex = '1';
        dom.journeyTimelineBack.style.zIndex = '100';
        dom.journeyTimeline.style.overflowY = 'hidden';
    }
}

function updateProgressBar(scrollY) {
    if (!dom.progressBarFill) return;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const progress = (scrollY / documentHeight) * 100;

    dom.progressBarFill.style.width = progress + '%';

    const sections = ['hero', 'about', 'work-experience', 'experience', 'skills', 'contact'];
    let activeIndex = 0;

    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                activeIndex = index;
            }
        }
    });

    dom.checkpoints.forEach((checkpoint, index) => {
        if (index <= activeIndex) {
            checkpoint.classList.add('active');
        } else {
            checkpoint.classList.remove('active');
        }
    });
}

function updateNavbarScroll(scrollY) {
    if (!dom.navbar) return;
    
    // Smart hide/show navbar
    if (scrollY > lastScroll && scrollY > 100) {
        dom.navbar.classList.add('navbar-hidden');
    } else if (scrollY < lastScroll) {
        dom.navbar.classList.remove('navbar-hidden');
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            dom.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    lastScroll = scrollY;
}

// Unified, throttled scroll handler
let ticking = false;
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            updateProgressBar(scrollY);
            updatePhotoTilt(scrollY);
            updateTerminalFall(scrollY);
            updateGapParallax(scrollY);
            updateHighlights(scrollY);
            updateLanguageStars(scrollY);
            updateJourneyTimeline(scrollY);
            updateNavbarScroll(scrollY);
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);

// Initialize positions
requestAnimationFrame(() => {
    onScroll();
});

// Theme Toggle
if (dom.themeToggle) {
    let currentTheme = localStorage.getItem('portfolio-theme');
    if (currentTheme !== 'light' && currentTheme !== 'dark') {
        currentTheme = 'light';
    }
    dom.body.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    dom.themeToggle.addEventListener('click', () => {
        const theme = dom.body.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        dom.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateIcon(newTheme);

        __dbg('index.html:theme', 'Theme toggled', {from:theme,to:newTheme,stored:localStorage.getItem('portfolio-theme')}, 'D');
    });
}

function updateIcon(theme) {
    if (!dom.themeToggleIcon) return;
    if (theme === 'dark') {
        dom.themeToggleIcon.classList.remove('fa-moon');
        dom.themeToggleIcon.classList.add('fa-sun');
    } else {
        dom.themeToggleIcon.classList.remove('fa-sun');
        dom.themeToggleIcon.classList.add('fa-moon');
    }
}

// Smooth Scroll for Navigation
dom.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Checkpoint click handlers
dom.checkpoints.forEach(checkpoint => {
    checkpoint.addEventListener('click', () => {
        const sectionId = checkpoint.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .timeline-item, .skill-box').forEach(el => {
    fadeObserver.observe(el);
});

// Matrix Typing Effect for Hero Greeting
const greetingElement = document.getElementById('hero-greeting');
const finalText = 'Hi there! 👋';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

function matrixTypingEffect() {
    if (!greetingElement) return;
    let iterations = 0;
    const interval = setInterval(() => {
        greetingElement.textContent = finalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return finalText[index];
                }
                if (char === ' ' || char === '👋') {
                    return char;
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iterations >= finalText.length) {
            clearInterval(interval);
        }

        iterations += 1/3;
    }, 50);
}

setTimeout(matrixTypingEffect, 500);

// Map Initialization
let mapInitialized = false;

function loadLeaflet(onSuccess, onError) {
    if (typeof L !== 'undefined') {
        onSuccess();
        return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

    script.onload = () => {
        if (typeof L !== 'undefined') {
            onSuccess();
        } else {
            onError();
        }
    };

    script.onerror = () => {
        onError();
    };

    document.head.appendChild(script);
}

function initJourneyMap() {
    if (mapInitialized) return;
    if (dom.mapSkeleton) dom.mapSkeleton.classList.remove('hidden');
    if (dom.mapError) dom.mapError.classList.add('hidden');

    loadLeaflet(
        () => {
            try {
                if (dom.mapSkeleton) dom.mapSkeleton.classList.add('hidden');
                
                const initialView = { center: [16.5062, 80.6480], zoom: 5 };

                const map = L.map('journey-map', {
                    center: initialView.center,
                    zoom: initialView.zoom,
                    scrollWheelZoom: false,
                    zoomControl: true
                });

                const tileLayer = L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
                    attribution: '© Stamen Design, © OpenStreetMap contributors',
                    maxZoom: 16
                }).addTo(map);

                // #region agent log
                tileLayer.on('tileerror', (e) => __dbg('index.html:map', 'Leaflet tile load error', {url:e?.tile?.src}, 'F'));
                tileLayer.on('load', () => __dbg('index.html:map', 'Leaflet tiles loaded OK', {center:initialView.center,zoom:initialView.zoom}, 'F'));
                __dbg('index.html:map', 'Leaflet map initialized', {leafletAvailable:typeof L!=='undefined',mapContainerExists:!!document.getElementById('journey-map')}, 'F');
                // #endregion

                L.Control.Home = L.Control.extend({
                    onAdd: function(map) {
                        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-home');
                        const link = L.DomUtil.create('a', '', container);
                        link.href = '#';
                        link.title = 'Reset map view';
                        link.innerHTML = '<i class="fas fa-home"></i>';

                        L.DomEvent.on(link, 'click', function(e) {
                            e.preventDefault();
                            map.setView(initialView.center, initialView.zoom);
                        });

                        return container;
                    }
                });

                new L.Control.Home({ position: 'topright' }).addTo(map);

                const locations = [
                    {
                        coords: [16.5062, 80.6480],
                        country: 'India',
                        companies: [
                            {
                                city: 'KL University, Vaddeswaram',
                                company: 'Academic Projects',
                                period: '2026 - 2030',
                                role: 'FOODFLEET — Restaurant Management System'
                            }
                        ]
                    }
                ];

                const markers = {};
                locations.forEach(location => {
                    const isCurrent = location.country === 'India';
                    const markerIcon = L.divIcon({
                        className: isCurrent ? 'neo-marker neo-marker-current' : 'neo-marker',
                        html: `
                            <div class="neo-marker-label ${isCurrent ? 'neo-marker-label-current' : ''}">${location.country}</div>
                            <div class="neo-marker-pin ${isCurrent ? 'neo-marker-pin-current' : ''}"></div>
                        `,
                        iconSize: isCurrent ? [35, 35] : [30, 30],
                        iconAnchor: isCurrent ? [17.5, 50] : [15, 45],
                        popupAnchor: [0, isCurrent ? -50 : -45]
                    });

                    let popupContent = `<div class="map-popup">`;
                    popupContent += `<div class="map-popup-country">${location.country}</div>`;
                    location.companies.forEach((company, index) => {
                        if (index > 0) popupContent += `<div class="map-popup-divider"></div>`;
                        popupContent += `
                            <div class="map-popup-company">
                                <strong>${company.company}</strong>
                                <span>${company.role}</span>
                                <small>${company.city}</small>
                                <small>${company.period}</small>
                            </div>
                        `;
                    });
                    popupContent += `</div>`;

                    const marker = L.marker(location.coords, { icon: markerIcon }).addTo(map);
                    marker.bindPopup(popupContent);
                    markers[location.country] = marker;
                });

                document.querySelectorAll('.timeline-item-flat').forEach(item => {
                    item.addEventListener('click', () => {
                        const country = item.getAttribute('data-country');
                        const marker = markers[country];
                        if (marker) {
                            map.setView(marker.getLatLng(), 6, {
                                animate: true,
                                duration: 1
                            });
                            setTimeout(() => {
                                marker.openPopup();
                            }, 500);
                        }
                    });
                });

                mapInitialized = true;
            } catch (err) {
                console.error("Leaflet map initialization failed:", err);
                showMapError();
            }
        },
        () => {
            showMapError();
        }
    );
}

function showMapError() {
    if (dom.mapSkeleton) dom.mapSkeleton.classList.add('hidden');
    if (dom.mapError) dom.mapError.classList.remove('hidden');
}

if (dom.mapRetryBtn) {
    dom.mapRetryBtn.addEventListener('click', () => {
        initJourneyMap();
    });
}

const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initJourneyMap();
            mapObserver.disconnect();
        }
    });
}, { rootMargin: '150px 0px' });

if (dom.mapContainer) {
    mapObserver.observe(dom.mapContainer);
}

// Discord Clipboard Copy
if (dom.discordCard) {
    dom.discordCard.addEventListener('click', (e) => {
        e.preventDefault();
        const username = dom.discordCard.getAttribute('data-username');
        const subtitle = dom.discordCard.querySelector('.contact-subtitle');
        const originalText = subtitle ? subtitle.textContent : '';

        const handleCopySuccess = () => {
            if (subtitle) subtitle.textContent = 'Copied!';
            dom.discordCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                dom.discordCard.style.transform = '';
            }, 150);
            
            setTimeout(() => {
                if (subtitle) subtitle.textContent = originalText;
            }, 2000);

            __dbg('index.html:discord', 'Clipboard copy success', {secureContext:window.isSecureContext,protocol:location.protocol}, 'G');
        };

        const copyFallback = () => {
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = username;
            tempTextArea.style.top = '0';
            tempTextArea.style.left = '0';
            tempTextArea.style.position = 'fixed';
            tempTextArea.style.opacity = '0';
            document.body.appendChild(tempTextArea);
            tempTextArea.focus();
            tempTextArea.select();
            
            let success = false;
            try {
                success = document.execCommand('copy');
            } catch (fallbackErr) {
                console.error('Fallback copy failed: ', fallbackErr);
            }
            
            document.body.removeChild(tempTextArea);
            
            if (success) {
                handleCopySuccess();
            } else {
                if (subtitle) subtitle.textContent = 'Copy failed!';
                setTimeout(() => {
                    if (subtitle) subtitle.textContent = originalText;
                }, 2000);
                __dbg('index.html:discord', 'Clipboard copy fallback failed', {secureContext:window.isSecureContext,protocol:location.protocol}, 'G');
            }
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(username).then(() => {
                handleCopySuccess();
            }).catch(err => {
                console.warn('Clipboard API failed, using fallback: ', err);
                copyFallback();
            });
        } else {
            copyFallback();
        }
    });
}

// Interactive Resume Modal Logic
function openResumeModal(defaultTab = 'visual') {
    if (!dom.resumeModal) return;
    dom.resumeModal.classList.add('active');
    dom.body.style.overflow = 'hidden';
    switchResumeTab(defaultTab);
}

function closeResumeModal() {
    if (!dom.resumeModal) return;
    dom.resumeModal.classList.remove('active');
    dom.body.style.overflow = '';
}

function switchResumeTab(tabName) {
    dom.resumeTabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    dom.resumeTabPanels.forEach(panel => {
        if (panel.id === `panel-${tabName}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

dom.resumeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchResumeTab(btn.getAttribute('data-tab'));
    });
});

if (dom.resumeModalCloseBtn) {
    dom.resumeModalCloseBtn.addEventListener('click', closeResumeModal);
}

// macOS style close dot click handler
const resumeModalDotClose = document.getElementById('resume-modal-dot-close');
if (resumeModalDotClose) {
    resumeModalDotClose.addEventListener('click', closeResumeModal);
}

// Listener for messages from inside terminal iframe to close modal
window.addEventListener('message', (e) => {
    if (e.data === 'close-resume-modal' || (e.data && e.data.type === 'close-resume-modal')) {
        closeResumeModal();
    }
});

if (dom.resumeModal) {
    dom.resumeModal.addEventListener('click', (e) => {
        if (e.target === dom.resumeModal) {
            closeResumeModal();
        }
    });
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dom.resumeModal && dom.resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});

document.querySelectorAll('a[href="Gyanendra_Trivedi_Resume.pdf"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.closest('#resume-modal')) return;
        e.preventDefault();
        openResumeModal('visual');
    });
});

document.querySelectorAll('a[href="Gyanendra_Trivedi_Resume.jpg"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.closest('#resume-modal')) return;
        e.preventDefault();
        openResumeModal('visual');
    });
});

