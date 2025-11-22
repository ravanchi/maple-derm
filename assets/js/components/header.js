const HeaderComponent = {
    init: function() {
        this.injectHeader();
        this.initHeaderScrollEffect();
        this.initMobileMenu();
        this.setActiveNavItem();
        this.setupNavHoverEffect();
        this.handleActiveTabClick();
        this.handleAllNavLinks();
        this.preventServicesLinkDefault();
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
                <nav class="main-nav" role="navigation" aria-label="Main Navigation">
                    <ul role="menubar">
                        <li class="has-dropdown desktop-only" role="none">
                            <a href="javascript:void(0);" role="menuitem" aria-haspopup="true" aria-expanded="false">Services</a>
                            <div class="dropdown-menu" role="menu" aria-label="Services Submenu">
                                <a href="medical-services.html" role="menuitem" tabindex="-1">Medical & Surgical</a>
                                <a href="cosmetic-services.html" role="menuitem" tabindex="-1">Cosmetic</a>
                                <a href="maintenance-services.html" role="menuitem" tabindex="-1">Maintenance</a>
                            </div>
                        </li>
                        <li class="mobile-only" role="none"><a href="medical-services.html" role="menuitem">Medical & Surgical</a></li>
                        <li class="mobile-only" role="none"><a href="cosmetic-services.html" role="menuitem">Cosmetic</a></li>
                        <li class="mobile-only" role="none"><a href="maintenance-services.html" role="menuitem">Maintenance</a></li>
                        <li role="none"><a href="faq.html" role="menuitem">FAQ</a></li>
                        <li role="none"><a href="our-team.html" role="menuitem">Our Team</a></li>
                        <li role="none"><a href="media.html" role="menuitem">Media</a></li>
                        <li class="cta-button" role="none"><a href="contact-us.html" role="menuitem">Contact Us</a></li>
                        <li class="social-nav mobile-menu-social" role="none">
                            <a href="https://www.instagram.com/maplederm/" target="_blank" aria-label="Visit our Instagram page" role="menuitem"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                            <a href="https://www.tiktok.com/@maplederm" target="_blank" aria-label="Visit our TikTok page" role="menuitem"><i class="fab fa-tiktok" aria-hidden="true"></i></a>
                        </li>
                    </ul>
                </nav>
                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="main-nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
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
            const isExpanded = mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });

        const dropdownItems = document.querySelectorAll('.has-dropdown > a');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= mobileBreakpoint) {
                    e.preventDefault();
                    const parent = this.parentNode;
                    const isExpanded = parent.classList.toggle('active');
                    this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.parentNode.classList.remove('active');
                            otherItem.setAttribute('aria-expanded', 'false');
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
    },

    // Add a method to set the active nav item based on the current page
    setActiveNavItem: function() {
        // Get the current page filename
        const currentPage = window.location.pathname.split('/').pop();
        
        // If we're on the homepage (no pathname or index.html)
        if (currentPage === '' || currentPage === 'index.html') {
            // Don't highlight any nav items for the homepage
            return;
        }
        
        // Find the navigation link that matches the current page
        const navLinks = document.querySelectorAll('.main-nav li:not(.cta-button) a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href === currentPage) {
                link.parentElement.classList.add('active');
            }
        });
        
        // Handle CTA button separately (for contact-us.html)
        const ctaLink = document.querySelector('.main-nav .cta-button a');
        if (ctaLink && ctaLink.getAttribute('href') === currentPage) {
            ctaLink.parentElement.classList.add('active');
        }
    },

    // Add method to handle hover effects on nav items
    setupNavHoverEffect: function() {
        const navItems = document.querySelectorAll('.main-nav li');
        const activeNavItem = document.querySelector('.main-nav li.active');
        
        // If there's an active nav item
        if (activeNavItem) {
            navItems.forEach(item => {
                // When hovering over any nav item
                item.addEventListener('mouseenter', function() {
                    // If this is not the active item, hide the active underline
                    if (this !== activeNavItem) {
                        activeNavItem.classList.add('hide-underline');
                    }
                });
                
                // When leaving any nav item
                item.addEventListener('mouseleave', function() {
                    // Restore the active underline
                    activeNavItem.classList.remove('hide-underline');
                });
            });
        }
    },

    // Add method to handle clicks on the active navigation item
    handleActiveTabClick: function() {
        const mobileBreakpoint = 768;
        const mainNav = document.querySelector('.main-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        // Find any active navigation items
        const activeItems = document.querySelectorAll('.main-nav li.active a');
        
        activeItems.forEach(link => {
            link.addEventListener('click', function(e) {
                // If on mobile and menu is open, close it
                if (window.innerWidth <= mobileBreakpoint && mainNav && mainNav.classList.contains('active')) {
                    e.preventDefault(); // Prevent default navigation
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                    
                    // If this is not an anchor link, scroll to top
                    if (!this.getAttribute('href').startsWith('#')) {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                    return;
                }
                
                // For desktop or other cases
                if (!this.getAttribute('href').startsWith('#')) {
                    // Prevent default navigation
                    e.preventDefault();
                    
                    // Scroll to top with smooth animation
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Add method to handle all nav links
    handleAllNavLinks: function() {
        const mobileBreakpoint = 768;
        const mainNav = document.querySelector('.main-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Get all navigation links (excluding dropdown parent links)
        const navLinks = document.querySelectorAll('.main-nav a:not(.has-dropdown > a)');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip links that have javascript:void(0)
                if (href === 'javascript:void(0);') {
                    return;
                }
                
                // If on mobile, menu is open, and link points to current page
                if (window.innerWidth <= mobileBreakpoint && 
                    mainNav && mainNav.classList.contains('active') && 
                    href === currentPage) {
                    
                    e.preventDefault();
                    
                    // Close the mobile menu
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                    
                    // Scroll to top of the page
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Add new method to prevent the Services parent link from doing anything
    preventServicesLinkDefault: function() {
        const servicesLinks = document.querySelectorAll('.has-dropdown > a');
        
        servicesLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default navigation and page scrolling
                
                                    // On mobile, we still want to toggle the dropdown
                    if (window.innerWidth <= 768) {
                        const parent = this.parentNode;
                        const isExpanded = parent.classList.toggle('active');
                        this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                    }
                
                // Do nothing else (no scrolling to top)
            });
        });
    }
};

export default HeaderComponent; 