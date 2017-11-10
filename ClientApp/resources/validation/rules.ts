import { ValidationRules } from "aurelia-validation";

ValidationRules.customRule(
    'between',
    (value, obj) => value === null || value === undefined || value === '' && value.length >= 5,
    '\$($displayName) must be between 5-10'
);