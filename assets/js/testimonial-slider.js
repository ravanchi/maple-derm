document.addEventListener('DOMContentLoaded', function() {
    // Wait a short moment to ensure all components are loaded
    setTimeout(() => {
        initTestimonialSlider();
    }, 200);
});

// Testimonial Slider with Dot Navigation - In-place content swap
function initTestimonialSlider() {
    const testimonialContent = document.querySelector('.testimonial-content');
    const dots = document.querySelectorAll('.slider-dot');
    
    console.log('Initializing testimonial slider');
    console.log('Testimonial content:', testimonialContent);
    console.log('Dots:', dots.length);
    
    if (!testimonialContent || !dots.length) {
        console.log('Missing required elements for testimonial slider');
        return;
    }
    
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
        
        console.log('Going to slide', index);
        
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
            console.log('Dot clicked:', index);
            
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
    
    console.log('Testimonial slider initialized successfully');
} 