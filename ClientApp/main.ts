//shim
import 'isomorphic-fetch';
import 'intl';
import 'mutationobserver-shim'

import { I18N, TCustomAttribute } from 'aurelia-i18n';
import { HttpClient } from 'aurelia-fetch-client';
import { Aurelia, PLATFORM } from 'aurelia-framework';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import authConfig from './AuthConfig';
import oidcConfig from "./open-id-connect-configuration";
import * as Bluebird from 'bluebird';
import { OpenIdConnectConfiguration } from "aurelia-open-id-connect";
import 'materialize-css';
import * as Backend from 'i18next-xhr-backend';
import * as LngDetector from 'i18next-browser-languagedetector';
import environment from './environment';

Bluebird.config({ warnings: { wForgottenReturn: false }, longStackTraces: false });

//import {TaskQueue} from 'aurelia-task-queue';
// PLATFORM.moduleName("./locales/en/translation.json");
// PLATFORM.moduleName("./locales/fr/translation.json");
export function configure(aurelia: Aurelia) {
        if (!global.Intl) {
            console.log('Intl not present');
            (<any>require).ensure([
                'intl',
                'intl/locale-data/jsonp/en.js'
            ], function (require) {
                require('intl');
                require('intl/locale-data/jsonp/en.js');
                boot(aurelia);
            });
        } else {
            boot(aurelia);
        }
}

function boot(aurelia: Aurelia) {
    aurelia.use.standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-kendoui-bridge'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'),
         config => {
             config.useAll();
             //config.notifyBindingBehavior
            })      
    .plugin(PLATFORM.moduleName("aurelia-open-id-connect"),  
    (config: OpenIdConnectConfiguration) => {
        config.userManagerSettings = oidcConfig.userManagerSettings;
        config.loginRedirectModuleId = oidcConfig.loginRedirectModuleId;
        config.logoutRedirectModuleId = oidcConfig.logoutRedirectModuleId;
      })
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) =>{
        let aliases = ['t', 'i18n'];
        // add aliases for 't' attribute
        TCustomAttribute.configureAliases(aliases);

        // register backend plugin
        instance.i18next.use(Backend).use(LngDetector); 
        // instance.i18next.use(LngDetector);    

        return instance.setup({
            backend:{
                loadPath: '/api/v1/translations?language={{lng}}'
                // parse: (data) => data,
                // ajax: loadLocales
            },
            detection: {
                order: ['localStorage', 'cookie', 'navigator'],
                lookupCookie: 'i18next',
                lookupLocalStorage: 'i18nextLng',
                caches: ['localStorage', 'cookie']
            },
            attributes: aliases,
            lng: '',
            fallbackLng: 'en',
            debug: true
        });
    })
    .feature(PLATFORM.moduleName('resources/index'));
    // .plugin(PLATFORM.moduleName('aurelia-authentication'), baseConfig => {
    //     baseConfig.configure(authConfig);
    // });

    aurelia.container.registerTransient(HttpClient);

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));

    // function loadLocales(url, options, callback, data) {
    //     try {
    //       let waitForLocale = require('bundle!./locales/'+url+'.json');
    //       waitForLocale((locale) => {
    //         callback(locale, {status: '200'});
    //       })
    //     } catch (e) {
    //       callback(null, {status: '404'});
    //     }
    //   }
}