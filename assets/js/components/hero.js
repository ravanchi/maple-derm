const HeroComponent = {
    init: function() {
        if (document.querySelector('.hero') || document.querySelector('.page-hero')) {
            this.initScrollAnimation();
        }
    },
    
    initScrollAnimation: function() {
        const hero = document.querySelector('.hero') || document.querySelector('.page-hero');
        if (!hero) return;
        
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            if (scrollY > 10) {
                hero.classList.add('scrolled');
            } else {
                hero.classList.remove('scrolled');
            }
        });
    },
    
    createHero: function(container, title, subtitle, ctaText, ctaUrl, imageSrc) {
        if (!container) return;
        
        const heroHTML = `
        <section class="hero">
            <div class="hero-container">
                <div class="hero-content">
                    <h1>${title}</h1>
                    <p class="hero-subtitle">${subtitle}</p>
                    ${ctaText ? `<a href="${ctaUrl}" class="btn primary-btn">${ctaText}</a>` : ''}
                </div>
                ${imageSrc ? `
                <div class="hero-image-container">
                    <img class="hero-image" src="${imageSrc}" alt="Hero Image">
                </div>` : ''}
            </div>
        </section>
        `;
        
        container.innerHTML = heroHTML;
    },
    
    createPageHero: function(container, title, subtitle) {
        if (!container) return;
        
        const pageHeroHTML = `
        <section class="page-hero">
            <div class="container">
                <h1>${title}</h1>
                <p class="page-subtitle">${subtitle}</p>
            </div>
        </section>
        `;
        
        container.innerHTML = pageHeroHTML;
    }
};

export default HeroComponent; 