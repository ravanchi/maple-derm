const ComponentManager = {
    components: {},
    
    register: function(name, component) {
        this.components[name] = component;
        return this;
    },
    
    init: function() {
        Object.values(this.components).forEach(component => {
            if (typeof component.init === 'function') {
                component.init();
            }
        });
    }
};

export default ComponentManager; 