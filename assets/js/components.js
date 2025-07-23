document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    ComponentManager.init();
});

/**
 * Component Manager - Handles registration and initialization of all components
 */
const ComponentManager = {
    components: {},
    
    // Register a new component
    register: function(name, component) {
        this.components[name] = component;
        return this;
    },
    
    // Initialize all registered components
    init: function() {
        Object.values(this.components).forEach(component => {
            if (typeof component.init === 'function') {
                component.init();
            }
        });
    }
};

/**
 * Header Component
 */
const HeaderComponent = {
    init: function() {
        this.injectHeader();
        this.initHeaderScrollEffect();
        this.initMobileMenu();
    },
    
    injectHeader: function() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (!headerPlaceholder) return;

        const headerHTML = `
        <header class="site-header">
            <div class="container">
                <div class="logo">
                    <a href="index.html">
                        <img src="assets/images/logo.svg" alt="MapleDerm Logo" class="logo-img">
                    </a>
                </div>
                <nav class="main-nav">
                    <ul>
                        <li class="has-dropdown desktop-only">
                            <a href="">Services</a>
                            <div class="dropdown-menu">
                                <a href="#medical">Medical</a>
                                <a href="#cosmetic">Cosmetic</a>
                                <a href="#maintenance">Maintenance</a>
                            </div>
                        </li>
                        <li class="mobile-only"><a href="#medical">Medical</a></li>
                        <li class="mobile-only"><a href="#cosmetic">Cosmetic</a></li>
                        <li class="mobile-only"><a href="#maintenance">Maintenance</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="media.html">Media</a></li>
                        <li class="cta-button"><a href="book-appointment.html">Book an Appointment</a></li>
                        <li class="social-nav mobile-menu-social">
                            <a href="https://www.instagram.com/maplederm/" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="https://www.tiktok.com/@maplederm" target="_blank" title="TikTok"><i class="fab fa-tiktok"></i></a>
                        </li>
                    </ul>
                </nav>
                <div class="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
        `;

        headerPlaceholder.outerHTML = headerHTML;
    },

    initHeaderScrollEffect: function() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        }
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    initMobileMenu: function() {
        const mobileBreakpoint = 768;
        
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (!mobileMenuToggle || !mainNav) return;

        const checkMobileState = function() {
            const isMobile = window.innerWidth <= mobileBreakpoint;
            document.body.classList.toggle('is-mobile', isMobile);
            document.body.classList.toggle('is-desktop', !isMobile);
        };
        
        checkMobileState();

        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        const dropdownItems = document.querySelectorAll('.has-dropdown > a');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= mobileBreakpoint) {
                    e.preventDefault();
                    const parent = this.parentNode;
                    parent.classList.toggle('active');

                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.parentNode.classList.remove('active');
                        }
                    });
                }
            });
        });

        window.addEventListener('resize', function() {
            checkMobileState();
            if (window.innerWidth > mobileBreakpoint) {
                document.querySelectorAll('.has-dropdown').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }
};

/**
 * Footer Component
 */
const FooterComponent = {
    init: function() {
        this.injectFooter();
    },
    
    injectFooter: function() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        const footerHTML = `
        <footer class="site-footer" id="contact">
            <div class="container">
                <div class="footer-cta">
                    <h2>Begin your path to <em>expert-led</em> skin health</h2>
                    <a href="book-appointment.html" class="btn primary-btn">Book an Appointment →</a>
                    <p>Still have questions?<br>Take a look through our <a href="#faq" class="text-link no-underline">FAQ</a></p>
                </div>
                
                <div class="footer-content">
                    <div class="footer-row">
                        <div class="footer-logo">
                            <img src="assets/images/logo2.svg" alt="MapleDerm Logo" class="footer-logo-img">
                        </div>
                        <div class="footer-address">
                            <p><a href="https://www.google.com/maps/place/MapleDerm/@43.8632365,-79.5014533,20.83z/data=!4m14!1m7!3m6!1s0x882b29f2e7085903:0x67f3ee4c07f244ea!2s191+McNaughton+Rd+E+%23206,+Vaughan,+ON+L6A+4E2!3b1!8m2!3d43.863259!4d-79.5011775!3m5!1s0x882b2916c66fffff:0xffc004f324a56f47!8m2!3d43.8632461!4d-79.5014884!16s%2Fg%2F11q94yzsyv?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="address-link">191 McNaughton Rd E, Suite 206<br>
                            Maple, Ontario L6A 4E2</a></p>
                            <p>P: <a href="tel:+19058324747">(905) 832-4747</a> | F: <a href="tel:+19058324797">(905) 832-4797</a></p>
                        </div>
                        <div class="footer-legal">
                            <p><a href="#">Privacy Policy</a></p>
                            <p>© <script>document.write(new Date().getFullYear());</script> MapleDerm</p>
                            <p class="made-with">Made with <span class="heart">❤️</span> in Canada</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `;

        footerPlaceholder.outerHTML = footerHTML;
    }
};

