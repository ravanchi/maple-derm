const TestimonialComponent = {
    init: function() {
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

export default TestimonialComponent; 