import { PLATFORM } from 'aurelia-framework';
import { BootstrapFormRenderer } from './validation/bootstrap-form-renderer';
export function configure(config) {
    config.globalResources([
      PLATFORM.moduleName('./value-converters/TruncateValueConverter')
    ]);
    config.plugin(PLATFORM.moduleName('aurelia-validation'));
    config.container.registerHandler('bootstrap-form', container => container.get(BootstrapFormRenderer))
  }