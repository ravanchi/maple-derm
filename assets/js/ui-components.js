import { ComponentManager } from './components/index.js';

document.addEventListener('DOMContentLoaded', function() {
    const heroContainer = document.getElementById('custom-hero');
    if (heroContainer) {
        ComponentManager.components.hero.createPageHero(
            heroContainer,
            'Custom <em>Hero</em> Title', 
            'This hero was created programmatically using our component system.'
        );
    }
    
    const serviceContainer = document.getElementById('custom-service');
    if (serviceContainer) {
        ComponentManager.components.featureCard.createServiceCard(
            serviceContainer,
            'custom-service',
            'far fa-star',
            'Custom Service',
            'This is a description of a custom service created using our component system.',
            'Learn more →',
            '#'
        );
    }
    
    const testimonialContainer = document.getElementById('custom-testimonial');
    if (testimonialContainer) {
        ComponentManager.components.testimonial.createTestimonial(
            testimonialContainer,
            '"This testimonial was created programmatically using our component system. It shows how easy it is to create reusable UI components."',
            'Example User',
            5
        );
    }
    
    const buttonContainer = document.getElementById('custom-button');
    if (buttonContainer) {
        const primaryButtonDiv = document.createElement('div');
        buttonContainer.appendChild(primaryButtonDiv);
        ComponentManager.components.button.createButton(
            primaryButtonDiv,
            'Primary Button',
            '#',
            true
        );
        
        const secondaryButtonDiv = document.createElement('div');
        buttonContainer.appendChild(secondaryButtonDiv);
        ComponentManager.components.button.createButton(
            secondaryButtonDiv,
            'Secondary Button',
            '#',
            false
        );
        
        const textLinkDiv = document.createElement('div');
        buttonContainer.appendChild(textLinkDiv);
        ComponentManager.components.button.createTextLink(
            textLinkDiv,
            'Text Link Example',
            '#'
        );
    }
    
    const featureContainer = document.getElementById('custom-feature');
    if (featureContainer) {
        ComponentManager.components.featureCard.createFeature(
            featureContainer,
            'fas fa-hand-holding-heart',
            'Custom Feature',
            'This is a description of a custom feature created using our component system.'
        );
    }
});