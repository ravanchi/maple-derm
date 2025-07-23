const SocialMediaComponent = {
    init: function() {
    },
    
    createInstagramPost: function(container, profileImage, username, postImage, postUrl, hasVideo = false) {
        if (!container) return;
        
        const instagramPostHTML = `
        <div class="custom-instagram-post">
            <div class="instagram-post-header">
                <div class="instagram-profile-pic">
                    <img src="${profileImage}" alt="${username}">
                </div>
                <div class="instagram-profile-info">
                    <a href="https://www.instagram.com/${username}/" target="_blank" class="instagram-username">${username}</a>
                </div>
            </div>
            <div class="instagram-post-image">
                <a href="${postUrl}" target="_blank">
                    <img src="${postImage}" alt="${username} Instagram post">
                    ${hasVideo ? `
                    <div class="instagram-play-overlay">
                        <div class="play-content">
                            <i class="fas fa-play"></i>
                            <span>Watch on Instagram</span>
                        </div>
                    </div>
                    ` : ''}
                </a>
            </div>
        </div>
        `;
        
        container.innerHTML = instagramPostHTML;
    },
    
    createViewProfileButton: function(container, platform, username, buttonText) {
        if (!container) return;
        
        let url = '';
        let icon = '';
        
        switch(platform.toLowerCase()) {
            case 'instagram':
                url = `https://www.instagram.com/${username}/`;
                icon = 'fab fa-instagram';
                break;
            case 'facebook':
                url = `https://www.facebook.com/${username}/`;
                icon = 'fab fa-facebook-f';
                break;
            case 'twitter':
                url = `https://www.twitter.com/${username}/`;
                icon = 'fab fa-twitter';
                break;
            case 'tiktok':
                url = `https://www.tiktok.com/@${username}`;
                icon = 'fab fa-tiktok';
                break;
            default:
                url = `https://www.instagram.com/${username}/`;
                icon = 'fab fa-instagram';
        }
        
        const viewProfileHTML = `
        <div class="social-view-profile">
            <a href="${url}" class="btn primary-btn" target="_blank">
                <i class="${icon}"></i>&nbsp; ${buttonText || `View more on ${platform}`}
            </a>
        </div>
        `;
        
        container.innerHTML = viewProfileHTML;
    }
};

export default SocialMediaComponent; 