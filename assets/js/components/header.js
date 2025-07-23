const HeaderComponent = {
    init: function() {
        this.injectHeader();
        this.initHeaderScrollEffect();
        this.initMobileMenu();
        this.setActiveNavItem();
        this.setupNavHoverEffect();
        this.handleActiveTabClick();
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
                        <li class="cta-button"><a href="contact-us.html">Contact Us</a></li>
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
        // Find any active navigation items
        const activeItems = document.querySelectorAll('.main-nav li.active a');
        
        activeItems.forEach(link => {
            link.addEventListener('click', function(e) {
                // Check if this is a full page link (not an anchor link like #services)
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
    }
};

export default HeaderComponent; 