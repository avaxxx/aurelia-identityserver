import { Contact } from './resources/model/Contact';
import { MainLogger } from './MainLogger';
import { getLogger, Logger } from 'aurelia-logging';
import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, NavigationInstruction  } from 'aurelia-router';
import {AuthenticateStep} from 'aurelia-authentication';
import { UserManager, Log } from 'oidc-client'
import NavigationStrategies from './auth/navigation-strategies'
import OpenIdConnectAuthorizeStep from './auth/authorize-step'
import OpenIdConnectConfiguration from './open-id-connect-configuration'
import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";

@autoinject
export class App {
    router: Router;
    mgr: UserManager;
    logger: Logger;
    subscription: Subscription;

    constructor
        (
                private openIdConnectNavigationStrategies: NavigationStrategies,
                private openIdConnect: OpenIdConnect,
                private eventAggregator: EventAggregator
                
        ){
            this.openIdConnect.logger.enableLogging(Log.INFO);
            this.logger = MainLogger.getLogger('routing');
        // var config = {
        //     authority: "http://localhost:5000",
        //     client_id: "js",
        //     redirect_uri: "http://localhost:5000/#home/",
        //     response_type: "id_token token",
        //     scope:"openid profile api1",
        //     post_logout_redirect_uri : "http://localhost:5003/index.html",
        // };


        // this.mgr = new UserManager(config);
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.options.pushState = true;
        
        config.addPipelineStep("authorize", OpenIdConnectAuthorizeStep);

        // const { attributes } = require("aurelia-webpack-plugin/dist/html-requires-loader");
        // attributes["router-view"] = [ "layout-view", "layout-view-model" ];

        let step = {
            run: (navigationInstruction, next) => {
              this.logger.debug("pre-act for" + navigationInstruction.config.moduleId);
              return next();
            }
          };
          config.addPreActivateStep(step);

          config.mapUnknownRoutes((instruction) => {
            let path = instruction.fragment.toLowerCase();
            return PLATFORM.moduleName("./not-found");
          });

        // config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter so only authenticated uses are authorized to access some routes
        
        config.map([{
            route: [ '', 'home' ],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: PLATFORM.moduleName('./app/components/home/home'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'Home'
        }, {
            route: 'counter',
            name: 'counter',
            settings: { icon: 'education',roles: [OpenIdConnectRoles.Authorized] },
            moduleId: PLATFORM.moduleName('./app/components/counter/counter'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'Counter',
        }, {
            route: 'counter-redux',
            name: 'counter-redux',
            settings: { icon: 'education' },
            moduleId: PLATFORM.moduleName('./app/components/counter-redux/counter-redux'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'Counter-redux',
        },{
            route: 'todos',
            name: 'todos',
            settings: { icon: 'education' },
            moduleId: PLATFORM.moduleName('./app/components/todos/todos'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'Todos',
        },{
            route: 'fetch-data',
            name: 'fetchdata',
            settings: { icon: 'th-list',roles: [OpenIdConnectRoles.Administrator] },
            moduleId: PLATFORM.moduleName('./app/components/fetchdata/fetchdata'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'Fetch data'
        },{
            route: 'kendo',
            name: 'kendo',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('./app/components/kendo/kendo'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'Kendo demo'
        },{
            route: 'react',
            name: 'react',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('./app/components/react/react'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'), 
            title: 'React demo'
        },
        {
            route: 'materialise',
            name: 'materialise',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('./app/components/materialise/materialise'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'),            
            title: 'Materialise demo'
        },
        { 
            route: 'test/:id',      
             name: 'test', 
            //  nav: true,
             settings: { icon: 'th-list' },             
             moduleId: PLATFORM.moduleName('./app/components/test/test'), 
            //  layoutView: PLATFORM.moduleName('layout'),
             layoutViewModel: PLATFORM.moduleName('main-layout'),
             title: 'Test layout'
        },
        { 
            route: 'admin',      
             name: 'admin', 
             settings: { icon: 'th-list' },             
             moduleId: PLATFORM.moduleName('./admin/components/main/main'), 
            //  layoutView: PLATFORM.moduleName('layout'),
             layoutViewModel: PLATFORM.moduleName('admin-layout'),
             title: 'Admin layout'
            },
        {
            name: "login",
            nav: false,
            navigationStrategy: (instruction) => {
                instruction.config.href = instruction.fragment;
                instruction.config.moduleId = instruction.fragment;
                instruction.config.redirect = instruction.fragment;
                this.openIdConnect.login();
            },
            route: "login",
            settings: {
                roles: [OpenIdConnectRoles.Anonymous]
            },
        },
        {
            name: "not-authorized",
            nav: false,
            route: "not-authorized",
            moduleId: PLATFORM.moduleName('./resources/components/notauthorized/not-authorized'), 
        },
        {
            route: 'template',
            name: 'template',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('./app/components/template/template'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'),            
            title: 'Template demo'
        },
        {
            route: 'contact',
            name: 'contact',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('./app/components/contact/contactviewmodel'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'),            
            title: 'Manage contact'
        },
        {
            route: 'google-map',
            name: 'google-map',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('./app/components/google/google-map'),
            nav: true,
            layoutViewModel: PLATFORM.moduleName('main-layout'),            
            title: 'Google map'
        },
        //     route: 'login',
        //     name: 'login',
        //     settings: { icon: 'th-list' },
        //     moduleId: PLATFORM.moduleName('../login/login'),
        //     nav: false,
        //     title: 'login'
        // },
        // {
        //     name: "logInRedirectCallback",
        //     nav: false,
        //     moduleId: PLATFORM.moduleName('../singin/singin'),
            
        //     route: 'singin-success',
        // }
        {
            name: "logInRedirectCallback",
            navigationStrategy: (instruction: NavigationInstruction) => {
                if (this.isSilentLogin()) {
                    return this.openIdConnectNavigationStrategies.silentSignICallback(instruction);
                } else {
                    return this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction, router);
                }
            },
            //route: this.getPath(OpenIdConnectConfiguration.userManagerSettings.redirect_uri),
            route: 'singin-success',
        }
        // {
        //             name: "callback", nav: false,
        //             navigationStrategy: (instruction: NavigationInstruction) => {
        //                 instruction.config.href = instruction.fragment;
        //                 instruction.config.moduleId = instruction.fragment;
        //                 instruction.config.redirect = instruction.fragment;
            
        //                 console.log('Tutoka som');

        //                 this.mgr.signinRedirectCallback().then(function () {
        //                     this.router.navigate("home");
        //              }).catch(function (e) {
        //                     console.error(e);
        //                 });
        //             },
        //             route: "callback",
        //}
                ]);
     
        this.router = router;


    }

    activate(){
        this.subscription = this.eventAggregator.subscribe('contactvalidationfailed', (e: Contact) => {
            this.logger.warn('Validation failed for ' + e.firstName);
        });
    }

    deactivate(){
        this.subscription.dispose();
    }
    
    private isSilentLogin(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    private getPath(uri: string): string {
        return this.convertUriToAnchor(uri).pathname;
    };

    private convertUriToAnchor(uri: string): HTMLAnchorElement {
        let anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = uri;
        return anchor;
    }
}


// import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
// import { Router, RouterConfiguration, NavigationInstruction  } from 'aurelia-router';
// import {AuthenticateStep} from 'aurelia-authentication';
// import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";
// import { User, Log } from "oidc-client";

// @autoinject
// export class App {
//     router: Router;
//     private user: User;
    

//     constructor(private openIdConnect: OpenIdConnect) {
//         this.openIdConnect.logger.enableLogging(Log.INFO);
    
//         this.openIdConnect.userManager.getUser().then((user) => {
//           this.user = user;
//         });
//       }
    

//     configureRouter(config: RouterConfiguration, router: Router) {
//         config.title = 'Aurelia';
//         config.options.pushState = true;
        
//         // config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter so only authenticated uses are authorized to access some routes
        

//         config.map([{
//             route: [ '', 'home' ],
//             name: 'home',
//             settings: { icon: 'home' },
//             moduleId: PLATFORM.moduleName('../home/home'),
//             nav: true,
//             title: 'Home'
//         }, {
//             route: 'counter',
//             name: 'counter',
//             settings: { icon: 'education' },
//             moduleId: PLATFORM.moduleName('../counter/counter'),
//             nav: true,
//             title: 'Counter'
//         }, {
//             route: 'fetch-data',
//             name: 'fetchdata',
//             settings: { icon: 'th-list' },
//             moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
//             nav: true,
//             title: 'Fetch data'
//         }, {
//             route: 'login',
//             name: 'login',
//             settings: { icon: 'th-list' },
//             moduleId: PLATFORM.moduleName('../login/login'),
//             nav: false,
//             title: 'login'
//         },
//       // OpenId
//       {
//         name: "login", nav: false,
//         navigationStrategy: (instruction: NavigationInstruction) => {
//             instruction.config.href = instruction.fragment;
//             instruction.config.moduleId = instruction.fragment;
//             instruction.config.redirect = instruction.fragment;

//             this.openIdConnect.login();
//         },
//         route: "login",
//         settings: { roles: [OpenIdConnectRoles.Anonymous] },
//       },
//       {
//         name: "logout", nav: false,
//         navigationStrategy: (instruction: NavigationInstruction) => {
//             instruction.config.href = instruction.fragment;
//             instruction.config.moduleId = instruction.fragment;
//             instruction.config.redirect = instruction.fragment;
//           this.openIdConnect.logout();
//         },
//         route: "logout",
//         settings: { roles: [OpenIdConnectRoles.Authorized] },
//       },
//     ]);

//         this.openIdConnect.configure(config);
        
//         this.router = router;
//     }
// }