/**
 * Hero Section Component
 */
const HeroComponent = {
    init: function() {
        // Only initialize if there's a hero element on the page
        if (document.querySelector('.hero') || document.querySelector('.page-hero')) {
            this.initScrollAnimation();
        }
    },
    
    initScrollAnimation: function() {
        const hero = document.querySelector('.hero') || document.querySelector('.page-hero');
        if (!hero) return;
        
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            if (scrollY > 10) {
                hero.classList.add('scrolled');
            } else {
                hero.classList.remove('scrolled');
            }
        });
    },
    
    createHero: function(container, title, subtitle, ctaText, ctaUrl, imageSrc) {
        if (!container) return;
        
        const heroHTML = `
        <section class="hero">
            <div class="hero-container">
                <div class="hero-content">
                    <h1>${title}</h1>
                    <p class="hero-subtitle">${subtitle}</p>
                    ${ctaText ? `<a href="${ctaUrl}" class="btn primary-btn">${ctaText}</a>` : ''}
                </div>
                ${imageSrc ? `
                <div class="hero-image-container">
                    <img class="hero-image" src="${imageSrc}" alt="Hero Image">
                </div>` : ''}
            </div>
        </section>
        `;
        
        container.innerHTML = heroHTML;
    },
    
    createPageHero: function(container, title, subtitle) {
        if (!container) return;
        
        const pageHeroHTML = `
        <section class="page-hero">
            <div class="container">
                <h1>${title}</h1>
                <p class="page-subtitle">${subtitle}</p>
            </div>
        </section>
        `;
        
        container.innerHTML = pageHeroHTML;
    }
};

/**
 * Button Component
 */
const ButtonComponent = {
    init: function() {
        // No initialization needed
    },
    
    createButton: function(container, text, url, isPrimary = true, newTab = false) {
        if (!container) return;
        
        const buttonClass = isPrimary ? 'primary-btn' : 'secondary-btn';
        const target = newTab ? 'target="_blank"' : '';
        
        const buttonHTML = `<a href="${url}" class="btn ${buttonClass}" ${target}>${text}</a>`;
        container.innerHTML = buttonHTML;
    },
    
    createTextLink: function(container, text, url, underlined = true, newTab = false) {
        if (!container) return;
        
        const underlineClass = !underlined ? 'no-underline' : '';
        const target = newTab ? 'target="_blank"' : '';
        
        const linkHTML = `<a href="${url}" class="text-link ${underlineClass}" ${target}>${text}</a>`;
        container.innerHTML = linkHTML;
    }
};

/**
 * Feature Card Component
 */
