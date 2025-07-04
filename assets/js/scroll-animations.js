// Scroll Animation for Features on Mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth <= mobileBreakpoint; // Check if we're on a mobile device
    
    if (isMobile) {
        const features = document.querySelectorAll('.feature');
        
        // Create an Intersection Observer to detect when elements are in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the element is visible
                if (entry.isIntersecting) {
                    // Add the active class to trigger the animation
                    entry.target.classList.add('feature-active');
                    // Unobserve the element so the animation only happens once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2, // When at least 20% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger a bit before element is fully in view
        });
        
        // Observe each feature element
        features.forEach(feature => {
            observer.observe(feature);
        });
    }
    
    // Re-check on window resize
    window.addEventListener('resize', function() {
        const isCurrentlyMobile = window.innerWidth <= mobileBreakpoint;
        // Only re-initialize if user switches from desktop to mobile
        if (isCurrentlyMobile && !isMobile) {
            location.reload(); // Simple solution - reload the page
        }
    });
}); 