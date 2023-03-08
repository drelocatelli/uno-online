const injectScript = (name) => new ScriptInjector(name);
class ScriptInjector {

    constructor(name) {
        this.inject(name);
    }
 
    inject(name = null) {
        let path = `src/js/${name}.js`
        const script = document.createElement('script');
        script.src = path;
        let scriptInjectorEl = document.querySelector('script-injector');
        scriptInjectorEl.append(script);
    }
    
}

injectScript('game');
injectScript('notificationDOM');
injectScript('server/server');
injectScript('server/listen');
injectScript('server/emit');
injectScript('form');
injectScript('effects');
injectScript('server/boot');