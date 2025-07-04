document.addEventListener('DOMContentLoaded', function() {
    // Define a function to directly inject the components
    function injectComponents() {
        // Load the components from their respective files
        injectHeaderComponent();
        injectFooterComponent();

    }
    
    // Try to inject components immediately
    injectComponents();
});

/**
 * Injects the header component directly
 */
function injectHeaderComponent() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    
    // Header HTML - placed directly in the JS file for reliability
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
                        <a href="#services">Services</a>
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
    
    // Insert the header
    headerPlaceholder.outerHTML = headerHTML;
    
    // Initialize header behaviors
    initHeaderScrollEffect();
    initMobileMenu();
}

/**
 * Injects the footer component directly
 */
function injectFooterComponent() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;
    
    // Footer HTML - placed directly in the JS file for reliability
    const footerHTML = `
    <footer class="site-footer" id="contact">
        <div class="container">
            <!-- CTA Section integrated into footer -->
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
    
    // Insert the footer
    footerPlaceholder.outerHTML = footerHTML;
}

// Header scroll effect function
function initHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    // Add scrolled class immediately if page is not at the top
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) { // More sensitive - just 10px of scroll
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu initialization
function initMobileMenu() {
    // Define mobile breakpoint consistently
    const mobileBreakpoint = 768;
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!mobileMenuToggle || !mainNav) return;
    
    // Check initial state for proper desktop/mobile display
    const checkMobileState = function() {
        const isMobile = window.innerWidth <= mobileBreakpoint;
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-desktop', !isMobile);
    };
    
    // Run check on load
    checkMobileState();
    
    // Add event listener for mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Mobile dropdown functionality
    const dropdownItems = document.querySelectorAll('.has-dropdown > a');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only handle dropdown toggle on mobile
            if (window.innerWidth <= mobileBreakpoint) {
                e.preventDefault();
                const parent = this.parentNode;
                parent.classList.toggle('active');
                
                // Close other dropdowns
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.parentNode.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        checkMobileState();
        if (window.innerWidth > mobileBreakpoint) {
            document.querySelectorAll('.has-dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
} 