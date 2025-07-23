/**
 * UI Components Usage Examples
 * 
 * This file demonstrates how to use the component system to create reusable UI elements.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Examples of how to use the components
    
    // Example 1: Create a page hero programmatically
    const heroContainer = document.getElementById('custom-hero');
    if (heroContainer) {
        ComponentManager.components.hero.createPageHero(
            heroContainer,
            'Custom <em>Hero</em> Title', 
            'This hero was created programmatically using our component system.'
        );
    }
    
    // Example 2: Create a service card programmatically
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
    
    // Example 3: Create a testimonial programmatically
    const testimonialContainer = document.getElementById('custom-testimonial');
    if (testimonialContainer) {
        ComponentManager.components.testimonial.createTestimonial(
            testimonialContainer,
            '"This testimonial was created programmatically using our component system. It shows how easy it is to create reusable UI components."',
            'Example User',
            5
        );
    }
    
    // Example 4: Create buttons programmatically
    const buttonContainer = document.getElementById('custom-button');
    if (buttonContainer) {
        // Create primary button
        const primaryButtonDiv = document.createElement('div');
        buttonContainer.appendChild(primaryButtonDiv);
        ComponentManager.components.button.createButton(
            primaryButtonDiv,
            'Primary Button',
            '#',
            true
        );
        
        // Create secondary button
        const secondaryButtonDiv = document.createElement('div');
        buttonContainer.appendChild(secondaryButtonDiv);
        ComponentManager.components.button.createButton(
            secondaryButtonDiv,
            'Secondary Button',
            '#',
            false
        );
        
        // Create text link
        const textLinkDiv = document.createElement('div');
        buttonContainer.appendChild(textLinkDiv);
        ComponentManager.components.button.createTextLink(
            textLinkDiv,
            'Text Link Example',
            '#'
        );
    }
    
    // Example 5: Create a feature programmatically
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

/**
 * Example of how to extend the component system with a new component
 */
const ExampleNewComponent = {
    init: function() {
        console.log('Example new component initialized');
    },
    
    createExample: function(container, title, content) {
        if (!container) return;
        
        const exampleHTML = `
        <div class="example-component">
            <h3>${title}</h3>
            <div class="example-content">
                ${content}
            </div>
        </div>
        `;
        
        container.innerHTML = exampleHTML;
    }
};

// Register the new component
// ComponentManager.register('example', ExampleNewComponent); 