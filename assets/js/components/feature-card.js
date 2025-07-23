const FeatureCardComponent = {
    init: function() {
    },
    
    createFeature: function(container, iconClass, title, description) {
        if (!container) return;
        
        if (!container.parentElement.classList.contains('features') && 
            !container.classList.contains('feature')) {
            container.style.flex = '1';
            container.style.minWidth = '0';
            container.style.flexBasis = '0';
        }
        
        const featureHTML = `
        <div class="feature">
            <div class="feature-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        `;
        
        container.innerHTML = featureHTML;
    },
    
    createServiceCard: function(container, id, iconClass, title, description, linkText, linkUrl) {
        if (!container) return;
        
        if (!container.parentElement.classList.contains('service-cards') && 
            !container.classList.contains('service-card')) {
            container.style.flex = '1';
            container.style.minWidth = '0';
        }
        
        const serviceCardHTML = `
        <div class="service-card" id="${id}">
            <div class="service-icon"><i class="${iconClass}"></i></div>
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${linkUrl}" class="text-link">${linkText}</a>
        </div>
        `;
        
        container.innerHTML = serviceCardHTML;
    }
};

export default FeatureCardComponent; 