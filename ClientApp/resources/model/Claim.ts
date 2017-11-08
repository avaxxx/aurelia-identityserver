export class Claim {
    type: string;
    value: string;

    static fromObject(source)
    {
        //return Object.assign(new Claim(), source);
        let claim = new Claim();
        return {claim, ...source}
    }
}