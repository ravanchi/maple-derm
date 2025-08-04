/**
 * Accessibility Enhancements for MapleDerm
 * 
 * This file contains JavaScript functions to improve the accessibility
 * of the website dynamically after page load.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA roles to service grids and items
    enhanceServiceGrids();
    
    // Make dropdown menus keyboard accessible
    enhanceDropdowns();
    
    // Add notification for screen readers when page content updates
    addScreenReaderAnnouncer();
    
    // Add focus styles for better keyboard navigation
    enhanceFocusVisibility();
});

/**
 * Add proper ARIA roles to service grids and items
 */
function enhanceServiceGrids() {
    const serviceGrids = document.querySelectorAll('.services-grid');
    
    serviceGrids.forEach(grid => {
        // Add list role to service grids if not already present
        if (!grid.getAttribute('role')) {
            grid.setAttribute('role', 'list');
        }
        
        // Add list item role to service items
        const serviceItems = grid.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            if (!item.getAttribute('role')) {
                item.setAttribute('role', 'listitem');
            }
            
            // Ensure service icons are properly marked as decorative
            const icon = item.querySelector('.service-icon i');
            if (icon) {
                icon.setAttribute('aria-hidden', 'true');
            }
            
            // Make service titles properly expose their role
            const heading = item.querySelector('h3');
            if (heading) {
                if (!heading.id) {
                    const headingId = 'service-' + heading.textContent.toLowerCase().replace(/[^a-z0-9]/g, '-');
                    heading.id = headingId;
                }
                item.setAttribute('aria-labelledby', heading.id);
            }
        });
    });
}

/**
 * Make dropdown menus keyboard accessible
 */
function enhanceDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        const menuItems = menu ? menu.querySelectorAll('a') : [];
        
        // Skip if already enhanced
        if (trigger.getAttribute('aria-expanded')) return;
        
        // Add ARIA attributes
        if (trigger && menu) {
            const menuId = 'dropdown-' + Math.random().toString(36).substring(2, 9);
            menu.id = menuId;
            
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-controls', menuId);
            
            // Enable keyboard navigation
            trigger.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    trigger.setAttribute('aria-expanded', 'true');
                    dropdown.classList.add('active');
                    
                    // Focus first menu item
                    if (menuItems.length > 0) {
                        menuItems[0].focus();
                    }
                }
            });
            
            // Allow keyboard navigation within dropdown items
            menuItems.forEach((item, index) => {
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (index < menuItems.length - 1) {
                            menuItems[index + 1].focus();
                        }
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (index > 0) {
                            menuItems[index - 1].focus();
                        } else {
                            trigger.focus();
                        }
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        trigger.setAttribute('aria-expanded', 'false');
                        dropdown.classList.remove('active');
                        trigger.focus();
                    }
                });
            });
            
            // Close menu when focus leaves
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    trigger.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}

/**
 * Add a live region for screen reader announcements
 */
function addScreenReaderAnnouncer() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only');
    announcer.id = 'screen-reader-announcer';
    
    // Hide visually but keep available to screen readers
    announcer.style.position = 'absolute';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.padding = '0';
    announcer.style.margin = '-1px';
    announcer.style.overflow = 'hidden';
    announcer.style.clip = 'rect(0, 0, 0, 0)';
    announcer.style.whiteSpace = 'nowrap';
    announcer.style.border = '0';
    
    document.body.appendChild(announcer);
    
    // Expose announce method globally
    window.announce = function(message) {
        announcer.textContent = message;
    };
}

/**
 * Enhance focus visibility for keyboard users
 */
function enhanceFocusVisibility() {
    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
    
    document.body.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
    
    // Add relevant CSS if not already present
    if (!document.getElementById('focus-visibility-styles')) {
        const style = document.createElement('style');
        style.id = 'focus-visibility-styles';
        style.textContent = `
            body:not(.keyboard-user) :focus:not(:focus-visible) {
                outline: none !important;
                box-shadow: none !important;
            }
            
            body.keyboard-user a:focus,
            body.keyboard-user button:focus,
            body.keyboard-user input:focus,
            body.keyboard-user select:focus,
            body.keyboard-user textarea:focus {
                outline: 2px solid var(--primary-color) !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 2px rgba(194, 161, 77, 0.4) !important;
            }
        `;
        document.head.appendChild(style);
    }
} 