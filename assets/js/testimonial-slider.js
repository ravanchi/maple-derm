/**
 * Testimonial Slider Component
 */
document.addEventListener('DOMContentLoaded', function() {
    // Wait a short moment to ensure all components are loaded
    setTimeout(() => {
        // Only initialize if testimonial slider exists on the page
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            TestimonialSlider.init();
        }
    }, 200);
});

const TestimonialSlider = {
    data: [
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
    ],
    
    currentIndex: 0,
    slideInterval: null,
    
    init: function() {
        const testimonialContent = document.querySelector('.testimonial-content');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (!testimonialContent || !dots.length) {
            console.log('Missing required elements for testimonial slider');
            return;
        }
        
        console.log('Testimonial slider initialized successfully');
        
        // Setup dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Skip if clicking on the active dot
                if (this.currentIndex === index) {
                    return;
                }
                
                this.goToSlide(index);
                this.resetSlideTimer(); // Reset the timer when user manually changes slides
            });
        });
        
        // Pause auto-advance on hover
        testimonialContent.addEventListener('mouseenter', () => {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
                this.slideInterval = null;
            }
        });
        
        // Resume auto-advance when mouse leaves
        testimonialContent.addEventListener('mouseleave', () => {
            this.resetSlideTimer();
        });
        
        // Start the auto-advance timer
        this.resetSlideTimer();
    },
    
    // Go to a specific slide
    goToSlide: function(index) {
        const testimonialContent = document.querySelector('.testimonial-content');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (index < 0) index = this.data.length - 1;
        if (index >= this.data.length) index = 0;
        
        // Fade out
        testimonialContent.style.opacity = 0;
        
        // Wait for fade out to complete before changing content
        setTimeout(() => {
            // Update content
            this.currentIndex = index;
            const data = this.data[this.currentIndex];
            
            // Update text
            document.querySelector('.testimonial-text').textContent = data.text;
            document.querySelector('.name').textContent = data.name;
            
            // Fade back in
            testimonialContent.style.opacity = 1;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }, 500);
    },
    
    // Reset auto-slide timer
    resetSlideTimer: function() {
        // Clear any existing interval first
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
        
        // Set a new interval
        this.slideInterval = setInterval(() => {
            this.goToSlide(this.currentIndex + 1);
        }, 5000);
    },
    
    // Add a new testimonial to the slider data
    addTestimonial: function(stars, text, name) {
        this.data.push({
            stars: stars,
            text: text,
            name: name
        });
        
        // Update dots if needed
        this.updateDots();
    },
    
    // Update dot navigation based on number of testimonials
    updateDots: function() {
        const sliderDots = document.querySelector('.slider-dots');
        if (!sliderDots) return;
        
        // Clear existing dots
        sliderDots.innerHTML = '';
        
        // Create new dots based on data length
        for (let i = 0; i < this.data.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === this.currentIndex ? ' active' : '');
            dot.dataset.index = i;
            
            dot.addEventListener('click', () => {
                if (this.currentIndex === i) return;
                this.goToSlide(i);
                this.resetSlideTimer();
            });
            
            sliderDots.appendChild(dot);
        }
    }
};

// Register with ComponentManager if it exists
if (typeof ComponentManager !== 'undefined') {
    ComponentManager.register('testimonialSlider', TestimonialSlider);
} 