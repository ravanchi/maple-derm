const FooterComponent = {
    init: function() {
        this.injectFooter();
    },
    
    injectFooter: function() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        // Check if current page is FAQ page
        const currentPage = window.location.pathname;
        const isFaqPage = currentPage.includes('faq.html');
        
        // Determine the appropriate secondary text based on the current page
        let secondaryText = '';
        
        if (isFaqPage) {
            secondaryText = '<p>Still have questions?<br>Contact our friendly staff who will be happy to assist you with any additional questions.</p>';
        } else {
            secondaryText = '<p>Still have questions?<br>Take a look through our <a href="faq.html" class="text-link no-underline">FAQ</a></p>';
        }

        const footerHTML = `
        <footer class="site-footer" id="contact">
            <div class="container">
                <div class="footer-cta">
                    <h2>Begin your path to <em>expert-led</em> skin health</h2>
                    <a href="contact-us.html" class="btn primary-btn">Contact Us →</a>
                    ${secondaryText}
                </div>
                
                <div class="footer-content">
                    <div class="footer-row">
                        <div class="footer-logo">
                            <img src="assets/images/logo2.svg" alt="MapleDerm Logo" class="footer-logo-img">
                        </div>
                        <div class="footer-address">
                            <p><a href="https://www.google.com/maps/place/MapleDerm/@43.8632365,-79.5014533,20.83z/data=!4m14!1m7!3m6!1s0x882b29f2e7085903:0x67f3ee4c07f244ea!2s191+McNaughton+Rd+E+%23206,+Vaughan,+ON+L6A+4E2!3b1!8m2!3d43.863259!4d-79.5011775!3m5!1s0x882b2916c66fffff:0xffc004f324a56f47!8m2!3d43.8632461!4d-79.5014884!16s%2Fg%2F11q94yzsyv?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="address-link">191 McNaughton Rd E, Suite 206<br>
                            Maple, Ontario L6A 4E2</a></p>
                            <p>P: <a href="tel:+19058324747">(905) 832-4747</a> | F: <a href="tel:+19058324797">(905) 832-4797</a></p>
                        </div>
                        <div class="footer-legal">
                            <p><a href="privacy-policy.html">Privacy Policy</a></p>
                            <p>© ${new Date().getFullYear()} MapleDerm</p>
                            <p class="made-with">Made with <span class="heart">❤️</span> in Canada</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `;

        footerPlaceholder.outerHTML = footerHTML;
    }
};

export default FooterComponent; 