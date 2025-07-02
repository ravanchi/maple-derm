document.addEventListener('DOMContentLoaded', function() {
    // Define mobile breakpoint consistently
    const mobileBreakpoint = 768;
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Check initial state for proper desktop/mobile display
    const checkMobileState = function() {
        const isMobile = window.innerWidth <= mobileBreakpoint;
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-desktop', !isMobile);
    };
    
    // Run check on load
    checkMobileState();
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
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
    
    // Handle video background
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Handle video errors
        heroVideo.addEventListener('error', function(e) {
            console.error('Video error:', e);
            document.querySelector('.hero').style.background = 'linear-gradient(135deg, #f8f3e6, #e8d9b5)';
        });
        
        // Ensure video plays once
        heroVideo.addEventListener('loadeddata', function() {
            heroVideo.play().catch(err => {
                console.log('Could not auto-play video', err);
            });
        });
        
        // Add pause/play functionality if user clicks on video (optional feature)
        heroVideo.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.play();
            } else {
                heroVideo.pause();
            }
        });
        
            // Handle video end - keep the video visible at the last frame
    heroVideo.addEventListener('ended', function() {
        // Loop the video once and then pause at the first frame
        // This creates a smoother loop than trying to set currentTime manually
        heroVideo.loop = true; // Enable looping temporarily
        
        // After a very short delay, pause at the current frame and disable loop
        setTimeout(function() {
            heroVideo.pause();
            heroVideo.loop = false; // Disable looping after pausing
        }, 100); // 100ms delay to ensure the video has started another loop
    });
    }
    
    // Header scroll effect - more sensitive to scroll
    const header = document.querySelector('.site-header');
    
    // Add scrolled class immediately if page is not at the top (if refreshed mid-page)
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) { // Much more sensitive - just 10px of scroll
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonial Slider with Dot Navigation - In-place content swap
    const initTestimonialSlider = () => {
        const testimonialContent = document.querySelector('.testimonial-content');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (!testimonialContent || !dots.length) return;
        
        // Define all testimonial data
        const testimonialData = [
            {
                stars: 5,
                text: '"Dr. Ghiasi is an exceptionally professional and knowledgeable dermatologist. She takes the time to listen to her patients\' concerns and questions. I visited her for a dermatological condition and couldn\'t be more satisfied."',
                name: 'Patient Testimonial'
            },
            {
                stars: 5,
                text: '"Dr. Nazli Ghiasi is a knowledgeable, compassionate, and dedicated dermatologist. She provides thorough care, explains treatments clearly, and ensures patients feel comfortable. Her professionalism and kindness make every visit a positive experience. Highly recommend!"',
                name: 'Patient Testimonial'
            }
        ];
        
        let currentIndex = 0;
        
        // Function to go to a specific slide
        const goToSlide = (index) => {
            if (index < 0) index = testimonialData.length - 1;
            if (index >= testimonialData.length) index = 0;
            
            // Fade out
            testimonialContent.style.opacity = 0;
            
            // Wait for fade out to complete before changing content
            setTimeout(() => {
                // Update content
                currentIndex = index;
                const data = testimonialData[currentIndex];
                
                // Update text
                document.querySelector('.testimonial-text').textContent = data.text;
                document.querySelector('.name').textContent = data.name;
                
                // Fade back in
                testimonialContent.style.opacity = 1;
                
                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }, 500);
        };
        
        // Variable for tracking the interval
        let slideInterval;
        
        // Function to reset auto-slide timer
        const resetSlideTimer = () => {
            // Clear any existing interval first
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            
            // Set a new interval
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        };
        
        // Setup dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Skip if clicking on the active dot
                if (currentIndex === index) {
                    return;
                }
                
                goToSlide(index);
                resetSlideTimer(); // Reset the timer when user manually changes slides
            });
        });
        
        // Start the auto-advance timer
        resetSlideTimer();
        
        // Pause auto-advance on hover
        testimonialContent.addEventListener('mouseenter', () => {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        });
        
        // Resume auto-advance when mouse leaves
        testimonialContent.addEventListener('mouseleave', () => {
            resetSlideTimer();
        });
        
        // Set initial slide
        // No need to call goToSlide(0) since the first testimonial is already in the HTML
    };
    
    // Initialize the testimonial slider
    initTestimonialSlider();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}); 