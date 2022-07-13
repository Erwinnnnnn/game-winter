import * as PIXI from "pixi.js"
import * as Utils from '@pixi/utils'
import Settings from "./settings";

export default class Helpers {
    constructor() {

    }

    static convertColor(color: string) {
        color = color.replace(/\s/g, '');
        color = color.replace('#','');
        return Utils.string2hex(color);
    }

    static loadImages(images: Array<Array<string>>, loader: PIXI.Loader) {
        for (let _i = 0; _i < images.length; _i++) {
            loader.add(images[_i][0], Settings.assetsPath + images[_i][1] + '.png')
        }
    }

}