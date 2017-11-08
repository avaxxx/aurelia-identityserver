import { HttpClient } from 'aurelia-fetch-client';
import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build
import authConfig from './AuthConfig';
import oidcConfig from "./open-id-connect-configuration";
import * as Bluebird from 'bluebird';
import { OpenIdConnectConfiguration } from "aurelia-open-id-connect";
import 'materialize-css';

Bluebird.config({ warnings: { wForgottenReturn: false }, longStackTraces: false });


export function configure(aurelia: Aurelia) {
    aurelia.use.standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-kendoui-bridge'))
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), b => b.useAll())      
    .plugin(PLATFORM.moduleName("aurelia-open-id-connect"),  
    (config: OpenIdConnectConfiguration) => {
        config.userManagerSettings = oidcConfig.userManagerSettings;
        config.loginRedirectModuleId = oidcConfig.loginRedirectModuleId;
        config.logoutRedirectModuleId = oidcConfig.logoutRedirectModuleId;
      })
    .feature(PLATFORM.moduleName('resources/index'));
    // .plugin(PLATFORM.moduleName('aurelia-authentication'), baseConfig => {
    //     baseConfig.configure(authConfig);
    // });

    aurelia.container.registerTransient(HttpClient);

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
