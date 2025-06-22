document.addEventListener('DOMContentLoaded', function() {
    // Since we now have a video background, particles are disabled by default
    // Uncomment the following code to enable particles if needed
    /*
    if (window.innerWidth >= 768) {
        createParticles();
    }
    */
});

function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);
    
    // Create particles
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and size
        const size = Math.random() * 8 + 2; // 2-10px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position randomly within the container
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10; // 10-30s
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay so they don't all move together
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.6 + 0.1; // 0.1-0.7
        
        particlesContainer.appendChild(particle);
    }
} 