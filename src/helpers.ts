import * as Utils from '@pixi/utils'

export default class Helpers {
    constructor() {

    }

    static convertColor(color: string) {
        color = color.replace(/\s/g, '');
        color = color.replace('#','');
        return Utils.string2hex(color);
    }

}