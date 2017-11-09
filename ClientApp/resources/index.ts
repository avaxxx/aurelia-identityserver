import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config.globalResources([
      PLATFORM.moduleName('./value-converters/TruncateValueConverter')
    ]);
    config.plugin(PLATFORM.moduleName('aurelia-validation'));
  }