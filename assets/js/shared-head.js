function injectCommonHead() {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'assets/images/favicon/favicon.svg';
    document.head.appendChild(favicon);
    
    const faviconPng = document.createElement('link');
    faviconPng.rel = 'icon';
    faviconPng.type = 'image/png';
    faviconPng.href = 'assets/images/favicon/favicon-96x96.png';
    faviconPng.setAttribute('sizes', '96x96');
    document.head.appendChild(faviconPng);
    
    const shortcutIcon = document.createElement('link');
    shortcutIcon.rel = 'shortcut icon';
    shortcutIcon.href = 'assets/images/favicon/favicon.ico';
    document.head.appendChild(shortcutIcon);
    
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = 'assets/images/apple-touch-icon.png';
    appleIcon.setAttribute('sizes', '180x180');
    document.head.appendChild(appleIcon);
    
    const appTitle = document.createElement('meta');
    appTitle.name = 'apple-mobile-web-app-title';
    appTitle.content = 'MapleDerm';
    document.head.appendChild(appTitle);
    
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = 'assets/images/favicon/site.webmanifest';
    document.head.appendChild(manifest);
    
    // Add common stylesheets
    addStylesheet('assets/css/style.css');
    addStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    
    // Add Google Fonts
    const fontPreconnect1 = document.createElement('link');
    fontPreconnect1.rel = 'preconnect';
    fontPreconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(fontPreconnect1);
    
    const fontPreconnect2 = document.createElement('link');
    fontPreconnect2.rel = 'preconnect';
    fontPreconnect2.href = 'https://fonts.gstatic.com';
    fontPreconnect2.setAttribute('crossorigin', '');
    document.head.appendChild(fontPreconnect2);
    
    addStylesheet('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
}

function addStylesheet(href) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
}

injectCommonHead(); 