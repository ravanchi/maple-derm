import ComponentManager from './component-manager.js';
import HeaderComponent from './header.js';
import FooterComponent from './footer.js';
import HeroComponent from './hero.js';
import ButtonComponent from './button.js';
import FeatureCardComponent from './feature-card.js';
import TestimonialComponent from './testimonial.js';
import SocialMediaComponent from './social-media.js';

ComponentManager
    .register('header', HeaderComponent)
    .register('footer', FooterComponent)
    .register('hero', HeroComponent)
    .register('button', ButtonComponent)
    .register('featureCard', FeatureCardComponent)
    .register('testimonial', TestimonialComponent)
    .register('socialMedia', SocialMediaComponent);

export {
    ComponentManager,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    ButtonComponent,
    FeatureCardComponent,
    TestimonialComponent,
    SocialMediaComponent
};

export default ComponentManager; 