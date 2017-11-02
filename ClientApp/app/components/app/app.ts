import { Aurelia, PLATFORM, autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, NavigationInstruction  } from 'aurelia-router';
import {AuthenticateStep} from 'aurelia-authentication';
import { UserManager, Log } from 'oidc-client'
import NavigationStrategies from '../../../auth/navigation-strategies'
import OpenIdConnectAuthorizeStep from '../../../auth/authorize-step'
import OpenIdConnectConfiguration from '../../../open-id-connect-configuration'
import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";

@autoinject
export class App {
    router: Router;
    mgr: UserManager;

    constructor
        (
                private openIdConnectNavigationStrategies: NavigationStrategies,
                private openIdConnect: OpenIdConnect
                
        ){
            this.openIdConnect.logger.enableLogging(Log.INFO);
            
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

        // config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter so only authenticated uses are authorized to access some routes
        

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
            title: 'Counter'
        }, {
            route: 'fetch-data',
            name: 'fetchdata',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
            nav: true,
            title: 'Fetch data'
        },{
            route: 'kendo',
            name: 'kendo',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../kendo/kendo'),
            nav: true,
            title: 'Kendo demo'
        },{
            route: 'react',
            name: 'react',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../react/react'),
            nav: true,
            title: 'React demo'
        },
        {
            route: 'materialise',
            name: 'materialise',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../materialise/materialise'),
            nav: true,
            title: 'Materialise demo'
        },{
            route: 'login',
            name: 'login',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../login/login'),
            nav: false,
            title: 'login'
        },
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