const FeatureCardComponent = {
    init: function() {
        // No initialization needed
    },
    
    createFeature: function(container, iconClass, title, description) {
        if (!container) return;
        
        // Set consistent container styles first if it's a direct wrapper
        if (!container.parentElement.classList.contains('features') && 
            !container.classList.contains('feature')) {
            container.style.flex = '1';
            container.style.minWidth = '0';
            container.style.flexBasis = '0';
        }
        
        const featureHTML = `
        <div class="feature">
            <div class="feature-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        `;
        
        container.innerHTML = featureHTML;
    },
    
    createServiceCard: function(container, id, iconClass, title, description, linkText, linkUrl) {
        if (!container) return;
        
        // Set consistent container styles
        if (!container.parentElement.classList.contains('service-cards') && 
            !container.classList.contains('service-card')) {
            container.style.flex = '1';
            container.style.minWidth = '0';
        }
        
        const serviceCardHTML = `
        <div class="service-card" id="${id}">
            <div class="service-icon"><i class="${iconClass}"></i></div>
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${linkUrl}" class="text-link">${linkText}</a>
        </div>
        `;
        
        container.innerHTML = serviceCardHTML;
    }
};

/**
 * Testimonial Component
 */
const TestimonialComponent = {
    init: function() {
        // Testimonial initialization is handled by testimonial-slider.js
    },
    
    createTestimonial: function(container, text, name, stars = 5) {
        if (!container) return;
        
        let starsHTML = '';
        for (let i = 0; i < stars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        const testimonialHTML = `
        <div class="testimonial">
            <div class="testimonial-content">
                <div class="stars">
                    ${starsHTML}
                </div>
                <p class="testimonial-text">${text}</p>
                <div class="client">
                    <span class="name">${name}</span>
                </div>
            </div>
        </div>
        `;
        
        container.innerHTML = testimonialHTML;
    }
};

/**
 * Social Media Component
 */
const SocialMediaComponent = {
    init: function() {
        // No initialization needed
    },
    
    createInstagramPost: function(container, profileImage, username, postImage, postUrl, hasVideo = false) {
        if (!container) return;
        
        const instagramPostHTML = `
        <div class="custom-instagram-post">
            <div class="instagram-post-header">
                <div class="instagram-profile-pic">
                    <img src="${profileImage}" alt="${username}">
                </div>
                <div class="instagram-profile-info">
                    <a href="https://www.instagram.com/${username}/" target="_blank" class="instagram-username">${username}</a>
                </div>
            </div>
            <div class="instagram-post-image">
                <a href="${postUrl}" target="_blank">
                    <img src="${postImage}" alt="${username} Instagram post">
                    ${hasVideo ? `
                    <div class="instagram-play-overlay">
                        <div class="play-content">
                            <i class="fas fa-play"></i>
                            <span>Watch on Instagram</span>
                        </div>
                    </div>
                    ` : ''}
                </a>
            </div>
        </div>
        `;
        
        container.innerHTML = instagramPostHTML;
    },
    
    createViewProfileButton: function(container, platform, username, buttonText) {
        if (!container) return;
        
        let url = '';
        let icon = '';
        
        // Set URL and icon based on platform
        switch(platform.toLowerCase()) {
            case 'instagram':
                url = `https://www.instagram.com/${username}/`;
                icon = 'fab fa-instagram';
                break;
            case 'facebook':
                url = `https://www.facebook.com/${username}/`;
                icon = 'fab fa-facebook-f';
                break;
            case 'twitter':
                url = `https://www.twitter.com/${username}/`;
                icon = 'fab fa-twitter';
                break;
            case 'tiktok':
                url = `https://www.tiktok.com/@${username}`;
                icon = 'fab fa-tiktok';
                break;
            default:
                url = `https://www.instagram.com/${username}/`;
                icon = 'fab fa-instagram';
        }
        
        const viewProfileHTML = `
        <div class="social-view-profile">
            <a href="${url}" class="btn primary-btn" target="_blank">
                <i class="${icon}"></i>&nbsp; ${buttonText || `View more on ${platform}`}
            </a>
        </div>
        `;
        
        container.innerHTML = viewProfileHTML;
    }
};

/**
 * Register all components with the Component Manager
 */
ComponentManager
    .register('header', HeaderComponent)
    .register('footer', FooterComponent)
    .register('hero', HeroComponent)
    .register('button', ButtonComponent)
    .register('featureCard', FeatureCardComponent)
    .register('testimonial', TestimonialComponent)
    .register('socialMedia', SocialMediaComponent); 