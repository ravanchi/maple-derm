document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
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