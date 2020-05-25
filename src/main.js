import Helper from './helper';

export default class Main {

    constructor() {
        this.foo = 'Main';
        const helper = new Helper();
        this.helperName = helper.getName();
    }

    greet() {
        console.log('Hello from ' + this.foo + ' with the help of ' + this.helperName);
    }
}
