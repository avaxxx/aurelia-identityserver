import { valueConverter } from "aurelia-framework";

@valueConverter('truncate')
export class TruncateValueConverter {
    toView(value: string, length: number, ellipsis='...') {
        value = value || '';
        return value.length > length ? value.substring(0, length) + ellipsis : value;
    }
}