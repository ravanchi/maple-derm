const ButtonComponent = {
    init: function() {
    },
    
    createButton: function(container, text, url, isPrimary = true, newTab = false) {
        if (!container) return;
        
        const buttonClass = isPrimary ? 'primary-btn' : 'secondary-btn';
        const target = newTab ? 'target="_blank"' : '';
        
        const buttonHTML = `<a href="${url}" class="btn ${buttonClass}" ${target}>${text}</a>`;
        container.innerHTML = buttonHTML;
    },
    
    createTextLink: function(container, text, url, underlined = true, newTab = false) {
        if (!container) return;
        
        const underlineClass = !underlined ? 'no-underline' : '';
        const target = newTab ? 'target="_blank"' : '';
        
        const linkHTML = `<a href="${url}" class="text-link ${underlineClass}" ${target}>${text}</a>`;
        container.innerHTML = linkHTML;
    }
};

export default ButtonComponent; 