import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import {AuthenticateStep} from 'aurelia-authentication';

export class App {
    router: Router;

    

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';

        config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter so only authenticated uses are authorized to access some routes
        

        config.map([{
            route: [ '', 'home' ],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: PLATFORM.moduleName('../home/home'),
            nav: true,
            title: 'Home'
        }, {
            route: 'counter',
            name: 'counter',
            settings: { icon: 'education' },
            moduleId: PLATFORM.moduleName('../counter/counter'),
            nav: true,
            title: 'Counter',
            auth: true
        }, {
            route: 'fetch-data',
            name: 'fetchdata',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
            nav: true,
            title: 'Fetch data'
        }, {
            route: 'login',
            name: 'login',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../login/login'),
            nav: false,
            title: 'login'
        }]);

        this.router = router;
    }
}
