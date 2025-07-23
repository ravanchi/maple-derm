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

export default HeaderComponent; 