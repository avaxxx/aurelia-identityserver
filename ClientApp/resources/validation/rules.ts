import { ValidationRules } from "aurelia-validation";

ValidationRules.customRule(
    'between',
    (value, obj) => value === null || value === undefined || value === '' && value.length >= 5,
    '\$($displayName) must be between 5-10'
);

ValidationRules.customRule(
    'integerRange',
    (value, obj, min, max) => value === null || value === undefined
      || Number.isInteger(value) && value >= min && value <= max,
    `\${$displayName} must be an integer between \${$config.min} and \${$config.max}.`,
    (min, max) => ({ min, max })
  );